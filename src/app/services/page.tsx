// @ts-nocheck
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/common/Preloader";

export default function Page() {
  const [activeService, setActiveService] = useState(0);

  const servicesData = [
    {
      id: 0,
      title: "Vitiligo Treatment",
      subtitle: "Dedicated Vitiligo Care",
      desc: "Dedicated vitiligo treatment center utilizing advanced targeted laser technology for clearing white patches safely and effectively.",
      img: "/images/procedures/vitiligo.png",
      features: [
        "Laser Treatment for White Patches",
        "High Success Rate & Compliance",
        "Individualized Protocols"
      ],
      doctor: "Dr. M.N. Rao",
      role: "Senior Dermatologist",
      doctorImg: "/Doctor-imgs/Dr. M.N. Rao.png"
    },
    {
      id: 1,
      title: "Anti Acne & Pimples",
      subtitle: "Clear & Spotless Skin",
      desc: "Clinical and aesthetic treatments tailored to clear active acne, control sebum production, and prevent future breakouts.",
      img: "/images/procedures/peeling.png",
      features: [
        "Acne & Pimple Control",
        "Customized Chemical Peeling",
        "Effective Medical Extraction"
      ],
      doctor: "Dr. G. Megha.mala",
      role: "Aesthetic Specialist",
      doctorImg: "/Doctor-imgs/Dr. G. Megha.mala.png"
    },
    {
      id: 2,
      title: "PRP for Hairfall",
      subtitle: "Hair Regrowth & Restoration",
      desc: "Advanced PRP treatment for hair loss, dandruff, acne scars, under eye, and neck rejuvenation using your own plasma growth factors.",
      img: "/images/procedures/scars.png",
      features: [
        "Halts Hair Loss & Thinning",
        "Acne Scar Rejuvenation",
        "Safe & Natural Procedure"
      ],
      doctor: "Dr. M.N. Rao",
      role: "Senior Dermatologist",
      doctorImg: "/Doctor-imgs/Dr. M.N. Rao.png"
    },
    {
      id: 3,
      title: "Unwanted Hair Removal",
      subtitle: "Painless Laser Reduction",
      desc: "Ditch the wax and razors. Enjoy smooth, hair-free skin with our safe, quick, and painless laser hair removal procedures.",
      img: "/images/about/why_choose_laser.png",
      features: [
        "USFDA Approved Laser Tech",
        "Painless & Zero Downtime",
        "Safe on All Skin Types"
      ],
      doctor: "Dr. G. Megha.mala",
      role: "Aesthetic Specialist",
      doctorImg: "/Doctor-imgs/Dr. G. Megha.mala.png"
    },
    {
      id: 4,
      title: "Colour Improvement",
      subtitle: "Skin Brightening & Tone",
      desc: "Advanced laser treatments targeted at pigmented skin lesions, dark skin spots, melasma, and overall complexion improvement.",
      img: "/images/procedures/tightening.png",
      features: [
        "Clears Dark Spots & Melasma",
        "Pigmented Skin Lesion Care",
        "Evens Out Tone & Complexion"
      ],
      doctor: "Dr. M.N. Rao",
      role: "Senior Dermatologist",
      doctorImg: "/Doctor-imgs/Dr. M.N. Rao.png"
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqData = [
    {
      question: "Is laser treatment safe for Vitiligo?",
      answer: "Yes, our targeted laser treatment for white patches is highly precise, non-invasive, and scientifically proven safe with no downtime or side effects on adjacent healthy skin."
    },
    {
      question: "What is PRP and how does it help hair fall?",
      answer: "Platelet-Rich Plasma (PRP) therapy uses your own blood plasma growth factors to stimulate dormant hair follicles, reverse thinning, and promote natural, healthy hair regrowth."
    },
    {
      question: "How many sessions are needed for laser hair removal?",
      answer: "Typically, 6 to 8 sessions spaced several weeks apart are required for optimal, long-lasting hair reduction, depending on hair thickness and the area being treated."
    },
    {
      question: "Do you provide individualized treatment plans?",
      answer: "Absolutely. Every patient receives a comprehensive skin or hair assessment by our experienced specialists to create a customized, cost-effective care protocol tailored to their goals."
    },
    {
      question: "Are chemical peels painful and what is the recovery downtime?",
      answer: "Modern dermatological chemical peels are gentle and cause only a slight tingling sensation. Most patients experience zero downtime and can return to daily activities immediately with sun protection."
    },
    {
      question: "How do I book a consultation with Dr. M.N. Rao or Dr. Megha.mala?",
      answer: "You can schedule a consultation directly through our online appointment form on the website or by calling our direct helpline at +91 8832421234."
    }
  ];

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
                <i className="feather icon-award text-primary fs-6"></i> EXPERT DERMATOLOGY CARE
              </span>
              <h1 className="fw-bold text-secondary mb-2" style={{ fontSize: '2.6rem', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                Our Services
              </h1>
              <p className="text-muted mx-auto mb-3" style={{ maxWidth: 580, fontSize: '0.95rem', lineHeight: '1.55' }}>
                Scientifically proven, safe, and personalized skin and hair therapies delivered by certified clinical specialists.
              </p>
              
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white px-3.5 py-1.5 rounded-pill shadow-sm mb-0 align-items-center gap-2" style={{ fontSize: '0.825rem' }}>
                  <li className="breadcrumb-item mb-0"><Link href="/" className="text-decoration-none text-muted fw-medium">Home</Link></li>
                  <li className="breadcrumb-item mb-0 text-primary fw-bold active" aria-current="page">Our Services</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Services Expandable Accordion Section */}
        <section id="servicesGrid" className="content-inner-2 bg-white py-5">
          <div className="container">
            <div className="section-head style-3 m-b30 text-center">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">OUR SPECIALTIES</span>
              <h2 className="title fw-bold text-secondary mb-2">Transform Your Skin with Our <br /> Advanced Dermatology Treatments</h2>
              <p className="mw-100 text-muted">Scientifically proven, safe, and effective advanced skin and hair treatments accessible to all.</p>
            </div>

            <div className="dz-flex-wrapper m-b30">
              {servicesData.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div
                    key={service.id}
                    className={`dz-flex-item ${isActive ? "active" : ""}`}
                    onClick={() => setActiveService(index)}
                    onMouseEnter={() => setActiveService(index)}
                  >
                    {/* Collapsed View */}
                    <div className="dz-flex-head" style={{ backgroundImage: `url('${service.img}')` }}>
                      <div className="btn-arrow">
                        <i className="feather icon-arrow-up-right fs-5"></i>
                      </div>
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <h3 className="title">{service.title}</h3>
                        <span className="fs-5 fw-bold text-white-50 ms-auto me-1">0{index + 1}</span>
                      </div>
                    </div>

                    {/* Expanded View */}
                    <div className="dz-flex-info">
                      {/* Left: Image Media */}
                      <div className="dz-card-media position-relative">
                        <img src={service.img} alt={service.title} />
                        <Link href="/book" className="btn btn-white position-absolute bottom-0 start-0 m-2 shadow-sm btn-sm fw-medium" style={{ fontSize: '0.75rem', zIndex: 3 }}>
                          <i className="feather icon-calendar text-primary me-1"></i>
                          Book Appointment
                        </Link>
                      </div>

                      {/* Right: Details Content */}
                      <div className="dz-card-content">
                        <div>
                          <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-2" style={{ fontSize: '0.75rem' }}>
                            {service.subtitle}
                          </span>
                          <h3 className="fw-bold text-secondary mb-1.5 fs-5">{service.title}</h3>
                          <p className="text-muted mb-2.5" style={{ fontSize: '0.825rem', lineHeight: '1.4' }}>{service.desc}</p>
                          
                          <ul className="list-unstyled mb-2">
                            {service.features.map((feat, idx) => (
                              <li key={idx} className="d-flex align-items-center mb-1 text-secondary fw-medium" style={{ fontSize: '0.8rem' }}>
                                <i className="feather icon-check-circle text-primary me-2 flex-shrink-0"></i>
                                <span className="text-truncate">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-top d-flex align-items-center justify-content-between mt-auto">
                          <div className="d-flex align-items-center gap-2">
                            <img src={service.doctorImg} className="rounded-circle shadow-sm" style={{ width: 38, height: 38, objectFit: 'cover', objectPosition: 'top' }} alt={service.doctor} />
                            <div>
                              <h6 className="title mb-0 fw-bold" style={{ fontSize: '0.825rem' }}>{service.doctor}</h6>
                              <span className="text-muted" style={{ fontSize: '0.75rem' }}>{service.role}</span>
                            </div>
                          </div>
                          <Link href="/contact" className="btn btn-primary btn-sm rounded-pill px-3" style={{ fontSize: '0.8rem' }}>
                            Book Consult <i className="feather icon-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Advanced Procedures */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="section-head style-3 m-b30 text-center">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">TARGETED THERAPIES</span>
              <h2 className="title fw-bold text-secondary mb-2">Other Featured Clinical Procedures</h2>
              <p className="text-muted mw-100">Specialized clinical procedures targeting custom aesthetic goals, pigmentation, scars, and tags.</p>
            </div>
            <div className="row g-4">
              {/* Card 1: Chemical Peeling */}
              <div className="col-xl-4 col-md-6">
                <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column justify-content-between hover-lift">
                  <div>
                    <div className="dz-media rounded-3 overflow-hidden position-relative mb-3" style={{ height: 210 }}>
                      <img src="/images/procedures/peeling.png" className="w-100 h-100 object-fit-cover" alt="Chemical Peeling" />
                      <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                        Exfoliation & Glow
                      </span>
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">Chemical Peeling</h5>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                      Gently removes dead skin cells to address acne spots, sun damage, fine lines, and dullness, revealing refreshed skin.
                    </p>
                  </div>
                  <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                    Book Procedure <i className="feather icon-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>

              {/* Card 2: Cryotherapy */}
              <div className="col-xl-4 col-md-6">
                <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column justify-content-between hover-lift">
                  <div>
                    <div className="dz-media rounded-3 overflow-hidden position-relative mb-3" style={{ height: 210 }}>
                      <img src="/images/procedures/cryo.png" className="w-100 h-100 object-fit-cover" alt="Cryotherapy" />
                      <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                        Non-Invasive Removal
                      </span>
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">Cryotherapy (Skin Tags & Warts)</h5>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                      Safe and quick removal of warts, skin tags, and benign skin lesions using targeted liquid nitrogen cooling technology.
                    </p>
                  </div>
                  <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                    Book Procedure <i className="feather icon-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>

              {/* Card 3: Tattoo Removal */}
              <div className="col-xl-4 col-md-6">
                <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column justify-content-between hover-lift">
                  <div>
                    <div className="dz-media rounded-3 overflow-hidden position-relative mb-3" style={{ height: 210 }}>
                      <img src="/images/procedures/tattoo.png" className="w-100 h-100 object-fit-cover" alt="Tattoo Removal" />
                      <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                        Ink Dissolution
                      </span>
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">Advanced Tattoo Removal</h5>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                      Advanced Q-switched laser technology breaks down deep ink pigments safely without harming surrounding skin tissue.
                    </p>
                  </div>
                  <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                    Book Procedure <i className="feather icon-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>

              {/* Card 4: Skin Tightening */}
              <div className="col-xl-4 col-md-6">
                <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column justify-content-between hover-lift">
                  <div>
                    <div className="dz-media rounded-3 overflow-hidden position-relative mb-3" style={{ height: 210 }}>
                      <img src="/images/procedures/tightening.png" className="w-100 h-100 object-fit-cover" alt="Skin Tightening" />
                      <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                        Collagen Rejuvenation
                      </span>
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">Advanced Skin Tightening</h5>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                      Non-surgical skin tightening procedures utilizing radiofrequency to firm sagging skin and boost natural collagen synthesis.
                    </p>
                  </div>
                  <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                    Book Procedure <i className="feather icon-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>

              {/* Card 5: Pimple Scars */}
              <div className="col-xl-4 col-md-6">
                <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column justify-content-between hover-lift">
                  <div>
                    <div className="dz-media rounded-3 overflow-hidden position-relative mb-3" style={{ height: 210 }}>
                      <img src="/images/procedures/scars.png" className="w-100 h-100 object-fit-cover" alt="Pimple Scars" />
                      <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                        Texture Smoothing
                      </span>
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">Pimple Scars & Stretch Marks</h5>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                      Targeted clinical laser and microneedling therapies for reducing acne scars, stretch marks, and evening skin texture.
                    </p>
                  </div>
                  <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                    Book Procedure <i className="feather icon-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>

              {/* Card 6: Scalp & Allergies */}
              <div className="col-xl-4 col-md-6">
                <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column justify-content-between hover-lift">
                  <div>
                    <div className="dz-media rounded-3 overflow-hidden position-relative mb-3" style={{ height: 210 }}>
                      <img src="/images/services/middle/img3.webp" className="w-100 h-100 object-fit-cover" alt="Scalp & Allergies" />
                      <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                        Scalp Dermatology
                      </span>
                    </div>
                    <h5 className="fw-bold text-secondary mb-2">Psoriasis, Dandruff & Allergies</h5>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', lineHeight: '1.45' }}>
                      Comprehensive diagnostic and clinical treatments for scalp scaling, chronic skin allergies, and psoriasis patches.
                    </p>
                  </div>
                  <Link href="/contact" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                    Book Procedure <i className="feather icon-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="row content-wrapper style-2 align-items-center g-4">
              <div className="col-xxl-7 col-lg-6">
                <div className="content-info">
                  <div className="section-head style-1 mb-4">
                    <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">COMMON QUESTIONS</span>
                    <h2 className="title fw-bold text-secondary mb-1">Frequently Asked Questions</h2>
                    <p className="text-muted">Learn more about treatments, recovery times, and individual consultation bookings.</p>
                  </div>
                  
                  <div className="d-flex flex-column gap-3 mb-4">
                    {faqData.map((faq, index) => {
                      const isOpen = activeFaq === index;
                      return (
                        <div key={index} className={`bg-white rounded-4 shadow-sm border ${isOpen ? 'border-primary-subtle' : 'border-light-subtle'} overflow-hidden transition-all`}>
                          <button
                            type="button"
                            className="w-100 text-start p-4 bg-white border-0 d-flex align-items-center justify-content-between gap-3 fw-bold text-secondary"
                            style={{ fontSize: '0.975rem' }}
                            onClick={() => setActiveFaq(isOpen ? null : index)}
                          >
                            <span className="pe-2">{faq.question}</span>
                            <div className={`p-2 rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center ${isOpen ? 'bg-primary text-white' : 'bg-light text-muted'}`} style={{ width: 32, height: 32 }}>
                              <i className={`feather ${isOpen ? 'icon-chevron-up' : 'icon-chevron-down'} fs-6`}></i>
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 pt-3 border-top border-light-subtle" style={{ fontSize: '0.925rem', lineHeight: '1.65', color: '#444444' }}>
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-4 border border-light-subtle shadow-sm d-inline-flex">
                    <div className="avatar-group d-flex">
                      <img className="avatar rounded-circle avatar-md border border-white border-2" src="/images/avatar/small/avatar1.webp" alt="Avatar" />
                      <img className="avatar rounded-circle avatar-md border border-white border-2" src="/images/avatar/small/avatar2.webp" alt="Avatar" />
                      <img className="avatar rounded-circle avatar-md border border-white border-2" src="/images/avatar/small/avatar3.webp" alt="Avatar" />
                      <img className="avatar rounded-circle avatar-md border border-white border-2" src="/images/avatar/small/avatar4.webp" alt="Avatar" />
                    </div>
                    <div>
                      <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.85rem' }}>300,000+ Happy Patients</span>
                      <span className="small text-muted" style={{ fontSize: '0.75rem' }}>★ 4.9 Rating across South India</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-5 col-lg-6">
                <div className="dz-media rounded-4 overflow-hidden shadow border border-light-subtle position-relative" style={{ minHeight: 460 }}>
                  <img src="/images/about/why_choose_patient.png" className="w-100 h-100 object-fit-cover" alt="Barbie Clinic Patient Care" />
                  <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded-4 shadow-lg border border-light-subtle" style={{ maxWidth: 260 }}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <div className="p-2 bg-primary-subtle text-primary rounded-circle">
                        <i className="feather icon-check-circle fs-5"></i>
                      </div>
                      <div>
                        <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.85rem' }}>100% Medical Safety</span>
                        <span className="small text-muted" style={{ fontSize: '0.75rem' }}>USFDA Approved Laser Devices</span>
                      </div>
                    </div>
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
