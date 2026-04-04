'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Github, Linkedin, ExternalLink, Terminal, Code2, Workflow, GitBranch, Cpu, LineChart, Layers, Zap, Server, Database, X, Edit2, Check } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const initialProjectsData = [
  {
    name: 'Emotion Dynamics Dashboard',
    url: 'https://lumina.dyai.cloud/',
    desc: 'AI-driven emotional trajectory analysis and visualization.',
    fullDesc: 'A comprehensive dashboard for tracking and analyzing emotional trajectories using advanced AI models. It visualizes complex psychological data into actionable insights, helping users understand emotional shifts over time.',
    tech: ['AI', 'LLM Pipelines', 'Next.js', 'Recharts', 'Tailwind CSS'],
    highlight: true,
    icon: LineChart,
    media: {
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      poster: 'https://picsum.photos/seed/lumina/800/450'
    }
  },
  {
    name: 'Marker-Annotator',
    url: 'https://github.com/DYAI2025/marker-annotator',
    desc: 'Tool for AI training data annotation and marking.',
    fullDesc: 'A specialized internal tool built to streamline the process of annotating and marking datasets for training custom LLMs and computer vision models, significantly improving data preparation efficiency.',
    tech: ['React', 'Python', 'AI', 'Data Processing'],
    highlight: false,
    icon: Code2,
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/marker/800/450'
    }
  },
  {
    name: 'Bazodiac',
    url: 'https://bazodiac.space',
    desc: 'Astrology and insight platform.',
    fullDesc: 'An interactive platform combining astrological data with modern web technologies to provide personalized insights and daily trajectories.',
    tech: ['React', 'API Integration', 'Framer Motion'],
    highlight: false,
    icon: Server,
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/bazodiac/800/450'
    }
  },
  {
    name: 'Sky',
    url: 'https://sky.bazodiac.space/',
    desc: 'Experimental web application.',
    fullDesc: 'An experimental frontend interface exploring new ways of interacting with generative content and dynamic data visualization.',
    tech: ['Web APIs', 'React', 'Generative UI'],
    highlight: false,
    icon: Server,
    media: {
      type: 'video',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      poster: 'https://picsum.photos/seed/sky/800/450'
    }
  },
  {
    name: 'Insight',
    url: 'https://insight.bazodiac.space/',
    desc: 'Data and insight visualization tool.',
    fullDesc: 'A dedicated tool for deep-diving into personal and professional metrics, turning raw data streams into readable, beautiful charts.',
    tech: ['Data Viz', 'D3.js', 'Next.js'],
    highlight: false,
    icon: LineChart,
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/insight/800/450'
    }
  },
  {
    name: 'DYAI',
    url: 'https://dyai.machinemind.me',
    desc: 'Machine mind interface and AI utility.',
    fullDesc: 'A direct interface to custom-trained machine learning models, serving as a utility hub for various AI-driven tasks and automations.',
    tech: ['LLMs', 'Python', 'FastAPI', 'React'],
    highlight: false,
    icon: Cpu,
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/dyai/800/450'
    }
  },
  {
    name: 'CoupleTimer',
    url: 'https://coupletimer.site/',
    desc: 'Digital utility application.',
    fullDesc: 'A lightweight, focused utility application designed to help couples synchronize schedules and manage shared time effectively.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    highlight: false,
    icon: Server,
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/coupletimer/800/450'
    }
  },
  {
    name: 'Prompt',
    url: 'https://prompt.machinetool.site/',
    desc: 'AI prompt engineering and management tool.',
    fullDesc: 'A workspace for crafting, testing, and managing complex prompts for various LLMs. It helps streamline the prompt engineering workflow.',
    tech: ['Prompt Engineering', 'Next.js', 'OpenAI API'],
    highlight: false,
    icon: Terminal,
    media: {
      type: 'image',
      url: 'https://picsum.photos/seed/prompt/800/450'
    }
  }
];

