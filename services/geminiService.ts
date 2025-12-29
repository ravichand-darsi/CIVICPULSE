
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, Department, PriorityLevel } from "../types";

export const analyzeComplaint = async (description: string): Promise<AIAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this citizen complaint: "${description}"`,
    config: {
      systemInstruction: `You are the "CivicPulse Intelligence Engine" for Indian municipalities. 
Your job is to read messy citizen complaints and turn them into simple, structured reports.

Language Rule: Use extremely simple, clear, and understandable language. No complex jargon or professional "corporate" talk.

Objectives:
1. Extract Indian Location: Look for landmarks and city names (e.g. Bangalore, Mumbai).
2. Categorize: Choose from: ${Object.values(Department).join(', ')}.
3. Analyze Priority (1-10): 
   - Danger: Is it dangerous for people?
   - Impact: How many people are affected?
   - Formula: Final Score = (Danger * 0.6) + (Impact * 0.4)
4. Action Plan: 3 simple steps to fix the problem.
5. Citizen Message: Write a very friendly and simple message to reassure the citizen that someone is fixing it.

Tone: Simple, clear, and helpful.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          structured_issue: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              summary: { type: Type.STRING },
              location: { type: Type.STRING },
              priority_metrics: {
                type: Type.OBJECT,
                properties: {
                  urgency: { type: Type.NUMBER },
                  impact: { type: Type.NUMBER },
                  final_score: { type: Type.NUMBER },
                  level: { type: Type.STRING }
                },
                required: ["urgency", "impact", "final_score", "level"]
              },
              authority_action_plan: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              citizen_message: { type: Type.STRING }
            },
            required: ["title", "category", "summary", "location", "priority_metrics", "authority_action_plan", "citizen_message"]
          }
        },
        required: ["structured_issue"]
      }
    },
  });

  try {
    const data = JSON.parse(response.text || '{}').structured_issue;
    
    const category = Object.values(Department).includes(data.category as Department) 
      ? data.category as Department 
      : Department.OTHER;
      
    const levelString = data.priority_metrics.level.charAt(0).toUpperCase() + data.priority_metrics.level.slice(1).toLowerCase();
    const priorityLevel = (Object.values(PriorityLevel).includes(levelString as PriorityLevel))
      ? levelString as PriorityLevel
      : PriorityLevel.MEDIUM;

    return {
      title: data.title,
      category: category,
      summary: data.summary,
      location: data.location,
      priorityMetrics: {
        urgency: data.priority_metrics.urgency,
        impact: data.priority_metrics.impact,
        finalScore: data.priority_metrics.final_score,
        level: priorityLevel
      },
      actionPlan: data.authority_action_plan,
      citizenMessage: data.citizen_message
    };
  } catch (error) {
    console.error("AI Analysis Parse Error:", error);
    throw new Error("Failed to process complaint intelligence.");
  }
};
