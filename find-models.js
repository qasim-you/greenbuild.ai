const { GoogleGenerativeAI } = require("@google/generative-ai");
;

async function run() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-pro", "gemini-2.0-flash-exp"];

    for (const modelName of modelsToTest) {
        try {
            console.log(`Testing ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log(`✅ ${modelName} works!`);
        } catch (e) {
            console.log(`❌ ${modelName} failed: ${e.message}`);
        }
    }
}

run();
