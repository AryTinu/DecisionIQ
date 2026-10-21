
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type AuthPageProps = {
  mode: "login" | "signup";
};

export default function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");

    if (isSignup) {
      const confirmPassword = String(data.get("confirmPassword") ?? "");

      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      if (!agreeToTerms) {
        setMessage("Please accept the Terms of Service and Privacy Policy.");
        return;
      }
    }

    setMessage(
      isSignup
        ? "Prototype only: account registration is not connected yet."
        : "Prototype only: authentication is not connected yet."
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <Link href="/" className="auth-brand">
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <rect x="3" y="3" width="26" height="26" rx="7" fill="currentColor" />
              <path d="M9 19h5v6H9zM17 12h5v13h-5zM24 7h2v18h-2z" fill="white" />
            </svg>
          </span>
          <span>Decision<span className="brand-blue">IQ</span></span>
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

      <section className="auth-form-section">
        <div className={`auth-form-container ${isSignup ? "signup-form" : ""}`}>
          <p className="auth-form-eyebrow">
            {isSignup ? "Start your workspace" : "Account access"}
          </p>

          <h2>{isSignup ? "Create Your Account" : "Welcome Back"}</h2>

          <p className="auth-form-description">
            {isSignup
              ? "Get started with business analytics and decision support."
              : "Sign in to access your DecisionIQ workspace."}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && (
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
            )}

            <div className="form-field">
              <label htmlFor="email">{isSignup ? "Work email" : "Email"}</label>
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
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {isSignup && (
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
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {isSignup ? (
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
            ) : (
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
            )}

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <button type="submit" className="auth-submit">
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            {isSignup ? (
              <>
                Already have an account? <Link href="/login">Sign In</Link>
              </>
            ) : (
              <>
                Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
              </>
            )}
          </p>

          <div className="auth-prototype-note">
            Prototype only — authentication is not connected.
          </div>
        </div>
      </section>
    </main>
  );
}
