import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Bot,
  Brain,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Sparkles,
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
      technicalCapabilities: [
        { title: 'Client Architecture', detail: 'React 19 & Tailwind CSS SPA', badge: '<16ms Render' },
        { title: 'State Synchronization', detail: 'Unidirectional Zustand store', badge: 'Deterministic' },
        { title: 'API Integration', detail: 'Asynchronous fetch with type contracts', badge: '60 FPS' },
      ],
      specs: [
        { label: 'Client Framework', value: 'React 19 & Vite' },
        { label: 'State Model', value: 'Zustand Store' },
        { label: 'Type Contracts', value: 'Pydantic v2' },
      ],
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
      technicalCapabilities: [
        { title: 'API Gateway', detail: 'FastAPI async routing & OpenAPI specs', badge: 'Async Core' },
        { title: 'Vector Store', detail: 'PostgreSQL pgvector HNSW similarity', badge: 'Sub-second' },
        { title: 'Cache Strategy', detail: 'Redis session & sliding-window limiting', badge: 'In-Memory' },
      ],
      specs: [
        { label: 'Protocol', value: 'REST & OpenAPI 3.1' },
        { label: 'Vector Index', value: 'pgvector HNSW' },
        { label: 'Rate Limiter', value: 'Sliding-Window' },
      ],
      provenBuilds: ['KerjaCerdas', 'Orion', 'Startup EMP'],
    },
    {
      id: 'agents',
      number: '03',
      title: 'Autonomous AI Agents & Workflows',
      tagline: 'Multi-Step AI Automation & Document Processing',
      icon: Bot,
      problem:
        'Teams waste hundreds of hours each month on repetitive manual tasks—reading PDFs, triaging applications, and cross-checking compliance rules.',
      solution:
        'Autonomous AI agent networks that execute complex multi-step workflows from start to finish, while keeping human administrators in control for final approvals.',
      businessOutcomes: [
        'Over 40% reduction in compute and operational processing costs',
        '10x faster document triage and applicant screening with zero fatigue',
        'Human-in-the-loop approval checkpoints ensuring zero rogue actions',
        'Consistent, audit-ready structured outputs without manual data entry',
      ],
      technicalCapabilities: [
        { title: 'Supervisor Node', detail: 'Intent classification & parallel dispatch', badge: 'Supervisor' },
        { title: 'Worker Swarm', detail: 'Parallel extractors & evaluation graphs', badge: 'Concurrent' },
        { title: 'Governance Gate', detail: 'Human checkpoint approval state', badge: 'Checkpoint' },
      ],
      specs: [
        { label: 'Graph Framework', value: 'LangGraph State' },
        { label: 'Validation', value: 'Strict Pydantic v2' },
        { label: 'Observability', value: 'LangSmith Traced' },
      ],
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
      technicalCapabilities: [
        { title: 'Hybrid Retrieval', detail: 'Dense vector (0.6) + BM25 sparse (0.4)', badge: 'RRF Fusion' },
        { title: 'Neural Reranker', detail: 'Cross-encoder scoring with threshold gate', badge: 'High-Precision' },
        { title: 'Predictive ML', detail: 'XGBoost & Random Forest ensembles', badge: '96.2% Accuracy' },
      ],
      specs: [
        { label: 'Retrieval Model', value: 'Dense + BM25 RRF' },
        { label: 'Reranker Gate', value: 'Cross-Encoder' },
        { label: 'ML Analytics', value: 'XGBoost Ensembles' },
      ],
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
      className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-[#070709] relative border-t border-white/[0.08] overflow-hidden select-none"
    >
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[var(--accent)]/[0.025] rounded-full blur-[190px]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="max-w-2xl mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-widest">
              Capabilities &amp; Solutions
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3">
            Finished Solutions &amp; Engineering Services
          </h2>

          <p className="text-white/65 text-sm sm:text-base font-normal leading-relaxed">
            Full-stack web applications, autonomous AI agent workflows, scalable cloud backends, and knowledge search engines built to solve real business challenges.
          </p>
        </motion.div>

        {/* ── SERVICE TAB SWITCHER ── */}
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

        {/* ── STABLE-HEIGHT CAPABILITY CONTAINER ── */}
        <div className="rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.05] via-[#0A0B10]/95 to-[#07070A]/98 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.18)] relative overflow-hidden min-h-[530px] flex flex-col justify-center">
          {/* Top specular reflection sheen */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: The Finished Solution & Business Impact */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)] block mb-1 font-semibold">
                    {current.tagline}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-2.5">
                    {current.title}
                  </h3>
                  
                  {/* The Problem / Challenge */}
                  <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/[0.04] mb-3">
                    <div className="flex items-center gap-2 mb-1 text-rose-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
                      <AlertCircle size={13} />
                      <span>The Business Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                      {current.problem}
                    </p>
                  </div>

                  {/* The Finished Solution */}
                  <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed">
                    <strong className="text-white font-semibold">The Finished Solution: </strong>
                    {current.solution}
                  </p>
                </div>

                {/* Core Business Deliverables & Outcomes */}
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

                {/* Verified in Live Systems */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
                  <span className="font-mono text-xs text-white/40 mr-1 uppercase tracking-wider shrink-0">
                    Proven in builds:
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

              {/* Right Column: Architectural Highlights & Specs */}
              <div className="lg:col-span-6 bg-[#050609]/95 border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-inner">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-[var(--accent)]" />
                    <span className="font-mono text-xs text-white/80 uppercase tracking-wider font-semibold">
                      Technical Architecture
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--accent)]">
                    Production Standard
                  </span>
                </div>

                {/* 3 Technical Capability Nodes */}
                <div className="space-y-2.5">
                  {current.technicalCapabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between font-mono text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-white font-medium block truncate">
                          {cap.title}
                        </span>
                        <span className="text-white/45 text-[11px] block mt-0.5 font-normal truncate">
                          {cap.detail}
                        </span>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.06] text-white/80 border border-white/[0.08] shrink-0 font-medium">
                        {cap.badge}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Specs Grid */}
                <div className="pt-3 border-t border-white/[0.08] grid grid-cols-3 gap-2 font-mono">
                  {current.specs.map((s, i) => (
                    <div key={i}>
                      <span className="text-[10px] text-white/40 block uppercase tracking-wider">{s.label}</span>
                      <span className="text-xs text-white mt-0.5 block font-medium truncate">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 4-STEP DELIVERY LIFECYCLE BAR ── */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            {HOW_WE_WORK.map((step, i) => (
              <div key={i} className="space-y-1.5">
                <span className="font-mono text-xs text-[var(--accent)] font-bold">
                  {step.step}.
                </span>
                <h4 className="font-display font-semibold text-sm text-white">{step.title}</h4>
                <p className="font-mono text-[11px] text-white/50 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
