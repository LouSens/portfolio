import React from 'react';
import IsoObject from './iso/IsoObject';

/* Isometric line-art scenes that sit behind the content of a dark stage. The objects drift slowly (CSS only) and are
   dimmed so text on top stays easy to read. Fewer objects show on small screens. */
const SCENES = {
  hero: [
    { kind: 'database', cls: 'left-[-9%] top-[-8%] w-[300px] md:w-[360px] opacity-30' },
    { kind: 'cluster', cls: 'left-[34%] top-[-4%] w-[220px] hidden md:block' },
    { kind: 'layers', cls: 'right-[-12%] md:right-[4%] top-[48%] md:top-[18%] w-[260px] md:w-[400px] opacity-35 md:opacity-90' },
    { kind: 'books', cls: 'left-[-6%] bottom-[-12%] w-[280px] hidden md:block opacity-30' },
  ],
  contact: [
    { kind: 'envelope', cls: 'right-[-8%] top-[-10%] w-[260px] md:w-[320px] opacity-30' },
    { kind: 'cluster', cls: 'left-[-5%] bottom-[-10%] w-[220px] hidden md:block opacity-25' },
  ],
};

export default function StageArt({ scene = 'hero' }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 stage-glow" />
      {(SCENES[scene] || []).map((o, i) => (
        <IsoObject key={i} kind={o.kind} className={`absolute h-auto ${o.cls.includes('opacity') ? '' : 'opacity-60'} ${o.cls}`} />
      ))}
    </div>
  );
}
