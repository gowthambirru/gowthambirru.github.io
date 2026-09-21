import React, { useState, useEffect } from 'react';
import { Play, Maximize2, ExternalLink, RotateCcw, Clock } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';

function StaggeredProjectCard({ project, onOpenModal }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isLocked, setIsLocked] = useState(false);

  const isVertical = project.aspectRatio === '9:16';

  useEffect(() => {
    let interval;
    if (isPlayingInline && isVideoLoaded && project.isLongForm && !isLocked) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsLocked(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingInline, isVideoLoaded, project, isLocked]);

  const handleStartPlay = (e) => {
    e.stopPropagation();
    setIsLocked(false);
    setIsVideoLoaded(false);
    setSecondsRemaining(60);
    setIsPlayingInline(true);
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    setIsLocked(false);
    setIsVideoLoaded(false);
    setSecondsRemaining(60);
    // Refresh iframe
    setIsPlayingInline(false);
    setTimeout(() => setIsPlayingInline(true), 100);
  };

  return (
    <div className={`group space-y-4 ${isVertical ? 'max-w-sm mx-auto' : 'w-full'}`}>
      
      {/* Aspect Ratio Container (16:9 for widescreen, 9:16 for vertical shorts!) */}
      <div 
        className={`relative rounded-2xl overflow-hidden bg-[#111111] border border-[#222222] select-none ${
          isVertical ? 'aspect-[9/16]' : 'aspect-video'
        }`}
      >
        {isPlayingInline ? (
          <div className="relative w-full h-full bg-black">
            
            {/* If long-form reaches 60s of loaded playback, unmount player and lock */}
            {isLocked && project.isLongForm ? (
              <div className="absolute inset-0 bg-[#0C0C0C] flex flex-col items-center justify-center p-6 text-center space-y-4 z-30 animate-in fade-in duration-300">
                <span className="text-xs font-mono text-[#FF6B50] uppercase tracking-widest">
                  // WATCH FULL VIDEO
                </span>
                <p className="text-sm text-white font-medium max-w-xs leading-relaxed">
                  Watch the remaining video on Google Drive to view the complete cut of "{project.title}".
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-xs">
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#FF6B50] hover:bg-[#ff5537] text-black font-extrabold text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <span>WATCH REMAINING ON DRIVE</span>
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
            ) : (
              <>
                {/* Active Google Drive Stream Player Iframe */}
                <iframe
                  src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                  allow="autoplay; fullscreen"
                  onLoad={() => setIsVideoLoaded(true)}
                  className="w-full h-full border-0"
                  title={project.title}
                />
              </>
            )}
          </div>
        ) : (
          <div 
            onClick={handleStartPlay}
            className="relative w-full h-full cursor-pointer group"
          >
            {/* Actual Video Frame Snapshot (Not random stock art!) */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors duration-500">
              <div className="w-16 h-16 rounded-full bg-white/10 group-hover:bg-[#FF6B50] backdrop-blur-md flex items-center justify-center text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="text-[10px] font-mono text-white/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                {project.isLongForm ? 'FEATURED CUT' : `${project.aspectRatio} • SHORT`}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(project);
                  }}
                  title="Theater Mode"
                  className="p-2 rounded bg-black/70 hover:bg-[#FF6B50] text-white hover:text-black transition-colors duration-300 backdrop-blur-md border border-white/10"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Metadata & Actions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666]">
          <span>{project.categoryLabel} // {project.tools.join(" • ")}</span>
          {project.isLongForm ? (
            <span className="text-[#FF6B50] font-mono">LONG-FORM CUT</span>
          ) : (
            <span className="text-white font-mono">9:16 VERTICAL</span>
          )}
        </div>

        <h3 
          onClick={() => onOpenModal(project)}
          className="text-2xl sm:text-3xl font-bold text-[#EBEBEB] group-hover:text-white tracking-tightest transition-colors duration-300 cursor-pointer"
        >
          {project.title}
        </h3>

        <p className="text-xs text-[#888888] line-clamp-2 max-w-xl font-normal leading-relaxed">
          {project.description}
        </p>

        {/* Direct Drive Button for Long-Form Videos */}
        {project.isLongForm && (
          <div className="pt-2">
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF6B50] hover:text-white transition-colors duration-300 border-b border-[#FF6B50]/40 pb-0.5"
            >
              <span>Watch full video on Google Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

    </div>
  );
}

export default function StaggeredGallery({ onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  // Divide into 2 columns for the staggered layout
  const col1 = filteredProjects.filter((_, idx) => idx % 2 === 0);
  const col2 = filteredProjects.filter((_, idx) => idx % 2 !== 0);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#222222]">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#888888] tracking-widest uppercase">
            // SELECTED WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tightest text-[#EBEBEB]">
            Video Portfolio.
          </h2>
          <p className="text-xs text-[#888888] max-w-lg">
            Plays directly inline on the website. High-impact video editing across documentary, commercial, and short-form content.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all duration-300 font-mono ${
                activeCategory === cat.id
                  ? 'border-white bg-white text-black font-bold'
                  : 'border-[#333333] bg-[#111111] text-[#888888] hover:text-white hover:border-[#555555]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Staggered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Column 1 */}
        <div className="space-y-16">
          {col1.map((project) => (
            <StaggeredProjectCard
              key={project.id}
              project={project}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

        {/* Column 2: md:mt-24 creates the staggered offset */}
        <div className="space-y-16 md:mt-24">
          {col2.map((project) => (
            <StaggeredProjectCard
              key={project.id}
              project={project}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
