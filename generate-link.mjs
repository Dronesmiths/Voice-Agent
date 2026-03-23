import jwt from "jsonwebtoken";
const token = jwt.sign({
  email: "chanise777@gmail.com",
  name: "Chanise Testing",
  vapiAgentId: "76d5995a-d925-47d8-b6e9-e7e9d1dfc721",
  twilioNumber: "+18283823432"
}, "aipilots-temporary-secure-secret-2026", { expiresIn: '30d' });

console.log(`\n\n--- FRESH MAGIC LINK ---`);
console.log(`https://dashboard.aipilots.site/client-login?token=${token}`);
console.log(`------------------------\n\n`);
