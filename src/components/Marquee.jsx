import React from 'react';
import { MARQUEE_TOOLS } from '../data/portfolioData';

export default function Marquee() {
  const repeated = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS, ...MARQUEE_TOOLS];

  return (
    <section className="py-8 bg-transparent overflow-hidden select-none relative">
      <div className="ticker-wrap-new w-full [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="ticker-track-new">
          {repeated.map((tool, idx) => (
            <div
              key={`m1-${idx}`}
              className="flex items-center gap-3 px-8 group opacity-45 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <img
                src={tool.svg}
                alt={tool.name}
                className="w-4 h-4 sm:w-5 sm:h-5 filter grayscale group-hover:grayscale-0 transition-all duration-200"
                loading="lazy"
              />
              <span className="font-display font-medium text-sm sm:text-base text-white whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-white/20 text-xs font-mono px-2">/</span>
            </div>
          ))}
        </div>

        <div className="ticker-track-new" aria-hidden="true">
          {repeated.map((tool, idx) => (
            <div
              key={`m2-${idx}`}
              className="flex items-center gap-3 px-8 group opacity-45 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <img
                src={tool.svg}
                alt={tool.name}
                className="w-4 h-4 sm:w-5 sm:h-5 filter grayscale group-hover:grayscale-0 transition-all duration-200"
                loading="lazy"
              />
              <span className="font-display font-medium text-sm sm:text-base text-white whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-white/20 text-xs font-mono px-2">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