function ProjectMedia({ project, isHovered, isExpanded }: { project: any, isHovered: boolean, isExpanded: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <motion.div layout className={`relative w-full mb-6 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-950 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-500 ${isExpanded ? 'h-64 md:h-96' : 'h-48'}`}>
      {project.media.type === 'video' ? (
        <video
          ref={videoRef}
          src={project.media.url}
          poster={project.media.poster}
          muted
          loop
          playsInline
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      ) : (
        <img
          src={project.media.url}
          alt={project.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
      )}
      {/* Inner shadow overlay for depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] pointer-events-none" />
    </motion.div>
  );
}

let audioCtx: AudioContext | null = null;

const playHoverSound = () => {
  try {
    if (typeof window === 'undefined') return;
    
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Deep sonorous tone (approx 85Hz)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(85, audioCtx.currentTime);

    // Soft envelope
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.1); // Soft attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6); // Smooth release

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export default function Portfolio() {
  const [projects, setProjects] = useState(initialProjectsData);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedDescs, setExpandedDescs] = useState<Record<string, boolean>>({});
  const expandedCardRef = useRef<HTMLDivElement>(null);

  const handleProjectChange = (index: number, field: string, value: any) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  // Handle click outside to collapse the expanded card
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (expandedCardRef.current && !expandedCardRef.current.contains(event.target as Node)) {
        setExpandedProject(null);
      }
    }
    
    if (expandedProject) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedProject]);

  // Handle smooth scrolling when a card is expanded
  useEffect(() => {
    if (expandedProject && expandedCardRef.current) {
      // Small timeout to allow layout animation to start so the position is accurate
      setTimeout(() => {
        if (expandedCardRef.current) {
          const y = expandedCardRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [expandedProject]);

  return (
    <div className="min-h-screen bg-transparent text-blue-50/90 font-sans selection:bg-[#D4AF37]/30">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a1128] via-[#050B14] to-[#02040a] opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24 space-y-32">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeIn} className="flex items-center space-x-3 text-sm font-mono text-blue-200/60">
            <div className="flex items-center px-4 py-1.5 rounded-full bg-[#0a1128]/50 border border-[#D4AF37]/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="tracking-widest uppercase text-[10px] text-[#D4AF37]">Berlin | Building the future of work</span>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-blue-200">
              Benjamin Poersch
            </h1>
            <h2 className="text-lg md:text-xl text-[#D4AF37] font-light tracking-widest uppercase">
              AI Expert | Integration Specialist | Applied AI Builder | Digital Product Creator
            </h2>
            <p className="text-2xl md:text-3xl font-light text-blue-100/80 max-w-3xl leading-relaxed pt-4">
              Ich teste und baue heute, was Unternehmen morgen automatisieren.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-6">
            <Link href="mailto:ben.poersch@gmail.com" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              <Mail className="w-4 h-4" />
              <span className="text-sm">ben.poersch@gmail.com</span>
            </Link>
            <Link href="https://linkedin.com/in/benjamin-poersch" target="_blank" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </Link>
            <Link href="https://github.com/DYAI2025" target="_blank" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </Link>
          </motion.div>
        </motion.section>

        {/* SUMMARY & ABOUT */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="p-8 rounded-2xl bg-[#0A101D]/80 border border-white/5 backdrop-blur-md shadow-2xl shadow-black/50">
            <h3 className="text-sm font-mono text-[#D4AF37] mb-4 uppercase tracking-wider">Summary</h3>
            <div className="space-y-4 text-blue-100/80 font-light leading-relaxed">
              <p>
                AI expert, integration specialist and product-oriented builder with a background in agile transformation, leadership advisory and organizational change. I test, research and integrate today the AI applications, automations and digital systems that companies will use productively tomorrow.
              </p>
              <p>
                My work combines strategic advisory with practical implementation, hands-on product building and continuous experimentation. I help companies, leaders and decision-makers understand AI not as an abstract trend, but as a concrete capability for adaptation, execution and future readiness.
              </p>
              <p>
                With years of experience guiding transformation in teams and organizations, I now focus on turning emerging AI capabilities into real products, workflows and business opportunities. I build, test and publish practical insights with a strong creator mindset and a deep commitment to shaping what creates value next.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#0A101D]/80 border border-white/5 backdrop-blur-md shadow-2xl shadow-black/50">
            <h3 className="text-sm font-mono text-blue-200 mb-4 uppercase tracking-wider">Mission</h3>
            <div className="space-y-4 text-blue-100/80 font-light leading-relaxed">
              <p>
                For many years, I helped companies navigate change through agile transformation, leadership support and organizational development. Today, I focus on something even more urgent: helping people and organizations understand, test and apply artificial intelligence in practical ways.
              </p>
              <p>
                Through years of transformation work, I learned that organizations rarely change because change sounds attractive. They change when pressure becomes real. AI is creating exactly that kind of pressure.
              </p>
              <p>
                What drives me is not only efficiency or optimization. It is creation. I build because I want to shape what comes next. I work with intensity, curiosity and real commitment on the things that can create value tomorrow by understanding and building them today.
              </p>
            </div>
          </div>
        </motion.section>

        {/* DYNAMIC EXPERIENCE TIMELINE */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-light text-blue-50 flex items-center">
              <Workflow className="w-6 h-6 mr-3 text-[#D4AF37]" />
              Career Trajectory
            </h3>
            <p className="text-blue-200/60 font-light mt-3 max-w-2xl">
              From guiding agile transformations to building the AI-driven future. The shift from process optimization to product creation.
            </p>
          </div>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-0 md:before:left-1/2 md:before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-[#D4AF37]/50 before:via-blue-500/30 before:to-transparent">
            
            {/* Current Role - Emphasized */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#050B14] bg-gradient-to-br from-[#D4AF37] to-blue-400 text-[#050B14] shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Zap className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/90 border border-[#D4AF37]/30 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(212,175,55,0.2)] hover:bg-[#0A101D] transition-colors">
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-[#D4AF37] font-mono text-sm tracking-wide">Feb 2020 - Present</span>
                  <h4 className="text-xl font-serif font-light text-blue-50">Independent AI Builder | Integration Specialist | Advisor</h4>
                  <span className="text-blue-200/60 font-light">DIYrigent GmbH / Poersch Holding GmbH</span>
                </div>
                <ul className="space-y-2 text-sm text-blue-100/80 font-light list-disc list-inside marker:text-[#D4AF37]">
                  <li>Founded and led an independent business focused originally on agile transformation, coaching and organizational change</li>
                  <li>Evolved the business toward AI advisory, applied experimentation, digital product creation and integration-focused consulting</li>
                  <li>Support companies, leaders and teams in understanding how AI changes decision-making, execution, workflows and future competitiveness</li>
                  <li>Build and test digital products, AI-enabled services and automation concepts with direct relevance for modern business environments</li>
                  <li>Translate uncertainty around AI into practical action through advisory, experimentation and hands-on implementation</li>
                </ul>
              </div>
            </motion.div>

            {/* Previous Roles - Transitioning */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050B14] bg-blue-900/80 text-blue-50 shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <GitBranch className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/50 border border-blue-500/20 backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-400 font-mono text-sm">2016 - 2020</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Agile Coach and Scrum Master</h4>
                  <span className="text-blue-200/60 font-light">Freelance | Berlin</span>
                </div>
                <ul className="space-y-2 text-sm text-blue-100/80 font-light list-disc list-inside marker:text-blue-500/50">
                  <li>Supported multiple organizations in introducing agile ways of working across teams and leadership environments</li>
                  <li>Guided organizational change, team development and practical adoption of Scrum and related methods</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050B14] bg-white/5 text-blue-200/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Layers className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/40 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors">
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-200/40 font-mono text-sm">2016</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Agile Consultant and Scrum Master</h4>
                  <span className="text-blue-200/60 font-light">it-agile GmbH | Hamburg</span>
                </div>
                <p className="text-sm text-blue-100/80 font-light">Advised mid-sized companies on agile implementation, facilitation and change processes.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050B14] bg-white/5 text-blue-200/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/30 border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors">
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-200/40 font-mono text-sm">2013 - 2015</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Agile Coach / Scrum Master / QA Engineer</h4>
                  <span className="text-blue-200/60 font-light">eSailors IT Solutions GmbH | Hamburg</span>
                </div>
                <p className="text-sm text-blue-100/80 font-light">Supported software teams in delivery, coaching and agile process execution.</p>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* INTERACTIVE PROJECTS (IN-PLACE EXPANSION) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-serif font-light text-blue-50 flex items-center">
                <Code2 className="w-6 h-6 mr-3 text-[#D4AF37]" />
                Selected AI & Digital Projects
              </h3>
              <p className="text-blue-200/60 mt-3 max-w-2xl font-light">
                Portfolio of independent digital and AI-driven products. Click on any card to expand and explore the technologies and concepts behind the build.
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-light transition-all duration-300 ${isEditing ? 'bg-[#D4AF37] border-[#D4AF37] text-[#050B14] hover:bg-[#F3E5AB]' : 'bg-transparent border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              <span>{isEditing ? 'Done Editing' : 'Edit Content'}</span>
            </button>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isExpanded = expandedProject === project.name;
              const isHovered = hoveredProject === project.name;

              return (
                <motion.div
                  layout
                  key={project.name}
                  ref={isExpanded ? expandedCardRef : null}
                  onMouseEnter={() => {
                    setHoveredProject(project.name);
                    if (!isExpanded) playHoverSound();
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => !isExpanded && setExpandedProject(project.name)}
                  className={`group text-left block w-full p-6 rounded-2xl bg-[#0A101D]/80 backdrop-blur-xl transition-all duration-500 overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]
                    ${isExpanded 
                      ? 'md:col-span-2 lg:col-span-3 border border-[#D4AF37]/40 shadow-[0_30px_100px_-20px_rgba(212,175,55,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-default z-20' 
                      : 'cursor-pointer border border-white/5 hover:border-[#D4AF37]/40 hover:shadow-[0_30px_80px_-15px_rgba(212,175,55,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-2 z-10'}
                    ${project.highlight && !isExpanded ? 'border-blue-400/20 shadow-[0_10px_30px_-10px_rgba(96,165,250,0.1),inset_0_1px_1px_rgba(255,255,255,0.02)]' : ''}
                  `}
                >
                  {/* Inner top highlight for 3D glass effect */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Bottom warm glow inside the card */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <ProjectMedia project={project} isHovered={isHovered} isExpanded={isExpanded} />

                    <motion.div layout className="flex justify-between items-start mb-4">
                      <motion.div layout className={`p-2 rounded-full ${project.highlight || isExpanded ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-white/5 text-blue-200/50 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'} transition-colors`}>
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      {isExpanded ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedProject(null); }}
                          className="p-2 text-blue-200/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      ) : (
                        <ExternalLink className="w-4 h-4 text-blue-200/30 group-hover:text-[#D4AF37] transition-colors" />
                      )}
                    </motion.div>

                    {isEditing ? (
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full bg-[#050B14]/50 border border-white/10 rounded px-2 py-1 text-xl font-serif font-light text-white mb-2 focus:outline-none focus:border-[#D4AF37]"
                      />
                    ) : (
                      <motion.h4 layout className="text-xl font-serif font-light text-blue-50 group-hover:text-white transition-colors mb-2">
                        {project.name}
                      </motion.h4>
                    )}
                    
                    {isEditing ? (
                      <textarea
                        value={project.desc}
                        onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        rows={2}
                        className="w-full bg-[#050B14]/50 border border-white/10 rounded px-2 py-1 text-sm font-light text-blue-100/80 focus:outline-none focus:border-[#D4AF37] resize-none"
                      />
                    ) : (
                      <motion.div layout>
                        <motion.p layout className="text-sm font-light text-blue-100/60 inline">
                          {expandedDescs[project.name] && !isExpanded ? project.fullDesc : project.desc}
                        </motion.p>
                        {!isExpanded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedDescs(prev => ({ ...prev, [project.name]: !prev[project.name] }));
                            }}
                            className="text-[#D4AF37] hover:text-[#F3E5AB] text-sm ml-2 font-light transition-colors inline-flex"
                          >
                            {expandedDescs[project.name] ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </motion.div>
                    )}

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
                              {isEditing ? (
                                <textarea
                                  value={project.fullDesc}
                                  onChange={(e) => handleProjectChange(index, 'fullDesc', e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  rows={4}
                                  className="w-full bg-[#050B14]/50 border border-white/10 rounded px-3 py-2 text-blue-100/80 font-light leading-relaxed focus:outline-none focus:border-[#D4AF37] resize-none"
                                />
                              ) : (
                                <p className="text-blue-100/80 font-light leading-relaxed">
                                  {project.fullDesc}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-mono text-blue-200/50 uppercase tracking-wider mb-3">Technologies & Tools</h4>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={project.tech.join(', ')}
                                  onChange={(e) => handleProjectChange(index, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full bg-[#050B14]/50 border border-white/10 rounded px-3 py-2 text-blue-100/80 font-light text-sm focus:outline-none focus:border-[#D4AF37]"
                                  placeholder="Comma-separated tags"
                                />
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {project.tech.map((t, i) => (
                                    <span key={`${t}-${i}`} className="px-3 py-1 rounded-full bg-transparent border border-white/10 text-blue-100/60 text-xs tracking-wide font-light">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="pt-4 flex justify-end">
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#050B14] font-medium hover:bg-[#F3E5AB] transition-colors"
                              >
                                View Live Project
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
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
            })}
          </motion.div>

          <div className="mt-12">
            <h4 className="text-xl font-serif font-light text-blue-50 mb-6 flex items-center">
              <Database className="w-5 h-5 mr-3 text-[#D4AF37]" />
              Selected Repositories
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'match.bazodiac.space', url: 'https://github.com/DYAI2025/match.bazodiac.space.git' },
                { name: 'Astro-Noctum', url: 'https://github.com/DYAI2025/Astro-Noctum.git' },
                { name: 'insight.bazodiac', url: 'https://github.com/DYAI2025/insight.bazodiac.git' },
                { name: 'Astro-IOs', url: 'https://github.com/DYAI2025/Astro-IOs.git' },
              ].map((repo) => (
                <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-xl bg-[#050B14]/50 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
                  <Github className="w-4 h-4 mr-3 text-blue-200/40 group-hover:text-[#D4AF37]" />
                  <span className="text-sm text-blue-200/60 group-hover:text-blue-50 font-mono font-light truncate">{repo.name}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0A101D]/80 to-[#050B14]/40 border border-white/5 backdrop-blur-md">
            <div className="flex items-center mb-6">
              <Cpu className="w-6 h-6 mr-3 text-[#D4AF37]" />
              <h3 className="text-2xl font-serif font-light text-blue-50">AI & Integration</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['LLM-Pipelines', 'Emotion Dynamics', 'AI-Workflows', 'Prompt Engineering', 'Product Building', 'API Integration', 'Rapid Prototyping', 'Next.js / React', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-light tracking-wide">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0A101D]/80 to-[#050B14]/40 border border-white/5 backdrop-blur-md">
            <div className="flex items-center mb-6">
              <Layers className="w-6 h-6 mr-3 text-blue-200" />
              <h3 className="text-2xl font-serif font-light text-blue-50">Agile Foundation</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Agile Transformation', 'Scrum & Kanban', 'Leadership Advisory', 'Organizational Change', 'Team Development', 'Process Execution', 'Facilitation', 'Strategic Guidance'].map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs font-light tracking-wide">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CONTACT / FOOTER */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-t border-white/10 text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-blue-50">Lass uns die Zukunft bauen.</h2>
          <p className="text-blue-200/60 max-w-xl mx-auto font-light text-lg">
            Ready to translate emerging AI capabilities into real products and workflows? Let's connect.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a href="mailto:ben.poersch@gmail.com" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#050B14] font-medium hover:bg-[#F3E5AB] transition-colors">
              <Mail className="w-5 h-5 mr-3" />
              Get in Touch
            </a>
            <a href="https://linkedin.com/in/benjamin-poersch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-blue-50 font-light hover:bg-white/5 border border-white/20 transition-colors">
              <Linkedin className="w-5 h-5 mr-3" />
              Connect on LinkedIn
            </a>
          </div>

          <div className="pt-20 flex flex-col items-center justify-center space-y-6">
            <div className="p-5 bg-white/90 rounded-2xl backdrop-blur-sm">
              {/* Placeholder for QR Code - using a simple SVG representation */}
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#050B14" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <path d="M9 3v7H3"></path>
                <path d="M21 3v7h-7"></path>
                <path d="M21 14v7h-7"></path>
                <path d="M9 14v7H3"></path>
                <path d="M11 11h2v2h-2z"></path>
              </svg>
            </div>
            <span className="text-xs font-mono text-[#D4AF37]/70 uppercase tracking-widest">Scan for Lumina Dashboard</span>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
