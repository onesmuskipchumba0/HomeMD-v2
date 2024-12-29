// app/services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY!);

// Prompt template to ensure JSON response
const FIRST_AID_PROMPT_TEMPLATE = `
You are a first aid information system. Provide basic first aid guidance and general information about over-the-counter medications for: [SYMPTOM].generalMedications should be the medication available in kenya and commonly knowa.

Return ONLY a JSON object in the following format, with no additional text or explanation:
{
  "firstAidSteps": ["step 1", "step 2", ...],
  "generalMedications": ["medication 1", "medication 2", ...],
  "warnings": ["warning 1", "warning 2", ...],
  "disclaimer": "medical disclaimer"
}

Make sure the response is valid JSON and each array has at least 2 items.
`;

export interface GeminiResponse {
  firstAidSteps: string[];
  generalMedications: string[];
  warnings: string[];
  disclaimer: string;
}

const DEFAULT_RESPONSE: GeminiResponse = {
  firstAidSteps: [
    "Rest in a comfortable position",
    "Monitor your symptoms",
  ],
  generalMedications: [
    "Consult a pharmacist for appropriate over-the-counter medications",
    "Always read medication labels carefully"
  ],
  warnings: [
    "Seek immediate medical attention if symptoms worsen",
    "This is general information only, not medical advice"
  ],
  disclaimer: "This information is for educational purposes only. Always consult a healthcare professional for medical advice."
};

export async function getFirstAidGuidance(symptom: string): Promise<GeminiResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = FIRST_AID_PROMPT_TEMPLATE.replace('[SYMPTOM]', symptom);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Find the first occurrence of '{' and the last occurrence of '}'
    const startIdx = text.indexOf('{');
    const endIdx = text.lastIndexOf('}') + 1;
    
    if (startIdx === -1 || endIdx === 0) {
      console.error('No valid JSON found in response');
      return DEFAULT_RESPONSE;
    }

    // Extract just the JSON part
    const jsonStr = text.slice(startIdx, endIdx);
    
    try {
      const parsedResponse = JSON.parse(jsonStr);
      
      // Validate the response structure
      if (!validateGeminiResponse(parsedResponse)) {
        console.error('Invalid response structure from Gemini');
        return DEFAULT_RESPONSE;
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return DEFAULT_RESPONSE;
    }
  } catch (error) {
    console.error('Error getting first aid guidance:', error);
    return DEFAULT_RESPONSE;
  }
}

function validateGeminiResponse(response: any): response is GeminiResponse {
  return (
    response &&
    Array.isArray(response.firstAidSteps) &&
    response.firstAidSteps.length > 0 &&
    Array.isArray(response.generalMedications) &&
    response.generalMedications.length > 0 &&
    Array.isArray(response.warnings) &&
    response.warnings.length > 0 &&
    typeof response.disclaimer === 'string' &&
    response.disclaimer.length > 0
  );
}