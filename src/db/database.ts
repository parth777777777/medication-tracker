import * as SQLite from 'expo-sqlite';
import { SCHEMA } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (db) return db;

  db = await SQLite.openDatabaseAsync('meds-tracker.db');

  await db.execAsync(SCHEMA);

  return db;
}


