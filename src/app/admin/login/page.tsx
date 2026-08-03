"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label small fw-semibold text-secondary mb-1.5">Username</label>
        <div className="input-group">
          <span className="input-group-text bg-light border border-end-0 border-secondary-subtle rounded-start-3 text-primary">
            <i className="feather icon-user"></i>
          </span>
          <input
            type="text"
            required
            disabled={loading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control border border-start-0 border-secondary-subtle rounded-end-3 p-2.5"
            placeholder="Enter username"
            style={{ fontSize: "0.9rem" }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label small fw-semibold text-secondary mb-1.5">Password</label>
        <div className="input-group">
          <span className="input-group-text bg-light border border-end-0 border-secondary-subtle rounded-start-3 text-primary">
            <i className="feather icon-lock"></i>
          </span>
          <input
            type="password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control border border-start-0 border-secondary-subtle rounded-end-3 p-2.5"
            placeholder="Enter password"
            style={{ fontSize: "0.9rem" }}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger border-0 rounded-3 py-2 px-3 mb-4 d-flex align-items-center gap-2 small">
          <i className="feather icon-alert-triangle fs-6"></i>
          <span className="fw-medium">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm py-2.5 d-flex align-items-center justify-content-center gap-2 border-0 mb-2 text-white"
        style={{ fontSize: "0.95rem" }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Signing in...
          </>
        ) : (
          <>
            Sign In <i className="feather icon-arrow-right fs-6"></i>
          </>
        )}
      </button>
      <div className="text-center mt-3">
        <a href="/" className="text-decoration-none text-muted small hover-primary transition-all">
          <i className="feather icon-arrow-left me-1"></i> Back to Homepage
        </a>
      </div>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100 p-3"
      style={{
        background: "linear-gradient(135deg, #FFF0F5 0%, #FDE8ED 100%)",
      }}
    >
      <div 
        className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white w-100" 
        style={{ maxWidth: "420px" }}
      >
        <div style={{ height: "5px", background: "linear-gradient(90deg, #FF69B4, #FF1493)" }}></div>
        
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <img 
              src="/barbie-logo.png" 
              alt="Barbie Clinic Logo" 
              className="mb-3"
              style={{ height: "52px", width: "auto", objectFit: "contain" }}
            />
            <h4 className="fw-bold text-secondary mb-1">Admin Portal</h4>
            <p className="text-muted small">Please sign in to access management panels</p>
          </div>

          <Suspense fallback={<div className="text-center py-4"><div className="spinner-border spinner-border-sm text-primary" role="status"></div></div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
