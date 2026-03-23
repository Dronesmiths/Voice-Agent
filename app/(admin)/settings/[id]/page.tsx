"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function SettingsPage() {
  const params = useParams();
  const id = (params?.id as string) || "assistant";
  const name = id.charAt(0).toUpperCase() + id.slice(1);

  const [activeTab, setActiveTab] = useState(1);
  const [tone, setTone] = useState("Friendly");
  const [voice, setVoice] = useState("Female");

  return (
    <div className="page-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 className="page-title" style={{ margin: 0 }}>{name}&apos;s Assistant Settings</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-outline">📞 Phone Integration</button>
          <button className="btn btn-primary">⏱ Call Logs</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "32px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
        <button className="btn btn-outline" style={{ border: "none" }}>⚙️ Basic Settings</button>
        <button className="btn btn-outline" style={{ border: "none", color: "var(--text-secondary)" }}>🔌 Integrations</button>
      </div>

      {/* TABS CONTROLLER */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
        {[1, 2, 3].map((num) => {
          const labels = ["1. Contact Information", "2. Language & Voice", "3. Assistant Setup"];
          return (
            <button 
              key={num}
              onClick={() => setActiveTab(num)}
              className={activeTab === num ? "btn btn-primary" : "btn btn-outline"}
              style={{ borderRadius: "24px" }}
            >
              {labels[num-1]}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="card" style={{ padding: "40px" }}>
        {activeTab === 1 && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Contact Information</h2>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "32px" }}>Edit your contact details</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px", margin: "0 auto" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email Address <span style={{color: "var(--danger)"}}>*</span></label>
                <input type="email" defaultValue="dronesmiths2@gmail.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>First Name <span style={{color: "var(--danger)"}}>*</span></label>
                <input type="text" defaultValue="Brian" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Phone Number <span style={{color: "var(--danger)"}}>*</span></label>
                <input type="tel" defaultValue="+1 661 993 6669" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Assistant Name <span style={{color: "var(--danger)"}}>*</span></label>
                <input type="text" defaultValue={name === "Assistant" ? "Sara" : `Assistant for ${name}`} style={inputStyle} />
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <button className="btn btn-outline" disabled>Back</button>
                <button className="btn btn-primary" onClick={() => setActiveTab(2)}>Continue</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Language & Voice</h2>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "32px" }}>Configure language and voice settings</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px", margin: "0 auto" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Language <span style={{color: "var(--danger)"}}>*</span></label>
                <select style={inputStyle}><option>English</option></select>
              </div>
              
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Agent Tone <span style={{color: "var(--danger)"}}>*</span></label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={radioContainerStyle(tone === "Professional")}>
                    <input type="radio" checked={tone === "Professional"} onChange={() => setTone("Professional")} /> Professional
                  </label>
                  <label style={radioContainerStyle(tone === "Friendly")}>
                    <input type="radio" checked={tone === "Friendly"} onChange={() => setTone("Friendly")} /> Friendly
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Voice of your personal assistant <span style={{color: "var(--danger)"}}>*</span></label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={radioContainerStyle(voice === "Male")}>
                    <input type="radio" checked={voice === "Male"} onChange={() => setVoice("Male")} /> Male
                  </label>
                  <label style={radioContainerStyle(voice === "Female")}>
                    <input type="radio" checked={voice === "Female"} onChange={() => setVoice("Female")} /> Female
                  </label>
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <button className="btn btn-outline" onClick={() => setActiveTab(1)}>Back</button>
                <button className="btn btn-primary" onClick={() => setActiveTab(3)}>Continue</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Assistant Setup</h2>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "32px" }}>Configure your personal assistant</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "600px", margin: "0 auto" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>First Message <span style={{color: "var(--danger)"}}>*</span></label>
                <textarea style={{...inputStyle, minHeight: "80px"}} defaultValue={`Hi, this is Chanise, Brian's assistant. Are you calling about real estate, business automation, or something else today?`} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Tasks <span style={{color: "var(--danger)"}}>*</span></label>
                <textarea style={{...inputStyle, minHeight: "120px"}} defaultValue="To gather caller details, understand their needs, answer basic questions, and forward messages to Brian so he can respond quickly — whether it's about buying/selling a home or automating a business..." />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Frequently Asked Questions</label>
                <p style={{fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px"}}>Mainly useful if you are a small business</p>
                <textarea style={{...inputStyle, minHeight: "160px"}} defaultValue="Q: What can you help me with?\nA: I can assist with real estate inquiries, schedule appointments, explain Brian's AI automation services, or take a message so Brian can follow up personally.\n\nQ: When will I hear back?\nA: Brian usually follows up the same business day." />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Closing Message <span style={{color: "var(--danger)"}}>*</span></label>
                <textarea style={{...inputStyle, minHeight: "80px"}} defaultValue="Thanks! I'll make sure Brian gets this message and follows up with you shortly. Have a great day!" />
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <button className="btn btn-outline" onClick={() => setActiveTab(2)}>Back</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Settings Footer sections */}
      <h3 style={{ marginTop: "40px", marginBottom: "16px", fontSize: "22px", borderBottom: "1px solid var(--border-light)", paddingBottom: "12px" }}>Active Integrations</h3>
      
      <div className="card" style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px" }}>
        <div>
          <h4 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", fontSize: "20px" }}>📅 Google Calendar Integration</h4>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", margin: 0, maxWidth: "600px" }}>Calendar integration is securely enabled. Your assistant will check your real-time availability before intelligently booking meetings directly onto your schedule.</p>
        </div>
        <div>
          {/* Mock Toggle UI */}
          <div style={{ background: "var(--primary)", width: "60px", height: "32px", borderRadius: "16px", position: "relative", cursor: "pointer", boxShadow: "0 0 10px rgba(37, 99, 235, 0.3)" }}>
            <div style={{ background: "white", width: "24px", height: "24px", borderRadius: "50%", position: "absolute", top: "4px", right: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px", borderLeft: "4px solid #25D366" }}>
        <div>
          <h4 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", fontSize: "20px" }}>💬 WhatsApp Omnichannel Messaging</h4>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", margin: 0, maxWidth: "600px" }}>WhatsApp Meta API is fully connected. Your voice agent will automatically dispatch rich text message summaries out to clients instantly following completed calls.</p>
        </div>
        <div>
          {/* Mock Toggle UI */}
          <div style={{ background: "#25D366", width: "60px", height: "32px", borderRadius: "16px", position: "relative", cursor: "pointer", boxShadow: "0 0 10px rgba(37, 211, 102, 0.3)" }}>
            <div style={{ background: "white", width: "24px", height: "24px", borderRadius: "50%", position: "absolute", top: "4px", right: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}></div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid var(--border-light)",
  borderRadius: "8px",
  outline: "none",
  fontFamily: "inherit",
  fontSize: "15px"
};

const radioContainerStyle = (selected: boolean) => ({
  display: "flex", 
  alignItems: "center", 
  gap: "12px", 
  padding: "12px 16px", 
  border: `1px solid ${selected ? "var(--primary)" : "var(--border-light)"}`, 
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: selected ? "rgba(59,130,246,0.05)" : "transparent",
  color: selected ? "var(--primary)" : "var(--text-primary)",
  fontWeight: selected ? "500" : "400"
});
