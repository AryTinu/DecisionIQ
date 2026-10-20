
const capabilities = [
  {
    icon: "↗",
    title: "Predictive Analytics",
    description:
      "Forecast future sales and product demand using historical business data.",
  },
  {
    icon: "!",
    title: "Risk & Anomaly Detection",
    description:
      "Identify unusual patterns, potential risks, and important changes in your data.",
  },
  {
    icon: "◉",
    title: "What-If Analysis",
    description:
      "Compare alternative business scenarios before making important decisions.",
  },
  {
    icon: "◎",
    title: "Decision Optimization",
    description:
      "Evaluate possible decisions against business objectives and constraints.",
  },
  {
    icon: "✳",
    title: "AI Business Assistant",
    description:
      "Ask business questions and explore insights from available data and documents.",
  },
  {
    icon: "≡",
    title: "Explainable Recommendations",
    description:
      "Understand the evidence and reasoning behind suggested business actions.",
  },
];

const workflowSteps = [
  "Upload Business Data",
  "Prepare and Analyze Data",
  "Forecast and Compare Outcomes",
  "Review Insights and Recommendations",
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

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#home">
      <span className="brand-symbol" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>
        Decision<span className="brand-accent">IQ</span>
      </span>
    </a>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-card">
      <div className="dashboard-heading">
        <div className="dashboard-title">
          <span className="small-logo">D</span>
          <strong>Business Overview</strong>
        </div>
        <span className="demo-label">Illustrative demo data</span>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <span>Total Sales</span>
          <strong>$1.24M</strong>
          <small className="positive">+8.2%</small>
        </div>
        <div className="metric">
          <span>Demand Forecast</span>
          <strong>$1.38M</strong>
          <small>Next 90 days</small>
        </div>
        <div className="metric">
          <span>Risk Findings</span>
          <strong>12</strong>
          <small className="warning">3 need review</small>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="sales-panel">
          <div className="panel-heading">
            <strong>Sales Performance</strong>
            <span>Jan – Jul 2026</span>
          </div>

          <div className="sales-graph">
            <div className="graph-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
            <svg
              viewBox="0 0 360 130"
              preserveAspectRatio="none"
              role="img"
              aria-label="Illustrative sales performance trend"
            >
              <polyline
                points="5,108 35,94 65,99 95,70 125,80 155,48 185,60 215,31 245,43 275,17 305,28 355,5"
                fill="none"
                stroke="#35658f"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="month-labels">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(
              (month) => (
                <span key={month}>{month}</span>
              ),
            )}
          </div>
        </div>

        <div className="findings-panel">
          <strong>Recent Findings</strong>
          <div className="finding">
            <span className="severity high">High</span>
            <p>Regional sales deviation</p>
          </div>
          <div className="finding">
            <span className="severity medium">Medium</span>
            <p>Product demand variance</p>
          </div>
          <div className="finding">
            <span className="severity info">Info</span>
            <p>Demand trend updated</p>
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
        <strong>Quarterly Performance</strong>
        <span className="demo-label">Illustrative demo data</span>
      </div>

      <div className="bar-chart">
        {performanceData.map((item) => (
          <div className="bar-group" key={item.month}>
            <div className="bars">
              <span
                className="bar actual"
                style={{ height: `${item.actual}px` }}
              />
              <span
                className="bar forecast"
                style={{ height: `${item.forecast}px` }}
              />
            </div>
            <span className="bar-month">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-actual" />
          Actual
        </span>
        <span>
          <i className="legend-forecast" />
          Forecast
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="nav-container" aria-label="Main navigation">
          <Brand />

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </div>

          <div className="nav-actions">
            <a className="login-link" href="/login">
              Login
            </a>
            <a className="button button-primary" href="/signup">
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section-container" id="home">
          <div className="hero-copy">
            <p className="eyebrow">BUSINESS DECISION INTELLIGENCE</p>

            <h1>Make Better Decisions With Your Business Data.</h1>

            <p className="hero-description">
              DecisionIQ helps businesses forecast demand, identify unusual
              patterns, compare scenarios, and understand the evidence behind
              important decisions.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="/signup">
                Get Started <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#features">
                Explore Features <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="trust-points">
              <span>
                <i>✓</i> Clear analysis
              </span>
              <span>
                <i>✓</i> Traceable evidence
              </span>
              <span>
                <i>✓</i> Practical workflows
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <DashboardPreview />
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-container">
            <div className="section-intro">
              <p className="eyebrow">CORE CAPABILITIES</p>
              <h2>Tools for Better Business Decisions</h2>
              <p>
                Move from historical data to meaningful insights and
                evidence-backed business actions.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((item) => (
                <article className="capability-card" key={item.title}>
                  <span className="capability-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a
                    className="capability-arrow"
                    href="#how-it-works"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="section-container">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>A Clear Path From Data to Action</h2>

            <div className="workflow-grid">
              {workflowSteps.map((step, index) => (
                <div className="workflow-step" key={step}>
                  <span className="step-number">0{index + 1}</span>
                  <div className="step-visual">
                    <span className="step-dot">{index + 1}</span>
                    {index < workflowSteps.length - 1 && (
                      <span className="step-connector" />
                    )}
                  </div>
                  <h3>{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="impact-section section-container" id="impact">
          <div className="impact-copy">
            <p className="eyebrow">MEASURED IMPACT</p>
            <h2>From Business Data to Clearer Decisions</h2>

            <ul className="impact-list">
              <li>
                <span>✓</span>
                Understand historical performance and future trends.
              </li>
              <li>
                <span>✓</span>
                Identify unusual patterns and potential risks.
              </li>
              <li>
                <span>✓</span>
                Compare alternatives with supporting evidence.
              </li>
            </ul>
          </div>

          <PerformanceChart />
        </section>

        <section className="cta-section" id="about">
          <div className="section-container cta-content">
            <div>
              <h2>Bring Clarity to Your Business Decisions</h2>
              <p>
                Explore your data, understand possible outcomes, and make more
                informed decisions.
              </p>
            </div>
            <a className="button button-white" href="/signup">
              Get Started <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-container footer-content">
          <div className="footer-brand">
            <Brand light />
            <p>
              Integrated analytics and decision support for practical business
              teams.
            </p>
          </div>

          <div className="footer-column">
            <strong>Product</strong>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="footer-column">
            <strong>Account</strong>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </div>
        </div>

        <div className="section-container footer-bottom">
          <span>Copyright DecisionIQ</span>
          <span>AI-powered decision support</span>
        </div>
      </footer>
    </>
  );
}
