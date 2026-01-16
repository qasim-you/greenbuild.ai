import { GoogleGenerativeAI } from "@google/generative-ai"
import { MaterialData, MaterialMixItem } from "./carbon-logic"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function getGreenBuildRecommendations(
    specs: {
        type: string
        area: number
        floors: number
        location: string
        budget: string
    },
    currentMix: MaterialMixItem[],
    availableMaterials: MaterialData[]
) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    })

    const materialContext = availableMaterials.map(m =>
        `- ${m.material}: ${m.carbon_kg_per_unit} kg CO2e/unit, $${m.cost_per_unit}/unit (Source: ${m.source})`
    ).join("\n");

    const currentMixContext = currentMix.map(m =>
        `- ${m.material}: ${m.quantity.toFixed(0)} ${m.unit}, ${m.totalCarbon.toFixed(2)} tons CO2e`
    ).join("\n");

    const prompt = `
    You are GreenBuild AI, a senior sustainability engineer and construction cost analyst.
    Your goal is to provide a multi-step reasoning analysis for optimizing a building's carbon footprint.
    
    BUILDING SPECIFICATIONS:
    - Type: ${specs.type}
    - Area: ${specs.area} sq ft
    - Floors: ${specs.floors}
    - Location: ${specs.location}
    - Budget Preference: ${specs.budget}
    
    CURRENT MATERIAL MIX & BASELINE:
    ${currentMixContext}
    
    AVAILABLE REAL-WORLD DATASETS (ICE v3.0 / EC3):
    ${materialContext}
    
    TASK:
    1. Analyze the current mix and identify the "Carbon Hotspots".
    2. Propose 3 specific, data-backed optimizations using the AVAILABLE MATERIALS.
    3. For each optimization, calculate the delta in carbon (tons) and cost ($) based on the quantities provided.
    4. Provide a "Tradeoff Analysis" (e.g., "Saves 20% carbon but increases cost by 5%").
    5. Explain the technical reason why these materials are better (e.g., sequestration, lower energy intensity).
    
    STRICT RULES:
    - NEVER invent material data. Use the provided AVAILABLE MATERIALS.
    - All numbers must be derived from the quantities and factors provided.
    - Return a structured JSON response.
    
    OUTPUT FORMAT (JSON):
    {
      "hotspots": [
        { "material": "string", "reason": "string" }
      ],
      "optimizations": [
        {
          "title": "string",
          "action": "string",
          "carbonSavingTons": number,
          "costDeltaUsd": number,
          "durability": "High | Medium | Low",
          "technicalExplanation": "string",
          "tradeoff": "string"
        }
      ],
      "impactSummary": "string",
      "policyInsight": "string (mention a relevant green building policy or incentive if applicable to the location or type)"
    }
  `

    try {
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Clean potential markdown code blocks if necessary (though mimeType: json is set)
        const cleanJson = text.replace(/```json|```/g, "").trim()
        return JSON.parse(cleanJson)
    } catch (error) {
        console.error("Gemini API Error:", error)
        return null
    }
}
