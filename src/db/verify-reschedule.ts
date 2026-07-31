import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PATCH } from "../app/api/admin/appointments/route";

async function test() {
  const mockReq = {
    json: async () => ({
      appointmentId: "testing",
      appointmentDate: "2026-08-05",
      appointmentTime: "11:30",
      status: "Accepted",
    }),
  } as any;

  const res = await PATCH(mockReq);
  const json = await res.json();
  console.log("Reschedule test result status:", res.status);
  console.log("Reschedule response:", json);
}

test();
