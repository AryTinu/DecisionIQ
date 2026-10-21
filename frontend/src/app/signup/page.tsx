"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setMessage("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    // Redirect to dashboard on successful form validation
    router.push("/dashboard");
  }

  return (
    <main className="auth-page">
      {/* Left Information Panel */}
      <section className="auth-intro">
        <div className="auth-intro-content">
          <Link
            href="/"
            className="brand"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <span
              className="brand-symbol"
              style={{
                width: "32px",
                height: "32px",
                minWidth: "32px",
                minHeight: "32px",
                display: "inline-flex",
              }}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
            <span
              style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A" }}
            >
              Decision<span className="brand-accent">IQ</span>
            </span>
          </Link>

          <p className="auth-form-eyebrow" style={{ marginTop: "28px" }}>
            DECISION SUPPORT WORKSPACE
          </p>

          <h1>Evidence before action.</h1>

          <p className="auth-intro-description">
            Join DecisionIQ to forecast sales, audit risk anomalies, and generate evidence-backed recommendations.
          </p>

          <div className="outlook-card">
            <div className="outlook-top">
              <span>Platform Standard</span>
              <span className="demo-label">Enterprise Ready</span>
            </div>

            <h2>What you get with DecisionIQ</h2>

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "16px",
                fontSize: "14px",
                color: "#475569",
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#059669", fontWeight: "700" }}>✓</span> Automated demand forecasting models
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#059669", fontWeight: "700" }}>✓</span> Real-time risk & anomaly detection
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#059669", fontWeight: "700" }}>✓</span> Interactive what-if scenario simulator
              </li>
            </ul>
          </div>
        </div>

        <p className="auth-footer-label">DecisionIQ Product Prototype v1.0</p>
      </section>

      {/* Right Registration Form Panel */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          <Link href="/" className="login-back-link">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <p className="auth-form-eyebrow">GET STARTED</p>

          <h2>Create Your Account</h2>

          <p className="auth-form-description">
            Get started with business analytics and decision support.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrap">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="check-row" style={{ marginTop: "4px" }}>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span>
                I agree to the <a href="#terms" className="auth-link">Terms of Service</a> and <a href="#privacy" className="auth-link">Privacy Policy</a>.
              </span>
            </label>

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <button type="submit" className="auth-submit">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link href="/login">Sign In</Link>
          </p>

          <div className="auth-prototype-note">
            Prototype mode — navigating directly to workspace.
          </div>
        </div>
      </section>
    </main>
  );
}