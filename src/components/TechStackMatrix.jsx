import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';

export default function TechStackMatrix({ onOpenProject }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleProjectClick = (projectName) => {
    const found = PROJECTS_DATA.find(
      (p) =>
        p.title.toLowerCase().includes(projectName.toLowerCase()) ||
        p.id.toLowerCase().includes(projectName.toLowerCase())
    );
    if (found) {
      onOpenProject(found);
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const TECH_CATEGORIES = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI & Systems' },
    { id: 'devops', label: 'DevOps & Cloud' },
  ];

  const TECH_ITEMS = [
    // Frontend
    {
      name: 'React 19',
      category: 'frontend',
      role: 'UI Architecture',
      svg: 'https://cdn.simpleicons.org/react/white',
      project: 'KerjaCerdas',
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      role: 'ESNext Async',
      svg: 'https://cdn.simpleicons.org/javascript/white',
      project: 'NeuralVoid',
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      role: 'Design System',
      svg: 'https://cdn.simpleicons.org/tailwindcss/white',
      project: 'Orion',
    },
    {
      name: 'Framer Motion',
      category: 'frontend',
      role: '60fps Physics',
      svg: 'https://cdn.simpleicons.org/framer/white',
      project: 'Portfolio',
    },
    {
      name: 'Three.js',
      category: 'frontend',
      role: '3D Graphics',
      svg: 'https://cdn.simpleicons.org/threedotjs/white',
      project: 'Portfolio',
    },

    // Backend
    {
      name: 'Python',
      category: 'backend',
      role: 'Async Core',
      svg: 'https://cdn.simpleicons.org/python/white',
      project: 'KerjaCerdas',
    },
    {
      name: 'FastAPI',
      category: 'backend',
      role: 'High-Concurrency APIs',
      svg: 'https://cdn.simpleicons.org/fastapi/white',
      project: 'KerjaCerdas',
    },
    {
      name: 'PostgreSQL',
      category: 'backend',
      role: 'pgvector HNSW',
      svg: 'https://cdn.simpleicons.org/postgresql/white',
      project: 'KerjaCerdas',
    },
    {
      name: 'Redis',
      category: 'backend',
      role: 'Rate Limiting & Cache',
      svg: 'https://cdn.simpleicons.org/redis/white',
      project: 'Orion',
    },
    {
      name: 'Pydantic v2',
      category: 'backend',
      role: 'Type Validation',
      svg: 'https://cdn.simpleicons.org/pydantic/white',
      project: 'Startup EMP',
    },

    // AI & Machine Learning
    {
      name: 'LangGraph',
      category: 'ai',
      role: 'Agent Swarms',
      svg: 'https://cdn.simpleicons.org/langchain/white',
      project: 'Startup EMP',
    },
    {
      name: 'PyTorch',
      category: 'ai',
      role: 'Neural Networks',
      svg: 'https://cdn.simpleicons.org/pytorch/white',
      project: 'Indonesian Legal RAG',
    },
    {
      name: 'scikit-learn',
      category: 'ai',
      role: 'XGBoost & ML',
      svg: 'https://cdn.simpleicons.org/scikitlearn/white',
      project: 'NeuralVoid',
    },
    {
      name: 'TensorFlow',
      category: 'ai',
      role: 'Deep Learning',
      svg: 'https://cdn.simpleicons.org/tensorflow/white',
      project: 'Omni-QC',
    },
    {
      name: 'LangSmith',
      category: 'ai',
      role: 'Agent Observability',
      svg: 'https://cdn.simpleicons.org/langchain/white',
      project: 'Startup EMP',
    },

    // DevOps & Cloud
    {
      name: 'Docker',
      category: 'devops',
      role: 'Containerization',
      svg: 'https://cdn.simpleicons.org/docker/white',
      project: 'KerjaCerdas',
    },
    {
      name: 'GitHub Actions',
      category: 'devops',
      role: 'Automated CI/CD',
      svg: 'https://cdn.simpleicons.org/githubactions/white',
      project: 'Orion',
    },
    {
      name: 'Google Cloud',
      category: 'devops',
      role: 'Cloud Run Hosting',
      svg: 'https://cdn.simpleicons.org/googlecloud/white',
      project: 'Startup EMP',
    },
    {
      name: 'Vercel',
      category: 'devops',
      role: 'Edge CDN',
      svg: 'https://cdn.simpleicons.org/vercel/white',
      project: 'KerjaCerdas',
    },
    {
      name: 'Pytest',
      category: 'devops',
      role: '85%+ Test Suites',
      svg: 'https://cdn.simpleicons.org/pytest/white',
      project: 'Orion',
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? TECH_ITEMS
      : TECH_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="stack"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#050507] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[var(--accent)]/[0.025] rounded-full blur-[190px]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ── SECTION HEADER & FILTER PILLS ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[var(--accent)]" />
              <span className="font-mono-dm text-xs text-[var(--accent)]">
                Core Stack
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-2">
              Technologies &amp; Frameworks
            </h2>

            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
              Production tools utilized across full-stack web applications, multi-agent swarms, and cloud infrastructure.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 shrink-0">
            {TECH_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono-dm text-xs transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent)] text-white font-semibold shadow-md shadow-[var(--accent)]/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── VISUAL TECH LOGO GRID (SCANNABLE IN 2 SECONDS) ── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4"
        >
          {filteredItems.map((tool, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: idx * 0.02 }}
              key={tool.name}
              onClick={() => handleProjectClick(tool.project)}
              className="group p-4 sm:p-5 rounded-2xl border border-white/5 bg-[#09090E]/90 hover:bg-[#0E0E16] hover:border-white/20 transition-all duration-200 flex flex-col justify-between h-[130px] sm:h-[140px] shadow-lg relative overflow-hidden cursor-pointer"
            >
              {/* Subtle top ambient glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Logo & Direct Project Arrow */}
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-200 shadow-sm">
                  <img
                    src={tool.svg}
                    alt={tool.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                    loading="lazy"
                  />
                </div>

                <ArrowUpRight
                  size={14}
                  className="text-white/30 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>

              {/* Name & Role Tag */}
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-tight leading-tight truncate">
                  {tool.name}
                </h3>
                <span className="font-mono-dm text-[10px] sm:text-[11px] text-white/45 block mt-0.5 truncate">
                  {tool.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── FOOTER PROMPT ── */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono-dm text-white/40">
          <span>Tap any framework to inspect its real-world implementation</span>
          <span className="text-[var(--accent)] font-medium">Production Verified</span>
        </div>
      </div>
    </section>
  );
}
