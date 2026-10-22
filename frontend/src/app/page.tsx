import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Boxes,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Inventory Management",
    description:
      "Track inventory, monitor stock levels, and make informed decisions about your resources.",
    icon: Boxes,
    color: "blue",
    href: "/inventory",
  },
  {
    number: "02",
    title: "Risk Analysis",
    description:
      "Identify business risks, explore potential impacts, and prioritize actions with confidence.",
    icon: ShieldCheck,
    color: "purple",
    href: "/risk-analysis",
  },
  {
    number: "03",
    title: "Demand Forecasting",
    description:
      "Explore demand trends and plan future inventory with data-driven forecasting tools.",
    icon: TrendingUp,
    color: "green",
    href: "/forecasting",
  },
];

const bars = [36, 49, 42, 58, 48, 70, 62, 78, 66, 86, 75, 94];

export default function HomePage() {
  return (
    <main className="diq-page">
      <header className="diq-header">
        <div className="diq-nav">
          <Link href="/" className="diq-brand" aria-label="DecisionIQ home">
            <span className="diq-logo">
              <BrainCircuit size={24} />
            </span>
            <span>
              Decision<span className="diq-brand-accent">IQ</span>
            </span>
          </Link>

          <nav className="diq-nav-links" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#platform">Platform</a>
            <a href="#about">About</a>
          </nav>

          <div className="diq-nav-actions">
            <Link href="/login" className="diq-signin">
              Sign in
            </Link>
            <Link href="/dashboard" className="diq-button diq-button-small">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="diq-hero" id="about">
        <div className="diq-hero-glow" />
        <div className="diq-hero-grid">
          <div className="diq-hero-copy">
            <div className="diq-eyebrow">
              <Sparkles size={16} />
              Intelligent business decision platform
            </div>

            <h1>
              Make smarter decisions.
              <span> Move business forward.</span>
            </h1>

            <p className="diq-hero-description">
              Turn complex business data into clear, actionable insights.
              Manage inventory, understand risks, and forecast demand from one
              connected workspace.
            </p>

            <div className="diq-hero-actions">
              <Link href="/dashboard" className="diq-button">
                Explore <ArrowRight size={18} />
              </Link>
              <a href="#features" className="diq-button-secondary">
                Discover Features <ChevronRight size={18} />
              </a>
            </div>

            <div className="diq-trust-row">
              <span>
                <CheckCircle2 size={17} /> Unified insights
              </span>
              <span>
                <CheckCircle2 size={17} /> Data-driven planning
              </span>
            </div>
          </div>

          <div className="diq-preview-wrap" id="platform">
            <div className="diq-preview-decoration" />
            <div className="diq-preview">
              <div className="diq-preview-top">
                <div className="diq-preview-brand">
                  <span className="diq-preview-logo">
                    <BrainCircuit size={19} />
                  </span>
                  <div>
                    <strong>DecisionIQ</strong>
                    <span>Business overview</span>
                  </div>
                </div>
                <span className="diq-status">
                  <span /> Platform preview
                </span>
              </div>

              <div className="diq-preview-content">
                <span className="diq-muted-label">YOUR WORKSPACE</span>
                <h2>Business at a glance</h2>
                <p className="diq-preview-subtitle">
                  Your key business areas in one place.
                </p>

                <div className="diq-metric-grid">
                  <div className="diq-metric-card">
                    <div className="diq-metric-top">
                      <span>Inventory</span>
                      <Boxes size={18} />
                    </div>
                    <strong>Stock overview</strong>
                    <span className="diq-metric-note">Inventory visibility</span>
                  </div>
                  <div className="diq-metric-card">
                    <div className="diq-metric-top purple">
                      <span>Risk analysis</span>
                      <ShieldCheck size={18} />
                    </div>
                    <strong>Risk insights</strong>
                    <span className="diq-metric-note">Risk monitoring</span>
                  </div>
                </div>

                <div className="diq-chart-card">
                  <div className="diq-chart-heading">
                    <div>
                      <strong>Performance overview</strong>
                      <span>Illustrative trend visualization</span>
                    </div>
                    <BarChart3 size={20} />
                  </div>

                  <div className="diq-bars" aria-label="Illustrative chart">
                    {bars.map((height, index) => (
                      <div className="diq-bar-column" key={index}>
                        <div
                          className={`diq-bar ${
                            index === bars.length - 1 ? "diq-bar-last" : ""
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="diq-chart-labels">
                    <span>Period 1</span>
                    <span>Period 2</span>
                    <span>Period 3</span>
                    <span>Period 4</span>
                  </div>
                </div>

                <div className="diq-insight">
                  <span className="diq-insight-icon">
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <strong>One connected view</strong>
                    <p>Explore data and make your next move with confidence.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="diq-preview-caption">
              Concept preview · Sample visuals, not live business data
            </p>
          </div>
        </div>
      </section>

      <section className="diq-features" id="features">
        <div className="diq-section-inner">
          <div className="diq-section-heading">
            <span className="diq-section-kicker">THE DECISIONIQ PLATFORM</span>
            <h2>Everything connected. Decisions simplified.</h2>
            <p>
              Bring your essential business workflows together and get a
              clearer view of what needs your attention.
            </p>
          </div>

          <div className="diq-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article className="diq-feature-card" key={feature.number}>
                  <div className="diq-feature-card-top">
                    <span className={`diq-feature-icon ${feature.color}`}>
                      <Icon size={23} />
                    </span>
                    <span className="diq-feature-number">{feature.number}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link href={feature.href} className="diq-feature-link">
                    Explore feature <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="diq-cta">
        <div className="diq-cta-inner">
          <div>
            <span className="diq-cta-kicker">
              <Sparkles size={16} /> DECISIONS START HERE
            </span>
            <h2>See the bigger picture.</h2>
            <p>
              Step into your DecisionIQ workspace to explore inventory,
              risk analysis, and forecasting.
            </p>
          </div>
          <Link href="/dashboard" className="diq-cta-button">
            Let&apos;s Go <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="diq-footer">
        <Link href="/" className="diq-brand">
          <span className="diq-logo">
            <BrainCircuit size={21} />
          </span>
          <span>
            Decision<span className="diq-brand-accent">IQ</span>
          </span>
        </Link>
        <p>Intelligent insights. Better decisions.</p>
        <a href="#about">Back to top ↑</a>
      </footer>
    </main>
  );
}