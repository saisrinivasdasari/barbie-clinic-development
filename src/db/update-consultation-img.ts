import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "../lib/db";
import { treatments } from "./schema";
import { eq } from "drizzle-orm";

async function run() {
  await db.update(treatments)
    .set({ imageUrl: "/images/procedures/consultation.png" })
    .where(eq(treatments.id, "trt_consultation"));
  console.log("Updated General Dermatology Consultation image in Turso!");
}

run();
