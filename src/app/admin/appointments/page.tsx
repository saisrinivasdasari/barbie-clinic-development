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

  // Active appointment for Detail Modal
  const [detailApt, setDetailApt] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

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
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-bold text-secondary mb-1">Appointment Management</h3>
          <p className="text-muted small mb-0">Search, filter, approve, cancel, and manage all patient bookings.</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" onClick={resetFilters}>
          <i className="feather icon-rotate-ccw me-1"></i>Reset Filters
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="card border-0 rounded-4 shadow-sm bg-white p-3.5 mb-4">
        <div className="row g-3">
          {/* Search Box */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">Search Patient / Phone</label>
            <div className="input-group">
              <span className="input-group-text bg-light border border-end-0 text-muted">
                <i className="feather icon-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border border-start-0 text-secondary"
                placeholder="Name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter by Doctor */}
          <div className="col-lg-2.5 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">Doctor</label>
            <select
              className="form-select bg-light text-secondary border"
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
          <div className="col-lg-2.5 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">Treatment</label>
            <select
              className="form-select bg-light text-secondary border"
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
          <div className="col-lg-2 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">Status</label>
            <select
              className="form-select bg-light text-secondary border"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Filter by Date */}
          <div className="col-lg-2 col-md-6">
            <label className="form-label small fw-bold text-secondary mb-1">Date</label>
            <input
              type="date"
              className="form-control bg-light text-secondary border"
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
                    <th className="ps-4">ID & Date</th>
                    <th>Patient Name</th>
                    <th>Phone</th>
                    <th>Treatment</th>
                    <th>Doctor</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id}>
                      <td className="ps-4">
                        <span className="font-monospace text-muted d-block small" style={{ fontSize: "0.725rem" }}>
                          {apt.id}
                        </span>
                        <strong className="text-secondary">{apt.appointmentDate}</strong>
                      </td>
                      <td>
                        <div className="fw-bold text-secondary">{apt.customerName}</div>
                        {apt.email && <span className="text-muted small" style={{ fontSize: "0.75rem" }}>{apt.email}</span>}
                      </td>
                      <td>
                        <a href={`tel:${apt.phone}`} className="text-primary text-decoration-none fw-medium">
                          {apt.phone}
                        </a>
                      </td>
                      <td>
                        <span className="badge bg-light text-secondary border">{apt.treatmentName}</span>
                      </td>
                      <td className="fw-medium text-secondary">{apt.doctorName}</td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary font-monospace">{apt.appointmentTime}</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            apt.status === "Accepted"
                              ? "bg-success"
                              : apt.status === "Pending"
                              ? "bg-warning text-dark"
                              : apt.status === "Completed"
                              ? "bg-info text-white"
                              : apt.status === "Rejected"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex align-items-center justify-content-end gap-1.5">
                          <button
                            className="btn btn-sm btn-outline-secondary rounded-circle p-1.5"
                            onClick={() => setDetailApt(apt)}
                            title="View Details"
                          >
                            <i className="feather icon-eye"></i>
                          </button>

                          {apt.status === "Pending" && (
                            <>
                              <button
                                className="btn btn-sm btn-success rounded-pill px-2.5 py-1"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Accepted")}
                                title="Accept Appointment"
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Rejected")}
                                title="Reject Appointment"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {apt.status === "Accepted" && (
                            <>
                              <button
                                className="btn btn-sm btn-info text-white rounded-pill px-2.5 py-1"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Completed")}
                              >
                                Mark Done
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1"
                                disabled={updatingId === apt.id}
                                onClick={() => handleUpdateStatus(apt.id, "Cancelled")}
                              >
                                Cancel
                              </button>
                            </>
                          )}
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
                      <span className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Status</span>
                      <span className="badge bg-warning text-dark">{detailApt.status}</span>
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
              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill"
                  onClick={() => setDetailApt(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
