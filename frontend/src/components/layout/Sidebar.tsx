
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  ChevronLeft,
  CircleHelp,
  Gauge,
  GitCompareArrows,
  Settings,
  ShieldAlert,
  TrendingUp,
  X,
} from "lucide-react";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const navigation = [
  { label: "Overview", href: "/dashboard", icon: Gauge },
  { label: "Inventory", href: "/inventory", icon: Boxes },
  { label: "Risk Analysis", href: "/risk-analysis", icon: ShieldAlert },
  { label: "Forecasting", href: "/forecasting", icon: TrendingUp },
  {
    label: "What-If Analysis",
    href: "/what-if-analysis",
    icon: GitCompareArrows,
  },
];

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          className="diq-sidebar-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside
        className={`diq-sidebar ${mobileOpen ? "diq-sidebar-open" : ""}`}
        aria-label="Dashboard sidebar"
      >
        <div className="diq-sidebar-brand-row">
          <Link href="/" className="diq-sidebar-brand" onClick={onClose}>
            <span className="diq-sidebar-logo">
              <BarChart3 size={21} />
            </span>
            <span>
              Decision<span className="diq-sidebar-brand-blue">IQ</span>
            </span>
          </Link>

          <button
            className="diq-sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <div className="diq-sidebar-workspace">
          <span className="diq-workspace-avatar">D</span>
          <span className="diq-workspace-copy">
            <strong>DecisionIQ</strong>
            <small>Business workspace</small>
          </span>
          <ChevronLeft size={16} className="diq-workspace-chevron" />
        </div>

        <p className="diq-sidebar-label">WORKSPACE</p>

        <nav className="diq-sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                href={item.href}
                key={item.href}
                onClick={onClose}
                className={`diq-sidebar-link ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
                {active && <span className="diq-sidebar-active-dot" />}
              </Link>
            );
          })}
        </nav>

        <div className="diq-sidebar-spacer" />

        <div className="diq-sidebar-help">
          <div className="diq-help-icon">
            <CircleHelp size={19} />
          </div>
          <div>
            <strong>Need some help?</strong>
            <p>Explore your decision tools.</p>
          </div>
        </div>

        <Link
          href="/settings"
          onClick={onClose}
          className={`diq-sidebar-link diq-sidebar-settings ${
            pathname === "/settings" ? "active" : ""
          }`}
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </Link>

        <div className="diq-sidebar-footer">
          <span className="diq-profile-avatar">RD</span>
          <span className="diq-profile-copy">
            <strong>Workspace User</strong>
            <small>Business analyst</small>
          </span>
          <span className="diq-profile-status" />
        </div>
      </aside>
    </>
  );
}
