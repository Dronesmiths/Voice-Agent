import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const res = await axios.get('https://api.vapi.ai/phone-number', {
    headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
  });
  console.log(res.data.map(p => ({ id: p.id, number: p.number, boundTo: p.assistantId })));
}
run();
