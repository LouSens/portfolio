import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Zap,
  Bot,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Database,
  Code2,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';

export default function TechStackMatrix({ onOpenProject }) {
  const [activeLayer, setActiveLayer] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);

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

  const STACK_LAYERS = [
    {
      id: 'layer-client',
      number: '01',
      name: 'Client & Interface Tier',
      tagline: 'Modern SPAs, responsive design tokens & predictable reactive client state',
      icon: Globe,
      description:
        'Constructing modular, responsive user interfaces with React 19. Focused on 60fps micro-interactions, clean hook abstractions, and zero layout shift.',
      tools: [
        {
          name: 'React 19',
          role: 'Component architecture, custom hooks & optimistic UI updates',
          connectedTo: 'FastAPI async REST endpoints',
          project: 'KerjaCerdas',
        },
        {
          name: 'JavaScript (ESNext)',
          role: 'Asynchronous event handling, WebSocket streams & DOM logic',
          connectedTo: 'Browser runtime & Web APIs',
          project: 'NeuralVoid',
        },
        {
          name: 'Tailwind CSS',
          role: 'Design tokens, dark-mode glassmorphism & responsive layouts',
          connectedTo: 'React UI component library',
          project: 'Orion',
        },
        {
          name: 'Framer Motion',
          role: 'Hardware-accelerated layout transitions & gesture animations',
          connectedTo: 'React component lifecycle',
          project: 'Portfolio',
        },
        {
          name: 'Zustand',
          role: 'Lightweight reactive global state management',
          connectedTo: 'Client session & filter caches',
          project: 'KerjaCerdas',
        },
      ],
      appliedProjects: ['KerjaCerdas', 'Orion', 'NeuralVoid'],
    },
    {
      id: 'layer-api',
      number: '02',
      name: 'API Gateway & Async Core',
      tagline: 'High-throughput async endpoints, runtime schema enforcement & Redis caching',
      icon: Zap,
      description:
        'Engineering low-latency backend microservices with FastAPI and Python asyncio. Enforcing strict Pydantic v2 data contracts and resilient database indexing.',
      tools: [
        {
          name: 'FastAPI',
          role: 'High-concurrency async REST gateway & automated OpenAPI 3.1 documentation',
          connectedTo: 'React client & background workers',
          project: 'KerjaCerdas',
        },
        {
          name: 'Python Async (asyncio)',
          role: 'Non-blocking I/O event loops for parallel multi-source requests',
          connectedTo: 'Agent execution threads',
          project: 'Startup EMP',
        },
        {
          name: 'Pydantic v2',
          role: 'Type validation, schema coercion & structured LLM JSON repair',
          connectedTo: 'LangGraph output parsers',
          project: 'Orion',
        },
        {
          name: 'PostgreSQL + pgvector',
          role: 'Relational data modeling with HNSW vector index similarity search',
          connectedTo: 'Hybrid retrieval engine',
          project: 'KerjaCerdas',
        },
        {
          name: 'Redis',
          role: 'Sliding-window token bucket rate limiting & session caching',
          connectedTo: 'API gateway middleware',
          project: 'Orion',
        },
      ],
      appliedProjects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
    },
    {
      id: 'layer-agents',
      number: '03',
      name: 'Agent Swarms & Machine Learning',
      tagline: 'LangGraph cyclical supervisor swarms, hybrid vector retrieval & predictive ML',
      icon: Bot,
      description:
        'Orchestrating autonomous multi-agent state graphs, parent-child hybrid retrieval engines (FAISS + BM25), cross-encoder neural rerankers, and XGBoost models.',
      tools: [
        {
          name: 'LangGraph',
          role: 'Cyclical state graphs, supervisor-worker routing & human validation gates',
          connectedTo: 'FastAPI async pipeline',
          project: 'Startup EMP',
        },
        {
          name: 'FAISS & BM25',
          role: 'Hybrid dense + sparse parent-child document chunk retrieval with RRF',
          connectedTo: 'Cross-encoder reranker',
          project: 'Indonesian Legal RAG',
        },
        {
          name: 'Cross-Encoders',
          role: 'High-precision transformer reranking on top-K document candidates',
          connectedTo: 'Context synthesis node',
          project: 'Indonesian Legal RAG',
        },
        {
          name: 'PyTorch & scikit-learn',
          role: '25-feature tabular ML classification & XGBoost behavioral models (96.2%)',
          connectedTo: 'Clinical prediction pipeline',
          project: 'NeuralVoid',
        },
        {
          name: 'LangSmith',
          role: 'Full-trajectory agent execution tracing, latency audits & regression evals',
          connectedTo: 'Production agent swarm',
          project: 'Startup EMP',
        },
      ],
      appliedProjects: ['Startup EMP', 'Indonesian Legal RAG', 'NeuralVoid'],
    },
    {
      id: 'layer-infra',
      number: '04',
      name: 'DevOps, CI/CD & Cloud Infrastructure',
      tagline: 'Multi-container Docker isolation, automated PR quality gates & cloud deployments',
      icon: ShieldCheck,
      description:
        'Hardening production deployments with Docker multi-stage builds, automated GitHub Actions regression testing (85% coverage), and cloud hosting.',
      tools: [
        {
          name: 'Docker & Compose',
          role: 'Multi-service containerization, isolated environments & volume caching',
          connectedTo: 'Cloud Run & Railway runtime',
          project: 'KerjaCerdas',
        },
        {
          name: 'GitHub Actions',
          role: 'Automated CI/CD pipelines, linting, type checks & automated test gates',
          connectedTo: 'Main deployment branch',
          project: 'Orion',
        },
        {
          name: 'Google Cloud Run & Vercel',
          role: 'Serverless container orchestration & global edge CDN distribution',
          connectedTo: 'Production domain ingress',
          project: 'Startup EMP',
        },
        {
          name: 'Pytest & Coverage',
          role: 'Automated unit and integration test suites enforcing > 85% test coverage',
          connectedTo: 'CI/CD pipeline checks',
          project: 'Orion',
        },
      ],
      appliedProjects: ['All Production Builds'],
    },
  ];

  const currentLayer = STACK_LAYERS[activeLayer];

  return (
    <section
      id="stack"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#050507] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[var(--accent)]/[0.025] rounded-full blur-[190px]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ── EDITORIAL HEADER ── */}
        <div className="max-w-xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-[var(--accent)]" />
            <span className="font-mono-dm text-xs text-[var(--accent)]">
              Architecture Stack
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3">
            Technical Ecosystem
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
            An interconnected system topology illustrating how client interfaces, async APIs, multi-agent swarms, and cloud infrastructure integrate.
          </p>
        </div>

        {/* ── 4-LAYER INTERACTIVE SPECTRUM CONTROLLER ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {STACK_LAYERS.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === idx;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setActiveLayer(idx);
                  setSelectedTool(null);
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-white/30 bg-[#0E0E15] shadow-xl'
                    : 'border-white/5 bg-[#08080C] hover:bg-[#0D0D13] hover:border-white/15'
                }`}
              >
                {/* Top subtle highlight */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
                )}

                <span className="font-mono-dm text-xs text-white/40 block mb-1">
                  Layer {layer.number}
                </span>

                <div className="flex items-center gap-2">
                  <Icon
                    size={15}
                    className={isSelected ? 'text-[var(--accent)]' : 'text-white/50'}
                  />
                  <h3
                    className={`font-display font-bold text-xs sm:text-sm truncate ${
                      isSelected ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {layer.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── LAYER INSPECTOR WORKBENCH ── */}
        <div className="rounded-3xl border border-white/10 bg-[#09090E]/95 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Layer Overview & Verified Projects */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono-dm text-xs text-[var(--accent)] block mb-1">
                  Layer {currentLayer.number} Scope
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2">
                  {currentLayer.name}
                </h3>
                <p className="font-mono-dm text-xs text-white/45 mb-4">
                  {currentLayer.tagline}
                </p>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  {currentLayer.description}
                </p>
              </div>

              {/* Verified in Live Builds */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="font-mono-dm text-xs text-white/40 mr-1">
                  Proven in live builds:
                </span>
                {currentLayer.appliedProjects.map((proj) => (
                  <button
                    key={proj}
                    onClick={() => handleProjectClick(proj)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-dm text-xs transition-colors"
                  >
                    <span>{proj}</span>
                    <ArrowUpRight size={11} className="text-white/50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Tech Node Grid */}
            <div className="lg:col-span-7 space-y-3">
              <span className="font-mono-dm text-xs text-white/40 block pb-1 border-b border-white/10">
                Core Technologies &amp; Architecture Roles (Tap to Inspect)
              </span>

              <div className="space-y-2.5">
                {currentLayer.tools.map((tool) => {
                  const isOpened = selectedTool === tool.name;

                  return (
                    <div
                      key={tool.name}
                      onClick={() => setSelectedTool(isOpened ? null : tool.name)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isOpened
                          ? 'border-[var(--accent)]/50 bg-[#0E0E16] shadow-lg'
                          : 'border-white/5 bg-[#050508] hover:bg-[#09090E] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          <h4 className="font-display font-bold text-sm sm:text-base text-white">
                            {tool.name}
                          </h4>
                        </div>

                        <span className="font-mono-dm text-[11px] text-white/40">
                          {tool.connectedTo}
                        </span>
                      </div>

                      <p className="font-mono-dm text-xs text-white/60 mt-1.5 leading-relaxed">
                        {tool.role}
                      </p>

                      {/* Expanded Production Link */}
                      {isOpened && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between"
                        >
                          <span className="font-mono-dm text-[11px] text-white/40">
                            Implemented in: <span className="text-white">{tool.project}</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(tool.project);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-mono-dm text-[var(--accent)] hover:underline"
                          >
                            <span>Inspect Project</span>
                            <ArrowRight size={11} />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
