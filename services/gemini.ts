
import { GoogleGenAI, Type } from "@google/genai";
import { GUDIDRecord, AnalysisResult, EMDNRecord, EMDNMappingResult } from "../types";

export const analyzeGUDIDData = async (
  apiKey: string, 
  data: GUDIDRecord[], 
  modelName: string = 'gemini-3-flash-preview'
): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey });
  const dataString = JSON.stringify(data.slice(0, 50));

  const prompt = `You are an FDA Data Architect. Analyze this GUDID dataset:
  1. Provide a detailed executive summary.
  2. Create exactly 5 diverse visualization datasets (labels, values, title, type).
  3. Generate exactly 20 insightful follow-up questions.
  
  Data: ${dataString}`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          followUpQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          chartData: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                labels: { type: Type.ARRAY, items: { type: Type.STRING } },
                values: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                title: { type: Type.STRING },
                type: { type: Type.STRING }
              },
              required: ["labels", "values", "title", "type"]
            }
          }
        },
        required: ["summary", "followUpQuestions", "chartData"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const processAINote = async (
  apiKey: string,
  text: string,
  magic: string = 'format',
  modelName: string = 'gemini-2.5-flash'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = `You are an AI Note Assistant. 
  Transform the input into organized Markdown. 
  CRITICAL: Detect important technical keywords and wrap them in <span style="color: coral; font-weight: bold;">...</span>.
  Task: ${magic}`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: text,
    config: { systemInstruction }
  });

  return response.text;
};

export const mapEMDN = async (
  apiKey: string,
  gudidData: GUDIDRecord[],
  emdnCatalog: EMDNRecord[],
  modelName: string = 'gemini-3-flash-preview'
): Promise<EMDNMappingResult[]> => {
  const ai = new GoogleGenAI({ apiKey });
  const emdnList = emdnCatalog.map(e => `${e.code}: ${e.term}`).join('\n');
  const gudidSlice = gudidData.slice(0, 20);

  const prompt = `Map these FDA GUDID devices to the best matching EMDN items from the provided catalog.
  Devices: ${JSON.stringify(gudidSlice)}
  Catalog: ${emdnList}
  
  Return a JSON array of objects with emdn_item and emdn_code added.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            device_id: { type: Type.STRING },
            emdn_item: { type: Type.STRING },
            emdn_code: { type: Type.STRING }
          },
          required: ["device_id", "emdn_item", "emdn_code"]
        }
      }
    }
  });

  const mappings = JSON.parse(response.text);
  return gudidSlice.map(g => {
    const m = mappings.find((item: any) => item.device_id === g.device_id);
    return { ...g, emdn_item: m?.emdn_item || 'Unknown', emdn_code: m?.emdn_code || 'N/A' };
  });
};

export const chatWithAgent = async (
  apiKey: string,
  history: { role: string; content: string }[],
  query: string,
  contextData: any[],
  agentName: string,
  modelName: string = 'gemini-3-flash-preview'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  const context = JSON.stringify(contextData.slice(0, 20));
  const systemInstruction = `You are specialized GUDID Agent: ${agentName}. Context: ${context}. Highlight keywords in coral if requested. Ending with 20 questions if it's the start.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: [
      ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: query }] }
    ],
    config: { systemInstruction }
  });

  return response.text;
};
