import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, doctorTreatments } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const treatmentId = searchParams.get("treatmentId");

    const allDoctors = await db.select().from(doctors);

    let result = allDoctors;
    if (treatmentId) {
      const mappings = await db
        .select()
        .from(doctorTreatments)
        .where(eq(doctorTreatments.treatmentId, treatmentId));

      const doctorIds = mappings.map((m) => m.doctorId);
      result = allDoctors.filter((d) => doctorIds.includes(d.id));
    }

    return NextResponse.json(
      { success: true, data: result },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching doctors for treatment:", error);
    return NextResponse.json({ error: "Failed to fetch doctors." }, { status: 500 });
  }
}
