import React from 'react';
import { MARQUEE_TOOLS } from '../data/portfolioData';

export default function Marquee() {
  const repeated = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS, ...MARQUEE_TOOLS];

  return (
    <section className="py-7 border-y border-white/10 bg-[#040406] overflow-hidden select-none">
      <div className="ticker-wrap-new w-full">
        <div className="ticker-track-new">
          {repeated.map((tool, idx) => (
            <div
              key={`m1-${idx}`}
              className="flex items-center gap-3 px-8 group opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <img
                src={tool.svg}
                alt={tool.name}
                className="w-5 h-5 filter grayscale group-hover:grayscale-0 transition-all duration-200"
                loading="lazy"
              />
              <span className="font-display font-medium text-base text-white whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-white/20 text-xs font-mono-dm px-2">/</span>
            </div>
          ))}
        </div>

        <div className="ticker-track-new" aria-hidden="true">
          {repeated.map((tool, idx) => (
            <div
              key={`m2-${idx}`}
              className="flex items-center gap-3 px-8 group opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <img
                src={tool.svg}
                alt={tool.name}
                className="w-5 h-5 filter grayscale group-hover:grayscale-0 transition-all duration-200"
                loading="lazy"
              />
              <span className="font-display font-medium text-base text-white whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-white/20 text-xs font-mono-dm px-2">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
