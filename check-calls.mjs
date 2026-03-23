import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  try {
    const res = await axios.get('https://api.vapi.ai/call?assistantId=76d5995a-d925-47d8-b6e9-e7e9d1dfc721', {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
    });
    console.log("Sample createdAt:", res.data[0]?.createdAt);
  } catch (err) {
    console.error(err.message);
  }
}
run();
