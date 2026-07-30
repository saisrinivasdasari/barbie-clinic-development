import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { inquiries } from "@/db/schema";

// POST /api/contact - Submit contact form inquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const id = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await db.insert(inquiries).values({
      id,
      name,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
      status: "Unread",
    });

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been sent.", id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating contact inquiry:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/contact - Fetch inquiries
export async function GET() {
  try {
    const data = await db.select().from(inquiries);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}
