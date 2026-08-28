import React from 'react';
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
  Sparkles,
} from 'lucide-react';
import { SERVICES, PROJECTS_DATA, HOW_WE_WORK } from '../data/portfolioData';

export default function ServicesSection({ onOpenProject }) {
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

  return (
    <section
      id="services"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-8 bg-[#060608] relative border-t border-white/10 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[450px] bg-[var(--accent)]/[0.03] rounded-full blur-[170px]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-px bg-[var(--accent)]" />
            <span className="font-mono-dm text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Engineering Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3"
          >
            What I Architect &amp; Build
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-xl"
          >
            Full-lifecycle engineering across responsive web applications, autonomous agent workflows, and high-performance backend infrastructure.
          </motion.p>
        </div>

        {/* ── 4-CARD ARCHITECTURAL MATRIX (EFFORTLESS ON MOBILE & DESKTOP) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group rounded-3xl border border-white/10 bg-[#09090E]/90 backdrop-blur-xl p-7 sm:p-9 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden hover:bg-[#0E0E16] hover:border-white/20 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 cursor-default"
            >
              {/* Top ambient highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Icon + Number badge */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-300 shadow-md">
                      {getIcon(srv.icon)}
                    </div>
                    <div>
                      <span className="font-mono-dm text-[10px] uppercase tracking-widest text-white/40 block">
                        Capability {srv.number}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-white transition-colors">
                        {srv.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Key Technical Focus Points */}
                <div className="space-y-2.5 mb-6">
                  <span className="font-mono-dm text-[10px] uppercase tracking-widest text-white/40 block">
                    Core Technical Deliverables:
                  </span>
                  <div className="space-y-2">
                    {srv.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/75 leading-snug"
                      >
                        <CheckCircle2 size={14} className="mt-0.5 text-[var(--accent)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Implemented in Projects */}
              <div className="pt-5 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono-dm text-[11px] text-white/40">Implemented in:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(srv.appliedProjects ?? []).map((proj) => (
                      <button
                        key={proj}
                        onClick={() => handleOpenLinkedProject(proj)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] font-mono-dm text-[10px] font-medium transition-colors"
                      >
                        <span>{proj}</span>
                        <ArrowUpRight size={10} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1 text-[11px] font-mono-dm text-white/50 hover:text-white transition-colors ml-auto"
                >
                  <span>Explore Build</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </motion.div>
          ))}
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
