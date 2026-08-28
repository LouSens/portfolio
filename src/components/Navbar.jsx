import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'work' },
    { label: 'Tech Stack', id: 'stack' },
    { label: 'Timeline', id: 'experience' },
    { label: 'Awards', id: 'awards' },
    { label: 'Contact', id: 'inquire' },
  ];

  const scrollTo = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300 ${isScrolled
            ? 'py-3 bg-[#070709]/90 backdrop-blur-xl border-b border-white/10 shadow-xl'
            : 'py-5 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          {/* Logo & Identity */}
          {/* ── BESPOKE BRAND IDENTITY ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-white transition-all duration-300 group text-left"
          >
            {/* Custom DK Monogram Emblem */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A1A24] via-[#101018] to-[#0A0A0F] border border-white/15 group-hover:border-[var(--accent)]/50 flex items-center justify-center font-display font-black text-[13px] tracking-tight text-white group-hover:shadow-[0_0_20px_rgba(255,90,54,0.3)] transition-all duration-300 shadow-md">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent group-hover:from-white group-hover:to-[var(--accent)] transition-all">
                DK
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--accent)] ring-2 ring-[#070709]" />
            </div>

            <div>
              <span className="font-display font-bold text-sm sm:text-base text-white block leading-none tracking-tight group-hover:text-[var(--accent)] transition-colors">
                David Kurniawan
              </span>
              <span className="font-mono-dm text-[9px] text-white/45 uppercase tracking-widest block mt-0.5">
                Full-Stack &amp; AI Systems
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative text-white/60 hover:text-white transition-colors text-[11px] uppercase tracking-[0.15em] font-mono-dm py-1 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="CV_David_Kurniawan.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-mono-dm text-xs transition-colors bg-white/5"
            >
              <Download size={12} />
              <span>Resume</span>
            </a>

            <button
              onClick={() => scrollTo('inquire')}
              className="px-4 py-1.5 rounded-full bg-[var(--accent)] hover:bg-[#ff431a] text-white font-mono-dm text-xs font-semibold uppercase tracking-wider transition-colors shadow-md shadow-[var(--accent)]/20"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[56px] z-40 bg-[#070709]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 p-6 md:hidden border-t border-white/10"
          >
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-display text-xl font-bold uppercase tracking-widest text-white hover:text-[var(--accent)]"
              >
                {link.label}
              </button>
            ))}

            <div className="flex flex-col w-full max-w-xs gap-3 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => scrollTo('inquire')}
                className="w-full py-2.5 rounded-full bg-[var(--accent)] text-white font-mono-dm text-xs font-bold uppercase tracking-wider"
              >
                Get in Touch
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download="CV_David_Kurniawan.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full border border-white/20 text-white font-mono-dm text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <Download size={13} />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
