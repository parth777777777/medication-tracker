import { getDatabase } from './database';

export type TodayDose = {
  id: number;
  medication_id: number;
  name: string;
  dosage_amount: number;
  unit: string;
  timing_label: string | null;
  scheduled_date: string;
  scheduled_time: string;
  status: 'upcoming' | 'taken' | 'skipped' | 'overdue';
};

type ActiveMedication = {
  id: number;
  dosing_mode: 'fixed_times' | 'interval';
  interval_hours: number | null;
  stop_doses_at_sleep: number;
  start_date: string;
};

type DoseRule = {
  id: number;
  medication_id: number;
  timing_label: string;
  custom_time: string | null;
  day_of_week: number | null;
};

type DailyRoutine = {
  wake_time: string;
  sleep_time: string;
  breakfast_time: string | null;
  lunch_time: string | null;
  dinner_time: string | null;
};

type ScheduledDose = {
  medicationId: number;
  doseRuleId: number | null;
  timingLabel: string;
  time: string;
};

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number) {
  const normalizedMinutes = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalizedMinutes / 60);
  const remainder = normalizedMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function getRuleTime(rule: DoseRule, routine: DailyRoutine) {
  switch (rule.timing_label) {
    case 'wake_up':
      return routine.wake_time;
    case 'before_breakfast':
      return routine.breakfast_time
        ? minutesToTime(timeToMinutes(routine.breakfast_time) - 30)
        : null;
    case 'after_breakfast':
      return routine.breakfast_time;
    case 'before_lunch':
      return routine.lunch_time
        ? minutesToTime(timeToMinutes(routine.lunch_time) - 30)
        : null;
    case 'after_lunch':
      return routine.lunch_time;
    case 'before_dinner':
      return routine.dinner_time
        ? minutesToTime(timeToMinutes(routine.dinner_time) - 30)
        : null;
    case 'after_dinner':
      return routine.dinner_time;
    case 'before_sleep':
      return routine.sleep_time;
    case 'custom':
      return rule.custom_time;
    default:
      return null;
  }
}

export async function getTodayDoses(): Promise<TodayDose[]> {
  const db = await getDatabase();
  const now = new Date();
  const today = getLocalDateString(now);
  const weekday = now.getDay();
  const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  await db.runAsync('INSERT OR IGNORE INTO daily_routine (id) VALUES (1)');

  const routine = await db.getFirstAsync<DailyRoutine>(
    `SELECT wake_time, sleep_time, breakfast_time, lunch_time, dinner_time
     FROM daily_routine
     WHERE id = 1`
  );
  if (!routine) {
    throw new Error('Daily routine was not available after initialization.');
  }

  const medications = await db.getAllAsync<ActiveMedication>(
    `SELECT id, dosing_mode, interval_hours, stop_doses_at_sleep, start_date
     FROM medications
     WHERE is_active = 1
       AND start_date <= ?
       AND (end_date IS NULL OR end_date >= ?)
     ORDER BY id`,
    today,
    today
  );

  const rules = medications.length
    ? await db.getAllAsync<DoseRule>(
        `SELECT id, medication_id, timing_label, custom_time, day_of_week
         FROM dose_rules
         WHERE medication_id IN (${medications.map(() => '?').join(', ')})
         ORDER BY sort_order, id`,
        ...medications.map((medication) => medication.id)
      )
    : [];

  const dosesToSchedule: ScheduledDose[] = [];

  for (const medication of medications) {
    if (medication.dosing_mode === 'fixed_times') {
      for (const rule of rules) {
        if (
          rule.medication_id !== medication.id ||
          (rule.day_of_week !== null && rule.day_of_week !== weekday)
        ) {
          continue;
        }

        const time = getRuleTime(rule, routine);
        if (time) {
          dosesToSchedule.push({
            medicationId: medication.id,
            doseRuleId: rule.id,
            timingLabel: rule.timing_label,
            time,
          });
        }
      }
      continue;
    }

    const intervalHours = medication.interval_hours;
    if (!intervalHours || intervalHours <= 0) {
      throw new Error(
        `Medication ${medication.id} has an invalid dosing interval.`
      );
    }

    const startMinutes = timeToMinutes(routine.wake_time);
    const endMinutes =
      medication.stop_doses_at_sleep === 1
        ? timeToMinutes(routine.sleep_time)
        : 1440;
    const intervalMinutes = intervalHours * 60;

    for (
      let scheduledMinutes = startMinutes;
      scheduledMinutes < endMinutes;
      scheduledMinutes += intervalMinutes
    ) {
      dosesToSchedule.push({
        medicationId: medication.id,
        doseRuleId: null,
        timingLabel: 'interval',
        time: minutesToTime(scheduledMinutes),
      });
    }
  }

  for (const dose of dosesToSchedule) {
    await db.runAsync(
      `INSERT OR IGNORE INTO doses (
        medication_id,
        dose_rule_id,
        timing_label,
        scheduled_date,
        scheduled_time
      ) VALUES (?, ?, ?, ?, ?)`,
      dose.medicationId,
      dose.doseRuleId,
      dose.timingLabel,
      today,
      dose.time
    );
  }

  await db.runAsync(
    `UPDATE doses
     SET status = 'overdue'
     WHERE scheduled_date = ?
       AND scheduled_time < ?
       AND status = 'upcoming'`,
    today,
    nowTime
  );

  return db.getAllAsync<TodayDose>(
    `SELECT doses.id, doses.medication_id, medications.name,
            medications.dosage_amount, medications.unit, doses.timing_label,
            doses.scheduled_date, doses.scheduled_time, doses.status
     FROM doses
     INNER JOIN medications ON medications.id = doses.medication_id
     WHERE doses.scheduled_date = ?
       AND medications.is_active = 1
     ORDER BY doses.scheduled_time, medications.name COLLATE NOCASE`,
    today
  );
}

export async function markDoseTaken(doseId: number): Promise<void> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `UPDATE doses
     SET status = 'taken', taken_at = datetime('now')
     WHERE id = ? AND status IN ('upcoming', 'overdue')`,
    doseId
  );

  if (result.changes !== 1) {
    throw new Error('The dose no longer exists or has already been updated.');
  }
}