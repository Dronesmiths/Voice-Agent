import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

/**
 * Enterprise Email Dispatch & Authentication Module
 * Strictly isolates Resend mailing API and Magic Link JWT generation mechanics.
 */

export class EmailService {
  private resend: Resend;
  private jwtSecret: string;
  private adminEmail = 'dronesmiths2@gmail.com';

  constructor() {
    const resendApiKey = process.env.RESEND_API_KEY || 're_XryJTq5N_JpDoJHBgyVHzBTLA5ijurepW';
    this.resend = new Resend(resendApiKey);
    this.jwtSecret = process.env.JWT_SECRET || 'aipilots-temporary-secure-secret-2026';
  }

  /**
   * Dispatches the internal administrative notification detailing the newly provisioned autonomous infrastructure.
   */
  async sendAdminProvisioningAlert(customerName: string, customerEmail: string, selectedNumber: string): Promise<void> {
    try {
      console.log("[EMAIL SERVICE] Dispatching administrator alert via Resend...");
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">New AI Agent Provisioned! 🚀</h2>
          <p style="font-size: 16px;">A new client has completed their purchase and their Twilio+Vapi agent is fully live autonomously.</p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <p style="margin: 5px 0;"><strong>Customer Name:</strong> ${customerName || 'None provided'}</p>
            <p style="margin: 5px 0;"><strong>Customer Email:</strong> ${customerEmail || 'None provided'}</p>
            <p style="margin: 5px 0;"><strong>New Twilio Number:</strong> ${selectedNumber}</p>
          </div>
          <p style="font-size: 14px; color: #666;">Check your Twilio and Vapi dashboards for full details!</p>
        </div>
      `;

      await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'AI Pilots Provisioning <Voice-Agent@aipilots.site>',
        to: this.adminEmail,
        subject: `New Signup: ${customerName || 'Client'} - AI Agent Provisioned!`,
        html: htmlBody,
      });
      console.log("[EMAIL SERVICE] Administrator notification delivered.");
    } catch (error) {
      console.error("[EMAIL SERVICE] Fatal error dispatching administrator alert:", error);
    }
  }

  /**
   * Generates a structural JWT payload to instantly bypass manual authentication for new users.
   */
  generateMagicLink(email: string, name: string, agentId: string, twilioNumber: string): string {
    const tokenPayload = { email, name, vapiAgentId: agentId, twilioNumber };
    const magicToken = jwt.sign(tokenPayload, this.jwtSecret, { expiresIn: '30d' });
    return `https://dashboard.aipilots.site/client-login?token=${magicToken}`;
  }

  /**
   * Delivers the formal Welcome Payload containing the Magic Link directly to the client's inbox.
   */
  async sendClientWelcomePayload(customerEmail: string, customerName: string, dashboardUrl: string): Promise<void> {
    try {
      console.log(`[EMAIL SERVICE] Firing strictly authenticated Welcome Email with Magic Link to ${customerEmail}...`);
      
      const clientHtmlBody = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin: 0;">Welcome to AI Pilots! 🚀</h1>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Hi ${customerName || 'there'},</p>
          <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">Thank you for partnering with us. Your brand new AI Voice Agent has been fully provisioned and is waiting for your instructions.</p>
          
          <div style="margin: 35px 0; text-align: center;">
            <a href="${dashboardUrl}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.2s;">
              Access Your Dashboard
            </a>
          </div>
          
          <p style="font-size: 14px; color: #718096; text-align: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            If the button doesn't work, copy and paste this secure link into your browser:<br>
            <span style="color: #2563eb; line-height: 1.8;">${dashboardUrl}</span>
          </p>
          <p style="font-size: 12px; color: #a0aec0; text-align: center; margin-top: 10px;">
            This magic link securely authenticates you and expires in 30 days.
          </p>
        </div>
      `;

      await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'AI Pilots Onboarding <Support@aipilots.site>',
        to: customerEmail,
        subject: `Your New AI Voice Agent is Ready! 🚀`,
        html: clientHtmlBody,
      });

      console.log(`[EMAIL SERVICE] Client explicitly received Magic Link sequence.`);
    } catch (error) {
      console.error("[EMAIL SERVICE] Client Welcome Dispatch strictly failed:", error);
    }
  }

  /**
   * Dispatches the comprehensive Post-Call HTML Analysis Matrix immediately after an AI call concludes.
   */
  async sendEndOfCallTranscript(clientEmail: string, callerNumber: string, durationMins: number, summary: string, recordingUrl: string, transcript: string, dashboardUrl?: string): Promise<void> {
    try {
      console.log(`[EMAIL SERVICE] Dispatching explicit Call Transcript explicitly to ${clientEmail}...`);
      
      const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-bottom: 24px;">AI Pilot Call Completed</h2>
          <p style="color: #475569; font-size: 16px;">Your Digital AI Agent just finished a conversation!</p>
          
          <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
            <h3 style="color: #1e293b; margin-top: 0;">Call Summary</h3>
            <p style="color: #334155; line-height: 1.6;">${summary || 'Summary not available.'}</p>
            
            <h3 style="color: #1e293b; margin-top: 24px;">Duration</h3>
            <p style="color: #334155;">${durationMins} minutes</p>
            
            <h3 style="color: #1e293b; margin-top: 24px;">Caller ID</h3>
            <p style="color: #334155; font-weight: bold;">${callerNumber}</p>
          </div>

          ${recordingUrl ? `
          <div style="margin-bottom: 24px;">
            <a href="${recordingUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Listen to Call Recording</a>
          </div>` : ''}

          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #475569; margin-top: 0; font-size: 14px; text-transform: uppercase;">Full Transcript</h3>
            <pre style="white-space: pre-wrap; font-family: monospace; color: #1e293b; font-size: 13px;">${transcript || 'No transcript generated.'}</pre>
          </div>
          
          ${dashboardUrl ? `
          <div style="background-color: white; padding: 32px 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 24px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <h3 style="color: #0f172a; margin-top: 0; font-size: 18px; margin-bottom: 8px;">Review Audio & Caller Data 🎧</h3>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 24px; line-height: 1.5;">Access the full call analytics matrix, view caller profile data, and securely interact with your internal CRM inside your native dashboard.</p>
            <a href="${dashboardUrl}" style="background-color: #2563eb; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); width: 100%; max-width: 250px;">
              Access Dashboard
            </a>
          </div>` : ''}
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">You can securely view this interaction natively inside your AI Pilots Dashboard.</p>
        </div>
      `;

      await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Voice-Agent@aipilots.site',
        to: clientEmail,
        subject: `Incoming Call Completed: ${callerNumber}`,
        html: html
      });
      
      console.log(`[EMAIL SERVICE] Call Transcript accurately routed and firmly delivered.`);
    } catch (error) {
      console.error("[EMAIL SERVICE] Critical error generating the transcript HTML sequence:", error);
    }
  }
}
