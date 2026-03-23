import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

async function testSheet() {
  try {
    const credPath = path.resolve('../GOOGLE KEYS/endless-terra-488018-c4-2f632c3b19ef.json');
    const credentialsString = fs.readFileSync(credPath, 'utf8');
    
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentialsString),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1b_isvhVzV0EZ2qcEMZ_9DFPqemeq0E9ks17dCR9EAYQ';
    
    const newRowData = [
      new Date().toLocaleString('en-US'),
      'Test Name',
      'test@test.com',
      '+1234567890',
      'test-agent-id',
      '*721234567890',
      'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=tel:*721234567890'
    ];

    console.log("Attempting to append row to Google Sheet...");
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRowData]
      }
    });
    
    console.log("SUCCESS! Row appended successfully.");
  } catch (error) {
    console.error("FAILED to append row:");
    console.error(error.message);
  }
}

testSheet();
