import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Zap,
  Bot,
  ShieldCheck,
  ArrowUpRight,
  Database,
  Layers,
  Brain,
  Workflow,
  Server,
  Sparkles,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';

export default function TechStackMatrix({ onOpenProject }) {
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

  const BENTO_QUADRANTS = [
    {
      id: 'frontend',
      number: '01',
      category: 'Frontend & UI Engineering',
      tagline: 'Modern SPAs, responsive design systems & clean state architecture',
      icon: Globe,
      accentColor: 'text-[#FF5A36]',
      borderColor: 'group-hover:border-[#FF5A36]/40',
      tools: [
        {
          name: 'React 19 & JavaScript',
          detail: 'Single-page applications, custom hooks & modular UI architecture',
          projects: ['KerjaCerdas', 'Orion', 'NeuralVoid'],
        },
        {
          name: 'Tailwind CSS & Framer Motion',
          detail: 'Curated design tokens, responsive layouts & 60fps micro-interactions',
          projects: ['All Systems'],
        },
        {
          name: 'Zustand State Management',
          detail: 'Predictable client-side state for complex multi-role workflows',
          projects: ['KerjaCerdas'],
        },
      ],
    },
    {
      id: 'backend',
      number: '02',
      category: 'Backend & API Infrastructure',
      tagline: 'High-throughput async services, type contracts & relational modeling',
      icon: Zap,
      accentColor: 'text-[#38bdf8]',
      borderColor: 'group-hover:border-[#38bdf8]/40',
      tools: [
        {
          name: 'FastAPI (Python Async)',
          detail: 'High-concurrency async REST endpoints with automated OpenAPI specs',
          projects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
        },
        {
          name: 'PostgreSQL + pgvector',
          detail: 'Relational data modeling, HNSW indexing & vector cosine similarity',
          projects: ['KerjaCerdas'],
        },
        {
          name: 'Pydantic v2 & Type Safety',
          detail: 'Runtime schema validation, typed data contracts & LLM output coercion',
          projects: ['KerjaCerdas', 'Startup EMP', 'Orion'],
        },
      ],
    },
    {
      id: 'ai-agents',
      number: '03',
      category: 'Multi-Agent AI & Retrieval',
      tagline: 'Autonomous LangGraph swarms, hybrid search & reranking gates',
      icon: Bot,
      accentColor: 'text-[#a855f7]',
      borderColor: 'group-hover:border-[#a855f7]/40',
      tools: [
        {
          name: 'LangGraph & Supervisor Swarms',
          detail: 'Cyclical state graphs, parallel worker routing & human-in-the-loop validation',
          projects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
        },
        {
          name: 'Hybrid Search (FAISS + BM25)',
          detail: 'Parent-Child dense vector + sparse keyword search with cross-encoders',
          projects: ['Indonesian Legal RAG', 'KerjaCerdas'],
        },
        {
          name: 'PyTorch & scikit-learn',
          detail: 'Ensemble ML classifiers (XGBoost), feature engineering & tabular models',
          projects: ['NeuralVoid'],
        },
      ],
    },
    {
      id: 'devops',
      number: '04',
      category: 'DevOps, Testing & Cloud',
      tagline: 'Containerized deployment, automated CI/CD test gates & cloud hosting',
      icon: ShieldCheck,
      accentColor: 'text-[#10b981]',
      borderColor: 'group-hover:border-[#10b981]/40',
      tools: [
        {
          name: 'Docker & Docker Compose',
          detail: 'Isolated multi-container service packaging & reproducible environments',
          projects: ['KerjaCerdas', 'Orion'],
        },
        {
          name: 'GitHub Actions CI/CD',
          detail: 'Automated pull-request quality gates (85% coverage) & nightly regressions',
          projects: ['Orion', 'KerjaCerdas'],
        },
        {
          name: 'Cloud Run, Vercel & Railway',
          detail: 'Serverless microservice deployment, edge routing & cloud hosting',
          projects: ['Startup EMP', 'NeuralVoid'],
        },
      ],
    },
  ];

  return (
    <section
      id="stack"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#050507] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background subtle glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--accent)]/[0.025] rounded-full blur-[180px]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-px bg-[var(--accent)]" />
            <span className="font-mono-dm text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Technical Ecosystem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3"
          >
            Core Tech Stack
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-sm sm:text-base font-light leading-relaxed"
          >
            A cohesive view of production technologies across frontend, backend, agentic AI, and cloud infrastructure.
          </motion.p>
        </div>

        {/* ── 4-QUADRANT BENTO GRID (SPACIOUS & STABLE) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {BENTO_QUADRANTS.map((quadrant, idx) => {
            const Icon = quadrant.icon;
            return (
              <motion.div
                key={quadrant.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group rounded-3xl border border-white/10 bg-[#09090E]/90 backdrop-blur-xl p-7 sm:p-9 transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden hover:bg-[#0E0E16] hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-default`}
              >
                {/* Top ambient highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Quadrant Header */}
                  <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Icon size={20} className={quadrant.accentColor} />
                      </div>
                      <div>
                        <span className="font-mono-dm text-[10px] uppercase tracking-widest text-white/40 block">
                          Quadrant {quadrant.number}
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-white transition-colors">
                          {quadrant.category}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {quadrant.tagline}
                  </p>

                  {/* Tool Cards List */}
                  <div className="space-y-4">
                    {quadrant.tools.map((tool, ti) => (
                      <div
                        key={tool.name}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                          <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            {tool.name}
                          </h4>

                          {/* Applied project links */}
                          <div className="flex flex-wrap gap-1 mt-1 sm:mt-0">
                            {tool.projects.map((proj) => (
                              <button
                                key={proj}
                                onClick={() => handleProjectClick(proj)}
                                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white/5 hover:bg-[var(--accent)]/15 border border-white/5 hover:border-[var(--accent)]/30 font-mono-dm text-[9px] text-white/65 hover:text-[var(--accent)] transition-colors"
                              >
                                <span>{proj}</span>
                                <ArrowUpRight size={8} className="opacity-40" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="text-white/55 text-xs font-light leading-relaxed">
                          {tool.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metadata bar */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-dm text-white/40">
                  <span>Production Ready</span>
                  <span className="text-[var(--accent)] font-medium">Verified in Live Builds</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
