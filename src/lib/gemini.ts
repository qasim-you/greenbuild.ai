import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { MaterialData, MaterialMixItem } from "./carbon-logic"

// Initialize Groq with free API
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
})

const groqModel = groq("llama-3.3-70b-versatile")

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
  try {
    const materialContext = availableMaterials.map(m =>
      `- ${m.material}: ${m.carbon_kg_per_unit} kg CO2e/unit, $${m.cost_per_unit}/unit (Source: ${m.source})`
    ).join("\n")

    const currentMixContext = currentMix.map(m =>
      `- ${m.material}: ${m.quantity.toFixed(0)} ${m.unit}, ${m.totalCarbon.toFixed(2)} tons CO2e`
    ).join("\n")

    const { text } = await generateText({
      model: groqModel,
      prompt: `You are GreenBuild AI, a senior sustainability engineer.
Analyze this building and provide optimizations based on the available materials database.

BUILDING:
- Type: ${specs.type} covering ${specs.area} sq ft, ${specs.floors} floors.
- Location: ${specs.location}
- Budget: ${specs.budget}

CURRENT MIX:
${currentMixContext}

AVAILABLE MATERIALS DATABASE:
${materialContext}

TASK:
1. Identify the highest carbon hotspots.
2. Suggest 3 specific material swaps ONLY from the database provided.
3. Calculate savings/costs accurately.
4. Provide impact summary.

IMPORTANT: You must respond with valid JSON only. No markdown, no code blocks, just raw JSON.

Response format:
{
  "hotspots": [
    {"material": "string", "reason": "string"}
  ],
  "optimizations": [
    {
      "title": "string",
      "action": "string",
      "carbonSavingTons": number,
      "costDeltaUsd": number,
      "durability": "High" | "Medium" | "Low",
      "technicalExplanation": "string",
      "tradeoff": "string"
    }
  ],
  "impactSummary": "string",
  "policyInsight": "string"
}`,
    })

    // Parse the JSON response
    const cleanText = text.replace(/```json|```/g, "").trim()
    const jsonStart = cleanText.indexOf('{')
    const jsonEnd = cleanText.lastIndexOf('}')

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found in response")
    }

    const jsonStr = cleanText.substring(jsonStart, jsonEnd + 1)
    const result = JSON.parse(jsonStr)

    return result

  } catch (error: any) {
    console.error("AI Generation Error:", error)

    // Log the error details for debugging
    if (error.status === 429) {
      console.error("⚠️ Groq API quota exceeded. Please wait or upgrade your plan.")
    }

    // Return null instead of fallback data - the frontend will handle this
    return null
  }
}
