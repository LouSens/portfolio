import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  ShieldCheck,
  Zap,
  Bot,
  Brain,
  Cpu,
  FileText,
  Activity,
  Users,
  User,
  Share2,
  Check,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function ProjectDetailModal({ project, projects, onClose, onSelectProject }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeScreenCategory, setActiveScreenCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const modalScrollRef = useRef(null);

  // Keyboard navigation: Escape to close, Left/Right arrow to cycle projects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        onSelectProject(projects[prevIndex]);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        onSelectProject(projects[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects, onClose, onSelectProject]);

  // Reset tab & slide on project change — always default to overview first
  useEffect(() => {
    setCurrentSlide(0);
    setActiveScreenCategory(0);
    setActiveTab('overview');
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [project.id]);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#project=${project.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  // Active screens for KerjaCerdas or photo items
  const activeScreensList = project.screenCategories
    ? project.screenCategories[activeScreenCategory]?.screens || []
    : project.photos || [];

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: Layers, show: true },
    {
      id: 'gallery',
      label: 'UI Flow Gallery',
      icon: Globe,
      show: Boolean(project.hasRealUI || project.photos),
      count: project.screenCategories ? project.screenCategories.reduce((a, c) => a + c.screens.length, 0) : null,
    },
    { id: 'architecture', label: 'System Architecture', icon: Cpu, show: Boolean(project.architectureNodes) },
    { id: 'deliverables', label: 'Key Milestones', icon: ShieldCheck, show: Boolean(project.bullets) },
  ].filter((t) => t.show);

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden select-text"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-0"
        />

        {/* Modal Window Container — Stable, Solid, No Jumping */}
        <motion.div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-5xl h-[88vh] max-h-[850px] flex flex-col rounded-3xl border border-white/15 bg-[#0A0A0F] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── TOP CONTROL & ACTION HEADER ── */}
          <div className="px-6 py-4 sm:px-8 sm:py-5 bg-[#0D0D14] border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
            {/* Left project meta */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[10px] font-mono-dm uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {project.badge}
              </span>

              <span className="text-white/30 font-mono-dm text-xs hidden sm:inline">•</span>

              <span className="text-white/60 font-mono-dm text-xs truncate hidden sm:inline">
                {project.category}
              </span>
            </div>

            {/* Right actions: cycle, share, close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Previous / Next Switcher */}
              <div className="flex items-center gap-1 font-mono-dm text-xs text-white/50 bg-white/5 border border-white/10 rounded-xl p-1 mr-1 hidden sm:flex">
                <button
                  onClick={() => onSelectProject(prevProject)}
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Previous Project (← Arrow)"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="text-[11px] px-1 font-semibold text-white/70">
                  {currentIndex + 1}/{projects.length}
                </span>

                <button
                  onClick={() => onSelectProject(nextProject)}
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Next Project (→ Arrow)"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Copy Direct Link */}
              <button
                onClick={handleShare}
                title="Copy direct link to this project"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal (Esc)"
                className="w-9 h-9 rounded-xl bg-white/5 text-white/80 hover:text-white hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors ml-1"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* ── SCROLLABLE MODAL CANVAS ── */}
          <div
            ref={modalScrollRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-7 text-white/80 font-light leading-relaxed overscroll-contain"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {/* 1. Hero Title & Overview */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center gap-2 font-mono-dm text-xs text-white/50">
                <span className="text-[var(--accent)] font-semibold">{project.type}</span>
                <span>•</span>
                <span>{project.year}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-white/70">
                  {project.isTeam ? <Users size={13} /> : <User size={13} />}
                  {project.role}
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {project.title}
              </h2>

              <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                {project.overview}
              </p>

              {/* Action Buttons: GitHub & Live Artifacts */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[#ff431a] text-white font-mono-dm text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    <Github size={14} />
                    <span>View Repository &amp; Code</span>
                  </a>
                )}

                {project.colabUrls &&
                  project.colabUrls.map((nb) => (
                    <a
                      key={nb.label}
                      href={nb.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono-dm text-xs transition-colors"
                    >
                      <ExternalLink size={13} className="text-[var(--accent)]" />
                      <span>{nb.label}</span>
                    </a>
                  ))}

                {project.hfUrl && (
                  <a
                    href={project.hfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono-dm text-xs transition-colors"
                  >
                    <ExternalLink size={13} className="text-yellow-400" />
                    <span>Hugging Face Model</span>
                  </a>
                )}

                {project.wandbUrl && (
                  <a
                    href={project.wandbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono-dm text-xs transition-colors"
                  >
                    <Activity size={13} className="text-amber-400" />
                    <span>W&amp;B Runs</span>
                  </a>
                )}
              </div>
            </div>

            {/* 2. Solid Tab Switcher — No Shaking, No Jumping */}
            <div className="flex gap-2 border-b border-white/10 pb-3 pt-2 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl font-mono-dm text-xs transition-all duration-150 flex items-center gap-2 shrink-0 ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold border border-white/25 shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-[var(--accent)]' : ''} />
                    <span>{tab.label}</span>
                    {tab.count && (
                      <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-white/60 font-mono-dm">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── TAB CONTENT CONTAINERS (INSTANT & ROCK SOLID) ── */}
            <div className="transition-opacity duration-150">
              {/* TAB 1: SYSTEM OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quantitative Impact Metrics */}
                  {project.impactMetrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {project.impactMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl border border-white/10 bg-[#101017] shadow-sm"
                        >
                          <span className="font-display font-black text-xl sm:text-2xl text-[var(--accent)] block leading-none mb-1">
                            {m.value}
                          </span>
                          <span className="font-mono-dm text-[10px] uppercase tracking-wider text-white/50 block">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Problem & Engineering Solution Bento */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E14] shadow-sm">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <h4 className="font-mono-dm text-xs font-semibold text-white/90 uppercase tracking-wider">
                          The System Challenge
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E14] shadow-sm">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <h4 className="font-mono-dm text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                          Architectural Solution
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div>
                    <h4 className="font-mono-dm text-[11px] uppercase tracking-wider text-white/40 mb-2.5">
                      Core Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 font-mono-dm text-xs text-white/80 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: UI GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  {/* Category switcher */}
                  {project.screenCategories && (
                    <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-none">
                      {project.screenCategories.map((cat, idx) => (
                        <button
                          key={cat.name}
                          onClick={() => {
                            setActiveScreenCategory(idx);
                            setCurrentSlide(0);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl font-mono-dm text-xs transition-colors ${
                            activeScreenCategory === idx
                              ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                              : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {cat.name} ({cat.screens.length})
                        </button>
                      ))}
                    </div>
                  )}

                  {activeScreensList.length > 0 ? (
                    <div className="space-y-3">
                      {/* Big Viewport Showcase */}
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-black flex items-center justify-center shadow-xl">
                        <img
                          src={
                            typeof activeScreensList[currentSlide] === 'string'
                              ? activeScreensList[currentSlide]
                              : activeScreensList[currentSlide].src
                          }
                          alt="Interface screenshot"
                          className="w-full h-full object-contain"
                        />

                        {/* Caption Bar */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-white font-mono-dm text-xs">
                          <span className="truncate max-w-[75%] font-medium">
                            {typeof activeScreensList[currentSlide] === 'object'
                              ? activeScreensList[currentSlide].caption
                              : 'System Screenshot'}
                          </span>
                          <span className="text-[var(--accent)] font-semibold shrink-0">
                            {currentSlide + 1} / {activeScreensList.length}
                          </span>
                        </div>

                        {/* Left / Right Carousel Controls */}
                        {activeScreensList.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentSlide((s) => (s - 1 + activeScreensList.length) % activeScreensList.length)
                              }
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              onClick={() => setCurrentSlide((s) => (s + 1) % activeScreensList.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Thumbnail strip */}
                      {activeScreensList.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {activeScreensList.map((img, i) => {
                            const src = typeof img === 'string' ? img : img.src;
                            return (
                              <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`shrink-0 w-20 sm:w-28 aspect-[16/9] rounded-xl overflow-hidden border transition-all ${
                                  i === currentSlide
                                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]'
                                    : 'border-white/10 opacity-50 hover:opacity-90'
                                }`}
                              >
                                <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-white/50 font-mono-dm">No screenshot previews available.</p>
                  )}
                </div>
              )}

              {/* TAB 3: ARCHITECTURE NODES */}
              {activeTab === 'architecture' && project.architectureNodes && (
                <div className="space-y-4">
                  <p className="text-xs text-white/50 font-mono-dm mb-2">
                    // End-to-End System Topology &amp; Execution Pipeline
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.architectureNodes.map((node, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/10 bg-[#0E0E14] hover:border-white/20 transition-colors shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono-dm text-xs font-bold text-[var(--accent)] shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h5 className="font-display font-bold text-white text-sm">{node.name}</h5>
                          <p className="text-xs text-white/65 mt-0.5 font-light leading-relaxed">{node.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: KEY DELIVERABLES */}
              {activeTab === 'deliverables' && (
                <div className="space-y-3">
                  <ul className="space-y-3">
                    {project.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 text-xs sm:text-sm text-white/80 leading-relaxed p-4 rounded-2xl border border-white/10 bg-[#0E0E14] hover:border-white/20 transition-colors shadow-sm"
                      >
                        <ShieldCheck size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
