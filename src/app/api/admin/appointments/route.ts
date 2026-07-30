import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const doctorId = searchParams.get("doctorId");
    const treatmentId = searchParams.get("treatmentId");
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    let list = await db.select().from(appointments).orderBy(desc(appointments.createdAt));

    if (search) {
      list = list.filter(
        (a) =>
          a.customerName.toLowerCase().includes(search) ||
          a.phone.includes(search) ||
          a.doctorName.toLowerCase().includes(search) ||
          a.treatmentName.toLowerCase().includes(search)
      );
    }

    if (doctorId && doctorId !== "all") {
      list = list.filter((a) => a.doctorId === doctorId);
    }

    if (treatmentId && treatmentId !== "all") {
      list = list.filter((a) => a.treatmentId === treatmentId);
    }

    if (status && status !== "all") {
      list = list.filter((a) => a.status === status);
    }

    if (date) {
      list = list.filter((a) => a.appointmentDate === date);
    }

    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { appointmentId, status } = body;

    if (!appointmentId || !status) {
      return NextResponse.json({ error: "appointmentId and status are required." }, { status: 400 });
    }

    const validStatuses = ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    await db
      .update(appointments)
      .set({ status, updatedAt: new Date().toISOString() })
      .where(eq(appointments.id, appointmentId));

    return NextResponse.json({ success: true, message: `Appointment status updated to ${status}.` });
  } catch (error: any) {
    console.error("Error updating appointment status:", error);
    return NextResponse.json({ error: "Failed to update appointment status." }, { status: 500 });
  }
}
