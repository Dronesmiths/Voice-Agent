import axios from 'axios';

async function run() {
  console.log("Waiting exactly 45 seconds for Vercel to physically complete deploying the Voice-Agent Microservice...");
  
  await new Promise(resolve => setTimeout(resolve, 45000));

  const payload = {
    message: {
      type: "end-of-call-report",
      call: {
        assistantId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
        customer: { number: "+18005558888" } // New unique caller id for unthreaded email
      },
      duration: 120,
      summary: "GMAIL THREAD BYPASS V5: Now executing against the CORRECT independent microservice ('backend.aipilots.site') with the custom 'Dedicated Card' Magic Link Redesign you specifically requested!",
      transcript: "This payload was intercepted by Voice-Agent natively.",
      recordingUrl: ""
    }
  };

  try {
    console.log("Transmitting simulated webhook payload V5 natively to `backend.aipilots.site`...");
    const res = await axios.post('https://backend.aipilots.site/api/vapi/webhook', payload);
    console.log("SERVER RESPONSE:", res.data);
  } catch (err) {
    console.error("FAILED IMPLANT:", err.response?.data || err.message);
  }
}

run();
