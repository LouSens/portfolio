import React from 'react';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { HOME, navigate } from '../utils/route';

// The contact section right above already has the GitHub, LinkedIn and Email buttons, so the footer offers the
// sections instead, including the photos, which have no navbar entry of their own.
const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'moments', label: 'Photos' },
  { id: 'awards', label: 'Awards' },
];

/* One quiet row: the mark and name on the left, the sections as plain text links on the right, the year and a way
   back up underneath. */
export default function Footer() {
  const go = (id) => (e) => {
    e.preventDefault();
    navigate(HOME, id);
  };

  return (
    <footer className="relative z-20 px-5 sm:px-8 pt-10 pb-8 border-t border-white/[0.12] bg-[var(--band)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group w-fit" aria-label="Back to the top">
            <Logo className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>
              <span className="block font-display font-bold text-white leading-tight">David Kurniawan</span>
              <span className="block text-xs text-white/55">Web and AI developer</span>
            </span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className="inline-block py-1.5 text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-5 border-t border-white/[0.12] flex items-center justify-between gap-3 text-xs text-white/55">
          <p>&copy; {new Date().getFullYear()} David Kurniawan</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 py-2 hover:text-white transition-colors cursor-pointer">
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
