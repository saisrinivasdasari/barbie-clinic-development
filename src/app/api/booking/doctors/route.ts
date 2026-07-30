import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, doctorTreatments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const treatmentId = searchParams.get("treatmentId");

    const allDoctors = await db.select().from(doctors);

    if (!treatmentId) {
      return NextResponse.json({ success: true, data: allDoctors });
    }

    const mappings = await db
      .select()
      .from(doctorTreatments)
      .where(eq(doctorTreatments.treatmentId, treatmentId));

    const doctorIds = mappings.map((m) => m.doctorId);
    const filteredDocs = allDoctors.filter((d) => doctorIds.includes(d.id));

    return NextResponse.json({ success: true, data: filteredDocs });
  } catch (error: any) {
    console.error("Error fetching doctors for treatment:", error);
    return NextResponse.json({ error: "Failed to fetch doctors." }, { status: 500 });
  }
}
