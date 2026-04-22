'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

interface ProjectMediaProps {
  project: any;
  isHovered: boolean;
  isExpanded: boolean;
}

export function ProjectMedia({ project, isHovered, isExpanded }: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    if (project.media?.type === 'video' && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, project.media]);

  if (!project.media) return null;

  return (
    <motion.div 
      layout 
      className={`relative w-full mb-6 rounded-xl border border-slate-700/50 bg-slate-950 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-500 ${project.media?.type === 'elevenlabs' ? 'overflow-visible' : 'overflow-hidden'} ${isExpanded ? 'h-64 md:h-96' : 'h-48'}`}
    >
      {project.media.type === 'video' ? (
        <video
          ref={videoRef}
          src={project.media.url}
          poster={project.media.poster}
          muted
          loop
          playsInline
          preload="none"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      ) : project.media.type === 'elevenlabs' ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#050B14] to-[#0A101D] relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent animate-pulse pointer-events-none" />
          <div className="relative z-50 flex flex-col items-center">
            {!isCalling ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCalling(true);
                }}
                className="flex flex-col items-center group/call"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-4 group-hover/call:bg-[#D4AF37]/20 group-hover/call:border-[#D4AF37]/50 transition-all duration-300">
                  <Mic className="w-8 h-8 text-[#D4AF37] opacity-80" />
                </div>
                <span className="text-sm font-medium text-blue-200/80 uppercase tracking-widest group-hover/call:text-[#D4AF37] transition-colors">Start Call</span>
              </button>
            ) : (
              <>
                <p className="text-sm font-light text-blue-200/60 text-center px-4 mb-4">
                  Conversation active. Click widget to interact.
                </p>
                <div onClick={(e) => e.stopPropagation()}>
                  {/* @ts-ignore */}
                  <elevenlabs-convai agent-id={project.media.agentId}></elevenlabs-convai>
                  <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="lazyOnload" />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <Image
          src={project.media.url}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
          quality={75}
        />
      )}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] pointer-events-none" />
    </motion.div>
  );
}
