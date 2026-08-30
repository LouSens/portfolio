# David Kurniawan — Full-Stack & AI Systems Portfolio

A high-performance, interactive portfolio and system architecture platform built with **React 19**, **Three.js / WebGL**, **Framer Motion**, **Tailwind CSS**, and **Cloudflare Workers**. Engineered to present both client-oriented finished solutions and deep technical architecture specifications.

![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)
![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-KV_Storage-F38020?logo=cloudflare&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-ff0055?logo=framer&logoColor=white)

---

## ✨ Key Architectural Highlights & Features

- 🌌 **GPU-Accelerated 3D Particle Field** — WebGL particle dynamics field rendering 2,200 dynamic particles with real-time rotational inertia, depth attenuation, and cursor parallax tracking via Three.js.
- ⚡ **Kinetic Motion & Smooth Scrolling** — Friction-based inertial scrolling integrated with **Lenis** and top scroll progress indicator.
- 🛸 **Smart Direction-Aware Liquid Glass Navigation** — Floating header dock that detects directional scroll momentum, auto-hiding on scroll-down and instantly revealing on scroll-up.
- 🎠 **3D Orbital Projects Carousel** — Hardware-accelerated 3D carousel with swipe gesture support on mobile, deep-linking (`#project=id`), and expanded engineering dossiers.
- 📑 **Comprehensive System Dossier Modals** — Multi-tab project inspector featuring:
  - **The Business Challenge & Finished Solution** bento breakdown
  - **Key Outcomes Delivered** metrics
  - **Interactive 16-Screen UI Flow Gallery** with slideshow controls
  - **6-Node Interactive System Architecture Pipelines**
  - **Verified Code Implementation Snippets** with syntax highlighting & instant copy
- 🛠 **Finished Solutions Workbench** — Interactive service matrix breaking down the business problem, delivered outcomes, and technical specifications across Full-Stack Web Apps, Scalable Backends, Autonomous AI Agents, and Enterprise Search.
- 📬 **Serverless Global Inquiry Engine** — Real-time cross-device global tracking powered by a **Cloudflare Worker** + **KV Storage** backend with automated **Web3Forms** email dispatch and client-side confirmation receipts.
- 🎓 **Credentials & Academic Honors Showcase** — Visual certificate viewer and video showcase for Dean's List (3 consecutive semesters, 3.84/4.00 GPA) and competition awards (SEA-CICSIC Silver Award, DPickleball RL 3rd Place).

---

## 🛠 Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 & Vite 5 | Fast component rendering, state hooks & sub-300ms builds |
| **Styling & Design System** | Tailwind CSS 3 & Vanilla CSS | Liquid glassmorphism, HSL color tokens & CSS specular effects |
| **3D & WebGL Graphics** | Three.js | GPU-accelerated particle fields and spatial depth attenuation |
| **Animations & Motion** | Framer Motion & Lenis | 60 FPS micro-interactions, layout transitions & inertial scroll |
| **Serverless Backend** | Cloudflare Workers & KV | Cross-device global inquiry counter & serverless API endpoints |
| **Email Dispatch** | Web3Forms API | Direct form email notification transmission |
| **Typography** | Outfit, Inter & DM Mono | Clean hierarchy balancing modern display typography and monospace technical data |
| **Deployment** | Vercel / Cloudflare Edge | Production CDN caching, automated CI/CD and edge delivery |

---

## 📁 Repository Structure

```
portfolio-website/
├── index.html                  # HTML entry point with meta preloads & font declarations
├── package.json                # Dependencies and npm scripts
├── vite.config.js              # Vite build setup with code-splitting chunks
├── tailwind.config.js          # Design system color tokens, keyframes & font families
├── postcss.config.js           # PostCSS Tailwind engine
├── static/                     # High-resolution assets, documents, and screenshots
│   ├── CV_DAVID KURNIAWAN.pdf
│   ├── docs/                   # Business proposals, pitch decks & Dean's List certificates
│   ├── media/                  # Competition photos and RL agent trophies
│   └── screenshots/            # Real platform screenshot suites (KerjaCerdas & Portfolio)
└── src/
    ├── main.jsx                # Application mounting root
    ├── App.jsx                 # Main layout shell with modal & drawer state orchestrators
    ├── index.css               # Core design system tokens, liquid glass utilities & animations
    ├── data/
    │   └── portfolioData.js    # Data store (projects, services, metrics, awards, timeline)
    └── components/
        ├── Hero.jsx            # Confident headline, value proposition & highlights strip
        ├── Navbar.jsx          # Direction-aware floating liquid glass header
        ├── ServicesSection.jsx # Finished solutions matrix with dual business/technical framing
        ├── NetflixProjectsHub.jsx # 3D orbital hardware-accelerated project carousel
        ├── ProjectDetailModal.jsx # Multi-tab engineering dossier (problem, solution, code, UI gallery)
        ├── TechStackMatrix.jsx # Filterable interactive technology & framework matrix
        ├── ExperienceTimeline.jsx # Interactive vertical timeline spine
        ├── CredentialsSection.jsx # Academic honors, 3.84 GPA verification & competition awards
        ├── ScopeInquiryDrawer.jsx # Direct inquiry form synced with Cloudflare Worker + KV
        └── Footer.jsx          # Terminal-inspired footer with live timezone & quick links
```

