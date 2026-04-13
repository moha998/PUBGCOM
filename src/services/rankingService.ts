import { GoogleGenAI, Type } from "@google/genai";
import { Ranking } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function fetchLatestRankings(): Promise<Partial<Ranking>[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `أعطني قائمة بأفضل 5 لاعبين ببجي موبايل (PUBG Mobile) في العالم حالياً بناءً على آخر الإحصائيات والبطولات الرسمية.
      
      يجب أن تتضمن المعلومات:
      1. اسم اللاعب.
      2. الدولة.
      3. إحصائية مميزة (مثل عدد الكيلات أو اللقب الحالي).
      
      أرجع النتيجة بتنسيق JSON كقائمة من الكائنات.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              playerName: { type: Type.STRING },
              country: { type: Type.STRING },
              stats: { type: Type.STRING },
              rank: { type: Type.NUMBER }
            },
            required: ['playerName', 'country', 'stats', 'rank']
          }
        },
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text;
    if (text) {
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error("JSON Parse Error in fetchLatestRankings:", parseError, "Raw text:", text);
      }
    }
  } catch (error) {
    console.error("Error fetching rankings:", error);
  }
  
  // Fallback rankings
  return [
    { rank: 1, playerName: 'Order', country: 'China', stats: 'MVP PMGC 2024' },
    { rank: 2, playerName: 'Paraboy', country: 'China', stats: 'Top Fragger' },
    { rank: 3, playerName: 'Top', country: 'Mongolia', stats: 'World Champion' },
    { rank: 4, playerName: 'Zuxxy', country: 'Indonesia', stats: 'Legendary IGL' },
    { rank: 5, playerName: 'Jonathan', country: 'India', stats: 'God Level Skills' }
  ];
}
