import React from 'react';
import { Code, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-20 pb-12 px-4 sm:px-6 md:px-8 relative z-20 text-white/70 bg-gradient-to-b from-transparent via-[#040406]/80 to-[#020204]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Col 1 */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#101118] border border-white/[0.12] flex items-center justify-center text-[var(--accent)]">
                <Code size={16} />
              </div>
              <span className="font-display font-bold text-lg text-white">David Kurniawan</span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-normal leading-relaxed max-w-sm">
              Full-Stack Developer &amp; AI Systems Engineer. Architecting modern web applications, autonomous LangGraph multi-agent swarms, and high-throughput FastAPI backends.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs text-white/60">
              <li>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Projects &amp; Code
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tech Stack
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('awards')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Recognition
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-3">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 font-mono text-xs text-white/60">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github size={13} className="text-[var(--accent)]" />
                <span>GitHub · LouSens</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Linkedin size={13} className="text-[var(--accent)]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={13} className="text-[var(--accent)]" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} David Kurniawan. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-white/60 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
