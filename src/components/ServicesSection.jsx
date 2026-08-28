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
  Cpu,
  Sparkles,
} from 'lucide-react';
import { SERVICES, PROJECTS_DATA, HOW_WE_WORK } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe':
        return <Globe size={22} />;
      case 'Bot':
        return <Bot size={22} />;
      case 'Brain':
        return <Brain size={22} />;
      case 'Layers':
        return <Layers size={22} />;
      case 'Zap':
        return <Zap size={22} />;
      default:
        return <Zap size={22} />;
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
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[750px] h-[450px] bg-[var(--accent)]/[0.035] rounded-full blur-[180px]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-2xl mb-14">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-px bg-[var(--accent)]" />
            <span className="font-mono-dm text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Engineering Specializations
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3"
          >
            Capabilities &amp; Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-xl"
          >
            Structured architectural specializations for enterprise web platforms, autonomous agent swarms, and high-throughput backend services.
          </motion.p>
        </div>

        {/* ── INTERACTIVE BLUEPRINT CONSOLE (EQUAL FIXED CARD HEIGHTS ACROSS ALL TABS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Interactive Pillar List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {SERVICES.map((srv, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 sm:p-5.5 rounded-2xl transition-all duration-200 relative border ${
                    isActive
                      ? 'border-[var(--accent)]/60 bg-[#0E0E16] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(255,90,54,0.18)]'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* Left accent indicator bar on active selection */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[var(--accent)] rounded-r-full shadow-[0_0_12px_var(--accent)]" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono-dm text-xs text-[var(--accent)] font-bold">
                        {srv.number}
                      </span>
                      <h3
                        className={`font-display font-bold text-sm sm:text-base transition-colors ${
                          isActive ? 'text-white' : 'text-white/80'
                        }`}
                      >
                        {srv.title}
                      </h3>
                    </div>

                    <ArrowRight
                      size={15}
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

          {/* Right Column: Hero Focus Canvas (Strictly Locked Height = Zero Discrepancy) */}
          <div className="lg:col-span-7">
            <div className="h-[520px] sm:h-[490px] lg:h-[470px] rounded-3xl border border-white/15 bg-[#0A0A10]/95 backdrop-blur-xl p-7 sm:p-9 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Top ambient glowing accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

              {/* Top Section: Header + Title + Description (Locked 160px height) */}
              <div className="h-[160px] flex flex-col justify-start">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] shadow-md">
                    {getIcon(activeService.icon)}
                  </div>

                  <span className="font-mono-dm text-[11px] uppercase tracking-widest text-white/50 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    Pillar {activeService.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 tracking-tight leading-snug truncate">
                  {activeService.title}
                </h3>
                <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                  {activeService.description}
                </p>
              </div>

              {/* Middle Section: Deliverables 2x2 Grid (Locked 160px height) */}
              <div className="h-[165px] flex flex-col justify-center pt-3 border-t border-white/10">
                <span className="font-mono-dm text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                  Core Technical Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeService.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/80 leading-snug"
                    >
                      <CheckCircle2 size={13} className="mt-0.5 text-[var(--accent)] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Footer with Project Pills (Locked 48px height) */}
              <div className="h-[48px] pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-mono-dm text-xs text-white/40 shrink-0">Verified in:</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    {(activeService.appliedProjects ?? []).map((proj) => (
                      <button
                        key={proj}
                        onClick={() => handleOpenLinkedProject(proj)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] font-mono-dm text-[10px] font-semibold transition-colors shrink-0"
                      >
                        <span>{proj}</span>
                        <ArrowUpRight size={10} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1 text-[11px] font-mono-dm text-white/60 hover:text-white transition-colors shrink-0 ml-2"
                >
                  <span>Explore Systems</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4-STEP DELIVERY LIFECYCLE BAR ── */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            {HOW_WE_WORK.map((step, i) => (
              <div key={i} className="space-y-1.5">
                <span className="font-mono-dm text-xs text-[var(--accent)] font-bold">{step.step}.</span>
                <h4 className="font-display font-semibold text-sm text-white">{step.title}</h4>
                <p className="font-mono-dm text-[11px] text-white/45 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
