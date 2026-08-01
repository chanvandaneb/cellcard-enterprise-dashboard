import React, { useState } from "react";
import {
  X,
  Building2,
  Key,
  BarChart3,
  FileText,
  Copy,
  Plus,
  Trash2,
  Check,
  ShieldCheck
} from "lucide-react";

export default function CompanyDetailsDrawer({
  company,
  onClose,
  onAddApiKey,
  onRevokeApiKey,
  auditLogs = []
}) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "apikeys" | "analytics" | "audit"
  const [newKeyName, setNewKeyName] = useState("");
  const [showAddKeyForm, setShowAddKeyForm] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  if (!company) return null;

  const handleCopy = (id, keyText) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleGenerateKeySubmit = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    onAddApiKey(company.id, newKeyName.trim());
    setNewKeyName("");
    setShowAddKeyForm(false);
  };

  // Filter logs for this company
  const companyLogs = auditLogs.filter(
    (l) => l.company.toLowerCase() === company.companyName.toLowerCase()
  );

  return (
    <div class="drawer-overlay" onClick={onClose}>
      <div class="drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div class="drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "#FFF3EB",
                color: "#FF6B00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Building2 style={{ width: 22, height: 22 }} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1E293B" }}>
                {company.companyName}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748B" }}>
                  Rep: {company.fullName}
                </span>
                <span class={`status-pill ${company.status.toLowerCase()}`}>
                  {company.status}
                </span>
              </div>
            </div>
          </div>
          <button class="icon-btn" onClick={onClose}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Body */}
        <div class="drawer-body">
          {/* Sub-tabs */}
          <div class="drawer-tabs">
            <button
              class={`drawer-tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              class={`drawer-tab-btn ${activeTab === "apikeys" ? "active" : ""}`}
              onClick={() => setActiveTab("apikeys")}
            >
              API Credentials ({(company.apiKeys || []).length})
            </button>
            <button
              class={`drawer-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Consent Stats
            </button>
            <button
              class={`drawer-tab-btn ${activeTab === "audit" ? "active" : ""}`}
              onClick={() => setActiveTab("audit")}
            >
              Audit Trail ({companyLogs.length})
            </button>
          </div>

          {/* TAB 1: Overview */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  background: "#F8FAFC",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>TAX / BUSINESS ID</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1E293B" }}>{company.taxId || "K001-99882233"}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>INDUSTRY SECTOR</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{company.industry}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>PRIMARY CONTACT EMAIL</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3B82F6" }}>{company.companyEmail}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>CONTACT PHONE</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>{company.companyPhone}</div>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>REGISTERED ADDRESS</div>
                  <div style={{ fontSize: "0.88rem", color: "#334155" }}>{company.companyAddress}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 700 }}>ONBOARDED DATE</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{company.registeredDate || "2026-01-15"}</div>
                </div>
              </div>

              <div style={{ padding: "16px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
                <ShieldCheck style={{ width: 24, height: 24, color: "#2563EB" }} />
                <div style={{ fontSize: "0.83rem", color: "#1E40AF" }}>
                  Cellcard Enterprise SLA Active. Partner API bandwidth quota set to <strong>50,000 requests/min</strong>.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: API Keys */}
          {activeTab === "apikeys" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>Active Enterprise API Tokens</h4>
                  <p style={{ fontSize: "0.78rem", color: "#64748B" }}>Manage keys used to integrate Cellcard Consent APIs.</p>
                </div>
                <button
                  class="btn btn-primary"
                  onClick={() => setShowAddKeyForm(!showAddKeyForm)}
                >
                  <Plus style={{ width: 14, height: 14 }} /> Generate API Key
                </button>
              </div>

              {showAddKeyForm && (
                <form onSubmit={handleGenerateKeySubmit} style={{ background: "#FFF3EB", padding: "16px", borderRadius: "10px", border: "1px solid #FFD4BA", marginBottom: "20px" }}>
                  <div class="form-group">
                    <label class="form-label">Key Description / Purpose</label>
                    <input
                      type="text"
                      class="form-input"
                      placeholder="e.g. Mobile App Gateway Token"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <button type="button" class="btn btn-secondary" onClick={() => setShowAddKeyForm(false)}>Cancel</button>
                    <button type="submit" class="btn btn-primary">Create Key</button>
                  </div>
                </form>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {(company.apiKeys || []).length === 0 ? (
                  <div style={{ textAlign: "center", padding: "24px", color: "#94A3B8", fontSize: "0.85rem" }}>
                    No active API keys generated yet. Click "Generate API Key" to create one.
                  </div>
                ) : (
                  company.apiKeys.map((k) => (
                    <div
                      key={k.id}
                      style={{
                        padding: "14px 18px",
                        border: "1px solid #E2E8F0",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{k.name}</span>
                          <span class="status-pill registered" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>{k.status}</span>
                        </div>
                        <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#475569", marginTop: "4px" }}>
                          {k.key}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          class="btn btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                          onClick={() => handleCopy(k.id, k.key)}
                        >
                          {copiedKeyId === k.id ? <Check style={{ width: 14, height: 14, color: "#10B981" }} /> : <Copy style={{ width: 14, height: 14 }} />}
                          {copiedKeyId === k.id ? "Copied" : "Copy"}
                        </button>
                        <button
                          class="icon-btn"
                          style={{ color: "#EF4444" }}
                          title="Revoke Key"
                          onClick={() => onRevokeApiKey(company.id, k.id)}
                        >
                          <Trash2 style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Consent Stats */}
          {activeTab === "analytics" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ padding: "16px", border: "1px solid #E2E8F0", borderRadius: "10px", background: "#F8FAFC" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>TOTAL CONSENT REQUESTS</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#FF6B00" }}>14,280</div>
                </div>
                <div style={{ padding: "16px", border: "1px solid #E2E8F0", borderRadius: "10px", background: "#F8FAFC" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 700 }}>OPT-IN ACCEPTANCE RATE</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10B981" }}>74.8%</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Audit Trail */}
          {activeTab === "audit" && (
            <div>
              <table class="data-table" style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Customer (MSISDN)</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companyLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", padding: "20px", color: "#94A3B8" }}>
                        No audit logs recorded for this company yet.
                      </td>
                    </tr>
                  ) : (
                    companyLogs.map((log) => (
                      <tr key={log.id}>
                        <td class="cell-muted">{log.timestamp}</td>
                        <td class="cell-bold">{log.phone}</td>
                        <td>{log.category}</td>
                        <td>
                          <span class={`status-pill ${log.action.includes("Granted") ? "registered" : "rejected"}`}>
                            {log.action}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
