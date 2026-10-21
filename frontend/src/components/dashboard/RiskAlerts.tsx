
import Link from "next/link";
import { ArrowUpRight, CircleAlert, ShieldCheck } from "lucide-react";

const alerts = [
  {
    title: "East region sales deviation",
    detail: "Sales are below the expected range.",
    level: "High",
    time: "12 min ago",
  },
  {
    title: "Product B inventory variance",
    detail: "Stock levels differ from forecast.",
    level: "Medium",
    time: "38 min ago",
  },
  {
    title: "Demand trend updated",
    detail: "A new demand pattern was identified.",
    level: "Info",
    time: "1 hour ago",
  },
];

export default function RiskAlerts() {
  return (
    <section className="diq-panel diq-risk-panel">
      <div className="diq-panel-header">
        <div>
          <h2>Recent findings</h2>
          <p>Signals that may need your attention</p>
        </div>

        <span className="diq-alert-count">3 open</span>
      </div>

      <div className="diq-alert-list">
        {alerts.map((alert) => (
          <article className="diq-alert-item" key={alert.title}>
            <span className={`diq-alert-icon ${alert.level.toLowerCase()}`}>
              {alert.level === "Info" ? (
                <ShieldCheck size={18} />
              ) : (
                <CircleAlert size={18} />
              )}
            </span>

            <div className="diq-alert-copy">
              <div className="diq-alert-title-row">
                <h3>{alert.title}</h3>
                <span className={`diq-severity ${alert.level.toLowerCase()}`}>
                  {alert.level}
                </span>
              </div>
              <p>{alert.detail}</p>
              <span className="diq-alert-time">{alert.time}</span>
            </div>
          </article>
        ))}
      </div>

      <Link href="/risk-analysis" className="diq-panel-footer-link">
        View all risk findings <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
