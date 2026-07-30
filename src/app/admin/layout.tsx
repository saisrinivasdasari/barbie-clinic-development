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
        {/* Topbar Header */}
        <header className="bg-white border-bottom border-light-subtle px-4 py-3 d-flex align-items-center justify-content-between sticky-top shadow-xs">
          <div className="d-flex align-items-center gap-2">
            <h5 className="fw-bold text-secondary mb-0">Clinic Management Dashboard</h5>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link href="/book" className="btn btn-primary btn-sm rounded-pill px-3 shadow-xs">
              <i className="feather icon-plus me-1"></i>New Booking Wizard
            </Link>

            <div className="dropdown">
              <div className="d-flex align-items-center gap-2 cursor-pointer">
                <img
                  src="/Doctor-imgs/Dr. M.N. Rao.png"
                  alt="Admin Avatar"
                  className="rounded-circle border border-primary border-2 shadow-xs"
                  style={{ width: 38, height: 38, objectFit: 'cover', objectPosition: 'top' }}
                />
                <div className="d-none d-sm-block text-start">
                  <span className="fw-bold text-secondary d-block" style={{ fontSize: '0.825rem', lineHeight: '1.2' }}>
                    Dr. M.N. Rao
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.725rem' }}>Super Admin</span>
                </div>
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
