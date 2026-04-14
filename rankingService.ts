import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

export function getGenAI(): GoogleGenAI | null {
  if (!genAI) {
    // Try to find the API key in various possible locations
    const apiKey = [
      import.meta.env.VITE_GEMINI_API_KEY,
      import.meta.env.GEMINI_API_KEY,
      // Use the exact string that might be defined in vite.config.ts
      typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined,
      typeof process !== 'undefined' ? process.env.VITE_GEMINI_API_KEY : undefined,
      (window as any).VITE_GEMINI_API_KEY,
      (window as any).GEMINI_API_KEY
    ].find(key => {
      if (!key || typeof key !== 'string') return false;
      const trimmed = key.trim();
      // Check for minimum length and exclude common placeholders/invalid values
      return trimmed.length > 5 && 
             !trimmed.includes('YOUR_API_KEY') && 
             !trimmed.includes('ENTER_YOUR_KEY') &&
             trimmed !== 'undefined' && 
             trimmed !== 'null';
    });
    
    if (!apiKey) {
      return null;
    }
    
    try {
      const trimmedKey = apiKey.trim();
      if (trimmedKey) {
        genAI = new GoogleGenAI(trimmedKey);
      }
    } catch (error: any) {
      // Only log as error if it's not the expected "missing key" error
      if (error?.message?.includes('API Key must be set')) {
        console.warn("Gemini AI initialization skipped: API Key is missing or invalid.");
      } else {
        console.error("Error initializing Gemini AI:", error);
      }
      return null;
    }
  }
  return genAI;
}
