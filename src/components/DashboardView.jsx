import React, { useState } from "react";
import { TrendingUp, TrendingDown, ChevronDown, Download, MapPin, BarChart3, LineChart as LineChartIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { INITIAL_DASHBOARD_STATS } from "../mockData";

export default function DashboardView({ onExportReport }) {
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [chartType, setChartType] = useState("category"); // "category" | "timeline"

  const currentStats = INITIAL_DASHBOARD_STATS[timeRange] || INITIAL_DASHBOARD_STATS["Last 7 Days"];

  return (
    <div class="dashboard-page">
      {/* Header & Export Button */}
      <div class="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 class="page-title">Dashboard</h1>
        <button class="btn btn-secondary" onClick={() => onExportReport(timeRange)}>
          <Download style={{ width: 16, height: 16 }} /> Export Summary Report
        </button>
      </div>

      {/* Filter Dropdowns Bar */}
      <div class="controls-bar">
        <div class="custom-select">
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="All Products">All Products</option>
            <option value="Mobile Banking">Mobile Banking</option>
            <option value="Digital Identity">Digital Identity</option>
            <option value="Telco Services">Telco Services</option>
          </select>
          <ChevronDown style={{ width: 16, height: 16, color: "#94A3B8" }} />
        </div>

        <div class="custom-select">
          <select value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)}>
            <option value="All Channels">All Channels</option>
            <option value="Web Portal">Web Portal</option>
            <option value="Mobile App">Mobile App</option>
            <option value="SMS Channel">SMS Channel</option>
          </select>
          <ChevronDown style={{ width: 16, height: 16, color: "#94A3B8" }} />
        </div>

        <div class="custom-select">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
          </select>
          <ChevronDown style={{ width: 16, height: 16, color: "#94A3B8" }} />
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Consents</div>
          <div class="kpi-value">{currentStats.totalConsents}</div>
          <div class="kpi-trend positive">
            <TrendingUp style={{ width: 16, height: 16 }} />
            <span>{currentStats.totalTrend}</span>
          </div>
          <div class="kpi-subtext">From last week</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Opt-In Rate</div>
          <div class="kpi-value">{currentStats.optInRate}</div>
          <div class={`kpi-trend ${currentStats.optInIsUp ? "positive" : "negative"}`}>
            {currentStats.optInIsUp ? <TrendingUp style={{ width: 16, height: 16 }} /> : <TrendingDown style={{ width: 16, height: 16 }} />}
            <span>{currentStats.optInTrend}</span>
          </div>
          <div class="kpi-subtext">From last week</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Opt-Out Rate</div>
          <div class="kpi-value">{currentStats.optOutRate}</div>
          <div class={`kpi-trend ${currentStats.optOutIsUp ? "positive" : "negative"}`}>
            {currentStats.optOutIsUp ? <TrendingUp style={{ width: 16, height: 16 }} /> : <TrendingDown style={{ width: 16, height: 16 }} />}
            <span>{currentStats.optOutTrend}</span>
          </div>
          <div class="kpi-subtext">From last week</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Active Consents</div>
          <div class="kpi-value">{currentStats.activeConsents}</div>
          <div class={`kpi-trend ${currentStats.activeIsUp ? "positive" : "negative"}`}>
            {currentStats.activeIsUp ? <TrendingUp style={{ width: 16, height: 16 }} /> : <TrendingDown style={{ width: 16, height: 16 }} />}
            <span>{currentStats.activeTrend}</span>
          </div>
          <div class="kpi-subtext">From last week</div>
        </div>
      </div>

      {/* Main Grid: Chart Left (2/3 width), Regional Right (1/3 width) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Chart Section */}
        <div class="content-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 class="card-title" style={{ margin: 0 }}>
              {chartType === "category" ? "Consent by Category" : "Consent Traffic Timeline"}
            </h2>

            <div class="tab-group" style={{ padding: "3px" }}>
              <button
                class={`tab-btn ${chartType === "category" ? "active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.78rem" }}
                onClick={() => setChartType("category")}
              >
                <BarChart3 style={{ width: 14, height: 14 }} /> By Category
              </button>
              <button
                class={`tab-btn ${chartType === "timeline" ? "active" : ""}`}
                style={{ padding: "5px 12px", fontSize: "0.78rem" }}
                onClick={() => setChartType("timeline")}
              >
                <LineChartIcon style={{ width: 14, height: 14 }} /> Timeline Trend
              </button>
            </div>
          </div>

          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "category" ? (
                <BarChart data={currentStats.chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="category" tick={{ fill: "#64748B", fontSize: 12, fontWeight: 500 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                  <YAxis ticks={[0, 550, 1100, 1650, 2220]} domain={[0, 2300]} tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }} />
                  <Bar dataKey="optIn" name="Pt-in rate" fill="#FF5500" radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="optOut" name="Opt-out rate" fill="#FFAA00" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              ) : (
                <AreaChart data={currentStats.timelineData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="optInGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5500" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#FF5500" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="optOutGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFAA00" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#FFAA00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="optIn" name="Opt-In Traffic" stroke="#FF5500" fillOpacity={1} fill="url(#optInGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="optOut" name="Opt-Out Traffic" stroke="#FFAA00" fillOpacity={1} fill="url(#optOutGrad)" strokeWidth={2} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "12px", fontSize: "0.82rem", fontWeight: 600, color: "#64748B" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5500", display: "inline-block" }}></span>
              Pt-in rate
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FFAA00", display: "inline-block" }}></span>
              Opt-out rate
            </div>
          </div>
        </div>

        {/* Regional Distribution Widget */}
        <div class="content-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <MapPin style={{ width: 18, height: 18, color: "#FF6B00" }} />
            <h2 class="card-title" style={{ margin: 0, fontSize: "1rem" }}>Regional Consent Distribution</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {(currentStats.regionalData || []).map((r, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", fontWeight: 600, marginBottom: "4px" }}>
                  <span>{r.region}</span>
                  <span style={{ color: "#FF6B00" }}>{r.percentage}% ({r.count})</span>
                </div>
                <div style={{ height: "6px", width: "100%", backgroundColor: "#F1F5F9", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${r.percentage}%`, backgroundColor: i === 0 ? "#FF6B00" : "#F97316", borderRadius: "99px" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
