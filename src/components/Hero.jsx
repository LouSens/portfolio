import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Layers, Bot, Database, ShieldCheck, Sparkles } from 'lucide-react';
import { ROTATING_STATUS } from '../data/portfolioData';

export default function Hero() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % ROTATING_STATUS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-24 pb-16 overflow-hidden">
      {/* ── AMBIENT GLOW BACKDROPS ── */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[var(--accent)]/[0.07] rounded-full blur-[140px] animate-glow-slow" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-blue-500/[0.03] rounded-full blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col items-center text-center"
      >
        {/* ── STATUS PILL ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.04, borderColor: 'rgba(255,90,54,0.4)' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-[#0e0e14]/90 backdrop-blur-xl mb-6 shadow-2xl max-w-[95vw] overflow-hidden cursor-default transition-colors duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>

          <span className="text-[10px] sm:text-xs font-mono-dm uppercase tracking-widest text-white/50 shrink-0">
            Focus:
          </span>

          <div className="text-[10px] sm:text-xs font-mono-dm text-white tracking-wide overflow-hidden text-ellipsis whitespace-nowrap min-h-[16px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIdx}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {ROTATING_STATUS[statusIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── HEADLINE ── */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-white max-w-4xl mb-6"
        >
          Engineering Modern Full-Stack Apps &amp;{' '}
          <span className="text-gradient-accent relative inline-block">
            Intelligent Systems.
          </span>
        </motion.h1>

        {/* ── SUBHEADING ── */}
        <motion.p
          variants={itemVariants}
          className="text-white/70 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8 px-2"
        >
          I design and build responsive single-page applications, asynchronous backend architectures, and multi-agent workflows — delivering production-ready software with{' '}
          <span className="text-white font-medium">React</span>,{' '}
          <span className="text-white font-medium">FastAPI</span>,{' '}
          <span className="text-white font-medium">LangGraph</span>, and{' '}
          <span className="text-white font-medium">Python Async</span>.
        </motion.p>

        {/* ── ACTION BUTTONS ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[#ff431a] text-white font-mono-dm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[var(--accent)]/25 shimmer-sweep-hover group"
          >
            <Play size={13} className="fill-current group-hover:scale-115 transition-transform duration-200" />
            <span>Explore Systems</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2, borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-mono-dm text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 group"
          >
            <span>Start Discussion</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>

        {/* ── ARCHITECTURAL CAPABILITIES & SYSTEM SPEC METRICS ── */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-8 border-t border-white/10 text-left"
        >
          {[
            {
              icon: Layers,
              title: 'Full-Stack Web',
              sub: 'React 19 & FastAPI',
              spec: 'Modern SPAs & APIs',
            },
            {
              icon: Bot,
              title: 'Multi-Agent AI',
              sub: 'LangGraph Swarms',
              spec: 'Supervisor Graphs',
            },
            {
              icon: Database,
              title: 'Hybrid Retrieval',
              sub: 'FAISS & Cross-Encoders',
              spec: 'High-Precision RAG',
            },
            {
              icon: ShieldCheck,
              title: 'Production Core',
              sub: 'Docker & Pydantic v2',
              spec: 'Type-Safe Contracts & CI/CD',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{
                  y: -5,
                  scale: 1.025,
                  borderColor: 'rgba(255, 90, 54, 0.4)',
                  backgroundColor: 'rgba(18, 18, 26, 0.95)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="group p-4 rounded-2xl border border-white/10 bg-[#0C0C12]/80 backdrop-blur-md transition-all duration-300 shadow-lg cursor-default relative overflow-hidden"
              >
                {/* Subtle top glow highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:border-[var(--accent)]/40 transition-all duration-200">
                    <Icon size={13} />
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </span>
                </div>
                <p className="font-mono-dm text-[10px] sm:text-[11px] text-[var(--accent)] font-medium">
                  {item.sub}
                </p>
                <p className="font-mono-dm text-[9px] text-white/40 uppercase tracking-wider mt-0.5">
                  {item.spec}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
