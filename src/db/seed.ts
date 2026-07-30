import { db } from "../lib/db";
import { doctors, treatments, doctorTreatments } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function seed() {
  console.log("Seeding Turso database...");

  // Seed Doctors
  const docs = [
    {
      id: "doc_mnrao",
      name: "Dr. M.N. Rao",
      title: "Senior Dermatologist & Cosmetologist",
      qualifications: "MBBS, Diploma (Osmania Medical College)",
      experienceYears: 30,
      bio: "MBBS & Diploma from Osmania Medical College. Over 30 years of clinical experience specializing in Vitiligo laser therapies, cosmetic surgery, and complex skin conditions.",
      photoUrl: "/Doctor-imgs/Dr. M.N. Rao.png",
      email: "drmnrao1@yahoo.com",
      phone: "+918832421234",
      workingDays: JSON.stringify(["Mon", "Wed", "Sat", "Sun"]),
      workingHoursStart: "10:00",
      workingHoursEnd: "20:00",
    },
    {
      id: "doc_meghamala",
      name: "Dr. G. Megha.mala",
      title: "Aesthetic Practitioner & Laser Specialist",
      qualifications: "MBBS (2021), Diploma in Aesthetic Medicine",
      experienceYears: 5,
      bio: "MBBS & Diploma in Aesthetic Medicine. Specialized in advanced chemical peeling, facial skin rejuvenation, anti-acne protocols, and painless laser hair reduction.",
      photoUrl: "/Doctor-imgs/Dr. G. Megha.mala.png",
      email: "dr.meghamala@barbieclinic.com",
      phone: "+918832421234",
      workingDays: JSON.stringify(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
      workingHoursStart: "10:00",
      workingHoursEnd: "19:00",
    },
  ];

  for (const doc of docs) {
    await db.insert(doctors).values(doc).onConflictDoNothing();
  }

  // Seed Treatments
  const trts = [
    {
      id: "trt_vitiligo",
      title: "Vitiligo Treatment",
      subtitle: "Dedicated Vitiligo Care",
      description: "Dedicated vitiligo treatment center utilizing advanced targeted laser technology for clearing white patches safely and effectively.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/vitiligo.png",
      category: "Vitiligo & Laser",
    },
    {
      id: "trt_acne",
      title: "Anti Acne & Pimples",
      subtitle: "Clear & Spotless Skin",
      description: "Clinical and aesthetic treatments tailored to clear active acne, control sebum production, and prevent future breakouts.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/peeling.png",
      category: "Aesthetic Dermatology",
    },
    {
      id: "trt_prp",
      title: "PRP for Hairfall",
      subtitle: "Hair Regrowth & Restoration",
      description: "Advanced PRP treatment for hair loss, dandruff, acne scars, under eye, and neck rejuvenation using your own plasma growth factors.",
      durationMinutes: 45,
      imageUrl: "/images/procedures/scars.png",
      category: "Hair Restoration",
    },
    {
      id: "trt_hair_removal",
      title: "Unwanted Hair Removal",
      subtitle: "Painless Laser Reduction",
      description: "Ditch the wax and razors. Enjoy smooth, hair-free skin with our safe, quick, and painless laser hair removal procedures.",
      durationMinutes: 30,
      imageUrl: "/images/about/why_choose_laser.png",
      category: "Laser Therapy",
    },
    {
      id: "trt_colour",
      title: "Colour Improvement",
      subtitle: "Skin Brightening & Tone",
      description: "Advanced laser treatments targeted at pigmented skin lesions, dark skin spots, melasma, and overall complexion improvement.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/tightening.png",
      category: "Skin Rejuvenation",
    },
  ];

  for (const trt of trts) {
    await db.insert(treatments).values(trt).onConflictDoNothing();
  }

  // Seed Doctor - Treatment Mappings
  const mappings = [
    { id: "dt_1", doctorId: "doc_mnrao", treatmentId: "trt_vitiligo" },
    { id: "dt_2", doctorId: "doc_mnrao", treatmentId: "trt_prp" },
    { id: "dt_3", doctorId: "doc_mnrao", treatmentId: "trt_colour" },
    { id: "dt_4", doctorId: "doc_meghamala", treatmentId: "trt_acne" },
    { id: "dt_5", doctorId: "doc_meghamala", treatmentId: "trt_hair_removal" },
    { id: "dt_6", doctorId: "doc_meghamala", treatmentId: "trt_colour" },
  ];

  for (const map of mappings) {
    await db.insert(doctorTreatments).values(map).onConflictDoNothing();
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
