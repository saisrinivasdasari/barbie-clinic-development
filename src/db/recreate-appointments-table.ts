import { libsqlClient } from "../lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function recreateAppointmentsTable() {
  console.log("=== RECREATING APPOINTMENTS TABLE CLEANLY IN TURSO DB ===");

  await libsqlClient.execute("DROP TABLE IF EXISTS appointments_old");
  
  try {
    await libsqlClient.execute("ALTER TABLE appointments RENAME TO appointments_old");
    console.log("Renamed old appointments table to appointments_old");
  } catch (e: any) {
    console.log("Rename info:", e.message);
  }

  await libsqlClient.execute(`
    CREATE TABLE appointments (
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
    );
  `);
  console.log("New appointments table created successfully with modern schema!");

  // Try restoring old rows if any existed
  try {
    await libsqlClient.execute(`
      INSERT INTO appointments (id, customer_name, phone, email, treatment_id, treatment_name, doctor_id, doctor_name, appointment_date, appointment_time, notes, status, created_at)
      SELECT 
        id, 
        COALESCE(customer_name, name, 'Patient') as customer_name,
        COALESCE(phone, 'Not Provided') as phone,
        email,
        COALESCE(treatment_id, 'trt_vitiligo') as treatment_id,
        COALESCE(treatment_name, service_name, 'Dermatology Consultation') as treatment_name,
        COALESCE(doctor_id, 'doc_mnrao') as doctor_id,
        COALESCE(doctor_name, 'Dr. M.N. Rao') as doctor_name,
        COALESCE(appointment_date, preferred_date, '2026-07-31') as appointment_date,
        COALESCE(appointment_time, preferred_time, '10:00') as appointment_time,
        notes,
        COALESCE(status, 'Pending') as status,
        COALESCE(created_at, CURRENT_TIMESTAMP) as created_at
      FROM appointments_old
    `);
    console.log("Restored legacy appointment rows into new schema!");
  } catch (e: any) {
    console.log("Legacy row restoration notice:", e.message);
  }

  console.log("=== VERIFYING CLEAN APPOINTMENTS COLUMNS ===");
  const info = await libsqlClient.execute("PRAGMA table_info(appointments)");
  info.rows.forEach(col => console.log(` - ${col.name} (${col.type})`));
}

recreateAppointmentsTable().catch(console.error);
