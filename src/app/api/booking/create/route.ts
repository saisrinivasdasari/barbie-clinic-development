import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, doctors, treatments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, email, treatmentId, doctorId, appointmentDate, appointmentTime, notes } = body;

    if (!customerName || !phone || !treatmentId || !doctorId || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: "Customer Name, Phone, Treatment, Doctor, Date, and Time are required fields." },
        { status: 400 }
      );
    }

    // Fetch Doctor Name & Treatment Title
    const doc = await db.select().from(doctors).where(eq(doctors.id, doctorId));
    const trt = await db.select().from(treatments).where(eq(treatments.id, treatmentId));

    const doctorName = doc.length ? doc[0].name : "Specialist Doctor";
    const treatmentName = trt.length ? trt[0].title : "Clinical Treatment";

    const id = `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 1. Insert into Turso DB
    await db.insert(appointments).values({
      id,
      customerName,
      phone,
      email: email || "",
      treatmentId,
      treatmentName,
      doctorId,
      doctorName,
      appointmentDate,
      appointmentTime,
      status: "Pending",
      notes: notes || "",
    });

    // 2. Generate WhatsApp Pre-filled URL
    // Format Date e.g. "15 Aug 2026"
    const dateObj = new Date(appointmentDate + "T00:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Format Time e.g. "11:30 AM"
    const [hStr, mStr] = appointmentTime.split(":");
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const formattedTime = `${h}:${mStr} ${ampm}`;

    const messageText = `Name: ${customerName}\nPhone: ${phone}\nTreatment: ${treatmentName}\nDoctor: ${doctorName}\nDate: ${formattedDate}\nTime: ${formattedTime}`;
    const whatsappPhone = "918832421234";
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messageText)}`;

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully!",
        appointmentId: id,
        whatsappUrl,
        appointment: {
          customerName,
          phone,
          treatmentName,
          doctorName,
          appointmentDate: formattedDate,
          appointmentTime: formattedTime,
          status: "Pending",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to book appointment." }, { status: 500 });
  }
}
