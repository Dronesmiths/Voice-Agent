import axios from 'axios';

async function run() {
  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721", // Chanise
        customer: { number: "+1800555TR" }
      },
      duration: 120,
      summary: "WHATSAPP NATIVE TELEMETRY V9: This is the definitive Meta OAuth verification test! The new backend script successfully pulled your Phone ID natively and dispatched this text organically from your standalone Vercel engine.",
      transcript: "This payload executes the verified WhatsApp Phone ID dispatch sequence natively.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting Final Final Verification Payload to voice-agent-roan-two.vercel.app...");
    const url = 'https://voice-agent-roan-two.vercel.app/api/vapi/webhook';
    const res = await axios.post(url, payload);
    console.log("SERVER RESPONSE (WHATSAPP TARGET):", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
