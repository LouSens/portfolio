import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Bot,
  Brain,
  Layers,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SERVICES, PROJECTS_DATA } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe':
        return <Globe size={24} />;
      case 'Bot':
        return <Bot size={24} />;
      case 'Brain':
        return <Brain size={24} />;
      case 'Layers':
        return <Layers size={24} />;
      case 'Zap':
        return <Zap size={24} />;
      default:
        return <Zap size={24} />;
    }
  };

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

  const activeService = SERVICES[activeTab];

  return (
    <section
      id="services"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#060608] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)]/[0.03] rounded-full blur-[160px]" />

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
              // Engineering Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3"
          >
            What I Architect &amp; Build
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-xl"
          >
            End-to-end engineering across web applications, autonomous agent workflows, and high-throughput backend services.
          </motion.p>
        </div>

        {/* ── SPACIOUS & ROCK-SOLID SPOTLIGHT STAGE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Pillar Selector */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {SERVICES.map((srv, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 relative border text-white ${
                    isActive
                      ? 'border-[var(--accent)]/50 bg-[#0E0E16] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,90,54,0.15)]'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-[var(--accent)] rounded-r-full shadow-[0_0_10px_var(--accent)]" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono-dm text-xs text-[var(--accent)] font-bold">
                        {srv.number}
                      </span>
                      <h3
                        className={`font-display font-bold text-base sm:text-lg transition-colors ${
                          isActive ? 'text-white' : 'text-white/80'
                        }`}
                      >
                        {srv.title}
                      </h3>
                    </div>

                    <ArrowRight
                      size={16}
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'text-[var(--accent)] translate-x-1 opacity-100'
                          : 'text-white/30 opacity-0 -translate-x-2'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Hero Focus Canvas (Fixed, Stable, Zero Height Collapse) */}
          <div className="lg:col-span-7">
            <div className="min-h-[500px] h-full rounded-3xl border border-white/15 bg-[#0C0C14]/90 backdrop-blur-xl p-8 sm:p-10 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Subtle top ambient bar */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

              <div key={activeService.id} className="space-y-6 animate-in fade-in duration-150">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] shadow-lg">
                    {getIcon(activeService.icon)}
                  </div>

                  <span className="font-mono-dm text-xs uppercase tracking-widest text-white/40 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    Spec {activeService.number}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
                    {activeService.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Core Deliverable Highlights */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <span className="font-mono-dm text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                    Key Technical Focus:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/80 leading-snug"
                      >
                        <CheckCircle2 size={14} className="mt-0.5 text-[var(--accent)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono-dm text-xs text-white/40">Implemented in:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(activeService.appliedProjects ?? []).map((proj) => (
                      <button
                        key={proj}
                        onClick={() => handleOpenLinkedProject(proj)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] font-mono-dm text-xs transition-colors"
                      >
                        <span>{proj}</span>
                        <ArrowUpRight size={11} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-dm text-white/60 hover:text-white transition-colors"
                >
                  <span>View in projects</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── MINIMAL 4-STEP DELIVERY LIFECYCLE BAR ── */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            {[
              { s: '01', t: 'Scoping & Architecture', d: 'Constraints, schemas & workflows' },
              { s: '02', t: 'Interactive Prototype', d: 'End-to-end working proof of concept' },
              { s: '03', t: 'Hardening & QA', d: 'Type-safe contracts & test suites' },
              { s: '04', t: 'Production Deploy', d: 'Containerized CI/CD & monitoring' },
            ].map((step, i) => (
              <div key={i} className="space-y-1">
                <span className="font-mono-dm text-xs text-[var(--accent)] font-bold">{step.s}.</span>
                <h4 className="font-display font-semibold text-sm text-white">{step.t}</h4>
                <p className="font-mono-dm text-[11px] text-white/40">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
