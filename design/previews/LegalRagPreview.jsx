import React from 'react';
import { motion } from 'framer-motion';
import { Search, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import Frame, { ScaledStage, CoverStage } from './Frame';

const ease = [0.22, 1, 0.36, 1];
const QUERY = 'Berapa uang pesangon jika di-PHK karena efisiensi?';

const PIPELINE = [
  { label: 'HyDE', sub: 'draft statute excerpt' },
  { label: 'BM25 0.4 + FAISS 0.6', sub: 'parent-child retrieval' },
  { label: 'Cross-encoder', sub: 'rerank candidates' },
  { label: 'Gate 0.3', sub: 'else live web search' },
];

const RESULTS = [
  {
    cite: 'UU Ketenagakerjaan · Pasal 156',
    parent: 'Bagian: Pemutusan Hubungan Kerja',
    title: 'Uang pesangon dan penghargaan masa kerja',
    excerpt: 'Dalam hal terjadi pemutusan hubungan kerja, pengusaha diwajibkan membayar uang pesangon dan/atau uang penghargaan masa kerja…',
    bm25: 0.88,
    faiss: 0.93,
    rerank: 0.94,
  },
  {
    cite: 'UU Ketenagakerjaan · Pasal 164',
    parent: 'Bagian: Pemutusan Hubungan Kerja',
    title: 'PHK karena perusahaan melakukan efisiensi',
    excerpt: 'Pengusaha dapat melakukan pemutusan hubungan kerja terhadap pekerja karena perusahaan tutup atau melakukan efisiensi…',
    bm25: 0.71,
    faiss: 0.9,
    rerank: 0.88,
  },
  {
    cite: 'Peraturan turunan · ketentuan pelaksana',
    parent: 'Bagian: Ketentuan pelaksana',
    title: 'Perhitungan masa kerja',
    excerpt: 'Masa kerja dihitung sejak pekerja mulai bekerja sampai dengan terjadinya pemutusan hubungan kerja…',
    bm25: 0.52,
    faiss: 0.78,
    rerank: 0.71,
  },
];

function Bar({ label, value, accent }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 text-[9px] text-white/40">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div className={`h-full rounded-full ${accent ? 'bg-[#FF5A36]' : 'bg-white/55'}`} initial={{ width: 0 }} animate={{ width: `${value * 100}%` }} transition={{ duration: 1.1, delay: 0.3, ease }} />
      </div>
      <span className="w-8 text-right text-[9px] text-white/45 tabular-nums">{value.toFixed(2)}</span>
    </div>
  );
}

