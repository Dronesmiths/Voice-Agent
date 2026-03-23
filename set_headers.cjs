const { google } = require('googleapis');
const fs = require('fs');

async function run() {
  try {
    const credentialsRaw = fs.readFileSync('/Users/briansmith/Library/Mobile Documents/com~apple~CloudDocs/AI Pilots Site/AI-Pilots/assets/GOOGLE KEYS/endless-terra-488018-c4-2f632c3b19ef.json', 'utf8');
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentialsRaw),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1b_isvhVzV0EZ2qcEMZ_9DFPqemeq0E9ks17dCR9EAYQ';

    const headers = [
      'Date',
      'Name',
      'Email',
      'Twilio Phone Number',
      'Vapi Agent ID',
      'Forwarding Code',
      'QR Code URL'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:G1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers]
      }
    });
    console.log("Headers successfully injected!");
  } catch (e) {
    console.error(e);
  }
}
run();
