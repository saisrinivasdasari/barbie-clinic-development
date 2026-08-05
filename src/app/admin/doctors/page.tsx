// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { formatDateDDMMYYYY } from "@/lib/dateUtils";

export default function DoctorManagementPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("schedule"); // 'schedule' | 'availability' | 'appointments'

  // Schedule State
  const [workingDays, setWorkingDays] = useState([]);
  const [workingHoursStart, setWorkingHoursStart] = useState("10:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("20:00");
  const [lunchStart, setLunchStart] = useState("14:00");
  const [lunchEnd, setLunchEnd] = useState("15:00");
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Block Date / Slot State
  const [blockDate, setBlockDate] = useState(new Date().toISOString().split("T")[0]);
  const [blockTimeSlot, setBlockTimeSlot] = useState("10:00");
  const [blockReason, setBlockReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [slotDropdownOpen, setSlotDropdownOpen] = useState(false);

  const timeSlotsList = [
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

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async (selectDocId?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/doctors");
      const json = await res.json();
      if (json.success && json.data.length) {
        setDoctors(json.data);
        const target = selectDocId
          ? json.data.find((d) => d.id === selectDocId) || json.data[0]
          : json.data[0];
        handleSelectDoctor(target);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setWorkingDays(doc.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    setWorkingHoursStart(doc.workingHoursStart || "10:00");
    setWorkingHoursEnd(doc.workingHoursEnd || "20:00");
    setLunchStart(doc.lunchStart || "14:00");
    setLunchEnd(doc.lunchEnd || "15:00");
  };

  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  // Save Schedule
  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    setSavingSchedule(true);

    try {
      const res = await fetch("/api/admin/doctors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          workingDays,
          workingHoursStart,
          workingHoursEnd,
          lunchStart,
          lunchEnd,
        }),
      });

      if (res.ok) {
        alert(`Schedule updated for ${selectedDoctor.name}`);
        fetchDoctors(selectedDoctor.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingSchedule(false);
    }
  };

  // Block Date
  const handleBlockDate = async () => {
    if (!selectedDoctor || !blockDate) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "block_date",
          doctorId: selectedDoctor.id,
          date: blockDate,
          reason: blockReason || "Offline / Leave",
        }),
      });
      if (res.ok) {
        fetchDoctors(selectedDoctor.id);
        setBlockReason("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  // Block Slot
  const handleBlockSlot = async () => {
    if (!selectedDoctor || !blockDate || !blockTimeSlot) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "block_slot",
          doctorId: selectedDoctor.id,
          date: blockDate,
          timeSlot: blockTimeSlot,
          reason: blockReason || "Offline Booking",
        }),
      });
      if (res.ok) {
        fetchDoctors(selectedDoctor.id);
        setBlockReason("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  // Unblock
  const handleUnblock = async (type: string, id: string) => {
    try {
      const res = await fetch(`/api/admin/doctors?type=${type}&id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDoctors(selectedDoctor.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted small mt-2">Loading doctor schedules...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Title */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-bold text-secondary mb-1">Doctor Schedules & Offline Availability</h3>
          <p className="text-muted small mb-0">Configure working hours, block offline walk-in slots, and manage doctor availability.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Sidebar: Doctors List */}
        <div className="col-lg-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
            <div className="card-header bg-white border-bottom border-light-subtle px-4 py-3">
              <h5 className="fw-bold text-secondary mb-0 fs-6">Select Doctor</h5>
            </div>
            <div className="card-body p-2">
              <div className="d-flex flex-column gap-2">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-3 rounded-4 cursor-pointer transition-all border ${
                      selectedDoctor?.id === doc.id
                        ? "border-primary bg-primary-subtle shadow-xs"
                        : "border-light-subtle bg-white hover-lift"
                    }`}
                    onClick={() => handleSelectDoctor(doc)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={doc.photoUrl || "/Doctor-imgs/Dr. M.N. Rao.png"}
                        alt={doc.name}
                        className="rounded-circle object-fit-cover shadow-xs border border-2 border-white flex-shrink-0"
                        style={{ width: 52, height: 52, objectPosition: "top" }}
                      />
                      <div>
                        <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: "0.95rem" }}>
                          {doc.name}
                        </h6>
                        <span className="text-muted d-block small" style={{ fontSize: "0.75rem" }}>
                          {doc.title}
                        </span>
                        <span className="badge bg-white text-secondary border mt-1" style={{ fontSize: "0.7rem" }}>
                          {doc.experienceYears || 30}+ Yrs Experience
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Selected Doctor Schedule & Availability Management */}
        <div className="col-lg-8">
          {selectedDoctor && (
            <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
              {/* Doctor Header Banner */}
              <div className="card-header bg-white border-bottom border-light-subtle px-4 py-3.5 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={selectedDoctor.photoUrl || "/Doctor-imgs/Dr. M.N. Rao.png"}
                    alt={selectedDoctor.name}
                    className="rounded-circle object-fit-cover shadow-xs border border-primary border-2"
                    style={{ width: 44, height: 44, objectPosition: "top" }}
                  />
                  <div>
                    <h5 className="fw-bold text-secondary mb-0">{selectedDoctor.name}</h5>
                    <span className="text-muted small">{selectedDoctor.title}</span>
                  </div>
                </div>

                {/* Segmented Tab Control */}
                <div className="d-flex align-items-center bg-light p-1 rounded-3 border border-light-subtle">
                  <button
                    type="button"
                    className={`btn btn-sm rounded-2 px-3 py-1.5 fw-semibold transition-all ${
                      activeTab === "schedule"
                        ? "btn-primary shadow-xs text-white"
                        : "text-secondary text-decoration-none"
                    }`}
                    style={{ fontSize: "0.825rem" }}
                    onClick={() => setActiveTab("schedule")}
                  >
                    <i className="feather icon-clock me-1.5"></i>Working Schedule
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-2 px-3 py-1.5 fw-semibold transition-all ${
                      activeTab === "availability"
                        ? "btn-primary shadow-xs text-white"
                        : "text-secondary text-decoration-none"
                    }`}
                    style={{ fontSize: "0.825rem" }}
                    onClick={() => setActiveTab("availability")}
                  >
                    <i className="feather icon-slash me-1.5"></i>Block Offline Slots
                  </button>
                </div>
              </div>

              {/* Tab 1: Manage Working Schedule */}
              {activeTab === "schedule" && (
                <div className="card-body p-4">
                  <form onSubmit={handleSaveSchedule}>
                    {/* Working Days Checkboxes */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Configure Working Days
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => {
                          const isChecked = workingDays.includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-bold transition-all ${
                                isChecked ? "btn-primary shadow-xs" : "btn-outline-secondary bg-white"
                              }`}
                              onClick={() => toggleDay(day)}
                            >
                              {isChecked && <i className="feather icon-check me-1"></i>}
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Working Hours & Lunch Break */}
                    <div className="row g-3 mb-4">
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary mb-1">
                          Working Hours Start
                        </label>
                        <input
                          type="time"
                          className="form-control rounded-3 p-2.5 border-secondary-subtle"
                          value={workingHoursStart}
                          onChange={(e) => setWorkingHoursStart(e.target.value)}
                        />
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary mb-1">
                          Working Hours End
                        </label>
                        <input
                          type="time"
                          className="form-control rounded-3 p-2.5 border-secondary-subtle"
                          value={workingHoursEnd}
                          onChange={(e) => setWorkingHoursEnd(e.target.value)}
                        />
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary mb-1">Lunch Break Start</label>
                        <input
                          type="time"
                          className="form-control rounded-3 p-2.5 border-secondary-subtle"
                          value={lunchStart}
                          onChange={(e) => setLunchStart(e.target.value)}
                        />
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary mb-1">Lunch Break End</label>
                        <input
                          type="time"
                          className="form-control rounded-3 p-2.5 border-secondary-subtle"
                          value={lunchEnd}
                          onChange={(e) => setLunchEnd(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="pt-2 text-end">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4 fw-bold shadow-xs"
                        disabled={savingSchedule}
                      >
                        {savingSchedule ? "Saving Schedule..." : "Save Working Schedule"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 2: Manage Offline Availability / Blocked Slots */}
              {activeTab === "availability" && (
                <div className="card-body p-4">
                  <h6 className="fw-bold text-secondary mb-3">Block Offline / Walk-in Slots</h6>

                  <div className="p-3 bg-light rounded-4 border border-light-subtle mb-4">
                    <div className="row g-3 align-items-end">
                      <div className="col-sm-4">
                        <label className="form-label small fw-bold text-secondary mb-1">Select Date</label>
                        <input
                          type="date"
                          className="form-control rounded-3 p-2.5 border-secondary-subtle"
                          value={blockDate}
                          onChange={(e) => setBlockDate(e.target.value)}
                        />
                      </div>

                      <div className="col-sm-3 position-relative">
                        <label className="form-label small fw-bold text-secondary mb-1">Select 30-Min Slot</label>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn bg-white border border-light-subtle text-secondary w-100 rounded-3 p-2.5 text-start d-flex align-items-center justify-content-between fw-semibold shadow-xs"
                            onClick={() => setSlotDropdownOpen(!slotDropdownOpen)}
                          >
                            <span className="text-secondary">{timeSlotsList.find((s) => s.value === blockTimeSlot)?.label || blockTimeSlot}</span>
                            <i className="feather icon-chevron-down ms-1 text-muted"></i>
                          </button>

                          {slotDropdownOpen && (
                            <>
                              <div
                                className="position-fixed top-0 start-0 w-100 h-100"
                                style={{ zIndex: 1040 }}
                                onClick={() => setSlotDropdownOpen(false)}
                              />
                              <div
                                className="shadow-lg border border-light-subtle rounded-3 p-1 w-100 position-absolute bg-white"
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "scroll",
                                  WebkitOverflowScrolling: "touch",
                                  zIndex: 1050,
                                  top: "100%",
                                  left: 0,
                                  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                                }}
                              >
                                {timeSlotsList.map((s) => (
                                  <button
                                    key={s.value}
                                    type="button"
                                    className={`dropdown-item rounded-2 py-2 px-3 small fw-medium d-flex align-items-center justify-content-between ${
                                      blockTimeSlot === s.value ? "active bg-primary text-white" : "text-secondary"
                                    }`}
                                    onClick={() => {
                                      setBlockTimeSlot(s.value);
                                      setSlotDropdownOpen(false);
                                    }}
                                  >
                                    <span>{s.label}</span>
                                    {blockTimeSlot === s.value && <i className="feather icon-check"></i>}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-5">
                        <label className="form-label small fw-bold text-secondary mb-1">Reason (Optional)</label>
                        <input
                          type="text"
                          className="form-control rounded-3 p-2.5 border-secondary-subtle"
                          placeholder="e.g. Offline Walk-in"
                          value={blockReason}
                          onChange={(e) => setBlockReason(e.target.value)}
                        />
                      </div>

                      <div className="col-12 d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-warning text-dark rounded-pill px-3 py-2 small fw-bold"
                          disabled={actionLoading}
                          onClick={handleBlockSlot}
                        >
                          <i className="feather icon-clock me-1"></i>Block Selected Slot
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill px-3 py-2 small fw-bold"
                          disabled={actionLoading}
                          onClick={handleBlockDate}
                        >
                          <i className="feather icon-calendar me-1"></i>Block Entire Date
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of Current Blocked Dates & Slots */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 bg-white rounded-3 border border-light-subtle">
                        <h6 className="fw-bold text-secondary mb-2 small" style={{ fontSize: "0.85rem" }}>
                          Blocked Full Dates ({selectedDoctor.blockedDates?.length || 0})
                        </h6>
                        {selectedDoctor.blockedDates?.length === 0 ? (
                          <p className="text-muted small mb-0">No full dates blocked.</p>
                        ) : (
                          <div className="d-flex flex-column gap-2">
                            {selectedDoctor.blockedDates?.map((b) => (
                              <div key={b.id} className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3 border">
                                <span className="fw-bold text-secondary small">{formatDateDDMMYYYY(b.blockedDate)}</span>
                                <button
                                  className="btn btn-sm btn-light border rounded-circle p-0 hover-scale shadow-xs"
                                  onClick={() => handleUnblock("date", b.id)}
                                  style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                  title="Unblock Date"
                                >
                                  <i className="feather icon-trash-2 text-danger" style={{ fontSize: "0.775rem" }}></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-white rounded-3 border border-light-subtle">
                        <h6 className="fw-bold text-secondary mb-2 small" style={{ fontSize: "0.85rem" }}>
                          Blocked Offline Time Slots ({selectedDoctor.blockedSlots?.length || 0})
                        </h6>
                        {selectedDoctor.blockedSlots?.length === 0 ? (
                          <p className="text-muted small mb-0">No time slots blocked.</p>
                        ) : (
                          <div className="d-flex flex-column gap-2">
                            {selectedDoctor.blockedSlots?.map((b) => (
                              <div key={b.id} className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3 border">
                                <div>
                                  <span className="badge bg-primary-subtle text-primary font-monospace me-1">
                                    {b.timeSlot}
                                  </span>
                                  <span className="text-secondary small">{formatDateDDMMYYYY(b.blockedDate)}</span>
                                </div>
                                <button
                                  className="btn btn-sm btn-light border rounded-circle p-0 hover-scale shadow-xs"
                                  onClick={() => handleUnblock("slot", b.id)}
                                  style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                  title="Unblock Slot"
                                >
                                  <i className="feather icon-trash-2 text-danger" style={{ fontSize: "0.775rem" }}></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
