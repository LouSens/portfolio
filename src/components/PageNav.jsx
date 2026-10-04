import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HOME, PAGES, navigate, routeUrl } from '../utils/route';

const go = (route) => (e) => {
  e.preventDefault();
  navigate(route);
};

/* Closes a dedicated page: back to the home page, or straight on to the next page. */
export default function PageNav({ route }) {
  const next = PAGES[(PAGES.findIndex((p) => p.route === route) + 1) % PAGES.length];

  return (
    <nav
      aria-label="More pages"
      className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 pb-14 md:pb-24 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
    >
      <a
        href={routeUrl(HOME)}
        onClick={go(HOME)}
        className="group inline-flex items-center justify-center sm:justify-start gap-2 py-3 text-sm text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft size={15} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
        <span>Back to home</span>
      </a>
      <a
        href={routeUrl(next.route)}
        onClick={go(next.route)}
        className="group inline-flex items-center justify-between gap-6 rounded-2xl border border-white/[0.1] hover:border-[var(--accent)]/50 bg-white/[0.02] hover:bg-white/[0.04] px-5 py-4 transition-colors"
      >
        <span>
          <span className="block text-xs text-white/45">Next</span>
          <span className="block font-display font-bold text-lg text-white tracking-tight">{next.label}</span>
        </span>
        <ArrowRight size={18} className="text-[var(--accent)] transition-transform duration-150 group-hover:translate-x-0.5" />
      </a>
    </nav>
  );
}
