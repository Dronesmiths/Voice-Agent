import axios from 'axios';

async function run() {
  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        // Chanise's provisioned Vapi Agent ID
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
        customer: { number: "+1800555FINAL" } // UNIQUE testing number to force a new Gmail thread
      },
      duration: 120,
      summary: "GMAIL THREAD BYPASS V5 (FINAL VERIFICATION): This email was natively dispatched from your newly deployed independent `Voice-Agent` Vercel Node! It should contain the beautiful standalone Magic Link Card redesign you requested natively embedded below.",
      transcript: "This payload was correctly routed and executed by the new isolated microservice architecture.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting Final Payload...");
    const url = 'https://voice-agent-2dmv7zbat-website-designs-projects-16bfde60.vercel.app/api/vapi/webhook';
    const res = await axios.post(url, payload);
    console.log("SERVER RESPONSE:", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
