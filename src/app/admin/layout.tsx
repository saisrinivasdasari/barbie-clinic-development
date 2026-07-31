// @ts-nocheck
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "feather icon-grid" },
    { label: "Appointments", href: "/admin/appointments", icon: "feather icon-calendar" },
    { label: "Doctor Schedules", href: "/admin/doctors", icon: "feather icon-user-check" },
    { label: "Treatments", href: "/admin/treatments", icon: "feather icon-layers" },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar Navigation */}
      <aside
        className={`bg-dark text-white p-3 d-flex flex-column transition-all ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
        style={{
          width: sidebarOpen ? "260px" : "80px",
          minWidth: sidebarOpen ? "260px" : "80px",
          transition: "all 0.25s ease-in-out",
          zIndex: 100,
        }}
      >
        {/* Brand Logo */}
        <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary">
          <Link href="/admin" className="d-flex align-items-center gap-2 text-decoration-none text-white overflow-hidden">
            <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-xs" style={{ width: 36, height: 36 }}>
              <i className="feather icon-activity fs-5"></i>
            </div>
            {sidebarOpen && (
              <div>
                <span className="fw-bold fs-6 text-white d-block" style={{ lineHeight: '1.2' }}>Barbie Clinic</span>
                <span className="badge bg-primary-subtle text-primary" style={{ fontSize: '0.65rem' }}>ADMIN PANEL</span>
              </div>
            )}
          </Link>
          <button
            className="btn btn-sm btn-outline-light border-0 rounded-circle p-1.5"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className={`feather ${sidebarOpen ? "icon-chevron-left" : "icon-chevron-right"}`}></i>
          </button>
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
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-3 border-top border-secondary mt-auto">
          <Link
            href="/"
            className="btn btn-outline-light btn-sm w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
          >
            <i className="feather icon-external-link"></i>
            {sidebarOpen && <span>View Main Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column min-w-0 overflow-x-hidden">
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
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
    </div>
  );
}
