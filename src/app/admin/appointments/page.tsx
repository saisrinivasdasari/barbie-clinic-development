// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  // Metadata dropdowns
  const [doctorsList, setDoctorsList] = useState([]);
  const [treatmentsList, setTreatmentsList] = useState([]);

  // Active appointment for Detail Modal & Reschedule Modal
  const [detailApt, setDetailApt] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [showLegendPopup, setShowLegendPopup] = useState(false);

  // Reschedule Modal state
  const [rescheduleApt, setRescheduleApt] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleStatus, setRescheduleStatus] = useState("Accepted");
  const [rescheduleSaving, setRescheduleSaving] = useState(false);
  const [rescheduleSlotDropdownOpen, setRescheduleSlotDropdownOpen] = useState(false);

  const rescheduleTimeSlotsList = [
    { value: "10:00", label: "10:00 AM" },
    { value: "10:30", label: "10:30 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "01:00 PM" },
    { value: "13:30", label: "01:30 PM" },
    { value: "16:00", label: "04:00 PM" },
    { value: "16:30", label: "04:30 PM" },
    { value: "17:00", label: "05:00 PM" },
    { value: "17:30", label: "05:30 PM" },
    { value: "18:00", label: "06:00 PM" },
    { value: "18:30", label: "06:30 PM" },
    { value: "19:00", label: "07:00 PM" },
    { value: "19:30", label: "07:30 PM" },
  ];

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [search, selectedDoctor, selectedTreatment, selectedStatus, selectedDate]);

  const fetchMetadata = async () => {
    try {
      const docRes = await fetch("/api/admin/doctors");
      const docJson = await docRes.json();
      if (docJson.success) setDoctorsList(docJson.data);

      const trtRes = await fetch("/api/admin/treatments");
      const trtJson = await trtRes.json();
      if (trtJson.success) setTreatmentsList(trtJson.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (selectedDoctor !== "all") query.append("doctorId", selectedDoctor);
      if (selectedTreatment !== "all") query.append("treatmentId", selectedTreatment);
      if (selectedStatus !== "all") query.append("status", selectedStatus);
      if (selectedDate) query.append("date", selectedDate);

      const res = await fetch(`/api/admin/appointments?${query.toString()}`);
      const json = await res.json();
      if (json.success) {
        setAppointments(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appointmentId: string, newStatus: string) => {
    setUpdatingId(appointmentId);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status: newStatus }),
      });
      if (res.ok) {
        fetchAppointments();
        if (detailApt && detailApt.id === appointmentId) {
          setDetailApt({ ...detailApt, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this appointment record?")) {
      return;
    }
    setUpdatingId(appointmentId);
    try {
      const res = await fetch(`/api/admin/appointments?id=${appointmentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchAppointments();
        if (detailApt && detailApt.id === appointmentId) {
          setDetailApt(null);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const openRescheduleModal = (apt: any) => {
    setRescheduleApt(apt);
    setRescheduleDate(apt.appointmentDate || new Date().toISOString().split("T")[0]);
    setRescheduleTime(apt.appointmentTime || "10:00 AM");
    setRescheduleStatus("Accepted");
  };

  const handleConfirmReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleApt || !rescheduleDate || !rescheduleTime) return;

    setRescheduleSaving(true);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: rescheduleApt.id,
          appointmentDate: rescheduleDate,
          appointmentTime: rescheduleTime,
          status: rescheduleStatus,
        }),
      });

      if (res.ok) {
        fetchAppointments();

        // Open WhatsApp notification link to notify patient
        const cleanPhone = rescheduleApt.phone?.replace(/[^0-9]/g, "") || "";
        const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
        const msg = encodeURIComponent(
          `Hello ${rescheduleApt.customerName || "Patient"}, your appointment for ${rescheduleApt.treatmentName || "Consultation"} with ${rescheduleApt.doctorName || "Doctor"} at Barbie Dermatology Clinic has been rescheduled to ${rescheduleDate} at ${rescheduleTime}. Status: ${rescheduleStatus}. Thank you!`
        );
        const waUrl = `https://wa.me/${formattedPhone}?text=${msg}`;
        window.open(waUrl, "_blank");

        setRescheduleApt(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRescheduleSaving(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedDoctor("all");
    setSelectedTreatment("all");
    setSelectedStatus("all");
    setSelectedDate("");
  };

  return (
    <div className="container-fluid p-0">
      {/* Title */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-secondary mb-1 d-flex align-items-center gap-2">
            <span>Appointment Management</span>
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 fs-6 fw-semibold">
              {appointments.length} Bookings
            </span>
          </h3>
          <p className="text-muted small mb-0">Search, filter, approve, cancel, and manage all patient bookings.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-1.5 shadow-xs" onClick={resetFilters}>
            <i className="feather icon-rotate-ccw fs-6"></i>Reset Filters
          </button>
          <button className="btn btn-primary btn-sm rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-1.5 shadow-xs" onClick={fetchAppointments}>
            <i className="feather icon-refresh-cw fs-6"></i>Refresh
          </button>
        </div>
      </div>

      {/* Modern Sleek Search & Filter Control Bar */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-3 mb-4">
        <div className="row g-3 align-items-end">
          {/* Search Box */}
          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">
              <i className="feather icon-search me-1 text-primary"></i>Search Patient / Phone
            </label>
            <input
              type="text"
              className="form-control rounded-3 border-light-subtle bg-light text-secondary px-3 py-2 shadow-xs"
              style={{ fontSize: "0.85rem", height: "42px" }}
              placeholder="Name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter by Doctor */}
          <div className="col-xl-2.5 col-lg-4 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">
              <i className="feather icon-user me-1 text-primary"></i>Doctor
            </label>
            <select
              className="form-select rounded-3 border-light-subtle bg-light text-secondary px-3 py-2 shadow-xs"
              style={{ fontSize: "0.85rem", height: "42px" }}
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="all">All Doctors</option>
              {doctorsList.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Treatment */}
          <div className="col-xl-2.5 col-lg-4 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">
              <i className="feather icon-layers me-1 text-primary"></i>Treatment
            </label>
            <select
              className="form-select rounded-3 border-light-subtle bg-light text-secondary px-3 py-2 shadow-xs"
              style={{ fontSize: "0.85rem", height: "42px" }}
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
            >
              <option value="all">All Treatments</option>
              {treatmentsList.map((trt) => (
                <option key={trt.id} value={trt.id}>
                  {trt.title}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div className="col-xl-2 col-lg-6 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">
              <i className="feather icon-disc me-1 text-primary"></i>Status
            </label>
            <select
              className="form-select rounded-3 border-light-subtle bg-light text-secondary px-3 py-2 shadow-xs"
              style={{ fontSize: "0.85rem", height: "42px" }}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">🟡 Pending</option>
              <option value="Accepted">🟢 Accepted</option>
              <option value="Completed">🔵 Completed</option>
              <option value="Rejected">🔴 Rejected</option>
              <option value="Cancelled">⚪ Cancelled</option>
            </select>
          </div>

          {/* Filter by Date */}
          <div className="col-xl-2 col-lg-6 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">
              <i className="feather icon-calendar me-1 text-primary"></i>Date
            </label>
            <input
              type="date"
              className="form-control rounded-3 border-light-subtle bg-light text-secondary px-3 py-2 shadow-xs"
              style={{ fontSize: "0.85rem", height: "42px" }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointments Data Table */}
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="card-header bg-white border-bottom border-light-subtle px-4 py-3 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold text-secondary mb-0 fs-6">
            All Appointments ({appointments.length})
          </h5>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="text-muted small mt-2">Fetching appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-5">
              <i className="feather icon-calendar text-muted fs-1 mb-2 d-block"></i>
              <h6 className="fw-bold text-secondary">No Appointments Found</h6>
              <p className="text-muted small mb-0">No matching appointments found for the selected filter criteria.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
                <thead className="table-light text-muted">
                  <tr>
                    <th className="ps-4">Appointment Slot</th>
                    <th>Patient Details</th>
                    <th>Treatment & Doctor</th>
                    <th>Status</th>
                    <th className="text-end pe-4 position-relative">
                      <div 
                        className="d-inline-flex align-items-center gap-1 justify-content-end text-secondary" 
                        style={{ cursor: "pointer", userSelect: "none" }}
                        onClick={() => setShowLegendPopup(!showLegendPopup)}
                        onMouseEnter={() => setShowLegendPopup(true)}
                        onMouseLeave={() => setShowLegendPopup(false)}
                      >
                        <span>Actions</span>
                        <i className="feather icon-help-circle text-primary" style={{ fontSize: "0.85rem" }}></i>
                      </div>

                      {showLegendPopup && (
                        <div 
                          className="position-absolute bg-white border border-light-subtle rounded-4 p-3 shadow-lg text-start"
                          style={{
                            right: "1.5rem",
                            top: "2.5rem",
                            width: "240px",
                            zIndex: 1050,
                            lineHeight: "1.5"
                          }}
                        >
                          <h6 className="fw-bold text-secondary mb-2" style={{ fontSize: "0.8rem" }}>
                            Actions Legend
                          </h6>
                          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.75rem" }}>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-eye text-secondary" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">View Details</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-calendar text-primary" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">Reschedule Date & Time</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-check text-success" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">Accept Request</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-x text-danger" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">Reject / Cancel</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-check-square text-info" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">Mark Completed</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-refresh-cw text-warning" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">Re-open Request</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <span className="btn btn-sm btn-light border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 22, height: 22, pointerEvents: "none" }}>
                                <i className="feather icon-trash-2 text-danger" style={{ fontSize: "0.7rem" }}></i>
                              </span>
                              <span className="text-muted">Delete Record</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id}>
                      <td className="ps-4">
                        <div className="fw-bold text-secondary mb-1">{apt.appointmentDate}</div>
                        <div className="d-flex align-items-center gap-1.5 flex-wrap">
                          <span className="badge bg-primary-subtle text-primary font-monospace" style={{ fontSize: "0.725rem" }}>
                            <i className="feather icon-clock me-1"></i>{apt.appointmentTime}
                          </span>
                          <span className="font-monospace text-muted small d-none d-md-inline" style={{ fontSize: "0.675rem" }} title="Appointment ID">
                            ({apt.id})
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-secondary">{apt.customerName}</div>
                        <div className="d-flex flex-column gap-1 mt-1">
                          <a href={`tel:${apt.phone}`} className="text-primary text-decoration-none fw-semibold small d-flex align-items-center gap-1">
                            <i className="feather icon-phone" style={{ fontSize: "0.75rem" }}></i>
                            {apt.phone}
                          </a>
                          {apt.email && (
                            <span className="text-muted small d-flex align-items-center gap-1" style={{ fontSize: "0.725rem" }}>
                              <i className="feather icon-mail" style={{ fontSize: "0.75rem" }}></i>
                              {apt.email}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-secondary border text-wrap text-start d-block mb-1" style={{ maxWidth: "220px", lineHeight: "1.3" }}>
                          {apt.treatmentName}
                        </span>
                        <div className="text-muted small d-flex align-items-center gap-1.5" style={{ fontSize: "0.75rem" }}>
                          <i className="feather icon-user text-primary" style={{ fontSize: "0.75rem" }}></i>
                          <span>{apt.doctorName}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge px-3 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-1.5 ${
                          apt.status === "Accepted"
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : apt.status === "Pending"
                            ? "bg-warning-subtle text-dark border border-warning-subtle"
                            : apt.status === "Completed"
                            ? "bg-info-subtle text-info border border-info-subtle"
                            : apt.status === "Rejected"
                            ? "bg-danger-subtle text-danger border border-danger-subtle"
                            : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                        }`} style={{ fontSize: "0.75rem" }}>
                          <span className="rounded-circle d-inline-block" style={{
                            width: 6,
                            height: 6,
                            backgroundColor: apt.status === "Accepted" ? "#198754" : apt.status === "Pending" ? "#ffc107" : apt.status === "Completed" ? "#0dcaf0" : apt.status === "Rejected" ? "#dc3545" : "#6c757d"
                          }}></span>
                          {apt.status}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex align-items-center justify-content-end gap-1.5">
                          {/* View details */}
                          <button
                            className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                            onClick={() => setDetailApt(apt)}
                            title="View Details"
                            style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <i className="feather icon-eye text-secondary" style={{ fontSize: "0.825rem" }}></i>
                          </button>

                          {/* Reschedule */}
                          {(apt.status === "Pending" || apt.status === "Accepted") && (
                            <button
                              className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                              disabled={updatingId === apt.id}
                              onClick={() => openRescheduleModal(apt)}
                              title="Reschedule Date & Time"
                              style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="feather icon-calendar text-primary" style={{ fontSize: "0.825rem" }}></i>
                            </button>
                          )}

                          {/* Contextual actions */}
                          {apt.status === "Pending" && (
                            <>
                              {/* Accept */}
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Accepted")}
                                title="Accept Appointment"
                                style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-check text-success fw-bold" style={{ fontSize: "0.825rem" }}></i>
                              </button>
                              {/* Reject */}
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Rejected")}
                                title="Reject Appointment"
                                style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-x text-danger fw-bold" style={{ fontSize: "0.825rem" }}></i>
                              </button>
                            </>
                          )}

                          {apt.status === "Accepted" && (
                            <>
                              {/* Complete */}
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Completed")}
                                title="Complete Appointment"
                                style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-check-square text-info" style={{ fontSize: "0.825rem" }}></i>
                              </button>
                              {/* Cancel */}
                              <button
                                className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Cancelled")}
                                title="Cancel Appointment"
                                style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                              >
                                <i className="feather icon-x text-danger fw-bold" style={{ fontSize: "0.825rem" }}></i>
                              </button>
                            </>
                          )}

                          {(apt.status === "Cancelled" || apt.status === "Rejected") && (
                            <button
                              className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                              disabled={updatingId === apt.id}
                              onClick={() => handleUpdateStatus(apt.id, "Pending")}
                              title="Re-open Appointment"
                              style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            >
                              <i className="feather icon-refresh-cw text-warning" style={{ fontSize: "0.825rem" }}></i>
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            className="btn btn-sm btn-light border rounded-circle p-2 hover-scale shadow-xs"
                            disabled={updatingId === apt.id}
                            onClick={() => handleDeleteAppointment(apt.id)}
                            title="Delete Appointment"
                            style={{ width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <i className="feather icon-trash-2 text-danger" style={{ fontSize: "0.825rem" }}></i>
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

      {/* Appointment Details Modal */}
      {detailApt && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 px-4 pt-4 pb-2">
                <h5 className="modal-title fw-bold text-secondary">Appointment Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDetailApt(null)}
                ></button>
              </div>
              <div className="modal-body px-4 py-3">
                <div className="p-3 bg-light rounded-3 border border-light-subtle mb-3">
                  <div className="row g-2 small">
                    <div className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Booking ID</span>
                      <span className="badge bg-secondary font-monospace">{detailApt.id}</span>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Update Status</span>
                      <select
                        className="form-select form-select-sm fw-bold border text-secondary"
                        value={detailApt.status}
                        onChange={(e) => handleUpdateStatus(detailApt.id, e.target.value)}
                      >
                        <option value="Pending">🟡 Pending</option>
                        <option value="Accepted">🟢 Accepted</option>
                        <option value="Completed">🔵 Completed</option>
                        <option value="Rejected">🔴 Rejected</option>
                        <option value="Cancelled">⚪ Cancelled</option>
                      </select>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Customer Name</span>
                      <strong className="text-secondary">{detailApt.customerName}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Phone</span>
                      <a href={`tel:${detailApt.phone}`} className="fw-bold text-primary text-decoration-none">
                        {detailApt.phone}
                      </a>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Treatment</span>
                      <strong className="text-secondary">{detailApt.treatmentName}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Doctor</span>
                      <strong className="text-secondary">{detailApt.doctorName}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Date</span>
                      <strong className="text-primary">{detailApt.appointmentDate}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Time Slot</span>
                      <strong className="text-primary">{detailApt.appointmentTime}</strong>
                    </div>
                  </div>
                </div>

                {detailApt.notes && (
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary mb-1">Patient Notes / Symptoms</label>
                    <p className="p-2.5 bg-light rounded-3 border text-muted small mb-0">{detailApt.notes}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer border-0 px-4 pb-4 d-flex align-items-center justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-danger rounded-pill px-3"
                  onClick={() => handleDeleteAppointment(detailApt.id)}
                >
                  <i className="feather icon-trash-2 me-1"></i>Delete Appointment
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setDetailApt(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Appointment Modal */}
      {rescheduleApt && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 1065 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-primary text-white px-4 py-3">
                <h5 className="modal-title fw-bold fs-6 d-flex align-items-center gap-2 mb-0">
                  <i className="feather icon-calendar"></i>Reschedule Patient Appointment
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setRescheduleApt(null)}
                ></button>
              </div>
              <form onSubmit={handleConfirmReschedule}>
                <div className="modal-body p-4">
                  <div className="p-3 bg-light rounded-3 border border-light-subtle mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <strong className="text-secondary">{rescheduleApt.customerName}</strong>
                      <span className="badge bg-secondary font-monospace">{rescheduleApt.id}</span>
                    </div>
                    <p className="text-muted small mb-0">
                      {rescheduleApt.treatmentName} • <strong>{rescheduleApt.doctorName}</strong>
                    </p>
                    <div className="text-muted fs-8 mt-1">
                      Current Slot: <span className="text-danger fw-bold">{rescheduleApt.appointmentDate} at {rescheduleApt.appointmentTime}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary mb-1">New Appointment Date</label>
                    <input
                      type="date"
                      className="form-control rounded-3 border bg-white"
                      value={rescheduleDate}
                      required
                      onChange={(e) => setRescheduleDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 position-relative">
                    <label className="form-label small fw-bold text-secondary mb-1">New Available Time Slot</label>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn bg-white border border-light-subtle text-secondary w-100 rounded-3 p-2.5 text-start d-flex align-items-center justify-content-between fw-semibold shadow-xs"
                        onClick={() => setRescheduleSlotDropdownOpen(!rescheduleSlotDropdownOpen)}
                      >
                        <span className="text-secondary">
                          {rescheduleTimeSlotsList.find((s) => s.value === rescheduleTime)?.label || rescheduleTime}
                        </span>
                        <i className="feather icon-chevron-down ms-1 text-muted"></i>
                      </button>

                      {rescheduleSlotDropdownOpen && (
                        <>
                          <div
                            className="position-fixed top-0 start-0 w-100 h-100"
                            style={{ zIndex: 1040 }}
                            onClick={() => setRescheduleSlotDropdownOpen(false)}
                          />
                          <div
                            className="shadow-lg border border-light-subtle rounded-3 p-1 w-100 position-absolute bg-white"
                            style={{
                              maxHeight: "190px",
                              overflowY: "scroll",
                              WebkitOverflowScrolling: "touch",
                              zIndex: 1050,
                              top: "100%",
                              left: 0,
                              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                            }}
                          >
                            {rescheduleTimeSlotsList.map((s) => (
                              <button
                                key={s.value}
                                type="button"
                                className={`dropdown-item rounded-2 py-2 px-3 small fw-medium d-flex align-items-center justify-content-between ${
                                  rescheduleTime === s.value ? "active bg-primary text-white" : "text-secondary"
                                }`}
                                onClick={() => {
                                  setRescheduleTime(s.value);
                                  setRescheduleSlotDropdownOpen(false);
                                }}
                              >
                                <span>{s.label}</span>
                                {rescheduleTime === s.value && <i className="feather icon-check"></i>}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary mb-1">Status After Reschedule</label>
                    <select
                      className="form-select rounded-3 border bg-white"
                      value={rescheduleStatus}
                      onChange={(e) => setRescheduleStatus(e.target.value)}
                    >
                      <option value="Accepted">🟢 Accepted (Confirmed)</option>
                      <option value="Pending">🟡 Pending (Awaiting Patient Confirmation)</option>
                    </select>
                  </div>

                  <div className="p-2.5 bg-success-subtle border border-success-subtle rounded-3 text-success small d-flex align-items-center gap-2">
                    <i className="feather icon-message-circle fs-5"></i>
                    <span>Submitting will save changes and launch WhatsApp pre-filled with the new slot details to notify the patient.</span>
                  </div>
                </div>

                <div className="modal-footer border-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-3"
                    onClick={() => setRescheduleApt(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4"
                    disabled={rescheduleSaving}
                  >
                    {rescheduleSaving ? "Saving..." : "Confirm & Send WhatsApp"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
