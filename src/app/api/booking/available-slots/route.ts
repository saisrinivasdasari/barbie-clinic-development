import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, appointments, doctorBlockedDates, doctorBlockedSlots } from "@/db/schema";
import { eq, and, ne, or } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("doctorId");
    const dateStr = searchParams.get("date"); // 'YYYY-MM-DD'

    if (!doctorId || !dateStr) {
      return NextResponse.json({ error: "doctorId and date parameters are required." }, { status: 400 });
    }

    // 1. Fetch Doctor
    let docList = await db.select().from(doctors).where(eq(doctors.id, doctorId));
    let doc = docList.length ? docList[0] : null;

    if (!doc) {
      // Fallback doctor definition
      if (doctorId === "doc_meghamala") {
        doc = {
          id: "doc_meghamala",
          name: "Dr. G. Megha.mala",
          title: "Aesthetic Practitioner & Laser Specialist",
          workingDays: '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
          workingHoursStart: "10:00",
          workingHoursEnd: "19:00",
          lunchStart: "14:00",
          lunchEnd: "15:00",
        };
      } else {
        doc = {
          id: "doc_mnrao",
          name: "Dr. M.N. Rao",
          title: "Senior Dermatologist & Cosmetologist",
          workingDays: '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]',
          workingHoursStart: "10:00",
          workingHoursEnd: "20:00",
          lunchStart: "14:00",
          lunchEnd: "15:00",
        };
      }
    }

    // Check Day of Week
    const dateObj = new Date(dateStr + "T00:00:00");
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[dateObj.getDay()];

    let workingDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    try {
      if (doc.workingDays) {
        workingDays = JSON.parse(doc.workingDays);
      }
    } catch (e) {
      console.error("Error parsing workingDays:", e);
    }

    const docDisplayName = doc.name.startsWith("Dr.") ? doc.name : `Dr. ${doc.name}`;

    if (!workingDays.includes(dayName)) {
      return NextResponse.json({
        success: true,
        available: false,
        reason: `${docDisplayName} is not available on the selected date.`,
        slots: [],
      });
    }

    // 2. Check Blocked Date
    const blockedDates = await db
      .select()
      .from(doctorBlockedDates)
      .where(and(eq(doctorBlockedDates.doctorId, doctorId), eq(doctorBlockedDates.blockedDate, dateStr)));

    if (blockedDates.length > 0) {
      return NextResponse.json({
        success: true,
        available: false,
        reason: `${docDisplayName} is not available on the selected date.`,
        slots: [],
      });
    }

    // 3. Generate 30-min time slots
    const startStr = doc.workingHoursStart || "10:00";
    const endStr = doc.workingHoursEnd || "20:00";
    const lunchStartStr = doc.lunchStart || "14:00";
    const lunchEndStr = doc.lunchEnd || "15:00";

    const parseTimeToMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const formatMinutesToTime = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    };

    const startMins = parseTimeToMinutes(startStr);
    const endMins = parseTimeToMinutes(endStr);
    const lunchStartMins = parseTimeToMinutes(lunchStartStr);
    const lunchEndMins = parseTimeToMinutes(lunchEndStr);

    const allSlots: string[] = [];
    for (let current = startMins; current + 30 <= endMins; current += 30) {
      // Skip lunch break
      if (current >= lunchStartMins && current < lunchEndMins) {
        continue;
      }
      allSlots.push(formatMinutesToTime(current));
    }

    // 4. Fetch Existing Appointments (only Accepted or Completed statuses count as booked)
    const existingApts = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.doctorId, doctorId),
          eq(appointments.appointmentDate, dateStr),
          or(
            eq(appointments.status, "Accepted"),
            eq(appointments.status, "Completed")
          )
        )
      );

    const bookedSlots = existingApts.map((a) => a.appointmentTime);

    // 5. Fetch Blocked Time Slots
    const blockedSlotsList = await db
      .select()
      .from(doctorBlockedSlots)
      .where(and(eq(doctorBlockedSlots.doctorId, doctorId), eq(doctorBlockedSlots.blockedDate, dateStr)));

    const offlineBlockedSlots = blockedSlotsList.map((b) => b.timeSlot);

    // Combine unavailable slots
    const unavailableSet = new Set([...bookedSlots, ...offlineBlockedSlots]);

    // 6. Filter slots
    const availableSlots = allSlots.filter((slot) => !unavailableSet.has(slot));

    return NextResponse.json({
      success: true,
      available: true,
      doctor: { id: doc.id, name: doc.name, title: doc.title },
      date: dateStr,
      day: dayName,
      totalSlots: allSlots.length,
      availableSlotsCount: availableSlots.length,
      slots: availableSlots,
      allSlots,
      bookedSlots,
      blockedSlots: offlineBlockedSlots,
    });
  } catch (error: any) {
    console.error("Error calculating available slots:", error);
    return NextResponse.json({ error: "Failed to calculate available slots." }, { status: 500 });
  }
}
