import React from 'react';
import { Code, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-12 pb-8 px-4 sm:px-6 md:px-8 relative z-20 text-white/70 border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#101118] border border-white/[0.12] flex items-center justify-center text-[var(--accent)]">
              <Code size={16} />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-none">David Kurniawan</span>
              <span className="text-xs text-white/45">Full-Stack &amp; AI Systems</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/60">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github size={14} className="group-hover:text-[var(--accent)] transition-colors" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Linkedin size={14} className="group-hover:text-[var(--accent)] transition-colors" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={14} className="group-hover:text-[var(--accent)] transition-colors" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} David Kurniawan. This site is built with React, Tailwind CSS and Framer Motion.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-white/50 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
