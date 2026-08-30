import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] md:min-h-[86vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-28 pb-12 overflow-hidden select-none">
      {/* ── AMBIENT LIQUID GLOW BACKDROPS ── */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[var(--accent)]/[0.06] rounded-full blur-[170px] animate-glow-slow" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/[0.05] rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-[960px] mx-auto text-center flex flex-col items-center">
        {/* ── CONFIDENT HEADLINE FLOATING DIRECTLY IN 3D SPACE ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.08] text-white max-w-4xl mb-6"
        >
          Building High-Impact Web Applications &amp;{' '}
          <span className="bg-gradient-to-r from-[#FF6B4A] via-[#FF5A36] to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,90,54,0.4)] inline-block whitespace-nowrap">
            Intelligent Systems.
          </span>
        </motion.h1>

        {/* ── SUBTITLE ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/70 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-12 tracking-[-0.01em]"
        >
          Transforming complex business challenges into production-ready web platforms, autonomous AI workflows, and high-performance backends that deliver measurable results.
        </motion.p>

        {/* ── REMODELED ACTION BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6644] to-[#FF431A] hover:from-[#ff7555] hover:to-[#ff522b] text-white font-display font-bold text-sm tracking-wide shadow-[0_8px_28px_rgba(255,90,54,0.42),inset_0_1px_1px_rgba(255,255,255,0.45)] border border-white/20 transition-all cursor-pointer active:scale-95 group"
          >
            <Layers size={16} className="text-white/90 group-hover:rotate-12 transition-transform duration-200" />
            <span>Explore Featured Systems</span>
          </button>

          <button
            onClick={() => document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-display font-semibold text-sm tracking-wide border border-white/[0.12] hover:border-white/[0.25] shadow-sm transition-all cursor-pointer active:scale-95 group"
          >
            <span>Let's Build Something</span>
            <ArrowUpRight size={15} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
