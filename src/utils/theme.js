import { useSyncExternalStore } from 'react';

// One source of truth for the colour theme. The attribute on <html> drives every colour in the site
// (see index.html for the pre-paint script and index.css for the tokens); this module only keeps it
// in sync with localStorage and lets React components (e.g. the 3D scene) subscribe to it.
const KEY = 'dk-theme';
const listeners = new Set();

const read = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

export function setTheme(next, { animate = true } = {}) {
  const root = document.documentElement;
  if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-fade');
    window.setTimeout(() => root.classList.remove('theme-fade'), 450);
  }
  root.setAttribute('data-theme', next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f6f5f1' : '#050508');
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* private mode: the choice just lasts for this visit */
  }
  listeners.forEach((l) => l());
}

export const toggleTheme = () => setTheme(read() === 'light' ? 'dark' : 'light');

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useTheme = () => useSyncExternalStore(subscribe, read, () => 'dark');
