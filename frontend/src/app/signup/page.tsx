"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setMessage("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setMessage(
      "Prototype only — account registration is not connected yet."
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

      {/* Right registration panel */}
      <section className="auth-form-section">
        <div className="auth-form-container signup-form">
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

          <p className="auth-form-eyebrow">Start your workspace</p>

          <h2>Create Your Account</h2>

          <p className="auth-form-description">
            Get started with business analytics and decision support.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="fullName">Full name</label>

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
              <label htmlFor="email">Work email</label>

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
                  autoComplete="new-password"
                  minLength={8}
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

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm password</label>

              <div className="password-input-wrap">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="check-row terms-row">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(event) => setAgreeToTerms(event.target.checked)}
              />

              <span>
                I agree to the <a href="#terms">Terms of Service</a> and{" "}
                <a href="#privacy">Privacy Policy</a>.
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
        </div>
      </section>
    </main>
  );
}