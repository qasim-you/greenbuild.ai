import { NextResponse } from "next/server"
import { getGreenBuildRecommendations } from "@/lib/gemini"
import { calculateDetailedEngine, loadMaterialData } from "@/lib/carbon-logic"

export async function POST(req: Request) {
    try {
        const specs = await req.json()

        const materials = await loadMaterialData()

        const baseline = calculateDetailedEngine(specs, materials, 0)

        const aiData = await getGreenBuildRecommendations(
            specs,
            baseline.materials,
            materials
        )

        return NextResponse.json({
            baseline,
            aiData,
            materials // Sending down to let client-side recalculate live
        })
    } catch (error: any) {
        console.error("API Analysis Error:", error)
        return NextResponse.json({
            error: "Failed to analyze building specs",
            details: error.message
        }, { status: 500 })
    }
}
