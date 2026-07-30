import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

// POST /api/appointments - Submit new appointment booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, services, doctorName, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const id = `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const serviceName = Array.isArray(services) ? services.join(", ") : services || "";

    await db.insert(appointments).values({
      id,
      name,
      email: email || "",
      phone,
      preferredDate: date || "",
      preferredTime: time || "",
      serviceName,
      doctorName: doctorName || "",
      notes: notes || "",
      status: "Pending",
    });

    return NextResponse.json(
      { success: true, message: "Appointment submitted successfully!", id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to submit appointment. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/appointments - Retrieve appointments
export async function GET() {
  try {
    const data = await db.select().from(appointments);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments." },
      { status: 500 }
    );
  }
}
