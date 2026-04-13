import { Type } from "@google/genai";
import { NewsItem } from "../types";
import { getGenAI } from "../lib/gemini";

export async function fetchPubgNews(): Promise<NewsItem[]> {
  try {
    const ai = getGenAI();
    if (!ai) {
      return getFallbackNews();
    }
    const today = new Date().toISOString().split('T')[0];
    const model = (ai as any).getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `أعطني آخر 8 أخبار وفعاليات وتحديثات وصيانة مجدولة وعروض شدات (UC) وأطوار جديدة وتسريبات للموسم القادم للعبة ببجي موبايل بتاريخ اليوم ${today}.
          
          يجب أن تشمل النتائج قسماً خاصاً بـ "التحديثات وساعات الصيانة المجدولة" (Updates & Maintenance) إذا كانت متوفرة.
          
          يجب أن تكون جميع الأخبار والمعلومات حصرياً من الموقع الرسمي لببجي موبايل (pubgmobile.com) أو حساباتهم الرسمية الموثقة.
          
          أرجع النتيجة بتنسيق JSON كقائمة من الكائنات.
          
          ملاحظة هامة: بالنسبة للفئات (uc, event, mode, leaks, updates)، اجعل حقل date يمثل تاريخ انتهاء العرض أو الفعالية أو الطور أو تاريخ صدور التسريب المتوقع أو تاريخ انتهاء الصيانة. أما بالنسبة للفئة news، فاجعل date هو تاريخ النشر.
          تأكد من تنويع النتائج لتشمل جميع الفئات وخاصة التحديثات وتسريبات الموسم القادم.`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              date: { type: Type.STRING },
              summary: { type: Type.STRING },
              url: { type: Type.STRING },
              category: { 
                type: Type.STRING,
                enum: ['news', 'uc', 'event', 'mode', 'leaks', 'updates']
              }
            },
            required: ['id', 'title', 'date', 'summary', 'url', 'category']
          }
        }
      }
    });

    const text = result.response.text();
    if (text) {
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error("JSON Parse Error in fetchPubgNews:", parseError, "Raw text:", text);
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("API Key must be set")) {
      return getFallbackNews();
    }
    console.error("Error fetching news:", error);
  }
  
  return getFallbackNews();
}

export async function analyzeClipWithAI(title: string, description: string): Promise<{
  analysis: string;
  tips: string[];
  pros: string[];
  cons: string[];
  strengths: string[];
  weaknesses: string[];
}> {
  try {
    const ai = getGenAI();
    if (!ai) {
      return getFallbackAnalysis();
    }
    const model = (ai as any).getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `أنت خبير ومحلل محترف في لعبة ببجي موبايل (PUBG Mobile).
          لقد قام أحد اللاعبين برفع لقطة (Clip) بعنوان: "${title}" ووصف: "${description}".
          
          قم بتحليل هذه اللقطة بناءً على العنوان والوصف وقدم تقريراً مفصلاً يتضمن:
          1. تحليل عام وشامل للقطة.
          2. الإيجابيات (Pros).
          3. السلبيات (Cons).
          4. نقاط القوة (Strengths) في أسلوب اللعب.
          5. نقاط الضعف (Weaknesses) التي يجب معالجتها.
          6. نصائح احترافية لتطوير المستوى.
    
          يجب أن يكون التحليل مشجعاً واحترافياً باللغة العربية.
          أرجع النتيجة بتنسيق JSON.`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "تحليل عام وشامل للقطة" },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "قائمة من النصائح لتطوير المستوى"
            },
            pros: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "الإيجابيات العامة في اللقطة"
            },
            cons: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "السلبيات العامة التي يمكن تحسينها"
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "نقاط القوة المحددة في أسلوب اللعب"
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "نقاط الضعف المحددة التي تحتاج لتطوير"
            }
          },
          required: ['analysis', 'tips', 'pros', 'cons', 'strengths', 'weaknesses']
        }
      }
    });

    const text = result.response.text();
    if (text) {
      return JSON.parse(text);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("API Key must be set")) {
      return getFallbackAnalysis();
    }
    console.error("Error analyzing clip:", error);
  }

  return getFallbackAnalysis();
}

function getFallbackNews(): NewsItem[] {
  return [
    {
      id: '1',
      title: 'تحديث ببجي موبايل 4.2: عصر التكنولوجيا المتقدمة',
      date: '2026-03-28',
      summary: 'اكتشف الأسلحة الليزرية الجديدة ومركبات الطيران في خريطة إرانغل المحدثة.',
      url: 'https://www.pubgmobile.com',
      category: 'mode'
    },
    {
      id: '2',
      title: 'تسريبات الموسم القادم: عودة مود الفراعنة المطور',
      date: '2026-04-15',
      summary: 'تشير التسريبات إلى عودة مود الفراعنة الشهير مع إضافات جديدة كلياً وبدلة X-Suit أسطورية.',
      url: 'https://www.pubgmobile.com',
      category: 'leaks'
    },
    {
      id: '3',
      title: 'بطولة العالم 2026: التصفيات النهائية',
      date: '2026-04-01',
      summary: 'تابع أقوى الفرق العالمية وهي تتنافس على اللقب الأغلى في تاريخ اللعبة.',
      url: 'https://www.pubgmobile.com',
      category: 'event'
    },
    {
      id: '4',
      title: 'عرض الشدات: اشحن واحصل على 100% إضافي',
      date: '2026-04-01',
      summary: 'لفترة محدودة، احصل على ضعف كمية الشدات عند الشحن من الموقع الرسمي.',
      url: 'https://www.midasbuy.com',
      category: 'uc'
    },
    {
      id: '5',
      title: 'صيانة مجدولة للسيرفرات: تحديث الإصدار 4.2',
      date: '2026-04-10',
      summary: 'سيتم إغلاق السيرفرات للصيانة المجدولة لتطبيق تحديث الإصدار الجديد. يرجى التأكد من ربط حسابك.',
      url: 'https://www.pubgmobile.com',
      category: 'updates'
    }
  ];
}

function getFallbackAnalysis() {
  return {
    analysis: "لقطة رائعة تظهر مهارة جيدة في المواجهات. استمر في التدريب لتطوير سرعة البديهة ودقة التصويب.",
    tips: ["حاول تحسين التمركز خلف السواتر", "تدرب على سرعة فتح السكوب"],
    pros: ["سرعة رد الفعل", "اختيار توقيت جيد للهجوم"],
    cons: ["كشف الجسم بشكل زائد أحياناً", "تحتاج لتنظيم حركة اللاعب أثناء الإطلاق"],
    strengths: ["التحكم في الارتداد", "الوعي المكاني"],
    weaknesses: ["التسرع في بعض القرارات", "استهلاك الذخيرة بشكل غير مدروس"]
  };
}
