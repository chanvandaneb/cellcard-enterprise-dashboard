import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginView from "./components/LoginView";
import UserProfileModal from "./components/UserProfileModal";
import DashboardView from "./components/DashboardView";
import CompanyManagementView from "./components/CompanyManagementView";
import CompanyDetailsDrawer from "./components/CompanyDetailsDrawer";
import RegisterCompanyModal from "./components/RegisterCompanyModal";
import AiComplianceCopilot from "./components/AiComplianceCopilot";
import {
  PlatformsView,
  ConsentCategoriesView,
  ConsentLogsView,
  ReportsView,
  TeamMembersView,
  SettingsView
} from "./components/OtherViews";
import {
  ApproveCompanyModal,
  RejectCompanyModal
} from "./components/ActionModals";
import Toast from "./components/Toast";

import {
  INITIAL_PENDING_COMPANIES,
  INITIAL_REGISTERED_COMPANIES,
  INITIAL_AUDIT_LOGS
} from "./mockData";

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Vanda K.",
    email: "admin@cellcard.com.kh",
    role: "Super Administrator",
    employeeId: "CC-ADM-0091"
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingCompanies, setPendingCompanies] = useState(INITIAL_PENDING_COMPANIES);
  const [registeredCompanies, setRegisteredCompanies] = useState(INITIAL_REGISTERED_COMPANIES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Localization & Theme Mode
  const [lang, setLang] = useState("en"); // "en" | "km"
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  const [searchGlobal, setSearchGlobal] = useState("");

  // Drawer & Modal States
  const [drawerCompany, setDrawerCompany] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const [approvingCompany, setApprovingCompany] = useState(null);
  const [rejectingCompany, setRejectingCompany] = useState(null);

  // Toast System
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Auth Handlers
  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    setIsAuthenticated(true);
    addToast(`Welcome back, ${userObj.name}! Signed into Cellcard Portal.`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsUserProfileOpen(false);
    addToast("Logged out of Cellcard Admin session.", "info");
  };

  // Simulated API Event Dispatcher
  const handleSimulateApiEvent = (payload) => {
    const newLogObj = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      phone: payload.customer_msisdn,
      category: payload.consent_category,
      action: payload.action,
      channel: payload.channel,
      company: payload.partner_company,
      ip: payload.client_ip
    };

    setAuditLogs((prev) => [newLogObj, ...prev]);
  };

  // Handlers for Company Onboarding
  const handleRegisterCompanySubmit = (newCompanyData) => {
    const newId = `COMP-P${Date.now()}`;
    const newCompanyObj = {
      id: newId,
      ...newCompanyData,
      status: "Pending",
      registeredDate: new Date().toISOString().split("T")[0],
      apiKeys: []
    };

    setPendingCompanies((prev) => [newCompanyObj, ...prev]);
    setIsRegisterModalOpen(false);
    addToast(`Submitted onboarding application for ${newCompanyData.companyName}!`);
  };

  const handleApproveCompanyConfirm = (company) => {
    setPendingCompanies((prev) => prev.filter((c) => c.id !== company.id));
    const approvedObj = {
      ...company,
      status: "Registered",
      registeredDate: new Date().toISOString().split("T")[0],
      apiKeys: company.apiKeys && company.apiKeys.length > 0 ? company.apiKeys : [
        {
          id: `key-${Date.now()}`,
          name: "Default Live Production Key",
          key: `cellcard_live_${Math.random().toString(36).substring(2, 18)}`,
          created: new Date().toISOString().split("T")[0],
          status: "Active"
        }
      ]
    };

    setRegisteredCompanies((prev) => [approvedObj, ...prev]);
    setApprovingCompany(null);
    if (drawerCompany && drawerCompany.id === company.id) {
      setDrawerCompany(approvedObj);
    }
    addToast(`Approved ${company.companyName} registration! Enterprise API key generated.`);
  };

  const handleRevisionCompany = (company) => {
    addToast(`Revision request sent to ${company.companyEmail}`, "info");
  };

  const handleRejectCompanyConfirm = (company, reason) => {
    setPendingCompanies((prev) =>
      prev.map((c) => (c.id === company.id ? { ...c, status: "Rejected" } : c))
    );
    setRejectingCompany(null);
    addToast(`Rejected registration for ${company.companyName}`, "error");
  };

  // API Key handlers in drawer
  const handleAddApiKey = (companyId, keyName) => {
    const newKeyObj = {
      id: `key-${Date.now()}`,
      name: keyName,
      key: `cellcard_live_${Math.random().toString(36).substring(2, 18)}`,
      created: new Date().toISOString().split("T")[0],
      status: "Active"
    };

    const updateList = (list) =>
      list.map((c) => {
        if (c.id === companyId) {
          const updatedKeys = [...(c.apiKeys || []), newKeyObj];
          const updatedCompany = { ...c, apiKeys: updatedKeys };
          if (drawerCompany && drawerCompany.id === companyId) {
            setDrawerCompany(updatedCompany);
          }
          return updatedCompany;
        }
        return c;
      });

    setRegisteredCompanies(updateList);
    setPendingCompanies(updateList);
    addToast(`Generated new API Key: "${keyName}"`);
  };

  const handleRevokeApiKey = (companyId, keyId) => {
    const updateList = (list) =>
      list.map((c) => {
        if (c.id === companyId) {
          const updatedKeys = (c.apiKeys || []).filter((k) => k.id !== keyId);
          const updatedCompany = { ...c, apiKeys: updatedKeys };
          if (drawerCompany && drawerCompany.id === companyId) {
            setDrawerCompany(updatedCompany);
          }
          return updatedCompany;
        }
        return c;
      });

    setRegisteredCompanies(updateList);
    setPendingCompanies(updateList);
    addToast("API Key revoked successfully.", "error");
  };

  // Export Dashboard CSV
  const handleExportDashboardReport = (timeRange) => {
    const reportText = `CELLCARD ENTERPRISE CONSENT SUMMARY REPORT (${timeRange})\nGenerated: ${new Date().toLocaleString()}\n\nMetric,Value\nTotal Consents,45230\nOpt-In Rate,67.4%\nOpt-Out Rate,32.6%\nActive Consents,30485\n`;
    const blob = new Blob([reportText], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cellcard_Dashboard_Report_${timeRange.replace(/\s+/g, "_")}.csv`;
    a.click();
    addToast(`Exported ${timeRange} summary report to CSV!`);
  };

  // Unauthenticated -> Render Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <LoginView onLoginSuccess={handleLoginSuccess} />
        <Toast toasts={toasts} />
      </>
    );
  }

  return (
    <div class="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCompanies.filter((c) => c.status === "Pending").length}
        registeredCount={registeredCompanies.length}
      />

      {/* Main Layout Area */}
      <div class="main-wrapper">
        <Header
          searchGlobal={searchGlobal}
          setSearchGlobal={setSearchGlobal}
          onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
          onOpenUserProfile={() => setIsUserProfileOpen(true)}
          currentUser={currentUser}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
        />

        <main class="main-content">
          {activeTab === "dashboard" && (
            <DashboardView onExportReport={handleExportDashboardReport} />
          )}

          {activeTab === "company-management" && (
            <CompanyManagementView
              pendingCompanies={pendingCompanies}
              registeredCompanies={registeredCompanies}
              onOpenDrawer={(comp) => setDrawerCompany(comp)}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
              onApproveCompany={(comp) => setApprovingCompany(comp)}
              onRevisionCompany={(comp) => handleRevisionCompany(comp)}
              onRejectCompany={(comp) => setRejectingCompany(comp)}
            />
          )}

          {activeTab === "platforms" && (
            <PlatformsView addToast={addToast} onSimulateEvent={handleSimulateApiEvent} />
          )}
          {activeTab === "consent-categories" && (
            <ConsentCategoriesView addToast={addToast} lang={lang} setLang={setLang} />
          )}
          {activeTab === "consent-logs" && (
            <ConsentLogsView
              auditLogs={auditLogs}
              addToast={addToast}
              onSimulateEvent={handleSimulateApiEvent}
            />
          )}
          {activeTab === "reports" && <ReportsView addToast={addToast} />}
          {activeTab === "team-members" && <TeamMembersView addToast={addToast} />}
          {activeTab === "settings" && <SettingsView addToast={addToast} />}
        </main>
      </div>

      {/* AI Compliance Copilot Widget Drawer */}
      <AiComplianceCopilot
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
      />

      {/* Admin User Profile Modal */}
      <UserProfileModal
        currentUser={currentUser}
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        onLogout={handleLogout}
      />

      {/* Slide-over Company Profile Drawer */}
      <CompanyDetailsDrawer
        company={drawerCompany}
        onClose={() => setDrawerCompany(null)}
        onAddApiKey={handleAddApiKey}
        onRevokeApiKey={handleRevokeApiKey}
        auditLogs={auditLogs}
      />

      {/* Register New Company Onboarding Modal */}
      <RegisterCompanyModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmit={handleRegisterCompanySubmit}
      />

      {/* Confirmation Modals */}
      <ApproveCompanyModal
        company={approvingCompany}
        onConfirm={handleApproveCompanyConfirm}
        onClose={() => setApprovingCompany(null)}
      />

      <RejectCompanyModal
        company={rejectingCompany}
        onConfirm={handleRejectCompanyConfirm}
        onClose={() => setRejectingCompany(null)}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
