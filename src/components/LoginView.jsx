import React, { useState } from "react";
import { Lock, Mail, ShieldCheck, ArrowRight, KeyRound, Wifi, Sparkles } from "lucide-react";

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState("admin@cellcard.com.kh");
  const [password, setPassword] = useState("••••••••");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [require2FA, setRequire2FA] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (!require2FA) {
        setRequire2FA(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onLoginSuccess({
          name: "Vanda K.",
          email: email,
          role: "Super Administrator",
          employeeId: "CC-ADM-0091"
        });
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: "Vanda K.",
        email: "admin@cellcard.com.kh",
        role: "Super Administrator",
        employeeId: "CC-ADM-0091"
      });
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Telecom Pulse Orbs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(255,107,0,0) 70%)",
          top: "-100px",
          right: "-100px",
          pointerEvents: "none"
        }}
      ></div>

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden"
        }}
      >
        {/* Header Branding */}
        <div style={{ background: "linear-gradient(135deg, #FF6B00 0%, #E56000 100%)", padding: "32px 28px", color: "#FFFFFF", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="white" />
              <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="2.5" fill="#FF6B00" />
            </svg>
            <span style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em" }}>cellcard</span>
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.9 }}>ENTERPRISE CONSENT PORTAL</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.75, marginTop: "2px" }}>Sign in to access admin control center</div>
        </div>

        {/* Login Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
          {!require2FA ? (
            <>
              <div class="form-group">
                <label class="form-label" style={{ color: "#334155" }}>Work Email</label>
                <div style={{ position: "relative" }}>
                  <Mail style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
                  <input
                    type="email"
                    class="form-input"
                    style={{ paddingLeft: "36px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label class="form-label" style={{ color: "#334155" }}>Password</label>
                  <a href="#forgot" style={{ fontSize: "0.78rem", color: "#FF6B00", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
                </div>
                <div style={{ position: "relative" }}>
                  <Lock style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
                  <input
                    type="password"
                    class="form-input"
                    style={{ paddingLeft: "36px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#64748B", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember session (30 days)
                </label>
              </div>
            </>
          ) : (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <KeyRound style={{ width: 32, height: 32, color: "#FF6B00", marginBottom: "6px" }} />
                <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>Two-Factor Authentication</h4>
                <p style={{ fontSize: "0.8rem", color: "#64748B" }}>Enter the 6-digit verification code from your Cellcard Authenticator app.</p>
              </div>

              <div class="form-group">
                <label class="form-label" style={{ textAlign: "center" }}>6-Digit 2FA Code</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g. 654 102"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  style={{ textAlign: "center", fontSize: "1.2rem", letterSpacing: "4px", fontWeight: 700 }}
                  autoFocus
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            class="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: "0.9rem", marginBottom: "12px" }}
            disabled={isLoading}
          >
            {isLoading ? "Verifying Credentials..." : require2FA ? "Verify & Enter Portal" : "Sign In"}
            {!isLoading && <ArrowRight style={{ width: 16, height: 16 }} />}
          </button>

          {/* Quick Demo Login Pill */}
          <button
            type="button"
            class="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center", padding: "9px", fontSize: "0.82rem", background: "#FFF3EB", color: "#FF6B00", borderColor: "#FFD4BA" }}
            onClick={handleQuickDemoLogin}
          >
            <Sparkles style={{ width: 14, height: 14 }} /> 1-Click Demo Login as Admin
          </button>

          {/* Compliance Security Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.72rem", color: "#94A3B8", marginTop: "24px" }}>
            <ShieldCheck style={{ width: 14, height: 14, color: "#10B981" }} />
            <span>Encrypted 256-bit TLS • TRC & NBC Telecommunications Standard</span>
          </div>
        </form>
      </div>
    </div>
  );
}
