"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useBooking } from "@/context/BookingContext";

export default function Footer() {
  const { openBooking } = useBooking();
  return (
    <footer
      className="site-footer style-1 footer-dark background-blend-luminosity"
      style={{ backgroundImage: "url(/images/background/bg1.webp)" }}
    >
      {/* Footer Head */}
      <div className="footer-head">
        <div className="container">
          <div className="fh-inner">
            <div className="row align-items-center">
              <div
                className="col-lg-4 col-md-5 text-center text-md-start wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                <div className="footer-logo logo-white d-flex align-items-center">
                  <Link href="/" className="text-decoration-none">
                    <img src="/barbie-logo.png" alt="Barbie Skin & Laser Clinic" className="bg-white px-3 py-2 rounded-3 shadow-sm" style={{ height: "68px", width: "auto", objectFit: "contain" }} />
                  </Link>
                </div>
              </div>
              <div
                className="col-lg-8 col-md-7 text-center text-md-end wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
              >
                <div className="m-b25">
                  <button
                    type="button"
                    onClick={() => openBooking()}
                    className="btn btn-lg btn-white text-primary btn-hover1 border-0"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Social Media Section */}
            <div
              className="col-xl-4 col-lg-5 col-sm-12 mb-4 wow fadeInUp"
              data-wow-delay="0.6s"
              data-wow-duration="0.8s"
            >
              <div className="widget widget_about me-xl-4 me-0">
                <h2 className="footer-title text-white fw-bold mb-3">Connect With Us</h2>
                <p className="text-light opacity-75 mb-4" style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                  Follow Barbie Skin & Laser Clinic for expert skin care guidance, patient transformations, and treatment updates.
                </p>
                <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                  <a
                    href="https://www.instagram.com/barbieskinandlaserclinic_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram-btn"
                    title="Instagram"
                  >
                    <FaInstagram size={22} />
                  </a>
                  <a
                    href="https://www.facebook.com/BarbieSkinAndLaserClinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn facebook-btn"
                    title="Facebook"
                  >
                    <FaFacebookF size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@BarbieSkinandLaserClinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn youtube-btn"
                    title="YouTube"
                  >
                    <FaYoutube size={22} />
                  </a>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div
              className="col-xl-8 col-lg-7 col-sm-12 wow fadeInUp"
              data-wow-delay="0.8s"
              data-wow-duration="0.8s"
            >
              <div className="row">
                {/* Treatments */}
                <div className="col-md-4 col-sm-4 col-6 mb-4">
                  <div className="widget widget_services">
                    <h2 className="footer-title">Treatments</h2>
                    <ul className="list-hover1">
                      <li>
                        <Link href="/services#servicesGrid">
                          <span>Vitiligo Laser Care</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services#servicesGrid">
                          <span>PRP for Hairfall</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services#servicesGrid">
                          <span>Anti-Acne & Pimples</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services#servicesGrid">
                          <span>Laser Hair Removal</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services#servicesGrid">
                          <span>Chemical Peeling</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Locations */}
                <div className="col-md-4 col-sm-4 col-6 mb-4">
                  <div className="widget widget_services">
                    <h2 className="footer-title">Locations</h2>
                    <ul className="list-hover1">
                      <li>
                        <Link href="/contact#branchesSection">
                          <span>Himayath Nagar (HQ)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact#branchesSection">
                          <span>KPHB & Koti (Hyd)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact#branchesSection">
                          <span>Vijayawada</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact#branchesSection">
                          <span>Vizag & Tirupati</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact#branchesSection">
                          <span>Rajahmundry</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="col-md-4 col-sm-4 col-6 mb-4">
                  <div className="widget widget_services">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul className="list-hover1">
                      <li>
                        <Link href="/">
                          <span>Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <span>About Us</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span>Our Services</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">
                          <span>Contact & Clinics</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Top End */}

      {/* Footer Middle */}
      <div className="footer-middle">
        <div className="container">
          <div className="fm-inner">
            <div className="row g-3 align-items-center">
              <div
                className="col-xl-3 col-md-12 col-sm-6 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.8s"
              >
                <h3 className="title">Get in Touch with us</h3>
                <p className="text">Available for consulting and appointments</p>
              </div>
              <div
                className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
              >
                <div className="icon-bx-wraper style-1">
                  <div className="icon-bx bg-primary">
                    <span className="icon-cell">
                      <i className="feather icon-phone"></i>
                    </span>
                  </div>
                  <div className="icon-content">
                    <h5 className="dz-title">Call Us</h5>
                    <p>
                      <a href="tel:+918832421234" className="text-body">
                        +91 8832421234
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
                data-wow-delay="0.6s"
                data-wow-duration="0.8s"
              >
                <div className="icon-bx-wraper style-1">
                  <div className="icon-bx bg-primary">
                    <span className="icon-cell">
                      <i className="feather icon-mail"></i>
                    </span>
                  </div>
                  <div className="icon-content">
                    <h5 className="dz-title">Send us a Mail</h5>
                    <p>
                      <a href="mailto:drmnrao1@yahoo.com" className="text-body">
                        drmnrao1@yahoo.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
                data-wow-delay="0.8s"
                data-wow-duration="0.8s"
              >
                <div className="icon-bx-wraper style-1">
                  <div className="icon-bx bg-primary">
                    <span className="icon-cell">
                      <i className="feather icon-clock"></i>
                    </span>
                  </div>
                  <div className="icon-content">
                    <h5 className="dz-title">Consulting Hours</h5>
                    <p>Mon - Sun: 10am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="fb-inner">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p className="copyright-text mb-0">
                  © <span className="current-year">{new Date().getFullYear()}</span>{" "}
                  <strong>Barbie Skin & Laser Clinic</strong>. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
