
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CircleAlert,
  Database,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import RiskAlerts from "@/components/dashboard/RiskAlerts";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const handleExport = () => {
    window.print();
  };

  return (
    <div className="diq-overview">
      {/* Page heading */}
      <section className="diq-page-heading">
        <div>
          <p className="diq-page-eyebrow">BUSINESS INTELLIGENCE</p>

          <h1>Overview</h1>

          <p className="diq-page-description">
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>

        <div className="diq-heading-actions">
          <span className="diq-date-label">
            <span className="diq-live-dot" />
            Demo workspace
          </span>

          <button
            type="button"
            className="diq-outline-button"
            onClick={handleExport}
          >
            <BarChart3 size={17} aria-hidden="true" />
            Export overview
          </button>
        </div>
      </section>

      {/* Welcome banner */}
      <section className="diq-welcome-banner">
        <div className="diq-welcome-icon">
          <Sparkles size={23} aria-hidden="true" />
        </div>

        <div className="diq-welcome-copy">
          <h2>Your business at a glance</h2>

          <p>
            Review performance, spot emerging risks, and explore data-backed
            business decisions from one workspace.
          </p>
        </div>

        <Link href="/risk-analysis" className="diq-welcome-link">
          Explore insights
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      {/* Key performance indicators */}
      <section
        className="diq-kpi-grid"
        aria-label="Business key metrics"
      >
        <StatCard
          title="Total Sales"
          value="1.24L"
          change="8.2%"
          description="vs. previous period"
          icon={BarChart3}
          trend="up"
          iconStyle="blue"
        />

        <StatCard
          title="Forecast Revenue"
          value="1.38L"
          change="11.3%"
          description="projected growth"
          icon={TrendingUp}
          trend="up"
          iconStyle="green"
        />

        <StatCard
          title="Inventory Items"
          value="8,420"
          change="2.4%"
          description="stock level change"
          icon={Database}
          trend="up"
          iconStyle="purple"
        />

        <StatCard
          title="Risk Findings"
          value="12"
          change="3 open"
          description="require review"
          icon={CircleAlert}
          trend="down"
          iconStyle="orange"
        />
      </section>

      {/* Charts and risk alerts */}
      <section className="diq-analysis-grid">
        <SalesChart />
        <RiskAlerts />
      </section>

      {/* Quick navigation actions */}
      <QuickActions />

      {/* Business insight summary */}
      <section className="diq-insight-summary">
        <div className="diq-insight-summary-icon">
          <Sparkles size={20} aria-hidden="true" />
        </div>

        <div className="diq-insight-summary-copy">
          <strong>Decision insight</strong>

          <p>
            Use forecasts alongside current inventory and risk findings
            before making operational decisions. The figures on this demo
            page are illustrative, not live business data.
          </p>
        </div>

        <Link
          href="/forecasting"
          className="diq-insight-summary-trend"
        >
          <ArrowUpRight size={17} aria-hidden="true" />
          <span>Explore trends</span>
        </Link>
      </section>
    </div>
  );
}
