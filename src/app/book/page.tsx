// @ts-nocheck
"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/common/Preloader";
import BookingModal from "@/components/booking/BookingModal";

export default function BookPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="page-wraper">
      <Preloader />
      <Header />

      <main className="page-content">
        <div
          className="dz-bnr-inr style-1 position-relative overflow-hidden py-5 text-center"
          style={{ background: "linear-gradient(135deg, #FFF0F5 0%, #FDE8ED 100%)", paddingTop: "130px", paddingBottom: "60px" }}
        >
          <div className="container position-relative" style={{ zIndex: 2 }}>
            <span className="badge bg-white text-primary shadow-sm px-3 py-1.5 rounded-pill fw-bold mb-2.5">
              APPOINTMENT BOOKING
            </span>
            <h1 className="fw-bold text-secondary mb-2" style={{ fontSize: '2.5rem' }}>
              Book Your Dermatology Consultation
            </h1>
            <p className="text-muted mx-auto mb-4" style={{ maxWidth: 540 }}>
              Select your treatment, doctor, date, and preferred 30-minute time slot for personalized skin & laser care.
            </p>
            <button
              className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Book Appointment <i className="feather icon-calendar ms-2"></i>
            </button>
          </div>
        </div>
      </main>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Footer />
    </div>
  );
}
