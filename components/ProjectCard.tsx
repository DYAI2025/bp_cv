'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Linkedin, ChevronDown, ChevronUp, Cpu, Server, LineChart, Layers, Terminal, Mic, Workflow } from 'lucide-react';
import { ProjectMedia } from './ProjectMedia';
import { playHoverSound } from '@/lib/audio';

const iconMap: Record<string, any> = {
  Cpu, Server, LineChart, Layers, Terminal, Mic, Workflow
};

interface ProjectCardProps {
  project: any;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  showEcosystem: boolean;
  onHover: (name: string | null) => void;
  onExpand: (name: string | null) => void;
  onToggleEcosystem: (show: boolean) => void;
  expandedCardRef: any;
}

export function ProjectCard({
  project,
  index,
  isExpanded,
  isHovered,
  showEcosystem,
  onHover,
  onExpand,
  onToggleEcosystem,
  expandedCardRef
}: ProjectCardProps) {
  const Icon = iconMap[project.icon] || Cpu;

  return (
    <motion.div
      layout
      ref={isExpanded ? expandedCardRef : null}
      role={!isExpanded ? 'button' : undefined}
      tabIndex={isExpanded ? -1 : 0}
      aria-expanded={isExpanded}
      onMouseEnter={() => {
        onHover(project.name);
        if (!isExpanded) playHoverSound(index);
      }}
      onMouseLeave={() => onHover(null)}
      onClick={() => {
        if (!isExpanded) {
          onExpand(project.name);
        }
      }}
      onKeyDown={(e) => {
        if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onExpand(project.name);
        }
      }}
      whileHover={!isExpanded ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group text-left block w-full p-6 rounded-2xl transition-all duration-500 relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]
        ${project.media?.type === 'elevenlabs' ? 'overflow-visible' : 'overflow-hidden'}
        ${isExpanded 
          ? 'md:col-span-2 lg:col-span-3 border cursor-default z-20' 
          : 'cursor-pointer border border-white/10 z-10'}
        ${project.highlight && !isExpanded ? 'border-blue-400/30' : ''}
      `}
      style={{
        ...(isHovered && !isExpanded ? {
          borderColor: `rgba(${project.color || '212, 175, 55'}, 0.8)`,
          boxShadow: `0 30px 80px -15px rgba(${project.color || '212, 175, 55'}, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)`
        } : isExpanded ? {
          borderColor: `rgba(${project.color || '212, 175, 55'}, 0.5)`,
          boxShadow: `0 30px 100px -20px rgba(${project.color || '212, 175, 55'}, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
        } : project.highlight ? {
          boxShadow: `0 10px 30px -10px rgba(96, 165, 250, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.05)`
        } : {})
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-[#0A101D]/80 backdrop-blur-xl pointer-events-none -z-10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div 
        className="absolute inset-x-0 bottom-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{
          background: `linear-gradient(to top, rgba(${project.color || '212, 175, 55'}, 0.2), transparent)`
        }}
      />

      <div className="relative z-10">
        <ProjectMedia project={project} isHovered={isHovered} isExpanded={isExpanded} />

        <motion.div layout className="flex justify-end items-start mb-4">
          {isExpanded ? (
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                onExpand(null);
              }}
              className="p-2 text-blue-200/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(project.url)}&title=${encodeURIComponent(project.name)}&summary=${encodeURIComponent(project.desc)}`}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 -m-2 text-blue-200/30 hover:text-[#0077b5] transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 -m-2"
                  aria-label={`Visit ${project.name}`}
                >
                  <ExternalLink className="w-4 h-4 text-blue-200/30 group-hover:text-[#D4AF37] transition-colors" />
                </a>
              )}
            </div>
          )}
        </motion.div>

        <motion.h4 layout className="flex items-center gap-2 text-xl font-serif font-light text-blue-50 group-hover:text-white transition-colors mb-2">
          <Icon 
            className="w-5 h-5 transition-colors" 
            style={{ color: isHovered || isExpanded ? `rgb(${project.color || '212, 175, 55'})` : 'rgba(191, 219, 254, 0.5)' }} 
          />
          {project.name}
        </motion.h4>
        
        <motion.div layout>
          <motion.p layout className="text-sm font-normal text-blue-100/80 inline">
            {project.desc}
          </motion.p>
          {!isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand(project.name);
              }}
              className="text-sm ml-1 py-1.5 px-2 -mx-2 font-normal transition-colors inline-flex items-center"
              style={{
                color: `rgb(${project.color || '212, 175, 55'})`
              }}
            >
              Read more
            </button>
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-6 border-t border-white/10 pt-6"
            >
                <div>
                  <h4 className="text-sm font-mono text-blue-200/50 uppercase tracking-wider mb-3">About the Project</h4>
                  <p className="text-blue-100/90 font-normal leading-relaxed">
                    {project.fullDesc}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-mono text-blue-200/50 uppercase tracking-wider mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string, i: number) => (
                      <span key={`${t}-${i}`} className="px-3 py-1 rounded-full bg-transparent border border-white/10 text-blue-100/60 text-xs tracking-wide font-light">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.subLinks && (
                  <div className="border-t border-white/5 pt-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleEcosystem(!showEcosystem); }}
                      className="flex items-center gap-2 text-sm font-mono text-blue-200/50 uppercase tracking-wider mb-2 hover:text-[#D4AF37] transition-colors group/eco"
                    >
                      Project Ecosystem
                      {showEcosystem ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    <AnimatePresence>
                      {showEcosystem && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-2 mt-4"
                        >
                          {project.subLinks.map((link: any, i: number) => (
                            <a 
                              key={i} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center group/link p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/10 transition-all"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-medium text-blue-50 group-hover/link:text-[#D4AF37] transition-colors">{link.label}</div>
                                <div className="text-xs text-blue-200/40 font-mono mt-0.5">{link.url.replace('https://', '')}</div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-white/20 group-hover/link:text-[#D4AF37] transition-colors" />
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-end gap-3 sm:gap-4">
                  {project.url !== '#' && (
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(project.url)}&title=${encodeURIComponent(project.name)}&summary=${encodeURIComponent(project.desc)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0077b5]/20 border border-[#0077b5]/50 text-[#0077b5] font-medium hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </a>
                  )}
                  {project.url !== '#' ? (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[#050B14] font-medium transition-colors"
                      style={{
                        backgroundColor: `rgb(${project.color || '212, 175, 55'})`
                      }}
                    >
                      View Live Project
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <span className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-blue-200/30 font-medium border border-white/5 cursor-not-allowed text-sm">
                      Live Demo via Widget Above
                    </span>
                  )}
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <motion.div layout className="mt-4 text-xs font-mono text-[#D4AF37]/70 truncate">
            {project.url.replace('https://', '')}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
