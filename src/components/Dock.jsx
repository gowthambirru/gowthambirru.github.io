import React from 'react';
import { Home, Film, MessageSquare, Mail, Sparkles } from 'lucide-react';

export default function Dock({ onCopyDiscord, onCopyEmail, onScrollToWork }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="editorial-dock px-3 py-2 flex items-center shadow-2xl">
        
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="p-3 text-[#888888] hover:text-white hover:bg-[#222222] rounded-lg transition-all duration-300"
          title="Top"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-[#333333] mx-1" />

        {/* Work / Videos */}
        <button
          onClick={onScrollToWork}
          className="p-3 text-[#888888] hover:text-white hover:bg-[#222222] rounded-lg transition-all duration-300"
          title="Watch Videos"
        >
          <Film className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-[#333333] mx-1" />

        {/* Copy Discord */}
        <button
          onClick={onCopyDiscord}
          className="p-3 text-[#888888] hover:text-white hover:bg-[#222222] rounded-lg transition-all duration-300 flex items-center gap-2"
          title="Copy Discord: gowtham.xd"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-mono font-medium">gowtham.xd</span>
        </button>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-[#333333] mx-1" />

        {/* Copy Email */}
        <button
          onClick={onCopyEmail}
          className="p-3 text-[#888888] hover:text-white hover:bg-[#222222] rounded-lg transition-all duration-300"
          title="Copy Email: gowthamcrontech@gmail.com"
        >
          <Mail className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-[#333333] mx-1" />

        {/* Primary CTA button in #FF6B50 with black bold text (uppercase, tracking-wide) */}
        <a
          href="#contact"
          className="ml-1 px-5 py-2.5 rounded-lg bg-[#FF6B50] hover:bg-[#ff5537] text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-lg active:scale-95"
        >
          <span>COMMISSION</span>
        </a>

      </div>
    </div>
  );
}
