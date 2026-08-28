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
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ScopeInquiryDrawer() {
  const [selectedTopic, setSelectedTopic] = useState('Full-Stack Web App');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const topics = [
    'Full-Stack Web App',
    'Multi-Agent System',
    'FastAPI & Backend Engineering',
    'RAG & Vector Search',
    'Contract / Freelance Role',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${selectedTopic} - ${name || 'Prospective Client'}`);
    const body = encodeURIComponent(
      `Hello David,\n\nName: ${name || 'Not specified'}\nEmail: ${email || 'Not specified'}\nInterest: ${selectedTopic}\n\nProject Details:\n${message || 'I would like to discuss a potential project/engineering build.'}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="inquire" className="py-20 md:py-28 px-4 sm:px-6 md:px-8 bg-[#040406] relative border-t border-white/10 select-none overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[var(--accent)]/[0.04] rounded-full blur-[140px]" />

      <div className="max-w-[760px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 mb-3 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono-dm text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              // Direct Inquiry &amp; Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-2.5"
          >
            Let's Discuss Your Project
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xs sm:text-sm font-light leading-relaxed"
          >
            Looking to develop a full-stack platform, deploy a multi-agent system, or build a high-performance backend? Send a message directly or connect via email.
          </motion.p>
        </div>

        {/* ── STREAMLINED SINGLE-COLUMN CONTACT FORM ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            borderColor: 'rgba(255, 90, 54, 0.35)',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.85)',
          }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 bg-[#0A0A0F]/90 backdrop-blur-md p-6 sm:p-10 shadow-2xl transition-colors duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 select-text">
            {/* 1. Topic / Scope Selector */}
            <div>
              <label className="font-mono-dm text-[11px] uppercase tracking-wider text-white/70 block mb-3">
                Primary Scope of Interest:
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <motion.button
                    key={t}
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTopic(t)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono-dm text-xs transition-all duration-200 ${
                      selectedTopic === t
                        ? 'bg-[var(--accent)] text-white font-semibold shadow-md shadow-[var(--accent)]/25 border border-[var(--accent)]'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 2. Single Column Name */}
            <div>
              <label className="font-mono-dm text-[11px] uppercase tracking-wider text-white/50 block mb-1.5">
                Your Name or Company
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Wong"
                required
                className="w-full bg-[#121218] border border-white/15 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-all font-mono-dm focus:ring-2 focus:ring-[var(--accent)]/30"
              />
            </div>

            {/* 3. Single Column Email */}
            <div>
              <label className="font-mono-dm text-[11px] uppercase tracking-wider text-white/50 block mb-1.5">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                required
                className="w-full bg-[#121218] border border-white/15 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-all font-mono-dm focus:ring-2 focus:ring-[var(--accent)]/30"
              />
            </div>

            {/* 4. Single Column Message */}
            <div>
              <label className="font-mono-dm text-[11px] uppercase tracking-wider text-white/50 block mb-1.5">
                Project Overview &amp; Specifications
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your application requirements, timeline, or architecture goals..."
                className="w-full bg-[#121218] border border-white/15 rounded-xl p-4 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] transition-all font-mono-dm resize-none focus:ring-2 focus:ring-[var(--accent)]/30 leading-relaxed"
              />
            </div>

            {/* 5. Submit Action & Quick Direct Links */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[#ff431a] text-white font-mono-dm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[var(--accent)]/25 shimmer-sweep-hover group"
              >
                <Send size={13} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span>Send Message</span>
              </motion.button>

              <div className="flex items-center justify-center sm:justify-end gap-4 text-xs font-mono-dm text-white/60">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCopyEmail}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-white/70 hover:underline cursor-pointer"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                </motion.button>

                <span className="text-white/20">•</span>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-white/70 hover:underline"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
