import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function ShimmerButton({
  label,
  onClick,
  icon = <ArrowUpRight size={14} />,
  variant = 'accent',
  className = '',
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-mono-dm text-[11px] uppercase tracking-widest font-medium overflow-hidden group cursor-pointer shadow-lg ${className}`}
      style={{
        background: variant === 'accent'
          ? 'linear-gradient(135deg, rgba(255,90,54,1) 0%, rgba(255,120,80,1) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        color: variant === 'accent' ? '#050505' : '#FFFFFF',
        boxShadow: variant === 'accent'
          ? '0 0 25px rgba(255, 90, 54, 0.35)'
          : '0 0 15px rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Shimmer sweep effect */}
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Button Label */}
      <span className="relative z-10 font-bold tracking-widest">{label}</span>

      {/* Icon */}
      {icon && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
