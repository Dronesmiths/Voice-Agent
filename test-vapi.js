const fs = require('fs');
const https = require('https');

const env = fs.readFileSync('.env.local', 'utf-8');
const vapiKeyMatch = env.match(/VAPI_API_KEY=(.*)/);
if (!vapiKeyMatch) { console.log('No API key found!'); process.exit(1); }
const key = vapiKeyMatch[1].trim();

const options = {
  hostname: 'api.vapi.ai',
  path: '/assistant/76d5995a-d925-47d8-b6e9-e7e9d1dfc721',
  method: 'GET',
  headers: { 'Authorization': `Bearer ${key}` }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${data}`);
  });
});
req.on('error', e => console.error(e));
req.end();
