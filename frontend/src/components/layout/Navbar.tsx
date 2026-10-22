
"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

type NavbarProps = {
  onMenuClick?: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="diq-dashboard-navbar">
      <div className="diq-navbar-left">
        <button
          className="diq-mobile-menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div className="diq-breadcrumb">
          <span>Workspace</span>
          <span className="diq-breadcrumb-divider">/</span>
          <strong>Overview</strong>
        </div>
      </div>

      <div className="diq-navbar-right">
        <label className="diq-search-box">
          <Search size={17} />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search dashboard"
          />
          <kbd>⌘ K</kbd>
        </label>

        <button
          className="diq-notification-button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() =>
            window.alert("You are all caught up on this demo.")
          }
        >
          <Bell size={19} />
          <span />
        </button>

        <div className="diq-navbar-profile">
          <span className="diq-profile-avatar">RD</span>
          <div className="diq-navbar-profile-copy">
            <strong>Workspace User</strong>
            <small>Administrator</small>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
