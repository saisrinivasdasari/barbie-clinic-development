import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GET } from "../app/api/admin/treatments/route";

async function test() {
  const res = await GET();
  const json = await res.json();
  console.log(`Treatments API response status: ${res.status}`);
  console.log(`Total treatments returned: ${json.data ? json.data.length : 0}`);
  if (json.data) {
    json.data.forEach((t: any, i: number) => {
      console.log(`[${i + 1}] ${t.title} (${t.category}) - Assigned Doctors: ${t.assignedDoctors.map((d: any) => d.name).join(", ")}`);
    });
  }
}

test();
