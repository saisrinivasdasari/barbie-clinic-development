import { db } from "../lib/db";
import { doctors, treatments, doctorTreatments } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function seed() {
  console.log("Seeding Turso database with full treatments and doctors...");

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
      phone: "+918885985515",
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
      phone: "+918885985515",
      workingDays: JSON.stringify(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
      workingHoursStart: "10:00",
      workingHoursEnd: "19:00",
    },
  ];

  for (const doc of docs) {
    await db.insert(doctors).values(doc).onConflictDoNothing();
  }

  // Seed All 12 Treatments
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
      imageUrl: "/images/procedures/prp.png",
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
    {
      id: "trt_moles_warts",
      title: "Skin Tags, Moles & Warts Removal",
      subtitle: "Precise RF Removal",
      description: "Quick, painless radiofrequency procedure for instant removal of skin tags, moles, warts, and benign lesions with minimal downtime.",
      durationMinutes: 20,
      imageUrl: "/images/procedures/peeling.png",
      category: "Clinical Dermatology",
    },
    {
      id: "trt_tattoo_removal",
      title: "Laser Tattoo Removal",
      subtitle: "Q-Switched Laser Fading",
      description: "Advanced Q-switched Nd:YAG laser technology for safe, effective fading and complete removal of unwanted tattoos.",
      durationMinutes: 40,
      imageUrl: "/images/about/why_choose_laser.png",
      category: "Laser Therapy",
    },
    {
      id: "trt_chemical_peel",
      title: "Chemical Peels & Glow Therapy",
      subtitle: "Exfoliation & Brightening",
      description: "Dermatological chemical peels for deep exfoliation, pigment correction, glow restoration, and skin texture refinement.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/peeling.png",
      category: "Aesthetic Dermatology",
    },
    {
      id: "trt_acne_scars",
      title: "Acne Scars & Microneedling",
      subtitle: "Collagen & Texture Repair",
      description: "Subcision, microneedling, and fractional laser resurfacing to smooth deep acne pits and rebuild skin collagen.",
      durationMinutes: 45,
      imageUrl: "/images/procedures/scars.png",
      category: "Aesthetic Dermatology",
    },
    {
      id: "trt_skin_tightening",
      title: "Skin Tightening & Anti-Aging",
      subtitle: "Non-Surgical RF Lifting",
      description: "Non-surgical skin tightening using radiofrequency and collagen-boosting therapies for fine lines, sagging skin, and wrinkles.",
      durationMinutes: 45,
      imageUrl: "/images/procedures/tightening.png",
      category: "Anti-Aging Therapy",
    },
    {
      id: "trt_consultation",
      title: "General Dermatology Consultation",
      subtitle: "Expert Skin & Hair Diagnosis",
      description: "Comprehensive clinical evaluation by senior dermatologists for skin infections, allergies, eczema, psoriasis, and scalp disorders.",
      durationMinutes: 20,
      imageUrl: "/images/procedures/consultation.png",
      category: "Clinical Consultation",
    },
    {
      id: "trt_cosmetic_surgery",
      title: "Cosmetic Surgery Consultation",
      subtitle: "Surgical Dermatology Advice",
      description: "Expert consultation for surgical scar revision, mole excision, cyst removal, ear lobe repair, and cosmetic skin procedures.",
      durationMinutes: 30,
      imageUrl: "/Doctor-imgs/Dr. M.N. Rao.png",
      category: "Surgical Dermatology",
    },
  ];

  for (const trt of trts) {
    await db.insert(treatments).values(trt).onConflictDoNothing();
  }

  // Seed Doctor - Treatment Mappings
  const docIds = ["doc_mnrao", "doc_meghamala"];
  for (const trt of trts) {
    for (const docId of docIds) {
      await db.insert(doctorTreatments).values({
        id: `map_${trt.id}_${docId}`,
        doctorId: docId,
        treatmentId: trt.id,
      }).onConflictDoNothing();
    }
  }

  console.log("Seeding complete! All 12 treatments seeded successfully.");
}

seed().catch(console.error);
