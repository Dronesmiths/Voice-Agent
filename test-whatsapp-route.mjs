import axios from 'axios';

async function run() {
  console.log("Holding for 40 seconds to guarantee Vercel deployment of the new JSON Diagnostic Hook resolves completely...");
  await new Promise(r => setTimeout(r, 40000));

  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
        customer: { number: "+1800555TR" }
      },
      duration: 120,
      summary: "WHATSAPP NATIVE TELEMETRY V7: Attempting to verify the native Meta Graph API dispatch directly from the standalone Microservice.",
      transcript: "This payload executes the WhatsApp diagnostic logic natively.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting WhatsApp Verification Payload to voice-agent-roan-two.vercel.app...");
    const url = 'https://voice-agent-roan-two.vercel.app/api/vapi/webhook';
    const res = await axios.post(url, payload);
    console.log("SERVER RESPONSE (WHATSAPP TARGET):", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
