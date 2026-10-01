import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

/* One lightbox for every image in the section, with prev/next and arrow-key support. */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index];
  const multi = items.length > 1;

  const step = useCallback(
    (dir) => onIndex((index + dir + items.length) % items.length),
    [index, items.length, onIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (multi && e.key === 'ArrowRight') step(1);
      if (multi && e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [multi, onClose, step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <X size={18} />
      </button>

      <motion.img
        key={item.src}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease }}
        src={item.src}
        alt={item.caption}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] max-w-full w-auto object-contain rounded-lg"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-4 w-full max-w-3xl flex items-center justify-between gap-4 text-sm text-white/70"
      >
        <p className="min-w-0">{item.caption}</p>
        <div className="flex items-center gap-1 shrink-0">
          {multi && (
            <>
              <span className="text-white/40 mr-2 tabular-nums">
                {index + 1} / {items.length}
              </span>
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="w-11 h-11 rounded-full hover:bg-white/[0.1] flex items-center justify-center cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="w-11 h-11 rounded-full hover:bg-white/[0.1] flex items-center justify-center cursor-pointer">
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <a href={item.src} target="_blank" rel="noreferrer" aria-label="Open full resolution" className="w-11 h-11 rounded-full hover:bg-white/[0.1] flex items-center justify-center">
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
