import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { treatments, doctorTreatments, doctors } from "@/db/schema";
import { eq } from "drizzle-orm";

const defaultTreatmentsList = [
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

// GET /api/admin/treatments
export async function GET() {
  try {
    let allTrts = await db.select().from(treatments);
    const allMappings = await db.select().from(doctorTreatments);
    const allDocs = await db.select().from(doctors);

    // Auto-seed missing treatments into Turso DB
    const existingIds = new Set(allTrts.map((t) => t.id));
    for (const dt of defaultTreatmentsList) {
      if (!existingIds.has(dt.id)) {
        try {
          await db.insert(treatments).values(dt).onConflictDoNothing();
          for (const doc of allDocs) {
            await db.insert(doctorTreatments).values({
              id: `map_${dt.id}_${doc.id}`,
              doctorId: doc.id,
              treatmentId: dt.id,
            }).onConflictDoNothing();
          }
        } catch (e) {
          // ignore duplicate insert
        }
      }
    }

    // Re-fetch all treatments after auto-seed
    allTrts = await db.select().from(treatments);
    if (!allTrts || allTrts.length === 0) {
      allTrts = defaultTreatmentsList;
    }

    const result = allTrts.map((trt) => {
      const assignedDocIds = allMappings
        .filter((m) => m.treatmentId === trt.id)
        .map((m) => m.doctorId);
      const assignedDocs = allDocs.filter((d) => assignedDocIds.includes(d.id));

      return {
        ...trt,
        assignedDoctorIds: assignedDocIds.length ? assignedDocIds : allDocs.map((d) => d.id),
        assignedDoctors: assignedDocs.length ? assignedDocs : allDocs,
      };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error fetching treatments:", error);
    return NextResponse.json({ success: true, data: defaultTreatmentsList });
  }
}

// POST /api/admin/treatments - Add new treatment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, description, durationMinutes, imageUrl, category, doctorIds } = body;

    if (!title) {
      return NextResponse.json({ error: "Treatment title is required." }, { status: 400 });
    }

    const id = `trt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    await db.insert(treatments).values({
      id,
      title,
      subtitle: subtitle || "",
      description: description || "",
      durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : 30,
      imageUrl: imageUrl || "/images/procedures/peeling.png",
      category: category || "Dermatology",
    });

    // Insert doctor mappings
    if (Array.isArray(doctorIds)) {
      for (const docId of doctorIds) {
        const mapId = `dt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await db.insert(doctorTreatments).values({
          id: mapId,
          doctorId: docId,
          treatmentId: id,
        });
      }
    }

    return NextResponse.json({ success: true, message: "Treatment created successfully!", id }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating treatment:", error);
    return NextResponse.json({ error: "Failed to create treatment." }, { status: 500 });
  }
}

// PUT /api/admin/treatments - Edit treatment
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, subtitle, description, durationMinutes, imageUrl, category, doctorIds } = body;

    if (!id || !title) {
      return NextResponse.json({ error: "Treatment id and title are required." }, { status: 400 });
    }

    await db
      .update(treatments)
      .set({
        title,
        subtitle: subtitle || "",
        description: description || "",
        durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : 30,
        imageUrl: imageUrl || "/images/procedures/peeling.png",
        category: category || "Dermatology",
      })
      .where(eq(treatments.id, id));

    // Update doctor mappings: clear existing & re-insert
    await db.delete(doctorTreatments).where(eq(doctorTreatments.treatmentId, id));

    if (Array.isArray(doctorIds)) {
      for (const docId of doctorIds) {
        const mapId = `dt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await db.insert(doctorTreatments).values({
          id: mapId,
          doctorId: docId,
          treatmentId: id,
        });
      }
    }

    return NextResponse.json({ success: true, message: "Treatment updated successfully!" });
  } catch (error: any) {
    console.error("Error updating treatment:", error);
    return NextResponse.json({ error: "Failed to update treatment." }, { status: 500 });
  }
}

// DELETE /api/admin/treatments - Delete treatment
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Treatment id is required." }, { status: 400 });
    }

    await db.delete(treatments).where(eq(treatments.id, id));
    await db.delete(doctorTreatments).where(eq(doctorTreatments.treatmentId, id));

    return NextResponse.json({ success: true, message: "Treatment deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting treatment:", error);
    return NextResponse.json({ error: "Failed to delete treatment." }, { status: 500 });
  }
}
