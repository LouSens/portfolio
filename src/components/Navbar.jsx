import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { HOME, navigate, routeUrl } from '../utils/route';
import { NAV_SECTIONS, useActiveRoom } from '../utils/roomStore';
import ThemeToggle from './ThemeToggle';
import ResumeButton from './ResumeButton';

/* One navbar for the whole site. Every link goes to a part of the home page; the highlighted link is the part you are
   in. It stays put while you scroll, so it is always there to jump with. */
export default function Navbar({ route = HOME }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveRoom();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => (e) => {
    e?.preventDefault();
    setOpen(false);
    document.body.style.overflow = '';
    if (route === HOME && id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (route === HOME) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate(HOME, id || null);
  };

  const current = (link) => route === HOME && link.rooms.includes(active);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 pt-3 pointer-events-none">
        {/* At the top the bar is part of the page: no fill, full width. Scrolled, it narrows and turns to glass. */}
        <div className={`mx-auto pointer-events-auto transition-[max-width] duration-500 ease-out ${scrolled ? 'max-w-[900px]' : 'max-w-[1240px]'}`}>
          <div className="relative flex items-center justify-between gap-4 pl-3 pr-3 sm:pl-4 py-2 rounded-full">
            <span aria-hidden="true" className={`absolute inset-0 rounded-full liquid-nav liquid-nav-strong transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
            <a href={routeUrl(HOME)} onClick={go(null)} className="relative flex items-center gap-2.5 min-w-0 group" aria-label="David Kurniawan, home">
              <span className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.06] border border-white/[0.16] flex items-center justify-center font-display font-extrabold text-[12px] text-white group-hover:border-accent/70 transition-colors">
                DK
              </span>
              <span className="hidden sm:block font-display font-bold text-sm text-white leading-none truncate">David Kurniawan</span>
            </a>

            <nav aria-label="Main" className="relative hidden lg:flex items-center gap-0.5">
              {NAV_SECTIONS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  aria-current={current(link) ? 'true' : undefined}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-display font-medium transition-colors ${
                    current(link) ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {current(link) && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.1]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{link.label}</span>
                </a>
              ))}
            </nav>

            <div className="relative flex items-center gap-2.5">
              <ThemeToggle className="hidden sm:inline-flex" />
              <ResumeButton variant="compact" className="hidden lg:inline-flex" />
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="liquid-nav-btn lg:hidden w-9 h-9 rounded-full text-white flex items-center justify-center cursor-pointer"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[72px] left-3 right-3 z-50 liquid-nav liquid-nav-menu rounded-3xl p-3 lg:hidden"
            >
              <nav aria-label="Menu" className="flex flex-col">
                {NAV_SECTIONS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    aria-current={current(link) ? 'true' : undefined}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-display font-semibold ${current(link) ? 'text-white bg-white/[0.1]' : 'text-white/90'}`}
                  >
                    {link.label}
                    {current(link) && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  </a>
                ))}
              </nav>
              <div className="mt-3 pt-4 border-t border-white/[0.1] flex items-center justify-between gap-3 px-1">
                <ThemeToggle showLabel />
                <ResumeButton variant="compact" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
