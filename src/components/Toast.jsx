import React from 'react';
import { Check, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <aside 
      aria-live="polite"
      className="fixed bottom-28 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e0e0e]/95 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.9)] border border-surface-border text-sm select-none"
    >
      <div className="w-6 h-6 rounded-lg bg-accent text-black flex items-center justify-center font-bold">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-geom text-accent font-extrabold tracking-wider uppercase">
            [MARKER]
          </span>
          <p className="font-geom font-bold text-white text-xs">{toast.title}</p>
        </div>
        <p className="text-xs text-slate-300 font-geom font-semibold">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-3 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