---

## 💻 Featured Systems & Case Studies

1. **[KerjaCerdas](https://github.com/LouSens/KerjaCerdas.git)** (*Lead Systems Engineer · 2026*)
   - Enterprise Talent AI & Multi-Agent Matching Platform.
   - ReAct Multi-Agent Swarm with LangGraph (Supervisor + parallel worker agents), 5-signal `pgvector` hybrid search, low-latency Gemini multimodal PDF parsing with Token Efficiency Gates, and an Employer Kanban dashboard with E-KYC verification.

2. **[Personal Engineering Portfolio](https://github.com/LouSens/portfolio-website.git)** (*Creator & UI Architect · 2026*)
   - High-performance interactive platform with Three.js particle dynamics, direction-aware liquid glass navigation, 3D project carousel, and Cloudflare Worker + KV global inquiry tracking.

3. **[Orion](https://github.com/LouSens/orion.git)** (*Tech Lead & Backend Architect · May 2026*)
   - AI Expense SaaS & Reimbursement Automation.
   - 6-stage LangGraph state machine, sliding-window rate limiting, deterministic policy evaluation with rapidfuzz duplicate detection, and 85% test coverage across 120 unit tests (*UM Hackathon Top 24 / 100+ Teams*).

4. **[Startup EMP](https://github.com/nerdylive123/Startup-emp.git)** (*Backend & AI Systems Engineer · May 2026*)
   - AI Chief of Staff & Accelerator Cohort Triage Platform.
   - 4-phase LangGraph agent pipeline, FastAPI backend, Pydantic v2 schema coercion, Cloud Run serverless deployment, and vector mentor matching with human-in-the-loop governance.

5. **[NeuralVoid](https://github.com/LouSens/neural-void.git)** (*Full-Stack & ML Engineer · Jan 2026*)
   - Clinical Behavioral Analytics & Machine Learning Platform.
   - 25-feature ML extraction pipeline calculating session velocity, streak entropy, and binge probability feeding an XGBoost / Random Forest ensemble (~96% accuracy) with automated narrative report synthesis.

6. **[Indonesian Legal RAG](https://huggingface.co/HuangYiYang/Llama-3-8B-Indonesian-Legal)** (*ML & Search Engineer · 2026*)
   - Hybrid Statutory Search & Document Retrieval Engine.
   - Parent-Child Hybrid Ensemble RAG (sparse BM25 + dense FAISS) with HyDE hypothesis generation, Cross-Encoder reranking, and exact article citation synthesis published on Hugging Face.

---

## 🏆 Honors & Recognition

- 🥈 **Silver Award — SEA-CICSIC 2026**: China-ASEAN Innovation Competition (Omni-QC industrial defect detection proposal).
- 🥉 **3rd Place — DPickleball AI Tournament** (*Oct 2025*): Unity ML-Agents continuous control reinforcement learning agent (PPO).
- 🌟 **Top 20% Globally — International Quant Championship** (*Apr 2025*): Quantitative problem solving & algorithmic modeling.
- 🎓 **Dean's List (Three Consecutive Semesters)**: Xiamen University Malaysia (Top 16% of cohort, 3.84 / 4.00 GPA).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/LouSens/resume.git
cd resume

# Install dependencies
npm install

# Run local development server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
VITE_CLOUDFLARE_WORKER_URL=https://portfolio-inquiries.your-subdomain.workers.dev
```

### Building for Production

```bash
# Generate optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).