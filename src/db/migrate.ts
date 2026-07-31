import { libsqlClient } from "../lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export async function initTables() {
  console.log("Initializing Turso DB tables...");

  const queries = [
    `CREATE TABLE IF NOT EXISTS doctors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      qualifications TEXT,
      experience_years INTEGER DEFAULT 30,
      bio TEXT,
      photo_url TEXT,
      phone TEXT,
      email TEXT,
      working_days TEXT DEFAULT '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
      working_hours_start TEXT DEFAULT '10:00',
      working_hours_end TEXT DEFAULT '20:00',
      lunch_start TEXT DEFAULT '14:00',
      lunch_end TEXT DEFAULT '15:00',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    `CREATE TABLE IF NOT EXISTS treatments (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      duration_minutes INTEGER DEFAULT 30,
      image_url TEXT,
      category TEXT DEFAULT 'Dermatology',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    `CREATE TABLE IF NOT EXISTS doctor_treatments (
      id TEXT PRIMARY KEY,
      doctor_id TEXT NOT NULL,
      treatment_id TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS doctor_blocked_dates (
      id TEXT PRIMARY KEY,
      doctor_id TEXT NOT NULL,
      blocked_date TEXT NOT NULL,
      reason TEXT DEFAULT 'Offline / Leave'
    );`,

    `CREATE TABLE IF NOT EXISTS doctor_blocked_slots (
      id TEXT PRIMARY KEY,
      doctor_id TEXT NOT NULL,
      blocked_date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      reason TEXT DEFAULT 'Offline Booking'
    );`,

    `CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      treatment_id TEXT NOT NULL,
      treatment_name TEXT NOT NULL,
      doctor_id TEXT NOT NULL,
      doctor_name TEXT NOT NULL,
      appointment_date TEXT NOT NULL,
      appointment_time TEXT NOT NULL,
      duration_minutes INTEGER DEFAULT 30,
      notes TEXT,
      status TEXT DEFAULT 'Pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    `CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
  ];

  for (const q of queries) {
    try {
      await libsqlClient.execute(q);
    } catch (err) {
      console.error("Error running table query:", err);
    }
  }

  // Ensure all columns exist
  const alterQueries = [
    `ALTER TABLE doctors ADD COLUMN phone TEXT;`,
    `ALTER TABLE doctors ADD COLUMN email TEXT;`,
    `ALTER TABLE doctors ADD COLUMN working_days TEXT DEFAULT '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]';`,
    `ALTER TABLE doctors ADD COLUMN working_hours_start TEXT DEFAULT '10:00';`,
    `ALTER TABLE doctors ADD COLUMN working_hours_end TEXT DEFAULT '20:00';`,
    `ALTER TABLE doctors ADD COLUMN lunch_start TEXT DEFAULT '14:00';`,
    `ALTER TABLE doctors ADD COLUMN lunch_end TEXT DEFAULT '15:00';`,
    `ALTER TABLE doctors ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;`,
    `ALTER TABLE treatments ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;`,
    `ALTER TABLE appointments ADD COLUMN duration_minutes INTEGER DEFAULT 30;`,
    `ALTER TABLE appointments ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;`,
    `ALTER TABLE appointments ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;`,
  ];

  for (const alterQ of alterQueries) {
    try {
      await libsqlClient.execute(alterQ);
    } catch (e) {
      // Column already exists - safe to ignore
    }
  }

  console.log("All Turso tables initialized and columns migrated successfully!");
}

if (require.main === module) {
  initTables().catch(console.error);
}
