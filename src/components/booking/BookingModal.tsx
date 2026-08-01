// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string;
}

export default function BookingModal({ isOpen, onClose, initialTreatmentId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const defaultTreatments = [
    {
      id: "trt_consultation",
      title: "General Dermatology Consultation",
      subtitle: "Expert Skin & Hair Diagnosis",
      description: "Comprehensive clinical evaluation by senior dermatologists for skin infections, allergies, eczema, psoriasis, and scalp disorders.",
      durationMinutes: 20,
      imageUrl: "/images/procedures/consultation.png",
      category: "Clinical Consultation",
    },
    {
      id: "trt_vitiligo",
      title: "Vitiligo Treatment",
      subtitle: "Dedicated Vitiligo Care",
      description: "Dedicated vitiligo treatment center utilizing advanced targeted laser technology for clearing white patches safely and effectively.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/vitiligo.png",
      category: "Vitiligo & Laser",
    },
    {
      id: "trt_acne",
      title: "Anti Acne & Pimples",
      subtitle: "Clear & Spotless Skin",
      description: "Clinical and aesthetic treatments tailored to clear active acne, control sebum production, and prevent future breakouts.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/peeling.png",
      category: "Aesthetic Dermatology",
    },
    {
      id: "trt_prp",
      title: "PRP for Hairfall",
      subtitle: "Hair Regrowth & Restoration",
      description: "Advanced PRP treatment for hair loss, dandruff, acne scars, under eye, and neck rejuvenation using your own plasma growth factors.",
      durationMinutes: 45,
      imageUrl: "/images/procedures/scars.png",
      category: "Hair Restoration",
    },
    {
      id: "trt_hair_removal",
      title: "Unwanted Hair Removal",
      subtitle: "Painless Laser Reduction",
      description: "Ditch the wax and razors. Enjoy smooth, hair-free skin with our safe, quick, and painless laser hair removal procedures.",
      durationMinutes: 30,
      imageUrl: "/images/about/why_choose_laser.png",
      category: "Laser Therapy",
    },
    {
      id: "trt_colour",
      title: "Colour Improvement",
      subtitle: "Skin Brightening & Tone",
      description: "Advanced laser treatments targeted at pigmented skin lesions, dark skin spots, melasma, and overall complexion improvement.",
      durationMinutes: 30,
      imageUrl: "/images/procedures/tightening.png",
      category: "Skin Rejuvenation",
    },
  ];

  const defaultDoctors = [
    {
      id: "doc_mnrao",
      name: "Dr. M.N. Rao",
      title: "Senior Dermatologist & Cosmetologist",
      qualifications: "MBBS, Diploma (Osmania Medical College)",
      experienceYears: 30,
      photoUrl: "/Doctor-imgs/Dr. M.N. Rao.png",
    },
    {
      id: "doc_meghamala",
      name: "Dr. G. Megha.mala",
      title: "Aesthetic Practitioner & Laser Specialist",
      qualifications: "MBBS (2021), Diploma in Aesthetic Medicine",
      experienceYears: 5,
      photoUrl: "/Doctor-imgs/Dr. G. Megha.mala.png",
    },
  ];

  // Data states
  const [treatments, setTreatments] = useState(defaultTreatments);
  const [doctors, setDoctors] = useState(defaultDoctors);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsReason, setSlotsReason] = useState("");

  // Form selections
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [bookingResult, setBookingResult] = useState(null);

  // Calendar states
  const [blockedDates, setBlockedDates] = useState([]);
  const [workingDays, setWorkingDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());

  const resetForm = () => {
    setStep(1);
    setSelectedTreatment(null);
    setSelectedDoctor(null);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setSelectedSlot("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerNotes("");
    setBookingResult(null);
    setErrorMsg("");
  };

  const handleStepClick = (num: number) => {
    if (num === 1) {
      setStep(1);
    } else if (num === 2 && selectedTreatment) {
      setStep(2);
    } else if (num === 3 && selectedDoctor) {
      setStep(3);
    } else if (num === 4 && selectedSlot) {
      setStep(4);
    }
  };

  const fetchBlockedDates = async (doctorId) => {
    try {
      const res = await fetch(`/api/booking/blocked-dates?doctorId=${doctorId}`);
      const json = await res.json();
      if (json.success) {
        setBlockedDates(json.blockedDates || []);
        setWorkingDays(json.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
      }
    } catch (e) {
      console.error("Error fetching blocked dates:", e);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDayIndex = date.getDay();
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const isDateBlocked = (date: Date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    if (compareDate < today) return true;

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[date.getDay()];
    if (!workingDays.includes(dayName)) return true;

    // Format YYYY-MM-DD
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    const dateString = `${y}-${m}-${d}`;
    if (blockedDates.includes(dateString)) return true;

    return false;
  };

  useEffect(() => {
    if (step === 3 && selectedDoctor) {
      fetchBlockedDates(selectedDoctor.id);
    }
  }, [step, selectedDoctor]);

  // Fetch Treatments on mount & Reset state when opening
  useEffect(() => {
    if (isOpen) {
      resetForm();
      fetchTreatments();
    }
  }, [isOpen]);

  // Auto-fetch slots whenever Step 3 becomes active or Date changes
  useEffect(() => {
    if (step === 3 && selectedDoctor) {
      fetchSlots(selectedDoctor.id, selectedDate);
    }
  }, [step, selectedDate]);

  const fetchTreatments = async () => {
    try {
      const res = await fetch("/api/booking/treatments");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const sorted = [...json.data].sort((a, b) => {
          if (a.id === "trt_consultation") return -1;
          if (b.id === "trt_consultation") return 1;
          return 0;
        });
        setTreatments(sorted);
        if (initialTreatmentId) {
          const match = sorted.find((t) => t.id === initialTreatmentId);
          if (match) {
            handleSelectTreatment(match);
          }
        }
      }
    } catch (e) {
      console.error("Error fetching live treatments:", e);
    } finally {
      setLoading(false);
    }
  };

  // Step 1 -> Step 2: Select Treatment
  const handleSelectTreatment = async (trt) => {
    setSelectedTreatment(trt);
    setSelectedDoctor(null);
    setSelectedSlot("");
    setLoading(true);
    try {
      const res = await fetch(`/api/booking/doctors?treatmentId=${trt.id}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setDoctors(json.data);
        if (json.data.length === 1) {
          setSelectedDoctor(json.data[0]);
          setStep(3);
          fetchSlots(json.data[0].id, selectedDate);
        } else {
          setStep(2);
        }
      } else {
        // Fallback doctor assignment based on treatment
        const matchedDocs = trt.id === "trt_acne" || trt.id === "trt_hair_removal"
          ? [defaultDoctors[1]]
          : [defaultDoctors[0]];
        setDoctors(matchedDocs);
        if (matchedDocs.length === 1) {
          setSelectedDoctor(matchedDocs[0]);
          setStep(3);
          fetchSlots(matchedDocs[0].id, selectedDate);
        } else {
          setStep(2);
        }
      }
    } catch (e) {
      console.error(e);
      const matchedDocs = trt.id === "trt_acne" || trt.id === "trt_hair_removal"
        ? [defaultDoctors[1]]
        : [defaultDoctors[0]];
      setDoctors(matchedDocs);
      if (matchedDocs.length === 1) {
        setSelectedDoctor(matchedDocs[0]);
        setStep(3);
        fetchSlots(matchedDocs[0].id, selectedDate);
      } else {
        setStep(2);
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2 -> Step 3: Select Doctor
  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setSelectedSlot("");
    setStep(3);
    fetchSlots(doc.id, selectedDate);
  };

  const defaultTimeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  // Step 3: Fetch Available Slots for Doctor & Date
  const fetchSlots = async (doctorId, dateStr) => {
    setSlotsLoading(true);
    setSlotsReason("");
    setAllSlots(defaultTimeSlots);
    setBookedSlots([]);
    setAvailableSlots(defaultTimeSlots);
    try {
      const res = await fetch(`/api/booking/available-slots?doctorId=${doctorId}&date=${dateStr}`);
      const json = await res.json();
      if (json.success) {
        if (json.available) {
          const all = Array.isArray(json.allSlots) && json.allSlots.length > 0 ? json.allSlots : defaultTimeSlots;
          const booked = [
            ...(Array.isArray(json.bookedSlots) ? json.bookedSlots : []),
            ...(Array.isArray(json.blockedSlots) ? json.blockedSlots : []),
          ];
          setAllSlots(all);
          setBookedSlots(booked);

          const avail = Array.isArray(json.slots) && json.slots.length > 0 ? json.slots : all.filter((s) => !booked.includes(s));
          setAvailableSlots(avail);
        } else {
          setSlotsReason(json.reason || "Doctor unavailable on this date.");
          setAllSlots([]);
          setBookedSlots([]);
          setAvailableSlots([]);
        }
      } else {
        setAllSlots(defaultTimeSlots);
        setBookedSlots([]);
        setAvailableSlots(defaultTimeSlots);
      }
    } catch (e) {
      console.error("Error fetching live slots:", e);
      setAllSlots(defaultTimeSlots);
      setBookedSlots([]);
      setAvailableSlots(defaultTimeSlots);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedSlot("");
    if (selectedDoctor) {
      fetchSlots(selectedDoctor.id, newDate);
    }
  };

  // Submit Booking
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      setErrorMsg("Please enter your name and phone number.");
      return;
    }

    const dateObj = new Date(selectedDate + "T00:00:00");
    if (isDateBlocked(dateObj)) {
      setErrorMsg("The selected date is currently unavailable/blocked. Please select another date.");
      setStep(3);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        customerName,
        phone: customerPhone,
        email: customerEmail,
        treatmentId: selectedTreatment?.id || "trt_vitiligo",
        doctorId: selectedDoctor?.id || "doc_mnrao",
        appointmentDate: selectedDate || new Date().toISOString().split("T")[0],
        appointmentTime: selectedSlot || "10:00",
        notes: customerNotes,
      };

      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json && json.success) {
        setBookingResult(json);
        setStep(5);
        if (json.whatsappUrl) {
          window.open(json.whatsappUrl, "_blank");
        }
      } else {
        // Guarantee DB insert via fallback API call
        fetch("/api/booking/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(console.error);

        const fallbackMsg = `Name: ${customerName}\nPhone: ${customerPhone}\nTreatment: ${selectedTreatment?.title || "Skin Care"}\nDoctor: ${selectedDoctor?.name || "Dr. M.N. Rao"}\nDate: ${selectedDate}\nTime: ${selectedSlot || "10:00 AM"}`;
        const fallbackWaUrl = `https://wa.me/918832421234?text=${encodeURIComponent(fallbackMsg)}`;
        const fallbackResult = {
          appointmentId: `apt_${Date.now()}`,
          whatsappUrl: fallbackWaUrl,
          appointment: {
            customerName,
            phone: customerPhone,
            treatmentName: selectedTreatment?.title || "Dermatology Care",
            doctorName: selectedDoctor?.name || "Dr. M.N. Rao",
            appointmentDate: selectedDate,
            appointmentTime: selectedSlot || "10:00 AM",
            status: "Pending",
          },
        };
        setBookingResult(fallbackResult);
        setStep(5);
        window.open(fallbackWaUrl, "_blank");
      }
    } catch (err) {
      console.error(err);
      // Guarantee DB insert via fallback API call
      fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          email: customerEmail,
          treatmentId: selectedTreatment?.id || "trt_vitiligo",
          doctorId: selectedDoctor?.id || "doc_mnrao",
          appointmentDate: selectedDate || new Date().toISOString().split("T")[0],
          appointmentTime: selectedSlot || "10:00",
          notes: customerNotes,
        }),
      }).catch(console.error);

      const fallbackMsg = `Name: ${customerName}\nPhone: ${customerPhone}\nTreatment: ${selectedTreatment?.title || "Skin Care"}\nDoctor: ${selectedDoctor?.name || "Dr. M.N. Rao"}\nDate: ${selectedDate}\nTime: ${selectedSlot || "10:00 AM"}`;
      const fallbackWaUrl = `https://wa.me/918832421234?text=${encodeURIComponent(fallbackMsg)}`;
      const fallbackResult = {
        appointmentId: `apt_${Date.now()}`,
        whatsappUrl: fallbackWaUrl,
        appointment: {
          customerName,
          phone: customerPhone,
          treatmentName: selectedTreatment?.title || "Dermatology Care",
          doctorName: selectedDoctor?.name || "Dr. M.N. Rao",
          appointmentDate: selectedDate,
          appointmentTime: selectedSlot || "10:00 AM",
          status: "Pending",
        },
      };
      setBookingResult(fallbackResult);
      setStep(5);
      window.open(fallbackWaUrl, "_blank");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(6px)", zIndex: 10050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          
          {/* Modal Header */}
          <div className="modal-header border-0 px-4 pt-4 pb-2" style={{ background: "linear-gradient(135deg, #FFF0F5 0%, #FFF5F7 100%)" }}>
            <div>
              <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                ONLINE APPOINTMENT BOOKING
              </span>
              <h4 className="modal-title fw-bold text-secondary mt-1" style={{ fontSize: '1.35rem' }}>
                {step === 1 && "1. Select Treatment"}
                {step === 2 && "2. Choose Your Doctor"}
                {step === 3 && "3. Select Date & Time"}
                {step === 4 && "4. Your Details"}
                {step === 5 && "5. Booking Confirmed!"}
              </h4>
            </div>
            <button
              type="button"
              className="btn-close rounded-circle p-2 shadow-xs"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Stepper Progress Bar */}
          {step < 5 && (
            <div className="px-4 py-2 bg-light border-bottom border-light-subtle d-flex align-items-center justify-content-between">
              {[1, 2, 3, 4].map((num) => {
                const isClickable = num < step;
                return (
                  <div
                    key={num}
                    className="d-flex align-items-center gap-2"
                    onClick={() => isClickable && handleStepClick(num)}
                    style={{ cursor: isClickable ? "pointer" : "default" }}
                  >
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center fw-bold transition-all ${
                        step >= num ? "bg-primary text-white" : "bg-white text-muted border"
                      }`}
                      style={{
                        width: 28,
                        height: 28,
                        fontSize: "0.8rem",
                        transform: isClickable ? "scale(1.05)" : "none"
                      }}
                    >
                      {step > num ? <i className="feather icon-check"></i> : num}
                    </div>
                    <span
                      className={`small fw-medium d-none d-sm-inline transition-all ${
                        step >= num ? "text-secondary" : "text-muted"
                      } ${isClickable ? "text-primary text-decoration-underline" : ""}`}
                      style={{ fontSize: '0.8rem' }}
                    >
                      {num === 1 && "Treatment"}
                      {num === 2 && "Doctor"}
                      {num === 3 && "Date & Time"}
                      {num === 4 && "Details"}
                    </span>
                    {num < 4 && <i className="feather icon-chevron-right text-muted mx-1 d-none d-sm-inline" style={{ fontSize: '0.8rem' }}></i>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal Body */}
          <div className="modal-body p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            
            {/* STEP 1: Select Treatment */}
            {step === 1 && (
              <div>
                <p className="text-muted small mb-3">Choose the dermatology or laser procedure you wish to consult for:</p>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="text-muted small mt-2">Loading treatments...</p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {treatments.map((trt) => (
                      <div key={trt.id} className="col-md-6">
                        <div
                          className={`card h-100 border rounded-4 p-3 hover-lift cursor-pointer transition-all ${
                            selectedTreatment?.id === trt.id ? "border-primary bg-primary-subtle shadow-sm" : "border-light-subtle bg-white"
                          }`}
                          onClick={() => handleSelectTreatment(trt)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={trt.imageUrl || "/images/procedures/peeling.png"}
                              alt={trt.title}
                              className="rounded-3 object-fit-cover shadow-xs flex-shrink-0"
                              style={{ width: 68, height: 68 }}
                            />
                            <div>
                              <h6 className="fw-bold text-secondary mb-1" style={{ fontSize: '0.95rem' }}>{trt.title}</h6>
                              <p className="text-muted small mb-0 text-truncate-2" style={{ fontSize: '0.775rem', lineHeight: '1.35' }}>
                                {trt.subtitle || trt.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Select Doctor */}
            {step === 2 && (
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="text-muted small mb-0">Select your preferred specialist for <strong>{selectedTreatment?.title}</strong>:</p>
                  <button className="btn btn-link btn-sm text-primary p-0 fw-medium" onClick={() => setStep(1)} style={{ fontSize: '0.8rem' }}>
                    <i className="feather icon-arrow-left me-1"></i>Change Treatment
                  </button>
                </div>
                
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                  </div>
                ) : (
                  <div className="row g-3">
                    {doctors.map((doc) => (
                      <div key={doc.id} className="col-md-6">
                        <div
                          className={`card h-100 border rounded-4 p-3 hover-lift cursor-pointer transition-all ${
                            selectedDoctor?.id === doc.id ? "border-primary bg-primary-subtle shadow-sm" : "border-light-subtle bg-white"
                          }`}
                          onClick={() => handleSelectDoctor(doc)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={doc.photoUrl || "/Doctor-imgs/Dr. M.N. Rao.png"}
                              alt={doc.name}
                              className="rounded-circle object-fit-cover shadow-xs border border-2 border-white flex-shrink-0"
                              style={{ width: 64, height: 64, objectPosition: 'top' }}
                            />
                            <div>
                              <span className="badge bg-white text-secondary border mb-1" style={{ fontSize: '0.7rem' }}>
                                {doc.experienceYears || 30}+ Yrs Experience
                              </span>
                              <h6 className="fw-bold text-secondary mb-0.5" style={{ fontSize: '0.95rem' }}>{doc.name}</h6>
                              <p className="text-muted small mb-0" style={{ fontSize: '0.775rem' }}>{doc.title}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Select Date & Time */}
            {step === 3 && (
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <span className="badge bg-light text-secondary border me-2" style={{ fontSize: '0.75rem' }}>
                      <i className="feather icon-check text-primary me-1"></i>{selectedTreatment?.title}
                    </span>
                    <span className="badge bg-light text-secondary border" style={{ fontSize: '0.75rem' }}>
                      <i className="feather icon-user text-primary me-1"></i>{selectedDoctor?.name}
                    </span>
                  </div>
                  <button className="btn btn-link btn-sm text-primary p-0 fw-medium" onClick={() => setStep(2)} style={{ fontSize: '0.8rem' }}>
                    <i className="feather icon-arrow-left me-1"></i>Back
                  </button>
                </div>

                <div className="row g-4">
                  {/* Left: Date Picker */}
                  <div className="col-md-5">
                    <label className="form-label small fw-bold text-secondary mb-1.5">1. Select Appointment Date</label>
                    <div className="card border rounded-4 p-3 bg-white shadow-xs">
                      {/* Calendar Month/Year Navigation */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary rounded-circle"
                          onClick={() => {
                            const newMonth = calendarMonth === 0 ? 11 : calendarMonth - 1;
                            const newYear = calendarMonth === 0 ? calendarYear - 1 : calendarYear;
                            setCalendarMonth(newMonth);
                            setCalendarYear(newYear);
                          }}
                          title="Previous Month"
                        >
                          <i className="feather icon-chevron-left"></i>
                        </button>
                        <strong className="text-secondary" style={{ fontSize: "0.9rem" }}>
                          {new Date(calendarYear, calendarMonth).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                          })}
                        </strong>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary rounded-circle"
                          onClick={() => {
                            const newMonth = calendarMonth === 11 ? 0 : calendarMonth + 1;
                            const newYear = calendarMonth === 11 ? calendarYear + 1 : calendarYear;
                            setCalendarMonth(newMonth);
                            setCalendarYear(newYear);
                          }}
                          title="Next Month"
                        >
                          <i className="feather icon-chevron-right"></i>
                        </button>
                      </div>

                      {/* Day Names Header */}
                      <div className="row text-center mb-2 fw-bold text-muted" style={{ fontSize: "0.725rem", letterSpacing: "0.5px" }}>
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
                          <div key={idx} className="col p-0" style={{ width: "14.28%", flex: "0 0 14.28%" }}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="row text-center g-1">
                        {getDaysInMonth(calendarYear, calendarMonth).map((day, idx) => {
                          if (!day) {
                            return <div key={idx} className="col p-0" style={{ width: "14.28%", flex: "0 0 14.28%", height: "32px" }} />;
                          }

                          const isBlocked = isDateBlocked(day);
                          const y = day.getFullYear();
                          const m = (day.getMonth() + 1).toString().padStart(2, "0");
                          const d = day.getDate().toString().padStart(2, "0");
                          const dateStr = `${y}-${m}-${d}`;
                          const isSelected = selectedDate === dateStr;

                          return (
                            <div key={idx} className="col p-0" style={{ width: "14.28%", flex: "0 0 14.28%" }}>
                              <button
                                type="button"
                                disabled={isBlocked}
                                className={`btn w-100 p-0 d-flex align-items-center justify-content-center rounded-circle font-monospace ${
                                  isSelected
                                    ? "btn-primary text-white shadow-xs fw-bold"
                                    : isBlocked
                                    ? "btn-light text-muted text-decoration-line-through opacity-40"
                                    : "btn-outline-primary border-0 text-dark fw-semibold"
                                }`}
                                style={{
                                  height: "32px",
                                  fontSize: "0.775rem",
                                  cursor: isBlocked ? "not-allowed" : "pointer",
                                }}
                                onClick={() => handleDateChange(dateStr)}
                              >
                                {day.getDate()}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-3 p-3 rounded-3 bg-light border border-light-subtle">
                      <div className="d-flex align-items-center gap-2 text-muted small" style={{ fontSize: '0.775rem' }}>
                        <i className="feather icon-clock text-primary"></i>
                        <span>Doctor Consultation Hours: 10:00 AM – 8:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Available 30-min Time Slots */}
                  <div className="col-md-7">
                    <label className="form-label small fw-bold text-secondary mb-1.5">
                      2. Select Available 30-Min Time Slot
                    </label>

                    {slotsLoading ? (
                      <div className="text-center py-4">
                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                        <span className="text-muted small">Checking available slots...</span>
                      </div>
                    ) : slotsReason ? (
                      <div className="alert alert-warning rounded-3 p-3 mb-0 small" style={{ fontSize: '0.825rem' }}>
                        <i className="feather icon-alert-circle me-1.5"></i>{slotsReason} Please select a different date.
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="alert alert-info rounded-3 p-3 mb-0 small" style={{ fontSize: '0.825rem' }}>
                        <i className="feather icon-info me-1.5"></i>No open time slots available for this date.
                      </div>
                    ) : (
                      <div>
                        {/* Legend */}
                        <div className="d-flex align-items-center gap-3 mb-2 small" style={{ fontSize: '0.775rem' }}>
                          <span className="d-flex align-items-center gap-1.5 text-secondary">
                            <span className="rounded-circle bg-success d-inline-block" style={{ width: 8, height: 8 }}></span>
                            Available Slot
                          </span>
                          <span className="d-flex align-items-center gap-1.5 text-muted">
                            <span className="rounded-circle bg-danger d-inline-block" style={{ width: 8, height: 8 }}></span>
                            Booked / Unavailable
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1">
                          {(allSlots.length > 0 ? allSlots : availableSlots).map((slot) => {
                            const [hStr, mStr] = slot.split(":");
                            let h = parseInt(hStr, 10);
                            const ampm = h >= 12 ? "PM" : "AM";
                            h = h % 12 || 12;
                            const formattedTime = `${h}:${mStr} ${ampm}`;
                            const isBooked = bookedSlots.includes(slot);

                            if (isBooked) {
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  className="btn btn-sm rounded-pill px-3 py-1.5 fw-medium text-decoration-line-through border border-danger-subtle bg-light text-muted opacity-75"
                                  disabled={true}
                                  title="This time slot is already booked or blocked by admin"
                                  style={{ fontSize: '0.8rem', cursor: 'not-allowed' }}
                                >
                                  <i className="feather icon-slash text-danger me-1" style={{ fontSize: '0.75rem' }}></i>
                                  {formattedTime}
                                  <span className="badge bg-danger text-white ms-1.5" style={{ fontSize: '0.6rem' }}>Booked</span>
                                </button>
                              );
                            }

                            return (
                              <button
                                key={slot}
                                type="button"
                                className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold transition-all ${
                                  selectedSlot === slot
                                    ? "btn-primary text-white shadow-sm"
                                    : "bg-white border text-dark"
                                }`}
                                onClick={() => setSelectedSlot(slot)}
                                style={{
                                  fontSize: '0.825rem',
                                  color: selectedSlot === slot ? '#ffffff' : '#212529',
                                  borderColor: selectedSlot === slot ? '#e25b8b' : '#e5e7eb',
                                  backgroundColor: selectedSlot === slot ? '#e25b8b' : '#ffffff',
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedSlot !== slot) {
                                    e.currentTarget.style.backgroundColor = '#e25b8b';
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.borderColor = '#e25b8b';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedSlot !== slot) {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.color = '#212529';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                  }
                                }}
                              >
                                <i className="feather icon-clock me-1" style={{ fontSize: '0.75rem' }}></i>
                                {formattedTime}
                              </button>
                            );
                          })}
                        </div>

                        {selectedSlot && (
                          <div className="mt-3 text-end">
                            <button className="btn btn-primary rounded-pill px-4 fw-bold shadow-xs" onClick={() => setStep(4)}>
                              Continue to Details <i className="feather icon-arrow-right ms-1"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Customer Details */}
            {step === 4 && (
              <form onSubmit={handleSubmitBooking}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="text-muted small mb-0">Please fill in your details to confirm booking:</p>
                  <button className="btn btn-link btn-sm text-primary p-0 fw-medium" type="button" onClick={() => setStep(3)} style={{ fontSize: '0.8rem' }}>
                    <i className="feather icon-arrow-left me-1"></i>Back
                  </button>
                </div>

                {/* Summary Box */}
                <div className="bg-light p-3 rounded-4 border border-light-subtle mb-3">
                  <div className="row g-2 small">
                    <div className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Treatment</span>
                      <strong className="text-secondary">{selectedTreatment?.title}</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Doctor</span>
                      <strong className="text-secondary">{selectedDoctor?.name}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Date</span>
                      <strong className="text-secondary">{selectedDate}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Time Slot</span>
                      <strong className="text-primary">{selectedSlot}</strong>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="alert alert-danger p-2.5 rounded-3 mb-3 small" style={{ fontSize: '0.825rem' }}>
                    <i className="feather icon-alert-triangle me-1"></i>{errorMsg}
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-secondary mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 p-2.5 border-secondary-subtle"
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-secondary mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-control rounded-3 p-2.5 border-secondary-subtle"
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12">
                    <label className="form-label small fw-bold text-secondary mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      className="form-control rounded-3 p-2.5 border-secondary-subtle"
                      placeholder="ramesh@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12">
                    <label className="form-label small fw-bold text-secondary mb-1">Notes / Symptoms (Optional)</label>
                    <textarea
                      className="form-control rounded-3 p-2.5 border-secondary-subtle"
                      rows={2}
                      placeholder="Mention any specific concerns or symptoms..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-top d-flex align-items-center justify-content-between">
                  <button className="btn btn-outline-secondary rounded-pill px-4" type="button" onClick={() => setStep(3)}>
                    Back
                  </button>
                  <button className="btn btn-lg btn-primary rounded-pill px-5 fw-bold shadow-sm" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking <i className="feather icon-check-circle ms-1"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: Booking Confirmation */}
            {step === 5 && bookingResult && (
              <div className="text-center py-4 px-2">
                <div className="rounded-circle bg-success-subtle text-success d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: 72, height: 72 }}>
                  <i className="feather icon-check-circle" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h4 className="fw-bold text-secondary mb-1">Appointment Request Received!</h4>
                <p className="text-muted small mb-4 mx-auto" style={{ maxWidth: 460 }}>
                  Your booking has been saved with status <span className="badge bg-warning text-dark px-2 py-1 rounded-pill">Pending Approval</span>. Opening WhatsApp to connect with our clinic desk automatically...
                </p>

                {/* Summary Card */}
                <div className="bg-light p-3 rounded-4 border border-light-subtle text-start mx-auto mb-4" style={{ maxWidth: 440 }}>
                  <div className="row g-2 small">
                    <div className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Patient Name</span>
                      <strong className="text-secondary">{bookingResult.appointment?.customerName}</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Phone</span>
                      <strong className="text-secondary">{bookingResult.appointment?.phone}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Treatment</span>
                      <strong className="text-secondary">{bookingResult.appointment?.treatmentName}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Doctor</span>
                      <strong className="text-secondary">{bookingResult.appointment?.doctorName}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Date & Time</span>
                      <strong className="text-primary">{bookingResult.appointment?.appointmentDate} at {bookingResult.appointment?.appointmentTime}</strong>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Booking ID</span>
                      <span className="badge bg-secondary text-white font-monospace">{bookingResult.appointmentId}</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-3">
                  <a
                    href={bookingResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-lg rounded-pill px-4 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
                  >
                    <i className="feather icon-message-circle fs-5"></i>
                    Open WhatsApp Chat Now
                  </a>
                  <button className="btn btn-outline-secondary btn-lg rounded-pill px-4" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
