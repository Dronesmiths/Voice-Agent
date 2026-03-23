// ai-server.js
// A standalone WebSocket server designed to bridge the Twilio Phone call (Media Streams)
// with the OpenAI Realtime Voice API.

const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.urlencoded({ extended: true }));

app.post('/incoming-call', (req, res) => {
    const host = req.headers.host;
    console.log("📞 Received HTTP incoming call webhook!");
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna-Neural" language="en-US">Connecting you to the AI Pilot intelligence core.</Say>
  <Connect>
    <Stream url="wss://${host}/" />
  </Connect>
</Response>`;
    res.type('text/xml');
    res.send(twiml);
});

// When Twilio connects to our server for a phone call stream
wss.on('connection', (twilioWs) => {
    console.log("📞 Incoming Phone Call: Twilio stream connected.");

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
        console.error("❌ Missing OpenAI API Key! Cannot start AI brain.");
        twilioWs.close();
        return;
    }

    // Open connection to OpenAI's Realtime Voice API
    const openaiWs = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01', {
        headers: {
            "Authorization": "Bearer " + OPENAI_API_KEY,
            "OpenAI-Beta": "realtime=v1"
        }
    });

    openaiWs.on('open', () => {
        console.log("🧠 Connected to OpenAI's Realtime AI engine.");
        
        // Setup AI parameters, prompt, and system instructions based on Dashboard settings
        const sessionUpdate = {
            type: 'session.update',
            session: {
                turn_detection: { type: 'server_vad' },
                input_audio_format: 'g711_ulaw',
                output_audio_format: 'g711_ulaw',
                voice: 'alloy', // Can be dynamically mapped to Dashboard preference
                instructions: 'You are an AI assistant for Brian at AI Pilots. You are answering a phone call. Keep responses fast, brief, and conversational.'
            }
        };
        openaiWs.send(JSON.stringify(sessionUpdate));
    });

    // Pipe audio chunks from Twilio -> OpenAI
    twilioWs.on('message', (message) => {
        const msg = JSON.parse(message);
        
        // Standard Twilio base64 media chunk
        if (msg.event === 'media' && msg.media && msg.media.payload) {
            if (openaiWs.readyState === WebSocket.OPEN) {
                openaiWs.send(JSON.stringify({
                    type: 'input_audio_buffer.append',
                    audio: msg.media.payload
                }));
            }
        }
    });

    // Pipe AI Voice chunks back from OpenAI -> Twilio
    openaiWs.on('message', (message) => {
        const response = JSON.parse(message);

        // OpenAI sends verbal audio back we push instantly to the phone
        if (response.type === 'response.audio.delta' && response.delta) {
             const payload = {
                 event: 'media',
                 streamSid: "--DYNAMIC-STREAM-SID--", // Captured on start
                 media: { payload: response.delta }
             };
             twilioWs.send(JSON.stringify(payload));
        }
    });

    twilioWs.on('close', () => {
        console.log("Call ended by user.");
        openaiWs.close();
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`🚀 AI Realtime Voice Server active on port ${PORT}`);
});
