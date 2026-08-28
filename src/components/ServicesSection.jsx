import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Bot,
  Brain,
  Layers,
  Zap,
  Play,
  Check,
  ArrowUpRight,
  Terminal,
  Activity,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { PROJECTS_DATA, HOW_WE_WORK } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
  const [activeChannel, setActiveChannel] = useState(0);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const CHANNELS = [
    {
      id: 'fullstack',
      number: '01',
      title: 'Full-Stack Web Systems',
      subtitle: 'React 19, FastAPI & Async Architecture',
      description:
        'Building responsive single-page platforms from scratch. Focused on clean state management, modular component design, and low-latency API integration.',
      nodes: [
        { label: 'Client Ingress (React 19)', latency: '4ms', detail: 'State dispatched via Zustand' },
        { label: 'FastAPI Validation Layer', latency: '12ms', detail: 'Pydantic v2 contract coercion' },
        { label: 'Persistence & Response', latency: '16ms', detail: 'Payload returned · 60 FPS' },
      ],
      specs: [
        { label: 'Rendering', value: 'Client SPA & Vite' },
        { label: 'State Model', value: 'Predictable Store' },
        { label: 'Type Safety', value: 'End-to-End' },
      ],
      deliverables: [
        'Modern React 19 single-page applications with custom micro-interactions',
        'State management architecture via Zustand & custom React hooks',
        'Role-based dashboards, document upload pipelines & Kanban workflows',
      ],
      projects: ['KerjaCerdas', 'NeuralVoid'],
    },
    {
      id: 'backend',
      number: '02',
      title: 'Backend Engineering & APIs',
      subtitle: 'FastAPI, PostgreSQL & Redis Infrastructure',
      description:
        'Engineering high-throughput asynchronous APIs with strict data validation, database relational modeling, Redis caching, and sliding-window rate limiting.',
      nodes: [
        { label: 'API Gateway Ingress', latency: '2ms', detail: 'Rate limiting check passed' },
        { label: 'Async Logic & Caching', latency: '6ms', detail: 'Redis session cache hit' },
        { label: 'Relational & Vector Store', latency: '14ms', detail: 'PostgreSQL pgvector query' },
      ],
      specs: [
        { label: 'Protocol', value: 'REST & OpenAPI 3.1' },
        { label: 'Rate Limiting', value: 'Token Bucket' },
        { label: 'Database', value: 'pgvector HNSW' },
      ],
      deliverables: [
        'High-concurrency async endpoints with Pydantic v2 validation',
        'Relational data modeling with PostgreSQL and pgvector HNSW indexing',
        'Asynchronous background worker tasks for heavy file processing',
      ],
      projects: ['KerjaCerdas', 'Orion', 'Startup EMP'],
    },
    {
      id: 'agents',
      number: '03',
      title: 'Multi-Agent AI & Workflows',
      subtitle: 'LangGraph Swarms & Cyclical State Graphs',
      description:
        'Designing autonomous supervisor-worker agent networks. Implementing cyclical graph topologies, parallel worker synthesis, and human-in-the-loop validation checkpoints.',
      nodes: [
        { label: 'Supervisor Routing Node', latency: '18ms', detail: 'Intent classified & routed' },
        { label: 'Parallel Worker Swarm', latency: '42ms', detail: 'Extractor & evaluator executed' },
        { label: 'Human Governance Gate', latency: '0ms', detail: 'State merged & persisted' },
      ],
      specs: [
        { label: 'Orchestrator', value: 'LangGraph' },
        { label: 'Reliability', value: 'Structured Output' },
        { label: 'Tracing', value: 'LangSmith Monitored' },
      ],
      deliverables: [
        'Cyclical multi-agent graph topologies with supervisor routing',
        'Human-in-the-loop state checkpoints for critical workflow actions',
        'Structured LLM output validation with automated retry heuristics',
      ],
      projects: ['Startup EMP', 'KerjaCerdas', 'Orion'],
    },
    {
      id: 'rag-search',
      number: '04',
      title: 'Search & Machine Learning',
      subtitle: 'Hybrid FAISS + BM25 & Predictive Models',
      description:
        'Developing hybrid retrieval pipelines (sparse BM25 + dense FAISS/pgvector) with cross-encoder neural rerankers and scikit-learn/XGBoost predictive models.',
      nodes: [
        { label: 'Hybrid Retrieval (Dense + Sparse)', latency: '16ms', detail: 'Top-50 candidates matched' },
        { label: 'Cross-Encoder Precision Reranker', latency: '26ms', detail: 'Rank score: 0.984' },
        { label: 'Context Synthesis & Output', latency: '8ms', detail: 'Parent chunk reconstructed' },
      ],
      specs: [
        { label: 'Retrieval', value: 'Dense + BM25 RRF' },
        { label: 'Reranking', value: 'Cross-Encoder' },
        { label: 'ML Analytics', value: 'XGBoost (96.2%)' },
      ],
      deliverables: [
        'Parent-Child document chunking with reciprocal rank fusion (RRF)',
        'Dense + sparse hybrid search with cross-encoder precision rerankers',
        'Feature engineering pipelines with scikit-learn and XGBoost',
      ],
      projects: ['Indonesian Legal RAG', 'NeuralVoid'],
    },
  ];

  const current = CHANNELS[activeChannel];

  const runSimulation = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setActiveStep(0);

    setTimeout(() => setActiveStep(1), 500);
    setTimeout(() => setActiveStep(2), 1100);
    setTimeout(() => {
      setActiveStep(3);
      setIsRunningSim(false);
    }, 1800);
  };

  useEffect(() => {
    setActiveStep(0);
    setIsRunningSim(false);
  }, [activeChannel]);

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
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#050507] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--accent)]/[0.025] rounded-full blur-[180px]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* ── EDITORIAL HEADER ── */}
        <div className="max-w-xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-[var(--accent)]" />
            <span className="font-mono-dm text-xs text-[var(--accent)]">
              Engineering Capabilities
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3">
            What I Architect &amp; Build
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
            Production-grade capabilities across responsive web systems, autonomous agent swarms, and high-throughput backend infrastructure.
          </p>
        </div>

        {/* ── DISCIPLINED CHANNEL SWITCHER ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {CHANNELS.map((ch, idx) => {
            const isSelected = activeChannel === idx;

            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChannel(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-white/30 bg-[#0E0E15] shadow-xl'
                    : 'border-white/5 bg-[#08080C] hover:bg-[#0D0D13] hover:border-white/15'
                }`}
              >
                <span className="font-mono-dm text-xs text-white/40 block mb-1.5">
                  0{idx + 1}
                </span>
                <h3
                  className={`font-display font-bold text-sm sm:text-base transition-colors ${
                    isSelected ? 'text-white' : 'text-white/65'
                  }`}
                >
                  {ch.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* ── HIGH-CRAFT ARCHITECTURE WORKBENCH ── */}
        <div className="rounded-3xl border border-white/10 bg-[#09090E]/95 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Scope & Verified Projects */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono-dm text-xs text-[var(--accent)] block mb-1">
                  {current.subtitle}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mb-3">
                  {current.title}
                </h3>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Core Deliverable Points */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <span className="font-mono-dm text-xs text-white/40 block mb-1">
                  Core Technical Focus
                </span>
                {current.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 leading-snug"
                  >
                    <span className="text-[var(--accent)] font-mono-dm mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Proven in Live Builds */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="font-mono-dm text-xs text-white/40 mr-1">
                  Proven in live builds:
                </span>
                {current.projects.map((proj) => (
                  <button
                    key={proj}
                    onClick={() => handleOpenLinkedProject(proj)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-dm text-xs transition-colors"
                  >
                    <span>{proj}</span>
                    <ArrowUpRight size={11} className="text-white/50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Execution Topology & Live Trace */}
            <div className="lg:col-span-7 bg-[#050508] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-6">
              {/* Header with Test Flow Trigger */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono-dm text-xs text-white/60">
                  <Terminal size={14} className="text-[var(--accent)]" />
                  <span>Execution Pipeline Trace</span>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isRunningSim}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono-dm text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isRunningSim ? (
                    <>
                      <RefreshCw size={12} className="animate-spin text-[var(--accent)]" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play size={12} className="fill-[var(--accent)] text-[var(--accent)]" />
                      <span>Simulate Pipeline</span>
                    </>
                  )}
                </button>
              </div>

              {/* Pipeline Nodes Trace */}
              <div className="space-y-2.5">
                {current.nodes.map((node, i) => {
                  const isPassed = activeStep > i;
                  const isCurrent = activeStep === i && isRunningSim;

                  return (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between font-mono-dm text-xs ${
                        isCurrent
                          ? 'border-[var(--accent)]/50 bg-[var(--accent)]/5 shadow-md'
                          : isPassed
                          ? 'border-white/15 bg-white/[0.03]'
                          : 'border-white/5 bg-transparent opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white/30 text-[10px]">0{i + 1}</span>
                        <div>
                          <span className={isCurrent ? 'text-white font-semibold' : 'text-white/85'}>
                            {node.label}
                          </span>
                          <span className="block text-[11px] text-white/40 mt-0.5">
                            {node.detail}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-white/40 text-[11px] block">{node.latency}</span>
                        <span
                          className={`text-[10px] font-medium ${
                            isPassed ? 'text-emerald-400' : isCurrent ? 'text-[var(--accent)]' : 'text-white/30'
                          }`}
                        >
                          {isPassed ? 'Completed' : isCurrent ? 'Active' : 'Standby'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* System Specs Bar */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 font-mono-dm">
                {current.specs.map((s, i) => (
                  <div key={i}>
                    <span className="text-[10px] text-white/40 block">{s.label}</span>
                    <span className="text-xs text-white mt-0.5 block font-medium truncate">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4-STEP DELIVERY LIFECYCLE BAR ── */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            {HOW_WE_WORK.map((step, i) => (
              <div key={i} className="space-y-1.5">
                <span className="font-mono-dm text-xs text-[var(--accent)] font-bold">
                  {step.step}.
                </span>
                <h4 className="font-display font-semibold text-sm text-white">{step.title}</h4>
                <p className="font-mono-dm text-[11px] text-white/45 leading-relaxed">
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
