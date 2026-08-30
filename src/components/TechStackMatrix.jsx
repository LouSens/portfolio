import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');

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
      role: 'UI Architecture & Hooks',
      svg: 'https://cdn.simpleicons.org/react/white',
    },
    {
      name: 'JavaScript',
      category: 'frontend',
      role: 'ESNext Async Logic',
      svg: 'https://cdn.simpleicons.org/javascript/white',
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      role: 'Design System & Tokens',
      svg: 'https://cdn.simpleicons.org/tailwindcss/white',
    },
    {
      name: 'Framer Motion',
      category: 'frontend',
      role: '60fps Micro-Interactions',
      svg: 'https://cdn.simpleicons.org/framer/white',
    },
    {
      name: 'Three.js',
      category: 'frontend',
      role: '3D Graphics & Particle Systems',
      svg: 'https://cdn.simpleicons.org/threedotjs/white',
    },

    // Backend
    {
      name: 'Python',
      category: 'backend',
      role: 'Async Core & Concurrency',
      svg: 'https://cdn.simpleicons.org/python/white',
    },
    {
      name: 'FastAPI',
      category: 'backend',
      role: 'High-Concurrency REST APIs',
      svg: 'https://cdn.simpleicons.org/fastapi/white',
    },
    {
      name: 'PostgreSQL',
      category: 'backend',
      role: 'pgvector HNSW Indexing',
      svg: 'https://cdn.simpleicons.org/postgresql/white',
    },
    {
      name: 'Redis',
      category: 'backend',
      role: 'Rate Limiting & Caching',
      svg: 'https://cdn.simpleicons.org/redis/white',
    },
    {
      name: 'Pydantic v2',
      category: 'backend',
      role: 'Type Validation & Schemas',
      svg: 'https://cdn.simpleicons.org/pydantic/white',
    },

    // AI & Machine Learning
    {
      name: 'LangGraph',
      category: 'ai',
      role: 'Multi-Agent Swarm Graphs',
      svg: 'https://cdn.simpleicons.org/langchain/white',
    },
    {
      name: 'PyTorch',
      category: 'ai',
      role: 'Deep Learning & Neural Models',
      svg: 'https://cdn.simpleicons.org/pytorch/white',
    },
    {
      name: 'scikit-learn',
      category: 'ai',
      role: 'XGBoost & Predictive ML',
      svg: 'https://cdn.simpleicons.org/scikitlearn/white',
    },
    {
      name: 'TensorFlow',
      category: 'ai',
      role: 'Computer Vision Architectures',
      svg: 'https://cdn.simpleicons.org/tensorflow/white',
    },
    {
      name: 'LangSmith',
      category: 'ai',
      role: 'Agent Tracing & Observability',
      svg: 'https://cdn.simpleicons.org/langchain/white',
    },

    // DevOps & Cloud
    {
      name: 'Docker',
      category: 'devops',
      role: 'Containerization & Isolation',
      svg: 'https://cdn.simpleicons.org/docker/white',
    },
    {
      name: 'GitHub Actions',
      category: 'devops',
      role: 'Automated CI/CD Quality Gates',
      svg: 'https://cdn.simpleicons.org/githubactions/white',
    },
    {
      name: 'Google Cloud',
      category: 'devops',
      role: 'Cloud Run & Serverless Hosting',
      svg: 'https://cdn.simpleicons.org/googlecloud/white',
    },
    {
      name: 'Vercel',
      category: 'devops',
      role: 'Edge CDN & Serverless Compute',
      svg: 'https://cdn.simpleicons.org/vercel/white',
    },
    {
      name: 'Pytest',
      category: 'devops',
      role: 'Automated Test Suites',
      svg: 'https://cdn.simpleicons.org/pytest/white',
    },
  ];

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="stack"
      className="py-28 md:py-36 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none bg-gradient-to-b from-[#050508] via-[#060D0C] to-[#050508]"
    >
      {/* ── CYBER MATRIX GRID BACKDROP ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.12)_1px,transparent_1px)] [background-size:24px_24px]"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 25%, transparent 75%)',
        }}
      />

      {/* Ambient cyber emerald lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-emerald-500/[0.05] rounded-full blur-[190px]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ── SECTION HEADER & FILTER PILLS ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-3">
              Tools &amp; Frameworks{' '}
              <span className="text-emerald-400 relative inline-block whitespace-nowrap after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-emerald-400/80 after:rounded-full after:shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                Built to Scale
              </span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base font-normal leading-relaxed">
              Production tools utilized across full-stack web applications, multi-agent swarms, and cloud infrastructure.
            </p>
          </div>

          {/* Liquid Glass Filter Pills with Spring Indicator */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl shadow-md shrink-0 relative max-w-full">
            {TECH_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-display text-xs transition-colors duration-200 cursor-pointer relative z-10 ${
                    isSelected ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-[var(--accent)] rounded-xl shadow-[0_4px_16px_rgba(255,90,54,0.35)] -z-10"
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── LIQUID GLASS SPOTLIGHT GRID ── */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4"
        >
          {TECH_ITEMS.map((tool) => {
            const isMatch = activeCategory === 'all' || tool.category === activeCategory;

            return (
              <motion.div
                key={tool.name}
                variants={gridItemVariants}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[125px] sm:h-[135px] relative overflow-hidden cursor-default ${
                  isMatch
                    ? 'border-white/[0.12] bg-gradient-to-br from-white/[0.05] via-[#0A0B10]/95 to-[#06070A]/95 shadow-[0_12px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.12)] opacity-100 scale-100 hover:border-white/[0.22] hover:-translate-y-1'
                    : 'border-white/[0.03] bg-[#06070A]/30 opacity-20 scale-[0.98] pointer-events-none'
                }`}
              >
                {/* Subtle top ambient glow on active matching items */}
                {isMatch && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}

                {/* Logo & Category indicator dot */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center p-2 transition-all duration-200 shadow-sm ${
                      isMatch
                        ? 'bg-white/[0.05] border-white/[0.1] group-hover:scale-105 group-hover:bg-white/[0.09] group-hover:border-[var(--accent)]/40'
                        : 'bg-transparent border-white/[0.04]'
                    }`}
                  >
                    <img
                      src={tool.svg}
                      alt={tool.name}
                      className={`w-full h-full object-contain transition-all duration-200 ${
                        isMatch
                          ? 'filter grayscale group-hover:grayscale-0'
                          : 'filter grayscale opacity-40'
                      }`}
                      loading="lazy"
                    />
                  </div>

                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                      isMatch
                        ? 'bg-white/20 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_8px_var(--accent)]'
                        : 'bg-transparent'
                    }`}
                  />
                </div>

                {/* Name & Role Tag */}
                <div>
                  <h3
                    className={`font-display font-bold text-sm sm:text-base tracking-tight leading-tight truncate transition-colors duration-200 ${
                      isMatch ? 'text-white group-hover:text-[var(--accent)]' : 'text-white/40'
                    }`}
                  >
                    {tool.name}
                  </h3>
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] block mt-0.5 truncate transition-colors duration-200 ${
                      isMatch ? 'text-white/45' : 'text-white/20'
                    }`}
                  >
                    {tool.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
