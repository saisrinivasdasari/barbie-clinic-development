// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

export default function TreatmentManagementPage() {
  const [treatments, setTreatments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [imageUrl, setImageUrl] = useState("/images/procedures/peeling.png");
  const [category, setCategory] = useState("Dermatology");
  const [selectedDoctorIds, setSelectedDoctorIds] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const trtRes = await fetch("/api/admin/treatments");
      const trtJson = await trtRes.json();
      if (trtJson.success) setTreatments(trtJson.data);

      const docRes = await fetch("/api/admin/doctors");
      const docJson = await docRes.json();
      if (docJson.success) setDoctors(docJson.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingTreatment(null);
    setTitle("");
    setSubtitle("");
    setDescription("");
    setDurationMinutes(30);
    setImageUrl("/images/procedures/peeling.png");
    setCategory("Dermatology");
    setSelectedDoctorIds([]);
    setIsModalOpen(true);
  };

  const openEditModal = (trt) => {
    setEditingTreatment(trt);
    setTitle(trt.title);
    setSubtitle(trt.subtitle || "");
    setDescription(trt.description || "");
    setDurationMinutes(trt.durationMinutes || 30);
    setImageUrl(trt.imageUrl || "/images/procedures/peeling.png");
    setCategory(trt.category || "Dermatology");
    setSelectedDoctorIds(trt.assignedDoctorIds || []);
    setIsModalOpen(true);
  };

  const toggleDoctorSelection = (docId: string) => {
    if (selectedDoctorIds.includes(docId)) {
      setSelectedDoctorIds(selectedDoctorIds.filter((id) => id !== docId));
    } else {
      setSelectedDoctorIds([...selectedDoctorIds, docId]);
    }
  };

  const handleSaveTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);

    try {
      const method = editingTreatment ? "PUT" : "POST";
      const payload = {
        id: editingTreatment?.id,
        title,
        subtitle,
        description,
        durationMinutes,
        imageUrl,
        category,
        doctorIds: selectedDoctorIds,
      };

      const res = await fetch("/api/admin/treatments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTreatment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this treatment?")) return;

    try {
      const res = await fetch(`/api/admin/treatments?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted small mt-2">Loading treatments...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Title */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-bold text-secondary mb-1">Treatments & Doctor Mapping</h3>
          <p className="text-muted small mb-0">Add, edit, delete clinical procedures and assign doctors to each treatment.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 fw-bold shadow-xs" onClick={openAddModal}>
          <i className="feather icon-plus me-1"></i>Add New Treatment
        </button>
      </div>

      {/* Treatments Cards Grid */}
      <div className="row g-4">
        {treatments.map((trt) => (
          <div key={trt.id} className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden hover-lift position-relative">
              <div className="position-relative" style={{ height: 160 }}>
                <img
                  src={trt.imageUrl || "/images/procedures/peeling.png"}
                  alt={trt.title}
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-dark bg-opacity-75 text-white backdrop-blur px-2.5 py-1 rounded-pill small">
                    <i className="feather icon-clock me-1"></i>{trt.durationMinutes || 30} mins
                  </span>
                </div>
              </div>

              <div className="card-body p-3.5 d-flex flex-column">
                <span className="badge bg-primary-subtle text-primary align-self-start px-2 py-0.5 rounded-pill small mb-1.5" style={{ fontSize: '0.7rem' }}>
                  {trt.category || "Dermatology"}
                </span>
                <h5 className="fw-bold text-secondary mb-1">{trt.title}</h5>
                <p className="text-muted small mb-3 flex-grow-1" style={{ fontSize: '0.825rem', lineHeight: '1.4' }}>
                  {trt.description || trt.subtitle}
                </p>

                {/* Assigned Doctors Pill */}
                <div className="pt-2.5 border-top border-light-subtle d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-muted d-block small" style={{ fontSize: '0.725rem' }}>Assigned Doctors</span>
                    <div className="d-flex align-items-center gap-1 mt-1">
                      {trt.assignedDoctors?.map((doc) => (
                        <span key={doc.id} className="badge bg-light text-secondary border me-1" style={{ fontSize: '0.7rem' }}>
                          {doc.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-1">
                    <button
                      className="btn btn-sm btn-outline-secondary rounded-circle p-1.5"
                      onClick={() => openEditModal(trt)}
                      title="Edit Treatment"
                    >
                      <i className="feather icon-edit-2"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-circle p-1.5"
                      onClick={() => handleDeleteTreatment(trt.id)}
                      title="Delete Treatment"
                    >
                      <i className="feather icon-trash-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 px-4 pt-4 pb-2">
                <h5 className="modal-title fw-bold text-secondary">
                  {editingTreatment ? "Edit Treatment" : "Add New Treatment"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              <form onSubmit={handleSaveTreatment}>
                <div className="modal-body px-4 py-3">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Treatment Title *</label>
                      <input
                        type="text"
                        required
                        className="form-control rounded-3 p-2.5 border-secondary-subtle"
                        placeholder="e.g. Laser Hair Reduction"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Subtitle</label>
                      <input
                        type="text"
                        className="form-control rounded-3 p-2.5 border-secondary-subtle"
                        placeholder="e.g. Painless Laser Reduction"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Duration (Minutes)</label>
                      <input
                        type="number"
                        className="form-control rounded-3 p-2.5 border-secondary-subtle"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label small fw-bold text-secondary mb-1">Image URL</label>
                      <input
                        type="text"
                        className="form-control rounded-3 p-2.5 border-secondary-subtle"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-12">
                      <label className="form-label small fw-bold text-secondary mb-1">Description</label>
                      <textarea
                        className="form-control rounded-3 p-2.5 border-secondary-subtle"
                        rows={3}
                        placeholder="Describe the clinical treatment and expected results..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Assign Doctors */}
                    <div className="col-sm-12">
                      <label className="form-label small fw-bold text-secondary mb-2">
                        Assign Doctors for this Treatment
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {doctors.map((doc) => {
                          const isAssigned = selectedDoctorIds.includes(doc.id);
                          return (
                            <button
                              key={doc.id}
                              type="button"
                              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-bold transition-all ${
                                isAssigned ? "btn-primary shadow-xs" : "btn-outline-secondary bg-white"
                              }`}
                              onClick={() => toggleDoctorSelection(doc.id)}
                            >
                              {isAssigned && <i className="feather icon-check me-1"></i>}
                              {doc.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 px-4 pb-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill px-4 fw-bold shadow-xs"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Treatment"}
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
