
"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="diq-app-shell">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="diq-app-main">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="diq-dashboard-content">{children}</main>
        <footer className="diq-dashboard-footer">
          <span>© 2026 DecisionIQ</span>
          <span>Business decision intelligence</span>
        </footer>
      </div>
    </div>
  );
}
