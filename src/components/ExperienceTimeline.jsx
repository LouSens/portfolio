import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-[#070709] relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-6 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Timeline
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2.5">
            Engineering Experience &amp; Milestones
          </h2>

          <p className="text-white/60 text-xs sm:text-sm font-normal leading-relaxed">
            Track record across full-stack engineering leadership, hackathon builds, and AI architecture.
          </p>
        </motion.div>

        {/* ── TIMELINE VERTICAL SPINE ── */}
        <div className="relative border-l border-white/[0.14] ml-3 sm:ml-6 md:ml-24">
          {/* Luminous gradient spine overlay */}
          <div className="absolute top-0 bottom-0 -left-px w-0.5 bg-gradient-to-b from-[var(--accent)] via-white/20 to-transparent" />

          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.5, delay: idx * 0.08, type: 'spring', stiffness: 220, damping: 22 }}
              className="relative pl-6 sm:pl-10 pb-12 last:pb-2 group"
            >
              {/* Liquid Indicator Node */}
              <div
                className={`absolute top-1.5 -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-[#070709] transition-all duration-300 ${
                  exp.current
                    ? 'bg-[var(--accent)] shadow-[0_0_16px_rgba(255,90,54,1)] scale-110'
                    : 'bg-white/40 group-hover:bg-[var(--accent)] group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(255,90,54,0.8)]'
                }`}
              />

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                  {exp.year}
                </span>

                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest font-semibold shadow-[0_0_10px_rgba(255,90,54,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    Active Lead
                  </span>
                )}

                <span className="font-mono text-[11px] text-white/50 border border-white/[0.1] rounded-lg px-2.5 py-0.5 bg-white/[0.03]">
                  {exp.company}
                </span>
              </div>

              {/* Liquid Glass Milestone Card */}
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="p-5 sm:p-6 rounded-2xl liquid-glass-card group-hover:border-white/[0.22] group-hover:bg-[#0E0F16]/90 transition-all duration-300 shadow-md"
              >
                <div className="liquid-specular-bar opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[var(--accent)] transition-colors mb-2 tracking-tight">
                  {exp.role}
                </h3>

                <p className="text-white/70 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl">
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
