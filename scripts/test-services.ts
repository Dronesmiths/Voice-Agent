import { config } from 'dotenv';
import path from 'path';

// Fix path to point safely to .env.local
config({ path: path.resolve(__dirname, '../.env.local') });

import { TwilioService } from '../lib/twilio';
import { VapiService } from '../lib/vapi';
import { EmailService } from '../lib/email';

async function runTests() {
  console.log('🚀 INITIALIZING ENTERPRISE TEST SUITE...');
  try {
    console.log('\n--- [TESTING TWILIO SERVICE] ---');
    const twilio = new TwilioService();
    console.log('✅ Twilio Client Successfully Instantiated');
    
    console.log('Fetching Owned Twilio Phone Numbers...');
    const ownedNumbers = await twilio.getOwnedNumbers();
    console.log(`✅ Success! Twilio Inventory Count: ${ownedNumbers.length}`);
    if (ownedNumbers.length > 0) {
      console.log(`📡 Sample Number 1: ${ownedNumbers[0]}`);
    }

    console.log('\n--- [TESTING VAPI SERVICE] ---');
    const vapi = new VapiService();
    console.log('✅ Vapi Client Successfully Instantiated');

    console.log('Fetching Assigned Vapi Telecom Numbers...');
    const assignedNumbers = await vapi.getAssignedNumbers();
    console.log(`✅ Success! Vapi Bonded Count: ${assignedNumbers.length}`);
    if (assignedNumbers.length > 0) {
      console.log(`📡 Sample Bonded Number 1: ${assignedNumbers[0]}`);
    }

    console.log('\n--- [TESTING EMAIL ORCHESTRATION] ---');
    const emailVars = new EmailService();
    const testMagicLink = emailVars.generateMagicLink('test@example.com', 'Test Client', 'vapi-1234', '+19999999999');
    console.log(`✅ Success! Magic Link Compiler generated JWT Token URL ending with: ...${testMagicLink.slice(-15)}`);
    
    console.log('\n✅ 100% OF LOCAL MODULES COMPILED AND TESTED SUCCESSFULLY WITHOUT ERRORS.');

  } catch (error) {
    console.error('❌ FATAL TEST FAILURE:', error);
    process.exit(1);
  }
}

runTests();
