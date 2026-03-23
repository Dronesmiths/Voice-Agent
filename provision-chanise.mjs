/* eslint-disable @typescript-eslint/no-unused-vars */
import twilio from 'twilio';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

// Chanise's details
const customerName = 'Chanise';
const customerEmail = 'chanise777@gmail.com';

// We pick one of the user's pre-existing unassigned Twilio numbers!
const selectedNumber = '+13187129189'; 
const cleanNumber = '3187129189';
const forwardingDialString = `*72${cleanNumber}`;
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=tel:${encodeURIComponent(forwardingDialString)}`;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const vapiApiKey = process.env.VAPI_API_KEY;

async function provisionChanise() {
  try {
    console.log(`[PROVISION] Starting manual provisioning for ${customerName}...`);

    console.log("[PROVISION] Creating Vapi Agent from scratch...");
    const agentResponse = await axios.post('https://api.vapi.ai/assistant', {
      name: `Agent for ${customerName}`,
      firstMessage: `Hello ${customerName}, how can I assist you today?`,
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: `You are a helpful AI Voice Assistant exclusively built for ${customerName}.` }]
      },
      voice: {
        provider: "11labs",
        voiceId: "bIHbv24MWmeRgasZH58o"
      }
    }, { headers: { Authorization: `Bearer ${vapiApiKey}` } });

    const agentId = agentResponse.data.id;
    console.log(`[PROVISION] Vapi Agent created! ID: ${agentId}`);

    console.log(`[PROVISION] Processing Twilio number ${selectedNumber} to Vapi...`);
    let vapiPhoneId;
    try {
      const phoneResponse = await axios.post('https://api.vapi.ai/phone-number', {
        provider: "twilio",
        number: selectedNumber,
        twilioAccountSid: accountSid,
        twilioAuthToken: authToken,
        name: `Number for ${customerName}`,
        assistantId: agentId,
        serverUrl: "https://aipilots.site/api/vapi/webhook"
      }, { headers: { Authorization: `Bearer ${vapiApiKey}` } });
      vapiPhoneId = phoneResponse.data.id;
      console.log(`[PROVISION] Fresh Phone # linked! Vapi Phone ID: ${vapiPhoneId}`);
    } catch (importError) {
      if (importError.response?.status === 400 && importError.response?.data?.message?.includes("Has Identical")) {
        console.log(`[PROVISION] Number already exists in Vapi! Reassigning it to Chanise...`);
        const listRes = await axios.get('https://api.vapi.ai/phone-number', { headers: { Authorization: `Bearer ${vapiApiKey}` } });
        const existingPhone = listRes.data.find(p => p.number === selectedNumber);
        if (existingPhone) {
          vapiPhoneId = existingPhone.id;
          await axios.patch(`https://api.vapi.ai/phone-number/${vapiPhoneId}`, { assistantId: agentId }, { headers: { Authorization: `Bearer ${vapiApiKey}` } });
          console.log(`[PROVISION] Successfully reassigned existing Vapi Phone ID: ${vapiPhoneId}`);
        } else {
          throw new Error("Phone was reported as identical but could not be found in list.");
        }
      } else {
        throw importError;
      }
    }

    console.log("[PROVISION] Sending confirmation email...");
    const transporter = nodemailer.createTransport({
      host: 'email-smtp.us-east-1.amazonaws.com',
      port: 465,
      secure: true,
      auth: { user: process.env.SES_SMTP_USER, pass: process.env.SES_SMTP_PASS }
    });

    const jwtSecret = process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026';
    const magicToken = jwt.sign({
      email: customerEmail,
      name: customerName,
      vapiAgentId: agentId,
      twilioNumber: selectedNumber
    }, jwtSecret, { expiresIn: '30d' });
    
    // Live Dashboard Link!
    const dashboardUrl = `https://dashboard.aipilots.site/client-login?token=${magicToken}`;

    const clientHtmlBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; font-size: 28px; margin: 0;">Welcome to AI Pilots! 🚀</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Hi ${customerName},</p>
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Your brand new AI Voice Agent has been fully provisioned and is successfully connected to your new dedicated AI number (${selectedNumber}). It is ready to start answering your calls immediately.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 30px 0; text-align: center;">
          <p style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Your Dedicated AI Phone Number</p>
          <h2 style="font-size: 32px; color: #0f172a; margin: 0; letter-spacing: 2px;">${selectedNumber}</h2>
          <p style="font-size: 14px; color: #64748b; margin: 15px 0 0 0;">Dial <strong>${forwardingDialString}</strong> from your business phone to forward your calls to the AI automatically.</p>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 20px;">Click the secure button below to access your live dashboard, where you can view all call logs, transcripts, and captured leads.</p>
          <a href="${dashboardUrl}" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.2s;">Access My Dashboard</a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"AI Pilots" <Voice-Agent@aipilots.site>',
      to: customerEmail,
      subject: 'Your AI Voice Agent is Live! 🚀',
      html: clientHtmlBody,
    });
    console.log(`[PROVISION] Welcome email successfully sent to ${customerEmail}!`);

    console.log("[PROVISION] Saving record to Google Sheets...");
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1b_isvhVzV0EZ2qcEMZ_9DFPqemeq0E9ks17dCR9EAYQ'; 
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[ new Date().toLocaleString('en-US'), customerName, customerEmail, selectedNumber, agentId, forwardingDialString, qrCodeUrl ]]
      }
    });
    console.log("[PROVISION] Google Sheets updated successfully!");

  } catch (error) {
    if (error.response) {
      console.error("Vapi API Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

provisionChanise();
