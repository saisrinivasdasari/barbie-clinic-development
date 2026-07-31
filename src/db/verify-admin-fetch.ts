import { libsqlClient } from "../lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function verifyAdminFetch() {
  console.log("Verifying admin dashboard and appointment data fetch from Turso...");
  const res = await libsqlClient.execute("SELECT id, customer_name as customerName, phone, treatment_name as treatmentName, doctor_name as doctorName, appointment_date as appointmentDate, appointment_time as appointmentTime, status, created_at as createdAt FROM appointments ORDER BY created_at DESC");

  console.log("Total appointments retrieved:", res.rows.length);
  res.rows.forEach((row, idx) => {
    console.log(`[${idx + 1}] ID: ${row.customerName} | ${row.treatmentName} | ${row.doctorName} | Date: ${row.appointmentDate} ${row.appointmentTime} | Status: ${row.status}`);
  });
}

verifyAdminFetch().catch(console.error);
