import { useSyncExternalStore } from 'react';

// One source of truth for the colour theme. The attribute on <html> drives every colour in the site
// (see index.html for the pre-paint script and index.css for the tokens); this module only keeps it
// in sync with localStorage and lets React components (e.g. the 3D scene) subscribe to it.
const KEY = 'dk-theme';
const listeners = new Set();

const read = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

export function setTheme(next, { origin } = {}) {
  const root = document.documentElement;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const apply = () => {
    root.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f6f5f1' : '#050508');
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
    listeners.forEach((l) => l());
  };

  if (calm) return apply();

  // Seamless: the browser snapshots the old theme and the new one is revealed as a circle growing out of the switch.
  if (origin && typeof document.startViewTransition === 'function') {
    root.style.setProperty('--vt-x', `${origin.x}px`);
    root.style.setProperty('--vt-y', `${origin.y}px`);
    root.classList.add('theme-reveal');
    const t = document.startViewTransition(apply);
    t.finished.finally(() => root.classList.remove('theme-reveal'));
    return undefined;
  }

  // Browsers without view transitions: a short cross-fade of the colours
  root.classList.add('theme-fade');
  window.setTimeout(() => root.classList.remove('theme-fade'), 450);
  return apply();
}

export const toggleTheme = (origin) => setTheme(read() === 'light' ? 'dark' : 'light', { origin });

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useTheme = () => useSyncExternalStore(subscribe, read, () => 'dark');
