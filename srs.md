# Meds Tracker — Product Requirements

## Core Purpose

The app is being developed to track a user's medication schedule.

The user can log their medications along with their schedules and receive reminders through **local app notifications**.

---

## Functionalities

1. Add medications
2. Define when and how often each medication should be taken
3. Receive medication reminders through notifications
4. Mark doses as **taken** or **skipped**
5. View today's medication schedule
6. View currently active medication history

---

## Medication Management

Each medication should contain:

1. **Name**
2. **Dosage**

   * Default: 1 tablet
   * In most cases, users should not need to enter the dosage in mg, since a layperson will generally think in terms of the number of tablets/capsules they take.
3. **Unit**

   * Tablet
   * Capsule
   * mg
   * ml
   * etc.
4. **Optional instructions**

   * Users can add instructions such as "Take after breakfast."
5. **Frequency**

   * Once daily
   * Twice daily
   * Specific times
   * Every X hours
   * Certain days of the week
6. **Duration**

   * Number of days/weeks the medication should be taken
7. **Start date**
8. **Optional end date**
9. **Active/inactive status**

### Potential Future Additions

* Medication category
* Prescriber
* Additional notes
* Prescription/photo attachment

---

## Natural Medication Scheduling

Users should not be required to manually enter an exact time for every medication dose.

Instead, the app should provide **human-friendly timing options**, such as:

* When I wake up
* Before breakfast
* After breakfast
* Before lunch
* After lunch
* Before dinner
* After dinner
* Before sleeping
* Custom time

The app should map these options to reasonable notification times by default.

For example:

* **After breakfast** → default reminder around 12:00 PM
* **After lunch** → default reminder around 2:00 PM
* **Before sleeping** → based on the user's sleep schedule

For timing options that depend on the user's routine, such as waking up or sleeping, the app should ask the user for their typical wake-up and sleep times.

Users should be able to customize their routine and notification times.

If none of the predefined options work for the user, they can choose an **exact custom time** for the dose.

### Design Principle

The user should describe *when they need to take the medication* in natural terms rather than being forced to think in exact clock times.

---

## Today Screen

The Today screen should show the user's medication schedule for the current day, with the option to mark doses as **taken** or **skipped**.

Doses should be visually distinguished as:

* ✅ **Taken**
* ⏰ **Upcoming**
* ⚠️ **Overdue**
* ⏭️ **Skipped**

---

## Notifications

The app should schedule **local notifications** for upcoming medication doses.

---

## SQLite Data Model

CREATE TABLE daily_routine (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    wake_time TEXT NOT NULL DEFAULT '07:00',
    sleep_time TEXT NOT NULL DEFAULT '22:00',
    breakfast_time TEXT DEFAULT '08:00',
    lunch_time TEXT DEFAULT '13:00',
    dinner_time TEXT DEFAULT '20:00'
);

CREATE TABLE medications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dosage_amount REAL NOT NULL DEFAULT 1,
    unit TEXT NOT NULL DEFAULT 'tablet',
    instructions TEXT,

    dosing_mode TEXT NOT NULL CHECK (dosing_mode IN ('fixed_times', 'interval')),
    interval_hours INTEGER,                     -- only used when dosing_mode = 'interval'
    stop_doses_at_sleep INTEGER NOT NULL DEFAULT 1,  -- 0/1, only meaningful when dosing_mode = 'interval'

    start_date TEXT NOT NULL,
    end_date TEXT,                               -- NULL = ongoing; sole source of truth for duration
                                                    -- (app computes this from a "days" input at creation time,
                                                    --  it is not stored separately)

    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE dose_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
    timing_label TEXT NOT NULL,       -- 'wake_up','before_breakfast','after_breakfast', ... 'custom'
    custom_time TEXT,                  -- HH:MM, required if timing_label = 'custom'
    day_of_week INTEGER,               -- NULL = every day
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE doses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
    dose_rule_id INTEGER REFERENCES dose_rules(id) ON DELETE SET NULL,  -- NULL for interval-mode doses

    -- denormalized snapshot: what this dose represented at generation time,
    -- independent of whether dose_rules/daily_routine later change
    timing_label TEXT,                 -- copied from dose_rules at generation, or 'interval' if mode = interval
    scheduled_date TEXT NOT NULL,
    scheduled_time TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','taken','skipped','overdue')),
    taken_at TEXT,
    notification_id TEXT,

    UNIQUE (medication_id, scheduled_date, scheduled_time)
);

CREATE INDEX idx_doses_date ON doses(scheduled_date, status);
CREATE INDEX idx_doses_medication ON doses(medication_id);
CREATE INDEX idx_dose_rules_medication ON dose_rules(medication_id);: