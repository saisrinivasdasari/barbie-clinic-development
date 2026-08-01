import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GET } from "../app/api/booking/available-slots/route";

async function test() {
  const reqObj = {
    url: "http://localhost:3000/api/booking/available-slots?doctorId=doc_mnrao&date=2026-08-05",
  } as any;

  const res = await GET(reqObj);
  const json = await res.json();
  console.log("Slots Calculation Response:", json);
}

test();
