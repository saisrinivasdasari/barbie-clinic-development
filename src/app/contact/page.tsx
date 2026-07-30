// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/common/Preloader";

export default function Page() {
  const [activeRegion, setActiveRegion] = useState("all");

  const branchesData = [
    {
      id: "hq",
      region: "telangana",
      name: "Himayath Nagar (HQ)",
      type: "Main Headquarters",
      address: "Saidatta Arcade, Opp. Liberty Cinema, Himayath Nagar, Hyderabad, Telangana 500029",
      hours: "Mon–Sun: 10:00 AM – 8:00 PM",
      phone: "+91 8832421234",
      tag: "Vitiligo & Laser HQ",
      isHQ: true
    },
    {
      id: "koti",
      region: "telangana",
      name: "Koti Branch",
      type: "Telangana",
      address: "Near Women's College Road, Koti, Hyderabad, Telangana 500095",
      hours: "Mon–Sat: 10:00 AM – 7:30 PM",
      phone: "+91 8832421234",
      tag: "Aesthetic & Laser Therapy",
      isHQ: false
    },
    {
      id: "kphb",
      region: "telangana",
      name: "KPHB Colony Branch",
      type: "Kukatpally",
      address: "Road No. 1, Near Metro Station, KPHB Colony, Hyderabad, Telangana 500072",
      hours: "Mon–Sat: 10:00 AM – 8:00 PM",
      phone: "+91 8832421234",
      tag: "Laser Hair & Skin Care",
      isHQ: false
    },
    {
      id: "vizag",
      region: "ap",
      name: "Vizag Branch",
      type: "Andhra Pradesh",
      address: "Dwaraka Nagar Main Road, Visakhapatnam, Andhra Pradesh 530016",
      hours: "Mon–Sat: 10:00 AM – 7:30 PM",
      phone: "+91 8374817355",
      tag: "Dermatology & Hair Care",
      isHQ: false
    },
    {
      id: "vijayawada",
      region: "ap",
      name: "Vijayawada Branch",
      type: "Andhra Pradesh",
      address: "MG Road, Opp. PWS Complex, Vijayawada, Andhra Pradesh 520010",
      hours: "Mon–Sat: 10:00 AM – 7:30 PM",
      phone: "+91 8832421234",
      tag: "Vitiligo & Cosmetic Care",
      isHQ: false
    },
    {
      id: "tirupati",
      region: "ap",
      name: "Tirupati Branch",
      type: "Andhra Pradesh",
      address: "KT Road, Near Railway Circle, Tirupati, Andhra Pradesh 517501",
      hours: "Mon–Sat: 10:00 AM – 7:00 PM",
      phone: "+91 8772262232",
      tag: "Skin & Laser Procedures",
      isHQ: false
    },
    {
      id: "rajahmundry",
      region: "ap",
      name: "Rajahmundry Branch",
      type: "Andhra Pradesh",
      address: "Danavaipeta Main Road, Rajahmundry, Andhra Pradesh 533103",
      hours: "Mon–Sat: 10:00 AM – 7:00 PM",
      phone: "+91 8832421234",
      tag: "Clinical Dermatology",
      isHQ: false
    }
  ];

  const filteredBranches = activeRegion === "all" 
    ? branchesData 
    : branchesData.filter(b => b.region === activeRegion);
  return (
    <div className="page-wraper">
      {/* Preloader */}
      <Preloader />

      <Header />

      <main className="page-content">
        {/* Hero Banner Section */}
        <div className="dz-bnr-inr style-1 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF0F5 0%, #FDE8ED 100%)", paddingTop: "115px", paddingBottom: "35px" }}>
          {/* Decorative Elements */}
          <div className="position-absolute top-0 start-0 translate-middle rounded-circle" style={{ width: 260, height: 260, background: 'rgba(255, 182, 193, 0.4)', filter: 'blur(55px)', pointerEvents: 'none' }}></div>
          <div className="position-absolute bottom-0 end-0 translate-middle-x rounded-circle" style={{ width: 320, height: 320, background: 'rgba(255, 200, 220, 0.35)', filter: 'blur(65px)', pointerEvents: 'none' }}></div>
          <div className="position-absolute top-50 end-0 translate-middle-y me-5 opacity-25 d-none d-lg-block" style={{ pointerEvents: 'none' }}>
            <i className="feather icon-sparkles text-primary" style={{ fontSize: '2.8rem' }}></i>
          </div>
          <div className="position-absolute top-50 start-0 translate-middle-y ms-5 opacity-25 d-none d-lg-block" style={{ pointerEvents: 'none' }}>
            <i className="feather icon-star text-primary" style={{ fontSize: '2rem' }}></i>
          </div>

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="dz-bnr-inr-entry text-center">
              <span className="badge bg-white text-primary shadow-sm px-3 py-1.5 rounded-pill fw-bold mb-2.5 d-inline-flex align-items-center gap-1.5" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                <i className="feather icon-award text-primary fs-6"></i> GET IN TOUCH
              </span>
              <h1 className="fw-bold text-secondary mb-2" style={{ fontSize: '2.6rem', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                Contact & Locations
              </h1>
              <p className="text-muted mx-auto mb-3" style={{ maxWidth: 580, fontSize: '0.95rem', lineHeight: '1.55' }}>
                Schedule your clinical assessment or reach out to any of our regional laser dermatology centers across South India.
              </p>
              
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white px-3.5 py-1.5 rounded-pill shadow-sm mb-0 align-items-center gap-2" style={{ fontSize: '0.825rem' }}>
                  <li className="breadcrumb-item mb-0"><Link href="/" className="text-decoration-none text-muted fw-medium">Home</Link></li>
                  <li className="breadcrumb-item mb-0 text-primary fw-bold active" aria-current="page">Contact Us</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Doctor Consultation timetables */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="section-head style-3 text-center mb-5">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">CLINICAL HOURS</span>
              <h2 className="title fw-bold text-secondary mb-2">Doctor Timetable & Consulting Hours</h2>
              <p className="text-muted">Schedule your visit with our consulting specialists during their clinical hours.</p>
            </div>

            <div className="row justify-content-center g-4">
              {/* Doctor 1 timetable */}
              <div className="col-lg-6 col-md-6">
                <div className="bg-white rounded-4 shadow-sm border border-light-subtle overflow-hidden h-100 d-flex flex-column justify-content-between hover-lift">
                  {/* Header */}
                  <div className="p-4 border-bottom bg-light-subtle d-flex align-items-center gap-3">
                    <img src="/Doctor-imgs/Dr. M.N. Rao.png" className="rounded-circle shadow-sm" style={{ width: 60, height: 60, objectFit: 'cover', objectPosition: 'top' }} alt="Dr. M.N. Rao" />
                    <div>
                      <h4 className="fw-bold text-secondary mb-1 fs-5">Dr. M.N. Rao</h4>
                      <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium" style={{ fontSize: '0.78rem' }}>
                        Senior Dermatologist & Cosmetologist
                      </span>
                    </div>
                  </div>

                  {/* Schedule List */}
                  <div className="p-4 flex-grow-1">
                    {/* Specializations */}
                    <div className="mb-3 border-bottom pb-3">
                      <span className="d-block text-secondary fw-semibold mb-2" style={{ fontSize: '0.78rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Clinical Specializations</span>
                      <div className="d-flex flex-wrap gap-1.5">
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Vitiligo Laser Specialist</span>
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Cosmetic Dermatology</span>
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Laser Resurfacing</span>
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>PRP Hairfall Therapies</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light mb-2.5">
                      <div>
                        <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.9rem' }}>Mon, Wed, Sat, Sun</span>
                        <span className="small text-muted">10:00 AM – 1:30 PM &nbsp;|&nbsp; 6:00 PM – 8:00 PM</span>
                      </div>
                      <span className="badge bg-success-subtle text-success px-2.5 py-1.5 rounded-pill fw-semibold" style={{ fontSize: '0.75rem' }}>
                        <i className="feather icon-check-circle me-1"></i> Available
                      </span>
                    </div>

                    <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light">
                      <div>
                        <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.9rem' }}>Direct Email</span>
                        <span className="small text-muted">drmnrao1@yahoo.com</span>
                      </div>
                      <a href="mailto:drmnrao1@yahoo.com" className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-medium" style={{ fontSize: '0.78rem' }}>
                        Email Doctor
                      </a>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-3 bg-light border-top text-center">
                    <Link href="#contactForm" className="btn btn-primary rounded-pill w-100 fw-medium btn-sm">
                      <i className="feather icon-calendar me-1"></i> Book Appointment with Dr. Rao
                    </Link>
                  </div>
                </div>
              </div>

              {/* Doctor 2 timetable */}
              <div className="col-lg-6 col-md-6">
                <div className="bg-white rounded-4 shadow-sm border border-light-subtle overflow-hidden h-100 d-flex flex-column justify-content-between hover-lift">
                  {/* Header */}
                  <div className="p-4 border-bottom bg-light-subtle d-flex align-items-center gap-3">
                    <img src="/Doctor-imgs/Dr. G. Megha.mala.png" className="rounded-circle shadow-sm" style={{ width: 60, height: 60, objectFit: 'cover', objectPosition: 'top' }} alt="Dr. G. Megha.mala" />
                    <div>
                      <h4 className="fw-bold text-secondary mb-1 fs-5">Dr. G. Megha.mala</h4>
                      <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium" style={{ fontSize: '0.78rem' }}>
                        Aesthetic Practitioner & Laser Specialist
                      </span>
                    </div>
                  </div>

                  {/* Schedule List */}
                  <div className="p-4 flex-grow-1">
                    {/* Specializations */}
                    <div className="mb-3 border-bottom pb-3">
                      <span className="d-block text-secondary fw-semibold mb-2" style={{ fontSize: '0.78rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Clinical Specializations</span>
                      <div className="d-flex flex-wrap gap-1.5">
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Chemical Peeling</span>
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Facial Rejuvenation</span>
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Anti-Acne & Scar Care</span>
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}><i className="feather icon-check-circle text-primary me-1"></i>Laser Hair Removal</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light mb-2.5">
                      <div>
                        <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.9rem' }}>Sat, Sun</span>
                        <span className="small text-muted">10:00 AM – 1:00 PM</span>
                      </div>
                      <span className="badge bg-success-subtle text-success px-2.5 py-1.5 rounded-pill fw-semibold" style={{ fontSize: '0.75rem' }}>
                        <i className="feather icon-check-circle me-1"></i> Available
                      </span>
                    </div>

                    <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light">
                      <div>
                        <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.9rem' }}>Key Procedures</span>
                        <span className="small text-muted">Acne Peeling, Rejuvenation, Laser Hair Removal</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-3 bg-light border-top text-center">
                    <Link href="#contactForm" className="btn btn-primary rounded-pill w-100 fw-medium btn-sm">
                      <i className="feather icon-calendar me-1"></i> Book Appointment with Dr. Megha.mala
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Branch locations grid */}
        <section id="branchesSection" className="content-inner bg-light py-5">
          <div className="container">
            <div className="section-head style-3 text-center mb-4">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">REGIONAL NETWORK</span>
              <h2 className="title fw-bold text-secondary mb-2" style={{ fontSize: '2.4rem' }}>Our Branches Across South India</h2>
              <p className="text-muted mw-100 mx-auto" style={{ maxWidth: 620 }}>
                Select a region below to locate your nearest Barbie Skin & Laser Clinic branch. Direct helplines are available for instant bookings.
              </p>
            </div>

            {/* Region Filter Nav Tabs */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
              <button
                type="button"
                className={`btn rounded-pill px-4 py-2 fw-bold btn-sm transition-all ${activeRegion === "all" ? "btn-primary shadow-sm" : "btn-white bg-white text-secondary border border-light-subtle"}`}
                onClick={() => setActiveRegion("all")}
              >
                <i className="feather icon-map me-1.5"></i> All Locations (7)
              </button>
              <button
                type="button"
                className={`btn rounded-pill px-4 py-2 fw-bold btn-sm transition-all ${activeRegion === "telangana" ? "btn-primary shadow-sm" : "btn-white bg-white text-secondary border border-light-subtle"}`}
                onClick={() => setActiveRegion("telangana")}
              >
                <i className="feather icon-navigation me-1.5"></i> Telangana & Hyd (3)
              </button>
              <button
                type="button"
                className={`btn rounded-pill px-4 py-2 fw-bold btn-sm transition-all ${activeRegion === "ap" ? "btn-primary shadow-sm" : "btn-white bg-white text-secondary border border-light-subtle"}`}
                onClick={() => setActiveRegion("ap")}
              >
                <i className="feather icon-navigation me-1.5"></i> Andhra Pradesh (4)
              </button>
            </div>

            {/* Clinic Branch Cards Grid */}
            <div className="row g-4 justify-content-center">
              {filteredBranches.map((branch) => (
                <div key={branch.id} className="col-lg-4 col-md-6">
                  <div className={`bg-white rounded-4 shadow-sm border ${branch.isHQ ? 'border-primary-subtle' : 'border-light-subtle'} p-4 h-100 d-flex flex-column justify-content-between hover-lift position-relative overflow-hidden`}>
                    {branch.isHQ && (
                      <div className="position-absolute top-0 start-0 end-0" style={{ height: 4, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                    )}
                    
                    <div>
                      {/* Top Header Row */}
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-2.5">
                        <h5 className="fw-bold text-secondary mb-0" style={{ fontSize: '1.1rem' }}>{branch.name}</h5>
                        {branch.isHQ ? (
                          <span className="badge bg-primary text-white px-2.5 py-1.5 rounded-pill small fw-bold" style={{ fontSize: '0.725rem' }}>
                            <i className="feather icon-award me-1"></i> HEADQUARTERS
                          </span>
                        ) : (
                          <span className="badge bg-primary-subtle text-primary px-2.5 py-1.5 rounded-pill small fw-medium" style={{ fontSize: '0.725rem' }}>
                            {branch.type}
                          </span>
                        )}
                      </div>

                      {/* Address with Icon */}
                      <div className="d-flex align-items-start gap-2 mb-3">
                        <i className="feather icon-map-pin text-primary fs-5 flex-shrink-0 mt-0.5"></i>
                        <p className="small text-muted mb-0" style={{ fontSize: '0.865rem', lineHeight: '1.55' }}>
                          {branch.address}
                        </p>
                      </div>

                      {/* Specialization Tag & Hours */}
                      <div className="d-flex flex-wrap align-items-center gap-1.5 mb-3">
                        <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill small" style={{ fontSize: '0.75rem' }}>
                          <i className="feather icon-clock text-primary me-1"></i> {branch.hours}
                        </span>
                        <span className="badge bg-light text-primary border border-primary-subtle px-2.5 py-1 rounded-pill small" style={{ fontSize: '0.75rem' }}>
                          {branch.tag}
                        </span>
                      </div>
                    </div>

                    {/* Dual Action Footer Bar */}
                    <div className="pt-3 mt-3 border-top d-flex align-items-center justify-content-between gap-2">
                      <a href={`tel:${branch.phone}`} className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold flex-grow-1" style={{ fontSize: '0.78rem' }}>
                        <i className="feather icon-phone-call me-1"></i> Call Clinic
                      </a>
                      <Link href="#contactForm" className="btn btn-sm btn-primary rounded-pill px-3 fw-bold flex-grow-1" style={{ fontSize: '0.78rem' }}>
                        <i className="feather icon-calendar me-1"></i> Book Visit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map & Form */}
        <div className="map-wrapper height-sm overflow-hidden" style={{ minHeight: 350 }}>
          <iframe className="w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5029314981774!2d78.47953251487707!3d17.411634588065552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99e89d1b092f%3A0xe543e06efc25e2cd!2sHimayatnagar%2C%20Hyderabad%2C%20Telangana%20500029!5e0!3m2!1sen!2sin!4v1757506574164!5m2!1sen!2sin" style={{ border: 0, minHeight: 350 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <section id="contactForm" className="content-inner bg-light py-5">
          <div className="container">
            <div className="row align-items-stretch justify-content-center g-4">
              <div className="col-xl-6 col-lg-6 d-flex">
                <div className="bg-white rounded-4 p-4 p-md-5 border border-light-subtle shadow-sm w-100">
                  <div className="section-head style-1 mb-4">
                    <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2.5" style={{ fontSize: '0.8rem' }}>
                      BOOK CONSULTATION
                    </span>
                    <h2 className="title fw-bold text-secondary mb-1">Get in Touch</h2>
                    <p className="text-muted small">Schedule your clinical consultation session with our expert dermatologists.</p>
                  </div>
                  <form className="dzForm" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your appointment request has been received. Our team will contact you shortly.'); }}>
                    <div className="row g-3">
                      <div className="col-sm-12">
                        <label className="form-label small fw-semibold text-secondary mb-1">Full Name</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border border-end-0 border-secondary-subtle rounded-start-3 text-primary">
                            <i className="feather icon-user"></i>
                          </span>
                          <input name="dzName" type="text" required className="form-control border border-start-0 border-secondary-subtle rounded-end-3 p-2.5" placeholder="e.g. Ananya Sharma" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <label className="form-label small fw-semibold text-secondary mb-1">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border border-end-0 border-secondary-subtle rounded-start-3 text-primary">
                            <i className="feather icon-mail"></i>
                          </span>
                          <input name="dzEmail" type="email" required className="form-control border border-start-0 border-secondary-subtle rounded-end-3 p-2.5" placeholder="e.g. ananya@example.com" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <label className="form-label small fw-semibold text-secondary mb-1">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border border-end-0 border-secondary-subtle rounded-start-3 text-primary">
                            <i className="feather icon-phone"></i>
                          </span>
                          <input name="dzPhoneNumber" type="tel" required className="form-control border border-start-0 border-secondary-subtle rounded-end-3 p-2.5" placeholder="+91 98765 43210" />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <label className="form-label small fw-semibold text-secondary mb-1">Message / Symptoms</label>
                        <textarea name="dzMessage" className="form-control border border-secondary-subtle rounded-3 p-2.5" rows="4" placeholder="Describe your skin or laser consultation requirements..."></textarea>
                      </div>
                      <div className="col-sm-12 pt-2">
                        <button type="submit" className="btn btn-lg btn-primary rounded-pill w-100 fw-bold shadow-sm py-3">
                          Send Message <i className="feather icon-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 ps-xl-4 d-flex">
                <div className="dz-media rounded-4 overflow-hidden shadow border border-light-subtle position-relative w-100 h-100" style={{ minHeight: 380 }}>
                  <img src="/images/about/contact_consultation.png" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" alt="Doctor Consultation" />
                  <div className="position-absolute bottom-0 start-0 m-4 bg-white bg-opacity-95 p-3.5 rounded-4 shadow-lg border border-light-subtle" style={{ maxWidth: 280, backdropFilter: 'blur(10px)', zIndex: 3 }}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <div className="p-2 bg-primary-subtle text-primary rounded-circle">
                        <i className="feather icon-phone-call fs-5"></i>
                      </div>
                      <div>
                        <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.85rem' }}>Direct HQ Helpline</span>
                        <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Available 10 AM – 8 PM</span>
                      </div>
                    </div>
                    <a href="tel:+918832421234" className="d-block fw-bold text-primary text-decoration-none fs-5 mt-1">+91 8832421234</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <button className="scroltop" type="button">
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
