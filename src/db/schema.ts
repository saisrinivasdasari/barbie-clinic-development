import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Patient Consultation Appointments Table
export const appointments = sqliteTable("appointments", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  serviceName: text("service_name"),
  doctorName: text("doctor_name"),
  notes: text("notes"),
  status: text("status").default("Pending"), // 'Pending', 'Confirmed', 'Completed', 'Cancelled'
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// Contact Form Inquiries Table
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

// Doctors Table
export const doctors = sqliteTable("doctors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  qualifications: text("qualifications"),
  experienceYears: integer("experience_years"),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  email: text("email"),
});
