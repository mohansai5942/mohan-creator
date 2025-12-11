import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // Use process.env.API_KEY directly as per guidelines
  // Assume process.env.API_KEY is pre-configured and accessible
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const enhancePrompt = async (originalPrompt: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return originalPrompt;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Enhance the following art prompt to be more descriptive, creative, and suitable for high-quality AI image generation. Keep it under 50 words. \n\nOriginal: "${originalPrompt}"`,
    });
    return response.text || originalPrompt;
  } catch (error) {
    console.error("Gemini Enhance Error:", error);
    return originalPrompt;
  }
};

export const generateTags = async (promptText: string): Promise<string[]> => {
  const ai = getAiClient();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 relevant comma-separated keywords/tags for this image prompt: "${promptText}". Do not output anything else but the tags.`,
    });
    const text = response.text || "";
    return text.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  } catch (error) {
    console.error("Gemini Tag Error:", error);
    return [];
  }
};