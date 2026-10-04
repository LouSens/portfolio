// The home page carries the highlights; each page below goes deeper on one part of it.
// Pages live behind the hash (#/projects), so they work on any static host without server rewrites
// and sit alongside the existing #project=<id> case study links.
export const HOME = 'home';

export const PAGES = [
  { route: 'projects', label: 'Projects' },
  { route: 'awards', label: 'Awards' },
  { route: 'contact', label: 'Contact' },
];

export const parseRoute = (hash = window.location.hash) => {
  const match = hash.match(/^#\/([a-z-]+)/);
  return match && PAGES.some((p) => p.route === match[1]) ? match[1] : HOME;
};

export const routeHash = (route) => (route === HOME ? '' : `#/${route}`);

export const routeUrl = (route) => window.location.pathname + window.location.search + routeHash(route);

// A section to land on once the next page has rendered (e.g. About, which only exists on the home page).
let pendingSection = null;
export const takePendingSection = () => {
  const id = pendingSection;
  pendingSection = null;
  return id;
};

export function navigate(route, section = null) {
  if (!window.location.hash.startsWith('#project=') && parseRoute() === route) {
    const el = section && document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  pendingSection = section;
  window.history.pushState(null, '', routeUrl(route));
  // pushState is silent; App listens for hashchange to pick the page.
  window.dispatchEvent(new Event('hashchange'));
}
