// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appointmentId: string, status: string) => {
    setActionLoading(appointmentId);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status }),
      });
      if (res.ok) {
        fetchDashboard();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted small mt-2">Loading Admin Dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const todaysList = data?.todaysList || [];
  const pendingList = data?.pendingList || [];

  return (
    <div className="container-fluid p-0">
      {/* Welcome Banner */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-bold text-secondary mb-1">Dashboard Overview</h3>
          <p className="text-muted small mb-0">Real-time overview of clinic appointments, doctors, and pending approval requests.</p>
        </div>
        <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={fetchDashboard}>
          <i className="feather icon-refresh-cw me-1"></i>Refresh Data
        </button>
      </div>

      {/* Summary Cards Grid */}
      <div className="row g-3 mb-4">
        <div className="col-xl-2.4 col-md-4 col-sm-6">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white h-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 bottom-0 bg-primary" style={{ width: 4 }}></div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted d-block small mb-1" style={{ fontSize: '0.75rem' }}>TODAY'S BOOKINGS</span>
                <h3 className="fw-bold text-secondary mb-0">{stats.todaysAppointments || 0}</h3>
              </div>
              <div className="rounded-circle bg-primary-subtle text-primary p-3">
                <i className="feather icon-calendar fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2.4 col-md-4 col-sm-6">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white h-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 bottom-0 bg-warning" style={{ width: 4 }}></div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted d-block small mb-1" style={{ fontSize: '0.75rem' }}>PENDING APPROVAL</span>
                <h3 className="fw-bold text-warning mb-0">{stats.pendingAppointments || 0}</h3>
              </div>
              <div className="rounded-circle bg-warning-subtle text-warning p-3">
                <i className="feather icon-clock fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2.4 col-md-4 col-sm-6">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white h-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 bottom-0 bg-success" style={{ width: 4 }}></div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted d-block small mb-1" style={{ fontSize: '0.75rem' }}>ACCEPTED BOOKINGS</span>
                <h3 className="fw-bold text-success mb-0">{stats.acceptedAppointments || 0}</h3>
              </div>
              <div className="rounded-circle bg-success-subtle text-success p-3">
                <i className="feather icon-check-circle fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2.4 col-md-4 col-sm-6">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white h-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 bottom-0 bg-info" style={{ width: 4 }}></div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted d-block small mb-1" style={{ fontSize: '0.75rem' }}>CLINICAL DOCTORS</span>
                <h3 className="fw-bold text-info mb-0">{stats.totalDoctors || 0}</h3>
              </div>
              <div className="rounded-circle bg-info-subtle text-info p-3">
                <i className="feather icon-user-check fs-4"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2.4 col-md-4 col-sm-6">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white h-100 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 bottom-0 bg-secondary" style={{ width: 4 }}></div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted d-block small mb-1" style={{ fontSize: '0.75rem' }}>TREATMENTS</span>
                <h3 className="fw-bold text-secondary mb-0">{stats.totalTreatments || 0}</h3>
              </div>
              <div className="rounded-circle bg-light text-secondary p-3">
                <i className="feather icon-layers fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Pending Requests & Today's Schedule */}
      <div className="row g-4">
        {/* Pending Booking Requests Requiring Approval */}
        <div className="col-lg-7">
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden h-100">
            <div className="card-header bg-white border-bottom border-light-subtle px-4 py-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <span 
                  className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center me-1"
                  style={{ width: "32px", height: "32px", flexShrink: 0 }}
                >
                  <i className="feather icon-clock"></i>
                </span>
                <h5 className="fw-bold text-secondary mb-0 fs-6">Pending Approval Requests ({pendingList.length})</h5>
              </div>
              <Link href="/admin/appointments?status=Pending" className="btn btn-link btn-sm text-primary p-0 fw-medium">
                View All Pending <i className="feather icon-arrow-right"></i>
              </Link>
            </div>

            <div className="card-body p-0">
              {pendingList.length === 0 ? (
                <div className="text-center py-5 px-3">
                  <i className="feather icon-check-circle text-success fs-1 mb-2 d-block"></i>
                  <h6 className="fw-bold text-secondary">All Caught Up!</h6>
                  <p className="text-muted small mb-0">No pending appointment requests awaiting approval right now.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                    <thead className="table-light text-muted">
                      <tr>
                        <th className="ps-4">Appointment Slot</th>
                        <th>Patient Details</th>
                        <th>Treatment & Doctor</th>
                        <th className="text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingList.slice(0, 6).map((apt) => (
                        <tr key={apt.id}>
                          <td className="ps-4">
                            <div className="fw-bold text-secondary mb-1">{apt.appointmentDate}</div>
                            <span className="badge bg-primary-subtle text-primary font-monospace" style={{ fontSize: '0.725rem' }}>
                              <i className="feather icon-clock me-1"></i>{apt.appointmentTime}
                            </span>
                          </td>
                          <td>
                            <div className="fw-bold text-secondary">{apt.customerName}</div>
                            <a href={`tel:${apt.phone}`} className="text-primary text-decoration-none fw-semibold small d-flex align-items-center gap-1 mt-1">
                              <i className="feather icon-phone" style={{ fontSize: "0.75rem" }}></i>
                              {apt.phone}
                            </a>
                          </td>
                          <td>
                            <span className="badge bg-light text-secondary border text-wrap text-start d-block mb-1" style={{ maxWidth: "180px", lineHeight: "1.3" }}>
                              {apt.treatmentName}
                            </span>
                            <div className="text-muted small d-flex align-items-center gap-1.5" style={{ fontSize: "0.75rem" }}>
                              <i className="feather icon-user text-primary" style={{ fontSize: "0.725rem" }}></i>
                              <span>{apt.doctorName}</span>
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <div className="d-flex align-items-center justify-content-end gap-1.5">
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                                disabled={actionLoading === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Accepted")}
                                title="Accept Appointment"
                                style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-check text-success fw-bold" style={{ fontSize: "0.825rem" }}></i>
                              </button>
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                                disabled={actionLoading === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Rejected")}
                                title="Reject Appointment"
                                style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-x text-danger fw-bold" style={{ fontSize: "0.825rem" }}></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today's Appointments List */}
        <div className="col-lg-5">
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden h-100">
            <div className="card-header bg-white border-bottom border-light-subtle px-4 py-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <span 
                  className="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center me-1"
                  style={{ width: "32px", height: "32px", flexShrink: 0 }}
                >
                  <i className="feather icon-calendar"></i>
                </span>
                <h5 className="fw-bold text-secondary mb-0 fs-6">Today's Schedule ({todaysList.length})</h5>
              </div>
              <Link href="/admin/appointments" className="btn btn-link btn-sm text-primary p-0 fw-medium">
                View Full List <i className="feather icon-arrow-right"></i>
              </Link>
            </div>

            <div className="card-body p-3">
              {todaysList.length === 0 ? (
                <div className="text-center py-5">
                  <i className="feather icon-calendar text-muted fs-1 mb-2 d-block"></i>
                  <h6 className="fw-bold text-secondary">No Appointments Scheduled Today</h6>
                  <p className="text-muted small mb-0">There are no patient consultations booked for today.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2.5">
                  {todaysList.map((apt) => (
                    <div 
                      key={apt.id} 
                      className="p-3 rounded-4 bg-white border hover-lift transition-all d-flex align-items-center justify-content-between shadow-xs"
                      style={{
                        borderLeft: `4px solid ${
                          apt.status === "Accepted" ? "#198754" : apt.status === "Pending" ? "#ffc107" : apt.status === "Completed" ? "#0dcaf0" : apt.status === "Rejected" ? "#dc3545" : "#6c757d"
                        }`
                      }}
                    >
                      <div className="flex-grow-1 min-w-0 me-3">
                        <div className="d-flex align-items-center gap-2 mb-1.5 flex-wrap">
                          <span className="badge bg-primary-subtle text-primary font-monospace px-2 py-1" style={{ fontSize: '0.725rem' }}>
                            <i className="feather icon-clock me-1"></i>{apt.appointmentTime}
                          </span>
                          <h6 className="fw-bold text-secondary mb-0 text-truncate" style={{ fontSize: '0.9rem' }} title={apt.customerName}>
                            {apt.customerName}
                          </h6>
                        </div>
                        <div className="text-muted small d-flex flex-column gap-0.5" style={{ fontSize: '0.75rem' }}>
                          <span className="text-truncate d-block">
                            <i className="feather icon-activity text-primary-subtle me-1.5"></i>{apt.treatmentName}
                          </span>
                          <span className="fw-medium text-secondary">
                            <i className="feather icon-user text-primary-subtle me-1.5"></i>{apt.doctorName}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex flex-column align-items-end gap-2 flex-shrink-0">
                        <span className={`badge px-2.5 py-1 rounded-pill fw-bold ${
                          apt.status === "Accepted"
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : apt.status === "Pending"
                            ? "bg-warning-subtle text-dark border border-warning-subtle"
                            : apt.status === "Completed"
                            ? "bg-info-subtle text-info border border-info-subtle"
                            : apt.status === "Rejected"
                            ? "bg-danger-subtle text-danger border border-danger-subtle"
                            : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                        }`} style={{ fontSize: "0.7rem" }}>
                          {apt.status}
                        </span>

                        <div className="d-flex align-items-center gap-1">
                          {apt.status === "Pending" && (
                            <>
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-1 hover-scale shadow-xs"
                                disabled={actionLoading === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Accepted")}
                                title="Accept Appointment"
                                style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-check text-success fw-bold" style={{ fontSize: "0.75rem" }}></i>
                              </button>
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-1 hover-scale shadow-xs"
                                disabled={actionLoading === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Rejected")}
                                title="Reject Appointment"
                                style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-x text-danger fw-bold" style={{ fontSize: "0.75rem" }}></i>
                              </button>
                            </>
                          )}

                          {apt.status === "Accepted" && (
                            <>
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-1 hover-scale shadow-xs"
                                disabled={actionLoading === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Completed")}
                                title="Complete Appointment"
                                style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-check-square text-info" style={{ fontSize: "0.75rem" }}></i>
                              </button>
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-1 hover-scale shadow-xs"
                                disabled={actionLoading === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Cancelled")}
                                title="Cancel Appointment"
                                style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-x text-danger fw-bold" style={{ fontSize: "0.75rem" }}></i>
                              </button>
                            </>
                          )}

                          {(apt.status === "Cancelled" || apt.status === "Rejected") && (
                            <button
                              className="btn btn-sm btn-light border rounded-circle p-1 hover-scale shadow-xs"
                              disabled={actionLoading === apt.id}
                              onClick={() => handleUpdateStatus(apt.id, "Pending")}
                              title="Re-open Appointment"
                              style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="feather icon-refresh-cw text-warning" style={{ fontSize: "0.75rem" }}></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
