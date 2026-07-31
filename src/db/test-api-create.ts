import { libsqlClient } from "../lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testApiCreate() {
  console.log("Simulating booking creation in Turso DB...");
  const id = `APT_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const nowIso = new Date().toISOString();

  await libsqlClient.execute({
    sql: `INSERT INTO appointments (id, customer_name, phone, email, treatment_id, treatment_name, doctor_id, doctor_name, appointment_date, appointment_time, notes, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      "Demo Patient",
      "1234654432",
      "demo@example.com",
      "trt_vitiligo",
      "Dermatology Consultation",
      "doc_mnrao",
      "Dr. M.N. Rao",
      "2026-07-31",
      "10:00 AM",
      "Demo booking test",
      "Pending",
      nowIso,
      nowIso,
    ],
  });

  console.log("Direct Turso insert complete for ID:", id);

  const check = await libsqlClient.execute({
    sql: "SELECT * FROM appointments WHERE id = ?",
    args: [id],
  });

  console.log("Retrieved row from Turso:", check.rows[0]);
}

testApiCreate().catch(console.error);
