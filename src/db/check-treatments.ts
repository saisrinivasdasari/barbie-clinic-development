import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../lib/db";
import { treatments } from "./schema";

async function main() {
  try {
    const list = await db.select().from(treatments);
    console.log(`Total treatments in Turso DB: ${list.length}`);
    list.forEach((t, i) => {
      console.log(`[${i + 1}] ID: ${t.id} | Title: ${t.title} | Category: ${t.category}`);
    });
  } catch (e: any) {
    console.error("Error fetching treatments:", e.message);
  }
}

main();
