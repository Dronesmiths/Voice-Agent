import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SES_SMTP_USER,
    pass: process.env.SES_SMTP_PASS
  }
});

const customerEmail = 'dronesmiths2@gmail.com';
const customerName = 'Drone Smiths';
const agentId = 'test-agent-id-123';
const selectedNumber = '+16614864600'; 
const forwardingDialString = '*726614864600';

const jwtSecret = 'aipilots-temporary-secure-secret-2026';
const tokenPayload = {
  email: customerEmail,
  name: customerName,
  vapiAgentId: agentId,
  twilioNumber: selectedNumber
};

const magicToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '30d' });
const dashboardUrl = `https://dashboard.aipilots.site/client-login?token=${magicToken}`;

const clientHtmlBody = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #2563eb; font-size: 28px; margin: 0;">Welcome to AI Pilots! 🚀</h1>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Hi ${customerName || 'there'},</p>
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Your brand new AI Voice Agent has been fully provisioned and is ready to start answering calls immediately.</p>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 30px 0; text-align: center;">
      <p style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Your Dedicated AI Phone Number</p>
      <h2 style="font-size: 32px; color: #0f172a; margin: 0; letter-spacing: 2px;">${selectedNumber}</h2>
      <p style="font-size: 14px; color: #64748b; margin: 15px 0 0 0;">Dial <strong>${forwardingDialString}</strong> from your business phone to forward calls to your AI automatically.</p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 20px;">Click the secure button below to access your live dashboard, where you can view all call logs, transcripts, and captured leads.</p>
      <a href="${dashboardUrl}" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.2s;">Access My Dashboard</a>
      <p style="font-size: 12px; color: #94a3b8; margin-top: 15px;">This is a secure, passwordless magic link. Do not share it.</p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
    <p style="font-size: 14px; color: #64748b; text-align: center;">If you have any questions, simply reply to this email. We're here to help.</p>
  </div>
`;

console.log("Sending email...");
try {
  await transporter.sendMail({
    from: '"AI Pilots" <Voice-Agent@aipilots.site>',
    to: customerEmail,
    subject: 'Your AI Voice Agent is Live! 🚀',
    html: clientHtmlBody,
  });
  console.log("Mock Welcome Email Sent Successfully!");
} catch (e) {
  console.log("Error:", e);
}
