import Link from "next/link";

const capabilities = [
  {
    icon: "📈",
    title: "Predictive Analytics",
    description: "Forecast future sales and product demand using robust historical ML models.",
  },
  {
    icon: "⚠️",
    title: "Risk & Anomaly Detection",
    description: "Identify unexpected data variances, risk patterns, and sales anomalies early.",
  },
  {
    icon: "🔀",
    title: "What-If Analysis",
    description: "Simulate alternative business decisions and stress-test strategic scenarios.",
  },
  {
    icon: "🎯",
    title: "Decision Optimization",
    description: "Evaluate decisions against operational constraints and business targets.",
  },
  {
    icon: "💬",
    title: "AI Business Assistant",
    description: "Query business datasets directly through evidence-backed natural language QA.",
  },
  {
    icon: "🔍",
    title: "Explainable Recommendations",
    description: "Inspect statistical proof and decision trees backing every recommendation.",
  },
];

const workflowSteps = [
  "Upload Business Data",
  "Prepare & Process",
  "Forecast Outcomes",
  "Review Recommendations",
];

const performanceData = [
  { month: "Jan", actual: 48, forecast: 66 },
  { month: "Feb", actual: 70, forecast: 90 },
  { month: "Mar", actual: 58, forecast: 76 },
  { month: "Apr", actual: 83, forecast: 106 },
  { month: "May", actual: 67, forecast: 86 },
  { month: "Jun", actual: 96, forecast: 121 },
  { month: "Jul", actual: 75, forecast: 100 },
];

function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand-symbol" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>
        Decision<span className="brand-accent">IQ</span>
      </span>
    </Link>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-card">
      <div className="dashboard-heading">
        <div className="dashboard-title">
          <span className="small-logo">IQ</span>
          <strong>Executive Business Intelligence</strong>
        </div>
        <span className="demo-label">Demo Data</span>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <span>Total Sales</span>
          <strong>$1.24M</strong>
          <small className="positive">+8.2% vs Q3</small>
        </div>
        <div className="metric">
          <span>Demand Forecast</span>
          <strong>$1.38M</strong>
          <small>Next 90 Days</small>
        </div>
        <div className="metric">
          <span>Risk Findings</span>
          <strong>3 Alerts</strong>
          <small className="warning">Action required</small>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="sales-panel">
          <div className="panel-heading">
            <strong>Sales Performance Trend</strong>
            <span>2026 Forecast</span>
          </div>

          <div className="sales-graph">
            <svg
              viewBox="0 0 320 100"
              preserveAspectRatio="none"
              role="img"
              style={{ width: "100%", height: "100%" }}
            >
              <polyline
                points="5,80 40,65 80,70 120,45 160,55 200,25 240,35 280,15 315,20"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="month-labels">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="findings-panel">
          <div className="panel-heading">
            <strong>Key Insights</strong>
          </div>
          <div className="finding">
            <span className="severity high">High</span>
            <p>Regional sales deviation</p>
          </div>
          <div className="finding">
            <span className="severity medium">Medium</span>
            <p>Inventory lag alert</p>
          </div>
          <div className="finding">
            <span className="severity info">Info</span>
            <p>Forecast recalculated</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformanceChart() {
  return (
    <div className="performance-card">
      <div className="performance-heading">
        <span>Quarterly Model Accuracy</span>
        <span className="demo-label">Demo Data</span>
      </div>

      <div className="bar-chart">
        {performanceData.map((item) => (
          <div className="bar-group" key={item.month}>
            <div className="bars">
              <span className="bar actual" style={{ height: `${item.actual * 0.9}px` }} />
              <span className="bar forecast" style={{ height: `${item.forecast * 0.9}px` }} />
            </div>
            <span className="bar-month">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <span><i className="legend-actual" /> Historical Data</span>
        <span><i className="legend-forecast" /> Model Forecast</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="container-custom nav-container" aria-label="Main navigation">
          <Brand />

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#impact">About</a>
          </div>

          <div className="nav-actions">
            <Link className="login-link" href="/login">
              Login
            </Link>
            <Link className="button button-primary" href="/signup">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="container-custom hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow-pill">
              <span>✦</span> Business Decision Intelligence
            </div>
            <h1>Make Better Decisions With Your Business Data.</h1>
            <p className="hero-description">
              DecisionIQ helps businesses forecast demand, identify unusual patterns, compare scenarios, and understand the evidence behind important decisions.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="/signup">
                Get Started
              </Link>
              <a className="text-link" href="#features">
                Explore Features →
              </a>
            </div>

            <div className="trust-points">
              <span><i>✓</i> Verifiable Evidence</span>
              <span><i>✓</i> Predictive Analytics</span>
              <span><i>✓</i> Enterprise Security</span>
            </div>
          </div>

          <div className="hero-visual">
            <DashboardPreview />
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="container-custom">
            <div className="section-intro">
              <p className="eyebrow-pill">Core Capabilities</p>
              <h2>Tools for Better Business Decisions</h2>
              <p>Move from fragmented data spreadsheets to clear, evidence-backed strategic actions.</p>
            </div>

            <div className="capability-grid">
              {capabilities.map((item) => (
                <article className="capability-card" key={item.title}>
                  <div className="capability-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="container-custom">
            <div className="section-intro">
              <p className="eyebrow-pill">Structured Workflow</p>
              <h2>How DecisionIQ Works</h2>
            </div>

            <div className="workflow-grid">
              {workflowSteps.map((step, index) => (
                <div className="workflow-step" key={step}>
                  <span className="step-number">STEP 0{index + 1}</span>
                  <div className="step-visual">
                    <span className="step-dot">{index + 1}</span>
                    {index < workflowSteps.length - 1 && <span className="step-connector" />}
                  </div>
                  <h3>{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-custom impact-section" id="impact">
          <div className="impact-copy">
            <p className="eyebrow-pill">Enterprise Value</p>
            <h2 className="text-3xl font-bold">From Business Data to Clearer Decisions</h2>

            <ul className="impact-list">
              <li><span>✓</span> Understand historical performance and future demand trends.</li>
              <li><span>✓</span> Identify unusual variance patterns and business risks earlier.</li>
              <li><span>✓</span> Compare decisions with supporting statistical evidence.</li>
            </ul>
          </div>

          <PerformanceChart />
        </section>

        <section className="cta-section">
          <div className="container-custom cta-content">
            <div>
              <h2>Bring Clarity to Your Business Decisions</h2>
              <p>Explore your data, simulate outcomes, and execute with absolute confidence.</p>
            </div>
            <Link className="button button-white" href="/signup">
              Get Started →
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-custom footer-content">
          <div className="footer-brand">
            <Brand />
            <p>Integrated decision intelligence platform designed for modern enterprise analytics.</p>
          </div>

          <div className="footer-column">
            <strong>Product</strong>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="footer-column">
            <strong>Account</strong>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        </div>

        <div className="container-custom footer-bottom">
          <span>© 2026 DecisionIQ. All rights reserved.</span>
          <span>Enterprise Analytics Workspace</span>
        </div>
      </footer>
    </>
  );
}