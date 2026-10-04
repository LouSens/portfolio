import React, { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
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
  ArrowUpRight,
  ArrowRight,
  Download,
  Loader2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { navigate, routeUrl } from '../utils/route';

/* compact: the home page version (status and one-tap links). The Contact page adds the message form. */
export default function ScopeInquiryDrawer({ compact = false }) {
  const [objective, setObjective] = useState('');
  const [scope, setScope] = useState('');
  const [opportunityType, setOpportunityType] = useState('');
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
      objective: objective.trim() || 'General Inquiry',
      scope: scope.trim(),
      opportunityType: opportunityType.trim() || 'Not specified',
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
      subject: `[${inquiryRecord.id}] New Message: ${inquiryRecord.objective} | ${inquiryRecord.name}`,
      from_name: `${inquiryRecord.name} (Portfolio Contact Form)`,
      replyto: inquiryRecord.email,
      name: inquiryRecord.name,
      email: inquiryRecord.email,
      objective: inquiryRecord.objective,
      opportunity_type: inquiryRecord.opportunityType,
      message_body: inquiryRecord.scope,
      reference_id: inquiryRecord.id,
      submission_number: `#${nextCount}`,
      submission_time: inquiryRecord.formattedDate,
      message: `=================================================\nNEW MESSAGE VIA PORTFOLIO CONTACT FORM\n=================================================\n\nReference ID: ${inquiryRecord.id}\nSubmission: #${nextCount}\nDate: ${inquiryRecord.formattedDate}\n\nName: ${inquiryRecord.name}\nEmail: ${inquiryRecord.email}\nRegarding: ${inquiryRecord.objective}\nOpportunity Type: ${inquiryRecord.opportunityType}\n\nMessage:\n-------------------------------------------------\n${inquiryRecord.scope}\n-------------------------------------------------`,
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
      `Message [${submissionReceipt.id}]: ${submissionReceipt.objective} | ${submissionReceipt.name}`
    );
    const body = encodeURIComponent(
      `Hi David,\n\nI submitted a message through your website:\n\n` +
        `Reference ID: ${submissionReceipt.id}\n` +
        `Submission Number: #${submissionReceipt.submissionIndex}\n` +
        `Name: ${submissionReceipt.name}\n` +
        `Email: ${submissionReceipt.email}\n` +
        `Regarding: ${submissionReceipt.objective}\n` +
        `Opportunity Type: ${submissionReceipt.opportunityType}\n\n` +
        `Message:\n${submissionReceipt.scope}\n`
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
      className="section-glow py-14 md:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden border-t border-white/[0.06]"
    >
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* ── 1. HEADER: who I am looking for, and the one-line status ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-8 md:mb-12"
        >
          <SectionLabel label="Contact" />
          <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.12] mb-4">
            Let's <span className="text-[var(--accent)]">talk.</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            I'm looking for an internship in backend, full-stack or AI engineering, and I'm open to remote part-time work.
            If you've read my CV and want the story behind a project, ask away.
          </p>
          <p className="mt-5 inline-flex items-center gap-2.5 text-sm text-white/70">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {PERSONAL_INFO.status}
          </p>
        </motion.div>

        {/* ── 2. FASTEST WAYS TO REACH ME: one tap, no typing ── */}
        <ul className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 ${compact ? 'mb-2.5 sm:mb-3 md:mb-4' : 'mb-8 md:mb-14'}`}>
          {[
            { label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail, copy: true },
            { label: 'LinkedIn', value: 'in/davidkurniawan13', href: PERSONAL_INFO.linkedin, Icon: Linkedin, external: true },
            { label: 'GitHub', value: 'LouSens', href: PERSONAL_INFO.github, Icon: Github, external: true },
            { label: 'CV', value: 'Download PDF', href: PERSONAL_INFO.resumeUrl, Icon: Download, download: 'CV_David_Kurniawan.pdf', external: true },
          ].map(({ label, value, href, Icon, copy, external, download }) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`relative group rounded-2xl border border-white/[0.1] hover:border-[var(--accent)]/40 bg-white/[0.02] hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200 sm:min-h-[128px]`}
            >
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                download={download}
                className="flex h-full flex-row items-center sm:flex-col sm:items-start sm:justify-between gap-4 sm:gap-5 p-3.5 sm:p-5"
              >
                <span className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/25 flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-xs text-white/45 mb-0.5">
                    {label}
                    {!copy && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </span>
                  <span className="block text-sm sm:text-[15px] text-white break-words leading-snug">{value}</span>
                </span>
              </a>
              {copy && (
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="absolute top-1/2 -translate-y-1/2 right-2 sm:top-2.5 sm:translate-y-0 sm:right-2.5 inline-flex items-center gap-1.5 h-10 px-3 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </motion.li>
          ))}
        </ul>

        {compact && (
          <a
            href={routeUrl('contact')}
            onClick={(e) => {
              e.preventDefault();
              navigate('contact');
            }}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-white/[0.1] hover:border-[var(--accent)]/50 bg-white/[0.02] hover:bg-white/[0.04] px-5 py-4 sm:px-6 sm:py-5 transition-colors"
          >
            <span>
              <span className="block font-display font-bold text-lg sm:text-xl text-white tracking-tight">Send me a message</span>
              <span className="block text-sm text-white/55 mt-0.5">A short form that goes straight to my inbox. I usually reply within 24 hours.</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-[var(--accent)] transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        )}

        {/* ── 3. MESSAGE FORM: pick what it is about, then three fields ── */}
        {!compact && <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-white/[0.02] p-4 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-7 lg:gap-14"
        >
          <div className="lg:col-span-4">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">Send a message</h3>
            <p className="mt-2 text-sm text-white/55 leading-relaxed">Goes straight to my inbox. I usually reply within 24 hours.</p>

            <fieldset className="mt-6">
              <legend className="text-sm text-white/80 mb-3">What is it about?</legend>
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                {[
                  { label: 'Internship', hint: 'Backend, full-stack or AI' },
                  { label: 'Remote part-time', hint: 'Flexible hours' },
                  { label: 'Just saying hi', hint: 'A question or an idea' },
                ].map((opt) => {
                  const on = opportunityType === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setOpportunityType(on ? '' : opt.label);
                        setObjective(on ? '' : opt.label);
                      }}
                      className={`text-left rounded-xl border px-4 py-3 min-h-[56px] transition-colors cursor-pointer ${
                        on
                          ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-white'
                          : 'border-white/[0.1] bg-white/[0.03] text-white/70 hover:text-white hover:border-white/[0.25]'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{opt.label}</span>
                      <span className={`block text-xs mt-0.5 ${on ? 'text-white/70' : 'text-white/40'}`}>{opt.hint}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-5 select-text">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-white/80 mb-2">Name or company</label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Chen or Acme Corp"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-white/80 mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm text-white/80 mb-2">Message</label>
              <textarea
                id="contact-message"
                rows={6}
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="A few lines on the role or what you'd like to discuss."
                required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl p-4 text-base sm:text-sm text-white placeholder:text-white/30 resize-none leading-relaxed focus:outline-none focus:border-[var(--accent)] focus:bg-white/[0.06] transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="liquid-btn-primary w-full sm:w-auto justify-center !py-3.5 !px-8 text-sm font-bold group cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                )}
                <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
              </button>
              <p className="text-xs text-white/40 leading-relaxed sm:max-w-[16rem]">Your details are only used to reply to you.</p>
            </div>
          </form>
        </motion.div>}

        {/* Admin Messages Viewer Toggle for David */}
        {!compact && storedInquiries.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-xs text-white/40">
            <span>Saved Messages: {storedInquiries.length} recorded</span>
            <button
              type="button"
              onClick={() => setShowAdminInbox(true)}
              className="text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Inbox size={12} />
              <span>Open Messages Inbox</span>
            </button>
          </div>
        )}
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
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_24px_rgba(16,185,129,0.2)]"
              >
                <Check size={26} strokeWidth={2.5} />
              </motion.div>

              {/* Headings */}
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Message Sent
              </h3>

              <p className="text-white/70 text-sm font-normal leading-relaxed mb-6">
                Thanks for reaching out, <span className="text-white font-medium">{submissionReceipt.name}</span>. Your message regarding <span className="text-white font-medium">"{submissionReceipt.objective}"</span> has been received. I'll get back to you at <span className="text-white font-medium">{submissionReceipt.email}</span> within 24 hours.
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
                      Messages Inbox
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

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                {storedInquiries.length === 0 ? (
                  <p className="text-xs text-white/40 py-8 text-center">
                    No messages recorded in this browser yet.
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
                        <span className="text-white/40 text-xs font-medium block mb-0.5">Regarding</span>
                        <p className="text-white font-medium text-sm">{inq.objective}</p>
                      </div>

                      <div>
                        <span className="text-white/40 text-xs font-medium block mb-0.5">Message</span>
                        <p className="text-white/80 whitespace-pre-wrap font-normal leading-relaxed">{inq.scope}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/[0.04]">
                        <span>Type: <strong className="text-white">{inq.opportunityType}</strong></span>
                        <a
                          href={`mailto:${inq.email}?subject=Re: ${inq.objective}`}
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
