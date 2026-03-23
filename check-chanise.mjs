import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const vapiAgentId = '76d5995a-d925-47d8-b6e9-e7e9d1dfc721';
  try {
    const res = await axios.get(`https://api.vapi.ai/assistant/${vapiAgentId}`, {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
    });
    console.log("VAPI AGENT VOICE ID:");
    console.log(res.data.voice);
    console.log("AGENT FIRST MESSAGE:", res.data.firstMessage);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
run();
