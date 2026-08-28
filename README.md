# David Kurniawan — Interactive AI Engineering Portfolio

A high-performance, interactive portfolio and AI architecture showcase built with **React 18**, **Three.js / React Three Fiber**, **Framer Motion 12**, **Lenis**, and **TailwindCSS**. Highlights multi-agent LLM systems, machine learning pipelines, competitive AI awards, and production backend infrastructure.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.36-ff0055?logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Highlights & Key Features

- 🌌 **3D Particle Field & Physics Effects** — Interactive 3D particle sphere header powered by Three.js & `@react-three/fiber` with continuous rotation, mouse cursor ring tracking, and smooth scroll parallax.
- ⚡ **Lenis Smooth Scrolling & Progress Tracking** — Smooth, friction-based inertial scrolling integrated with Lenis and a top scroll progress bar.
- 🚀 **Featured Project Showcase (KerjaCerdas)** — Enterprise talent matching infrastructure featuring an interactive 16-screenshot gallery slideshow with carousel controls and caption overlays.
- 🎞️ **Embedded Media & Document Viewer** — Inline auto-playing video player for RL agent gameplay (DPickleball 3rd place) and photo galleries with downloadable pitch decks, proposals, and certificates.
- 🔄 **Infinite Tech Stack Marquee** — Continuous animated marquee displaying core frameworks (Python, FastAPI, LangChain, PyTorch, TensorFlow, Docker, PostgreSQL, React, etc.).
- 📊 **Dynamic Education Progress Ring** — SVG progress indicator automatically calculating exact degree completion percentage at Xiamen University Malaysia (GPA 3.84/4.00, Dean's List).
- 🎨 **Glassmorphism & Micro-Interactions** — Custom color tokens, mouse-following card spotlights, border gradient cards, shimmer & liquid-metal buttons, and spring-physics mobile navigation.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Core Framework** | React 18 / Vite 5 |
| **Styling & Design** | TailwindCSS 3, Custom Glassmorphism, CSS Variables |
| **3D & Visuals** | Three.js, `@react-three/fiber`, `@react-three/drei`, `@paper-design/shaders` |
| **Animation & Motion** | Framer Motion 12, GSAP, Lenis Smooth Scroll |
| **Icons & UI** | Lucide React, Custom Shimmer & Liquid Metal Buttons |
| **Fonts** | Outfit (Display Headers), Inter & DM Mono (Body / Technical) |

---

## 📁 Project Structure

```
portfolio-website/
├── index.html              # HTML entry point with font preloads
├── package.json            # Scripts and dependencies
├── vite.config.js          # Vite build configuration & aliases (@/ -> src/)
├── tailwind.config.js      # Custom theme, colors & font family definitions
├── postcss.config.js       # PostCSS with Tailwind & Autoprefixer
├── README.md               # Project documentation
├── static/                 # Static assets (PDFs, media videos, screenshots, certificates)
│   ├── CV_DAVID KURNIAWAN.pdf
│   ├── docs/               # Omni-QC pitch decks & merit scholarship letters
│   ├── media/              # Competition videos & photos (DPickleball RL)
│   └── screenshots/        # Project screenshot slideshows (KerjaCerdas)
└── src/
    ├── main.jsx            # React mounting root
    ├── App.jsx             # Comprehensive single-page app layout & components
    ├── index.css           # Global directives, CSS variables & keyframe animations
    └── components/
        └── ui/
            ├── liquid-metal-button.tsx  # WebGL shader-inspired button component
            └── shimmer-button.jsx       # Animated shimmering CTA button
```

---

## 💻 Projects Featured

1. **KerjaCerdas** (*Lead Engineer · 2026*) — Enterprise Talent AI Infrastructure. ReAct Multi-Agent Swarm with LangGraph (Supervisor + parallel worker nodes), 5-signal `pgvector` hybrid search, low-latency PDF extraction, Employer Kanban & E-KYC credential verification.
2. **Startup EMP** (*Backend & AI Engineer · May 2026*) — AI Chief of Staff accelerator platform. 4-phase LangGraph pipeline, FastAPI, Pydantic v2 typing coercion, Cloud Run, vector mentor matching & human-in-the-loop governance.
3. **Orion** (*Tech Lead & Backend · May 2026*) — AI-powered SaaS expense reimbursement platform. 6-stage LangGraph workflow, sliding-window rate limiting, policy evaluation engines, and dual CI/CD pipelines. *UM Hackathon Top 24 / 100+ Teams*.
4. **NeuralVoid** (*Full-Stack Engineer · Jan 2026*) — Clinical-grade behavioural analytics platform. 25-feature ML model (~96% accuracy), XGBoost/scikit-learn, LLM report synthesis, Node.js & FastAPI backend.
5. **Indonesian Legal LLM** (*Solo ML Engineer · 2026*) — Fine-tuning Llama 3 8B with 4-bit QLoRA & Unsloth, GRPO alignment with 4 custom reward functions, Parent-Child BM25 + FAISS RAG system with HyDE reranking. Published on Hugging Face.

---

## 🏆 Competitions & Recognition

- 🥉 **3rd Place — DPickleball AI Competition** (*Oct 2025*): Unity ML-Agents RL agent with PPO training pipeline & reward shaping.
- 🥈 **Silver Award — SEA-CICSIC 2026** (*China-ASEAN Innovation Competition*): Omni-QC real-time defect prediction & manufacturing quality control.
- 🌟 **Top 20% Globally — International Quant Championship** (*Apr 2025*): Quantitative reasoning & analytical problem-solving.
- 🎓 **Dean's List (3 Consecutive Semesters)** & **Merit Scholarship**: Xiamen University Malaysia (Top 16% of cohort, GPA 3.84 / 4.00).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/LouSens/resume.git
cd resume

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will start at `http://localhost:5173`.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).