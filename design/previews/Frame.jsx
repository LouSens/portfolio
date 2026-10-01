import React, { useEffect, useRef, useState } from 'react';

/* Scales a fixed-size design (default 960x600) to whatever width it is given, so a concept
   preview looks identical on a phone instead of reflowing. */
export function ScaledStage({ w = 960, h = 600, children }) {
  const wrap = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / w);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={wrap} className="w-full" style={{ height: h * scale }}>
      <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}

/* Fills its parent and scales a fixed-size design to cover it (used for card posters). */
export function CoverStage({ w, h, children }) {
  const wrap = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => setScale(Math.max(el.clientWidth / w, el.clientHeight / h));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}

export default function Frame({ title, children }) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-white/[0.14] bg-[#07080D] flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
      <div className="h-9 shrink-0 flex items-center gap-2 px-4 border-b border-white/[0.08] bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-[11px] text-white/45 font-mono truncate">{title}</span>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
