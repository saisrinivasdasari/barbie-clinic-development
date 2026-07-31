import { NextResponse } from "next/server";
import { db, libsqlClient } from "@/lib/db";
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

    let list: any[] = [];
    try {
      list = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    } catch (dbErr) {
      console.error("Drizzle select error in /api/admin/appointments, running raw LibSQL query fallback:", dbErr);
      const rawApts = await libsqlClient.execute("SELECT id, customer_name as customerName, phone, email, treatment_id as treatmentId, treatment_name as treatmentName, doctor_id as doctorId, doctor_name as doctorName, appointment_date as appointmentDate, appointment_time as appointmentTime, status, created_at as createdAt FROM appointments ORDER BY created_at DESC");
      list = rawApts.rows as any[];
    }

    if (search) {
      list = list.filter(
        (a) =>
          (a.customerName && a.customerName.toLowerCase().includes(search)) ||
          (a.phone && a.phone.includes(search)) ||
          (a.doctorName && a.doctorName.toLowerCase().includes(search)) ||
          (a.treatmentName && a.treatmentName.toLowerCase().includes(search))
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
    const { appointmentId, status, appointmentDate, appointmentTime } = body;

    if (!appointmentId) {
      return NextResponse.json({ error: "appointmentId is required." }, { status: 400 });
    }

    const updateData: any = { updatedAt: new Date().toISOString() };
    if (status) updateData.status = status;
    if (appointmentDate) updateData.appointmentDate = appointmentDate;
    if (appointmentTime) updateData.appointmentTime = appointmentTime;

    try {
      await db
        .update(appointments)
        .set(updateData)
        .where(eq(appointments.id, appointmentId));
    } catch (e) {
      let setClause = "updated_at = ?";
      const args: any[] = [updateData.updatedAt];
      if (status) { setClause += ", status = ?"; args.push(status); }
      if (appointmentDate) { setClause += ", appointment_date = ?"; args.push(appointmentDate); }
      if (appointmentTime) { setClause += ", appointment_time = ?"; args.push(appointmentTime); }
      args.push(appointmentId);
      await libsqlClient.execute({
        sql: `UPDATE appointments SET ${setClause} WHERE id = ?`,
        args,
      });
    }

    return NextResponse.json({ success: true, message: "Appointment updated successfully." });
  } catch (error: any) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Failed to update appointment." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Appointment ID is required." }, { status: 400 });
    }

    try {
      await db.delete(appointments).where(eq(appointments.id, id));
    } catch (e) {
      await libsqlClient.execute({
        sql: "DELETE FROM appointments WHERE id = ?",
        args: [id],
      });
    }

    return NextResponse.json({ success: true, message: "Appointment deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ error: "Failed to delete appointment." }, { status: 500 });
  }
}
