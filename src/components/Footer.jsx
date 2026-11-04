import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import Logo from './Logo';

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
];

/* One quiet row: the mark and name on the left, the three places to find me on the right, the year and a way back up
   underneath. */
export default function Footer() {
  return (
    <footer className="relative z-20 px-5 sm:px-8 pt-10 pb-8 border-t border-white/[0.12] bg-[var(--band)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group w-fit" aria-label="Back to the top">
            <Logo className="w-10 h-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>
              <span className="block font-display font-bold text-white leading-tight">David Kurniawan</span>
              <span className="block text-xs text-white/55">Web and AI developer</span>
            </span>
          </a>

          <ul className="flex items-center gap-2.5">
            {LINKS.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={label}
                  title={label}
                  className="w-11 h-11 rounded-xl border border-white/25 text-white/75 hover:text-white hover:border-white/60 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
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
