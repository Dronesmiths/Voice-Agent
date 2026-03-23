import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '/Users/briansmith/Library/Mobile Documents/com~apple~CloudDocs/Voice Agent/Voice-Agent/.env.local' });

const token = jwt.sign(
  {
    email: 'chaniseavery@icloud.com',
    name: 'Chanise Avery',
    agentId: '76d5995a-d925-47d8-b6e9-e7e9d1dfc721',
    phone: 'Pending'
  },
  process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026',
  { expiresIn: '72h' }
);

console.log("\n✅ CHANISE'S SECURE DASHBOARD LINK:");
console.log("https://dashboard.aipilots.site/client-login?token=" + token + "\n");
