import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../data/projects';

function StaggeredProjectCard({ project, onOpenModal }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleInlinePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlayingInline) {
      videoRef.current.pause();
      setIsPlayingInline(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlayingInline(true);
      }).catch(err => {
        console.log("Inline play error:", err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="group cursor-pointer space-y-4">
      
      {/* 16:9 Aspect Ratio Container */}
      <div 
        onClick={() => onOpenModal(project)}
        className="relative aspect-video rounded-2xl overflow-hidden bg-[#111111] border border-[#222222] select-none"
      >
        {/* Direct HTML5 Video Player */}
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.thumbnail}
          muted={isMuted}
          playsInline
          loop
          className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          onEnded={() => setIsPlayingInline(false)}
        />

        {/* Center Play Button Overlay when not playing inline */}
        {!isPlayingInline && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
            <div className="w-16 h-16 rounded-full bg-white/10 group-hover:bg-[#FF6B50] backdrop-blur-md flex items-center justify-center text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
          </div>
        )}

        {/* Top Control Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <span className="text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
            {project.aspectRatio} • {project.duration}
          </span>

          <div className="flex items-center gap-2">
            {/* Inline play toggle */}
            <button
              onClick={toggleInlinePlay}
              title={isPlayingInline ? "Pause" : "Play inline"}
              className="p-2 rounded bg-black/60 hover:bg-white text-white hover:text-black transition-colors duration-300 backdrop-blur-md"
            >
              {isPlayingInline ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {isPlayingInline && (
              <button
                onClick={toggleMute}
                className="p-2 rounded bg-black/60 hover:bg-white text-white hover:text-black transition-colors duration-300 backdrop-blur-md"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Theater Mode trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              title="Theater Mode"
              className="p-2 rounded bg-black/60 hover:bg-[#FF6B50] text-white hover:text-black transition-colors duration-300 backdrop-blur-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Metadata (Category in #666666, 10px bold, 0.2em tracking. Title in 3xl bold white) */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#666666]">
          {project.categoryLabel} // {project.tools.join(" • ")}
        </p>
        <h3 
          onClick={() => onOpenModal(project)}
          className="text-2xl sm:text-3xl font-bold text-[#EBEBEB] group-hover:text-white tracking-tightest transition-colors duration-300"
        >
          {project.title}
        </h3>
        <p className="text-xs text-[#888888] line-clamp-2 max-w-xl font-normal leading-relaxed">
          {project.description}
        </p>
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
        </div>

        {/* Minimal Category Filter without gradient chips */}
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

      {/* 2-Column Staggered Grid (Column 2 has md:mt-24 for the authentic editorial stagger) */}
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
