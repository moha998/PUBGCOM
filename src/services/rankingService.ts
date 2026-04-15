import { Type } from "@google/genai";
import { Ranking } from "../types";
import { getGenAI } from "../lib/gemini";

export async function fetchLatestRankings(): Promise<Partial<Ranking>[]> {
  try {
    const ai = getGenAI();
    if (!ai) {
      return getFallbackRankings();
    }
    const model = (ai as any).getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `أعطني قائمة بأفضل 5 لاعبين ببجي موبايل (PUBG Mobile) في العالم حالياً بناءً على آخر الإحصائيات والبطولات الرسمية.
          
          يجب أن تتضمن المعلومات:
          1. اسم اللاعب.
          2. الدولة.
          3. إحصائية مميزة (مثل عدد الكيلات أو اللقب الحالي).
          
          أرجع النتيجة بتنسيق JSON كقائمة من الكائنات.`
        }]
      }],
      generationConfig: {
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
        }
      }
    });

    const text = result.response.text();
    if (text) {
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error("JSON Parse Error in fetchLatestRankings:", parseError, "Raw text:", text);
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("API Key must be set")) {
      return getFallbackRankings();
    }
    console.error("Error fetching rankings:", error);
  }
  
  return getFallbackRankings();
}

function getFallbackRankings(): Partial<Ranking>[] {
  return [
    { rank: 1, playerName: 'Order', country: 'الصين', stats: 'أفضل لاعب PMGC 2024' },
    { rank: 2, playerName: 'Paraboy', country: 'الصين', stats: 'أعلى عدد كيلات' },
    { rank: 3, playerName: 'Top', country: 'منغوليا', stats: 'بطل العالم' },
    { rank: 4, playerName: 'Zuxxy', country: 'إندونيسيا', stats: 'قائد أسطوري' },
    { rank: 5, playerName: 'Jonathan', country: 'الهند', stats: 'مهارات استثنائية' }
  ];
}
