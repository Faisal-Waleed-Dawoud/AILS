"use server"

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateSummary(text:string,type:string,difficulty:string) {

    try {
        const summary = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize this lecture: ${text} and create ${type} with ${difficulty} difficulty 
                based on the full lecture , if possible mention all the answers in the last (include 
                newlines so the text comes out it clean and suitable for a pdf file). Do not add * or #, just provide the summary in plain text`,
        });
        
        const title = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `give this lecture one title. 
            Note that the title needs to be a valid file name. 
            Additionaly, the title will be used also as a heading of a document
            ${text}. Do not add * or #, just provide the title in plain text`,
        });

        if (!summary.text || !title.text) {
            return {status: 400}
        }

        return {
            summary: summary.text,
            title: title.text,
            status: 200,
        }
    } catch(error) {
        return {status: 400}
    }
    
} 
