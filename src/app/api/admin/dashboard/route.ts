import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, doctors, treatments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const allAppointments = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    const allDocs = await db.select().from(doctors);
    const allTrts = await db.select().from(treatments);

    // Get Today's Date String YYYY-MM-DD
    const todayStr = new Date().toISOString().split("T")[0];

    const todayApts = allAppointments.filter((a) => a.appointmentDate === todayStr);
    const pendingApts = allAppointments.filter((a) => a.status === "Pending");
    const acceptedApts = allAppointments.filter((a) => a.status === "Accepted");

    return NextResponse.json({
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
    });
  } catch (error: any) {
    console.error("Error fetching admin dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data." }, { status: 500 });
  }
}
