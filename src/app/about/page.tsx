// @ts-nocheck
"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/common/Preloader";

export default function Page() {
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
                <i className="feather icon-award text-primary fs-6"></i> BARBIE CLINIC & LASER CENTER
              </span>
              <h1 className="fw-bold text-secondary mb-2" style={{ fontSize: '2.6rem', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                About Us
              </h1>
              <p className="text-muted mx-auto mb-3" style={{ maxWidth: 580, fontSize: '0.95rem', lineHeight: '1.55' }}>
                Over a decade of excellence in advanced laser dermatology, vitiligo care, and aesthetic skin rejuvenation.
              </p>
              
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white px-3.5 py-1.5 rounded-pill shadow-sm mb-0 align-items-center gap-2" style={{ fontSize: '0.825rem' }}>
                  <li className="breadcrumb-item mb-0"><Link href="/" className="text-decoration-none text-muted fw-medium">Home</Link></li>
                  <li className="breadcrumb-item mb-0 text-primary fw-bold active" aria-current="page">About Us</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Intro Section */}
        <section className="content-inner bg-light">
          <div className="container">
            <div className="row content-wrapper style-1">
              <div className="col-xl-5 col-lg-6 m-b15">
                <div className="content-media">
                  <div className="dz-media overflow-hidden rounded-4 shadow-sm" style={{ maxHeight: 440 }}>
                    <img src="/Clinic-imgs/cosmetologist-woman.jpg" className="w-100 h-100 object-fit-cover rounded-4" alt="Barbie Cosmetology Specialist" />
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 m-b30 position-relative">
                <div className="info-content">
                  <div className="section-head style-1 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                    <h2 className="title m-b15">Over 3 Decades of Excellence in Clinical & Aesthetic Dermatology</h2>
                    <p>Backed by over 30 years of clinical experience, Barbie Skin & Laser Clinic is dedicated to providing scientifically proven, safe, and effective advanced skin and hair treatments. As a dedicated vitiligo treatment center, we are committed to revolutionizing care and making high-quality cosmetic procedures accessible to all.</p>
                    <p className="m-t10">Our mission is straightforward: <strong>"99% committed to getting you clear skin."</strong> We achieve this through individualized treatments, medical compliance, and a patient-centric approach.</p>
                  </div>
                  <div className="d-flex align-items-center m-b15 wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                    <div className="info-widget style-1 m-r20 bg-transparent border border-secondary">
                      <div className="avatar-group d-flex">
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar1.png" alt="Telugu Patient 1" style={{ width: 44, height: 44 }} />
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar2.png" alt="Telugu Patient 2" style={{ width: 44, height: 44 }} />
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar3.png" alt="Telugu Patient 3" style={{ width: 44, height: 44 }} />
                        <img className="avatar rounded-circle avatar-md border border-white border-2 object-fit-cover" src="/images/avatar/telugu/avatar4.png" alt="Telugu Patient 4" style={{ width: 44, height: 44 }} />
                      </div>
                      <div className="clearfix">
                        <span>300k+ Happy Patients | 30 Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, and Values */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="section-head style-3 text-center mb-5">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">PURPOSE & GUIDING PRINCIPLES</span>
              <h2 className="title fw-bold text-secondary mb-2">Our Mission, Vision & Core Values</h2>
              <p className="text-muted mw-100">Driving world-class clinical compliance, patient-first care, and transformative skin & laser outcomes.</p>
            </div>

            <div className="row g-4 align-items-stretch">
              {/* Left Column: Mission Spotlight Banner (5 cols) */}
              <div className="col-lg-5">
                <div className="p-4 p-md-5 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between position-relative overflow-hidden" style={{ background: "linear-gradient(145deg, #FFF0F5 0%, #FDE8ED 100%)", border: "1px solid rgba(255, 182, 193, 0.4)" }}>
                  {/* Decorative Orbs */}
                  <div className="position-absolute top-0 end-0 rounded-circle opacity-50" style={{ width: 160, height: 160, background: 'rgba(255, 105, 180, 0.25)', filter: 'blur(45px)', pointerEvents: 'none' }}></div>
                  
                  <div className="position-relative" style={{ zIndex: 2 }}>
                    <span className="badge bg-white text-primary shadow-sm px-3 py-1.5 rounded-pill fw-bold mb-3 d-inline-flex align-items-center gap-1.5" style={{ fontSize: '0.8rem' }}>
                      <i className="feather icon-award text-primary fs-6"></i> OUR MISSION PLEDGE
                    </span>
                    <h3 className="fw-bold text-secondary mb-3" style={{ fontSize: '1.85rem', lineHeight: '1.3' }}>
                      "99% Committed to Getting You Clear Skin"
                    </h3>
                    <p className="text-muted mb-4" style={{ fontSize: '0.925rem', lineHeight: '1.65' }}>
                      With over 30 years of clinical experience, Barbie Clinic has pioneered results-driven clinical dermatology and laser therapies. We ensure every patient receives customized, safe, and highly effective clinical care.
                    </p>

                    <div className="d-flex flex-column gap-2.5 mb-4">
                      <div className="d-flex align-items-center gap-2 bg-white bg-opacity-75 p-2.5 rounded-3 shadow-xs">
                        <i className="feather icon-check-circle text-primary fs-5 flex-shrink-0"></i>
                        <span className="fw-semibold text-secondary small">100% USFDA Approved Laser Tech</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white bg-opacity-75 p-2.5 rounded-3 shadow-xs">
                        <i className="feather icon-check-circle text-primary fs-5 flex-shrink-0"></i>
                        <span className="fw-semibold text-secondary small">Targeted Vitiligo & Skin Protocols</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 bg-white bg-opacity-75 p-2.5 rounded-3 shadow-xs">
                        <i className="feather icon-check-circle text-primary fs-5 flex-shrink-0"></i>
                        <span className="fw-semibold text-secondary small">Certified Senior Clinical Specialists</span>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative pt-2" style={{ zIndex: 2 }}>
                    <Link href="/contact" className="btn btn-primary rounded-pill px-4 py-2.5 shadow-sm fw-bold w-100 d-flex align-items-center justify-content-center gap-2">
                      Book A Consultation <i className="feather icon-arrow-right fs-6"></i>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Vision & Core Values Cards (7 cols) */}
              <div className="col-lg-7 d-flex flex-column justify-content-between gap-4">
                {/* Vision Card */}
                <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column flex-sm-row align-items-start gap-4 hover-lift position-relative overflow-hidden">
                  <div className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)" }}>
                    <i className="feather icon-eye text-white fs-3"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="fw-bold text-secondary mb-0">Our Vision</h4>
                      <span className="badge bg-primary-subtle text-primary px-2.5 py-1 rounded-pill fw-medium" style={{ fontSize: '0.75rem' }}>
                        Regional Clinical Benchmark
                      </span>
                    </div>
                    <p className="text-muted small mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      To scale state-of-the-art dermatological therapies across South India, offering standardized, high-quality, and cost-effective skin procedures accessible to every patient.
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}>7+ Clinic Branches</span>
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}>South India Reach</span>
                      <span className="badge bg-light text-secondary border px-2.5 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}>Standardized Care</span>
                    </div>
                  </div>
                </div>

                {/* Core Values Card */}
                <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle h-100 d-flex flex-column flex-sm-row align-items-start gap-4 hover-lift position-relative overflow-hidden">
                  <div className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style={{ width: 64, height: 64, background: "linear-gradient(135deg, #E06695 0%, #C71585 100%)" }}>
                    <i className="feather icon-shield text-white fs-3"></i>
                  </div>
                  <div className="w-100">
                    <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
                      <h4 className="fw-bold text-secondary mb-0">Core Values</h4>
                      <span className="badge bg-secondary-subtle text-secondary px-2.5 py-1 rounded-pill fw-medium" style={{ fontSize: '0.75rem' }}>
                        Ethical Healthcare Standards
                      </span>
                    </div>
                    <div className="row g-3.5 mt-3">
                      <div className="col-md-4">
                        <div className="p-4 rounded-4 border border-primary-subtle h-100 d-flex flex-column justify-content-center shadow-xs" style={{ background: "linear-gradient(145deg, #FFF0F5 0%, #FFF5F7 100%)", minHeight: 120 }}>
                          <div>
                            <span className="fw-bold text-secondary d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.95rem' }}>
                              <i className="feather icon-heart text-primary fs-5"></i> Customer First
                            </span>
                            <span className="text-muted d-block" style={{ fontSize: '0.825rem', lineHeight: '1.5' }}>
                              300k+ patients treated with 30 yrs expertise.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-4 rounded-4 border border-primary-subtle h-100 d-flex flex-column justify-content-center shadow-xs" style={{ background: "linear-gradient(145deg, #FFF0F5 0%, #FFF5F7 100%)", minHeight: 120 }}>
                          <div>
                            <span className="fw-bold text-secondary d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.95rem' }}>
                              <i className="feather icon-users text-primary fs-5"></i> People Next
                            </span>
                            <span className="text-muted d-block" style={{ fontSize: '0.825rem', lineHeight: '1.5' }}>
                              Empowered female healthcare workforce.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-4 rounded-4 border border-primary-subtle h-100 d-flex flex-column justify-content-center shadow-xs" style={{ background: "linear-gradient(145deg, #FFF0F5 0%, #FFF5F7 100%)", minHeight: 120 }}>
                          <div>
                            <span className="fw-bold text-secondary d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.95rem' }}>
                              <i className="feather icon-check-circle text-primary fs-5"></i> Compliance Best
                            </span>
                            <span className="text-muted d-block" style={{ fontSize: '0.825rem', lineHeight: '1.5' }}>
                              Strict clinical USFDA safety protocols.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="content-inner bg-light py-5">
          <div className="container">
            <div className="section-head style-3 text-center mb-5">
              <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">OUR CLINICAL HERITAGE</span>
              <h2 className="title fw-bold text-secondary mb-2">Our Journey & Milestones</h2>
              <p className="text-muted mw-100">Growing from a single clinical headquarter in Hyderabad to a leading regional skin & laser clinic network.</p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-11">
                <div className="timeline-container position-relative py-3">
                  {/* Central Gradient Line */}
                  <div 
                    className="timeline-line position-absolute start-50 translate-middle-x h-100 d-none d-md-block rounded-pill" 
                    style={{ width: "3px", top: 0, background: "linear-gradient(180deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)" }}
                  ></div>

                  <div className="d-flex flex-column gap-5">
                    {/* Milestone 1: 2009 */}
                    <div className="row align-items-center position-relative">
                      <div className="col-md-6 text-md-end pe-md-5">
                        <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle hover-lift position-relative overflow-hidden">
                          <div className="position-absolute top-0 start-0 end-0" style={{ height: 3, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                          <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold fs-6 mb-2">2009</span>
                          <h5 className="fw-bold text-secondary mb-1.5">Founded Headquarters</h5>
                          <div className="d-flex align-items-center justify-content-md-end gap-1.5 mb-2">
                            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                              <i className="feather icon-map-pin text-primary me-1"></i>Himayath Nagar, Hyderabad
                            </span>
                          </div>
                          <p className="mb-0 text-muted small" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Established our first clinic HQ in Hyderabad, introducing specialized targeted laser therapies for Vitiligo.
                          </p>
                        </div>
                      </div>
                      
                      {/* Center Node Dot */}
                      <div className="position-absolute start-50 top-50 translate-middle d-none d-md-flex align-items-center justify-content-center z-3">
                        <div className="rounded-circle bg-white p-1 shadow-sm border border-primary border-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.75rem' }}>
                            09
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 d-none d-md-block"></div>
                    </div>

                    {/* Milestone 2: 2014 */}
                    <div className="row align-items-center position-relative">
                      <div className="col-md-6 d-none d-md-block"></div>
                      
                      {/* Center Node Dot */}
                      <div className="position-absolute start-50 top-50 translate-middle d-none d-md-flex align-items-center justify-content-center z-3">
                        <div className="rounded-circle bg-white p-1 shadow-sm border border-primary border-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.75rem' }}>
                            14
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 text-start ps-md-5">
                        <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle hover-lift position-relative overflow-hidden">
                          <div className="position-absolute top-0 start-0 end-0" style={{ height: 3, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                          <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold fs-6 mb-2">2014</span>
                          <h5 className="fw-bold text-secondary mb-1.5">Hyderabad Clinical Leader</h5>
                          <div className="d-flex align-items-center gap-1.5 mb-2">
                            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                              <i className="feather icon-award text-primary me-1"></i>Clinical Recognition
                            </span>
                          </div>
                          <p className="mb-0 text-muted small" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Recognized as Hyderabad's leading clinical center for targeted vitiligo care and aesthetic laser treatments.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 3: 2015 */}
                    <div className="row align-items-center position-relative">
                      <div className="col-md-6 text-md-end pe-md-5">
                        <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle hover-lift position-relative overflow-hidden">
                          <div className="position-absolute top-0 start-0 end-0" style={{ height: 3, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                          <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold fs-6 mb-2">2015</span>
                          <h5 className="fw-bold text-secondary mb-1.5">Bengaluru Expansion</h5>
                          <div className="d-flex align-items-center justify-content-md-end gap-1.5 mb-2">
                            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                              <i className="feather icon-map-pin text-primary me-1"></i>Bengaluru, Karnataka
                            </span>
                          </div>
                          <p className="mb-0 text-muted small" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Expanded services to Bengaluru, making high-quality cosmetic skin and laser treatments accessible in Karnataka.
                          </p>
                        </div>
                      </div>

                      {/* Center Node Dot */}
                      <div className="position-absolute start-50 top-50 translate-middle d-none d-md-flex align-items-center justify-content-center z-3">
                        <div className="rounded-circle bg-white p-1 shadow-sm border border-primary border-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.75rem' }}>
                            15
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 d-none d-md-block"></div>
                    </div>

                    {/* Milestone 4: 2017 */}
                    <div className="row align-items-center position-relative">
                      <div className="col-md-6 d-none d-md-block"></div>

                      {/* Center Node Dot */}
                      <div className="position-absolute start-50 top-50 translate-middle d-none d-md-flex align-items-center justify-content-center z-3">
                        <div className="rounded-circle bg-white p-1 shadow-sm border border-primary border-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.75rem' }}>
                            17
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 text-start ps-md-5">
                        <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle hover-lift position-relative overflow-hidden">
                          <div className="position-absolute top-0 start-0 end-0" style={{ height: 3, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                          <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold fs-6 mb-2">2017</span>
                          <h5 className="fw-bold text-secondary mb-1.5">Chennai Clinical Reach</h5>
                          <div className="d-flex align-items-center gap-1.5 mb-2">
                            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                              <i className="feather icon-map-pin text-primary me-1"></i>Chennai, Tamil Nadu
                            </span>
                          </div>
                          <p className="mb-0 text-muted small" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Opened state-of-the-art clinic branch in Chennai, specializing in painless unwanted hair removal lasers.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 5: 2018 */}
                    <div className="row align-items-center position-relative">
                      <div className="col-md-6 text-md-end pe-md-5">
                        <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle hover-lift position-relative overflow-hidden">
                          <div className="position-absolute top-0 start-0 end-0" style={{ height: 3, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                          <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold fs-6 mb-2">2018</span>
                          <h5 className="fw-bold text-secondary mb-1.5">Kochi & Vizag Expansion</h5>
                          <div className="d-flex align-items-center justify-content-md-end gap-1.5 mb-2">
                            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                              <i className="feather icon-map-pin text-primary me-1"></i>Kerala & Andhra Pradesh
                            </span>
                          </div>
                          <p className="mb-0 text-muted small" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Simultaneously launched fully-equipped clinical branches in Kochi (Kerala) and Vizag (Andhra Pradesh).
                          </p>
                        </div>
                      </div>

                      {/* Center Node Dot */}
                      <div className="position-absolute start-50 top-50 translate-middle d-none d-md-flex align-items-center justify-content-center z-3">
                        <div className="rounded-circle bg-white p-1 shadow-sm border border-primary border-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.75rem' }}>
                            18
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 d-none d-md-block"></div>
                    </div>

                    {/* Milestone 6: 2019 */}
                    <div className="row align-items-center position-relative">
                      <div className="col-md-6 d-none d-md-block"></div>

                      {/* Center Node Dot */}
                      <div className="position-absolute start-50 top-50 translate-middle d-none d-md-flex align-items-center justify-content-center z-3">
                        <div className="rounded-circle bg-white p-1 shadow-sm border border-primary border-2">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40, fontSize: '0.75rem' }}>
                            19
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 text-start ps-md-5">
                        <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle hover-lift position-relative overflow-hidden">
                          <div className="position-absolute top-0 start-0 end-0" style={{ height: 3, background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
                          <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold fs-6 mb-2">2019</span>
                          <h5 className="fw-bold text-secondary mb-1.5">Pune & Regional Network Scale</h5>
                          <div className="d-flex align-items-center gap-1.5 mb-2">
                            <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                              <i className="feather icon-check-circle text-primary me-1"></i>7 Regional Locations
                            </span>
                          </div>
                          <p className="mb-0 text-muted small" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                            Expanded clinical footprint to Pune, establishing a network of 7 premium locations across South India.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Dermatologists showcase */}
        <section className="content-inner bg-light">
          <div className="container">
            <div className="section-head style-3 text-center wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
              <h2 className="title m-b10">Our Consulting Dermatologists</h2>
              <p>Qualified specialists committed to clinical excellence, safe diagnostics, and patient satisfaction.</p>
            </div>
            <div className="row justify-content-center g-4">
              {/* Doctor 1: Dr. M.N. Rao */}
              <div className="col-xl-5 col-lg-6 col-md-6 m-b30">
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
                      <Link href="/contact" className="btn btn-primary rounded-pill px-4 py-2 shadow-xs fw-semibold flex-grow-1 btn-sm">
                        <i className="feather icon-calendar me-1.5"></i> Book Consultation
                      </Link>
                      <a href="tel:+918832421234" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }} title="Call HQ Clinic">
                        <i className="feather icon-phone-call fs-6"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor 2: Dr. G. Megha.mala */}
              <div className="col-xl-5 col-lg-6 col-md-6 m-b30">
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
                      <Link href="/contact" className="btn btn-primary rounded-pill px-4 py-2 shadow-xs fw-semibold flex-grow-1 btn-sm">
                        <i className="feather icon-calendar me-1.5"></i> Book Consultation
                      </Link>
                      <a href="tel:+918832421234" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }} title="Call HQ Clinic">
                        <i className="feather icon-phone-call fs-6"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="content-inner bg-white py-5">
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="content-info">
                  <div className="section-head style-1 mb-4">
                    <span className="badge bg-primary-subtle text-primary px-3 py-1.5 rounded-pill fw-bold mb-2">CLINICAL EXCELLENCE</span>
                    <h2 className="title fw-bold text-secondary mb-2" style={{ fontSize: '2.2rem' }}>Why Choose Barbie Skin & Laser Clinic</h2>
                    <p className="text-muted">We deliver world-class clinical outcomes with USFDA-approved technologies, strict medical compliance, and customer-first care protocols.</p>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 border border-light-subtle h-100 d-flex gap-2.5">
                        <div className="p-2 bg-primary-subtle text-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                          <i className="feather icon-check-circle fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.875rem' }}>USFDA Approved Tech</h6>
                          <p className="text-muted mb-0 small" style={{ fontSize: '0.775rem' }}>Advanced precision laser devices.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 border border-light-subtle h-100 d-flex gap-2.5">
                        <div className="p-2 bg-primary-subtle text-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                          <i className="feather icon-user-check fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.875rem' }}>Customized Protocols</h6>
                          <p className="text-muted mb-0 small" style={{ fontSize: '0.775rem' }}>Tailored by senior dermatologists.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 border border-light-subtle h-100 d-flex gap-2.5">
                        <div className="p-2 bg-primary-subtle text-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                          <i className="feather icon-zap fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.875rem' }}>Painless Procedures</h6>
                          <p className="text-muted mb-0 small" style={{ fontSize: '0.775rem' }}>Zero downtime & maximum safety.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 border border-light-subtle h-100 d-flex gap-2.5">
                        <div className="p-2 bg-primary-subtle text-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                          <i className="feather icon-dollar-sign fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.875rem' }}>Transparent Pricing</h6>
                          <p className="text-muted mb-0 small" style={{ fontSize: '0.775rem' }}>Affordable, cost-effective packages.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 border border-light-subtle h-100 d-flex gap-2.5">
                        <div className="p-2 bg-primary-subtle text-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                          <i className="feather icon-smile fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.875rem' }}>300,000+ Happy Patients</h6>
                          <p className="text-muted mb-0 small" style={{ fontSize: '0.775rem' }}>Backed by 30 years of clinical excellence in South India.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded-3 border border-light-subtle h-100 d-flex gap-2.5">
                        <div className="p-2 bg-primary-subtle text-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                          <i className="feather icon-shield fs-6"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.875rem' }}>Strict Privacy & Care</h6>
                          <p className="text-muted mb-0 small" style={{ fontSize: '0.775rem' }}>Private consultation suites.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <Link href="/contact" className="btn btn-primary rounded-pill px-4 py-2.5 shadow-sm fw-bold">
                      Book Consultation <i className="feather icon-arrow-right ms-1"></i>
                    </Link>
                    <div className="d-flex align-items-center gap-2 border-start ps-3">
                      <i className="feather icon-phone-call text-primary fs-4"></i>
                      <div>
                        <span className="d-block text-muted" style={{ fontSize: '0.75rem' }}>Direct Helpline</span>
                        <a href="tel:+918832421234" className="fw-bold text-secondary text-decoration-none" style={{ fontSize: '0.9rem' }}>+91 8832421234</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6">
                <div className="row g-3 align-items-center position-relative">
                  <div className="col-6">
                    <div className="position-relative rounded-4 overflow-hidden shadow-sm border border-light-subtle" style={{ height: 290 }}>
                      <img src="/images/about/why_choose_laser.png" className="w-100 h-100 object-fit-cover" alt="Laser Technology" />
                      <div className="position-absolute bottom-0 start-0 m-2.5 bg-white bg-opacity-90 px-2.5 py-1.5 rounded-3 shadow-sm">
                        <span className="small fw-bold text-primary" style={{ fontSize: '0.75rem' }}>USFDA Approved</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex flex-column gap-3">
                      {/* Rating Box */}
                      <div className="bg-white p-3 rounded-4 shadow-sm border border-light-subtle">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="fw-bold text-warning fs-5">★★★★★</span>
                          <span className="fw-bold text-secondary fs-6">4.9 / 5</span>
                        </div>
                        <span className="text-muted small d-block" style={{ fontSize: '0.775rem' }}>Based on 300,000+ Patient Reviews across South India</span>
                      </div>

                      <div className="position-relative rounded-4 overflow-hidden shadow-sm border border-light-subtle" style={{ height: 210 }}>
                        <img src="/images/about/why_choose_patient.png" className="w-100 h-100 object-fit-cover" alt="Patient Care" />
                        <div className="position-absolute bottom-0 start-0 m-2.5 bg-white bg-opacity-90 px-2.5 py-1.5 rounded-3 shadow-sm">
                          <span className="small fw-bold text-primary" style={{ fontSize: '0.75rem' }}>Personalized Care</span>
                        </div>
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
