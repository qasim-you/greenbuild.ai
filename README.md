# GreenBuild AI 🌿

**A Davos-level Decision Intelligence System for Sustainable Construction.**

---

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Status: MVP Live](https://img.shields.io/badge/Status-MVP_Live-success.svg)](https://greenbuild-ai.vercel.app)
[![AI Framework: Groq](https://img.shields.io/badge/AI-Groq_Llama3-orange.svg)](https://groq.com)
[![Next.js: v15](https://img.shields.io/badge/Next.js-v15.1-black.svg)](https://nextjs.org)

GreenBuild AI is a next-generation SaaS platform that empowers developers, architects, and governments to build carbon-negative, affordable, and community-centric infrastructure. By harnessing the power of **Groq-accelerated Llama 3.3**, we turn complex sustainability data into real-time, actionable procurement decisions.

## 🚀 Executive Summary (For Investors)

Construction accounts for **39% of global carbon emissions**. As regulatory pressures (e.g., EU Green Deal, NYC Local Law 97) mount, the industry faces a $10 Trillion challenge: decouple growth from carbon.

**The Problem:** Current sustainability analysis is slow, expensive, and manual (Excel/Consultants). It happens *too late* in the design process to impact material choices effectively.

**The GreenBuild Solution:** An AI-first "copilot" that integrates directly into the pre-construction workflow.
- **Instant Advice:** Real-time feedback on embodied carbon vs. cost.
- **Specific Swaps:** "Switch from X to Y to save Z tons of CO2 and $W."
- **Audit Trail:** Blockchain-ready logging of design decisions for green bond verification.

---

## ✨ Key Features & Product Walkthrough

### 1. 🏗️ The Intelligent Analysis Engine (`/analyze`)
*   **Input:** Users define building typology, area, location, and budget sensitivity.
*   **Processing:** The engine parses ICE v3.0 (Inventory of Carbon & Energy) data to establish a baseline.
*   **Output:** Instant visualization of the carbon footprint.

### 2. 🧠 Groq-Powered Material Optimization (`/results`)
*   **AI Reasoning:** Unlike static calculators, our AI *explains* why a material is better.
*   **XAI (Explainable AI):** "We recommend Cross-Laminated Timber (CLT) because it sequesters carbon and fits your 8-story structural load requirements."
*   **Dynamic Trade-offs:** A live slider lets users toggle between "Budget Priority" and "Climate Priority," retraining the AI model in milliseconds.

### 3. 💼 Enterprise Dashboard (`/dashboard`)
*   **Portfolio Management:** Track carbon reduction across multiple projects.
*   **Collaboration:** Share reports with stakeholders.
*   **Data Persistence:** Securely stored user sessions via Firebase.

### 4. 📊 Investor-Grade Reporting
*   **BOM Export:** Download detailed Bill of Materials for procurement.
*   **Carbon Schedule:** Ready for LEED/BREEAM certification submissions.
*   **Financial Impact:** Cost delta analysis for Green Premium assessment.

---

## 🛠️ Technical Architecture

Built for speed, scale, and future-proofing.

### Core Stack
*   **Frontend Framework:** Next.js 15 (App Router) for server-side rendering and SEO.
*   **Language:** TypeScript (Strict Mode) for enterprise-grade reliability.
*   **Styling:** Tailwind CSS v4 + shadcn/ui for a premium, accessible design system.
*   **State Management:** React Context + Framer Motion for fluid UX.

### AI & Data Layer
*   **LLM Engine:** Groq Cloud (Llama 3.3 70B Versatile). Chosen for its ultra-low latency (<300ms tput), critical for the "real-time slider" feel.
*   **Database:** Firebase Firestore (NoSQL) for flexible schema evolution.
*   **Auth:** Firebase Authentication (OAuth + Email) for secure user management.

### Sustainability Logic
*   **Calculation Engine:** Custom TypeScript implementation of embodied carbon coefficients (`src/lib/carbon-logic.ts`).
*   **Data Sources:** Aligned with RICS (Royal Institution of Chartered Surveyors) and ICE v3.0 standards.

---

## � Business Model & Monetization

GreenBuild AI operates on a freemium SaaS model with marketplace potential.

| Tier | Price | User Profile | Features |
| :--- | :--- | :--- | :--- |
| **Starter** | Free | Students, POCs | 3 Analyses/mo, Basic Reporting |
| **Pro** | $49/mo | Architects, SMEs | Unlimited Projects, AI Optimizer, BOM Export |
| **Enterprise** | Custom | Firms, Govts | API Access, Team SSO, Custom Material DB |

**Secondary Revenue Stream (Future):**
*   **Supplier Marketplace:** Commission on material procurement initiated through the specific product recommendations.

---

## 🌍 Strategic Roadmap (Future Advancements)

### Phase 1: MVP & Validation (Current)
*   [x] Core Carbon Decision Engine
*   [x] AI Recommendation System
*   [x] User Accounts & Dashboard
*   [x] PDF/CSV Export for Reporting

### Phase 2: Integration & Scale (Months 3-6)
*   [ ] **Revit/Rhino Plugin:** Direct integration into CAD software.
*   [ ] **Regional Supplier API:** Real-time pricing from local vendors (e.g., Lowe's, BuildDirect).
*   [ ] **Regulatory Bot:** Auto-fill LEED v4.1 credit forms based on project specs.

### Phase 3: The "Green Twin" (Year 1+)
*   [ ] **IoT Connection:** Link with building sensors for operational carbon tracking.
*   [ ] **Carbon Credits:** Tokenize saved carbon on blockchain for trading.
*   [ ] **Government API:** Automated compliance checking for city planning departments.

---

## 🏁 Getting Started for Developers

### Prerequisites
*   Node.js 18+
*   Firebase Project Credentials
*   Groq API Key (or other AI SDK compatible key)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/qasim-you/greenbuild.ai.git
    cd greenbuild-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create `.env.local` in the root:
    ```env
    # AI Intelligence
    GROQ_API_KEY=your_key_here

    # Backend Services
    NEXT_PUBLIC_FIREBASE_API_KEY=your_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

---

## 🤝 Contact & Fundraising

**GreenBuild AI** is currently raising a **Pre-Seed round** to accelerate our AI model training and pilot with 3 major architectural firms.

*   **Founder:** [Your Name]
*   **Email:** founders@greenbuild.ai
*   **GitHub:** [github.com/qasim-you/greenbuild.ai](https://github.com/qasim-you/greenbuild.ai)

---

*Built with ❤️ for the future of our planet.*
