import { getDatabase } from './database';

export type Medication = {
  id: number;
  name: string;
  dosage_amount: number;
  unit: string;
  instructions: string | null;
  dosing_mode: 'fixed_times' | 'interval';
  interval_hours: number | null;
  stop_doses_at_sleep: number;
  start_date: string;
  end_date: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export async function getMedications(): Promise<Medication[]> {
  const db = await getDatabase();

  return await db.getAllAsync<Medication>(
    'SELECT * FROM medications ORDER BY created_at DESC'
  );
}

export type NewMedication = {
  name: string;
  dosage_amount?: number;
  unit?: string;
  instructions?: string;
  dosing_mode: 'fixed_times' | 'interval';
  interval_hours?: number;
  stop_doses_at_sleep?: boolean;
  start_date: string;
  end_date?: string;
}

export type DoseRuleInput = {
  timing_label: string;
  custom_time?: string;
  day_of_week: number | null;
  sort_order: number;
}

export async function addMedication(medication: NewMedication): Promise<number> {
  return addMedicationWithDoseRules(medication, []);
}

export async function addMedicationWithDoseRules(
  medication: NewMedication,
  doseRules: DoseRuleInput[]
): Promise<number> {
  const db = await getDatabase();
  let medicationId = 0;

  await db.withTransactionAsync(async () => {
    const result = await db.runAsync(
      `INSERT INTO medications (
        name,
        dosage_amount,
        unit,
        instructions,
        dosing_mode,
        interval_hours,
        stop_doses_at_sleep,
        start_date,
        end_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      medication.name,
      medication.dosage_amount ?? 1,
      medication.unit ?? 'tablet',
      medication.instructions ?? null,
      medication.dosing_mode,
      medication.interval_hours ?? null,
      medication.stop_doses_at_sleep === false ? 0 : 1,
      medication.start_date,
      medication.end_date ?? null
    );
    medicationId = result.lastInsertRowId;

    for (const rule of doseRules) {
      await db.runAsync(
        `INSERT INTO dose_rules (
          medication_id,
          timing_label,
          custom_time,
          day_of_week,
          sort_order
        ) VALUES (?, ?, ?, ?, ?)`,
        medicationId,
        rule.timing_label,
        rule.custom_time ?? null,
        rule.day_of_week,
        rule.sort_order
      );
    }
  });

  return medicationId;
}