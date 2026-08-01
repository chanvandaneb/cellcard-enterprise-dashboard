import React from "react";
import {
  LayoutDashboard,
  Smartphone,
  Grid,
  FileText,
  BarChart3,
  Building2,
  Users,
  Settings
} from "lucide-react";

const ICON_MAP = {
  LayoutDashboard,
  Smartphone,
  Grid,
  FileText,
  BarChart3,
  Building2,
  Users,
  Settings
};

export default function Sidebar({ activeTab, setActiveTab, pendingCount, registeredCount }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { id: "platforms", label: "Platforms", icon: "Smartphone" },
    { id: "consent-categories", label: "Consent Categories", icon: "Grid" },
    { id: "consent-logs", label: "Consent Logs", icon: "FileText" },
    { id: "reports", label: "Reports", icon: "BarChart3" },
    { id: "company-management", label: "Company Management", icon: "Building2" },
    { id: "team-members", label: "Team Members", icon: "Users" },
    { id: "settings", label: "Settings", icon: "Settings" }
  ];

  return (
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand-logo">
          {/* Cellcard SVG logo representation matching brand */}
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#FF6B00" />
            <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M15 20C15 17.2386 17.2386 15 20 15C22.7614 15 25 17.2386 25 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="20" cy="20" r="2" fill="white" />
          </svg>
          <div>
            <div style={{ lineHeight: 1.1, fontSize: '1.2rem', fontWeight: 800, color: '#FF6B00', letterSpacing: '-0.02em' }}>
              cellcard
            </div>
            <div class="brand-subtext">ROYAL GROUP</div>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = ICON_MAP[item.icon];
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              class={`nav-item ${isActive ? "active" : ""}`}
            >
              <IconComponent class="nav-icon" />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.id === "company-management" && pendingCount > 0 && (
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "99px",
                    backgroundColor: isActive ? "#FF6B00" : "#F1F5F9",
                    color: isActive ? "#FFFFFF" : "#64748B"
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
