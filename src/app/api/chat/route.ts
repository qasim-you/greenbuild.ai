import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { NextResponse } from "next/server"

// Initialize Groq with free API
const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || "",
})

const SYSTEM_CONTEXT = `You are GreenBuild AI Assistant, a friendly and knowledgeable sustainability expert for construction projects.

Your expertise includes:
- Embodied carbon in building materials (concrete, steel, timber, glass, insulation)
- Green building certifications (LEED, BREEAM, Passive House, RIBA 2030)
- Sustainable material alternatives and their tradeoffs
- Carbon footprint calculations and reduction strategies
- Climate change impact of the construction industry
- Cost vs. sustainability optimization
- Local and regional building regulations

Communication style:
- Be helpful, encouraging, and positive
- Use simple language, avoid jargon unless asked
- Provide actionable advice
- When discussing materials, mention both pros and cons
- If asked about something outside your expertise, politely redirect to construction sustainability topics
- Keep responses concise (2-4 paragraphs max) unless more detail is requested
- Use emojis sparingly to be friendly 🌱

If users ask about their specific project, guide them to use the "Analyze" feature on the website for detailed calculations.`

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json()

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Message is required" }, { status: 400 })
        }

        const { text } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system: SYSTEM_CONTEXT,
            messages: [
                ...(history || []).map((msg: any) => ({
                    role: msg.role === "user" ? "user" : "assistant",
                    content: msg.content,
                })),
                { role: "user", content: message },
            ],
            temperature: 0.7,
        })

        return NextResponse.json({ message: text, success: true })
    } catch (error: any) {
        console.error("Chat API Error:", error)

        // Final fallback if quota is still an issue
        if (error.status === 429 || error.message?.includes("quota")) {
            return NextResponse.json({
                message: "I'm currently receiving too many requests. Please hang tight or try asking again in a minute! ⏳🌱",
                success: false
            })
        }

        return NextResponse.json({
            message: "I'm having a little trouble thinking right now. Could you try that again? 🔄",
            success: false
        }, { status: 500 })
    }
}
