import axios from 'axios';

async function run() {
  console.log("Triggering live Pabbly Webhook on Vercel...");
  try {
    const res = await axios.post('https://dashboard.aipilots.site/api/provision-agent', {
      customerName: 'Chanise',
      customerEmail: 'chanise777@gmail.com'
    });
    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
  }
}

run();
