import { db, libsqlClient } from "../lib/db";
import { appointments } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function test() {
  console.log("Testing appointment insert into Turso...");
  const id = `apt_test_${Date.now()}`;
  const nowIso = new Date().toISOString();

  try {
    await db.insert(appointments).values({
      id,
      customerName: "Test Patient",
      phone: "+919876543210",
      email: "test@example.com",
      treatmentId: "trt_vitiligo",
      treatmentName: "Vitiligo Treatment",
      doctorId: "doc_mnrao",
      doctorName: "Dr. M.N. Rao",
      appointmentDate: "2026-08-01",
      appointmentTime: "11:00",
      status: "Pending",
      notes: "Test appointment insert",
      createdAt: nowIso,
      updatedAt: nowIso,
    });
    console.log("Drizzle insert SUCCESS!");
  } catch (e) {
    console.error("Drizzle insert FAILED:", e);
    console.log("Testing Raw SQL insert...");
    await libsqlClient.execute({
      sql: `INSERT INTO appointments (id, customer_name, phone, email, treatment_id, treatment_name, doctor_id, doctor_name, appointment_date, appointment_time, notes, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, "Test Patient", "+919876543210", "test@example.com", "trt_vitiligo", "Vitiligo Treatment", "doc_mnrao", "Dr. M.N. Rao", "2026-08-01", "11:00", "Test appointment insert", "Pending", nowIso, nowIso]
    });
    console.log("Raw SQL insert SUCCESS!");
  }

  const res = await libsqlClient.execute("SELECT * FROM appointments");
  console.log("Total Appointments in Turso DB:", res.rows.length);
  console.log("Latest Appointment Row:", res.rows[res.rows.length - 1]);
}

test().catch(console.error);
