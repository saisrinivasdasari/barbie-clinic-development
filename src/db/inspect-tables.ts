import { libsqlClient } from "../lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function inspectAppointmentsTable() {
  console.log("=== PRAGMA TABLE_INFO FOR APPOINTMENTS ===");
  const info = await libsqlClient.execute("PRAGMA table_info(appointments)");
  info.rows.forEach(col => console.log(col.name, "(", col.type, ")"));

  console.log("\n=== SELECT 1 ROW FROM APPOINTMENTS ===");
  const sample = await libsqlClient.execute("SELECT * FROM appointments LIMIT 1");
  console.log("Sample row keys:", Object.keys(sample.rows[0] || {}));
  console.log("Sample row:", sample.rows[0]);
}

inspectAppointmentsTable().catch(console.error);
