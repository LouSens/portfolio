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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SERVICES, PROJECTS_DATA, HOW_WE_WORK } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe':
        return <Globe size={26} />;
      case 'Bot':
        return <Bot size={26} />;
      case 'Brain':
        return <Brain size={26} />;
      case 'Layers':
        return <Layers size={26} />;
      case 'Zap':
        return <Zap size={26} />;
      default:
        return <Zap size={26} />;
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const activeService = SERVICES[currentIndex];

  return (
    <section
      id="services"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#060608] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--accent)]/[0.035] rounded-full blur-[180px]" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* ── SECTION HEADER & CONTROLS ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
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
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-2"
            >
              Capabilities &amp; Services
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-lg"
            >
              Focused architectural capabilities designed for production-scale web and AI software.
            </motion.p>
          </div>

          {/* Carousel Arrows & Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="font-mono-dm text-xs text-white/50 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full">
              <span className="text-[var(--accent)] font-bold">{currentIndex + 1}</span>
              <span className="mx-1.5 text-white/20">/</span>
              <span>{SERVICES.length}</span>
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous capability"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white text-white/70 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next capability"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white text-white/70 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── SPACIOUS HERO SPOTLIGHT STAGE (LIKE PROJECT SECTION) ── */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full"
        >
          <div className="rounded-3xl border border-white/15 bg-[#09090E]/90 backdrop-blur-xl p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Top ambient glowing accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Icon, Title & Overview */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] shadow-xl">
                    {getIcon(activeService.icon)}
                  </div>
                  <div>
                    <span className="font-mono-dm text-[11px] uppercase tracking-widest text-[var(--accent)] font-bold block">
                      Pillar {activeService.number}
                    </span>
                    <span className="font-mono-dm text-[10px] text-white/40 uppercase tracking-widest">
                      Production Capability
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug mb-3">
                    {activeService.title}
                  </h3>
                  <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Implemented in project tags */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="font-mono-dm text-xs text-white/40 mr-1">Proven in live builds:</span>
                  {(activeService.appliedProjects ?? []).map((proj) => (
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

              {/* Right Column: Key Technical Deliverables Canvas */}
              <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4">
                <span className="font-mono-dm text-[11px] uppercase tracking-widest text-white/40 block pb-2 border-b border-white/10">
                  Key Technical Focus:
                </span>
                <div className="space-y-3">
                  {activeService.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-relaxed"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category Switcher Indicator Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {SERVICES.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to ${srv.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
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
