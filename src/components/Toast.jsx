import React from 'react';
import { Check, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111111] shadow-2xl border border-[#333333] text-sm select-none">
      <div className="w-7 h-7 rounded-md bg-[#FF6B50] text-black flex items-center justify-center font-bold">
        <Check className="w-4 h-4" />
      </div>
      <div>
        <p className="font-semibold text-[#EBEBEB] text-xs">{toast.title}</p>
        <p className="text-[11px] text-[#888888] font-mono">{toast.message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-2 text-[#666666] hover:text-white transition-colors p-1"
        aria-label="Close"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
