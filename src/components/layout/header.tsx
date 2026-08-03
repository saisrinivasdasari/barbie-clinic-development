"use client";

import { useState } from "react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  return (
    <>
      <header className="site-header header header-transparent style-2 header-toggle">
        {/* Main Header */}
        <div className="sticky-header main-bar-wraper">
          <div className="main-bar clearfix">
            <div className="container-fluid clearfix inner-bar">
              <div className="extra-nav-left">
                <button
                  type="button"
                  className={`toggler1 ${isSidebarOpen ? "open" : ""}`}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  aria-label="Toggle Sidebar"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

              {/* Website Logo */}
              <div className="logo-header logo-dark d-flex align-items-center">
                <Link href="/" className="text-decoration-none">
                  <img src="/barbie-logo.png" alt="Barbie Skin & Laser Clinic" style={{ height: "65px", width: "auto", objectFit: "contain" }} />
                </Link>
              </div>

              {/* Nav Toggle Button */}
              <button
                className={`w3menu-toggler navicon ${isMobileMenuOpen ? "open" : ""}`}
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              {/* Main Nav */}
              <div
                className={`menu-close fade-overlay ${isMobileMenuOpen ? "show" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              <div className={`header-nav w3menu w3menu-center justify-content-center mo-left ${isMobileMenuOpen ? "show" : ""}`} id="W3Menu">
                <div className="logo-header logo-dark d-lg-none d-flex align-items-center m-b20">
                  <Link href="/" className="text-decoration-none" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/barbie-logo.png" alt="Barbie Skin & Laser Clinic" style={{ height: "54px", width: "auto", objectFit: "contain" }} />
                  </Link>
                </div>

                <ul className="nav navbar-nav">
                  <li>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}>
                      <span>Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <span>Contact Us</span>
                    </Link>
                  </li>
                  <li className="mt-3 px-3 d-lg-none">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openBooking();
                      }}
                      className="btn btn-primary w-100 rounded-pill py-2.5 fw-semibold text-white border-0"
                    >
                      Book Appointment
                    </button>
                  </li>
                </ul>

                <div className="dz-social-icon">
                  <ul>
                    <li>
                      <a href="https://www.instagram.com/barbieskinandlaserclinic_/" target="_blank" rel="noreferrer" title="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/BarbieSkinAndLaserClinic" target="_blank" rel="noreferrer" title="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@BarbieSkinandLaserClinic" target="_blank" rel="noreferrer" title="YouTube">
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* EXTRA NAV */}
              <div className="extra-nav">
                <div className="extra-cell">
                  <ul className="header-right">
                    <li className="nav-item item-call">
                      <div className="info-widget style-3">
                        <div className="widget-media">
                          <i className="feather icon-phone-call dz-ring-effect"></i>
                        </div>
                        <div className="widget-content">
                          <h6 className="title text-primary">Call HQ</h6>
                          <a href="tel:+918832421234" className="text-secondary">
                            +91 8832421234
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item item-btn">
                      <button
                        type="button"
                        onClick={() => openBooking()}
                        className="btn btn-primary btn-hover1 border-0"
                      >
                        Book Appointment
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Header End */}

        {/* Sidebar Backdrop & Offcanvas */}
        {isSidebarOpen && (
          <div
            className="offcanvas-backdrop fade show"
            onClick={() => setIsSidebarOpen(false)}
            style={{ zIndex: 1040 }}
          ></div>
        )}
        <div
          className={`offcanvas dz-offcanvas offcanvas-end ${isSidebarOpen ? "show" : ""}`}
          tabIndex={-1}
          id="headerSidebar"
          style={{ visibility: isSidebarOpen ? "visible" : "hidden", zIndex: 1050 }}
        >
          <button
            type="button"
            className="btn-close m-t10 m-l10"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close"
          ></button>
          <div className="offcanvas-body">
            <div className="widget">
              <div className="sidebar-header m-b20">
                <Link href="/" className="text-decoration-none" onClick={() => setIsSidebarOpen(false)}>
                  <img src="/barbie-logo.png" alt="Barbie Skin & Laser Clinic" style={{ height: "58px", width: "auto", objectFit: "contain" }} />
                </Link>
              </div>
              <p>
                Barbie Skin & Laser Clinic, backed by over 30 years of clinical experience, is a dedicated vitiligo treatment center, cosmetic and laser clinic. We are committed to revolutionizing care and accessibility to advanced skin and hair treatments.
              </p>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">Contact Us</h4>
              </div>
              <ul className="list-check">
                <li>No. 3-6-517, Saidatta Arcade, Himayath Nagar, Hyderabad</li>
                <li>
                  <a href="mailto:drmnrao1@yahoo.com" className="text-body">
                    drmnrao1@yahoo.com
                  </a>
                </li>
                <li>
                  <a href="tel:+918832421234" className="text-body">
                    +91 8832421234
                  </a>
                </li>
              </ul>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">Newsletter</h4>
              </div>
              <form
                className="dzSubscribe style-2"
                onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }}
              >
                <div className="dzSubscribeMsg"></div>
                <div className="form-group">
                  <div className="input-group mb-0">
                    <input
                      name="dzEmail"
                      required
                      type="email"
                      className="form-control"
                      placeholder="Your Email Address"
                    />
                    <div className="input-group-addon">
                      <button
                        name="submit"
                        value="Submit"
                        type="submit"
                        className="btn text-primary btn-transparent p-2"
                      >
                        <i className="fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="widget">
              <div className="widget-title">
                <h4 className="title">Follow Us</h4>
              </div>
              <div className="dz-social-icon style-1">
                <ul>
                  <li>
                    <a href="https://www.instagram.com/barbieskinandlaserclinic_/" target="_blank" rel="noreferrer" title="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/BarbieSkinAndLaserClinic" target="_blank" rel="noreferrer" title="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@BarbieSkinandLaserClinic" target="_blank" rel="noreferrer" title="YouTube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
      </header>
    </>
  );
}
