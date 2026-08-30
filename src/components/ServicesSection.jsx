import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Bot,
  Brain,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Check,
  ShieldCheck,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { PROJECTS_DATA, HOW_WE_WORK } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
  const [activeTab, setActiveTab] = useState(0);

  const SERVICES_LIST = [
    {
      id: 'fullstack',
      number: '01',
      title: 'Full-Stack Web Apps & Portals',
      tagline: 'Modern Web Applications & Client Dashboards',
      icon: Globe,
      problem:
        'Businesses lose potential customers and slow down daily operations when relying on outdated, slow websites or fragmented spreadsheets.',
      solution:
        'Complete, production-ready web applications with modern user interfaces, client portals, and lightning-fast loading speeds on all devices.',
      businessOutcomes: [
        'Sub-second page load times for higher conversion and retention',
        'Intuitive client dashboards reducing user confusion and support requests',
        'Secure user login and role-based permissions out of the box',
        '100% responsive layouts optimized for mobile, tablet, and desktop',
      ],
      scopePackage: {
        windowTitle: 'Scope & Deliverables — Web Application',
        liveProject: 'KerjaCerdas',
        liveUrl: 'http://kerja-cerdas.replit.app/',
        deliverables: [
          {
            title: 'Interactive Frontend Application',
            desc: 'Single-page application with responsive layouts, smooth micro-interactions, and instant navigation.',
          },
          {
            title: 'Authentication & Session Security',
            desc: 'Secure user onboarding, role-based permissions, and password-protected admin dashboards.',
          },
          {
            title: 'Client Dashboard & Workflow Portal',
            desc: 'Intuitive data tables, forms, kanban boards, and status tracking tailored to your workflow.',
          },
          {
            title: 'Cloud Deployment & Documentation',
            desc: 'Automated CI/CD deployment, custom domain setup, and complete handover documentation.',
          },
        ],
        frameworks: ['React 19', 'Tailwind CSS', 'FastAPI', 'Vercel / Cloud'],
      },
      provenBuilds: ['KerjaCerdas', 'Portfolio', 'NeuralVoid'],
    },
    {
      id: 'backend',
      number: '02',
      title: 'Scalable Backends & Data Infrastructure',
      tagline: 'High-Speed APIs & Cloud Reliability',
      icon: Layers,
      problem:
        'System slowdowns, database bottlenecks, and data security risks cause lost revenue and frustrate customers during high traffic.',
      solution:
        'Scalable cloud backends and high-speed databases designed to handle high concurrency, protect client data, and process complex operations in milliseconds.',
      businessOutcomes: [
        '99.9% uptime architecture ready for traffic surges without crashing',
        'Built-in rate limiting defense protecting against spam and bot abuse',
        'Sub-second database queries and instant data retrieval for end users',
        'Automated background processing so users never wait on heavy tasks',
      ],
      scopePackage: {
        windowTitle: 'Scope & Deliverables — Cloud Backend & DB',
        liveProject: 'Orion',
        liveUrl: null,
        deliverables: [
          {
            title: 'RESTful API Services',
            desc: 'Asynchronous API endpoints with strict data validation contracts and auto-generated documentation.',
          },
          {
            title: 'High-Throughput Database Architecture',
            desc: 'Optimized relational and vector database schemas (PostgreSQL / Redis) built for fast queries.',
          },
          {
            title: 'Rate Limiting & DDoS Defense',
            desc: 'In-memory sliding-window request throttling to protect your platform from abuse and bots.',
          },
          {
            title: 'Automated Background Processing',
            desc: 'Async worker pipelines so users never experience delays while heavy tasks run behind the scenes.',
          },
        ],
        frameworks: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
      },
      provenBuilds: ['KerjaCerdas', 'Orion', 'Startup EMP'],
    },
    {
      id: 'agents',
      number: '03',
      title: 'Autonomous AI Agents & Workflows',
      tagline: 'Multi-Step AI Automation & Document Processing',
      icon: Bot,
      problem:
        'Teams drown in repetitive manual tasks—reading PDFs, sorting leads, and copying data—costing hundreds of wasted employee hours every month.',
      solution:
        'Autonomous AI agent pipelines that automatically extract data from documents, route tasks across multi-step workflows, and deliver structured results directly to your databases.',
      businessOutcomes: [
        '10x faster document analysis by automating resume and invoice parsing',
        '40%+ savings on AI operational costs via intelligent Token Efficiency Gates',
        'Zero manual data entry errors with strict JSON output schema validation',
        'Continuous automated workflows operating 24/7 without fatigue',
      ],
      scopePackage: {
        windowTitle: 'Scope & Deliverables — AI Agent Pipeline',
        liveProject: 'KerjaCerdas',
        liveUrl: 'http://kerja-cerdas.replit.app/',
        deliverables: [
          {
            title: 'Multi-Agent Workflow Orchestrator',
            desc: 'Autonomous supervisor state machines routing complex multi-step tasks across worker agents.',
          },
          {
            title: 'Multimodal Document Ingestion',
            desc: 'Automated PDF, document, and image data extraction directly into structured database records.',
          },
          {
            title: 'Token Efficiency & Cost Gates',
            desc: 'Intelligent caching and token control middleware reducing monthly LLM compute expenses.',
          },
          {
            title: 'Strict Output Schema Enforcement',
            desc: 'Guaranteed structured JSON output formatting with zero unvalidated text or hallucinations.',
          },
        ],
        frameworks: ['LangGraph', 'Gemini Multimodal', 'Pydantic v2', 'Python'],
      },
      provenBuilds: ['Startup EMP', 'KerjaCerdas', 'Orion'],
    },
    {
      id: 'rag-search',
      number: '04',
      title: 'Enterprise Search & Predictive ML',
      tagline: 'Hallucination-Free Search & Machine Learning Models',
      icon: Brain,
      problem:
        'Critical corporate knowledge, contracts, and legal regulations are buried across documents, causing costly compliance mistakes and AI hallucinations.',
      solution:
        'High-accuracy hybrid search engines that pinpoint exact answers with direct source citations, alongside predictive analytics models that uncover hidden operational insights.',
      businessOutcomes: [
        'Verifiable source citations that eliminate AI hallucinations in compliance',
        'Instant search across thousands of pages of company knowledge and policies',
        '96%+ accuracy predictive analytics models to anticipate user behavior',
        'Automated executive reports generated in seconds instead of hours',
      ],
      scopePackage: {
        windowTitle: 'Scope & Deliverables — Search & Knowledge RAG',
        liveProject: 'Indonesian Legal RAG',
        liveUrl: 'https://huggingface.co/HuangYiYang/Llama-3-8B-Indonesian-Legal',
        deliverables: [
          {
            title: 'Hybrid Knowledge Retrieval Engine',
            desc: 'Combines dense vector embeddings with sparse keyword search for pinpoint accuracy.',
          },
          {
            title: 'Verifiable Direct Source Citations',
            desc: 'Every answer includes exact document and article citations, eliminating hallucinations.',
          },
          {
            title: 'Neural Cross-Encoder Reranking',
            desc: 'Two-stage retrieval pipeline ranking the highest-relevance answers first for users.',
          },
          {
            title: 'Predictive Machine Learning Ensembles',
            desc: 'Custom regression and classification models extracting behavioral patterns and trends.',
          },
        ],
        frameworks: ['pgvector HNSW', 'BM25 RRF', 'Cross-Encoder', 'scikit-learn'],
      },
      provenBuilds: ['Indonesian Legal RAG', 'NeuralVoid', 'KerjaCerdas'],
    },
  ];

  const current = SERVICES_LIST[activeTab];

  const handleOpenLinkedProject = (projectName) => {
    const found = PROJECTS_DATA.find(
      (p) =>
        p.title.toLowerCase().includes(projectName.toLowerCase()) ||
        p.id.toLowerCase().includes(projectName.toLowerCase()) ||
        projectName.toLowerCase().includes(p.id.toLowerCase())
    );
    if (found) {
      onOpenProject(found);
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-28 md:py-36 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none bg-gradient-to-b from-[#050508] via-[#090B14] to-[#050508]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-indigo-500/[0.07] rounded-full blur-[180px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] bg-[var(--accent)]/[0.04] rounded-full blur-[150px]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-4">
            Transforming Real Problems into{' '}
            <span className="bg-gradient-to-tr from-[#FF5A36] via-[#FF8C69] to-amber-300 bg-clip-text text-transparent inline-block whitespace-nowrap">
              Finished Solutions
            </span>
          </h2>

          <p className="text-white/65 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            Full-stack web applications, autonomous AI agent workflows, scalable cloud backends, and knowledge search engines built for production reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {SERVICES_LIST.map((srv, idx) => {
            const isSelected = activeTab === idx;
            const Icon = srv.icon;

            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-white/[0.28] bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-white/[0.02] shadow-[0_16px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.22)]'
                    : 'border-white/[0.06] bg-[#090A0E]/80 hover:bg-[#0D0E14] hover:border-white/[0.14]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-white/40 font-medium">
                      0{idx + 1}
                    </span>
                    <Icon size={16} className={isSelected ? 'text-[var(--accent)]' : 'text-white/40'} />
                  </div>

                  <h3
                    className={`font-display font-bold text-sm sm:text-base leading-snug transition-colors ${
                      isSelected ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {srv.title}
                  </h3>
                </div>

                <span className="font-mono text-[10px] text-white/40 block mt-3 uppercase tracking-wider truncate">
                  {srv.tagline}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.05] via-[#0A0B10]/95 to-[#07070A]/98 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.18)] relative overflow-hidden min-h-[500px] flex flex-col justify-center">
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
            >
              {/* Left Column: Solution & Business Deliverables */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)] block mb-1.5 font-semibold">
                    {current.tagline}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-3">
                    {current.title}
                  </h3>
                  
                  <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                    {current.solution}
                  </p>

                  <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 block mb-1 font-semibold">
                      Client Problem Solved
                    </span>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                      {current.problem}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                  <span className="font-mono text-xs text-white/50 block mb-1 uppercase tracking-wider font-semibold">
                    Key Outcomes Delivered
                  </span>
                  {current.businessOutcomes.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85 leading-snug"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
                  <span className="font-mono text-xs text-white/40 mr-1 uppercase tracking-wider shrink-0">
                    Proven in live builds:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {current.provenBuilds.map((proj) => (
                      <button
                        key={proj}
                        onClick={() => handleOpenLinkedProject(proj)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] text-white font-mono text-xs transition-colors cursor-pointer shadow-sm shrink-0"
                      >
                        <span>{proj}</span>
                        <ArrowUpRight size={11} className="text-white/50" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Honest Deliverables & Scope Checklist */}
              <div className="lg:col-span-6 bg-[#040508]/95 border border-white/[0.1] rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-xs text-white/70 font-medium ml-2 truncate">
                      {current.scopePackage.windowTitle}
                    </span>
                  </div>

                  <span className="font-display text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
                    Full Scope
                  </span>
                </div>

                {/* 4 Concrete Deliverable Items */}
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-center">
                  {current.scopePackage.deliverables.map((deliv, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.015] flex items-start gap-3 transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="w-5 h-5 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0 mt-0.5 shadow-sm">
                        <Check size={12} className="stroke-[2.5]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-semibold text-xs sm:text-sm text-white leading-snug">
                          {deliv.title}
                        </h4>
                        <p className="font-sans text-xs text-white/55 leading-relaxed mt-0.5">
                          {deliv.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Window Footer: Live Link & Frameworks */}
                <div className="px-4 py-3 border-t border-white/[0.08] bg-white/[0.015] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {current.scopePackage.frameworks.map((fw, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/70 font-display text-[11px] font-medium"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>

                  {current.scopePackage.liveUrl ? (
                    <a
                      href={current.scopePackage.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent)] hover:bg-[#ff4015] text-white font-display font-bold text-xs transition-all shadow-md active:scale-95 shrink-0"
                    >
                      <span>Try Live App</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenLinkedProject(current.scopePackage.liveProject)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-display font-bold text-xs transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
                    >
                      <span>Explore {current.scopePackage.liveProject}</span>
                      <ArrowUpRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── EXECUTION STANDARD & DELIVERY LIFECYCLE ── */}
        <div className="mt-10 rounded-3xl border border-white/[0.08] bg-[#07080E]/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
          {/* Top specular highlight */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-white/[0.06]">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                Execution Standard &amp; Delivery Lifecycle
              </h3>
              <p className="text-white/50 text-xs sm:text-sm font-normal mt-0.5">
                Structured 4-Phase Progression from Initial Scope to Live Handover
              </p>
            </div>
            <span className="font-display font-medium text-xs text-white/40 hidden sm:inline">
              Phases 01 ➔ 04
            </span>
          </div>

          {/* Connected Steps Progression Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
            {HOW_WE_WORK.map((step, i) => (
              <div
                key={i}
                className="group p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-white/[0.2] bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-200 relative flex flex-col justify-between"
              >
                {/* Step Top Specular Accent */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-black text-2xl sm:text-3xl text-white/20 group-hover:text-[var(--accent)] transition-colors leading-none">
                      0{i + 1}
                    </span>
                    <span className="font-display font-semibold text-[11px] text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                      Step 0{i + 1}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 group-hover:text-white transition-colors tracking-tight">
                    {step.title}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
