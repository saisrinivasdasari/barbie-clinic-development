import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Doctors Table
export const doctors = sqliteTable("doctors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  qualifications: text("qualifications"),
  experienceYears: integer("experience_years").default(30),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  phone: text("phone"),
  email: text("email"),
  workingDays: text("working_days").default('["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]'), // JSON array string
  workingHoursStart: text("working_hours_start").default("10:00"), // 24-hr format "HH:MM"
  workingHoursEnd: text("working_hours_end").default("20:00"),
  lunchStart: text("lunch_start").default("14:00"),
  lunchEnd: text("lunch_end").default("15:00"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Treatments / Services Table
export const treatments = sqliteTable("treatments", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  durationMinutes: integer("duration_minutes").default(30),
  imageUrl: text("image_url"),
  category: text("category").default("Dermatology"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Doctor - Treatment Mapping Table (Many-to-Many)
export const doctorTreatments = sqliteTable("doctor_treatments", {
  id: text("id").primaryKey(),
  doctorId: text("doctor_id").notNull(),
  treatmentId: text("treatment_id").notNull(),
});

// Doctor Blocked Dates Table (Full date blocked for leave/offline)
export const doctorBlockedDates = sqliteTable("doctor_blocked_dates", {
  id: text("id").primaryKey(),
  doctorId: text("doctor_id").notNull(),
  blockedDate: text("blocked_date").notNull(), // 'YYYY-MM-DD'
  reason: text("reason").default("Offline / Leave"),
});

// Doctor Blocked Time Slots Table (Specific 30-min time slot blocked)
export const doctorBlockedSlots = sqliteTable("doctor_blocked_slots", {
  id: text("id").primaryKey(),
  doctorId: text("doctor_id").notNull(),
  blockedDate: text("blocked_date").notNull(), // 'YYYY-MM-DD'
  timeSlot: text("time_slot").notNull(), // 'HH:MM' e.g. '11:30'
  reason: text("reason").default("Offline Booking"),
});

// Appointments Table
export const appointments = sqliteTable("appointments", {
  id: text("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  treatmentId: text("treatment_id").notNull(),
  treatmentName: text("treatment_name").notNull(),
  doctorId: text("doctor_id").notNull(),
  doctorName: text("doctor_name").notNull(),
  appointmentDate: text("appointment_date").notNull(), // 'YYYY-MM-DD'
  appointmentTime: text("appointment_time").notNull(), // 'HH:MM'
  durationMinutes: integer("duration_minutes").default(30),
  notes: text("notes"),
  status: text("status").default("Pending"), // 'Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

// Contact Inquiries Table
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("Unread"), // 'Unread', 'Read', 'Replied'
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
