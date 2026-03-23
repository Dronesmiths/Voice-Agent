import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const email = 'chanise777@gmail.com';
const name = 'Chanise Avery';
const vapi = '76d5995a-d925-47d8-b6e9-e7e9d1dfc721';
const twilio = '+13187129189';

const secret = 'aipilots-temporary-secure-secret-2026';
const token = jwt.sign({ email, name, vapiAgentId: vapi, twilioNumber: twilio }, secret, { expiresIn: '30d' });
const magicLink = `https://dashboard.aipilots.site/client-login?token=${token}`;

const resend = new Resend('re_XryJTq5N_JpDoJHBgyVHzBTLA5ijurepW');
const clientHtmlBody = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #2563eb; font-size: 28px; margin: 0;">Welcome to AI Pilots! 🚀</h1>
    </div>
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Hi ${name},</p>
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Your brand new AI Voice Agent has been securely provisioned (Phone: <strong>${twilio}</strong>).</p>
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Please securely access your live interactive dashboard below to natively review your call analytics, MP3 logs, and captured leads!</p>
    <div style="margin: 35px 0; text-align: center;">
      <a href="${magicLink}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
        Access Your Secure Dashboard
      </a>
    </div>
  </div>
`;

async function inject() {
  console.log("Firing strict Welcome Email sequence directly to " + email);
  await resend.emails.send({
    from: 'AI Pilots Onboarding <Voice-Agent@aipilots.site>',
    to: email,
    subject: `Your AI Voice Agent Dashboard is Securely Ready! 🚀`,
    html: clientHtmlBody,
  });
  console.log("SUCCESS! Magic Link delivered natively to " + email);
}
inject();
