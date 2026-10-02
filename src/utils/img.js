// Every .webp in static/ has a phone-sized "-sm" copy next to it (800px wide, 600px for portraits).
export const small = (src) => (/\.webp$/.test(src) && !src.includes('-sm.') ? src.replace(/\.webp$/, '-sm.webp') : src);

// srcSet so the browser picks the small copy on phones and the full one on large screens.
export const srcSet = (src, fullWidth = 1800) => (small(src) !== src ? `${small(src)} 800w, ${src} ${fullWidth}w` : undefined);

export const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
