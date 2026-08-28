import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Check,
  Copy,
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  Sparkles,
  FileText,
  Clock,
  Briefcase,
  Layers,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ScopeInquiryDrawer() {
  const [selectedPillar, setSelectedPillar] = useState('Full-Stack Web App');
  const [selectedTimeline, setSelectedTimeline] = useState('MVP (2-4 Weeks)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const pillars = [
    { id: 'fullstack', label: 'Full-Stack Web App', desc: 'React 19 + FastAPI + DB' },
    { id: 'agents', label: 'LangGraph Multi-Agent Swarm', desc: 'Supervisor & Worker Graphs' },
    { id: 'backend', label: 'FastAPI & Backend Core', desc: 'Async APIs & Type Contracts' },
    { id: 'advisory', label: 'Technical Advisory & Audit', desc: 'System Scoping & Architecture' },
  ];

  const timelines = [
    'MVP (2-4 Weeks)',
    'Full Build (1-3 Months)',
    'Ongoing / Contract',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${selectedPillar} — ${name || 'Prospective Client'}`);
    const body = encodeURIComponent(
      `Hello David,\n\nI would like to discuss a potential engineering engagement.\n\nProject Pillar: ${selectedPillar}\nEstimated Timeline: ${selectedTimeline}\nName: ${name || 'Not specified'}\nEmail: ${email || 'Not specified'}\n\nProject Scope & Goals:\n${message || 'I am interested in scoping out an application/multi-agent build with you.'}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="inquire" className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-[#040406] relative border-t border-white/10 select-none overflow-hidden">
      {/* Subtle bottom ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[var(--accent)]/[0.045] rounded-full blur-[160px]" />

      <div className="max-w-[820px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 mb-3 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono-dm text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Direct Inquiry &amp; Scoping
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3"
          >
            Start an Engineering Discussion
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xs sm:text-sm font-light leading-relaxed"
          >
            Configuring a full-stack platform, multi-agent AI workflow, or backend architecture? Select your scope below to start directly.
          </motion.p>
        </div>

        {/* ── INTERACTIVE PROJECT SCOPING CONFIGURATOR ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/15 bg-[#09090E]/95 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Top ambient highlight line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-7 select-text">
            {/* Step 1: Pillar Selection */}
            <div>
              <label className="font-mono-dm text-[11px] uppercase tracking-widest text-white/50 block mb-3">
                01 // Select Core Specialization
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pillars.map((p) => {
                  const isSelected = selectedPillar === p.label;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPillar(p.label)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-md shadow-[var(--accent)]/15'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-display font-bold text-xs sm:text-sm ${
                          isSelected ? 'text-white' : 'text-white/80'
                        }`}>
                          {p.label}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[var(--accent)]' : 'bg-white/20'
                        }`} />
                      </div>
                      <span className="font-mono-dm text-[10px] text-white/45 block">
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Timeline Preference */}
            <div>
              <label className="font-mono-dm text-[11px] uppercase tracking-widest text-white/50 block mb-3">
                02 // Target Timeline
              </label>
              <div className="flex flex-wrap gap-2">
                {timelines.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTimeline(t)}
                    className={`px-3.5 py-2 rounded-xl font-mono-dm text-xs transition-all duration-200 ${
                      selectedTimeline === t
                        ? 'bg-[var(--accent)] text-white font-semibold shadow-md shadow-[var(--accent)]/20 border border-[var(--accent)]'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact & Project Info */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <label className="font-mono-dm text-[11px] uppercase tracking-widest text-white/50 block">
                03 // Project &amp; Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name or Company"
                    required
                    className="w-full bg-[#121218] border border-white/15 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-all font-mono-dm focus:ring-2 focus:ring-[var(--accent)]/30"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email Address"
                    required
                    className="w-full bg-[#121218] border border-white/15 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-all font-mono-dm focus:ring-2 focus:ring-[var(--accent)]/30"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your technical requirements, goals, or architectural context..."
                  className="w-full bg-[#121218] border border-white/15 rounded-xl p-4 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-all font-mono-dm resize-none focus:ring-2 focus:ring-[var(--accent)]/30 leading-relaxed"
                />
              </div>
            </div>

            {/* Action Bar & Quick Direct Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[#ff431a] text-white font-mono-dm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[var(--accent)]/25 shimmer-sweep-hover group"
              >
                <Send size={13} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span>Launch Direct Email</span>
              </motion.button>

              <div className="flex items-center justify-center sm:justify-end gap-3 text-xs font-mono-dm text-white/60">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-white/70 hover:underline cursor-pointer"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>

                <span className="text-white/20">•</span>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-white/70 hover:underline"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>

                <span className="text-white/20">•</span>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-white/70 hover:underline"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
