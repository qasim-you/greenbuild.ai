const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init to get client
        // Actually there isn't a direct listModels on the client instance in some versions, 
        // but usually it's exposed differently or we just try a generation.
        // Wait, the error says: "Call ListModels to see the list..."
        // In the Node SDK, it's often a separate call or not directly exposed easily without the full client.
        // Let's rely on a reliable "gemini-pro" test first or just try to generate with it.

        // Changing approach: Let's just try to generate 'Hello' with a few common models and see which one doesn't error.
        const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];

        for (const modelName of modelsToTest) {
            console.log(`Testing model: ${modelName}...`);
            try {
                const m = genAI.getGenerativeModel({ model: modelName });
                await m.generateContent("Hello");
                console.log(`SUCCESS: ${modelName} is working.`);
                return; // Found one!
            } catch (e) {
                console.log(`FAILED: ${modelName} - ${e.message.split('\n')[0]}`);
            }
        }
    } catch (error) {
        console.error("Fatal error:", error);
    }
}

listModels();
