import React, { useState } from "react";
import { X, CheckCircle2, RotateCw, XCircle, Building2 } from "lucide-react";

export function ViewCompanyModal({ company, onClose }) {
  if (!company) return null;

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-card" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Building2 style={{ width: 20, height: 20, color: "#FF6B00" }} />
            <h3 class="modal-title">Company Details</h3>
          </div>
          <button class="icon-btn" onClick={onClose}><X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div class="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "0.85rem" }}>
            <div>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Full Name</div>
              <div style={{ fontWeight: 700 }}>{company.fullName}</div>
            </div>
            <div>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Company Name</div>
              <div style={{ fontWeight: 700 }}>{company.companyName}</div>
            </div>
            <div>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Email</div>
              <div style={{ fontWeight: 600, color: "#3B82F6" }}>{company.companyEmail}</div>
            </div>
            <div>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Phone</div>
              <div style={{ fontWeight: 600 }}>{company.companyPhone}</div>
            </div>
            <div>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Industry</div>
              <div style={{ fontWeight: 600 }}>{company.industry}</div>
            </div>
            <div>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Status</div>
              <span class={`status-pill ${company.status.toLowerCase()}`}>{company.status}</span>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Company Address</div>
              <div style={{ fontWeight: 500 }}>{company.companyAddress}</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export function ApproveCompanyModal({ company, onConfirm, onClose }) {
  if (!company) return null;

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-card" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 style={{ width: 20, height: 20, color: "#10B981" }} />
            <h3 class="modal-title">Approve Company Registration</h3>
          </div>
          <button class="icon-btn" onClick={onClose}><X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div class="modal-body">
          <p style={{ fontSize: "0.9rem", color: "#334155", marginBottom: "12px" }}>
            Are you sure you want to approve registration for <strong>{company.companyName}</strong> ({company.fullName})?
          </p>
          <div style={{ padding: "12px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px", fontSize: "0.82rem", color: "#166534" }}>
            Approving this company will grant enterprise API access keys and update the company status to Registered.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button class="btn btn-primary" style={{ background: "#10B981" }} onClick={() => onConfirm(company)}>
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}

export function RejectCompanyModal({ company, onConfirm, onClose }) {
  const [reason, setReason] = useState("");

  if (!company) return null;

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-card" onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <XCircle style={{ width: 20, height: 20, color: "#EF4444" }} />
            <h3 class="modal-title">Reject Registration</h3>
          </div>
          <button class="icon-btn" onClick={onClose}><X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div class="modal-body">
          <p style={{ fontSize: "0.9rem", color: "#334155", marginBottom: "12px" }}>
            Please provide a rejection reason for <strong>{company.companyName}</strong>:
          </p>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Incomplete business documentation attached."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
              fontSize: "0.85rem",
              fontFamily: "inherit",
              outline: "none"
            }}
          />
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button class="btn btn-danger" onClick={() => onConfirm(company, reason)}>
            Reject Application
          </button>
        </div>
      </div>
    </div>
  );
}
