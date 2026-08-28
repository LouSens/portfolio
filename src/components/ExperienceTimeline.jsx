import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-[#050507] relative border-t border-white/10 overflow-hidden">
      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-2xl mb-14">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-2.5"
          >
            <span className="w-6 h-px bg-[var(--accent)]" />
            <span className="font-mono-dm text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Timeline
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2.5"
          >
            Engineering Experience &amp; Milestones
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-xs sm:text-sm font-light leading-relaxed"
          >
            Track record across platform engineering leadership, hackathon builds, and AI architecture.
          </motion.p>
        </div>

        {/* ── TIMELINE VERTICAL ── */}
        <div className="relative border-l border-white/15 ml-3 sm:ml-6 md:ml-24">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="relative pl-6 sm:pl-10 pb-12 last:pb-2 group"
            >
              {/* Indicator Node */}
              <div
                className={`absolute top-1.5 -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-[#050507] transition-all duration-300 ${
                  exp.current
                    ? 'bg-[var(--accent)] shadow-[0_0_12px_rgba(255,90,54,0.9)]'
                    : 'bg-white/40 group-hover:bg-[var(--accent)] group-hover:scale-125'
                }`}
              />

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono-dm text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                  {exp.year}
                </span>

                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 font-mono-dm text-[9px] text-[var(--accent)] uppercase tracking-widest font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    Current Focus
                  </span>
                )}

                <span className="font-mono-dm text-[11px] text-white/50 border border-white/10 rounded-lg px-2.5 py-0.5 bg-white/5">
                  {exp.company}
                </span>
              </div>

              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-[#0A0A0F]/60 group-hover:border-white/15 group-hover:bg-[#0E0E16]/80 transition-all duration-300 shadow-md"
              >
                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[var(--accent)] transition-colors mb-2">
                  {exp.role}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
