import React, { useState } from "react";
import { Terminal, Play, CheckCircle2, RefreshCw } from "lucide-react";

export default function ApiSimulator({ onSimulateEvent, addToast }) {
  const [partner, setPartner] = useState("Wing Bank");
  const [msisdn, setMsisdn] = useState("+855 12 998 456");
  const [category, setCategory] = useState("Connectivity");
  const [actionType, setActionType] = useState("Opt-In Granted");
  const [isSending, setIsSending] = useState(false);
  const [lastPayload, setLastPayload] = useState(null);

  const handleRunSimulation = () => {
    setIsSending(true);

    const payload = {
      event_id: `evt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      partner_company: partner,
      customer_msisdn: msisdn,
      consent_category: category,
      action: actionType,
      channel: "REST API Gateway",
      client_ip: "175.100.12.99"
    };

    setTimeout(() => {
      setLastPayload(payload);
      onSimulateEvent(payload);
      setIsSending(false);
      addToast(`Simulated REST API event: ${actionType} for ${partner}`);
    }, 700);
  };

  return (
    <div class="content-card" style={{ marginTop: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <Terminal style={{ width: 20, height: 20, color: "#FF6B00" }} />
        <h2 class="card-title" style={{ margin: 0 }}>Live API Webhook & Event Simulator</h2>
      </div>

      <p style={{ fontSize: "0.83rem", color: "#64748B", marginBottom: "20px" }}>
        Developer sandbox to test API integrations. Dispatched events are streamed directly into the real-time Cellcard Audit Log Engine.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Controls Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div class="form-group" style={{ margin: 0 }}>
            <label class="form-label">Partner Company</label>
            <select class="form-input" value={partner} onChange={(e) => setPartner(e.target.value)}>
              <option value="Wing Bank">Wing Bank</option>
              <option value="Acleda Bank Plc">Acleda Bank Plc</option>
              <option value="Chip Mong Group">Chip Mong Group</option>
              <option value="Smart Axiata Co.">Smart Axiata Co.</option>
            </select>
          </div>

          <div class="form-group" style={{ margin: 0 }}>
            <label class="form-label">Target Customer MSISDN</label>
            <input type="text" class="form-input" value={msisdn} onChange={(e) => setMsisdn(e.target.value)} />
          </div>

          <div class="form-group" style={{ margin: 0 }}>
            <label class="form-label">Consent Category</label>
            <select class="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Connectivity">Connectivity</option>
              <option value="Location Insight">Location Insight</option>
              <option value="Web/App Insight">Web/App Insight</option>
              <option value="3rd Party Financial Data">3rd Party Financial Data</option>
            </select>
          </div>

          <div class="form-group" style={{ margin: 0 }}>
            <label class="form-label">Simulated Action</label>
            <select class="form-input" value={actionType} onChange={(e) => setActionType(e.target.value)}>
              <option value="Opt-In Granted">Opt-In Granted</option>
              <option value="Opt-Out Revoked">Opt-Out Revoked</option>
            </select>
          </div>

          <button class="btn btn-primary" onClick={handleRunSimulation} disabled={isSending} style={{ marginTop: "8px" }}>
            {isSending ? <RefreshCw style={{ width: 14, height: 14 }} class="pulse-ai" /> : <Play style={{ width: 14, height: 14 }} />}
            {isSending ? "Dispatching Webhook Payload..." : "Fire Synthetic API Event"}
          </button>
        </div>

        {/* Console / JSON Payload Output */}
        <div style={{ background: "#0F172A", borderRadius: "12px", padding: "16px", color: "#F8FAFC", fontFamily: "monospace", fontSize: "0.78rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#94A3B8", borderBottom: "1px solid #334155", paddingBottom: "8px", marginBottom: "12px" }}>
              <span>POST /api/v1/consent/authorize</span>
              <span style={{ color: "#10B981", fontWeight: 700 }}>200 OK</span>
            </div>

            <pre style={{ color: "#38BDF8", overflowX: "auto" }}>
              {lastPayload
                ? JSON.stringify(lastPayload, null, 2)
                : `// Click "Fire Synthetic API Event" to send payload...\n{\n  "status": "ready"\n}`}
            </pre>
          </div>

          <div style={{ fontSize: "0.72rem", color: "#64748B", paddingTop: "12px", borderTop: "1px solid #1E293B" }}>
            Response Latency: <strong>32ms</strong> • Cellcard API Gateway v2.4
          </div>
        </div>
      </div>
    </div>
  );
}
