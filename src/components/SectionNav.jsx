import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'inquire', label: 'Contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5"
    >
      {SECTIONS.map((sec) => {
        const isActive = active === sec.id;
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            aria-label={`Jump to ${sec.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`text-[11px] font-display whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'text-white opacity-100 translate-x-0'
                  : 'text-white/50 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {sec.label}
            </span>
            <span
              className={`rounded-full transition-all duration-200 shrink-0 ${
                isActive ? 'w-2 h-2 bg-[var(--accent)]' : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
