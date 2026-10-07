export const SCHEMA = `CREATE TABLE IF NOT EXISTS daily_routine (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    wake_time TEXT NOT NULL DEFAULT '07:00',
    sleep_time TEXT NOT NULL DEFAULT '22:00',
    breakfast_time TEXT DEFAULT '08:00',
    lunch_time TEXT DEFAULT '13:00',
    dinner_time TEXT DEFAULT '20:00'
);

CREATE TABLE IF NOT EXISTS medications (
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

CREATE TABLE IF NOT EXISTS dose_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
    timing_label TEXT NOT NULL,       -- 'wake_up','before_breakfast','after_breakfast', ... 'custom'
    custom_time TEXT,                  -- HH:MM, required if timing_label = 'custom'
    day_of_week INTEGER,               -- NULL = every day
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS doses (
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
CREATE INDEX IF NOT EXISTS idx_doses_date
ON doses(scheduled_date, status);

CREATE INDEX IF NOT EXISTS idx_doses_medication
ON doses(medication_id);

CREATE INDEX IF NOT EXISTS idx_dose_rules_medication
ON dose_rules(medication_id);
`