function SearchBar({ size = 'md' }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border border-white/[0.14] bg-white/[0.04] ${size === 'md' ? 'px-4 py-3' : 'px-3 py-2.5'}`}>
      <Search size={size === 'md' ? 16 : 14} className="text-[#FF5A36] shrink-0" />
      <motion.span
        className="text-white overflow-hidden whitespace-nowrap"
        style={{ fontSize: size === 'md' ? 13 : 11 }}
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        {QUERY}
      </motion.span>
      <motion.span className="w-px h-4 bg-white/70" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
    </div>
  );
}

function SearchView() {
  return (
    <div className="h-full p-6 text-white flex flex-col gap-4">
      <SearchBar />
      <div className="grid grid-cols-4 gap-2">
        {PIPELINE.map((p, i) => (
          <motion.div key={p.label} className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.12, ease }}>
            <p className="text-[10px] font-semibold">{p.label}</p>
            <p className="text-[9px] text-white/40 mt-0.5">{p.sub}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
        {RESULTS.map((r, i) => (
          <motion.div key={r.cite} className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 flex flex-col" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.12, ease }}>
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-[#FF5A36] font-semibold">{r.cite}</p>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF5A36]/15 text-[#FF5A36] tabular-nums">{r.rerank.toFixed(2)}</span>
            </div>
            <p className="text-[14px] font-semibold mt-3 leading-snug">{r.title}</p>
            <p className="text-[11.5px] text-white/60 mt-3 leading-relaxed">{r.excerpt}</p>
            <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
              <p className="text-[9px] text-white/35">Parent chunk</p>
              <p className="text-[10.5px] text-white/70 mt-0.5">{r.parent}</p>
            </div>
            <div className="mt-auto pt-3 space-y-1.5">
              <Bar label="BM25" value={r.bm25} />
              <Bar label="FAISS" value={r.faiss} />
              <Bar label="Rerank" value={r.rerank} accent />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnswerView() {
  return (
    <div className="h-full p-6 text-white grid grid-cols-12 gap-5">
      <div className="col-span-7 flex flex-col gap-4">
        <SearchBar size="sm" />
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-5 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-white/60 mb-3">
            <Sparkles size={13} className="text-[#FF5A36]" /> Answer, built only from retrieved articles
          </div>
          <p className="text-[12.5px] leading-relaxed text-white/85">
            Pekerja yang di-PHK karena perusahaan melakukan efisiensi berhak atas uang pesangon dan uang penghargaan masa kerja
            <sup className="text-[#FF5A36] font-bold ml-0.5">[1]</sup>. Dasar PHK karena efisiensi diatur secara khusus
            <sup className="text-[#FF5A36] font-bold ml-0.5">[2]</sup>.
          </p>
          <p className="text-[10px] text-white/40 mt-4">Sample text for illustration. Every claim must point to a retrieved article, or the answer is withheld.</p>
          <div className="mt-5 flex gap-2 flex-wrap">
            {['[1] Pasal 156', '[2] Pasal 164'].map((c) => (
              <span key={c} className="text-[10px] px-2.5 py-1 rounded-md border border-[#FF5A36]/40 text-[#FF5A36]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-5 flex flex-col gap-4">
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-[11px] text-white/60">
            <Scale size={13} className="text-[#FF5A36]" /> Source · Pasal 156
          </div>
          <p className="text-[11px] text-white/70 leading-relaxed mt-2">
            Dalam hal terjadi pemutusan hubungan kerja, pengusaha diwajibkan membayar uang pesangon dan/atau uang penghargaan masa kerja…
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-[11px] text-white/60 mb-3">
            <ShieldCheck size={13} className="text-[#FF5A36]" /> Confidence gate
          </div>
          <div className="relative h-2 rounded-full bg-white/[0.08]">
            <motion.div className="h-full rounded-full bg-[#FF5A36]" initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1.4, ease }} />
            <span className="absolute -top-1 h-4 w-px bg-white/70" style={{ left: '30%' }} />
          </div>
          <div className="flex justify-between text-[9px] text-white/40 mt-2">
            <span>gate 0.30</span>
            <span className="text-white/70">rerank 0.94</span>
          </div>
          <p className="text-[10px] text-white/45 mt-3">Above the gate, so no web fallback was needed.</p>
        </div>
      </div>
    </div>
  );
}

/* Portrait art for the project card (key content in the upper-middle; the title covers the bottom). */
export function LegalRagPoster() {
  return (
    <CoverStage w={410} h={540}>
      <div className="relative w-[410px] h-[540px] bg-[#07080D] text-white overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[360px] rounded-full bg-[#FF5A36]/18 blur-[100px]" />
        <div className="absolute inset-x-5 top-[78px] space-y-3">
          <SearchBar size="sm" />
          {RESULTS.slice(0, 2).map((r, i) => (
            <motion.div key={r.cite} className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15, ease }}>
              <div className="flex items-center justify-between">
                <p className="text-[9px] text-[#FF5A36] font-semibold">{r.cite}</p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF5A36]/15 text-[#FF5A36] tabular-nums">{r.rerank.toFixed(2)}</span>
              </div>
              <p className="text-[11px] font-semibold mt-1.5 leading-snug">{r.title}</p>
              <div className="mt-2.5 space-y-1">
                <Bar label="BM25" value={r.bm25} />
                <Bar label="FAISS" value={r.faiss} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CoverStage>
  );
}

export const LEGAL_RAG_VIEWS = [
  { id: 'search', label: 'Hybrid search', caption: 'Concept: one query, keyword and vector scores side by side, then reranked' },
  { id: 'answer', label: 'Cited answer', caption: 'Concept: an answer tied to exact articles, with the confidence gate visible' },
];

export default function LegalRagPreview({ view = 'search' }) {
  return (
    <ScaledStage>
      <Frame title="indonesian-legal-rag · hybrid retrieval">{view === 'answer' ? <AnswerView /> : <SearchView />}</Frame>
    </ScaledStage>
  );
}
