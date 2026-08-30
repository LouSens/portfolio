import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  FileText,
  ExternalLink,
  Medal,
  Eye,
  X,
} from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export default function CredentialsSection() {
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeMediaModal) {
        setActiveMediaModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMediaModal]);

  const DEANS_LIST = [
    { label: 'Sem 1 · Sep 2024', src: "/docs/deans-list/2409 Dean's List.jpeg", note: 'Academic Excellence Award' },
    { label: 'Sem 2 · Apr 2025', src: "/docs/deans-list/2504 Dean's List.jpeg", note: 'Academic Excellence Award' },
    { label: 'Sem 3 · Sep 2025', src: "/docs/deans-list/2509 Dean's List.jpeg", note: 'Academic Excellence Award' },
  ];

  const COMPETITION_AWARDS = [
    {
      place: 'Silver Award',
      badgeColor: 'border-slate-300/30 bg-slate-200/10 text-slate-200',
      dotColor: 'bg-slate-300',
      title: 'SEA-CICSIC 2026',
      category: 'China-ASEAN Innovation Competition',
      division: 'Undergraduate Division',
      date: '2026',
      desc: 'Led AI strategy and technical architecture proposal for Omni-QC — an industrial manufacturing intelligence platform combining real-time computer vision defect detection on conveyor lines with predictive equipment maintenance.',
      links: [
        { label: 'Pitch Deck (PDF)', href: '/docs/omni-qc/Omni-QC Pitch Deck.pdf' },
        { label: 'Business Proposal (PDF)', href: '/docs/omni-qc/Omni-QC Business Proposal.pdf' },
      ],
      media: [],
    },
    {
      place: '3rd Place',
      badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      dotColor: 'bg-amber-400',
      title: 'DPickleball AI Tournament',
      category: 'Deep Reinforcement Learning (PPO)',
      division: 'Unity ML-Agents Multi-Agent Competition',
      date: 'Oct 2025',
      desc: 'Lead developer on a 3-person team. Architected the Unity 3D physics environment, reward shaping functions, and PPO multi-agent training loops — finishing 3rd place overall.',
      links: [],
      media: [
        {
          title: '3rd Place Trophy & Certificate',
          src: '/media/dpickleball/IMG_8700.png',
          alt: 'DPickleball 3rd Place Trophy',
        },
        {
          title: 'Tournament Group Photo',
          src: '/media/dpickleball/IMG_8724.png',
          alt: 'Competition Finalists and Judges',
        },
      ],
    },
    {
      place: 'Top 20% Globally',
      badgeColor: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
      dotColor: 'bg-sky-400',
      title: 'International Quant Championship',
      category: 'Quantitative Reasoning & Modeling',
      division: 'Stage 1 · Global Invitational',
      date: 'Apr 2025',
      desc: 'Placed in the top 20% globally against international competitors in data-driven quantitative reasoning, algorithmic problem-solving, and statistical analysis.',
      links: [],
      media: [],
    },
  ];

  return (
    <section
      id="awards"
      className="py-28 md:py-36 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none bg-gradient-to-b from-[#050508] via-[#100D06] to-[#050508]"
    >
      {/* ── RADIANT GOLDEN TROPHY & HONORS NEBULA ── */}
      <div className="pointer-events-none absolute top-1/3 right-10 w-[850px] h-[650px] rounded-full bg-amber-400/[0.075] blur-[200px]" />
      <div className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-[400px] rounded-full bg-yellow-500/[0.055] blur-[170px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[550px] h-[450px] bg-amber-600/[0.045] rounded-full blur-[180px]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-3.5">
            Verified Awards &amp;{' '}
            <span className="bg-gradient-to-br from-yellow-100 via-amber-300 to-amber-600 bg-clip-text text-transparent inline-block whitespace-nowrap">
              Academic Honors
            </span>
          </h2>

          <p className="text-white/60 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
            Verified academic excellence at Xiamen University Malaysia (Top 16%, 3.84 GPA) alongside international competition placements.
          </p>
        </motion.div>

        {/* ── 1. ACADEMIC EXCELLENCE LIQUID GLASS CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 rounded-3xl border border-white/[0.12] hover:border-[var(--accent)]/40 bg-gradient-to-br from-white/[0.06] via-[#0A0B10]/95 to-[#07070A]/98 backdrop-blur-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(255,90,54,0.15)] transition-all duration-150 ease-out"
        >
          {/* Top specular reflection sheen */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

          {/* Subtle decorative watermark */}
          <div className="pointer-events-none select-none absolute right-8 top-1/2 -translate-y-1/2 font-display font-black text-white/[0.02] text-8xl md:text-9xl leading-none tracking-tighter">
            3.84
          </div>

          <div className="relative z-10">
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] font-mono text-[10px] uppercase tracking-wider text-white/70">
                  <GraduationCap size={13} className="text-[var(--accent)]" />
                  <span>{EDUCATION.start} – {EDUCATION.expected}</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug tracking-tight">
                  {EDUCATION.degree}
                </h3>

                <p className="font-mono text-xs sm:text-sm text-white/60">
                  {EDUCATION.school} · {EDUCATION.location}
                </p>
              </div>

              {/* Stats group */}
              <div className="flex items-center gap-6 sm:gap-10 shrink-0 bg-[#0E0F16]/90 p-4 sm:p-5 rounded-2xl border border-white/[0.08] shadow-inner">
                <div>
                  <span className="block font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    3.84
                  </span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider mt-1 block">
                    GPA / 4.00
                  </span>
                </div>

                <div className="h-10 w-px bg-white/[0.08]" />

                <div>
                  <span className="block font-display font-bold text-2xl sm:text-3xl text-[var(--accent)] leading-none">
                    Top 16%
                  </span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider mt-1 block">
                    AI &amp; Robotics Cohort
                  </span>
                </div>
              </div>
            </div>

            {/* Dean's List Certificate Badges */}
            <div className="pt-6">
              <div className="flex items-center gap-2 mb-3.5">
                <Medal size={14} className="text-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-wider text-white/80 font-semibold">
                  Dean's List Awardee (3 Consecutive Semesters):
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {DEANS_LIST.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setActiveMediaModal({
                        src: item.src,
                        title: `Dean's List Certificate — ${item.label}`,
                        subtitle: `${EDUCATION.school} · Top Academic Standing`,
                      })
                    }
                    className="group flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] hover:border-[var(--accent)]/50 bg-white/[0.02] hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-150 text-left shadow-sm cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform shadow-[0_0_8px_var(--accent)]" />
                      <div>
                        <span className="font-mono text-xs font-medium text-white block group-hover:text-[var(--accent)] transition-colors">
                          {item.label}
                        </span>
                        <span className="font-mono text-[10px] text-white/40 block mt-0.5">
                          {item.note}
                        </span>
                      </div>
                    </div>

                    <Eye size={14} className="text-white/40 group-hover:text-white transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. COMPETITIONS & AWARDS LIST (LIQUID GLASS CARDS) ── */}
        <div className="space-y-4">
          {COMPETITION_AWARDS.map((award, idx) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/[0.1] hover:border-white/[0.24] hover:-translate-y-1 bg-gradient-to-br from-white/[0.04] via-[#0A0B10]/95 to-[#07070A]/95 backdrop-blur-xl p-6 sm:p-8 transition-all duration-150 ease-out shadow-xl hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.2)] relative overflow-hidden"
            >
              <div className="liquid-specular-bar opacity-0 hover:opacity-100 transition-opacity" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left meta & info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border ${award.badgeColor}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${award.dotColor}`} />
                      {award.place}
                    </span>

                    <span className="font-mono text-xs text-white/40">
                      {award.date}
                    </span>

                    <span className="font-mono text-xs text-white/30 hidden sm:inline">
                      •
                    </span>

                    <span className="font-mono text-xs text-white/50">
                      {award.division}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1 tracking-tight">
                      {award.title}
                    </h3>
                    <p className="font-mono text-xs text-[var(--accent)] font-medium">
                      {award.category}
                    </p>
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm font-normal leading-relaxed max-w-3xl">
                    {award.desc}
                  </p>
                </div>

                {/* Right media & PDF actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                  {/* PDF Document buttons */}
                  {award.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {award.links.map((lnk, i) => (
                        <motion.a
                          key={i}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          href={lnk.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/[0.28] text-white font-mono text-xs transition-colors shadow-md"
                        >
                          <FileText size={13} className="text-[var(--accent)]" />
                          <span>{lnk.label}</span>
                          <ExternalLink size={11} className="opacity-40" />
                        </motion.a>
                      ))}
                    </div>
                  )}

                  {/* Photo thumbnails */}
                  {award.media && award.media.length > 0 && (
                    <div className="flex items-center gap-2.5">
                      {award.media.map((med, mIdx) => (
                        <button
                          key={mIdx}
                          type="button"
                          onClick={() =>
                            setActiveMediaModal({
                              src: med.src,
                              title: med.title,
                              subtitle: `${award.title} · ${award.place}`,
                            })
                          }
                          className="group relative w-24 h-16 rounded-xl overflow-hidden border border-white/[0.14] hover:border-[var(--accent)] transition-all duration-150 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                        >
                          <img
                            src={med.src}
                            alt={med.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <Eye size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX MODAL FOR CERTIFICATES & TROPHIES ── */}
      <AnimatePresence>
        {activeMediaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMediaModal(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0D0E16] border border-white/[0.18] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    {activeMediaModal.title}
                  </h4>
                  <p className="font-mono text-xs text-white/50">
                    {activeMediaModal.subtitle}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveMediaModal(null)}
                  className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.15] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Image Container */}
              <div className="p-4 bg-black flex items-center justify-center max-h-[70vh] overflow-auto">
                <img
                  src={activeMediaModal.src}
                  alt={activeMediaModal.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-white/50">
                <span>Verified Academic &amp; Competition Record</span>
                <a
                  href={activeMediaModal.src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Resolution</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
