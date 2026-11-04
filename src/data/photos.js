import { DIGDAYA, DPICKLEBALL, OMNIQC } from './portfolioData';

/* Photos from the competitions, in the order they are shown */
export const PHOTOS = [
  { ...DIGDAYA.lead, tag: 'PIDI Digdaya 2026' },
  ...DIGDAYA.photos.slice(2, 4).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
  { ...DPICKLEBALL.lead, tag: 'DPickleball 2025' },
  ...DIGDAYA.photos.slice(5, 7).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
  { ...OMNIQC.lead, tag: 'SEA-CICSIC 2026' },
  ...DPICKLEBALL.photos.filter((p) => p.type !== 'video').map((p) => ({ ...p, tag: 'DPickleball 2025' })),
  ...DIGDAYA.photos.slice(0, 2).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
].filter((p) => p.src);
