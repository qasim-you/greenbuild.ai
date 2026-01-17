import { GoogleGenerativeAI } from "@google/generative-ai"
import { MaterialData, MaterialMixItem } from "./carbon-logic"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
console.log(process.env.GEMINI_API_KEY);

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
  // ✅ Updated model to a valid one
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // fixed model
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2
    }
  })

  const materialContext = availableMaterials.map(m =>
    `- ${m.material}: ${m.carbon_kg_per_unit} kg CO2e/unit, $${m.cost_per_unit}/unit (Source: ${m.source})`
  ).join("\n")

  const currentMixContext = currentMix.map(m =>
    `- ${m.material}: ${m.quantity.toFixed(0)} ${m.unit}, ${m.totalCarbon.toFixed(2)} tons CO2e`
  ).join("\n")

  const prompt = `
    You are GreenBuild AI, a senior sustainability engineer.
    Analyze this building and provide optimizations in pure JSON format.

    BUILDING:
    - Type: ${specs.type} covering ${specs.area} sq ft, ${specs.floors} floors.
    - Location: ${specs.location}
    - Budget: ${specs.budget}

    CURRENT MIX:
    ${currentMixContext}

    AVAILABLE MATERIALS DATABASE:
    ${materialContext}

    TASK:
    1. Identify hotspots.
    2. Suggest 3 specific material swaps from the database.
    3. Calculate savings/costs.
    4. Provide impact summary.

    RESPONSE FORMAT (JSON ONLY):
    {
      "hotspots": [{ "material": "string", "reason": "string" }],
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
      "policyInsight": "string"
    }
  `

  // Retry Logic
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Aggressive JSON Cleaning
      const cleanText = text.replace(/```json|```/g, "").trim()
      const jsonStart = cleanText.indexOf('{')
      const jsonEnd = cleanText.lastIndexOf('}')

      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON structure found")

      const validJsonStr = cleanText.substring(jsonStart, jsonEnd + 1)
      return JSON.parse(validJsonStr)

    } catch (error) {
      console.warn(`Gemini API Attempt ${attempt} failed:`, error)
      if (attempt === 2) {
        console.error("Final Gemini API failure. Returning null.")
        return null
      }
      // Optional: wait 1-2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 1500))
    }
  }

  return null
}
