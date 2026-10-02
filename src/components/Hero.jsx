import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Download, Server, Bot, Network, Boxes, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Magnetic from './Magnetic';

const ease = [0.22, 1, 0.36, 1];

const BUILDS = [
  { word: 'backends', Icon: Server },
  { word: 'AI agents', Icon: Bot },
  { word: 'ranking engines', Icon: Network },
  { word: 'full-stack products', Icon: Boxes },
];

const HEADLINE = ['Full-Stack', 'Web', 'Applications', '&'];
const ACCENT = ['Intelligent', 'Systems.'];

/* Each word slides up from behind a mask, one after another. */
function Words({ words, start = 0, className = '' }) {
  return words.map((w, i) => (
    <span key={w + i} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.22em]">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: start + i * 0.08, ease }}
      >
        {w}
      </motion.span>
    </span>
  ));
}

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % BUILDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const { word, Icon } = BUILDS[i];
  const lite = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  return (
    <section className="relative min-h-[84svh] md:min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-20 md:pb-16 overflow-hidden select-none">
      {/* One slow, drifting accent light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[var(--accent)]/[0.07] rounded-full blur-[170px]"
        animate={lite ? undefined : { x: [-60, 60, -60], y: [-20, 25, -20], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-[960px] mx-auto text-center flex flex-col items-center">
        <h1 className="font-display font-extrabold text-fluid-h1 tracking-[-0.03em] leading-[1.08] text-white max-w-4xl mb-6">
          <Words words={HEADLINE} start={0.05} />
          <br className="hidden sm:block" />
          <Words
            words={ACCENT}
            start={0.4}
            className="bg-gradient-to-r from-[#FF6B4A] via-[#FF5A36] to-amber-300 bg-clip-text text-transparent"
          />
        </h1>

        {/* Rotating "what I build" line */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-3 mb-6 text-lg sm:text-xl text-white/80"
          aria-live="polite"
        >
          <span>I build</span>
          <span className="relative inline-flex items-center h-10 justify-center sm:justify-start sm:min-w-[13rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease }}
                className="inline-flex items-center gap-2.5 text-[var(--accent)] font-display font-bold"
              >
                <Icon size={20} />
                {word}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85, ease }}
          className="text-white/70 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-10 tracking-[-0.01em]"
        >
          AI undergraduate at Xiamen University Malaysia, building production-ready web platforms, autonomous AI agent workflows, and high-performance backends, and looking for an internship, or remote part-time work, where I can keep doing that.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Magnetic className="w-full sm:w-auto">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6644] to-[#FF431A] hover:from-[#ff7555] hover:to-[#ff522b] text-white font-display font-bold text-sm tracking-wide shadow-[0_8px_28px_rgba(255,90,54,0.42),inset_0_1px_1px_rgba(255,255,255,0.45)] border border-white/20 transition-all cursor-pointer active:scale-95 group"
            >
              <Layers size={16} className="text-white/90 group-hover:rotate-12 transition-transform duration-200" />
              <span>View My Projects</span>
            </button>
          </Magnetic>

          <Magnetic className="w-full sm:w-auto">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="CV_David_Kurniawan.pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-display font-semibold text-sm tracking-wide border border-white/[0.12] hover:border-white/[0.25] shadow-sm transition-all cursor-pointer active:scale-95 group"
            >
              <Download size={15} className="text-white/60 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200" />
              <span>Download Resume</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to About"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 0.6 }, y: { delay: 1.6, duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-white/[0.18] text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center transition-colors cursor-pointer"
      >
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
