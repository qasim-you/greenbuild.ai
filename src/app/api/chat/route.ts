import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

console.log(process.env.GEMINI_API_KEY);

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

        // ✅ Use a valid model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", // updated model that exists
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        })

        // Build conversation history
        const conversationHistory = history?.map((msg: { role: string; content: string }) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
        ).join("\n") || ""

        const prompt = `${SYSTEM_CONTEXT}\n\nPrevious conversation:\n${conversationHistory}\n\nUser: ${message}\n\nRespond helpfully as GreenBuild AI Assistant:`

        // Retry logic for transient errors
        let text = ""
        let attempt = 0
        while (attempt < 2) {
            try {
                const result = await model.generateContent(prompt)
                const response = await result.response
                text = response.text()
                break
            } catch (e: any) {
                attempt++
                if (e.status === 429 && attempt < 2) {
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    continue
                }
                throw e
            }
        }

        return NextResponse.json({ message: text, success: true })
    } catch (error) {
        console.error("Chat API Error:", error)
        return NextResponse.json({
            message: "I'm having trouble connecting right now. Please try again in a moment! 🔄",
            success: false
        }, { status: 500 })
    }
}
