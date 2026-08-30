import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-28 md:py-36 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-gradient-to-b from-[#050508] via-[#0E0A16] to-[#050508]">
      {/* ── AMBIENT MOLTEN AMBER & COSMIC VIOLET NEBULA ── */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 -translate-y-1/2 w-[850px] h-[600px] bg-amber-500/[0.065] rounded-full blur-[190px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[650px] h-[450px] bg-purple-600/[0.055] rounded-full blur-[170px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-orange-600/[0.035] rounded-full blur-[210px]" />
      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-3.5">
            Engineering Leadership &amp;{' '}
            <span className="bg-gradient-to-b from-amber-100 via-amber-300 to-orange-500 bg-clip-text text-transparent inline-block whitespace-nowrap">
              Track Record
            </span>
          </h2>

          <p className="text-white/60 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
            Hands-on technical leadership, full-stack platform delivery, hackathon wins, and production AI deployments.
          </p>
        </motion.div>

        {/* ── TIMELINE VERTICAL SPINE WITH LUMINOUS LIGHT BEAM ── */}
        <div className="relative border-l border-white/[0.1] ml-3 sm:ml-6 md:ml-16 space-y-8">
          {/* Luminous flowing energy beam */}
          <div className="absolute top-0 bottom-0 -left-px w-0.5 bg-gradient-to-b from-[var(--accent)] via-amber-400/70 to-[var(--accent)]/20 shadow-[0_0_8px_rgba(255,90,54,0.5)]" />

          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Glowing Indicator Node */}
              <div
                className={`absolute top-6 -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-[#070709] transition-all duration-200 ${
                  exp.current
                    ? 'bg-[var(--accent)] shadow-[0_0_14px_rgba(255,90,54,1)] scale-110'
                    : 'bg-white/35 group-hover:bg-[var(--accent)] group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(255,90,54,0.8)]'
                }`}
              />

              {/* Unified Liquid Glass Milestone Card */}
              <div className="p-6 sm:p-7 rounded-3xl border border-white/[0.08] bg-[#07080E]/80 hover:bg-[#0C0D15]/90 hover:border-white/[0.18] backdrop-blur-xl transition-all duration-200 shadow-lg relative overflow-hidden flex flex-col justify-between">
                {/* Top specular reflection sheen */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* Integrated Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[var(--accent)] transition-colors tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-display font-medium text-xs sm:text-sm text-white/70">
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 font-mono text-[9px] text-[var(--accent)] uppercase tracking-wider font-semibold">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse" />
                          Current Role
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Date Pill */}
                  <span className="self-start sm:self-center font-mono text-xs text-white/60 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-sm shrink-0">
                    {exp.year}
                  </span>
                </div>

                {/* Card Body */}
                <p className="text-white/70 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                  {exp.desc}
                </p>

                {/* Technical / Leadership Scope Tags */}
                {exp.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/55 font-mono text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
