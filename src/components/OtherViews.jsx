import React, { useState } from "react";
import {
  Smartphone,
  Grid,
  FileText,
  BarChart3,
  Users,
  Settings,
  Plus,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  RotateCw,
  UserPlus,
  Shield,
  Key
} from "lucide-react";
import ConsentPolicyBuilder from "./ConsentPolicyBuilder";
import ApiSimulator from "./ApiSimulator";

/* 1. Platforms View */
export function PlatformsView({ addToast, onSimulateEvent }) {
  const [platforms, setPlatforms] = useState([
    { id: 1, name: "Cellcard Customer Portal", type: "Web Application", activeUsers: "420,500", status: true },
    { id: 2, name: "Cellcard Mobile App (iOS / Android)", type: "Mobile Native", activeUsers: "1,250,000", status: true },
    { id: 3, name: "Cellcard SMS Consent Gateway", type: "USSD / SMS", activeUsers: "890,000", status: true },
    { id: 4, name: "Partner API Connector", type: "REST API", activeUsers: "154,200", status: true }
  ]);

  const togglePlatform = (id) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
    );
    addToast("Platform status updated.");
  };

  return (
    <div>
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 class="page-title">Platforms</h1>
        <button class="btn btn-primary" onClick={() => addToast("Add Platform form opened.")}>
          <Plus style={{ width: 16, height: 16 }} /> Add Platform Integration
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {platforms.map((p) => (
          <div key={p.id} class="content-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ padding: "10px", borderRadius: "10px", background: "#FFF3EB", color: "#FF6B00" }}>
                  <Smartphone style={{ width: 24, height: 24 }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>{p.name}</h3>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>{p.type}</span>
                </div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked={p.status} onChange={() => togglePlatform(p.id)} />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderTop: "1px solid var(--color-border)", paddingTop: "12px" }}>
              <span style={{ color: "#64748B" }}>Active Users:</span>
              <span style={{ fontWeight: 700, color: "var(--color-text-main)" }}>{p.activeUsers}</span>
            </div>
          </div>
        ))}
      </div>

      <ApiSimulator onSimulateEvent={onSimulateEvent} addToast={addToast} />
    </div>
  );
}

