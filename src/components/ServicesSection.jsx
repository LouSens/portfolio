import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Bot,
  Brain,
  Layers,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SERVICES, PROJECTS_DATA, HOW_WE_WORK } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
  // Default open first capability
  const [expandedId, setExpandedId] = useState('fullstack-web');

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

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#060608] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--accent)]/[0.035] rounded-full blur-[180px]" />

      <div className="max-w-[1100px] mx-auto relative z-10">
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
            Explore technical specializations across responsive web applications, autonomous multi-agent workflows, and production backend services.
          </motion.p>
        </div>

        {/* ── IN-PLACE EXPANDING ACCORDION STACK (PERFECT ON MOBILE & DESKTOP) ── */}
        <div className="space-y-4">
          {SERVICES.map((srv, idx) => {
            const isExpanded = expandedId === srv.id;

            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  isExpanded
                    ? 'border-[var(--accent)]/50 bg-[#0A0A10] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,90,54,0.12)]'
                    : 'border-white/10 bg-[#09090E]/80 hover:bg-[#0E0E15] hover:border-white/20'
                }`}
              >
                {/* Top ambient highlight line when expanded */}
                {isExpanded && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
                )}

                {/* Clickable Header Banner */}
                <button
                  type="button"
                  onClick={() => toggleExpand(srv.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-6 sm:p-7 md:p-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Icon Box */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? 'bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--accent)] shadow-lg'
                          : 'bg-white/5 border border-white/10 text-white/70'
                      }`}
                    >
                      {getIcon(srv.icon)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-dm text-[11px] uppercase tracking-widest text-[var(--accent)] font-bold">
                          Pillar {srv.number}
                        </span>
                        <span className="text-white/20 hidden sm:inline">•</span>
                        <span className="font-mono-dm text-[10px] uppercase tracking-wider text-white/40 hidden sm:inline">
                          {srv.tagline}
                        </span>
                      </div>

                      <h3
                        className={`font-display font-bold text-lg sm:text-xl md:text-2xl transition-colors ${
                          isExpanded ? 'text-white' : 'text-white/90'
                        }`}
                      >
                        {srv.title}
                      </h3>
                    </div>
                  </div>

                  {/* Expand Chevron Indicator */}
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded
                        ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] rotate-180'
                        : 'border-white/10 bg-white/5 text-white/50'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Expandable Content Area (In-Place Smooth Transition) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10 pt-2 border-t border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pt-4 items-start">
                          {/* Overview & Applied Projects */}
                          <div className="lg:col-span-6 space-y-5">
                            <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                              {srv.description}
                            </p>

                            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                              <span className="font-mono-dm text-xs text-white/40 mr-1">
                                Proven in live builds:
                              </span>
                              {(srv.appliedProjects ?? []).map((proj) => (
                                <button
                                  key={proj}
                                  onClick={() => handleOpenLinkedProject(proj)}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] font-mono-dm text-xs font-semibold transition-colors"
                                >
                                  <span>{proj}</span>
                                  <ArrowUpRight size={11} />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables Checklist Grid */}
                          <div className="lg:col-span-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5 space-y-2.5">
                            <span className="font-mono-dm text-[10px] uppercase tracking-widest text-white/40 block pb-1 border-b border-white/5">
                              Core Technical Deliverables:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {srv.deliverables.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2 text-xs text-white/80 leading-snug p-2 rounded-xl bg-white/[0.02] border border-white/5"
                                >
                                  <CheckCircle2
                                    size={14}
                                    className="mt-0.5 text-[var(--accent)] shrink-0"
                                  />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Direct explore prompt */}
                        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-end">
                          <button
                            onClick={() =>
                              document
                                .getElementById('work')
                                ?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-mono-dm text-white/60 hover:text-[var(--accent)] transition-colors"
                          >
                            <span>Explore Case Studies</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
