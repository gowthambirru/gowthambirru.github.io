import React from 'react';

export default function BentoSkills() {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      
      {/* Full-Width Editorial Experience Card */}
      <div className="bg-[#111111] rounded-[2.5rem] p-8 md:p-14 border border-[#222222] space-y-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222]">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
              // DISCIPLINE & TOOLING
            </span>

            <div className="space-y-1">
              <h2 className="text-6xl md:text-8xl font-black tracking-tightest text-[#EBEBEB] leading-none">
                EXPERIENCED.
              </h2>
              <p className="text-xl md:text-2xl text-[#888888] tracking-tight font-medium">
                Frame-accurate video editing.
              </p>
            </div>

            <p className="text-sm text-[#888888] leading-relaxed">
              Devoted to the craft of video editing. Balancing aggressive velocity curves with cinematic narrative breathing room.
            </p>
          </div>

          <div className="text-xs font-mono text-[#888888] text-left md:text-right space-y-1">
            <p className="text-white font-bold">FREELANCE STATUS</p>
            <p>COMMISSIONS OPEN</p>
            <p className="text-[#FF6B50]">WORLDWIDE REMOTE</p>
          </div>
        </div>

        {/* 3-Column Editorial Grid for the Core Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3 p-6 rounded-2xl bg-[#0C0C0C] border border-[#1E1E1E]">
            <span className="text-xs font-mono text-[#FF6B50]">01 // MOTION & VFX</span>
            <h3 className="text-lg font-bold text-[#EBEBEB] tracking-tight">
              Adobe After Effects
            </h3>
            <p className="text-xs font-mono text-[#888888]">Advanced VFX & Motion</p>
            <p className="text-xs text-[#888888] leading-relaxed pt-2 border-t border-[#1A1A1A]">
              3D camera tracking, velocity curve remapping, kinetic typography, rotoscoping, and custom VFX.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#0C0C0C] border border-[#1E1E1E]">
            <span className="text-xs font-mono text-[#FF6B50]">02 // STORY & PACING</span>
            <h3 className="text-lg font-bold text-[#EBEBEB] tracking-tight">
              Adobe Premiere Pro
            </h3>
            <p className="text-xs font-mono text-[#888888]">Narrative & Long-Form NLE</p>
            <p className="text-xs text-[#888888] leading-relaxed pt-2 border-t border-[#1A1A1A]">
              Multi-cam narrative flow, multi-track foley & dialogue EQ, J/L-cut transitions, and Lumetri color grading.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#0C0C0C] border border-[#1E1E1E]">
            <span className="text-xs font-mono text-[#FF6B50]">03 // SHORT-FORM VIRAL</span>
            <h3 className="text-lg font-bold text-[#EBEBEB] tracking-tight">
              CapCut PC
            </h3>
            <p className="text-xs font-mono text-[#888888]">High-Retention Short-Form</p>
            <p className="text-xs text-[#888888] leading-relaxed pt-2 border-t border-[#1A1A1A]">
              High-retention 9:16 vertical reels, 3-second visual hooks, dynamic animated captions, and rapid turnaround.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
