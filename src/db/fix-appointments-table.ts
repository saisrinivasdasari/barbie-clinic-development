import { libsqlClient } from "../lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function fixAppointmentsTable() {
  console.log("=== FIXING APPOINTMENTS TABLE COLUMNS IN TURSO DB ===");

  const alterQueries = [
    `ALTER TABLE appointments ADD COLUMN customer_name TEXT;`,
    `ALTER TABLE appointments ADD COLUMN treatment_id TEXT;`,
    `ALTER TABLE appointments ADD COLUMN treatment_name TEXT;`,
    `ALTER TABLE appointments ADD COLUMN doctor_id TEXT;`,
    `ALTER TABLE appointments ADD COLUMN appointment_date TEXT;`,
    `ALTER TABLE appointments ADD COLUMN appointment_time TEXT;`,
  ];

  for (const q of alterQueries) {
    try {
      await libsqlClient.execute(q);
      console.log("Executed:", q);
    } catch (e: any) {
      console.log("Column already exists or skipped:", e.message);
    }
  }

  // Copy existing values from old column names if any exist
  try {
    await libsqlClient.execute(`UPDATE appointments SET customer_name = name WHERE customer_name IS NULL AND name IS NOT NULL`);
    await libsqlClient.execute(`UPDATE appointments SET treatment_name = service_name WHERE treatment_name IS NULL AND service_name IS NOT NULL`);
    await libsqlClient.execute(`UPDATE appointments SET appointment_date = preferred_date WHERE appointment_date IS NULL AND preferred_date IS NOT NULL`);
    await libsqlClient.execute(`UPDATE appointments SET appointment_time = preferred_time WHERE appointment_time IS NULL AND preferred_time IS NOT NULL`);
    console.log("Copied legacy columns to new column names successfully!");
  } catch (e: any) {
    console.log("Update query notice:", e.message);
  }

  console.log("=== VERIFYING FINAL APPOINTMENTS COLUMNS ===");
  const info = await libsqlClient.execute("PRAGMA table_info(appointments)");
  info.rows.forEach(col => console.log(` - ${col.name} (${col.type})`));
}

fixAppointmentsTable().catch(console.error);
