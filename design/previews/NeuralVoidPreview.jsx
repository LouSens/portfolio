import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Frame, { ScaledStage, CoverStage } from './Frame';

const ease = [0.22, 1, 0.36, 1];

// Deterministic pseudo-random so the heatmap looks the same on every render.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const FEATURES = [
  { name: 'Late-night usage ratio', value: 0.86 },
  { name: 'Rapid app-switch rate', value: 0.71 },
  { name: 'Streak entropy', value: 0.52 },
  { name: 'Session velocity', value: 0.44 },
];
const MODELS = [
  { name: 'XGBoost', vote: 0.81 },
  { name: 'Random Forest', vote: 0.74 },
  { name: 'Logistic Regression', vote: 0.69 },
];

function Gauge({ value, size = 180 }) {
  const r = 70;
  const c = Math.PI * r;
  return (
    <svg viewBox="0 0 180 110" style={{ width: size }}>
      <path d="M 20 95 A 70 70 0 0 1 160 95" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
      <motion.path
        d="M 20 95 A 70 70 0 0 1 160 95"
        fill="none"
        stroke="#FF5A36"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 1.6, ease }}
      />
      <text x="90" y="82" textAnchor="middle" fill="white" fontSize="30" fontWeight="800">
        {Math.round(value * 100)}%
      </text>
      <text x="90" y="102" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
        binge probability
      </text>
    </svg>
  );
}

