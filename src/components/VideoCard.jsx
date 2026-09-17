import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX, Sparkles, Clock, Film } from 'lucide-react';

export default function VideoCard({ project, onOpenModal }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleToggleInlinePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlayingInline) {
      videoRef.current.pause();
      setIsPlayingInline(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlayingInline(true);
      }).catch(err => {
        console.log("Inline autoplay prevented:", err);
      });
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const isVertical = project.aspectRatio === '9:16';

  // Character accent mapping
  const characterAccents = {
    yukino: 'border-yukino/40 text-yukino bg-yukino/10',
    yui: 'border-yui/40 text-yui bg-yui/10',
    hachiman: 'border-slate-500/40 text-slate-300 bg-slate-800/50',
    iroha: 'border-iroha/40 text-iroha bg-iroha/10',
  };

  return (
    <div className={`group rounded-2xl glass-card overflow-hidden flex flex-col justify-between transition-all duration-300 ${isVertical ? 'sm:row-span-2' : ''}`}>
      
      {/* Video Preview Container */}
      <div className="relative overflow-hidden bg-slate-950">
        
        {/* Aspect Ratio Box */}
        <div className={`relative w-full ${isVertical ? 'aspect-[9/16] max-h-[500px]' : 'aspect-video'}`}>
          
          {/* Native Inline Video Element (Plays directly without leaving the page!) */}
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.thumbnail}
            muted={isMuted}
            playsInline
            loop
            className="w-full h-full object-cover"
            onEnded={() => setIsPlayingInline(false)}
          />

          {/* Video Overlay when not playing inline */}
          {!isPlayingInline && (
            <div 
              onClick={() => onOpenModal(project)}
              className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-center justify-center cursor-pointer group-hover:bg-slate-950/40 transition-colors"
            >
              {/* Play Button */}
              <div className="w-14 h-14 rounded-full bg-yukino/90 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.5)] transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
              </div>
            </div>
          )}

          {/* Quick Actions Bar Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
            {/* Aspect Ratio Badge */}
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
              {project.aspectRatio}
            </span>

            {/* Inline play / Theater Mode buttons */}
            <div className="flex items-center gap-1.5">
              {/* Inline play button */}
              <button
                onClick={handleToggleInlinePlay}
                title={isPlayingInline ? "Pause inline" : "Play inline on card"}
                className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-yukino hover:text-slate-950 transition-colors shadow-sm"
              >
                {isPlayingInline ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              {/* Mute button (visible when inline playing) */}
              {isPlayingInline && (
                <button
                  onClick={handleToggleMute}
                  className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-sm"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Fullscreen Theater Modal Trigger */}
              <button
                onClick={() => onOpenModal(project)}
                title="Expand to Theater Mode"
                className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-yukino hover:text-slate-950 transition-colors shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Duration Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-slate-950/90 text-white font-mono text-[10px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {project.duration}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 text-[10px] font-mono">
              {project.categoryLabel}
            </span>
          </div>

        </div>

      </div>

      {/* Project Meta Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Japanese Subtitle */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-japanese text-slate-400">{project.japaneseTitle}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${characterAccents[project.primaryCharacter] || 'text-slate-400 border-white/10'}`}>
              {project.primaryCharacter.toUpperCase()} VIBE
            </span>
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onOpenModal(project)}
            className="text-lg font-bold text-white group-hover:text-yukino transition-colors cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Software & Techniques */}
        <div className="space-y-3 pt-2 border-t border-white/5">
          {/* Software used */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 text-[10px] font-medium"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Techniques tags */}
          <div className="flex flex-wrap items-center gap-1">
            {project.techniques.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] text-slate-400 font-mono"
              >
                #{tech.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Bottom Interactive Trigger */}
          <button
            onClick={() => onOpenModal(project)}
            className="w-full py-2 rounded-lg bg-white/5 hover:bg-yukino/20 hover:text-yukino border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Open in Theater Mode</span>
          </button>
        </div>

      </div>

    </div>
  );
}
