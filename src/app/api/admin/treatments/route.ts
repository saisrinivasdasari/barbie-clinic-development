import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { treatments, doctorTreatments, doctors } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/admin/treatments
export async function GET() {
  try {
    const allTrts = await db.select().from(treatments);
    const allMappings = await db.select().from(doctorTreatments);
    const allDocs = await db.select().from(doctors);

    const result = allTrts.map((trt) => {
      const assignedDocIds = allMappings
        .filter((m) => m.treatmentId === trt.id)
        .map((m) => m.doctorId);
      const assignedDocs = allDocs.filter((d) => assignedDocIds.includes(d.id));

      return {
        ...trt,
        assignedDoctorIds: assignedDocIds,
        assignedDoctors: assignedDocs,
      };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error fetching treatments:", error);
    return NextResponse.json({ error: "Failed to fetch treatments." }, { status: 500 });
  }
}

// POST /api/admin/treatments - Add new treatment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, description, durationMinutes, imageUrl, category, doctorIds } = body;

    if (!title) {
      return NextResponse.json({ error: "Treatment title is required." }, { status: 400 });
    }

    const id = `trt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    await db.insert(treatments).values({
      id,
      title,
      subtitle: subtitle || "",
      description: description || "",
      durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : 30,
      imageUrl: imageUrl || "/images/procedures/peeling.png",
      category: category || "Dermatology",
    });

    // Insert doctor mappings
    if (Array.isArray(doctorIds)) {
      for (const docId of doctorIds) {
        const mapId = `dt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await db.insert(doctorTreatments).values({
          id: mapId,
          doctorId: docId,
          treatmentId: id,
        });
      }
    }

    return NextResponse.json({ success: true, message: "Treatment created successfully!", id }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating treatment:", error);
    return NextResponse.json({ error: "Failed to create treatment." }, { status: 500 });
  }
}

// PUT /api/admin/treatments - Edit treatment
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, subtitle, description, durationMinutes, imageUrl, category, doctorIds } = body;

    if (!id || !title) {
      return NextResponse.json({ error: "Treatment id and title are required." }, { status: 400 });
    }

    await db
      .update(treatments)
      .set({
        title,
        subtitle: subtitle || "",
        description: description || "",
        durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : 30,
        imageUrl: imageUrl || "/images/procedures/peeling.png",
        category: category || "Dermatology",
      })
      .where(eq(treatments.id, id));

    // Update doctor mappings: clear existing & re-insert
    await db.delete(doctorTreatments).where(eq(doctorTreatments.treatmentId, id));

    if (Array.isArray(doctorIds)) {
      for (const docId of doctorIds) {
        const mapId = `dt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await db.insert(doctorTreatments).values({
          id: mapId,
          doctorId: docId,
          treatmentId: id,
        });
      }
    }

    return NextResponse.json({ success: true, message: "Treatment updated successfully!" });
  } catch (error: any) {
    console.error("Error updating treatment:", error);
    return NextResponse.json({ error: "Failed to update treatment." }, { status: 500 });
  }
}

// DELETE /api/admin/treatments - Delete treatment
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Treatment id is required." }, { status: 400 });
    }

    await db.delete(treatments).where(eq(treatments.id, id));
    await db.delete(doctorTreatments).where(eq(doctorTreatments.treatmentId, id));

    return NextResponse.json({ success: true, message: "Treatment deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting treatment:", error);
    return NextResponse.json({ error: "Failed to delete treatment." }, { status: 500 });
  }
}
