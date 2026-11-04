import React from 'react';
import IsoObject from './iso/IsoObject';

/* Isometric line-art scenes that sit behind the content of a dark stage. The objects drift slowly (CSS only) and are
   dimmed so text on top stays easy to read. Fewer objects show on small screens. */
const SCENES = {
  hero: [
    { kind: 'system', cls: 'right-[-18%] md:right-[2%] top-[42%] md:top-[12%] w-[300px] md:w-[520px] opacity-35 md:opacity-95' },
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
