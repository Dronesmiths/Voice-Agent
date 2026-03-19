const { google } = require('googleapis');

// Initialize Google Auth using Default Application Credentials
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function saveLead(name, phone, requestedService, spreadsheetId) {
  try {
    const timestamp = new Date().toISOString();
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [timestamp, name, phone, requestedService]
        ],
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in Google Sheets append:', error);
    throw error;
  }
}

module.exports = { saveLead };
