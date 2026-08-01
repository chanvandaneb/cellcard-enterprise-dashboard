import React, { useState } from "react";
import { X, Building2, Plus } from "lucide-react";

export default function RegisterCompanyModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    companyEmail: "",
    industry: "Financial",
    companyPhone: "",
    companyAddress: "",
    taxId: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.fullName || !formData.companyEmail) return;

    onSubmit(formData);
    setFormData({
      fullName: "",
      companyName: "",
      companyEmail: "",
      industry: "Financial",
      companyPhone: "",
      companyAddress: "",
      taxId: ""
    });
  };

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Building2 style={{ width: 20, height: 20, color: "#FF6B00" }} />
            <h3 class="modal-title">Register New Enterprise Partner</h3>
          </div>
          <button class="icon-btn" onClick={onClose}><X style={{ width: 16, height: 16 }} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div class="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div class="form-group">
              <label class="form-label">Representative Name *</label>
              <input
                type="text"
                class="form-input"
                placeholder="e.g. Vanda K."
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Company Name *</label>
              <input
                type="text"
                class="form-input"
                placeholder="e.g. ABA Bank Plc"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Company Email *</label>
              <input
                type="email"
                class="form-input"
                placeholder="e.g. partner@ababank.com"
                value={formData.companyEmail}
                onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Company Phone</label>
              <input
                type="text"
                class="form-input"
                placeholder="+855 23 123 456"
                value={formData.companyPhone}
                onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
              />
            </div>

            <div class="form-group">
              <label class="form-label">Industry Sector</label>
              <select
                class="form-input"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              >
                <option value="Financial">Banking & Financial</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Food & Beverage">Food & Beverage / Retail</option>
                <option value="Logistics">Logistics & Transportation</option>
                <option value="Healthcare">Healthcare & Insurance</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Tax / Business ID</label>
              <input
                type="text"
                class="form-input"
                placeholder="e.g. K003-88992211"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              />
            </div>

            <div class="form-group" style={{ gridColumn: "span 2" }}>
              <label class="form-label">Registered Office Address</label>
              <input
                type="text"
                class="form-input"
                placeholder="#123, Monivong Blvd, Phnom Penh"
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
              />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" class="btn btn-primary">
              <Plus style={{ width: 14, height: 14 }} /> Register Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
