import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  MoreVertical,
  RotateCw,
  Eye,
  CheckCircle2,
  XCircle,
  Plus,
  Building2
} from "lucide-react";

export default function CompanyManagementView({
  pendingCompanies,
  registeredCompanies,
  onOpenDrawer,
  onOpenRegisterModal,
  onApproveCompany,
  onRevisionCompany,
  onRejectCompany
}) {
  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "registered"
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [sortField, setSortField] = useState("fullName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Pick dataset based on tab
  const currentList = activeTab === "pending" ? pendingCompanies : registeredCompanies;

  // Filter logic
  const filteredList = currentList.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyPhone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "All Status" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sorting
  const sortedList = [...filteredList].sort((a, b) => {
    const valA = (a[sortField] || "").toString().toLowerCase();
    const valB = (b[sortField] || "").toString().toLowerCase();

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleActionMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div class="company-management-page" onClick={() => setOpenMenuId(null)}>
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 class="page-title">Company Management</h1>
        <button class="btn btn-primary" onClick={onOpenRegisterModal}>
          <Plus style={{ width: 16, height: 16 }} /> Register Enterprise Partner
        </button>
      </div>

      <div class="content-card">
        {/* Toolbar: Tabs left, Filters & Pagination Right */}
        <div class="table-toolbar">
          <div class="toolbar-left">
            {/* Tabs */}
            <div class="tab-group">
              <button
                class={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("pending");
                  setCurrentPage(1);
                }}
              >
                <span>Pending Companies</span>
                <span class="badge-count pending">{pendingCompanies.filter(c => c.status === "Pending").length}</span>
              </button>
              <button
                class={`tab-btn ${activeTab === "registered" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("registered");
                  setCurrentPage(1);
                }}
              >
                <span>Registered Companies</span>
                <span class="badge-count registered">{registeredCompanies.length}</span>
              </button>
            </div>

            {/* Search */}
            <div class="search-input-wrapper">
              <Search class="search-icon" />
              <input
                type="text"
                class="search-input"
                placeholder="Search company, name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter Dropdown */}
            <div class="custom-select" style={{ minWidth: 120 }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Registered">Registered</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown style={{ width: 14, height: 14, color: "#94A3B8" }} />
            </div>
          </div>

          <div class="toolbar-right">
            {/* Items per page */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#64748B" }}>
              <span>Items per page</span>
              <div class="custom-select" style={{ minWidth: 70, padding: "4px 8px" }}>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
              </div>
            </div>

            <div class="pagination-info">
              1-{sortedList.length} of {sortedList.length}
            </div>

            <div class="pagination-nav">
              <button class="icon-btn" disabled={currentPage === 1}>
                <ChevronLeft style={{ width: 16, height: 16 }} />
              </button>
              <button class="icon-btn" disabled>
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("fullName")}>
                  <div class="th-content">
                    Full Name <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th onClick={() => handleSort("companyName")}>
                  <div class="th-content">
                    Company Name <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th onClick={() => handleSort("companyEmail")}>
                  <div class="th-content">
                    Company Email <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th onClick={() => handleSort("industry")}>
                  <div class="th-content">
                    Industry <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th onClick={() => handleSort("companyPhone")}>
                  <div class="th-content">
                    Company Phone <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th onClick={() => handleSort("companyAddress")}>
                  <div class="th-content">
                    Company Address <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th onClick={() => handleSort("status")}>
                  <div class="th-content">
                    Status <ArrowUpDown style={{ width: 12, height: 12, color: "#94A3B8" }} />
                  </div>
                </th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "32px", color: "#94A3B8" }}>
                    No companies found matching criteria.
                  </td>
                </tr>
              ) : (
                sortedList.map((company) => (
                  <tr
                    key={company.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenDrawer(company)}
                  >
                    <td class="cell-bold">{company.fullName}</td>
                    <td class="cell-muted" style={{ fontWeight: 700, color: "#1E293B" }}>
                      {company.companyName}
                    </td>
                    <td class="cell-muted" style={{ color: "#3B82F6" }}>
                      {company.companyEmail}
                    </td>
                    <td class="cell-muted">{company.industry}</td>
                    <td class="cell-muted">{company.companyPhone}</td>
                    <td
                      class="cell-muted"
                      style={{ maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {company.companyAddress}
                    </td>
                    <td>
                      {company.status === "Pending" && (
                        <span class="status-pill pending">
                          <RotateCw style={{ width: 12, height: 12 }} />
                          Pending
                        </span>
                      )}
                      {company.status === "Registered" && (
                        <span class="status-pill registered">
                          <CheckCircle2 style={{ width: 12, height: 12 }} />
                          Registered
                        </span>
                      )}
                      {company.status === "Rejected" && (
                        <span class="status-pill rejected">
                          <XCircle style={{ width: 12, height: 12 }} />
                          Rejected
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                      <div class="action-wrapper">
                        <button
                          class="action-menu-btn"
                          onClick={(e) => toggleActionMenu(e, company.id)}
                        >
                          <MoreVertical style={{ width: 16, height: 16 }} />
                        </button>

                        {openMenuId === company.id && (
                          <div class="action-dropdown">
                            <button
                              class="dropdown-item"
                              onClick={() => {
                                setOpenMenuId(null);
                                onOpenDrawer(company);
                              }}
                            >
                              <Eye style={{ width: 14, height: 14 }} /> View Profile
                            </button>
                            {company.status === "Pending" && (
                              <>
                                <button
                                  class="dropdown-item"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onApproveCompany(company);
                                  }}
                                >
                                  <CheckCircle2 style={{ width: 14, height: 14, color: "#10B981" }} /> Approve
                                </button>
                                <button
                                  class="dropdown-item"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onRevisionCompany(company);
                                  }}
                                >
                                  <RotateCw style={{ width: 14, height: 14, color: "#F59E0B" }} /> Revision
                                </button>
                                <button
                                  class="dropdown-item danger"
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    onRejectCompany(company);
                                  }}
                                >
                                  <XCircle style={{ width: 14, height: 14 }} /> Reject
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
