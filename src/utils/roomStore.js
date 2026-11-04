import { useSyncExternalStore } from 'react';

// Which part of the home page is in front of you. The 3D space and the light page both publish it; the navbar reads it.
let active = 'hero';
const listeners = new Set();

export const setActiveRoom = (id) => {
  if (id === active) return;
  active = id;
  listeners.forEach((l) => l());
};

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useActiveRoom = () => useSyncExternalStore(subscribe, () => active, () => 'hero');

// Navbar entries and the rooms that belong to each
export const NAV_SECTIONS = [
  { id: 'about', label: 'About', rooms: ['about'] },
  { id: 'work', label: 'Projects', rooms: ['work'] },
  { id: 'stack', label: 'Stack', rooms: ['stack'] },
  { id: 'activity', label: 'Numbers', rooms: ['activity', 'github'] },
  { id: 'awards', label: 'Awards', rooms: ['moments', 'awards'] },
  { id: 'inquire', label: 'Contact', rooms: ['inquire'] },
];
