require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { saveLead } = require('./sheets');

const app = express();
app.use(cors());
app.use(express.json());

// Routing table mapping requested services to real physical phone numbers
const routingTable = {
  'AC_Repair': process.env.PHONE_AC_REPAIR,
  'Plumbing': process.env.PHONE_PLUMBING,
  'Landscaping': process.env.PHONE_LANDSCAPING,
  'SEO': process.env.PHONE_SEO,
  'General': process.env.PHONE_GENERAL
};

app.post('/api/vapi-webhook', async (req, res) => {
  try {
    const payload = req.body;
    console.log('Vapi Webhook received. Type:', payload?.message?.type);

    if (payload?.message?.type === 'tool-calls') {
      const toolCall = payload.message.toolCalls[0];
      
      if (toolCall.function.name === 'saveLeadAndGetRoutingNumber') {
        const args = toolCall.function.arguments;
        const { callerName, requestedService, callerPhone } = args;

        console.log(`Incoming lead: ${callerName} for ${requestedService}`);

        // Save to Google Sheets
        if (process.env.GOOGLE_SHEET_ID) {
            try {
                await saveLead(callerName, callerPhone || 'Unknown', requestedService, process.env.GOOGLE_SHEET_ID);
                console.log('Successfully saved lead to Google Sheets');
            } catch (err) {
                console.error('Failed to save to sheets:', err);
            }
        }

        // Find the right phone number to route to
        const destinationNumber = routingTable[requestedService] || process.env.PHONE_GENERAL;

        // Return the routing number to Vapi so the Assistant can perform the transfer
        return res.json({
          results: [{
            toolCallId: toolCall.id,
            result: JSON.stringify({
              success: true,
              message: "Lead saved.",
              transferNumber: destinationNumber
            })
          }]
        });
      }
    }

    // Standard response for unknown events
    res.status(200).json({});
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 AI Switchboard Server running on port ${PORT}`);
});
