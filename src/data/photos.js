import { DIGDAYA, DPICKLEBALL, SDC } from './portfolioData';

const SDC_TAG = 'SDC XMUM Hackathon 2026';

/* Photos from the competitions, in the order they are shown */
export const PHOTOS = [
  { ...SDC.lead, tag: SDC_TAG },
  { ...SDC.photos[0], tag: SDC_TAG },
  { ...DIGDAYA.lead, tag: 'PIDI Digdaya 2026' },
  ...DIGDAYA.photos.slice(2, 4).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
  { ...SDC.photos[1], tag: SDC_TAG },
  { ...SDC.photos[4], tag: SDC_TAG },
  { ...DPICKLEBALL.lead, tag: 'DPickleball 2025' },
  ...DIGDAYA.photos.slice(5, 7).map((p) => ({ ...p, tag: 'PIDI Digdaya 2026' })),
  { ...SDC.photos[2], tag: SDC_TAG },
  { ...SDC.photos[3], tag: SDC_TAG },
  ...DPICKLEBALL.photos.filter((p) => p.type !== 'video').map((p) => ({ ...p, tag: 'DPickleball 2025' })),
].filter((p) => p.src);
