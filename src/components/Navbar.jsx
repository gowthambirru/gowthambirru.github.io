import React from 'react';

export default function Navbar({ onCopyDiscord }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex items-center justify-between pointer-events-none">
      
      {/* Left: 32px rounded square logo + hidden-on-mobile link list */}
      <div className="flex items-center gap-8 pointer-events-auto">
        <a 
          href="#"
          className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 flex items-center justify-center hover:scale-105 transition-transform bg-[#111111]"
          title="Gowtham Portfolio"
        >
          <img 
            src={`${import.meta.env.BASE_URL}favicon.jpg`} 
            alt="Gowtham" 
            className="w-full h-full object-cover"
          />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#888888]">
          <a href="#work" className="hover:text-white transition-colors duration-300">
            /work
          </a>
          <a href="#experience" className="hover:text-white transition-colors duration-300">
            /experience
          </a>
          <a href="#contact" className="hover:text-white transition-colors duration-300">
            /contact
          </a>
        </nav>
      </div>

      {/* Right: Text link + button styled with #333333 border, #1A1A1A background, inverts on hover */}
      <div className="flex items-center gap-6 pointer-events-auto">
        <span className="hidden sm:inline text-xs font-mono text-[#888888] tracking-wider uppercase">
          AVAILABILITY: Q3/Q4 OPEN
        </span>

        <button
          onClick={onCopyDiscord}
          className="px-4 py-2 rounded-lg border border-[#333333] bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300 tracking-tight"
        >
          DISCORD: gowtham.xd
        </button>
      </div>

    </header>
  );
}
