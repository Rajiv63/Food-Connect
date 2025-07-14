import { GoogleGenAI } from "@google/genai";
import type { FoodItem } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set for Gemini. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getRecipeSuggestion = async (food: FoodItem): Promise<string> => {
    if (!process.env.API_KEY) {
        return Promise.resolve("The Gemini API key is not configured. Recipe generation is unavailable.");
    }
    
    const prompt = `
Generate a simple recipe idea for a food shelter using the following donated item. 
The recipe should be easy to make in bulk, use common pantry staples, and be nutritious.
The output must be in Markdown format. Include a title, a short description, an ingredients list, and step-by-step instructions.

Food Item: ${food.name}
Description: ${food.description}
Quantity: ${food.quantity} servings available

Start the response with a title like "### Recipe Idea: [Your Recipe Name]".
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
        });
        return response.text ?? "";
    } catch (error) {
        console.error("Error generating recipe from Gemini:", error);
        return "Sorry, we couldn't generate a recipe at this time. Please try again later.";
    }
};