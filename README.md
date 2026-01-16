# GreenBuild AI

GreenBuild AI is a Davos-level sustainability advisor for construction projects, built with Next.js 15, Google Gemini AI, and Framer Motion.

## 🚀 Features
- **Instant Carbon Analysis**: Embodied carbon estimates based on building specs.
- **AI Recommendations**: personalized suggestions for low-carbon materials via Gemini AI.
- **Cost vs. Carbon Comparison**: Data-driven dashboards to optimize for budget and planet.
- **Visual Impact**: Beautiful charts and comparisons to understand the environmental ROI.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI**: [Google Gemini API](https://aistudio.google.com/)
- **State/Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Visuals**: [Recharts](https://recharts.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)

## 🏁 Getting Started

### 1. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🏗️ Project Structure
- `/src/app`: Page routes and API handlers.
- `/src/components`: UI components (radix + custom).
- `/src/lib`: Logic for carbon calculation and Gemini integration.
- `/public`: Static assets including the hero visualization.

## 🌍 Philosophy
GreenBuild AI is not just a calculator; it's a decision-making assistant designed to empower world leaders, architects, and builders to choose greener options with confidence.
