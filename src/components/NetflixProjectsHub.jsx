import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Code,
  Globe,
  Layers,
  Bot,
  Brain,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';

export default function NetflixProjectsHub({ onOpenProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const total = PROJECTS_DATA.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Circular navigation
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation when user is hovering / active in section
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpenProject(PROJECTS_DATA[activeIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, activeIndex, handlePrev, handleNext, onOpenProject]);

  const getProjectIcon = (id) => {
    switch (id) {
      case 'kerjacerdas':
        return <Globe size={17} className="text-[#FF5A36]" />;
      case 'portfolio-os':
        return <Sparkles size={17} className="text-[#FF7250]" />;
      case 'orion':
        return <Bot size={17} className="text-[#38bdf8]" />;
      case 'startup-emp':
        return <Zap size={17} className="text-[#a855f7]" />;
      case 'neuralvoid':
        return <Layers size={17} className="text-[#10b981]" />;
      case 'legal-rag':
        return <Brain size={17} className="text-[#eab308]" />;
      default:
        return <Code size={17} className="text-white" />;
    }
  };

  return (
    <section
      id="work"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-28 md:py-36 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none bg-gradient-to-b from-[#050508] via-[#070B16] to-[#050508]"
    >
      {/* ── AMBIENT ELECTRIC SKY & DEEP CYAN NEBULA ── */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-sky-500/[0.06] rounded-full blur-[190px]" />
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[350px] bg-[var(--accent)]/[0.035] rounded-full blur-[160px]" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* ── SECTION HEADER (INTRO ANIMATION) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-3xl">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-3">
              Proven Systems &amp;{' '}
              <span className="bg-gradient-to-b from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent inline-block whitespace-nowrap">
                Live Platforms
              </span>
            </h2>

            <p className="text-white/65 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
              End-to-end web applications, autonomous AI workflows, and high-throughput systems. Select any project to explore the real-world problem solved, delivered business outcomes, and full technical architecture.
            </p>
          </div>
        </motion.div>

        {/* ── HIGH-PERFORMANCE CAROUSEL WITH ILLUMINATED STAGE SPOTLIGHT ── */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[520px] sm:h-[560px] md:h-[600px] flex items-center justify-center"
          style={!isMobile ? { perspective: '1200px' } : undefined}
        >
          {/* ── ILLUMINATED CAROUSEL STAGE PEDESTAL ── */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[140px] bg-gradient-to-r from-transparent via-[var(--accent)]/16 to-transparent rounded-[100%] blur-[45px]" />
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 w-[450px] sm:w-[650px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          {PROJECTS_DATA.map((project, idx) => {
            let diff = idx - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            // Mobile-Optimized lightweight 2D transform
            if (isMobile) {
              const mobileX = `${diff * 105}%`;
              const isVisibleOnMobile = Math.abs(diff) <= 1;

              return (
                <motion.div
                  key={project.id}
                  animate={{
                    x: mobileX,
                    scale: isCenter ? 1 : 0.9,
                    opacity: isCenter ? 1 : isVisibleOnMobile ? 0.35 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                  onClick={() => {
                    if (isCenter) {
                      onOpenProject(project);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  style={{
                    zIndex: isCenter ? 30 : 10,
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute top-0 bottom-0 w-[88vw] max-w-[340px] my-auto h-[490px] rounded-3xl overflow-hidden cursor-pointer ${
                    isCenter
                      ? 'border-2 border-[var(--accent)]/70 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,90,54,0.25)]'
                      : 'border border-white/[0.1] opacity-40 shadow-xl'
                  } bg-[#0A0B10] flex flex-col justify-between select-none`}
                >
                  {/* Background Poster Cover */}
                  {project.hasRealUI ? (
                    <>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/85 via-40% to-black/30" />
                    </>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-b ${project.posterAccent} opacity-45`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 via-45% to-transparent" />
                    </>
                  )}

                  {/* Top Integrated Glass Header Ribbon */}
                  <div className="relative z-10 px-5 py-3 border-b border-white/[0.1] bg-[#0A0B12]/90 backdrop-blur-xl flex items-center justify-between">
                    <span className="font-display font-semibold text-xs text-white tracking-tight flex items-center gap-1.5">
                      <span className="text-[var(--accent)] text-xs">✦</span>
                      {project.badge}
                    </span>

                    <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white shadow-sm">
                      {getProjectIcon(project.id)}
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-5 bg-gradient-to-t from-[#08080C] via-[#08080C]/95 to-transparent">
                    <span className="font-display font-semibold text-[10px] uppercase tracking-wider text-[var(--accent)] block mb-1">
                      {project.category}
                    </span>

                    <h3 className="font-display font-bold text-2xl text-white mb-2 leading-snug tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-white/70 text-xs font-normal leading-relaxed line-clamp-2 mb-4">
                      {project.synopsis}
                    </p>

                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/[0.06] text-[10px] font-display text-white/80 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {isCenter ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProject(project);
                        }}
                        className="liquid-btn-primary w-full justify-center !py-2.5 text-xs font-bold"
                      >
                        <Maximize2 size={12} />
                        <span>Explore Solution &amp; Specs</span>
                      </button>
                    ) : (
                      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
                        <span>Tap to select</span>
                        <span className="text-[var(--accent)] font-medium">View Project →</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            }

            // Desktop 3D Orbital Configuration
            let translateX = '0%';
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              translateX = '0%';
              translateZ = 60;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              translateX = '-58%';
              translateZ = -120;
              rotateY = 22;
              scale = 0.84;
              opacity = 0.55;
              zIndex = 20;
            } else if (isRight) {
              translateX = '58%';
              translateZ = -120;
              rotateY = -22;
              scale = 0.84;
              opacity = 0.55;
              zIndex = 20;
            } else {
              translateX = diff < 0 ? '-108%' : '108%';
              translateZ = -240;
              rotateY = diff < 0 ? 32 : -32;
              scale = 0.68;
              opacity = 0;
              zIndex = 10;
            }

            return (
              <motion.div
                key={project.id}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 270,
                  damping: 27,
                  mass: 0.85,
                }}
                onClick={() => {
                  if (isCenter) {
                    onOpenProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                }}
                className={`absolute top-0 bottom-0 w-[290px] sm:w-[360px] md:w-[410px] my-auto h-[480px] sm:h-[510px] md:h-[540px] rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-300 ${
                  isCenter
                    ? 'border-2 border-[var(--accent)]/70 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,90,54,0.3)]'
                    : 'border border-white/[0.1] opacity-50 shadow-2xl hover:border-white/[0.25]'
                } bg-[#0A0B10] flex flex-col justify-between select-none`}
              >
                {/* Background Poster Cover */}
                {project.hasRealUI ? (
                  <>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/85 via-40% to-black/30" />
                  </>
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${project.posterAccent} opacity-45`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 via-45% to-transparent" />
                  </>
                )}

                {/* Top Integrated Glass Header Ribbon */}
                <div className="relative z-10 px-6 py-3.5 border-b border-white/[0.1] bg-[#0A0B12]/90 backdrop-blur-xl flex items-center justify-between">
                  <span className="font-display font-semibold text-xs text-white tracking-tight flex items-center gap-1.5">
                    <span className="text-[var(--accent)] text-xs">✦</span>
                    {project.badge}
                  </span>

                  <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white shadow-sm">
                    {getProjectIcon(project.id)}
                  </div>
                </div>

                {/* Center Hover Action Hint */}
                <div className="relative z-10 px-6 flex-1 flex flex-col items-center justify-center">
                  {!isCenter && (
                    <div className="px-4 py-1.5 rounded-full bg-[#12131C]/90 border border-white/[0.2] text-white font-display font-medium text-xs flex items-center gap-1.5 shadow-xl hover:border-[var(--accent)]/60 transition-colors">
                      <span>Click to View</span>
                      <ArrowRight size={12} className="text-[var(--accent)]" />
                    </div>
                  )}
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-[#08080C] via-[#08080C]/95 to-transparent">
                  <span className="font-display font-semibold text-[11px] uppercase tracking-wider text-[var(--accent)] block mb-1">
                    {project.category}
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 leading-snug tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2 mb-4">
                    {project.synopsis}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.06] text-[10px] font-display text-white/80 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action CTA */}
                  {isCenter ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProject(project);
                      }}
                      className="liquid-btn-primary w-full justify-center !py-3 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <Maximize2 size={13} className="group-hover/btn:scale-110 transition-transform" />
                      <span>Explore Solution &amp; Specs</span>
                    </button>
                  ) : (
                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
                      <span>Click to select</span>
                      <span className="text-[var(--accent)] font-medium">Rotate to Center →</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── INTEGRATED BOTTOM CONTROLLER DOCK ── */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {/* Previous Project Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-white/[0.14] hover:border-[var(--accent)]/60 bg-white/[0.04] hover:bg-[#0E0F18] text-white/70 hover:text-white backdrop-blur-xl flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_16px_rgba(255,90,54,0.35)] cursor-pointer group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 group-hover:text-[var(--accent)] transition-all" />
          </button>

          {/* Integrated Dots Capsule */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.1] bg-[#07080E]/80 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
            {PROJECTS_DATA.map((proj, i) => (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Jump to ${proj.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === i
                    ? 'w-7 h-2 bg-gradient-to-r from-[#FF6644] to-[#FF431A] shadow-[0_0_10px_rgba(255,90,54,0.7)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Project Button */}
          <button
            onClick={handleNext}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-white/[0.14] hover:border-[var(--accent)]/60 bg-white/[0.04] hover:bg-[#0E0F18] text-white/70 hover:text-white backdrop-blur-xl flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_16px_rgba(255,90,54,0.35)] cursor-pointer group"
          >
            <ChevronRight size={18} className="group-hover:translate-x-0.5 group-hover:text-[var(--accent)] transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
}
