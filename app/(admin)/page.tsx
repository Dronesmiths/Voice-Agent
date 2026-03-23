/* eslint-disable */
export default function DashboardPage() {
  return (
    <>
      <header className="top-nav">
        Forward &gt; <strong>Dashboard</strong>
      </header>
      
      <div className="page-content">
        <h1 className="page-title">Forward Dashboard</h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ width: "300px" }}>
            <input 
              type="text" 
              placeholder="Filter forwards" 
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: "var(--border-radius-md)",
                border: "1px solid var(--border-light)",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" }}>
            {/* Agent Card 1 */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600" }}>Don</h3>
                <span style={{ 
                  background: "var(--success-bg)", 
                  color: "var(--success-text)", 
                  padding: "4px 8px", 
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>Active</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
                To capture caller information, answer basic questions, and make sure your message reaches them effectively.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button className="btn btn-outline" style={{ flex: 1 }}>Call logs</button>
                <a href="/settings/don" className="btn btn-outline" style={{ flex: 1, textDecoration: "none", textAlign: "center" }}>Settings</a>
                <button className="btn btn-outline" style={{ width: "42px", flexShrink: 0 }}>📞</button>
              </div>
            </div>

            {/* Agent Card 2 */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600" }}>Brian</h3>
                <span style={{ 
                  background: "var(--success-bg)", 
                  color: "var(--success-text)", 
                  padding: "4px 8px", 
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>Active</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
                To gather caller details, understand their needs, answer basic questions, and forward messages to Brian...
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button className="btn btn-outline" style={{ flex: 1 }}>Call logs</button>
                <a href="/settings/brian" className="btn btn-outline" style={{ flex: 1, textDecoration: "none", textAlign: "center" }}>Settings</a>
                <button className="btn btn-outline" style={{ width: "42px", flexShrink: 0 }}>📞</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
