/* eslint-disable */
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        {/* Simple styling for the sidebar navigation */}
        <div style={{ padding: "0 24px 24px", fontSize: "20px", fontWeight: "700" }}>
          AI Pilots
        </div>
        
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", padding: "0 16px" }}>
          <a href="/" style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--bg-main)", fontWeight: "500", color: "var(--text-primary)" }}>
            Dashboard
          </a>
          <a href="/contacts" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            Contacts
          </a>
          <a href="/usage" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            Usage
          </a>
          <a href="/credits" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            Credits
          </a>
          <a href="/voice-agent" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            Personal Robot <span style={{ background: "#fef08a", color: "#854d0e", fontSize: "10px", padding: "2px 6px", borderRadius: "4px", marginLeft: "8px" }}>Beta</span>
          </a>
          <a href="/profile" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            User Profile
          </a>
          <a href="/integrations" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            Integrations
          </a>
          <a href="/affiliates" style={{ padding: "12px 16px", borderRadius: "8px", color: "var(--text-secondary)" }}>
            Affiliates
          </a>
        </nav>

        <div style={{ padding: "24px 16px", borderTop: "1px solid var(--border-light)", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button className="btn btn-outline" style={{ width: "100%", justifyContent: "flex-start", gap: "8px" }}>
            <span>+</span> New Forward
          </button>
          <a href="#" style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>
            Support (Discord)
          </a>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
