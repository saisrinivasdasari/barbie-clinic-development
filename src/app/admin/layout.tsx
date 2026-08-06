// @ts-nocheck
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "feather icon-grid" },
    { label: "Appointments", href: "/admin/appointments", icon: "feather icon-calendar" },
    { label: "Doctor Schedules", href: "/admin/doctors", icon: "feather icon-user-check" },
    { label: "Treatments", href: "/admin/treatments", icon: "feather icon-layers" },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin-login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
      {/* Sidebar Navigation */}
      <aside
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{
          width: "260px",
          minWidth: "260px",
          height: "100vh",
          zIndex: 100,
        }}
      >
        {/* Brand Logo Header */}
        <div className="pb-3 mb-3 border-bottom border-secondary text-center">
          <Link href="/admin" className="text-decoration-none d-block overflow-hidden">
            <div className="d-flex flex-column align-items-center text-center">
              {/* Full Width White Logo Container */}
              <div className="bg-white p-3 rounded-4 shadow-sm w-100 d-flex align-items-center justify-content-center">
                <img
                  src="/barbie-logo.png"
                  alt="Barbie Skin & Laser Clinic"
                  style={{ height: "48px", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              {/* Admin Badge Below Logo */}
              <div className="mt-2.5">
                <span 
                  className="badge text-white px-3.5 py-1.5 rounded-pill fw-bold" 
                  style={{ 
                    fontSize: "0.72rem", 
                    letterSpacing: "1.2px", 
                    background: "linear-gradient(90deg, #FF69B4, #FF1493)",
                    boxShadow: "0 2px 8px rgba(255, 20, 147, 0.4)"
                  }}
                >
                  ADMIN PORTAL
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="nav flex-column gap-1.5 flex-grow-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link rounded-3 d-flex align-items-center gap-3 px-3 py-2.5 transition-all ${
                  isActive ? "bg-primary text-white fw-bold shadow-xs" : "text-white-50 hover-white"
                }`}
                style={{ fontSize: "0.9rem" }}
              >
                <i className={`${item.icon} fs-5`}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-3 border-top border-secondary mt-auto d-flex flex-column gap-2">
          <Link
            href="/"
            className="btn btn-outline-light btn-sm w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
          >
            <i className="feather icon-external-link"></i>
            <span>View Main Website</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-danger btn-sm w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 text-white border-0"
            style={{ backgroundColor: "#dc3545" }}
          >
            <i className="feather icon-log-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column min-w-0 vh-100 overflow-hidden">
        {/* Sleek Modern Admin Header Strip */}
        <header className="bg-white border-bottom border-light-subtle px-4 py-3 d-flex align-items-center justify-content-between shadow-xs" style={{ minHeight: "64px" }}>
          {/* Left: Location & Title */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2 bg-light px-3 py-1.5 rounded-pill border border-light-subtle">
              <span className="badge bg-primary text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: 18, height: 18 }}>
                <i className="feather icon-map-pin" style={{ fontSize: "0.65rem" }}></i>
              </span>
              <span className="fw-semibold text-secondary" style={{ fontSize: "0.825rem" }}>
                Barbie Dermatology Clinic
              </span>
              <span className="text-muted" style={{ fontSize: "0.775rem" }}>
                • Himayath Nagar HQ
              </span>
            </div>
          </div>

          {/* Right: Actions & User Profile */}
          <div className="d-flex align-items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="btn btn-sm btn-light border border-light-subtle text-secondary rounded-pill px-3 py-1.5 fw-medium d-flex align-items-center gap-1.5 shadow-xs"
              style={{ fontSize: "0.825rem" }}
            >
              <i className="feather icon-external-link text-primary"></i>
              <span>Main Website</span>
            </Link>

            <div className="d-flex align-items-center gap-2.5 bg-light px-3 py-1.5 rounded-pill border border-light-subtle">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-xs"
                style={{ width: 34, height: 34 }}
              >
                <i className="feather icon-user fs-6"></i>
              </div>
              <div className="d-none d-sm-block text-start">
                <span className="fw-bold text-secondary d-block" style={{ fontSize: "0.85rem", lineHeight: "1.1" }}>
                  Front Desk
                </span>
                <span className="text-muted d-block" style={{ fontSize: "0.725rem", lineHeight: "1.2" }}>
                  Clinic Reception
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 flex-grow-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
