'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Code2, Workflow, Database, Github } from 'lucide-react';
import Image from 'next/image';

// Components
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { TimelineItem } from '@/components/TimelineItem';
import { SkillPanel } from '@/components/SkillPanel';
import { ContactSection } from '@/components/ContactSection';

// Data
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { aiSkills, agileSkills } from '@/data/skills';

// Utils
import { closeAudioContext } from '@/lib/audio';

export default function Portfolio() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations for the portrait
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 1000], [0, 150]);
  const imageOpacity = useTransform(scrollY, [0, 800], [0.9, 0.2]);

  // Handle click outside to collapse
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (expandedCardRef.current && !expandedCardRef.current.contains(event.target as Node)) {
        setExpandedProject(null);
        setShowEcosystem(false);
      }
    }
    if (expandedProject) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedProject]);

  // Scroll into view when expanded
  useEffect(() => {
    if (expandedProject && expandedCardRef.current) {
      setTimeout(() => {
        expandedCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [expandedProject]);

  // Cleanup audio
  useEffect(() => {
    return () => closeAudioContext();
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-blue-50/90 font-sans selection:bg-[#D4AF37]/30">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a1128] via-[#050B14] to-[#02040a] opacity-90" />

      {/* Portrait Background */}
      <motion.div 
        style={{ y: imageY, opacity: imageOpacity }}
        className="fixed top-0 left-0 w-[120vw] md:w-[65vw] h-[110vh] z-0 pointer-events-none"
      >
        <Image
          src="/ben.poersch.portrait.webp"
          alt="Benjamin Poersch"
          fill
          sizes="(min-width: 768px) 65vw, 120vw"
          className="object-cover object-[center_top] md:object-[left_top]"
          priority
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050B14]/60 to-[#050B14] z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050B14] z-10" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24 space-y-32">
        
        <HeroSection />

        {/* SUMMARY & MISSION */}
        <section className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.3)' }}
            className="p-8 rounded-2xl bg-[#0A101D]/80 border border-white/10 backdrop-blur-lg shadow-2xl transition-all duration-300"
          >
            <h3 className="text-sm font-mono text-[#D4AF37] mb-4 uppercase tracking-wider">Summary</h3>
            <div className="space-y-4 text-blue-100/90 font-normal leading-relaxed">
              <p>
                AI researcher, builder, and former agile coach with a deep background in organizational change. Today, my focus is entirely on exploring the frontier of artificial intelligence, prototyping new tools, and sharing that knowledge.
              </p>
              <p>
                I am dedicated to supporting anyone who wants to demystify AI and learn how to interact with these systems meaningfully.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.3)' }}
            className="p-8 rounded-2xl bg-[#0A101D]/80 border border-white/10 backdrop-blur-lg shadow-2xl transition-all duration-300"
          >
            <h3 className="text-sm font-mono text-blue-400 mb-4 uppercase tracking-wider">Mission</h3>
            <div className="space-y-4 text-blue-100/90 font-normal leading-relaxed">
              <p>
                My mission is empowering people to understand, test, and apply artificial intelligence in their own contexts.
              </p>
              <p>
                I believe that AI should not be an abstract concept. My goal is to break down how these models truly function and share practical methods for collaborating with machines.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAREER TRAJECTORY */}
        <section>
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-light text-blue-50 flex items-center">
              <Workflow className="w-6 h-6 mr-3 text-[#D4AF37]" />
              Career Trajectory
            </h3>
          </div>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-0 md:before:left-1/2 md:before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-[#D4AF37]/50 before:via-blue-500/30 before:to-transparent">
            {experienceData.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-light text-blue-50 flex items-center">
              <Code2 className="w-6 h-6 mr-3 text-[#D4AF37]" />
              Selected AI & Digital Projects
            </h3>
            <p className="text-blue-200/60 mt-3 max-w-2xl font-light">
              Portfolio of independent digital and AI-driven products. Click on any card to expand and explore the technologies and concepts behind the build.
            </p>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={project.name}
                project={project}
                index={index}
                isExpanded={expandedProject === project.name}
                isHovered={hoveredProject === project.name}
                showEcosystem={showEcosystem}
                onHover={setHoveredProject}
                onExpand={setExpandedProject}
                onToggleEcosystem={setShowEcosystem}
                expandedCardRef={expandedCardRef}
              />
            ))}
          </motion.div>

          {/* REPOSITORIES */}
          <div className="mt-12">
            <h4 className="text-xl font-serif font-light text-blue-50 mb-6 flex items-center">
              <Database className="w-5 h-5 mr-3 text-[#D4AF37]" />
              Selected Repositories
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  name: 'BeCoin_EcoSim_LLM', 
                  url: 'https://github.com/DYAI2025/BeCoin_EcoSim_LLM.git',
                  desc: 'Exploring agentic motivation behavior patterns and collective survival mechanisms.'
                },
                { 
                  name: 'Whatsorga', 
                  url: 'https://github.com/DYAI2025/Whatsorga.git',
                  desc: 'Browser extension capturing chats into a vector DB for intelligent context interpretation.'
                },
                { 
                  name: '3DSolarSystem_animation', 
                  url: 'https://github.com/DYAI2025/3DSolarSystem_animation.git',
                  desc: 'Interactive 3D animation of the solar system demonstrating advanced rendering.'
                },
              ].map((repo) => (
                <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="flex flex-col p-5 rounded-xl bg-[#0A101D]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group hover:-translate-y-1">
                  <div className="flex items-center mb-3">
                    <Github className="w-5 h-5 mr-3 text-blue-200/40 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-base text-blue-50 font-mono font-normal truncate">{repo.name}</span>
                  </div>
                  <p className="text-sm text-blue-100/80 font-normal leading-relaxed pl-8">
                    {repo.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="grid md:grid-cols-2 gap-8">
          <SkillPanel title="AI & Integration" skills={aiSkills} type="tags" />
          <SkillPanel title="Agile Foundation" skills={agileSkills} type="bars" />
        </section>

        <ContactSection />

      </div>
    </div>
  );
}
