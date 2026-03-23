import axios from 'axios';

async function run() {
  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        // Chanise's provisioned Vapi Agent ID
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
        customer: { number: "+19998887777" } // UNIQUE testing number to force a new Gmail thread subject
      },
      duration: 120,
      summary: "GMAIL THREAD BYPASS: Gmail was aggressively hiding the blue button behind the `...` symbol because all our test emails had the same subject line! This one is a brand new thread.",
      transcript: "This is a brand new email thread.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting simulated webhook payload V4 to live production server...");
    const res = await axios.post('https://dashboard.aipilots.site/api/vapi/webhook', payload);
    console.log("SERVER RESPONSE:", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
