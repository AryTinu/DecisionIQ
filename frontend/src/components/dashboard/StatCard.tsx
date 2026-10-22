
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  iconStyle?: "blue" | "green" | "orange" | "purple";
};

export default function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend = "up",
  iconStyle = "blue",
}: StatCardProps) {
  return (
    <article className="diq-stat-card">
      <div className="diq-stat-card-top">
        <span className="diq-stat-card-title">{title}</span>
        <span className={`diq-stat-card-icon ${iconStyle}`}>
          <Icon size={20} strokeWidth={1.9} />
        </span>
      </div>

      <strong className="diq-stat-card-value">{value}</strong>

      <div className="diq-stat-card-bottom">
        <span className={`diq-stat-change ${trend}`}>
          {trend === "up" ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {change}
        </span>
        <span className="diq-stat-card-description">{description}</span>
      </div>
    </article>
  );
}
