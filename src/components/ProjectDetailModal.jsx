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
  Cpu,
  Activity,
  Users,
  User,
  Share2,
  Check,
  Globe,
  Code2,
  Copy,
} from 'lucide-react';

export default function ProjectDetailModal({ project, projects, onClose, onSelectProject }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeScreenCategory, setActiveScreenCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const modalScrollRef = useRef(null);

  // Keyboard navigation
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

  const handleCopyCode = () => {
    if (!project.codeSnippet?.code) return;
    navigator.clipboard.writeText(project.codeSnippet.code).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    });
  };

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
    { id: 'code', label: 'Core Implementation', icon: Code2, show: Boolean(project.codeSnippet) },
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
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-0"
        />

        {/* Modal Window Container (Liquid Glass Engineering Dossier) */}
        <motion.div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="relative z-10 w-full max-w-5xl h-[90vh] max-h-[880px] flex flex-col rounded-3xl border border-white/[0.16] bg-[#0A0B10]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_1px_0_rgba(255,255,255,0.22)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top specular reflection sheen */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* ── TOP CONTROL & ACTION HEADER ── */}
          <div className="px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.08] flex items-center justify-between gap-4 shrink-0">
            {/* Left project meta */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/35 text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(255,90,54,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {project.badge}
              </span>

              <span className="text-white/30 font-mono text-xs hidden sm:inline">•</span>

              <span className="text-white/60 font-mono text-xs truncate hidden sm:inline">
                {project.category}
              </span>
            </div>

            {/* Right actions: cycle, share, close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Previous / Next Switcher */}
              <div className="flex items-center gap-1 font-mono text-xs text-white/50 bg-white/[0.04] border border-white/[0.1] rounded-xl p-1 mr-1 hidden sm:flex">
                <button
                  onClick={() => onSelectProject(prevProject)}
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  title="Previous Project (← Arrow)"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="text-[11px] px-1.5 font-semibold text-white/70">
                  {currentIndex + 1}/{projects.length}
                </span>

                <button
                  onClick={() => onSelectProject(nextProject)}
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  title="Next Project (→ Arrow)"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Copy Direct Link */}
              <button
                onClick={handleShare}
                title="Copy direct link to this project"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.1] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal (Esc)"
                className="w-9 h-9 rounded-xl bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.1] border border-white/[0.1] flex items-center justify-center transition-colors ml-1 cursor-pointer"
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
            className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-7 text-white/80 font-normal leading-relaxed overscroll-contain"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {/* 1. Hero Title & Overview */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50">
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

              <p className="text-white/75 text-sm sm:text-base font-normal leading-relaxed max-w-3xl">
                {project.overview}
              </p>

              {/* Action Buttons: GitHub, Live Demo, Notebooks */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-btn-primary !py-2.5 !px-5 text-xs font-bold"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-btn-secondary !py-2.5 !px-4 text-xs font-semibold"
                  >
                    <ExternalLink size={13} className="text-[var(--accent)]" />
                    <span>Live Platform</span>
                  </a>
                )}

                {project.colabUrls &&
                  project.colabUrls.map((nb) => (
                    <a
                      key={nb.label}
                      href={nb.url}
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-btn-secondary !py-2.5 !px-4 text-xs"
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
                    className="liquid-btn-secondary !py-2.5 !px-4 text-xs"
                  >
                    <ExternalLink size={13} className="text-yellow-400" />
                    <span>Hugging Face</span>
                  </a>
                )}

                {project.wandbUrl && (
                  <a
                    href={project.wandbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-btn-secondary !py-2.5 !px-4 text-xs"
                  >
                    <Activity size={13} className="text-amber-400" />
                    <span>W&amp;B Experiment Runs</span>
                  </a>
                )}
              </div>
            </div>

            {/* 2. Liquid Glass Tab Switcher */}
            <div className="flex gap-2 border-b border-white/[0.08] pb-3 pt-2 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-white/[0.14] to-white/[0.06] text-white font-semibold border border-white/[0.22] shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-[var(--accent)]' : ''} />
                    <span>{tab.label}</span>
                    {tab.count && (
                      <span className="px-1.5 py-0.2 rounded bg-black/50 text-[10px] text-white/60 font-mono">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── TAB CONTENT CONTAINERS ── */}
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
                          className="p-4 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.04] via-[#0E0F16]/90 to-[#07070A]/95 shadow-sm"
                        >
                          <span className="font-display font-black text-xl sm:text-2xl text-[var(--accent)] block leading-none mb-1">
                            {m.value}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block font-medium">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Problem & Architectural Solution Bento */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#0C0D14]/90 shadow-sm relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <h4 className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider">
                          The System Challenge
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/[0.1] bg-[#0C0D14]/90 shadow-sm relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                        <h4 className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                          Architectural Solution
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Integrated Tech Stack */}
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-2.5 font-medium">
                      Integrated Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg border border-white/[0.1] bg-white/[0.04] font-mono text-xs text-white/85 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: UI FLOW GALLERY */}
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
                          className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                            activeScreenCategory === idx
                              ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                              : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]'
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
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.14] bg-black flex items-center justify-center shadow-xl">
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
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/[0.14] text-white font-mono text-xs">
                          <span className="truncate max-w-[75%] font-medium">
                            {typeof activeScreensList[currentSlide] === 'object'
                              ? activeScreensList[currentSlide].caption
                              : 'System Screenshot'}
                          </span>
                          <span className="text-[var(--accent)] font-semibold shrink-0">
                            {currentSlide + 1} / {activeScreensList.length}
                          </span>
                        </div>

                        {/* Left / Right Controls */}
                        {activeScreensList.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentSlide((s) => (s - 1 + activeScreensList.length) % activeScreensList.length)
                              }
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/[0.15] text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg cursor-pointer"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              onClick={() => setCurrentSlide((s) => (s + 1) % activeScreensList.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/[0.15] text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg cursor-pointer"
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
                                className={`shrink-0 w-20 sm:w-28 aspect-[16/9] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                  i === currentSlide
                                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)] shadow-[0_0_10px_var(--accent)]'
                                    : 'border-white/[0.08] opacity-50 hover:opacity-90'
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
                    <p className="text-xs text-white/50 font-mono">No screenshot previews available.</p>
                  )}
                </div>
              )}

              {/* TAB 3: ARCHITECTURE NODES */}
              {activeTab === 'architecture' && project.architectureNodes && (
                <div className="space-y-4">
                  <p className="text-xs text-white/50 font-mono mb-2">
                    // End-to-End System Topology &amp; Execution Pipeline
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.architectureNodes.map((node, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/[0.1] bg-[#0C0D14]/90 hover:border-white/[0.2] transition-colors shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center font-mono text-xs font-bold text-[var(--accent)] shrink-0 shadow-inner">
                          {i + 1}
                        </div>
                        <div>
                          <h5 className="font-display font-bold text-white text-sm tracking-tight">{node.name}</h5>
                          <p className="text-xs text-white/65 mt-0.5 font-normal leading-relaxed">{node.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CORE CODE IMPLEMENTATION */}
              {activeTab === 'code' && project.codeSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-white/50 pb-2 border-b border-white/[0.08]">
                    <span>// {project.codeSnippet.filename}</span>
                    <button
                      onClick={handleCopyCode}
                      className="hover:text-white transition-colors flex items-center gap-1.5 text-white/70 cursor-pointer"
                    >
                      {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#06070A] border border-white/[0.1] font-mono text-xs text-white/90 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>
                      <code>{project.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 5: KEY DELIVERABLES */}
              {activeTab === 'deliverables' && (
                <div className="space-y-3">
                  <ul className="space-y-3">
                    {project.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 text-xs sm:text-sm text-white/80 leading-relaxed p-4 rounded-2xl border border-white/[0.1] bg-[#0C0D14]/90 hover:border-white/[0.2] transition-colors shadow-sm"
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
