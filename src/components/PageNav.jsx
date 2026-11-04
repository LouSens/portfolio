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
      <a href={routeUrl(HOME)} onClick={go(HOME)} className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-canvas hover:bg-accent hover:text-white px-5 py-2.5 text-sm font-display font-semibold transition-colors">
        <ArrowLeft size={15} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
        <span>Back to home</span>
      </a>
      <a href={routeUrl(next.route)} onClick={go(next.route)} className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-canvas hover:bg-accent hover:text-white px-5 py-2.5 text-sm font-display font-semibold transition-colors">
        <span>{next.label}</span>
        <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
      </a>
    </nav>
  );
}
