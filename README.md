# David Huang — Interactive AI Resume

A premium, interactive AI architecture portfolio built with React, Framer Motion, and TailwindCSS. Beyond a static resume, visitors can **interrogate a neural proxy** powered by Google Gemini to explore background and technical depth.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini-API-4285F4?logo=google&logoColor=white)

---

## ✨ Features

- **Agentic Interrogation** — Query David's technical shadow via a sleek, staggered-animation AI terminal.
- **Neural Archive** — A fluid, Netflix-style 프로젝트 vault with Framer Motion layout transitions.
- **Premium Glassmorphism** — Bespoke design system with multi-layered blurs, border gradients, and grain texture.
- **Dynamic Metrics** — Real-time animated counters for GitHub contributions and stack density.
- **Responsive Navigation** — Custom mobile menu with spring physics and seamless section jumping.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Core** | React 18 / Vite 5 |
| **Animation** | Framer Motion 11 |
| **Styling** | TailwindCSS 3 + Custom Glassmorphism Utilities |
| **3D Engine** | Three.js (Procedural Network Background) |
| **AI Core** | Google Gemini API (Flash 2.0) |
| **Typography** | Outfit (Headers) & Inter (Body) |

---

## 📁 Project Structure

```
resume/
├── index.html            # Vite HTML entry point
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
├── postcss.config.js     # PostCSS plugin wiring
├── .env                  # API keys (not committed)
├── .gitignore            # Excludes node_modules, dist, .env
└── src/
    ├── main.jsx          # React entry — mounts <App /> into #root
    ├── App.jsx           # All components (Navbar, Hero, About, Projects, Footer, Three.js)
    └── index.css         # TailwindCSS directives + global styles
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A [Gemini API key](https://aistudio.google.com/apikey) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resume.git
cd resume

# Install dependencies
npm install

# Add your Gemini API key
# Create or edit the .env file in the project root:
echo VITE_GEMINI_API_KEY=your_api_key_here > .env

# Start the development server
npm run dev
```

The app will open automatically at `http://localhost:5173`.

### Build for Production

```bash
npm run build    # Outputs to dist/
npm run preview  # Preview the production build locally
```

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key for AI features |

> ⚠️ The `.env` file is listed in `.gitignore` and will **never** be committed to the repository.

---

## 📝 Customization

- **Personal Info** — Edit `src/App.jsx` to update your name, bio, skills, and contact links
- **Projects** — Modify the `ALL_PROJECTS` array at the top of `src/App.jsx`
- **AI System Prompt** — Customize the knowledge base in the `callGemini` function inside `HeroAISection`
- **Styling** — Adjust `src/index.css` for global styles or modify Tailwind classes inline
- **Fonts** — Swap Google Fonts in `index.html`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).