/* 2. Consent Categories View */
export function ConsentCategoriesView({ addToast, lang, setLang }) {
  const [categories, setCategories] = useState([
    { id: 1, title: "Connectivity", desc: "Bandwidth allocation & network tier priority preferences.", count: "12,450 Consents", mandatory: true },
    { id: 2, title: "Location Insight", desc: "Opt-in for cell tower geolocation and location offers.", count: "8,920 Consents", mandatory: false },
    { id: 3, title: "Web/App Insight", desc: "Usage telemetry for Cellcard mobile application improvements.", count: "9,115 Consents", mandatory: false },
    { id: 4, title: "3rd Party Financial Data", desc: "Cross-partner scoring data sharing with licensed financial institutions.", count: "5,800 Consents", mandatory: false }
  ]);

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, mandatory: !c.mandatory } : c))
    );
    addToast("Consent category settings saved.");
  };

  return (
    <div>
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 class="page-title">Consent Categories</h1>
        <button class="btn btn-primary" onClick={() => addToast("New category draft created.")}>
          <Plus style={{ width: 16, height: 16 }} /> Create Category
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {categories.map((c) => (
          <div key={c.id} class="content-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ padding: "8px", borderRadius: "8px", background: "#FFF3EB", color: "#FF6B00" }}>
                  <Grid style={{ width: 20, height: 20 }} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>{c.title}</h3>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked={c.mandatory} onChange={() => toggleCategory(c.id)} />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <p style={{ fontSize: "0.83rem", color: "#64748B", marginBottom: "16px", minHeight: "40px" }}>{c.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
              <span style={{ fontWeight: 700, color: "#FF6B00" }}>{c.count}</span>
              <span style={{ color: c.mandatory ? "#D97706" : "#64748B", fontWeight: 600 }}>
                {c.mandatory ? "Mandatory" : "Optional"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Consent Prompt Builder Mockup */}
      <ConsentPolicyBuilder lang={lang} setLang={setLang} />
    </div>
  );
}

/* 3. Consent Logs View */
export function ConsentLogsView({ auditLogs, addToast, onSimulateEvent }) {
  const [logSearch, setLogSearch] = useState("");
  const [filterAction, setFilterAction] = useState("All");

  const filteredLogs = auditLogs.filter((l) => {
    const matchesQuery =
      l.phone.includes(logSearch) ||
      l.company.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.category.toLowerCase().includes(logSearch.toLowerCase());

    const matchesAction =
      filterAction === "All" ||
      (filterAction === "Opt-In" && l.action.includes("Granted")) ||
      (filterAction === "Opt-Out" && l.action.includes("Revoked"));

    return matchesQuery && matchesAction;
  });

  const handleExportCSV = () => {
    const headers = "ID,Timestamp,Customer,Category,Action,Channel,Company,IP Address\n";
    const rows = filteredLogs
      .map(
        (l) => `${l.id},${l.timestamp},"${l.phone}","${l.category}","${l.action}","${l.channel}","${l.company}",${l.ip}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cellcard_Consent_Logs_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    addToast("Exported Consent Audit Logs to CSV!");
  };

  return (
    <div>
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 class="page-title">Consent Audit Logs</h1>
          <p style={{ fontSize: "0.83rem", color: "#64748B", marginTop: "2px" }}>
            Immutable audit record of customer consent authorizations across Cellcard channels.
          </p>
        </div>
        <button class="btn btn-secondary" onClick={handleExportCSV}>
          <Download style={{ width: 16, height: 16 }} /> Export Logs CSV
        </button>
      </div>

      <div class="content-card">
        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
          <div class="search-input-wrapper" style={{ flex: 1, maxWidth: "340px" }}>
            <Search class="search-icon" />
            <input
              type="text"
              class="search-input"
              placeholder="Search phone number, company..."
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {["All", "Opt-In", "Opt-Out"].map((act) => (
              <button
                key={act}
                class={`btn ${filterAction === act ? "btn-primary" : "btn-secondary"}`}
                style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                onClick={() => setFilterAction(act)}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Table */}
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>Customer (MSISDN)</th>
                <th>Consent Category</th>
                <th>Action Status</th>
                <th>Channel</th>
                <th>Partner Company</th>
                <th>Client IP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((l) => (
                <tr key={l.id}>
                  <td class="cell-bold" style={{ fontFamily: "monospace" }}>{l.id}</td>
                  <td class="cell-muted">{l.timestamp}</td>
                  <td class="cell-bold">{l.phone}</td>
                  <td>{l.category}</td>
                  <td>
                    <span class={`status-pill ${l.action.includes("Granted") ? "registered" : "rejected"}`}>
                      {l.action}
                    </span>
                  </td>
                  <td class="cell-muted">{l.channel}</td>
                  <td style={{ fontWeight: 600 }}>{l.company}</td>
                  <td class="cell-muted" style={{ fontFamily: "monospace" }}>{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 4. Reports View */
export function ReportsView({ addToast }) {
  return (
    <div>
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 class="page-title">Reports & Compliance</h1>
        <button class="btn btn-primary" onClick={() => addToast("Report download initiated.")}>
          <Download style={{ width: 16, height: 16 }} /> Generate Compliance PDF
        </button>
      </div>

      <div class="content-card">
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "16px" }}>Monthly Regulatory Reports</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { month: "July 2026", status: "Verified & Filed", size: "2.4 MB" },
            { month: "June 2026", status: "Verified & Filed", size: "2.8 MB" },
            { month: "May 2026", status: "Verified & Filed", size: "2.1 MB" }
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--color-border-subtle)", border: "1px solid var(--color-border)", borderRadius: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FileText style={{ width: 20, height: 20, color: "#FF6B00" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Cellcard Consent Compliance Audit ({r.month})</div>
                  <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Size: {r.size} • PDF Document</span>
                </div>
              </div>
              <button class="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => addToast(`Downloading ${r.month} report...`)}>
                <Download style={{ width: 14, height: 14 }} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 5. Team Members View */
export function TeamMembersView({ addToast }) {
  const [members, setMembers] = useState([
    { id: 1, name: "Vanda K.", role: "Super Admin", email: "vanda.k@cellcard.com.kh", status: "Active" },
    { id: 2, name: "Makara C.", role: "Compliance Lead", email: "compliance@cellcard.com.kh", status: "Active" },
    { id: 3, name: "Sokha T.", role: "API Auditor", email: "auditor@cellcard.com.kh", status: "Active" }
  ]);

  return (
    <div>
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 class="page-title">Team & Permissions (RBAC)</h1>
        <button class="btn btn-primary" onClick={() => addToast("Invite member modal opened.")}>
          <UserPlus style={{ width: 16, height: 16 }} /> Invite Team Member
        </button>
      </div>

      <div class="content-card">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {members.map((m) => (
            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFF3EB", color: "#FF6B00", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {m.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--color-text-main)" }}>{m.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{m.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span class="status-pill registered" style={{ background: "var(--color-border-subtle)", color: "var(--color-text-main)", border: "1px solid var(--color-border)" }}>{m.role}</span>
                <button class="btn btn-secondary" style={{ padding: "5px 10px", fontSize: "0.78rem" }} onClick={() => addToast(`Manage permissions for ${m.name}`)}>
                  Manage Access
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 6. Settings View */
export function SettingsView({ addToast }) {
  const [settings, setSettings] = useState({
    smsAlerts: true,
    twoFactor: true,
    webhookSync: true
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    addToast("Setting preference updated.");
  };

  return (
    <div>
      <div class="page-header">
        <h1 class="page-title">Platform Settings</h1>
      </div>

      <div class="content-card" style={{ maxWidth: "700px" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "20px" }}>Security & Real-time Integration</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>SMS Notification Gateway Alerts</div>
              <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Send instant SMS alerts to admin when high-priority partner registers.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked={settings.smsAlerts} onChange={() => handleToggle("smsAlerts")} />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Two-Factor Authentication (2FA) Enforced</div>
              <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Require 2FA verification code before approving enterprise partners.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked={settings.twoFactor} onChange={() => handleToggle("twoFactor")} />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Real-time Webhook Event Dispatcher</div>
              <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Broadcast opt-in and opt-out state changes instantly via WebSocket.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked={settings.webhookSync} onChange={() => handleToggle("webhookSync")} />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
