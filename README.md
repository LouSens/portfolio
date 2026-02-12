# David Huang — Interactive AI Resume

A futuristic, AI-powered interactive resume built with React, TailwindCSS, and Three.js. Instead of a static PDF, visitors can **query an embedded AI assistant** powered by Google Gemini to explore skills, projects, and background in real time.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r128-000000?logo=threedotjs&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini-API-4285F4?logo=google&logoColor=white)

---

## ✨ Features

- **AI Terminal** — Ask questions about skills, projects, and education via a Gemini-powered conversational interface
- **AI Dive** — Each project card has an AI button that generates a technical explanation on demand
- **AI Outreach Generator** — Recruiters enter their company name and get a custom pitch drafted by AI
- **Three.js Particle Background** — Animated 3D neural network particles with responsive performance scaling
- **Project Archive** — Netflix-style filterable library of all projects with category-based navigation
- **Fully Responsive** — Optimized for desktop and mobile with adaptive layouts and a slide-out mobile menu

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Styling** | TailwindCSS 3 + PostCSS + Autoprefixer |
| **3D Graphics** | Three.js (CDN) |
| **AI Backend** | Google Gemini API (generativelanguage) |
| **Fonts** | Inter + JetBrains Mono (Google Fonts) |

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