export default function PhoneIntegrationPage() {
  return (
    <div className="page-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="page-title" style={{ marginBottom: "24px" }}>Phone Integration for Brian</h1>

      {/* Detected Location Section */}
      <div className="card" style={{ padding: "32px", marginBottom: "32px" }}>
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px", alignItems: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            🌍
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Detected Location: United States</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "4px 0 0 0", display: "flex", alignItems: "center", gap: "4px" }}>
              📍 +16619936669
            </p>
          </div>
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
          We&apos;ve automatically detected your phone number&apos;s country. This helps us provide the correct activation codes for your region.
        </p>

        <div style={{ background: "#fffdf0", border: "1px solid #fef08a", borderRadius: "var(--border-radius-md)", padding: "16px 24px" }}>
          <div style={{ color: "#d97706", fontSize: "14px", fontWeight: "600", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
             <span>❗</span> Need to change your country?
          </div>
          <p style={{ color: "#b45309", fontSize: "13px", marginBottom: "16px" }}>
            Both US and Canada use the same country code (+1). Select the correct country below:
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: "12px" }}>
              🇺🇸 United States
            </button>
            <button className="btn btn-outline" style={{ flex: 1, padding: "12px", background: "white" }}>
              🇨🇦 Canada
            </button>
          </div>
        </div>
      </div>

      {/* Setup Wizard Section */}
      <div className="card" style={{ padding: "48px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)" }}></div>
          <div style={{ width: "32px", height: "1px", background: "var(--border-light)", alignSelf: "center" }}></div>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border-light)" }}></div>
          <div style={{ width: "32px", height: "1px", background: "var(--border-light)", alignSelf: "center" }}></div>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border-light)" }}></div>
          <div style={{ width: "32px", height: "1px", background: "var(--border-light)", alignSelf: "center" }}></div>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border-light)" }}></div>
        </div>

        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Step 1: Disable Voicemail</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "32px", textAlign: "center" }}>
          You need to disable voicemail before setting up call forwarding
        </p>

        <div style={{ width: "100%", maxWidth: "440px", background: "var(--bg-main)", borderRadius: "var(--border-radius-lg)", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", position: "relative" }}>
          {/* Mockup visual of a phone screen */}
          <div style={{ width: "240px", height: "150px", background: "#dbeafe", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "50px", height: "100px", background: "white", borderRadius: "8px", border: "4px solid #1e293b", position: "relative", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              {/* Screen content mockup */}
              <div style={{ position: "absolute", top: "16px", left: "6px", width: "30%", height: "2px", background: "#ef4444" }}></div>
              <div style={{ position: "absolute", top: "26px", left: "6px", width: "50%", height: "2px", background: "#94a3b8" }}></div>
              <div style={{ position: "absolute", top: "36px", left: "6px", width: "40%", height: "2px", background: "#94a3b8" }}></div>
              <div style={{ position: "absolute", top: "46px", left: "6px", width: "60%", height: "2px", background: "#94a3b8" }}></div>
            </div>
            <p style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b", margin: 0 }}>Open settings<br/>Scroll to Apps</p>
          </div>
          
          <div style={{ background: "rgba(0,0,0,0.6)", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "500" }}>
            Open settings app, Scroll to Apps.
          </div>
          
          <button style={{ position: "absolute", right: "-16px", top: "50%", transform: "translateY(-50%)", width: "32px", height: "32px", borderRadius: "50%", background: "white", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            &gt;
          </button>
        </div>

        <button className="btn btn-primary" style={{ padding: "14px 24px", minWidth: "250px", fontSize: "15px" }}>
          I&apos;ve Disabled Voicemail, Continue
        </button>
      </div>
    </div>
  );
}
