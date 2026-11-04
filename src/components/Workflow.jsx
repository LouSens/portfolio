import React from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';

/* How a project works, drawn the way it actually runs: one or more inputs flow into the shared steps in the middle, and
   those flow out to one or more outputs. Nothing here assumes a single straight line from start to end. */

const Node = ({ label, note, tone = 'io' }) => (
  <div className={`rounded-xl border px-4 py-3 ${tone === 'step' ? 'border-accent/35 bg-accent/[0.06]' : 'border-white/[0.14] bg-white/[0.03]'}`}>
    <p className="font-display font-semibold text-[15px] text-white leading-snug">{label}</p>
    {note && <p className="mt-1 text-xs text-white/55 leading-snug">{note}</p>}
  </div>
);

/* Curves from each of n points on one side to a single point on the other (or the reverse) */
function Fan({ n, reverse = false }) {
  const ys = Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * 100);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden md:block w-full h-full" aria-hidden="true">
      {ys.map((y, i) => {
        const d = reverse ? `M0 50 C 55 50, 45 ${y}, 100 ${y}` : `M0 ${y} C 55 ${y}, 45 50, 100 50`;
        return <path key={i} d={d} fill="none" stroke="rgb(var(--accent-rgb) / 0.55)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}

const Down = () => (
  <div className="flex justify-center py-1 text-white/30 md:hidden" aria-hidden="true">
    <ArrowDown size={16} />
  </div>
);

export default function Workflow({ workflow }) {
  const { inputs = [], steps = [], outputs = [], loop } = workflow;
  return (
    <div>
      <div className="grid md:grid-cols-[1fr_52px_1.15fr_52px_1fr] items-stretch">
        <div className="flex flex-col justify-center gap-3">
          <p className="text-[11px] tracking-wide text-white/40 uppercase">{inputs.length > 1 ? 'Inputs' : 'Input'}</p>
          {inputs.map((n) => <Node key={n.label} {...n} />)}
        </div>
        <Down />
        <Fan n={inputs.length} />
        <div className="flex flex-col justify-center gap-1">
          <p className="text-[11px] tracking-wide text-white/40 uppercase mb-2">What it does</p>
          {steps.map((n, i) => (
            <React.Fragment key={n.label}>
              {i > 0 && <div className="flex justify-center py-1 text-accent/70" aria-hidden="true"><ArrowDown size={14} /></div>}
              <Node {...n} tone="step" />
            </React.Fragment>
          ))}
        </div>
        <Down />
        <Fan n={outputs.length} reverse />
        <div className="flex flex-col justify-center gap-3">
          <p className="text-[11px] tracking-wide text-white/40 uppercase">{outputs.length > 1 ? 'Outputs' : 'Output'}</p>
          {outputs.map((n) => <Node key={n.label} {...n} />)}
        </div>
      </div>
      {loop && (
        <p className="mt-5 flex items-start gap-2.5 text-sm text-white/60">
          <RotateCcw size={15} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
          {loop}
        </p>
      )}
    </div>
  );
}
