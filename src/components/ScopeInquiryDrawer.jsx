import PageSection from './PageSection';
import { createPortal } from 'react-dom';
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
export default function ScopeInquiryDrawer({ compact = false, panel = false }) {
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
    <PageSection
      panel={panel}
      id="inquire"
      className="section-glow py-10 md:py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.14] bg-white/[0.03] p-6 sm:p-9 lg:p-12 grid lg:grid-cols-12 gap-10 lg:gap-14"
        >
          

          {/* Left: the pitch and the direct ways to reach me */}
          <div className="lg:col-span-5 relative z-10">
            <SectionLabel label="Contact" />
            <h2 className="font-display font-extrabold text-fluid-h2 text-white tracking-tight leading-[1.1]">
              Let&apos;s work <span className="text-[var(--accent)]">together.</span>
            </h2>
            <p className="mt-5 text-[17px] text-white/70 leading-relaxed">
              Looking for an internship or remote part-time work in backend, full-stack and AI. Send me a few lines.
            </p>

            <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <button type="button" onClick={handleCopyEmail} className="inline-flex items-center gap-1.5 text-white/75 hover:text-white transition-colors cursor-pointer" aria-label="Copy email address">
                {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copiedEmail ? 'Copied' : PERSONAL_INFO.email}
              </button>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors">LinkedIn <ArrowUpRight size={13} /></a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors">GitHub <ArrowUpRight size={13} /></a>
            </p>
          </div>

          {/* Right: the message form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 relative z-10 flex flex-col gap-5 select-text lg:pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-white/80 mb-2">Name or company</label>
                <input id="contact-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Chen or Acme Corp" required className="w-full bg-white/[0.03] border border-white/[0.14] rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-white/80 mb-2">Email</label>
                <input id="contact-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@company.com" required className="w-full bg-white/[0.03] border border-white/[0.14] rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--accent)] transition-colors" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm text-white/80 mb-2">Message</label>
              <textarea id="contact-message" rows={6} value={scope} onChange={(e) => setScope(e.target.value)} placeholder="A few lines on the role or what you'd like to discuss." required className="w-full bg-white/[0.03] border border-white/[0.14] rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none leading-relaxed" />
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
              <p className="text-xs text-white/50 leading-relaxed sm:max-w-[16rem]">Your message goes straight to my inbox.</p>
            </div>
          </form>
        </motion.div>

        {/* Admin Messages Viewer Toggle for David */}
        {storedInquiries.length > 0 && (
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
      {createPortal(<AnimatePresence>
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
              className="relative max-w-md w-full bg-panel border border-white/[0.14] rounded-3xl p-6 sm:p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_0_rgba(255,255,255,0.15)] overflow-hidden"
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
                Thanks for reaching out, <span className="text-white font-medium">{submissionReceipt.name}</span>. Your message has been received.
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
      </AnimatePresence>, document.body)}

      {/* ── 2. CLEAN INBOX VIEWER MODAL (FOR DAVID) ── */}
      {createPortal(<AnimatePresence>
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
              className="relative max-w-2xl w-full max-h-[80vh] bg-panel border border-white/[0.14] rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-[var(--accent)]">
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
      </AnimatePresence>, document.body)}
    </PageSection>
  );
}
