import React, { useState } from "react";
import { Bot, Sparkles, X, Send, AlertTriangle, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function AiComplianceCopilot({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your Cellcard AI Compliance Copilot. I continuously monitor consent telemetry, NBC telecom regulatory standards, and partner API security."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = { sender: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQuery("");
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "Analyzing platform telemetry across Cambodia telecom regions...";

      if (q.toLowerCase().includes("wing bank") || q.toLowerCase().includes("pending")) {
        responseText = "AI Assessment for Wing Bank: Tax ID K002-901827461 verified against General Department of Taxation database. Compliance Risk Score: LOW (0.04). Recommendation: Ready for approval.";
      } else if (q.toLowerCase().includes("opt-out") || q.toLowerCase().includes("trend")) {
        responseText = "Opt-Out Anomaly Analysis: Detected a +34% opt-out spike in Siem Reap region over the past 2 hours, primarily driven by USSD SMS promo channel. Recommended action: Adjust SMS frequency caps.";
      } else if (q.toLowerCase().includes("gdpr") || q.toLowerCase().includes("nbc") || q.toLowerCase().includes("compliance")) {
        responseText = "Cellcard Regulatory Compliance Rating: 98.4% (EXCELLENT). Fully compliant with NBC Law on Telecommunications & Sub-Decree on Personal Data Protection in Telecom Sector.";
      } else {
        responseText = `AI Insight on "${q}": All 4 active platform integrations (Web, App, SMS, REST API) are operating within normal SLA latency (<45ms). Zero consent revocation breaches detected.`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div class="drawer-overlay" onClick={onClose}>
      <div class="drawer-container" style={{ maxWidth: "520px" }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div class="drawer-header" style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", color: "#FFFFFF" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ padding: "8px", borderRadius: "10px", background: "#FF6B00", color: "#FFFFFF" }}>
              <Bot style={{ width: 20, height: 20 }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Cellcard AI Copilot</h3>
              <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Powered by Gemini 1.5 Telecom Intelligence</span>
            </div>
          </div>
          <button class="icon-btn" style={{ background: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "none" }} onClick={onClose}>
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Body & Chat */}
        <div class="drawer-body" style={{ display: "flex", flexContent: "column", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ overflowY: "auto", flex: 1, paddingRight: "4px" }}>
            {/* Live Automated Risk Summary Cards */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94A3B8", marginBottom: "8px", textTransform: "uppercase" }}>
                Live Automated Compliance Alerts
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ padding: "12px", borderRadius: "10px", background: "#FEF2F2", border: "1px solid #FECACA", fontSize: "0.82rem", color: "#991B1B", display: "flex", gap: "10px" }}>
                  <AlertTriangle style={{ width: 18, height: 18, flexShrink: 0, color: "#DC2626" }} />
                  <div>
                    <strong>Opt-Out Anomaly:</strong> Siem Reap cell cluster spike (+34% opt-out).
                  </div>
                </div>

                <div style={{ padding: "12px", borderRadius: "10px", background: "#F0FDF4", border: "1px solid #BBF7D0", fontSize: "0.82rem", color: "#166534", display: "flex", gap: "10px" }}>
                  <ShieldCheck style={{ width: 18, height: 18, flexShrink: 0, color: "#16A34A" }} />
                  <div>
                    <strong>NBC Compliance Score:</strong> 98.4% (GDPR & National Bank Telecommunications Standard).
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius: m.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background: m.sender === "user" ? "#FF6B00" : "#F1F5F9",
                    color: m.sender === "user" ? "#FFFFFF" : "#1E293B",
                    fontSize: "0.85rem",
                    lineHeight: "1.45"
                  }}
                >
                  {m.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: "flex-start", fontSize: "0.8rem", color: "#64748B", fontStyle: "italic" }}>
                  AI is analyzing telemetry data...
                </div>
              )}
            </div>
          </div>

          {/* Quick Prompts & Input Bar */}
          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "16px" }}>
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "10px", marginBottom: "8px" }}>
              {["Check Wing Bank", "Analyze Opt-out trends", "Compliance Score"].map((prompt, i) => (
                <button
                  key={i}
                  class="btn btn-secondary"
                  style={{ padding: "4px 10px", fontSize: "0.74rem", whiteSpace: "nowrap" }}
                  onClick={() => handleSend(prompt)}
                >
                  <Sparkles style={{ width: 12, height: 12, color: "#FF6B00" }} /> {prompt}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                class="form-input"
                placeholder="Ask AI Compliance Copilot..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button class="btn btn-primary" onClick={() => handleSend()}>
                <Send style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