function Heatmap({ rows = 7, cell = 14 }) {
  const cells = useMemo(() => {
    const rnd = seeded(42);
    return Array.from({ length: rows }, () =>
      Array.from({ length: 24 }, (_, h) => {
        const night = h < 5 || h > 21 ? 0.55 : 0;
        const day = h > 11 && h < 20 ? 0.25 : 0;
        return Math.min(1, rnd() * 0.45 + night + day * rnd());
      })
    );
  }, [rows]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="space-y-[3px]">
      {cells.map((row, d) => (
        <div key={d} className="flex items-center gap-2">
          <span className="w-7 text-[9px] text-white/35">{days[d]}</span>
          <div className="flex-1 grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
            {row.map((v, h) => (
              <motion.span
                key={h}
                className="rounded-[2px]"
                style={{ height: cell, background: `rgba(255,90,54,${0.08 + v * 0.85})` }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (d * 24 + h) * 0.004, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="h-full p-5 grid grid-cols-12 gap-4 text-white">
      <div className="col-span-3 flex flex-col gap-4">
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-3 flex justify-center">
          <Gauge value={0.78} />
        </div>
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
          <p className="text-[10px] text-white/40">Features extracted</p>
          <p className="text-3xl font-extrabold leading-none mt-1">25</p>
          <p className="text-[10px] text-white/40 mt-2">from raw session logs</p>
        </div>
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 flex-1">
          <p className="text-[10px] text-white/40">Held-out accuracy</p>
          <p className="text-3xl font-extrabold leading-none mt-1 text-[#FF5A36]">~96%</p>
        </div>
      </div>

      <div className="col-span-6 flex flex-col gap-4">
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
          <p className="text-xs font-semibold mb-3">Session velocity by hour</p>
          <Heatmap />
          <div className="flex justify-between pl-9 text-[9px] text-white/30 pt-1">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:00</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 flex-1">
          <p className="text-xs font-semibold mb-3">Ensemble vote (soft voting)</p>
          <div className="grid grid-cols-3 gap-3">
            {MODELS.map((m) => (
              <div key={m.name}>
                <p className="text-[10px] text-white/50 mb-1.5">{m.name}</p>
                <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div className="h-full bg-white/60 rounded-full" initial={{ width: 0 }} animate={{ width: `${m.vote * 100}%` }} transition={{ duration: 1.2, delay: 0.4, ease }} />
                </div>
                <p className="text-[10px] text-white/40 mt-1 tabular-nums">{m.vote.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-3 rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 flex flex-col">
        <p className="text-xs font-semibold mb-4">What drove the score</p>
        <div className="space-y-4">
          {FEATURES.map((f, i) => (
            <div key={f.name}>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-white/65">{f.name}</span>
                <span className="text-white/40 tabular-nums">{f.value.toFixed(2)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <motion.div className="h-full rounded-full bg-[#FF5A36]" initial={{ width: 0 }} animate={{ width: `${f.value * 100}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/35 leading-relaxed mt-auto pt-5">
          Every feature is something a clinician can reason about and question. That was the point of hand-engineering them.
        </p>
      </div>
    </div>
  );
}

function Report() {
  const pts = [38, 44, 41, 52, 61, 58, 72, 69, 78, 74, 83, 88];
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${20 + i * 38} ${150 - p * 1.4}`).join(' ');
  return (
    <div className="h-full p-6 grid grid-cols-12 gap-5 text-white">
      <div className="col-span-7 rounded-xl border border-white/[0.1] bg-white/[0.03] p-5 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Automated diagnostic summary</p>
          <span className="text-[10px] text-white/40">Sample report</span>
        </div>
        <div className="mt-4 space-y-3 text-[12px] text-white/70 leading-relaxed">
          <p>
            Usage over the last 30 days shows a sustained rise in <span className="text-white">late-night sessions</span>, with the
            late-night ratio climbing from about a fifth of sessions to nearly a third.
          </p>
          <p>
            Rapid app-switching and falling streak entropy suggest sessions are becoming shorter and less purposeful, a pattern the
            model associates with compulsive checking.
          </p>
          <p className="text-white/45">Binge probability for the coming week is elevated. Suggested follow-up: review evening usage habits.</p>
        </div>
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center h-8 px-4 rounded-lg bg-[#FF5A36] text-[11px] font-bold">Generate full report</span>
        </div>
      </div>

      <div className="col-span-5 space-y-4">
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
          <p className="text-xs font-semibold mb-2">Binge probability, last 12 weeks</p>
          <svg viewBox="0 0 480 170" className="w-full">
            {[0, 1, 2, 3].map((g) => (
              <line key={g} x1="20" x2="470" y1={30 + g * 40} y2={30 + g * 40} stroke="rgba(255,255,255,0.06)" />
            ))}
            <motion.path d={path} fill="none" stroke="#FF5A36" strokeWidth="2.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease }} />
            {pts.map((p, i) => (
              <motion.circle key={i} cx={20 + i * 38} cy={150 - p * 1.4} r="3.5" fill="#FF5A36" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 * i + 0.4 }} />
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Late-night ratio', '31%'],
            ['Rapid-switch rate', '0.71'],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
              <p className="text-[10px] text-white/40">{l}</p>
              <p className="text-2xl font-extrabold mt-1">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Portrait art for the project card. Key content sits in the upper-middle, because the card's
   title and buttons cover the bottom. */
export function NeuralVoidPoster() {
  return (
    <CoverStage w={410} h={540}>
      <div className="relative w-[410px] h-[540px] bg-[#07080D] text-white overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#FF5A36]/20 blur-[90px]" />
        <div className="absolute inset-x-0 top-[78px] flex flex-col items-center">
          <Gauge value={0.78} size={260} />
        </div>
        <div className="absolute inset-x-6 top-[236px]">
          <Heatmap rows={4} cell={11} />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ['25', 'features'],
              ['~96%', 'accuracy'],
              ['3', 'model vote'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-lg border border-white/[0.1] bg-white/[0.04] py-2">
                <p className="text-lg font-extrabold leading-none">{v}</p>
                <p className="text-[9px] text-white/45 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CoverStage>
  );
}

export const NEURALVOID_VIEWS = [
  { id: 'dashboard', label: 'Dashboard', caption: 'Concept: session velocity, the features that drove the score, and the ensemble vote behind it' },
  { id: 'report', label: 'Clinical report', caption: 'Concept: the automatically written summary and the trend behind it' },
];

export default function NeuralVoidPreview({ view = 'dashboard' }) {
  return (
    <ScaledStage>
      <Frame title="neuralvoid · behavioral analytics">{view === 'report' ? <Report /> : <Dashboard />}</Frame>
    </ScaledStage>
  );
}
