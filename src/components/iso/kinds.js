/* Isometric sculptures, described once and drawn twice: as SVG on cards (IsoObject) and as 3D wireframes in
   the world (WorldScene). A box is { x, y, z, w, d, h } in units with z up. `amp` is how far it bobs on its
   loop (negative = down), `ph` its phase, so a sculpture never moves as one block. */
const b = (x, y, z, w, d, h, amp = 0.35, ph = 0) => ({ x, y, z, w, d, h, amp, ph });

export const KINDS = {
  // Four floors that lift apart and settle
  layers: [0, 1, 2, 3].map((i) => b(0, 0, i * 1.1, 4, 4, 0.25, 0.28 * i + 0.1, i * 0.4)),
  // Two planes joined by columns: two sides meeting
  match: [
    b(0, 0, 0, 4, 4, 0.25, 0.1, 0),
    b(0, 0, 2.8, 4, 4, 0.25, 0.5, 0.3),
    b(0.1, 0.1, 0.25, 0.3, 0.3, 2.55, 0.2, 0.3),
    b(3.6, 0.1, 0.25, 0.3, 0.3, 2.55, 0.2, 0.3),
    b(0.1, 3.6, 0.25, 0.3, 0.3, 2.55, 0.2, 0.3),
    b(3.6, 3.6, 0.25, 0.3, 0.3, 2.55, 0.2, 0.3),
  ],
  // Columns of a chart
  bars: [1, 2.2, 1.5, 3, 2.1].map((h, i) => b(i * 1.05, 1, 0, 0.8, 0.8, h, 0.3 + (i % 2) * 0.2, i * 0.5)),
  // Nodes linked around a hub: agents
  cluster: [
    b(1.4, 1.4, 1.2, 1.2, 1.2, 1.2, 0.2, 0),
    b(0, 0, 0, 0.8, 0.8, 0.8, 0.5, 0.5),
    b(3.2, 0, 0.8, 0.8, 0.8, 0.8, 0.5, 1.2),
    b(0, 3.2, 1.6, 0.8, 0.8, 0.8, 0.5, 2),
    b(3.2, 3.2, 0.2, 0.8, 0.8, 0.8, 0.5, 2.7),
  ],
  // Stored data: slabs offset like drives
  database: [0, 1, 2].map((i) => b(i % 2 ? 0.5 : 0, 0, i * 1.25, 3.2, 3.2, 0.9, 0.25 + i * 0.1, i * 0.7)),
  // A shelf of books
  books: [0, 1, 2, 3, 4].map((i) => b((i % 2) * 0.5, 0, i * 0.6, 3.2, 1.8, 0.5, 0.18, i * 0.3)),
  // A court, with a bouncing ball
  court: [b(0, 0, 0, 5, 3, 0.2, 0, 0), b(2.2, 1.2, 0.4, 0.6, 0.6, 0.6, 1.6, 0)],
  // Stacked ingots
  ingots: [b(0, 0, 0, 2, 1.2, 0.8, 0.1, 0), b(2.3, 0, 0, 2, 1.2, 0.8, 0.1, 0.6), b(1.15, 0, 0.8, 2, 1.2, 0.8, 0.5, 1.2)],
  // A reel: hub with four frames around it
  reel: [
    b(1.3, 1.3, 0.6, 1.4, 1.4, 1.4, 0.2, 0),
    b(0, 0, 0, 0.7, 0.7, 0.7, 0.5, 0.2),
    b(3.3, 0, 0, 0.7, 0.7, 0.7, 0.5, 1),
    b(0, 3.3, 0, 0.7, 0.7, 0.7, 0.5, 1.8),
    b(3.3, 3.3, 0, 0.7, 0.7, 0.7, 0.5, 2.6),
  ],
};

export const PROJECT_KIND = {
  kerjacerdas: 'match',
  adept: 'layers',
  radar: 'bars',
  orion: 'cluster',
  neuralvoid: 'database',
  'legal-rag': 'books',
  dpickleball: 'court',
  'gold-forecast': 'ingots',
  'movie-recommender': 'reel',
};
