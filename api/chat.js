import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable. Please configure it in your Vercel settings.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { message } = req.body;

    const systemInstruction = `You are an AI assistant representing Arshdeep Singh's interactive portfolio website. 
    Your job is to answer questions enthusiastically from recruiters and visitors based solely on his professional profile.
    Keep answers very concise, friendly, and formatted nicely (you can use html like <b></b> or <br> or <a> tags).
    
    CRITICAL INSTRUCTION: If they ask how to contact him, connect, or hire him, you MUST reply EXACLTY with this string (and add whatever text you want):
    "You can connect with Arshdeep via his <a href='https://links.arshdeepsingh.info' target='_blank' class='text-orange-500 font-bold underline hover:text-orange-600'>Official Links Page!</a>"
    
    Do not hallucinate technical experience not provided. Emphasize that his portfolio is built entirely in Angular 18 with standalone components, MediaPipe AI gestures, and Tailwind CSS!`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI', details: error.message });
  }
}
