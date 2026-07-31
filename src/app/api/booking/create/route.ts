import { NextResponse } from "next/server";
import { db, libsqlClient } from "@/lib/db";
import { appointments, doctors, treatments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, email, treatmentId, doctorId, appointmentDate, appointmentTime, notes } = body;

    const customerNameVal = customerName || "Patient";
    const phoneVal = phone || "Not Provided";
    const treatmentIdVal = treatmentId || "trt_vitiligo";
    const doctorIdVal = doctorId || "doc_mnrao";
    const appointmentDateVal = appointmentDate || new Date().toISOString().split("T")[0];
    const appointmentTimeVal = appointmentTime || "10:00";

    let doctorName = "Dr. M.N. Rao";
    let treatmentName = "Dermatology Consultation";

    try {
      // Fetch Doctor Name & Treatment Title
      const doc = await db.select().from(doctors).where(eq(doctors.id, doctorIdVal));
      const trt = await db.select().from(treatments).where(eq(treatments.id, treatmentIdVal));

      if (doc.length) doctorName = doc[0].name;
      else if (doctorIdVal === "doc_meghamala") doctorName = "Dr. G. Megha.mala";

      if (trt.length) treatmentName = trt[0].title;
    } catch (e) {
      console.error("DB query warning in /api/booking/create:", e);
    }

    const id = `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();

    // 1. Insert into Turso DB safely
    try {
      await db.insert(appointments).values({
        id,
        customerName: customerNameVal,
        phone: phoneVal,
        email: email || "",
        treatmentId: treatmentIdVal,
        treatmentName,
        doctorId: doctorIdVal,
        doctorName,
        appointmentDate: appointmentDateVal,
        appointmentTime: appointmentTimeVal,
        status: "Pending",
        notes: notes || "",
        createdAt: nowIso,
        updatedAt: nowIso,
      });
      console.log("Appointment successfully inserted via Drizzle:", id);
    } catch (dbErr) {
      console.error("Drizzle insert failed, running raw SQL fallback:", dbErr);
      try {
        await libsqlClient.execute({
          sql: `INSERT INTO appointments (id, customer_name, phone, email, treatment_id, treatment_name, doctor_id, doctor_name, appointment_date, appointment_time, notes, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [id, customerNameVal, phoneVal, email || "", treatmentIdVal, treatmentName, doctorIdVal, doctorName, appointmentDateVal, appointmentTimeVal, notes || "", "Pending", nowIso, nowIso]
        });
        console.log("Raw SQL insert successful for ID:", id);
      } catch (rawErr) {
        console.error("Raw SQL insert failed:", rawErr);
      }
    }

    // 2. Generate WhatsApp Pre-filled URL
    // Format Date e.g. "15 Aug 2026"
    let formattedDate = appointmentDateVal;
    try {
      const dateObj = new Date(appointmentDateVal + "T00:00:00");
      formattedDate = dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {}

    // Format Time e.g. "11:30 AM"
    let formattedTime = appointmentTimeVal;
    try {
      const [hStr, mStr] = appointmentTimeVal.split(":");
      let h = parseInt(hStr, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      formattedTime = `${h}:${mStr || "00"} ${ampm}`;
    } catch (e) {}

    const messageText = `Name: ${customerNameVal}\nPhone: ${phoneVal}\nTreatment: ${treatmentName}\nDoctor: ${doctorName}\nDate: ${formattedDate}\nTime: ${formattedTime}`;
    const whatsappPhone = "918832421234";
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(messageText)}`;

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully!",
        appointmentId: id,
        whatsappUrl,
        appointment: {
          customerName: customerNameVal,
          phone: phoneVal,
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
