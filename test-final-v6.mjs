import axios from 'axios';

async function run() {
  console.log("Waiting 10 seconds to ensure Vercel has fully synchronized the CSS commit...");
  await new Promise(r => setTimeout(r, 10000));

  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        // Chanise's provisioned Vapi Agent ID
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
        customer: { number: "+1800555CTR" } // UNIQUE testing number to force a new Gmail thread
      },
      duration: 120,
      summary: "GMAIL THREAD BYPASS V6 (CSS ALIGNMENT TEST): The visual CSS width constraints have been removed from the Magic Link Card button. It should now be perfectly centered and naturally padded inside the card on mobile email clients.",
      transcript: "This payload was correctly routed and executed by the new isolated microservice architecture with the updated button styles.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting CSS Alignment Payload to voice-agent-roan-two.vercel.app...");
    const url = 'https://voice-agent-roan-two.vercel.app/api/vapi/webhook';
    const res = await axios.post(url, payload);
    console.log("SERVER RESPONSE:", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
