import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

async function listNumbers() {
  const numbers = await twilioClient.incomingPhoneNumbers.list();
  console.log("Your currently owned Twilio Numbers:");
  numbers.forEach(n => console.log(n.phoneNumber));
}

listNumbers();
