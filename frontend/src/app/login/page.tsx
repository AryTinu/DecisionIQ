"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Directly navigate to dashboard for prototype presentation
    router.push("/dashboard");
  }

  return (
    <main className="auth-page">
      {/* Left Information Panel */}
      <section className="auth-intro">
        <div className="auth-intro-content">
          {/* Logo with strict inline style bounds */}
          <Link href="/" className="brand" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span 
              className="brand-symbol" 
              style={{ width: "32px", height: "32px", minWidth: "32px", minHeight: "32px", display: "inline-flex" }} 
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
            <span style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A" }}>
              Decision<span className="brand-accent">IQ</span>
            </span>
          </Link>

          <p className="auth-form-eyebrow" style={{ marginTop: "28px" }}>
            DECISION SUPPORT WORKSPACE
          </p>

          <h1>Evidence before action.</h1>

          <p className="auth-intro-description">
            Bring forecasts, risks, scenarios, and recommendations into one clear workspace.
          </p>

          <div className="outlook-card">
            <div className="outlook-top">
              <span>Current Outlook</span>
              <span className="demo-label">Demo Data</span>
            </div>

            <h2>Forecast Confidence</h2>

            <div className="confidence-row">
              <strong>88%</strong>
              <div
                className="confidence-track"
                role="progressbar"
                aria-label="Forecast confidence"
                aria-valuenow={88}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span />
              </div>
            </div>

            <div className="outlook-divider" />

            <p className="outlook-insight">
              <span aria-hidden="true">↗</span>
              Demand projected to increase 8.2% next quarter.
            </p>
          </div>
        </div>

        <p className="auth-footer-label">DecisionIQ Product Prototype v1.0</p>
      </section>

      {/* Right Login Form Panel */}
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

          <p className="auth-form-eyebrow">ACCOUNT ACCESS</p>

          <h2>Welcome Back</h2>

          <p className="auth-form-description">
            Sign in to access your DecisionIQ workspace.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="email">Email Address</label>
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            <div className="login-options">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <Link href="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <button type="submit" className="auth-submit">
              Sign In
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>

          <div className="auth-prototype-note">
            Prototype mode — navigating directly to workspace.
          </div>
        </div>
      </section>
    </main>
  );
}