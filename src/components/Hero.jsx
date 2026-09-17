import React from 'react';
import { ArrowDownRight } from 'lucide-react';

export default function Hero({ onCopyEmail }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 max-w-7xl mx-auto">
      
      {/* Top minimal tag */}
      <div className="flex items-center justify-between text-xs font-mono text-[#888888] tracking-wider uppercase pt-4">
        <span>GOWTHAM // VIDEO EDITOR</span>
        <span>OREGAIRU EDITS • AMVs • REELS</span>
      </div>

      {/* Massive Editorial Headline */}
      <div className="my-auto py-12 select-none">
        <h1 className="text-[13vw] font-black tracking-tightest leading-hero text-[#EBEBEB] uppercase">
          /EDITS.
        </h1>
        <p className="text-xl md:text-2xl text-[#888888] tracking-tight max-w-3xl mt-2 font-normal">
          5 years refining narrative timing, velocity sync, and cinematic pacing across <span className="text-white">After Effects</span>, <span className="text-white">Premiere Pro</span>, and <span className="text-white">CapCut PC</span>.
        </p>
      </div>

      {/* Bottom Section: Social Proof Stack (Left) & Email Link (Right) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8 border-t border-[#1A1A1A]">
        
        {/* Bottom Left: Social proof stack with 3 grayscale overlapping avatars */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            <img
              src={`${import.meta.env.BASE_URL}images/yukino.jpg`}
              alt="Yukino Yukinoshita"
              className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              title="Yukino Yukinoshita"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/yui.jpg`}
              alt="Yui Yuigahama"
              className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              title="Yui Yuigahama"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/hachiman.jpg`}
              alt="Hachiman Hikigaya"
              className="w-10 h-10 rounded-full border-2 border-[#050505] object-cover grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              title="Hachiman Hikigaya"
            />
          </div>

          <div className="text-xs text-[#888888] space-y-0.5 font-normal">
            <p className="text-white font-medium">5 Years Experience</p>
            <p>After Effects • Premiere Pro • CapCut PC</p>
          </div>
        </div>

        {/* Bottom Right: Single email link with persistent bottom border changing to #FF6B50 on hover */}
        <div>
          <button
            onClick={onCopyEmail}
            className="group flex items-center gap-2 text-sm text-[#EBEBEB] pb-1 border-b border-[#333333] hover:border-[#FF6B50] hover:text-[#FF6B50] transition-colors duration-300 font-mono"
            title="Click to copy email"
          >
            <span>gowthamcrontech@gmail.com</span>
            <ArrowDownRight className="w-4 h-4 text-[#888888] group-hover:text-[#FF6B50] transition-colors duration-300" />
          </button>
        </div>

      </div>

    </section>
  );
}
