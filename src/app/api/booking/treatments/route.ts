import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { treatments, doctorTreatments, doctors } from "@/db/schema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const allTreatments = await db.select().from(treatments);
    const allDoctorMappings = await db.select().from(doctorTreatments);
    const allDoctors = await db.select().from(doctors);

    // Map doctors to each treatment
    const data = allTreatments.map((trt) => {
      const assignedDocIds = allDoctorMappings
        .filter((m) => m.treatmentId === trt.id)
        .map((m) => m.doctorId);
      const assignedDocs = allDoctors.filter((d) => assignedDocIds.includes(d.id));

      return {
        ...trt,
        doctorsCount: assignedDocs.length,
        doctors: assignedDocs,
      };
    });

    return NextResponse.json(
      { success: true, data },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching booking treatments:", error);
    return NextResponse.json({ error: "Failed to fetch treatments." }, { status: 500 });
  }
}
