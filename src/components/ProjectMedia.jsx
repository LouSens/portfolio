import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { small } from '../utils/img';
import CoverArt from './CoverArt';

/* A project's demo (silent, looping) or its cover, shown whole: nothing is cropped. The video downloads only when it is
   near and plays only while it is in view. */
export default function ProjectMedia({ project, className = '', eager = false, still = false }) {
  const ref = useRef(null);
  const video = useRef(null);
  const near = useInView(ref, { once: true, margin: '400px 400px 400px 400px' });
  const playing = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  return (
    <div ref={ref} className={`relative aspect-video overflow-hidden bg-white/[0.04] ${className}`}>
      {project.coverArt ? (
        <CoverArt kind={project.coverArt} />
      ) : project.walkthrough && !still ? (
        <video
          ref={video}
          src={near ? project.walkthrough.src : undefined}
          poster={project.walkthrough.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${project.title} demo, silent`}
          className="absolute inset-0 w-full h-full object-contain"
        />
      ) : (
        <img
          src={still && project.walkthrough?.poster ? project.walkthrough.poster : small(project.coverImage)}
          alt=""
          loading={eager ? undefined : 'lazy'}
          decoding="async"
          style={project.coverZoom ? { transform: `scale(${project.coverZoom})`, transformOrigin: 'center 40%' } : undefined}
          className={`absolute inset-0 w-full h-full ${project.coverFit === 'cover' ? 'object-cover' : 'object-contain'}`}
        />
      )}
    </div>
  );
}
