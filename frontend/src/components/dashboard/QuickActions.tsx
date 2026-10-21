
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  GitCompareArrows,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

const actions = [
  {
    title: "Manage inventory",
    description: "Review stock and product availability",
    href: "/inventory",
    icon: Boxes,
  },
  {
    title: "Analyze business risks",
    description: "Review anomalies and potential issues",
    href: "/risk-analysis",
    icon: ShieldAlert,
  },
  {
    title: "Generate a forecast",
    description: "Explore future demand and sales",
    href: "/forecasting",
    icon: TrendingUp,
  },
  {
    title: "Compare scenarios",
    description: "Evaluate alternative business outcomes",
    href: "/what-if-analysis",
    icon: GitCompareArrows,
  },
];

export default function QuickActions() {
  return (
    <section className="diq-quick-actions">
      <div className="diq-panel-header">
        <div>
          <h2>Quick actions</h2>
          <p>Go straight to the tools you use most</p>
        </div>
      </div>

      <div className="diq-quick-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              href={action.href}
              className="diq-quick-action"
              key={action.title}
            >
              <span className="diq-quick-icon">
                <Icon size={20} />
              </span>
              <span className="diq-quick-copy">
                <strong>{action.title}</strong>
                <small>{action.description}</small>
              </span>
              <ArrowRight className="diq-quick-arrow" size={17} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
