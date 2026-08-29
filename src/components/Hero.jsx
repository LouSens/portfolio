import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Bot,
  Database,
  ShieldCheck,
  Play,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ROTATING_STATUS } from '../data/portfolioData';

export default function Hero() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % ROTATING_STATUS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const CORE_HIGHLIGHTS = [
    { label: 'Full-Stack Web', desc: 'React 19 & Tailwind' },
    { label: 'High-Speed APIs', desc: 'FastAPI & Pydantic v2' },
    { label: 'Autonomous Agents', desc: 'LangGraph Swarms' },
    { label: 'Hybrid Vector Search', desc: 'PostgreSQL & pgvector' },
  ];

  return (
    <section className="relative min-h-[85vh] md:min-h-[88vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-28 pb-14 overflow-hidden select-none">
      {/* ── AMBIENT LIQUID GLOW BACKDROPS ── */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-[var(--accent)]/[0.05] rounded-full blur-[140px] animate-glow-slow" />

      <div className="relative z-10 w-full max-w-[980px] mx-auto flex flex-col items-center text-center">
        {/* ── CLEAN STATUS BADGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] backdrop-blur-xl mb-7 shadow-sm cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
          </span>

          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 font-medium shrink-0">
            Focus:
          </span>

          <div className="text-[10px] sm:text-xs font-mono text-white tracking-wide overflow-hidden text-ellipsis whitespace-nowrap min-h-[16px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {ROTATING_STATUS[statusIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── CONFIDENT HEADLINE ── */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.035em] leading-[1.08] text-white max-w-4xl mb-6"
        >
          Building Modern Full-Stack Web Applications &amp;{' '}
          <span className="text-gradient-accent relative inline-block">
            Intelligent Systems.
          </span>
        </motion.h1>

        {/* ── SUBTITLE ── */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="text-white/65 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-8 px-2 tracking-[-0.01em]"
        >
          I engineer end-to-end software solutions — combining responsive React user interfaces with scalable asynchronous backends and autonomous multi-agent workflows.
        </motion.p>

        {/* ── LIQUID ACTION BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12"
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="liquid-btn-primary w-full sm:w-auto shimmer-sweep-hover group"
          >
            <Play size={12} className="fill-current group-hover:scale-110 transition-transform duration-200" />
            <span>Explore Projects</span>
          </button>

          <button
            onClick={() => document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' })}
            className="liquid-btn-secondary w-full sm:w-auto group"
          >
            <span>Get in Touch</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200 text-white/60 group-hover:text-white" />
          </button>
        </motion.div>

        {/* ── CLEAN LOW-PROFILE CORE PILL STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl pt-6 border-t border-white/[0.08]"
        >
          {CORE_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md text-left shadow-sm hover:border-white/[0.18] transition-colors"
            >
              <span className="font-display font-semibold text-xs sm:text-sm text-white block leading-snug">
                {item.label}
              </span>
              <span className="font-mono text-[10px] text-white/45 block mt-0.5 font-medium truncate">
                {item.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
