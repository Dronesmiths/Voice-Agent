import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  try {
    const res = await axios.get('https://api.vapi.ai/call?limit=3', {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
    });
    console.log(res.data.map(c => ({
      id: c.id,
      status: c.status,
      endedReason: c.endedReason,
      customer: c.customer?.number,
      startedAt: c.startedAt,
      endedAt: c.endedAt
    })));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
run();
