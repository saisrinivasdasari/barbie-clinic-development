// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/common/Preloader";
import { useBooking } from "@/context/BookingContext";

const defaultServicesData = [
  {
    id: "trt_vitiligo",
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
    id: "trt_acne",
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
    id: "trt_prp",
    title: "PRP for Hairfall",
    subtitle: "Hair Regrowth & Restoration",
    desc: "Advanced PRP treatment for hair loss, dandruff, acne scars, under eye, and neck rejuvenation using your own plasma growth factors.",
    img: "/images/procedures/prp.png",
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
    id: "trt_hair_removal",
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
    id: "trt_colour",
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

export default function Page() {
  const { openBooking } = useBooking();
  // Interactive States
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [servicesData, setServicesData] = useState(defaultServicesData);

  useEffect(() => {
    fetchLiveServices();
  }, []);

  const fetchLiveServices = async () => {
    try {
      const res = await fetch("/api/booking/treatments", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const live = json.data.map((trt, idx) => ({
          id: trt.id || idx,
          title: trt.title,
          subtitle: trt.subtitle || trt.category || "Clinical Treatment",
          desc: trt.description || "Safe and effective clinical care protocol tailored by senior specialists.",
          img: trt.imageUrl || "/images/procedures/peeling.png",
          features: [
            trt.subtitle || "Expert Clinical Care",
            `${trt.durationMinutes || 30} Mins Duration`,
            "USFDA Approved Protocols"
          ],
          doctor: trt.doctors && trt.doctors.length > 0 ? trt.doctors[0].name : "Dr. M.N. Rao",
          role: trt.doctors && trt.doctors.length > 0 ? (trt.doctors[0].title || "Specialist") : "Senior Dermatologist",
          doctorImg: trt.doctors && trt.doctors.length > 0 ? (trt.doctors[0].photoUrl || "/Doctor-imgs/Dr. M.N. Rao.png") : "/Doctor-imgs/Dr. M.N. Rao.png",
        }));
        setServicesData(live);
      }
    } catch (e) {
      console.error("Failed to fetch live services on landing page:", e);
    }
  };

  const faqData = [
    {
      question: "Is laser treatment safe for Vitiligo?",
      answer: "Yes, our targeted laser treatment for white patches is highly precise, non-invasive, and scientifically proven safe with no downtime or side effects on adjacent skin."
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
    }
  ];

  const testimonials = [
    {
      text: `"The targeted vitiligo laser therapy for my white patches was extremely precise. I started seeing natural pigment recovery within weeks. Dr. M.N. Rao Sir's 30+ years of experience is truly exceptional."`,
      name: "K. Venkat Rao",
      type: "Vitiligo Laser Therapy Patient",
      treatment: "Vitiligo Laser",
      img: "/images/avatar/telugu/avatar2.png"
    },
    {
      text: `"I struggled with severe acne scars and pigmentation for years. The customized chemical peeling treatment at Barbie Clinic completely cleared my skin tone and restored my confidence."`,
      name: "Sravanthi Reddy",
      type: "Aesthetic Peeling Patient",
      treatment: "Acne Peeling",
      img: "/images/avatar/telugu/avatar1.png"
    },
    {
      text: `"My hair thinning had made me very self-conscious. Dr. M.N. Rao recommended targeted PRP growth factor sessions, and my hair fall completely stopped with noticeable new hair density."`,
      name: "Raja Sekhar Varma",
      type: "PRP Hair Regrowth Patient",
      treatment: "PRP Treatment",
      img: "/images/avatar/telugu/avatar4.png"
    },
    {
      text: `"Dr. Megha.mala Madam's laser hair reduction treatment was painless, quick, and remarkably smooth. The clinic hygiene and patient care standards at Barbie Clinic are world-class."`,
      name: "Pravallika Naidu",
      type: "Laser Hair Reduction Patient",
      treatment: "Laser Hair Removal",
      img: "/images/avatar/telugu/avatar3.png"
    }
  ];



  return (
    <div className="page-wraper">
      {/* Preloader */}
      <Preloader />

      <Header />

      <main className="page-content">
        {/* Hero Banner */}
        <div className="hero-banner style-1 position-relative">
          <div className="container">
            <div className="inner-wrapper">
              <div className="row align-items-center h-100">
                <div className="col-md-6">
                  <div className="hero-content">
                    <h1 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                      Glow with Confidence — Precision Skin & Laser Therapies
                    </h1>
                    <div className="content-bx style-2 secondary m-b40 wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                      Barbie Skin & Laser Clinic, backed by over 30 years of clinical experience. We specialize in advanced laser therapies, facial rejuvenation, and cosmetic treatments designed for your absolute skin health.
                    </div>
                    <div className="d-flex align-items-center flex-wrap gap-3">
                      <button 
                        type="button"
                        onClick={() => openBooking()} 
                        className="btn btn-lg btn-icon btn-primary wow fadeInUp border-0" 
                        data-wow-delay="0.6s" 
                        data-wow-duration="0.8s"
                      >
                        Book Appointment
                        <span className="right-icon"><i className="feather icon-arrow-right"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 align-self-center wow fadeInRight" data-wow-delay="0.8s" data-wow-duration="0.8s">
                  <div className="hero-thumbnail position-relative">
                    <img className="thumbnail" src="/Clinic-imgs/smiling-young-woman.jpg" alt="Barbie Clinic Dermatology" />
                  </div>
                </div>
              </div>
              <div className="item1">
                <div className="widget-rating1">
                  <ul className="star-list">
                    <li><i className="fa fa-star text-warning"></i></li>
                    <li><i className="fa fa-star text-warning"></i></li>
                    <li><i className="fa fa-star text-warning"></i></li>
                    <li><i className="fa fa-star text-warning"></i></li>
                    <li><i className="fa fa-star text-warning"></i></li>
                  </ul>
                  <span className="rating text-primary m-r5 fw-bold">(4.9)</span>
                  <span className="text">300k+ Happy Clients | 30 Years Experience</span>
                </div>
              </div>

              <svg className="shape1" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.5 0L34.4251 26.5749L61 30.5L34.4251 34.4251L30.5 61L26.5749 34.4251L0 30.5L26.5749 26.5749L30.5 0Z" fill="var(--bs-primary)" />
              </svg>
              <svg className="shape2" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.5 0L34.4251 26.5749L61 30.5L34.4251 34.4251L30.5 61L26.5749 34.4251L0 30.5L26.5749 26.5749L30.5 0Z" fill="var(--bs-primary)" />
              </svg>
            </div>
          </div>
          <div className="vertical-info left">
            <ul className="social-list">
              <li><a href="https://www.instagram.com/barbieskinandlaserclinic_/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/BarbieSkinAndLaserClinic" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://www.youtube.com/@BarbieSkinandLaserClinic" target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
            <Link href="/contact" className="btn btn-white btn-sm px-2 py-3 btn-shadow rounded">LET'S TALK</Link>
          </div>
          <div className="banner-shape4"></div>
          <div className="banner-shape5"></div>
          <div className="banner-shape6"></div>
        </div>

        {/* Text Marquee */}
        <div className="dz-marquee style-1 bg-secondary overflow-hidden py-3">
          <div className="marquee-wrapper">
            <div className="marquee-track align-items-center">
              <ul className="marquee-list list-unstyled mb-0 d-flex align-items-center">
                <li className="item">Laser Hair Removal</li>
                <li className="item">Anti Acne & Pimples</li>
                <li className="item">PRP for Hairfall</li>
                <li className="item">Chemical Peeling</li>
                <li className="item">Colour Improvement & Tone</li>
                <li className="item">Facial Rejuvenation</li>
                <li className="item">Tattoo Removal</li>
                <li className="item">Skin Tags & Cryotherapy</li>
                <li className="item">Vitiligo Care</li>
              </ul>
              <ul className="marquee-list list-unstyled mb-0 d-flex align-items-center" aria-hidden="true">
                <li className="item">Laser Hair Removal</li>
                <li className="item">Anti Acne & Pimples</li>
                <li className="item">PRP for Hairfall</li>
                <li className="item">Chemical Peeling</li>
                <li className="item">Colour Improvement & Tone</li>
                <li className="item">Facial Rejuvenation</li>
                <li className="item">Tattoo Removal</li>
                <li className="item">Skin Tags & Cryotherapy</li>
                <li className="item">Vitiligo Care</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Clinic Preview */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="row content-wrapper style-1 align-items-center">
              <div className="col-xl-5 col-lg-6 m-b15">
                <div className="content-media position-relative">
                  <div className="dz-media overflow-hidden rounded-4 shadow-sm" style={{ maxHeight: 440 }}>
                    <img src="/Clinic-imgs/cosmetologist-woman.jpg" className="w-100 h-100 object-fit-cover rounded-4" alt="Barbie Cosmetology Specialist" />
                  </div>
                  {/* <div className="item3 cursor-pointer position-absolute bottom-0 end-0 m-3" onClick={() => setShowVideoModal(true)}>
                    <div className="word-rotate-box">
                      <span className="word-rotate">Explore Clinic Tour </span>
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 m-b30 position-relative">
                <div className="info-content ps-xl-4">
                  <div className="section-head style-1 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                    <h2 className="title m-b15 fw-bold text-secondary">Over 3 Decades of Excellence in Clinical & Aesthetic Dermatology</h2>
                    <p className="text-muted leading-relaxed">Backed by over 30 years of clinical experience, Barbie Skin & Laser Clinic is dedicated to providing scientifically proven, safe, and effective advanced skin and hair treatments. As a dedicated vitiligo treatment center, we are committed to revolutionizing care and making high-quality cosmetic procedures accessible to all. We employ experienced specialists and use USFDA-approved equipment to deliver personalized solutions with minimal downtime.</p>
                  </div>
                  <div className="d-flex align-items-center m-b15 flex-wrap gap-3">
                    <div className="info-widget style-1 bg-white p-3 rounded-4 shadow-sm border border-light d-flex align-items-center gap-3">
                      <div className="avatar-group d-flex">
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar1.png" alt="Telugu Patient 1" style={{ width: 44, height: 44 }} />
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar2.png" alt="Telugu Patient 2" style={{ width: 44, height: 44 }} />
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar3.png" alt="Telugu Patient 3" style={{ width: 44, height: 44 }} />
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar4.png" alt="Telugu Patient 4" style={{ width: 44, height: 44 }} />
                      </div>
                      <div className="clearfix">
                        <span className="fw-semibold text-secondary">Trusted by 300,000+ Happy Patients</span>
                      </div>
                    </div>
                    <Link href="/about" className="btn btn-square btn-xl btn-white btn-rounded shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7" stroke="var(--bs-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7 7H17V17" stroke="var(--bs-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </Link>
                  </div>
                  <div className="widget-rating3 mt-3 d-flex align-items-center gap-2">
                    <ul className="star-list list-inline mb-0">
                      <li className="list-inline-item"><i className="fa fa-star text-warning"></i></li>
                      <li className="list-inline-item"><i className="fa fa-star text-warning"></i></li>
                      <li className="list-inline-item"><i className="fa fa-star text-warning"></i></li>
                      <li className="list-inline-item"><i className="fa fa-star text-warning"></i></li>
                      <li className="list-inline-item"><i className="fa fa-star text-warning"></i></li>
                    </ul>
                    <span className="rating fw-bold text-primary">(4.9)</span>
                    <span className="text text-muted">Over 3,00,000 happy clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Swiper Section */}
        <section className="content-inner-2 bg-white py-5">
          <div className="container">
            <div className="section-head style-3 m-b30 text-center">
              <h2 className="title fw-bold text-secondary">Transform Your Skin with Our <br /> Advanced Dermatology Treatments</h2>
              <p className="mw-100 text-muted">Scientifically proven, safe, and effective advanced skin and hair treatments accessible to all.</p>
            </div>

            <div className="dz-flex-wrapper m-b30">
              {servicesData.slice(0, 5).map((service, index) => {
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
                        <button
                          type="button"
                          onClick={() => openBooking()}
                          className="btn btn-white position-absolute bottom-0 start-0 m-2 shadow-sm btn-sm fw-medium border-0"
                          style={{ fontSize: '0.75rem', zIndex: 3 }}
                        >
                          <i className="feather icon-calendar text-primary me-1"></i>
                          Book Appointment
                        </button>
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
                          <Link href="/services" className="btn btn-primary btn-sm rounded-pill px-3" style={{ fontSize: '0.8rem' }}>
                            Details <i className="feather icon-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="dz-separator style-1 text-center mt-4">
              <Link href="/services" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-medium">View All Services</Link>
            </div>
          </div>
        </section>

        {/* Featured Aesthetic Procedures */}
        <section className="content-inner bg-white py-5">
          <div className="container">
            <div className="section-head style-3 m-b30 text-center">
              <h2 className="title fw-bold text-secondary">Featured Laser & Clinical Procedures</h2>
              <p className="text-muted">State-of-the-art procedures targeting custom aesthetic goals, pigmentation, scars, and tags.</p>
            </div>
            <div className="row g-4">
              {/* Card 1: Chemical Peeling */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="procedure-card bg-white p-3 rounded-4 shadow-sm border border-light-subtle hover-lift">
                  {/* 60% Height Image Area */}
                  <div className="dz-media rounded-3 overflow-hidden position-relative">
                    <img src="/images/procedures/peeling.png" alt="Chemical Peeling" />
                    <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                      Exfoliation & Glow
                    </span>
                  </div>

                  {/* 40% Height Content Area */}
                  <div className="procedure-content">
                    <div>
                      <h4 className="title fw-bold fs-6 mb-1">
                        <Link href="/services" className="text-secondary text-decoration-none">Chemical Peeling</Link>
                      </h4>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                        Safely exfoliates damaged outer skin layers to treat acne spots & reveal glowing skin.
                      </p>
                    </div>
                    <Link href="/services" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                      Learn More <i className="feather icon-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: Skin Tags & Cryotherapy */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="procedure-card bg-white p-3 rounded-4 shadow-sm border border-light-subtle hover-lift">
                  {/* 60% Height Image Area */}
                  <div className="dz-media rounded-3 overflow-hidden position-relative">
                    <img src="/images/procedures/cryo.png" alt="Skin Tags & Cryotherapy" />
                    <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                      Lesion Removal
                    </span>
                  </div>

                  {/* 40% Height Content Area */}
                  <div className="procedure-content">
                    <div>
                      <h4 className="title fw-bold fs-6 mb-1">
                        <Link href="/services" className="text-secondary text-decoration-none">Skin Tags & Cryotherapy</Link>
                      </h4>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                        Safe, precision removal of skin tags, warts, and benign skin lesions with zero downtime.
                      </p>
                    </div>
                    <Link href="/services" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                      Learn More <i className="feather icon-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3: Laser Tattoo Removal */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="procedure-card bg-white p-3 rounded-4 shadow-sm border border-light-subtle hover-lift">
                  {/* 60% Height Image Area */}
                  <div className="dz-media rounded-3 overflow-hidden position-relative">
                    <img src="/images/procedures/tattoo.png" alt="Laser Tattoo Removal" />
                    <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                      Q-Switched Laser
                    </span>
                  </div>

                  {/* 40% Height Content Area */}
                  <div className="procedure-content">
                    <div>
                      <h4 className="title fw-bold fs-6 mb-1">
                        <Link href="/services" className="text-secondary text-decoration-none">Tattoo Removal</Link>
                      </h4>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                        USFDA-approved Q-Switched laser technology to safely fade & eliminate tattoo ink.
                      </p>
                    </div>
                    <Link href="/services" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                      Learn More <i className="feather icon-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 4: Skin Tightening */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="procedure-card bg-white p-3 rounded-4 shadow-sm border border-light-subtle hover-lift">
                  {/* 60% Height Image Area */}
                  <div className="dz-media rounded-3 overflow-hidden position-relative">
                    <img src="/Clinic-imgs/smiling-young-woman.jpg" alt="Skin Tightening & Anti-Aging" />
                    <span className="badge bg-white text-primary position-absolute top-0 start-0 m-2 shadow-sm rounded-pill px-2.5 py-1.5 fw-medium" style={{ fontSize: '0.75rem' }}>
                      RF & Laser Tightening
                    </span>
                  </div>

                  {/* 40% Height Content Area */}
                  <div className="procedure-content">
                    <div>
                      <h4 className="title fw-bold fs-6 mb-1">
                        <Link href="/services" className="text-secondary text-decoration-none">Skin Tightening</Link>
                      </h4>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                        Non-surgical skin tightening & collagen protocols to reverse fine lines & sagging.
                      </p>
                    </div>
                    <Link href="/services" className="btn btn-sm btn-outline-primary rounded-pill w-100 fw-medium">
                      Learn More <i className="feather icon-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="row content-wrapper style-2 align-items-center">
              <div className="col-xxl-7 col-lg-6 m-b30">
                <div className="content-info">
                  <div className="section-head style-1 m-b30">
                    <h2 className="title fw-bold text-secondary">Frequently Asked Questions</h2>
                    <p className="text-muted">Get answers to common queries about vitiligo laser therapy, PRP, and safety procedures.</p>
                  </div>
                  <div className="faq-container m-b35">
                    {faqData.map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div key={index} className="faq-card mb-3 bg-white rounded-3 shadow-sm border border-light-subtle overflow-hidden">
                          <button
                            type="button"
                            className="w-100 text-start p-3.5 d-flex align-items-center justify-content-between border-0 bg-white"
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            style={{ cursor: 'pointer', padding: '1rem 1.25rem' }}
                          >
                            <span className={`fw-semibold ${isOpen ? "text-primary" : "text-secondary"}`} style={{ fontSize: '1rem' }}>
                              {faq.question}
                            </span>
                            <span className={`badge rounded-circle p-2 ms-2 transition-all ${isOpen ? "bg-primary text-white" : "bg-light text-secondary"}`}>
                              <i className={`feather ${isOpen ? "icon-chevron-up" : "icon-chevron-down"}`} style={{ fontSize: '0.85rem' }}></i>
                            </span>
                          </button>
                          {isOpen && (
                            <div className="faq-answer-box p-3.5 bg-white border-top text-secondary" style={{ padding: '1rem 1.25rem', borderTop: '1px solid #f0f0f0' }}>
                              <p className="mb-0 text-muted" style={{ fontSize: '0.925rem', lineHeight: '1.6', color: '#555555' }}>
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-xxl-5 col-lg-6 m-b30">
                <div className="content-media text-center">
                  <div className="dz-media">
                    <img src="/images/about/img4.webp" className="rounded-4 shadow" alt="Doctor Consultation" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Doctors */}
        <section className="content-inner bg-white py-5">
          <div className="container">
            <div className="section-head style-3 text-center mb-5">
              <h2 className="title fw-bold text-secondary m-b10">Our Consulting Dermatologists</h2>
              <p className="text-muted">Qualified specialists committed to clinical excellence, safe diagnostics, and patient satisfaction.</p>
            </div>
            <div className="row justify-content-center g-4">
              {/* Doctor 1: Dr. M.N. Rao */}
              <div className="col-xl-5 col-lg-6 col-md-6">
                <div className="bg-white rounded-4 shadow-sm border border-light-subtle hover-lift text-center overflow-hidden position-relative h-100 d-flex flex-column" style={{ transition: 'all 0.3s ease' }}>
                  {/* Doctor Image Container (70% Visual Frame) */}
                  <div className="w-100 position-relative overflow-hidden" style={{ height: 340 }}>
                    <img src="/Doctor-imgs/Dr. M.N. Rao.png" alt="Dr. M.N. Rao" className="w-100 h-100" style={{ objectFit: 'cover', objectPosition: 'center 15%' }} />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)' }}></div>
                    <span className="badge bg-white text-primary shadow-sm px-3 py-1.5 rounded-pill position-absolute top-0 start-0 m-3 fw-semibold small d-inline-flex align-items-center gap-1.5" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.92)' }}>
                      <i className="feather icon-award text-primary fs-6"></i> 30+ Yrs Clinical Experience
                    </span>
                    <span className="badge bg-secondary text-white shadow-sm px-2.5 py-1 rounded-pill position-absolute bottom-0 start-0 m-3 fw-medium small">
                      OMC Postgraduate Alumni
                    </span>
                  </div>

                  {/* Doctor Info Content (Clean Padded Body) */}
                  <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 bg-white">
                    <div>
                      <h3 className="fw-bold text-secondary mb-1 fs-4">
                        <Link href="/about" className="text-secondary text-decoration-none">Dr. M.N. Rao</Link>
                      </h3>
                      <div className="mb-2.5">
                        <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-semibold" style={{ fontSize: '0.8rem' }}>
                          Senior Dermatologist & Cosmetologist
                        </span>
                      </div>
                      <p className="text-muted small mb-3" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                        MBBS & Diploma from Osmania Medical College. Over 30 years of clinical experience in Vitiligo laser therapies and cosmetology.
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2 pt-3 border-top border-light-subtle">
                      <button 
                        type="button"
                        onClick={() => openBooking()} 
                        className="btn btn-primary rounded-pill px-4 py-2 shadow-xs fw-semibold flex-grow-1 btn-sm border-0"
                      >
                        <i className="feather icon-calendar me-1.5"></i> Book Appointment
                      </button>
                      <a href="tel:+918885985515" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }} title="Call HQ Clinic">
                        <i className="feather icon-phone-call fs-6"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor 2: Dr. G. Megha.mala */}
              <div className="col-xl-5 col-lg-6 col-md-6">
                <div className="bg-white rounded-4 shadow-sm border border-light-subtle hover-lift text-center overflow-hidden position-relative h-100 d-flex flex-column" style={{ transition: 'all 0.3s ease' }}>
                  {/* Doctor Image Container (70% Visual Frame) */}
                  <div className="w-100 position-relative overflow-hidden" style={{ height: 340 }}>
                    <img src="/Doctor-imgs/Dr. G. Megha.mala.png" alt="Dr. G. Megha.mala" className="w-100 h-100" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)' }}></div>
                    <span className="badge bg-white text-primary shadow-sm px-3 py-1.5 rounded-pill position-absolute top-0 start-0 m-3 fw-semibold small d-inline-flex align-items-center gap-1.5" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.92)' }}>
                      <i className="feather icon-star text-primary fs-6"></i> Aesthetic Medicine Specialist
                    </span>
                    <span className="badge bg-secondary text-white shadow-sm px-2.5 py-1 rounded-pill position-absolute bottom-0 start-0 m-3 fw-medium small">
                      MBBS (2021) & Aesthetic Diploma
                    </span>
                  </div>

                  {/* Doctor Info Content (Clean Padded Body) */}
                  <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 bg-white">
                    <div>
                      <h3 className="fw-bold text-secondary mb-1 fs-4">
                        <Link href="/about" className="text-secondary text-decoration-none">Dr. G. Megha.mala</Link>
                      </h3>
                      <div className="mb-2.5">
                        <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-semibold" style={{ fontSize: '0.8rem' }}>
                          Aesthetic Practitioner & Laser Specialist
                        </span>
                      </div>
                      <p className="text-muted small mb-3" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                        MBBS & Diploma in Aesthetic Medicine. Specialized in chemical peeling, facial rejuvenation, anti-acne, and hair removal.
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2 pt-3 border-top border-light-subtle">
                      <button 
                        type="button"
                        onClick={() => openBooking()} 
                        className="btn btn-primary rounded-pill px-4 py-2 shadow-xs fw-semibold flex-grow-1 btn-sm border-0"
                      >
                        <i className="feather icon-calendar me-1.5"></i> Book Appointment
                      </button>
                      <a href="tel:+918885985515" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }} title="Call HQ Clinic">
                        <i className="feather icon-phone-call fs-6"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Senior Doctor Spotlight - Commented out for future use
        <section className="content-inner-3 bg-light py-5 overflow-hidden">
          <div className="container">
            <div className="row content-wrapper style-3 align-items-center justify-content-center g-4">
              <div className="col-xl-6 col-lg-12">
                <div className="content-info">
                  <div className="section-head style-2 m-b30">
                    <div className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold mb-2">Senior Doctor Spotlight</div>
                    <h2 className="title fw-bold text-secondary">Dr. M.N. Rao</h2>
                    <p className="fw-normal text-muted leading-relaxed mt-2">
                      <strong className="text-secondary fw-semibold">Dr. M.N. Rao</strong> is a highly respected Senior Dermatologist and Cosmetologist with over 30 years of experience in treating complex vitiligo patches, laser procedures, and advanced clinical aesthetics. He holds an MBBS and a postgraduate Diploma in Dermatology from Osmania Medical College.
                    </p>
                  </div>
                  <h4 className="text-primary fw-bold mb-3">Specializations</h4>
                  <div className="row g-2 mb-4">
                    <div className="col-6"><i className="feather icon-check-circle text-primary me-2"></i>Vitiligo Laser Specialist</div>
                    <div className="col-6"><i className="feather icon-check-circle text-primary me-2"></i>Cosmetic Dermatology</div>
                    <div className="col-6"><i className="feather icon-check-circle text-primary me-2"></i>Laser Resurfacing</div>
                    <div className="col-6"><i className="feather icon-check-circle text-primary me-2"></i>PRP Hairfall Therapies</div>
                    <div className="col-6"><i className="feather icon-check-circle text-primary me-2"></i>Pimple Scar Cryotherapy</div>
                    <div className="col-6"><i className="feather icon-check-circle text-primary me-2"></i>Allergy Diagnostics</div>
                  </div>
                  <div className="d-flex align-items-center gap-4 flex-wrap">
                    <div>
                      <img src="/images/sign.webp" alt="Signature" style={{ height: 48 }} />
                      <span className="font-14 d-block text-muted">Dr. M.N. Rao (OMC Alumni)</span>
                    </div>
                    <Link href="/contact" className="btn btn-lg btn-primary rounded-pill">
                      Book Consultation <i className="feather icon-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-8 text-center">
                <div className="content-media position-relative">
                  <img src="/images/about/img5.webp" className="rounded-4 shadow max-w-100" alt="Dr. Rao" style={{ maxHeight: 480, objectFit: 'cover' }} />
                  <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded-4 shadow-sm text-start" style={{ maxWidth: 220 }}>
                    <span className="fs-3 fw-bold text-primary">20+</span>
                    <p className="mb-0 small fw-bold text-secondary">Years Clinical Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Clinical Video Showcase Section */}
        <section className="content-inner bg-white py-5">
          <div className="container">
            <div className="section-head style-3 text-center mb-5">
              <span className="badge bg-danger-subtle text-danger px-3 py-1.5 rounded-pill fw-bold mb-2.5 d-inline-flex align-items-center gap-1.5" style={{ fontSize: '0.825rem' }}>
                <i className="fa-brands fa-youtube fs-6"></i> CLINICAL RESULTS & PATIENT STORIES
              </span>
              <h2 className="title fw-bold text-secondary mb-2" style={{ fontSize: '2.2rem' }}>Watch Barbie Clinic Treatment Transformations</h2>
              <p className="text-muted mw-100" style={{ fontSize: '0.975rem' }}>Explore real procedure demonstrations, patient testimonials, and expert medical insights directly from our clinical team.</p>
            </div>

            <div className="row g-4">
              {/* Video 1 */}
              <div className="col-lg-4 col-md-6">
                <div className="bg-white rounded-4 p-2.5 border border-light-subtle shadow-sm hover-lift h-100 d-flex flex-column justify-content-between">
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-xs mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/QafbPFeeDa8?rel=0"
                      title="Barbie Clinic Laser Treatment Showcase"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-1.5" style={{ fontSize: '0.75rem' }}>Clinical Laser Therapy</span>
                    <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: '1rem' }}>Advanced Laser Treatment & Clinical Results</h5>
                    <p className="text-muted small mb-0">Step-by-step laser procedure demonstration for skin clarity and rejuvenation.</p>
                  </div>
                </div>
              </div>

              {/* Video 2 */}
              <div className="col-lg-4 col-md-6">
                <div className="bg-white rounded-4 p-2.5 border border-light-subtle shadow-sm hover-lift h-100 d-flex flex-column justify-content-between">
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-xs mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/Nk8qVezY-aI?rel=0"
                      title="Barbie Clinic Patient Transformation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-1.5" style={{ fontSize: '0.75rem' }}>Patient Experience</span>
                    <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: '1rem' }}>Patient Transformation & Recovery Journey</h5>
                    <p className="text-muted small mb-0">Real patient testimonial detailing skin treatment experience and outcomes.</p>
                  </div>
                </div>
              </div>

              {/* Video 3 */}
              <div className="col-lg-4 col-md-6">
                <div className="bg-white rounded-4 p-2.5 border border-light-subtle shadow-sm hover-lift h-100 d-flex flex-column justify-content-between">
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-xs mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/c7M-sGfDjPg?rel=0"
                      title="Barbie Clinic Vitiligo Therapy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-1.5" style={{ fontSize: '0.75rem' }}>Vitiligo Protocol</span>
                    <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: '1rem' }}>Vitiligo Laser Therapy & Pigmentation Progress</h5>
                    <p className="text-muted small mb-0">Specialized targeted phototherapy and laser care for vitiligo patches.</p>
                  </div>
                </div>
              </div>

              {/* Video 4 */}
              <div className="col-lg-4 col-md-6">
                <div className="bg-white rounded-4 p-2.5 border border-light-subtle shadow-sm hover-lift h-100 d-flex flex-column justify-content-between">
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-xs mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/F-Xg7wpVEnE?rel=0"
                      title="Barbie Clinic Chemical Peeling"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-1.5" style={{ fontSize: '0.75rem' }}>Acne & Scar Care</span>
                    <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: '1rem' }}>Chemical Peeling & Acne Scar Treatment</h5>
                    <p className="text-muted small mb-0">Medical-grade chemical peeling procedure for acne spots and smooth texture.</p>
                  </div>
                </div>
              </div>

              {/* Video 5 */}
              <div className="col-lg-4 col-md-6">
                <div className="bg-white rounded-4 p-2.5 border border-light-subtle shadow-sm hover-lift h-100 d-flex flex-column justify-content-between">
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-xs mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/tv6TKXUBomA?rel=0"
                      title="Barbie Clinic Rejuvenation Insights"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-1.5" style={{ fontSize: '0.75rem' }}>Skin Rejuvenation</span>
                    <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: '1rem' }}>Facial Glow & Skin Tightening Protocols</h5>
                    <p className="text-muted small mb-0">Advanced aesthetic therapies for anti-aging and facial rejuvenation.</p>
                  </div>
                </div>
              </div>

              {/* Video 6 */}
              <div className="col-lg-4 col-md-6">
                <div className="bg-white rounded-4 p-2.5 border border-light-subtle shadow-sm hover-lift h-100 d-flex flex-column justify-content-between">
                  <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-xs mb-3">
                    <iframe
                      src="https://www.youtube.com/embed/z0yXbl415kw?rel=0"
                      title="Barbie Clinic Doctor Consultation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 pb-2">
                    <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium mb-1.5" style={{ fontSize: '0.75rem' }}>Doctor Insights</span>
                    <h5 className="fw-bold text-secondary mb-1" style={{ fontSize: '1rem' }}>Senior Dermatologist Guidance & Advice</h5>
                    <p className="text-muted small mb-0">Expert medical advice and procedure overview from Dr. M.N. Rao.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe CTA Banner */}
            <div className="mt-5 p-4 rounded-4 text-center d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-sm border border-light-subtle" style={{ background: 'linear-gradient(135deg, #FFF0F3 0%, #FFE6EC 100%)' }}>
              <div className="text-center text-md-start">
                <h4 className="fw-bold text-secondary mb-1">Want to See More Patient Transformations?</h4>
                <p className="text-muted small mb-0">Subscribe to the official Barbie Skin & Laser Clinic YouTube channel for weekly medical skin care updates.</p>
              </div>
              <a
                href="https://www.youtube.com/@BarbieSkinandLaserClinic"
                target="_blank"
                rel="noreferrer"
                className="btn btn-danger rounded-pill px-4 py-2.5 fw-bold shadow-sm d-inline-flex align-items-center gap-2 flex-shrink-0"
              >
                <i className="fa-brands fa-youtube fs-5"></i> Subscribe On YouTube
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="content-inner py-5 bg-light">
          <div className="container">
            <div className="section-head style-1 text-center mb-4">
              <h2 className="title fw-bold text-secondary">What Our Patients Say</h2>
              <p className="text-muted">Real experiences from patients who underwent vitiligo laser therapy, scar treatment, and cosmetic procedures.</p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm text-center position-relative">
                  <div className="star-rating text-warning mb-3 fs-5">
                    ★★★★★
                  </div>
                  <p className="fs-5 fst-italic text-secondary mb-4 leading-relaxed">
                    {testimonials[activeTestimonial].text}
                  </p>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <img
                      src={testimonials[activeTestimonial].img}
                      className="rounded-circle shadow-sm"
                      style={{ width: 60, height: 60, objectFit: 'cover' }}
                      alt={testimonials[activeTestimonial].name}
                    />
                    <div className="text-start">
                      <h5 className="fw-bold mb-0 text-secondary">{testimonials[activeTestimonial].name}</h5>
                      <span className="small text-muted">{testimonials[activeTestimonial].type}</span>
                    </div>
                  </div>

                  {/* Testimonial Nav Dots */}
                  <div className="d-flex justify-content-center gap-2 mt-4">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm rounded-circle p-1 ${activeTestimonial === idx ? "btn-primary" : "btn-light"}`}
                        style={{ width: 12, height: 12 }}
                        onClick={() => setActiveTestimonial(idx)}
                        aria-label={`Testimonial ${idx + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Our Clinic & Location Highlight Section */}
        <section className="content-wrapper style-8 bg-light py-5 position-relative overflow-hidden">
          <div className="container">
            {/* Section Header */}
            <div className="text-center max-w-700 mx-auto mb-5">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2.5" style={{ fontSize: "0.825rem", letterSpacing: "0.5px" }}>
                <i className="feather icon-map-pin me-1.5"></i> VISIT OUR CLINIC
              </span>
              <h2 className="title fw-bold text-secondary mb-2" style={{ fontSize: "2.2rem" }}>
                Experience World-Class Dermatology Care
              </h2>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                Step into our state-of-the-art facility in Himayath Nagar, Hyderabad. Advanced US-FDA approved technologies, hygienic environment, and board-certified experts.
              </p>
            </div>

            <div className="row g-4 align-items-stretch">
              {/* Left Column: Interactive Map */}
              <div className="col-lg-6 d-flex">
                <div className="rounded-4 overflow-hidden shadow-sm border border-light-subtle bg-white w-100 d-flex flex-column position-relative" style={{ minHeight: 440 }}>
                  <div className="flex-grow-1 position-relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.8000819049622!2d78.48366326956958!3d17.40217127868932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dd04ee5899%3A0x848ce3d9756397e4!2sBarbie%20Skin%20%26%20Laser%20Clinic!5e0!3m2!1sen!2sin!4v1785833072353!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: 380 }}
                      allowFullScreen={true}
                      loading="lazy"
                      title="Barbie Clinic Location Map"
                    ></iframe>
                  </div>
                  <div className="bg-secondary text-white p-3.5 d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2.5">
                      <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}>
                        <i className="feather icon-map-pin fs-5"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0 text-white" style={{ fontSize: "0.9rem" }}>Barbie Skin & Laser Clinic</h6>
                        <span className="text-white-50 small" style={{ fontSize: "0.775rem" }}>Himayath Nagar HQ • Hyderabad</span>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Barbie+Skin+%26+Laser+Clinic+Himayathnagar+Hyderabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-light rounded-pill fw-bold text-secondary px-3 py-2 d-flex align-items-center gap-1.5 shadow-xs"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <i className="feather icon-navigation text-primary"></i> Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Information & Action Card */}
              <div className="col-lg-6 d-flex">
                <div className="bg-white rounded-4 p-4 p-md-5 border border-light-subtle shadow-sm w-100 d-flex flex-column justify-content-between">
                  <div>
                    {/* Header with status badge */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                      <div>
                        <span className="text-muted d-block small fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>HEADQUARTERS</span>
                        <h3 className="fw-bold text-secondary mb-0">Himayath Nagar Center</h3>
                      </div>
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 fw-bold small">
                        <i className="feather icon-check-circle me-1"></i> Open For Consultations
                      </span>
                    </div>

                    <p className="text-muted small mb-4" style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
                      Our premier clinical center is equipped with advanced laser suites, customized treatment rooms, and dedicated specialist consultation chambers.
                    </p>

                    {/* Information Grid Cards */}
                    <div className="d-flex flex-column gap-3 mb-4">
                      {/* Location Address */}
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-primary-subtle text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44 }}>
                          <i className="feather icon-map-pin fs-5"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-1" style={{ fontSize: "0.875rem" }}>Clinic Address</h6>
                          <p className="text-muted small mb-0" style={{ lineHeight: "1.4", fontSize: "0.825rem" }}>
                            Saidatta Arcade, 3rd Floor, Himayath Nagar Main Road, Above KFC / Near Liberty, Hyderabad, Telangana 500029
                          </p>
                        </div>
                      </div>

                      {/* Working Hours */}
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-warning-subtle text-warning-emphasis rounded-3 p-2.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44 }}>
                          <i className="feather icon-clock fs-5"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-1" style={{ fontSize: "0.875rem" }}>OPD Timings</h6>
                          <div className="d-flex flex-column gap-0.5 text-muted small" style={{ fontSize: "0.825rem" }}>
                            <span><strong>Monday – Saturday:</strong> 10:00 AM – 8:00 PM</span>
                            <span><strong>Sunday:</strong> 10:00 AM – 1:30 PM (Prior Appointment)</span>
                          </div>
                        </div>
                      </div>

                      {/* Phone & Support */}
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-info-subtle text-info rounded-3 p-2.5 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44 }}>
                          <i className="feather icon-phone-call fs-5"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-1" style={{ fontSize: "0.875rem" }}>Phone & WhatsApp Support</h6>
                          <div className="d-flex align-items-center gap-3 flex-wrap" style={{ fontSize: "0.85rem" }}>
                            <a href="tel:+918885985515" className="fw-bold text-primary text-decoration-none">
                              <i className="feather icon-phone me-1"></i>+91 8885985515
                            </a>
                            <span className="text-muted">•</span>
                            <a href="https://wa.me/918885985515" target="_blank" rel="noopener noreferrer" className="fw-bold text-success text-decoration-none">
                              <i className="feather icon-message-square me-1"></i>Chat on WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-top border-light-subtle d-flex flex-wrap align-items-center gap-3">
                    <Link
                      href="/book"
                      className="btn btn-primary btn-lg rounded-pill fw-bold px-4 py-3 shadow-xs d-flex align-items-center justify-content-center gap-2 flex-grow-1 text-white"
                      style={{ fontSize: "0.925rem" }}
                    >
                      <i className="feather icon-calendar fs-5"></i>
                      <span>Book Appointment Online</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="btn btn-outline-secondary btn-lg rounded-pill fw-bold px-4 py-3 d-flex align-items-center justify-content-center gap-2 text-secondary"
                      style={{ fontSize: "0.925rem" }}
                    >
                      <i className="feather icon-arrow-right"></i>
                      <span>Get in Touch</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Clinic Tour Video Popup Modal */}
      {showVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setShowVideoModal(false)} aria-label="Close Video">
              &times;
            </button>
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/o8OgzQdA70c?autoplay=1"
                title="Barbie Clinic Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
