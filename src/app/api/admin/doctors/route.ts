import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, doctorBlockedDates, doctorBlockedSlots, appointments } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/admin/doctors - Get all doctors with their schedule, blocked dates, and blocked slots
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId");

    const allDocs = await db.select().from(doctors);
    const allBlockedDates = await db.select().from(doctorBlockedDates);
    const allBlockedSlots = await db.select().from(doctorBlockedSlots);

    const result = allDocs.map((doc) => {
      const blockedDates = allBlockedDates.filter((b) => b.doctorId === doc.id);
      const blockedSlots = allBlockedSlots.filter((b) => b.doctorId === doc.id);
      let workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      try {
        if (doc.workingDays) workingDays = JSON.parse(doc.workingDays);
      } catch (e) {}

      return {
        ...doc,
        workingDays,
        blockedDates,
        blockedSlots,
      };
    });

    if (doctorId) {
      const single = result.find((d) => d.id === doctorId);
      if (!single) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
      
      // Also fetch doctor appointments
      const docApts = await db.select().from(appointments).where(eq(appointments.doctorId, doctorId));
      return NextResponse.json(
        { success: true, data: { ...single, appointments: docApts } },
        { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } }
      );
    }

    return NextResponse.json(
      { success: true, data: result },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } }
    );
  } catch (error: any) {
    console.error("Error fetching admin doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors." }, { status: 500 });
  }
}

// PUT /api/admin/doctors - Update doctor working hours/days
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { doctorId, workingDays, workingHoursStart, workingHoursEnd, lunchStart, lunchEnd } = body;

    if (!doctorId) {
      return NextResponse.json({ error: "doctorId is required." }, { status: 400 });
    }

    await db
      .update(doctors)
      .set({
        workingDays: JSON.stringify(workingDays || []),
        workingHoursStart: workingHoursStart || "10:00",
        workingHoursEnd: workingHoursEnd || "20:00",
        lunchStart: lunchStart || "14:00",
        lunchEnd: lunchEnd || "15:00",
      })
      .where(eq(doctors.id, doctorId));

    return NextResponse.json({ success: true, message: "Doctor schedule updated successfully!" });
  } catch (error: any) {
    console.error("Error updating doctor schedule:", error);
    return NextResponse.json({ error: "Failed to update doctor schedule." }, { status: 500 });
  }
}

// POST /api/admin/doctors - Block a date or time slot
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, doctorId, date, timeSlot, reason } = body;

    if (!doctorId || !date) {
      return NextResponse.json({ error: "doctorId and date are required." }, { status: 400 });
    }

    if (action === "block_date") {
      const id = `bd_${Date.now()}`;
      await db.insert(doctorBlockedDates).values({
        id,
        doctorId,
        blockedDate: date,
        reason: reason || "Offline / Leave",
      });
      return NextResponse.json({ success: true, message: `Date ${date} blocked successfully.`, id });
    } else if (action === "block_slot") {
      if (!timeSlot) return NextResponse.json({ error: "timeSlot is required." }, { status: 400 });
      const id = `bs_${Date.now()}`;
      await db.insert(doctorBlockedSlots).values({
        id,
        doctorId,
        blockedDate: date,
        timeSlot,
        reason: reason || "Offline Booking",
      });
      return NextResponse.json({ success: true, message: `Slot ${timeSlot} on ${date} blocked successfully.`, id });
    }

    return NextResponse.json({ error: "Invalid action type." }, { status: 400 });
  } catch (error: any) {
    console.error("Error blocking date/slot:", error);
    return NextResponse.json({ error: "Failed to block date/slot." }, { status: 500 });
  }
}

// DELETE /api/admin/doctors - Unblock a date or time slot
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // 'date' | 'slot'
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json({ error: "type and id parameters are required." }, { status: 400 });
    }

    if (type === "date") {
      await db.delete(doctorBlockedDates).where(eq(doctorBlockedDates.id, id));
      return NextResponse.json({ success: true, message: "Blocked date removed." });
    } else if (type === "slot") {
      await db.delete(doctorBlockedSlots).where(eq(doctorBlockedSlots.id, id));
      return NextResponse.json({ success: true, message: "Blocked slot removed." });
    }

    return NextResponse.json({ error: "Invalid type." }, { status: 400 });
  } catch (error: any) {
    console.error("Error unblocking date/slot:", error);
    return NextResponse.json({ error: "Failed to unblock date/slot." }, { status: 500 });
  }
}
