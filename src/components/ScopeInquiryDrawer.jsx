import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Check,
  Copy,
  Linkedin,
  Github,
  CheckCircle2,
  X,
  Mail,
  Inbox,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ScopeInquiryDrawer() {
  const [objective, setObjective] = useState('');
  const [scope, setScope] = useState('');
  const [timeline, setTimeline] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState(null);
  const [showAdminInbox, setShowAdminInbox] = useState(false);
  const [storedInquiries, setStoredInquiries] = useState([]);
  const [submissionCount, setSubmissionCount] = useState(0);

  const CLOUDFLARE_WORKER_URL =
    import.meta.env?.VITE_CLOUDFLARE_WORKER_URL ||
    'https://portfolio-inquiries.davidk-academic.workers.dev';

  // 1. Fetch real-time global inquiries count across all devices on mount
  useEffect(() => {
    let isMounted = true;

    // Fast initial load from local storage
    try {
      const saved = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      const savedCount = parseInt(localStorage.getItem('portfolio_submission_count') || '0', 10);
      setStoredInquiries(saved);
      setSubmissionCount(Math.max(saved.length, savedCount));
    } catch {
      setStoredInquiries([]);
    }

    // Fetch live global count from Cloudflare Worker
    fetch(CLOUDFLARE_WORKER_URL)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.count === 'number') {
          setSubmissionCount(data.count);
          localStorage.setItem('portfolio_submission_count', data.count.toString());
        }
      })
      .catch((err) => {
        console.info('Live worker count notice (using local fallback):', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [CLOUDFLARE_WORKER_URL]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let nextCount = submissionCount + 1;

    const inquiryRecord = {
      id: 'INQ-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      submissionIndex: nextCount,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      name: name.trim(),
      email: email.trim(),
      objective: objective.trim() || 'General Project Inquiry',
      scope: scope.trim(),
      timeline: timeline.trim() || 'Flexible / To be discussed',
    };

    // 1. Send to Cloudflare Worker to increment global counter across all devices
    try {
      const workerRes = await fetch(CLOUDFLARE_WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryRecord),
      });
      const workerData = await workerRes.json();
      if (workerData.count) {
        nextCount = workerData.count;
        inquiryRecord.submissionIndex = nextCount;
        setSubmissionCount(nextCount);
        localStorage.setItem('portfolio_submission_count', nextCount.toString());
      }
    } catch (workerErr) {
      console.warn('Cloudflare Worker transmission notice:', workerErr);
    }

    // 2. Persistent local record storage
    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
      const updated = [inquiryRecord, ...existing];
      localStorage.setItem('portfolio_inquiries', JSON.stringify(updated));
      localStorage.setItem('portfolio_submission_count', nextCount.toString());
      setStoredInquiries(updated);
      setSubmissionCount(nextCount);
    } catch (err) {
      console.warn('LocalStorage save warning:', err);
    }

    // 3. Web3Forms Live Email Dispatch to davidk.academic@gmail.com
    const web3AccessKey = import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY || null;

    const payload = {
      access_key: web3AccessKey,
      subject: `[${inquiryRecord.id}] New Inquiry: ${inquiryRecord.objective} — ${inquiryRecord.name}`,
      from_name: `${inquiryRecord.name} (Portfolio Direct)`,
      replyto: inquiryRecord.email,
      name: inquiryRecord.name,
      email: inquiryRecord.email,
      project_objective: inquiryRecord.objective,
      project_timeline: inquiryRecord.timeline,
      project_scope: inquiryRecord.scope,
      reference_id: inquiryRecord.id,
      submission_number: `#${nextCount}`,
      submission_time: inquiryRecord.formattedDate,
      message: `=================================================\nNEW INQUIRY VIA PORTFOLIO DIRECT TRANSMISSION\n=================================================\n\nReference ID: ${inquiryRecord.id}\nSubmission: #${nextCount}\nDate: ${inquiryRecord.formattedDate}\n\nClient Name: ${inquiryRecord.name}\nEmail: ${inquiryRecord.email}\nObjective: ${inquiryRecord.objective}\nTimeline: ${inquiryRecord.timeline}\n\nTechnical Scope & Requirements:\n-------------------------------------------------\n${inquiryRecord.scope}\n-------------------------------------------------`,
    };

    try {
      if (web3AccessKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (networkErr) {
      console.warn('Web3Forms dispatch notice:', networkErr);
    }

    // UX Feedback confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionReceipt(inquiryRecord);
    }, 450);
  };

  const handleOpenMailBackup = () => {
    if (!submissionReceipt) return;
    const subject = encodeURIComponent(
      `Project Inquiry [${submissionReceipt.id}]: ${submissionReceipt.objective} — ${submissionReceipt.name}`
    );
    const body = encodeURIComponent(
      `Hello David,\n\nI have submitted a project inquiry through your website:\n\n` +
        `Reference ID: ${submissionReceipt.id}\n` +
        `Submission Number: #${submissionReceipt.submissionIndex}\n` +
        `Name: ${submissionReceipt.name}\n` +
        `Email: ${submissionReceipt.email}\n` +
        `Project / Goal: ${submissionReceipt.objective}\n` +
        `Timeline: ${submissionReceipt.timeline}\n\n` +
        `Scope & Details:\n${submissionReceipt.scope}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const clearInquiries = () => {
    localStorage.removeItem('portfolio_inquiries');
    localStorage.removeItem('portfolio_submission_count');
    setStoredInquiries([]);
    setSubmissionCount(0);
  };

  return (
    <section
      id="inquire"
      className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-[#070709] relative border-t border-white/[0.08] select-none overflow-hidden"
    >
      {/* Ambient lighting backdrop */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-[var(--accent)]/[0.04] rounded-full blur-[180px]" />

      <div className="max-w-[880px] mx-auto relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-5 h-px bg-[var(--accent)]" />
            <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-widest">
              Contact
            </span>
            <span className="w-5 h-px bg-[var(--accent)]" />
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-3">
            Let's Build Something Together.
          </h2>

          <p className="text-white/65 text-sm sm:text-base font-normal leading-relaxed">
            Have a project in mind, a business challenge to solve, or looking to collaborate? Send a message and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* ── CLEAN LIQUID GLASS INTAKE FORM ── */}
        <div className="rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.05] via-[#0A0B10]/95 to-[#07070A]/98 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.18)] relative overflow-hidden">
          {/* Top specular reflection sheen */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent pointer-events-none" />

          {/* Minimalist Live Tracking Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-white/60 font-medium">
                Direct Inquiries Pipeline
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-white/40">Total Inquiries:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-white font-bold text-xs">
                {submissionCount}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 select-text">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-display font-semibold text-xs sm:text-sm text-white/90 mb-2">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen or Acme Labs"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 font-sans focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block font-display font-semibold text-xs sm:text-sm text-white/90 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 font-sans focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Row 2: Project Focus */}
            <div>
              <label className="block font-display font-semibold text-xs sm:text-sm text-white/90 mb-2">
                Project Objective / Finished Solution Needed
              </label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g. Full-Stack Web App, Automated AI Workflow, Client Dashboard, Backend API..."
                required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 font-sans focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-all shadow-inner"
              />
            </div>

            {/* Row 3: Technical Details & Requirements */}
            <div>
              <label className="block font-display font-semibold text-xs sm:text-sm text-white/90 mb-2">
                Scope &amp; Requirements / Business Challenge
              </label>
              <textarea
                rows={4}
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Tell me about what you're building, the business challenge to solve, key features needed, or target timeline..."
                required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl p-4 text-xs sm:text-sm text-white placeholder:text-white/30 font-sans resize-none leading-relaxed focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-all shadow-inner"
              />
            </div>

            {/* Row 4: Timeline & Quick Select Tags */}
            <div>
              <label className="block font-display font-semibold text-xs sm:text-sm text-white/90 mb-2">
                Estimated Timeline (Optional)
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g. MVP in 3-4 weeks, Q3 Launch, or Flexible"
                  className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 font-sans focus:outline-none focus:border-[var(--accent)] transition-all"
                />
                <div className="flex gap-1.5 overflow-x-auto shrink-0">
                  {['2-4 Weeks', '1-3 Months', 'Contract'].map((quickTag) => (
                    <button
                      key={quickTag}
                      type="button"
                      onClick={() => setTimeline(quickTag)}
                      className={`px-3.5 py-2 rounded-xl border font-sans text-xs transition-all cursor-pointer whitespace-nowrap ${
                        timeline === quickTag
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)] font-semibold shadow-sm'
                          : 'bg-white/[0.03] border-white/[0.08] text-white/65 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {quickTag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="liquid-btn-primary !py-3.5 !px-8 text-xs font-bold uppercase tracking-wider shimmer-sweep-hover group cursor-pointer disabled:opacity-50"
              >
                <Send
                  size={13}
                  className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Inquiry'}</span>
              </button>

              <div className="flex items-center justify-center sm:justify-end gap-3 text-xs font-mono text-white/60">
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

          {/* Admin Inquiries Viewer Toggle for David */}
          {storedInquiries.length > 0 && (
            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
              <span>Saved Inquiries: {storedInquiries.length} recorded</span>
              <button
                type="button"
                onClick={() => setShowAdminInbox(true)}
                className="text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Inbox size={12} />
                <span>Open Inquiries Inbox</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 1. CLEAN MODERN CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {submissionReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSubmissionReceipt(null)}
            className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-text"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#0D0E14] border border-white/[0.14] rounded-3xl p-6 sm:p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSubmissionReceipt(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              {/* Status Icon */}
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                <Check size={26} strokeWidth={2.5} />
              </div>

              {/* Headings */}
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Message Sent
              </h3>

              <p className="text-white/70 text-sm font-normal leading-relaxed mb-6">
                Thank you for reaching out, <span className="text-white font-medium">{submissionReceipt.name}</span>. Your inquiry regarding <span className="text-white font-medium">"{submissionReceipt.objective}"</span> has been received. I will review it and get back to you at <span className="text-white font-medium">{submissionReceipt.email}</span> within 24 hours.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSubmissionReceipt(null)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                >
                  Done
                </button>

                <button
                  type="button"
                  onClick={handleOpenMailBackup}
                  className="text-xs text-white/45 hover:text-white transition-colors block mx-auto underline cursor-pointer py-1"
                >
                  Open in your email app instead
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. CLEAN INBOX VIEWER MODAL (FOR DAVID) ── */}
      <AnimatePresence>
        {showAdminInbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdminInbox(false)}
            className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-text"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[80vh] bg-[#0D0E14] border border-white/[0.14] rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
                    <Inbox size={16} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Inquiries Inbox
                    </h3>
                    <span className="text-xs text-white/50 font-normal">
                      {storedInquiries.length} saved message(s) in this browser
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearInquiries}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs transition-colors cursor-pointer"
                  >
                    Clear
                  </button>

                  <button
                    onClick={() => setShowAdminInbox(false)}
                    className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Inquiries list */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                {storedInquiries.length === 0 ? (
                  <p className="text-xs text-white/40 py-8 text-center">
                    No inquiries recorded in this browser yet.
                  </p>
                ) : (
                  storedInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-2.5 text-xs font-sans"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{inq.name}</span>
                          <span className="text-white/40">({inq.email})</span>
                        </div>
                        <span className="text-white/40 text-xs">{inq.formattedDate}</span>
                      </div>

                      <div>
                        <span className="text-white/40 text-xs font-medium block mb-0.5">Project</span>
                        <p className="text-white font-medium text-sm">{inq.objective}</p>
                      </div>

                      <div>
                        <span className="text-white/40 text-xs font-medium block mb-0.5">Details</span>
                        <p className="text-white/80 whitespace-pre-wrap font-normal leading-relaxed">{inq.scope}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/[0.04]">
                        <span>Timeline: <strong className="text-white">{inq.timeline}</strong></span>
                        <a
                          href={`mailto:${inq.email}?subject=Re: Project Inquiry — ${inq.objective}`}
                          className="text-[var(--accent)] hover:underline flex items-center gap-1 font-medium text-xs"
                        >
                          <span>Reply</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
