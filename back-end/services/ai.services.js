require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function askDelulu(userMessage) {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: userMessage }]
      }
    ],
    systemInstruction: "You are Delulu, the AI shop manager for 'Vibes.' You are high-key obsessed with Y2K, streetwear, and sustainable fashion. Speak in Gen Z slang but stay helpful. Your goal is to give 'Vibe Checks' on outfits and recommend fire fits from the shop. If a user's style is boring, tell them to level up. No cap."
  });

  const response = await result.response;
  return response.text();
}

module.exports = askDelulu;
