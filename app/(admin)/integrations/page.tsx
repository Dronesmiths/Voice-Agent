export default function IntegrationsPage() {
  const integrations = [
    {
      id: "google-calendar",
      title: "Google Calendar",
      badge: { text: "Recommended", color: "var(--text-primary)", bg: "var(--border-light)" },
      description: "Schedule calls and manage availability",
      features: [
        "Check availability via calendar",
        "Create events when there's a free slot",
        "Add participants to scheduled calls"
      ],
      connected: true,
      buttonText: "Manage Calendar"
    },
    {
      id: "emergency-callback",
      title: "Emergency Callback",
      badge: { text: "Emergency", color: "#b45309", bg: "#fef3c7" },
      description: "Direct access for urgent situations",
      features: [
        "Direct reach for emergency situations",
        "Configure per assistant availability",
        "Allow callers to bypass AI when urgent"
      ],
      connected: false,
      buttonText: "Configure Emergency Callback"
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      badge: { text: "Popular", color: "var(--text-primary)", bg: "var(--border-light)" },
      description: "Connect your forwards to WhatsApp",
      features: [
        "Receive WhatsApp messages after every call",
        "Brief summary of the call, and action items",
        "Spam calls get marked so you can ignore them or laugh at them"
      ],
      connected: false,
      buttonText: "Configure"
    },
    {
      id: "email",
      title: "Email",
      badge: { text: "New", color: "var(--text-primary)", bg: "var(--border-light)" },
      description: "Receive call summaries via email",
      features: [
        "Enable or disable email summaries",
        "Select your preferred timezone",
        "Clear and concise call summaries delivered to your inbox"
      ],
      connected: false,
      buttonText: "Configure"
    },
    {
      id: "telegram",
      title: "Telegram",
      badge: { text: "Messaging", color: "var(--text-primary)", bg: "var(--border-light)" },
      description: "Get instant call notifications on Telegram",
      features: [
        "Instant notifications for incoming calls",
        "Call summaries and transcripts via bot",
        "Quick actions to manage calls remotely"
      ],
      connected: false,
      buttonText: "Configure"
    },
    {
      id: "imessage",
      title: "iMessage",
      badge: { text: "Beta", color: "#854d0e", bg: "#fef08a" },
      description: "Send an iMessage to your desired number with our partner arnia.",
      features: [
        "Receive call summaries directly via iMessage",
        "Native Apple messaging experience",
        "Instant delivery through Arnia infrastructure"
      ],
      connected: false,
      buttonText: "Configure"
    }
  ];

  return (
    <>
      <header className="top-nav">
        Forward &gt; <strong>Integrations</strong>
      </header>
      
      <div className="page-content">
        <h1 className="page-title" style={{ marginBottom: "8px" }}>Integrations</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "15px" }}>
          Connect your accounts to enhance your AI Pilots experience.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
          {integrations.map((int) => (
            <div key={int.id} className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--bg-main)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                     {int.id === 'google-calendar' ? '📅' : int.id === 'emergency-callback' ? '🚨' : int.id === 'whatsapp' ? '💬' : int.id === 'email' ? '✉️' : int.id === 'telegram' ? '✈️' : '💬'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "17px", fontWeight: "600", margin: 0 }}>{int.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "4px 0 0 0" }}>{int.description}</p>
                  </div>
                </div>
                {int.badge && (
                  <span style={{ 
                    background: int.badge.bg, 
                    color: int.badge.color, 
                    padding: "4px 8px", 
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "600"
                  }}>{int.badge.text}</span>
                )}
              </div>

              <div style={{ flex: 1, paddingLeft: "52px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--text-primary)" }}>Features</h4>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px", margin: 0, color: "var(--text-secondary)", fontSize: "13px", display: "flex", flexDirection: "column", gap: "8px", lineHeight: "1.4" }}>
                  {int.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-light)", display: "flex", flexDirection: "column", gap: "12px" }}>
                {int.connected && (
                  <div style={{ color: "var(--primary)", fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}>
                    ✓ Connected to {int.title}
                  </div>
                )}
                <button className={int.connected ? "btn btn-outline" : "btn btn-primary"} style={{ width: "100%", justifyContent: "center", padding: "12px 16px" }}>
                  {int.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
