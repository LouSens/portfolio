import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme, useTheme } from '../utils/theme';

/* Light / dark switch for the navbar. The icon shows the theme you will get, not the one you have. */
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`relative w-9 h-9 rounded-full border border-white/[0.14] bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.3] text-white/80 hover:text-white flex items-center justify-center overflow-hidden transition-colors cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
