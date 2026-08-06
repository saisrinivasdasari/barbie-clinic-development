import { NextResponse } from "next/server";
import { db, libsqlClient } from "@/lib/db";
import { appointments, doctors, treatments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let allAppointments = [];
    let allDocs = [];
    let allTrts = [];

    try {
      allAppointments = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
      allDocs = await db.select().from(doctors);
      allTrts = await db.select().from(treatments);
    } catch (dbErr) {
      console.error("Drizzle select error in dashboard, running raw LibSQL query fallback:", dbErr);
      const rawApts = await libsqlClient.execute("SELECT id, customer_name as customerName, phone, email, treatment_id as treatmentId, treatment_name as treatmentName, doctor_id as doctorId, doctor_name as doctorName, appointment_date as appointmentDate, appointment_time as appointmentTime, status, created_at as createdAt FROM appointments ORDER BY created_at DESC");
      allAppointments = rawApts.rows as any[];
    }

    // Get Today's Date String YYYY-MM-DD
    const todayStr = new Date().toISOString().split("T")[0];

    const todayApts = allAppointments.filter((a) => a.appointmentDate === todayStr);
    const pendingApts = allAppointments.filter((a) => a.status === "Pending");
    const acceptedApts = allAppointments.filter((a) => a.status === "Accepted");

    return NextResponse.json(
      {
        success: true,
        stats: {
          todaysAppointments: todayApts.length,
          pendingAppointments: pendingApts.length,
          acceptedAppointments: acceptedApts.length,
          totalDoctors: allDocs.length,
          totalTreatments: allTrts.length,
          totalAppointments: allAppointments.length,
        },
        todaysList: todayApts,
        pendingList: pendingApts,
        recentList: allAppointments.slice(0, 10),
      },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate" } }
    );
  } catch (error: any) {
    console.error("Error fetching admin dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data." }, { status: 500 });
  }
}
