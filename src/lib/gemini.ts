import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateObject } from "ai"
import { z } from "zod"
import { MaterialData, MaterialMixItem } from "./carbon-logic"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
})

const googleClient = google("gemini-exp-1206")

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

    const { object } = await generateObject({
      model: googleClient,
      schema: z.object({
        hotspots: z.array(z.object({
          material: z.string(),
          reason: z.string()
        })),
        optimizations: z.array(z.object({
          title: z.string(),
          action: z.string(),
          carbonSavingTons: z.number(),
          costDeltaUsd: z.number(),
          durability: z.enum(["High", "Medium", "Low"]),
          technicalExplanation: z.string(),
          tradeoff: z.string()
        })),
        impactSummary: z.string(),
        policyInsight: z.string()
      }),
      prompt: `
        You are GreenBuild AI, a senior sustainability engineer.
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
      `,
    })

    return object

  } catch (error: any) {
    console.error("AI Generation Error:", error)

    // Log the error details for debugging
    if (error.status === 429) {
      console.error("⚠️ Gemini API quota exceeded. Please wait or upgrade your plan.")
    }

    // Return null instead of fallback data - the frontend will handle this
    return null
  }
}
