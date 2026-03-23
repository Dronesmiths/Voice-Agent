# AI Pilots - Autonomous Voice Agent Architecture

This folder contains the complete, enterprise-grade architecture we built to fully fully automate Voice AI provisioning natively in Next.js without relying on Pabbly logic blocks.

## What's Inside

### 1. The Sales Front-End (`/app/voice-agent/page.tsx`)
- A totally custom, incredibly premium "glassmorphism" React component specifically designed to convert customers.
- Fully wired up directly to your $25/month Pabbly subscription checkout page for an instant, full-screen mobile payment flow.

### 2. The Provisioning Master Engine (`/app/api/provision-agent/route.ts`)
This API endpoint singlehandedly replaces 10 complex Pabbly steps. When a customer buys the product, this script:
1. **Twilio**: Automatically searches for and securely buys a new local US phone number.
2. **Vapi**: Natively creates a dedicated conversational AI Agent customized for the client.
3. **The Link**: Instantly imports the new phone number to Vapi and binds it exclusively to that Agent.
4. **Data Webhook**: Explicitly tells Vapi to send all subsequent end-of-call transcripts directly to your Next.js app (not Pabbly).
5. **Amazon SES**: Generates a Custom Call-Forwarding QR Code and blasts out a gorgeously formatted HTML launch email to your team.
6. **Google Sheets**: Neatly writes the client's Name, Email, newly acquired Twilio Number, and Agent ID as a new row in your central database.

### 3. The Call Transcripts Receiver (`/app/api/vapi/webhook/route.ts`)
- Replaces Pabbly entirely for handling actual phone call data.
- The millisecond a client's customer hangs up the phone, Vapi fires the massive text transcript and call recording MP3 safely and cleanly to this specific file for storage.

## How to Merge into your Main Site
Since you are deploying from a different main repository, you simply need to drag and drop these `app/api`, `app/voice-agent`, and `assets` folders securely into your main AI-Pilots repo, and Cloudflare will natively pick it all up!
