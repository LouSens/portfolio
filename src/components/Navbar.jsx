import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - prevScrollY.current;

      // Update background state based on scroll offset
      setIsScrolled(currentScrollY > 15);

      // Instantaneous reveal on any upward scroll (delta < 0) or at the top of the page
      if (delta < 0 || currentScrollY < 15) {
        setIsVisible(true);
      } else if (delta > 3 && currentScrollY > 60 && !isOpen) {
        // Hide immediately on downward scroll
        setIsVisible(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'work' },
    { label: 'Awards', id: 'awards' },
    { label: 'Contact', id: 'inquire' },
  ];

  const scrollTo = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : -90,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.18,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 py-3.5 transition-colors pointer-events-auto"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Floating Liquid Glass Navigation Bar Dock */}
          <div
            className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-white/[0.06] backdrop-blur-2xl border border-white/[0.14] shadow-[0_16px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.22)]'
                : 'bg-white/[0.02] backdrop-blur-md border border-white/[0.06]'
            }`}
          >
            {/* ── BESPOKE LIQUID BRAND IDENTITY ── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-white transition-all duration-200 group text-left cursor-pointer select-none"
            >
              {/* Custom Liquid Glass DK Monogram Emblem */}
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-white/[0.16] via-[#0E1018]/90 to-[#07080D]/95 border border-white/[0.22] group-hover:border-[var(--accent)]/70 flex items-center justify-center font-display font-extrabold text-[13px] tracking-tight text-white transition-all duration-200 shadow-md">
                <span className="bg-gradient-to-r from-white via-white to-white/75 bg-clip-text text-transparent group-hover:to-[var(--accent)] transition-all">
                  DK
                </span>
              </div>

              <div>
                <span className="font-display font-bold text-sm sm:text-base text-white block leading-none tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  David Kurniawan
                </span>
                <span className="text-[9px] text-white/50 uppercase tracking-widest block mt-0.5 font-medium">
                  Full-Stack &amp; AI Systems
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.06]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-all text-xs font-display font-medium tracking-wide cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Remodeled Action Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="CV_David_Kurniawan.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.12] text-white/80 hover:text-white hover:border-white/[0.28] font-display font-medium text-xs transition-all bg-white/[0.03] hover:bg-white/[0.08] shadow-sm cursor-pointer"
              >
                <Download size={13} />
                <span>Resume</span>
              </a>

              <button
                onClick={() => scrollTo('inquire')}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF6644] to-[#FF431A] hover:from-[#ff7555] hover:to-[#ff522b] text-white font-display font-bold text-xs tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/20 transition-all cursor-pointer active:scale-95"
              >
                Contact
              </button>
            </div>

            {/* Reimagined Liquid Hamburger Button for Mobile & Tablet */}
            <button
              className="lg:hidden w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.14] flex flex-col items-center justify-center gap-1.5 text-white/80 hover:text-white transition-all cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`w-4 h-0.5 bg-white rounded-full transition-transform duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-4 h-0.5 bg-white rounded-full transition-opacity duration-200 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-4 h-0.5 bg-white rounded-full transition-transform duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu: Backdrop + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed top-[68px] left-4 right-4 z-40 p-6 rounded-3xl bg-[#090A10]/95 backdrop-blur-2xl border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_0_rgba(255,255,255,0.2)] flex flex-col items-center gap-4 lg:hidden select-none"
            >
              <div className="w-full flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="w-full py-3 px-4 rounded-xl text-left font-display text-base font-semibold text-white/80 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col w-full gap-2.5 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => scrollTo('inquire')}
                  className="liquid-btn-primary w-full justify-center !py-3.5 font-display text-sm font-bold tracking-wide"
                >
                  Contact
                </button>

                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download="CV_David_Kurniawan.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-btn-secondary w-full justify-center !py-3.5 font-display text-sm font-semibold tracking-wide text-center flex items-center gap-2"
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
