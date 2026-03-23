import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const globalPhoneId = 'b0364f78-767d-4fe2-8f9f-258db0085808'; 
  const assistantId = '76d5995a-d925-47d8-b6e9-e7e9d1dfc721'; // Chanise

  try {
    console.log("Unbinding master outbound number...");
    await axios.patch(`https://api.vapi.ai/phone-number/${globalPhoneId}`, {
      assistantId: null
    }, { headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` } });
    console.log("Unbound global number.");

    const res = await axios.post('https://api.vapi.ai/call', {
      assistantId,
      phoneNumberId: globalPhoneId,
      customer: { number: '+16619033468' }
    }, { headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` } });

    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.error("FAILURE:", err.response?.data || err.message);
  }
}
run();
