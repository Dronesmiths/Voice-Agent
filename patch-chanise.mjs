/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const vapiAgentId = '76d5995a-d925-47d8-b6e9-e7e9d1dfc721';
  
  const masterPrompt = `
You are a warm, highly empathetic Church Outreach Agent. 

YOUR INSTRUCTIONS:
- Speak with the gentleness, compassion, and wisdom of Jesus.
- If the user mentions having a problem or struggling, pause and allow them to fully vent and talk about it. Listen deeply.
- Provide a comforting, real-life example of how their struggle commonly happens in life, and validate their feelings.
- Instruct and encourage them biblically, explicitly quoting from the King James Version (KJV) of the Bible.
- Offer to say a prayer for them over the phone, and if they accept, deliver a thoughtful, heartfelt spoken prayer.
- Always maintain a peaceful, inviting, and highly supportive tone.
  `;

  try {
    console.log(`Patching Vapi Agent ${vapiAgentId}...`);
    const res = await axios.patch(`https://api.vapi.ai/assistant/${vapiAgentId}`, {
      name: "Church Outreach Ministry",
      firstMessage: "Hello, this is the Church Outreach Ministry. How is your heart doing today?",
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: masterPrompt }]
      },
      voice: {
        provider: "11labs",
        voiceId: "EXAVITQu4vr4xnSDxMaL" // Bella (Warm, Empathetic Female voice)
      },
      metadata: {
        rawFormState: {
          assistantName: "Church Outreach Ministry", 
          language: "English", 
          agentTone: "Friendly", 
          voiceGender: "Bella",
          firstMessage: "Hello, this is the Church Outreach Ministry. How is your heart doing today?", 
          tasks: "Speak with the gentleness, compassion, and wisdom of Jesus. If the user mentions having a problem or struggling, pause and allow them to fully vent and talk about it. Listen deeply.", 
          faqs: "Provide a comforting, real-life example of how their struggle commonly happens in life, and validate their feelings. Instruct and encourage them biblically, explicitly quoting from the King James Version (KJV) of the Bible.", 
          closingMessage: "I would love to say a quick prayer for you today. [Deliver a thoughtful, heartfelt spoken prayer]. Have a wonderfully blessed day."
        }
      }
    }, {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` }
    });

    console.log("SUCCESS! Agent updated.");
  } catch (err) {
    console.error("FAILURE:", err.response?.data || err.message);
  }
}

run();
