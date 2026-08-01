import React, { useState } from "react";
import { Smartphone, Globe, Check, Eye } from "lucide-react";

export default function ConsentPolicyBuilder({ lang, setLang }) {
  const [activeCategory, setActiveCategory] = useState("Connectivity");
  const [optInState, setOptInState] = useState(true);

  // Translations for mobile preview prompt
  const localizedContent = {
    en: {
      appName: "Cellcard Customer Portal",
      promptTitle: "Data Consent Authorization",
      promptSubtitle: "Wing Bank request for Consent",
      bodyText: "By granting consent, you permit Wing Bank to securely query your Cellcard mobile connectivity tier to accelerate your loan application.",
      grantBtn: "Authorize Consent",
      denyBtn: "Decline Opt-Out",
      footerText: "Regulated by Telecommunication Regulator of Cambodia (TRC)."
    },
    km: {
      appName: "កម្មវិធីសែលកាត (Cellcard App)",
      promptTitle: "ការអនុញ្ញាតការយល់ព្រមលើទិន្នន័យ",
      promptSubtitle: "សំណើយល់ព្រមពី ធនាគារ វីង (Wing Bank)",
      bodyText: "តាមរយៈការផ្តល់ការយល់ព្រមនេះ អ្នកអនុញ្ញាតឱ្យ ធនាគារ វីង ពិនិត្យមើលកម្រិតសេវាសែលកាតរបស់អ្នក ដើម្បីពន្លឿនការស្នើសុំកម្ចី។",
      grantBtn: "យល់ព្រមផ្តល់ការអនុញ្ញាត",
      denyBtn: "បដិសេធ (Opt-Out)",
      footerText: "គ្រប់គ្រងដោយ អាជ្ញាធរធរមានសមត្ថកិច្ចទូរគមនាគមន៍កម្ពុជា (TRC)"
    }
  };

  const t = localizedContent[lang] || localizedContent.en;

  return (
    <div class="content-card" style={{ marginTop: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 class="card-title" style={{ margin: 0 }}>Customer Mobile Prompt Sandbox</h2>
          <p style={{ fontSize: "0.82rem", color: "#64748B" }}>
            Visual preview of how customer consent prompts appear on end-user iOS & Android smartphones.
          </p>
        </div>

        {/* Language switcher pill inside component */}
        <div class="tab-group" style={{ padding: "3px" }}>
          <button
            class={`tab-btn ${lang === "en" ? "active" : ""}`}
            style={{ padding: "4px 12px", fontSize: "0.78rem" }}
            onClick={() => setLang("en")}
          >
            🇬🇧 English
          </button>
          <button
            class={`tab-btn ${lang === "km" ? "active" : ""}`}
            style={{ padding: "4px 12px", fontSize: "0.78rem" }}
            onClick={() => setLang("km")}
          >
            🇰🇭 ភាសាខ្មែរ
          </button>
        </div>
      </div>

      {/* Mobile Device Mockup */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#F8FAFC", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
        <div
          style={{
            width: "320px",
            height: "560px",
            background: "#0F172A",
            borderRadius: "36px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            border: "8px solid #334155",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Notch */}
          <div style={{ width: "100px", height: "18px", background: "#334155", borderRadius: "0 0 12px 12px", margin: "0 auto 12px auto" }}></div>

          {/* Screen Body */}
          <div style={{ flex: 1, background: "#FFFFFF", borderRadius: "20px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FF6B00", color: "#FFF", fontSize: "10px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>CC</div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748B" }}>{t.appName}</span>
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A", marginBottom: "4px" }}>{t.promptTitle}</h4>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#FF6B00", marginBottom: "12px" }}>{t.promptSubtitle}</div>

              <div style={{ padding: "12px", background: "#FFF3EB", border: "1px solid #FFD4BA", borderRadius: "10px", fontSize: "0.78rem", color: "#334155", lineHeight: "1.4", marginBottom: "16px" }}>
                {t.bodyText}
              </div>
            </div>

            <div>
              <button
                class="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", marginBottom: "8px", fontSize: "0.8rem", padding: "10px" }}
                onClick={() => setOptInState(!optInState)}
              >
                <Check style={{ width: 14, height: 14 }} /> {t.grantBtn}
              </button>
              <button
                class="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.78rem", padding: "8px" }}
              >
                {t.denyBtn}
              </button>

              <div style={{ textAlign: "center", fontSize: "0.62rem", color: "#94A3B8", marginTop: "12px" }}>
                {t.footerText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
