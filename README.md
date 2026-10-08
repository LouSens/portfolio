<div align="center">

# 🌌 David Kurniawan: Portfolio

**Full-Stack & AI Systems Portfolio**

[![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.183-000000?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?logo=framer&logoColor=white)](https://motion.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-KV-F38020?logo=cloudflareworkers&logoColor=white)](https://workers.cloudflare.com/)
[![HyperFrames](https://img.shields.io/badge/HyperFrames-demo%20videos-FF5A36)](https://hyperframes.heygen.com/)

</div>

A portfolio built with **React**, **Three.js**, **Framer Motion** and **Tailwind CSS**. The home page carries the highlights; dedicated pages go deeper on projects, awards and contact, and each project opens into a full case study.

---

## ✨ What is on the site

- 🏠 **Home page as the highlights**: hero, about, a 3D project carousel, the three headline awards, and one-tap contact links.
- 📄 **Dedicated pages**: Projects, Awards and Contact each have their own page (`/#/projects`, `/#/awards`, `/#/contact`), reachable from the navbar and the mobile menu. Pages live behind the hash, so they work on any static host without server rewrites.
- 🎬 **App demos that play in place**: on the Projects page, each card plays a short silent walkthrough of the real app while it is on screen, and pauses when it scrolls away.
- 🎞 **A film with sound**: the RADAR case study carries the 32-second film made for the app (built in Remotion in the RADAR repo, `demo-video/`); its card plays the same film silently.
- 📑 **Case studies**: every project opens a full-screen write-up (`#project=<id>`) with real screens, how it is built, what I built, and the decisions behind it. The back button closes it and returns to where you were.
- 🏆 **Achievements timeline**: every competition and academic result in date order on the Awards page, each with its certificate one tap away, followed by the featured awards with photos, slides and a clip.
- 📬 **Contact**: a message form backed by a **Cloudflare Worker + KV** counter and **Web3Forms** email dispatch.
- 🌌 **Motion**: a WebGL particle field behind the hero (desktop only), **Lenis** smooth scrolling, a scroll progress bar and a floating navbar that hides on scroll-down. Phones skip the heavy effects.

---

## 🛠 Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 & Vite 5 | Components and fast builds |
| **Styling** | Tailwind CSS 3 & plain CSS | Layout, glass surfaces and shared tokens |
| **3D Graphics** | Three.js (React Three Fiber) | Particle field behind the hero |
| **Animation** | Framer Motion & Lenis | Entrance motion, transitions and smooth scroll |
| **Routing** | A small hash router (`src/utils/route.js`) | Pages without a router dependency or server rewrites |
| **Serverless Backend** | Cloudflare Workers & KV | Inquiry counter and API endpoint |
| **Email Dispatch** | Web3Forms API | Contact form notifications |
| **Demo Videos** | HyperFrames, Playwright | Walkthroughs rendered from real captures of each app |
| **Typography** | Inter & JetBrains Mono | Text and code |

---

## 📁 Repository Structure

```
portfolio-website/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite build setup
├── tailwind.config.js          # Design tokens and fonts
├── static/                     # Published assets
│   ├── CV_DAVID KURNIAWAN.pdf
│   ├── docs/                   # Pitch decks, proposals, Dean's List certificates
│   ├── media/                  # Award photos, certificates, demo videos (media/demos)
│   └── screenshots/            # App screens used in the case studies
├── design/
│   ├── previews/               # Concept designs rendered to images (see design/README.md)
│   └── neuralvoid-ui/          # Storyboard for NeuralVoid's interface
├── videos/                     # Demo video sources
│   ├── build-videos.py         # One plan → the three HyperFrames compositions
│   ├── build-storyboards.py    # Storyboard sheets for review
│   ├── kerjacerdas-demo/       # Composition, captures, brief and storyboard
│   ├── orion-demo/             # Same, plus the script that captures the running app
│   ├── neuralvoid-demo/
│   └── neuralvoid-demo-sample/ # Made-up watch history and capture scripts
└── src/
    ├── main.jsx
    ├── App.jsx                 # Page switching, smooth scroll, case study state
    ├── index.css               # Tokens, glass utilities, animations
    ├── data/
    │   └── portfolioData.js    # Projects, awards, achievements timeline, education
    ├── utils/
    │   ├── route.js            # Hash routes for the dedicated pages
    │   └── img.js              # Small-image helpers
    └── components/
        ├── Navbar.jsx              # Floating navbar and mobile menu
        ├── SectionNav.jsx          # Side dots on the home page
        ├── Hero.jsx
        ├── Marquee.jsx             # Tool strip
        ├── About.jsx
        ├── NetflixProjectsHub.jsx  # Home page project carousel
        ├── ProjectsPage.jsx        # Projects page: cards with autoplaying demos
        ├── ProjectDetailModal.jsx  # Full-screen case study
        ├── CredentialsSection.jsx  # Awards: timeline, featured awards, academics
        ├── ScopeInquiryDrawer.jsx  # Contact links and message form
        ├── PageNav.jsx             # "Back to home" and "Next" at the foot of a page
        ├── Lightbox.jsx            # Image viewer
        ├── ParticleCanvas.jsx      # WebGL background
        └── Footer.jsx
```

---

## 🎬 Demo videos

The walkthroughs on the Projects page are silent, captioned videos of about 26 to 31 seconds, built with [HyperFrames](https://hyperframes.heygen.com/) from captures of each app:

| Project | Source of the screens |
|---|---|
| **KerjaCerdas** | Real screenshots of the app |
| **Orion** | The front end run locally and driven with Playwright |
| **NeuralVoid** | The app run locally on a made-up watch history |

To change one, edit the plan in `videos/build-videos.py`, then:

```bash
python videos/build-videos.py          # regenerate the compositions
cd videos/orion-demo
npx hyperframes check                  # lint, layout and contrast checks
npx hyperframes render                 # needs FFmpeg on PATH
```

The web copies in `static/media/demos/` are 720p re-encodes of the renders. Renders and snapshots are not committed.

---

## 💻 Featured Systems & Case Studies

1. **[KerjaCerdas](https://github.com/LouSens/KerjaCerdas.git)** (*Backend & AI · 2026*)
   - AI talent-matching platform that ranks candidates on skills they can prove.
   - Proof-weighted four-factor ranking over `pgvector` embeddings, skill-gap analysis with course recommendations, a LangGraph career advisor, and Gemini CV parsing with PII redaction. Finalist and Tier 3 Award at PIDI Digdaya x Hackathon 2026.

2. **[Orion](https://github.com/LouSens/orion.git)** (*Tech Lead & Backend Architect · 2026*)
   - AI expense reimbursement automation.
   - Six-agent LangGraph workflow, deterministic policy evaluation with duplicate detection, rate limiting, and 85% test coverage. Top 24 of 100+ teams at UMHackathon 2026.

3. **[NeuralVoid](https://github.com/LouSens/neural-void.git)** (*Full-Stack & ML Engineer · Jan 2026*)
   - TikTok habit analytics written for non-technical people.
   - A 25-feature pipeline feeding an XGBoost, Random Forest and Logistic Regression ensemble (~96% accuracy), shown as plain-language numbers, a habit level, and a plan with the hours each change would give back.

4. **[Indonesian Legal RAG](https://huggingface.co/HuangYiYang/Llama-3-8B-Indonesian-Legal)** (*ML & Search Engineer · 2026*)
   - Hybrid statutory search and retrieval.
   - BM25 plus dense retrieval with HyDE, cross-encoder reranking and exact article citations; model published on Hugging Face.

Also on GitHub, not shown on the site: **[Startup EMP](https://github.com/nerdylive123/Startup-emp.git)**, an accelerator triage platform with a four-phase LangGraph pipeline.

---

## 🏆 Honors & Recognition

- 🏅 **Finalist, Tier 3 Award: PIDI Digdaya x Hackathon 2026** (*Sep 2026*): Bank Indonesia. Top 80 of more than 2,000 teams with KerjaCerdas.
- 🥈 **Silver Award: SEA-CICSIC 2026** (*Jun 2026*): China-ASEAN Innovation Competition (Omni-QC).
- 🏅 **Top 24 of 100+ teams: UMHackathon 2026** (*Apr 2026*): Universiti Malaya, with Orion.
- 🥉 **3rd Place: DPickleball AI Tournament** (*Oct 2025*): Unity ML-Agents reinforcement learning agent (PPO).
- 🌟 **Top 20% Globally: International Quant Championship** (*Apr 2025*): WorldQuant, Stage 1; Bronze level in the WorldQuant Challenge.
- 🎓 **Dean's List, three consecutive semesters**: Xiamen University Malaysia (top 16% of cohort, 3.84 / 4.00 GPA).
- 🥇 **Gold medal, Physics: ONSK 2023**: Olimpiade Nasional Sains dan Kedokteran.
- 🏅 **Top 13, Physics: OSN provincial round** (*2023*).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

```bash
git clone https://github.com/LouSens/portfolio.git
cd portfolio

npm install
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
npm run build
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
