import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, doctorBlockedDates } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId");

    if (!doctorId) {
      return NextResponse.json({ error: "doctorId parameter is required." }, { status: 400 });
    }

    // 1. Fetch Doctor working days
    const docList = await db.select().from(doctors).where(eq(doctors.id, doctorId));
    const doc = docList.length ? docList[0] : null;

    let workingDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (doc && doc.workingDays) {
      try {
        workingDays = JSON.parse(doc.workingDays);
      } catch (e) {
        console.error("Error parsing workingDays:", e);
      }
    }

    // 2. Fetch Blocked Dates
    const blockedDatesList = await db
      .select()
      .from(doctorBlockedDates)
      .where(eq(doctorBlockedDates.doctorId, doctorId));

    const blockedDates = blockedDatesList.map((item) => item.blockedDate);

    return NextResponse.json(
      {
        success: true,
        workingDays,
        blockedDates,
      },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } }
    );
  } catch (error: any) {
    console.error("Error fetching blocked dates:", error);
    return NextResponse.json({ error: "Failed to fetch blocked dates." }, { status: 500 });
  }
}
