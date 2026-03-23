import axios from 'axios';

async function run() {
  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        // Chanise's provisioned Vapi Agent ID
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
        customer: { number: "+1800555TEST" }
      },
      duration: 120,
      summary: "AUTOMATED SYSTEM TEST V3: The Vercel deployment is fully complete now! You should definitively see the beautiful blue Magic Link button immediately below this transcript block.",
      transcript: "AUTOMATED TEST: Connectivity verified. Magic link integration live.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting simulated webhook payload V3 to live production server...");
    const res = await axios.post('https://dashboard.aipilots.site/api/vapi/webhook', payload);
    console.log("SERVER RESPONSE:", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
