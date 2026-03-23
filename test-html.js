const dashboardUrl = 'https://dashboard.aipilots.site/client-login?token=MOCK_TOKEN';
const recordingUrl = '';
const transcript = 'AUTOMATED TEST';

const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px; border-radius: 12px;">
    
    ${recordingUrl ? `
    <div style="margin-bottom: 24px;">
      <a href="${recordingUrl}">Listen</a>
    </div>` : ''}

    <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
      <h3 style="color: #475569; margin-top: 0; font-size: 14px; text-transform: uppercase;">Full Transcript</h3>
      <pre style="white-space: pre-wrap; font-family: monospace; color: #1e293b; font-size: 13px;">${transcript || 'No transcript generated.'}</pre>
    </div>
    
    ${dashboardUrl ? `
    <div style="margin-top: 32px; text-align: center;">
      <a href="${dashboardUrl}" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        Access Your Dashboard
      </a>
    </div>` : ''}
    
    <p style="color: #94a3b8; font-size: 12px; margin-top: ${dashboardUrl ? '16px' : '32px'}; text-align: center;">You can securely view this interaction natively inside your AI Pilots Dashboard.</p>
  </div>
`;

console.log(html.includes('Access Your Dashboard'));
