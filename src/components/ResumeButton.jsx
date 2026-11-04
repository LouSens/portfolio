import React, { useEffect, useRef, useState } from 'react';
import { Check, Download, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

/* Resume download with visible feedback: the button confirms the click, then says it is done. A browser cannot tell us
   when the file has landed, so the states are about the click, not the transfer. */
export default function ResumeButton({ variant = 'secondary', className = '', label = 'Resume' }) {
  const [state, setState] = useState('idle'); // idle | busy | done
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onClick = () => {
    timers.current.forEach(clearTimeout);
    setState('busy');
    timers.current = [setTimeout(() => setState('done'), 700), setTimeout(() => setState('idle'), 3200)];
  };

  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold text-sm transition-all duration-200 cursor-pointer select-none';
  const look =
    variant === 'primary'
      ? 'px-6 py-3 bg-accent text-white hover:brightness-110'
      : variant === 'compact'
        ? 'px-3.5 py-1.5 text-xs border border-white/[0.14] bg-white/[0.04] text-white/85 hover:text-white hover:border-white/[0.3] hover:bg-white/[0.08]'
        : 'px-6 py-3 border border-white/[0.18] bg-white/[0.04] text-white hover:border-white/[0.35] hover:bg-white/[0.08]';

  return (
    <a
      href={PERSONAL_INFO.resumeUrl}
      download="CV_David_Kurniawan.pdf"
      onClick={onClick}
      aria-live="polite"
      className={`${base} ${look} ${state === 'done' ? '!border-emerald-400/60 !text-emerald-300' : ''} ${className}`}
    >
      {state === 'idle' && <Download size={15} aria-hidden="true" />}
      {state === 'busy' && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
      {state === 'done' && <Check size={15} aria-hidden="true" />}
      <span>{state === 'idle' ? label : state === 'busy' ? 'Preparing…' : 'Downloaded'}</span>
    </a>
  );
}
