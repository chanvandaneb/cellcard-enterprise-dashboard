import React, { useState } from "react";
import {
  X,
  User,
  ShieldCheck,
  Key,
  Smartphone,
  LogOut,
  Building,
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";

export default function UserProfileModal({ currentUser, isOpen, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState("info"); // "info" | "security" | "sessions" | "history"

  if (!isOpen || !currentUser) return null;

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        {/* Profile Card Header */}
        <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", padding: "24px 28px", color: "#FFFFFF", position: "relative" }}>
          <button
            class="icon-btn"
            style={{ position: "absolute", right: "20px", top: "20px", background: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "none" }}
            onClick={onClose}
          >
            <X style={{ width: 16, height: 16 }} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#FF6B00",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(255,107,0,0.4)"
              }}
            >
              CC
            </div>
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>{currentUser.name || "Vanda K."}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                <span class="status-pill registered" style={{ background: "#FF6B00", color: "#FFFFFF", border: "none", fontSize: "0.72rem" }}>
                  {currentUser.role || "Super Administrator"}
                </span>
                <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontFamily: "monospace" }}>
                  ID: {currentUser.employeeId || "CC-ADM-0091"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div style={{ padding: "0 28px", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-surface)" }}>
          <div class="drawer-tabs" style={{ margin: 0 }}>
            <button
              class={`drawer-tab-btn ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              Profile Details
            </button>
            <button
              class={`drawer-tab-btn ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              Security & 2FA
            </button>
            <button
              class={`drawer-tab-btn ${activeTab === "sessions" ? "active" : ""}`}
              onClick={() => setActiveTab("sessions")}
            >
              Active Sessions (2)
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div class="modal-body">
          {/* TAB 1: Profile Details */}
          {activeTab === "info" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "0.85rem" }}>
              <div style={{ padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>DEPARTMENT</div>
                <div style={{ fontWeight: 700, marginTop: "2px" }}>Telecom Compliance & API Security</div>
              </div>

              <div style={{ padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>DIRECT SUPERVISOR</div>
                <div style={{ fontWeight: 700, marginTop: "2px" }}>Sokha T. (VP Operations)</div>
              </div>

              <div style={{ padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>WORK EMAIL</div>
                <div style={{ fontWeight: 600, color: "#3B82F6", marginTop: "2px" }}>{currentUser.email}</div>
              </div>

              <div style={{ padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>WORK PHONE</div>
                <div style={{ fontWeight: 600, marginTop: "2px" }}>+855 12 888 999</div>
              </div>

              <div style={{ gridColumn: "span 2", padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>OFFICE LOCATION</div>
                <div style={{ fontWeight: 600, marginTop: "2px" }}>Cellcard Royal Group Headquarters, Preah Monivong Blvd, Phnom Penh</div>
              </div>
            </div>
          )}

          {/* TAB 2: Security & 2FA */}
          {activeTab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", border: "1px solid var(--color-border)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ShieldCheck style={{ width: 20, height: 20, color: "#10B981" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>Two-Factor Authenticator App</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Google Authenticator / Authy active</div>
                  </div>
                </div>
                <span class="status-pill registered">Enabled</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", border: "1px solid var(--color-border)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Key style={{ width: 20, height: 20, color: "#FF6B00" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>Admin Password</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Last updated 14 days ago</div>
                  </div>
                </div>
                <button class="btn btn-secondary" style={{ padding: "5px 10px", fontSize: "0.78rem" }}>Change Password</button>
              </div>
            </div>
          )}

          {/* TAB 3: Active Sessions */}
          {activeTab === "sessions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Smartphone style={{ width: 18, height: 18, color: "#FF6B00" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>macOS Chrome Browser (Current Session)</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>IP: 175.100.12.44 • Phnom Penh, Cambodia</div>
                  </div>
                </div>
                <span class="status-pill registered" style={{ fontSize: "0.7rem" }}>Active Now</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "var(--color-border-subtle)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Smartphone style={{ width: 18, height: 18, color: "#64748B" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>Cellcard Admin Mobile (iOS)</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Last active 2 hours ago</div>
                  </div>
                </div>
                <button class="btn btn-secondary" style={{ padding: "4px 8px", fontSize: "0.75rem", color: "#EF4444" }}>Revoke</button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Logout */}
        <div class="modal-footer" style={{ justifyContent: "space-between" }}>
          <button class="btn btn-danger" onClick={onLogout}>
            <LogOut style={{ width: 14, height: 14 }} /> Log Out Admin Session
          </button>
          <button class="btn btn-secondary" onClick={onClose}>Close Profile</button>
        </div>
      </div>
    </div>
  );
}
