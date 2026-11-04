import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { toggleTheme, useTheme } from '../utils/theme';

/* An on/off switch for dark mode: the knob sits on the sun side when it is off and on the moon side when it is on. */
export default function ThemeToggle({ className = '', showLabel = false }) {
  const dark = useTheme() === 'dark';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={toggleTheme}
      className={`group inline-flex items-center gap-2.5 cursor-pointer select-none ${className}`}
    >
      {showLabel && <span className="text-sm text-white/70 group-hover:text-white transition-colors">Dark mode</span>}
      <span
        className={`relative inline-flex h-7 w-[3.1rem] shrink-0 items-center rounded-full border transition-colors duration-300 ${
          dark ? 'bg-white/[0.12] border-white/[0.22]' : 'bg-accent/15 border-accent/40'
        }`}
      >
        <Sun size={12} className={`absolute left-[7px] transition-opacity ${dark ? 'opacity-35' : 'opacity-0'} text-white`} aria-hidden="true" />
        <Moon size={12} className={`absolute right-[7px] transition-opacity ${dark ? 'opacity-0' : 'opacity-45'} text-white`} aria-hidden="true" />
        <span
          className={`absolute top-[3px] h-5 w-5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-out ${
            dark ? 'left-[calc(100%-1.4rem)] bg-white text-canvas' : 'left-[3px] bg-accent text-white'
          }`}
        >
          {dark ? <Moon size={11} aria-hidden="true" /> : <Sun size={11} aria-hidden="true" />}
        </span>
      </span>
    </button>
  );
}
