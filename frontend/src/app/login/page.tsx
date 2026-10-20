"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    setMessage(
      "Prototype only — authentication is not connected yet."
    );
  }

  return (
    <main className="auth-page">
      {/* Left information panel */}
      <section className="auth-intro">
        <Link href="/" className="auth-brand" aria-label="DecisionIQ home">
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <rect
                x="3"
                y="3"
                width="26"
                height="26"
                rx="7"
                fill="currentColor"
              />
              <path
                d="M9 19h5v6H9zM17 12h5v13h-5zM24 7h2v18h-2z"
                fill="white"
              />
            </svg>
          </span>

          <span>
            Decision<span className="brand-blue">IQ</span>
          </span>
        </Link>

        <div className="auth-intro-content">
          <p className="auth-eyebrow">DECISION SUPPORT WORKSPACE</p>

          <h1>Evidence before action.</h1>

          <p className="auth-intro-description">
            Bring forecasts, risks, scenarios, and recommendations into one
            clear workspace.
          </p>

          <div className="outlook-card">
            <div className="outlook-top">
              <span>Current outlook</span>
              <span className="demo-badge">Illustrative demo data</span>
            </div>

            <h2>Forecast confidence</h2>

            <div className="confidence-row">
              <strong>88%</strong>

              <div
                className="confidence-track"
                role="progressbar"
                aria-label="Illustrative forecast confidence"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={88}
              >
                <span />
              </div>
            </div>

            <div className="outlook-divider" />

            <p className="outlook-insight">
              <span aria-hidden="true">↗</span>
              Demand is projected to increase 8.2% next quarter.
            </p>
          </div>
        </div>

        <p className="auth-footer-label">DecisionIQ product prototype</p>
      </section>

      {/* Right login panel */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          {/* Back to home button */}
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

          <p className="auth-form-eyebrow">Account access</p>

          <h2>Welcome Back</h2>

          <p className="auth-form-description">
            Sign in to access your DecisionIQ workspace.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="email">Email</label>

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
                  onClick={() => setShowPassword((previous) => !previous)}
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
            Prototype only — authentication is not connected.
          </div>
        </div>
      </section>
    </main>
  );
}