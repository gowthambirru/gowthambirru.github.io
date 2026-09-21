import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, ExternalLink, RotateCcw } from 'lucide-react';

export default function VideoPlayerModal({ project, allProjects, onClose, onSelectProject, onCopyNotification }) {
  const [showPreviewLimit, setShowPreviewLimit] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isIframeMounted, setIsIframeMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setShowPreviewLimit(false);
    setIsVideoLoaded(false);
    setSecondsRemaining(60);
    setIsIframeMounted(true);

    let interval;
    if (project?.isLongForm && isVideoLoaded) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowPreviewLimit(true);
            setIsIframeMounted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [project, isVideoLoaded]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
    onSelectProject(allProjects[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allProjects.length;
    onSelectProject(allProjects[nextIndex]);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onCopyNotification("Project Link Copied", `Copied link to ${project.title}`);
    }
  };

  const handleReplay = () => {
    setShowPreviewLimit(false);
    setIsVideoLoaded(false);
    setSecondsRemaining(60);
    setIsIframeMounted(false);
    setTimeout(() => setIsIframeMounted(true), 100);
  };

  const isVertical = project.aspectRatio === '9:16';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-md">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] bg-[#0C0C0C] rounded-2xl overflow-hidden shadow-2xl border border-[#222222] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#050505]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6B50]" />
            <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
              IN-PAGE THEATER // {project.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-[#222222] bg-[#111111] hover:bg-white hover:text-black text-[#888888] transition-colors duration-300 text-xs flex items-center gap-1 font-mono"
              title="Copy link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">SHARE</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[#222222] bg-[#111111] hover:bg-[#FF6B50] hover:text-black text-[#888888] transition-colors duration-300"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Video Player + Details Sidebar */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-black">
          
          {/* Video Player Column */}
          <div className={`lg:col-span-8 flex items-center justify-center p-4 sm:p-6 bg-black relative min-h-[340px] ${isVertical ? 'lg:col-span-7' : ''}`}>
            
            <div className={`relative w-full ${isVertical ? 'max-w-[340px] aspect-[9/16]' : 'aspect-video'}`}>
              
              {/* 1-Minute Preview Limit Lock Screen (Iframe Unmounted) */}
              {showPreviewLimit && project.isLongForm ? (
                <div className="w-full h-full bg-[#0C0C0C] rounded-lg border border-[#222222] flex flex-col items-center justify-center p-6 text-center space-y-4 z-30 animate-in fade-in duration-300">
                  <span className="text-xs font-mono text-[#FF6B50] uppercase tracking-widest">
                    // WATCH FULL VIDEO
                  </span>
                  <p className="text-sm text-white font-medium max-w-sm leading-relaxed">
                    Watch the remaining video on Google Drive to view the complete cut of "{project.title}".
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-sm">
                    <a
                      href={project.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-lg bg-[#FF6B50] hover:bg-[#ff5537] text-black font-extrabold text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <span>WATCH REMAINING ON GOOGLE DRIVE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={handleReplay}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#1A1A1A] hover:bg-white hover:text-black text-xs font-mono text-[#888888] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>REPLAY</span>
                    </button>
                  </div>
                </div>
              ) : isIframeMounted ? (
                <>
                  <iframe
                    key={project.id}
                    src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                    allow="autoplay; fullscreen"
                    onLoad={() => setIsVideoLoaded(true)}
                    className="w-full h-full border-0 rounded-lg shadow-2xl"
                    title={project.title}
                  />
                </>
              ) : null}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111111]/80 hover:bg-white hover:text-black border border-[#333333] text-white flex items-center justify-center transition-all duration-300 shadow-lg z-20"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111111]/80 hover:bg-white hover:text-black border border-[#333333] text-white flex items-center justify-center transition-all duration-300 shadow-lg z-20"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          {/* Details Sidebar */}
          <div className={`lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#0C0C0C] border-t lg:border-t-0 lg:border-l border-[#222222] space-y-6 ${isVertical ? 'lg:col-span-5' : ''}`}>
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between text-xs font-mono text-[#888888] uppercase tracking-wider">
                <span>{project.categoryLabel}</span>
                <span>{project.duration}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#EBEBEB] tracking-tightest leading-tight">
                {project.title}
              </h2>

              <p className="text-sm text-[#888888] leading-relaxed">
                {project.description}
              </p>

              {/* Long-form Google Drive CTA Button */}
              {project.isLongForm && (
                <div className="p-4 rounded-xl bg-[#141414] border border-[#222222] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#FF6B50] font-semibold">MASTER CUT</span>
                    <span className="text-[#888888] font-mono text-[11px]">GOOGLE DRIVE</span>
                  </div>
                  <p className="text-xs text-[#888888]">
                    To watch the complete high-bitrate master cut of this project, open it on Google Drive:
                  </p>
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#FF6B50] hover:bg-[#ff5537] text-black font-extrabold text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>OPEN FULL CUT ON DRIVE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Tools & Techniques */}
              <div className="pt-4 border-t border-[#222222] space-y-3">
                <div>
                  <span className="text-xs font-mono text-[#666666] uppercase tracking-wider">Software:</span>
                  <p className="text-sm text-[#EBEBEB] font-medium mt-0.5">
                    {project.tools.join(" • ")}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono text-[#666666] uppercase tracking-wider">Techniques:</span>
                  <p className="text-xs text-[#888888] font-mono mt-0.5">
                    {project.techniques.join(" / ")}
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Navigation */}
            <div className="pt-6 border-t border-[#222222] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#666666]">
                <span>PROJECT {currentIndex + 1} OF {allProjects.length}</span>
                <a 
                  href={project.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6B50] hover:underline flex items-center gap-1"
                >
                  <span>Drive Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePrev}
                  className="py-2.5 px-4 rounded-lg bg-[#141414] hover:bg-white hover:text-black text-xs text-[#888888] border border-[#222222] font-mono transition-colors duration-300"
                >
                  PREVIOUS
                </button>
                <button
                  onClick={handleNext}
                  className="py-2.5 px-4 rounded-lg bg-[#FF6B50] hover:bg-[#ff5537] text-xs text-black font-extrabold font-mono transition-colors duration-300"
                >
                  NEXT VIDEO
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
