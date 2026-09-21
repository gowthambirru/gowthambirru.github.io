import React from 'react';
import { MessageSquare, Mail, ArrowUp, Film, Check, Copy } from 'lucide-react';

export default function ImpactFooter({ 
  onCopyDiscord, 
  onCopyEmail, 
  discordCopied, 
  emailCopied 
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-32 px-6 max-w-7xl mx-auto border-t border-[#222222]">
      
      {/* Editorial Headline */}
      <div className="select-none mb-8">
        <p className="text-xs font-mono text-[#888888] tracking-widest uppercase mb-3">
          // INQUIRIES & COMMISSIONS
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#EBEBEB] uppercase">
          CRAFT MORE.
        </h2>
      </div>

      {/* Footer Info Stack & 56px Circular Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pt-8 border-t border-[#222222]">
        
        {/* Vertical Stack for Contact Info */}
        <div className="space-y-4 max-w-lg">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">Discord Handle</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight font-mono">
                gowtham.xd
              </span>
              <button
                onClick={onCopyDiscord}
                className="text-xs px-3 py-1 rounded bg-[#1A1A1A] border border-[#333333] hover:border-white text-[#888888] hover:text-white transition-colors duration-300 font-mono"
              >
                {discordCopied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">Direct Email</span>
            <div className="flex items-center gap-3">
              <a 
                href="mailto:gowthamcrontech@gmail.com"
                className="text-lg md:text-xl font-medium text-[#888888] hover:text-[#FF6B50] transition-colors duration-300 font-mono"
              >
                gowthamcrontech@gmail.com
              </a>
              <button
                onClick={onCopyEmail}
                className="text-xs px-3 py-1 rounded bg-[#1A1A1A] border border-[#333333] hover:border-white text-[#888888] hover:text-white transition-colors duration-300 font-mono"
              >
                {emailCopied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <p className="text-xs text-[#666666] pt-2">
            Experienced Freelance Video Editor • After Effects, Premiere Pro, CapCut PC.
          </p>
        </div>

        {/* Horizontal Row of 56px Circular Social Icons with 1px border (#333333) that lift -translate-y-2 on hover */}
        <div className="flex items-center gap-4">
          
          {/* Discord 56px button */}
          <button
            onClick={onCopyDiscord}
            className="w-14 h-14 rounded-full border border-[#333333] bg-[#111111] text-[#888888] hover:text-black hover:bg-white hover:border-white flex items-center justify-center transition-all duration-300 hover:-translate-y-2 shadow-lg"
            title="Copy Discord: gowtham.xd"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Email 56px button */}
          <button
            onClick={onCopyEmail}
            className="w-14 h-14 rounded-full border border-[#333333] bg-[#111111] text-[#888888] hover:text-black hover:bg-white hover:border-white flex items-center justify-center transition-all duration-300 hover:-translate-y-2 shadow-lg"
            title="Copy Email: gowthamcrontech@gmail.com"
          >
            <Mail className="w-5 h-5" />
          </button>

          {/* Work Anchor 56px button */}
          <a
            href="#work"
            className="w-14 h-14 rounded-full border border-[#333333] bg-[#111111] text-[#888888] hover:text-black hover:bg-white hover:border-white flex items-center justify-center transition-all duration-300 hover:-translate-y-2 shadow-lg"
            title="Watch Videos"
          >
            <Film className="w-5 h-5" />
          </a>

          {/* Scroll to Top 56px button */}
          <button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full border border-[#333333] bg-[#111111] text-[#888888] hover:text-black hover:bg-white hover:border-white flex items-center justify-center transition-all duration-300 hover:-translate-y-2 shadow-lg"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>

        </div>

      </div>

      {/* Copyright */}
      <div className="pt-12 text-xs font-mono text-[#555555] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} GOWTHAM. ALL RIGHTS RESERVED.</span>
        <span>PORTFOLIO EDITORIAL EDITION • 「本物が欲しい」</span>
      </div>

    </footer>
  );
}
