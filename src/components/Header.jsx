import React from "react";
import { Wifi, Search, Bot, Moon, Sun } from "lucide-react";

export default function Header({
  searchGlobal,
  setSearchGlobal,
  onOpenAiCopilot,
  onOpenUserProfile,
  currentUser,
  lang,
  setLang,
  theme,
  setTheme
}) {
  return (
    <header class="top-navbar">
      {/* Search Input */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "320px" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
          <input
            type="text"
            class="search-input"
            placeholder={lang === "km" ? "ស្វែងរកទូទាំងប្រព័ន្ធ..." : "Search across platform..."}
            value={searchGlobal}
            onChange={(e) => setSearchGlobal(e.target.value)}
          />
        </div>
      </div>

      {/* Header Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Language Selector */}
        <button
          class="btn btn-secondary"
          style={{ padding: "6px 12px", fontSize: "0.78rem", borderRadius: "20px" }}
          onClick={() => setLang(lang === "en" ? "km" : "en")}
        >
          {lang === "en" ? "🇬🇧 EN" : "🇰🇭 ខ្មែរ"}
        </button>

        {/* Theme Switcher */}
        <button
          class="icon-btn"
          title="Toggle Theme Mode"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon style={{ width: 16, height: 16 }} /> : <Sun style={{ width: 16, height: 16, color: "#F59E0B" }} />}
        </button>

        {/* AI Copilot Launcher Button */}
        <button
          class="btn btn-primary pulse-ai"
          style={{ background: "linear-gradient(135deg, #FF6B00 0%, #E56000 100%)", borderRadius: "20px", padding: "6px 14px", fontSize: "0.8rem" }}
          onClick={onOpenAiCopilot}
        >
          <Bot style={{ width: 16, height: 16 }} /> AI Copilot
        </button>

        <button
          style={{
            border: "none",
            background: "#FFF3EB",
            color: "#FF6B00",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          title="Cellcard Telecom Status: 100% Operational"
        >
          <Wifi style={{ width: 18, height: 18 }} />
        </button>

        {/* Admin Profile Trigger */}
        <button
          onClick={onOpenUserProfile}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingLeft: "12px",
            borderLeft: "1px solid var(--color-border)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#FF6B00", color: "#FFFFFF", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", boxShadow: "0 2px 6px rgba(255,107,0,0.3)" }}>
            CC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-main)" }}>{currentUser?.name || "Admin Cellcard"}</span>
            <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{currentUser?.employeeId || "CC-ADM-0091"}</span>
          </div>
        </button>
      </div>
    </header>
  );
}
