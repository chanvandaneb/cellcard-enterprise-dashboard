# 📶 Cellcard Enterprise Consent & Partner Management Platform

![Cellcard Enterprise Portal](https://img.shields.io/badge/Cellcard-Royal%20Group-orange?style=for-the-badge&logo=cellcard)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-SVG-22C55E?style=for-the-badge)
![Status](https://img.shields.io/badge/Compliance-NBC%20%26%20TRC%20Verified-blue?style=for-the-badge)

A state-of-the-art **Enterprise Consent & Partner Management Dashboard** designed for **Cellcard (Royal Group Cambodia)**. This platform enables real-time telecommunications consent telemetry monitoring, automated regulatory compliance auditing, partner API credential provision, and customer consent management across mobile app, web, USSD, and SMS channels.

---

## 🌟 Key Features & Capabilities

### 🔐 1. Enterprise Authentication Gateway
- **Gated Access**: Secure Login View with work email, password, and 2FA OTP code verification (`654-102`).
- **1-Click Quick Demo Login**: Instant entry button for testing without typing credentials.
- **Detailed Admin User Profile**: Employee ID (`CC-ADM-0091`), Department (*Telecom Compliance & API Security*), direct supervisor details, 2FA status, and active session device manager.

### 📊 2. Interactive Analytics Dashboard
- **4 Key Performance Indicator (KPI) Metric Cards**:
  - **Total Consents**: `45,230` (`↗ 19.6%`)
  - **Opt-In Rate**: `67.4%` (`↘ 19.6%`)
  - **Opt-Out Rate**: `32.6%` (`↗ 19.6%`)
  - **Active Consents**: `30,485` (`↘ 19.6%`)
- **Dual Chart Visualization**:
  - **Consent by Category**: Grouped SVG bar chart comparing Pt-in (orange) vs Opt-out (amber) across *Connectivity*, *Location Insight*, and *Web/App Insight*.
  - **Consent Traffic Timeline**: Continuous Area Chart displaying day/week consent trends.
- **Regional Distribution Breakdown**: Telemetry mapping for Phnom Penh (54%), Siem Reap (18%), Battambang (14%), Sihanoukville (9%), and Kampong Cham (5%).
- **One-Click CSV Report Exporter**: Download summary reports based on active timeframe filters.

### 🏢 3. Enterprise Partner Onboarding & Slide-Over Drawer
- **Tabbed Queues**: Separate management for `Pending Companies [2]` and `Registered Companies [6]`.
- **Multi-Step Onboarding Modal**: Register partner companies with Tax/Business ID, representative info, contact details, and industry sector.
- **Slide-Over Company Details Drawer**:
  - **Overview**: Business metadata, SLA tier, and API rate limit quotas.
  - **API Credentials**: Generate live production (`cellcard_live_...`) or sandbox keys, copy to clipboard, and revoke active tokens.
  - **Consent Stats & Audit Trail**: Company-specific consent analytics and audit log entries.

### 🤖 4. Cellcard AI Compliance Copilot
- **Automated Risk Anomaly Detection**: Highlights opt-out spikes (e.g. *Siem Reap cell cluster +34% opt-out*) and rate limit warnings.
- **NBC & GDPR Regulatory Rating**: Automated 98.4% compliance score.
- **Interactive Q&A Assistant**: Instant answers for compliance questions and partner risk assessments.

### 🇰🇭 5. Customer Mobile Sandbox & Khmer (ភាសាខ្មែរ) Localization
- **Smartphone Device Preview**: Visual mockup showing how consent prompts render on end-user iOS & Android devices.
- **Bilingual Support**: Toggle between **English 🇬🇧** and **Khmer 🇰🇭 ភាសាខ្មែរ** regulated by the Telecommunication Regulator of Cambodia (TRC).

### ⚡ 6. Live API Webhook & Event Simulator
- **Developer API Sandbox**: Test REST API requests (`POST /api/v1/consent/authorize`).
- **Real-Time Log Streamer**: Synthetic API events stream live into the Consent Audit Log table with latency tracking (32ms).

### 🌙 7. Cyber Dark & Light Theme Engine
- **Seamless Customization**: One-click header toggle between Enterprise Light Mode and Cyber Dark Mode (`[data-theme="dark"]`).

---

## 📂 Project Directory Architecture

```text
cellcard-enterprise-dashboard/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ActionModals.jsx            # Confirm/Reject modals
│   │   ├── AiComplianceCopilot.jsx     # AI Copilot assistant drawer
│   │   ├── ApiSimulator.jsx            # Real-time API event simulator
│   │   ├── CompanyDetailsDrawer.jsx    # Slide-over company profile drawer
│   │   ├── CompanyManagementView.jsx   # Tabbed partner table with search & sort
│   │   ├── ConsentPolicyBuilder.jsx    # Customer mobile preview with Khmer text
│   │   ├── DashboardView.jsx           # Recharts analytics & regional map
│   │   ├── Header.jsx                  # Top navigation bar with theme & lang toggles
│   │   ├── LoginView.jsx               # Enterprise login gateway
│   │   ├── OtherViews.jsx              # Platforms, Audit Logs, RBAC & Settings
│   │   ├── RegisterCompanyModal.jsx    # Multi-step partner onboarding form
│   │   ├── Sidebar.jsx                # Left navigation sidebar
│   │   ├── Toast.jsx                   # Floating notification system
│   │   └── UserProfileModal.jsx        # Admin profile drawer with employee ID
│   ├── App.jsx                         # Main app orchestrator & state manager
│   ├── index.css                       # Design tokens & dark/light theme variables
│   ├── main.jsx                        # React entrypoint
│   └── mockData.js                     # Mock datasets & initial telemetry
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0 or higher
- `npm` or `yarn`

### Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chanvandaneb/cellcard-enterprise-dashboard.git
   cd cellcard-enterprise-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5174/](http://localhost:5174/) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Account Credentials

| Field | Demo Credential |
| :--- | :--- |
| **Work Email** | `admin@cellcard.com.kh` |
| **Password** | `••••••••` (any password) |
| **2FA Verification Code** | `654 102` |
| **Employee ID** | `CC-ADM-0091` |
| **Quick Option** | Click **"⚡ 1-Click Demo Login as Admin"** |

---

## 📜 Regulatory Standards Compliance
- **NBC Sub-Decree**: National Bank of Cambodia Data Security & Open Banking Interoperability Standard.
- **TRC Regulation**: Telecommunication Regulator of Cambodia Personal Data Protection Framework.

---

## 📄 License
This project is proprietary software developed for Cellcard (Royal Group Cambodia). All rights reserved.
