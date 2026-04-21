'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MapPin, Mail, Github, Linkedin, ExternalLink, Terminal, Code2, Workflow, GitBranch, Cpu, LineChart, Layers, Zap, Server, Database, X, Edit2, Check, Copy, Mic, FileDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

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
    name: 'DYAI',
    url: 'https://dyai.machinemind.me',
    desc: 'Design your augmented intelligence',
    fullDesc: "The page that this refers to is a statement toward the world of tomorrow. How will we handle AI in normal human workflows and how will it contribute to our daily life? We think that these questions are not necessary for us because it's some kind of future, but it's our future. The future that we expected in childhood are now reality. We are living, we are the first generation which is living their own future.",
    tech: ['LLMs', 'Python', 'FastAPI', 'React'],
    highlight: true,
    icon: Cpu,
    color: '59, 130, 246', // blue-500
    media: {
      type: 'image',
      url: '/dyai.jpg'
    }
  },
  {
    name: 'Bazodiac',
    url: 'https://bazodiac.space',
    desc: 'As if a NASA engineer were reading your cards at night.',
    fullDesc: 'An interactive platform combining astrological data with modern web technologies to provide personalized insights and daily trajectories.',
    tech: ['React', 'API Integration', 'Framer Motion', 'D3.js'],
    highlight: false,
    icon: Server,
    color: '168, 85, 247', // purple-500
    media: {
      type: 'image',
      url: '/bazodiac.jpeg'
    },
    subLinks: [
      { label: 'The Idea', url: 'https://insight.bazodiac.space' },
      { label: 'The Funnel', url: 'https://sky.bazodiac.space' },
      { label: 'The Product', url: 'https://bazodiac.space' },
      { label: 'The Math (FufirE_API)', url: 'https://bafe-production.up.railway.app/docs' }
    ]
  },
  {
    name: 'LeanDeep',
    url: 'https://app.LeanDeep.de',
    desc: 'A tool for semantic pattern recognition in long dialogs, chats, or live conversations.',
    fullDesc: 'For therapists, psychologists, coaches and all who want to look deeper into language patterns. A tool for semantic pattern recognition in long dialogs, chats, or live conversations.',
    tech: ['AI', 'NLP', 'React', 'Data Viz'],
    highlight: false,
    icon: LineChart,
    color: '20, 184, 166', // teal-500
    media: {
      type: 'video',
      url: '/leandeep.mp4'
    }
  },
  {
    name: 'Couple Time',
    url: 'https://coupletimer.site/',
    desc: 'A digital framework for self hosted relationship maintain/work/healing and better partnership.',
    fullDesc: 'A lightweight, focused utility application designed to help couples synchronize schedules, manage shared time effectively, and maintain their relationship.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    highlight: false,
    icon: Layers,
    color: '244, 63, 94', // rose-500
    media: {
      type: 'video',
      url: 'https://media.dyai.cloud/uploads/2026/03/7a6d07a3-98f1-41b9-b5c2-68168467368f.mp4'
    }
  },
  {
    name: 'Promptschmiede',
    url: 'https://prompt.machinetool.site/',
    desc: 'AI designed advanced prompting. Jeder Prompt wird detailliert verfeinert in seiner Art und wird sich abheben.',
    fullDesc: 'Jeder Prompt wird detailliert verfeinert in seiner Art und wird sich abheben. AI designed advanced prompting. A workspace for crafting, testing, and managing complex prompts for various LLMs.',
    tech: ['Prompt Engineering', 'Next.js', 'OpenAI API'],
    highlight: false,
    icon: Terminal,
    color: '245, 158, 11', // amber-500
    media: {
      type: 'video',
      url: '/prompt.mp4'
    }
  },
  {
    name: 'Ben B18 Quantified',
    url: '#',
    desc: 'Interactive voice agent representing my quantified self.',
    fullDesc: 'Talk directly to my quantified self via this interactive voice agent powered by ElevenLabs. It uses semantic pattern recognition and my personal data to converse with you.',
    tech: ['Voice AI', 'ElevenLabs', 'Conversational AI'],
    highlight: false,
    icon: Mic,
    color: '212, 175, 55', // gold
    media: {
      type: 'elevenlabs',
      agentId: 'agent_6201kndfxgmwf8gbx5zfbhtsmstc'
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
      ) : project.media.type === 'elevenlabs' ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#050B14] to-[#0A101D] relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent animate-pulse" />
          <div className="z-10 flex flex-col items-center">
            <Mic className="w-12 h-12 text-[#D4AF37] mb-4 opacity-80" />
            <p className="text-sm font-light text-blue-200/60 text-center px-4">
              Click the widget below to start a conversation.
            </p>
            <div className="mt-4 scale-90 transform origin-center">
              {/* @ts-ignore */}
              <elevenlabs-convai agent-id={project.media.agentId}></elevenlabs-convai>
              <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="lazyOnload" />
            </div>
          </div>
        </div>
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

const chords = [
  [220.00, 261.63, 329.63], // Am
  [164.81, 207.65, 246.94], // E
  [261.63, 329.63, 392.00], // C
  [293.66, 369.99, 440.00], // D
  [174.61, 220.00, 261.63], // F
];

const playHoverSound = (index: number) => {
  try {
    if (typeof window === 'undefined') return;
    
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const chord = chords[index % chords.length];

    // Master gain and filter for a warm, soft piano feel
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.08; // Barely perceptible overall volume
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350; // Cut off high frequencies for a very muffled, ambient sound
    filter.Q.value = 0.5;

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    chord.forEach((freq, i) => {
      const osc = audioCtx!.createOscillator();
      const gainNode = audioCtx!.createGain();

      // Sine wave for the purest, softest tone
      osc.type = 'sine';
      
      // Slight detune for a warm, chorus-like calming effect
      osc.detune.value = (i - 1) * 4; 
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime);

      // Soft piano envelope - extremely ambient
      gainNode.gain.setValueAtTime(0, audioCtx!.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, audioCtx!.currentTime + 0.3); // Very gentle, slow attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx!.currentTime + 6.0); // Extremely long, smooth decay

      osc.connect(gainNode);

      // Stereo panning for ear-canal stimulation (ASMR-like)
      if (typeof audioCtx!.createStereoPanner === 'function') {
        const panner = audioCtx!.createStereoPanner();
        panner.pan.value = (i === 0) ? -0.6 : (i === 2) ? 0.6 : 0; // Slightly wider panning
        gainNode.connect(panner);
        panner.connect(masterGain);
      } else {
        gainNode.connect(masterGain);
      }

      osc.start(audioCtx!.currentTime);
      osc.stop(audioCtx!.currentTime + 6.0);
    });
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

const playDeepContemplatingSound = () => {
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
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, audioCtx.currentTime); // Deeper low frequency
    osc.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 1.5);
    
    // Heartbeat-like volume envelope (lub-dub) - more subtle
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.1); // lub
    gainNode.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 0.3);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.4); // dub
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export default function Portfolio() {
  const [projects, setProjects] = useState(initialProjectsData);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ben.poersch@dyai.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Scroll-based animations for the portrait
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 1000], [0, 150]);
  const imageOpacity = useTransform(scrollY, [0, 800], [0.9, 0.2]);

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
          expandedCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [expandedProject]);

  return (
    <div className="min-h-screen bg-transparent text-blue-50/90 font-sans selection:bg-[#D4AF37]/30">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0a1128] via-[#050B14] to-[#02040a] opacity-90"></div>

      {/* Unconventional Portrait Integration - Cinematic & Editorial */}
      <motion.div 
        style={{ y: imageY, opacity: imageOpacity }}
        className="fixed top-0 left-0 w-[120vw] md:w-[65vw] h-[110vh] z-0 pointer-events-none"
      >
        <Image
          src="/Portrait.jpg"
          alt="Benjamin Poersch"
          fill
          className="object-cover object-[center_top] md:object-[left_top]"
          priority
        />
        {/* Editorial Gradients: Fading out to the right and bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050B14]/60 to-[#050B14] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050B14] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/50 via-transparent to-transparent z-10"></div>
      </motion.div>

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

          <motion.div variants={fadeIn} className="space-y-6 bg-[#050B14]/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-white/10 max-w-4xl shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-blue-200">
              Benjamin Poersch
            </h1>
            <h2 className="text-lg md:text-xl text-[#D4AF37] font-normal tracking-widest uppercase">
              LLM Integration Consultant | Hybrid Leadership in Agentic Framework | Vibe Coding | Digital Product Creator
            </h2>
            <p className="text-2xl md:text-3xl font-normal text-blue-100/90 max-w-3xl leading-relaxed pt-4">
              Ich entdecke und designe heute, was Unternehmen morgen als Standard verwenden.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-6">
            <Link href="mailto:ben.poersch@dyai.app" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
              <Mail className="w-4 h-4" />
              <span className="text-sm">ben.poersch@dyai.app</span>
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
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group p-8 rounded-2xl bg-[#0A101D]/80 border border-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 hover:bg-yellow-50 transition-colors duration-300"
          >
            <h3 className="text-sm font-mono text-[#D4AF37] group-hover:text-yellow-800 mb-4 uppercase tracking-wider transition-colors duration-300">Summary</h3>
            <div className="space-y-4 text-blue-100/90 group-hover:text-slate-900 font-normal leading-relaxed transition-colors duration-300">
              <p>
                AI researcher, builder, and former agile coach with a deep background in organizational change. Today, my focus is entirely on exploring the frontier of artificial intelligence, prototyping new tools, and sharing that knowledge.
              </p>
              <p>
                Driven by intense curiosity, I have self-taught the intricacies of how Large Language Models (LLMs) actually work, the methods for effective human-machine collaboration, and the real risks and limitations involved. I am dedicated to supporting anyone—individuals, creators, or professionals—who wants to demystify AI and learn how to interact with these systems meaningfully.
              </p>
              <p>
                My work combines continuous experimentation with hands-on product building. I test, research, and prototype the AI applications of tomorrow, turning emerging capabilities into practical insights and real workflows.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group p-8 rounded-2xl bg-[#0A101D]/80 border border-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 hover:bg-blue-50 transition-colors duration-300"
          >
            <h3 className="text-sm font-mono text-blue-200 group-hover:text-blue-800 mb-4 uppercase tracking-wider transition-colors duration-300">Mission</h3>
            <div className="space-y-4 text-blue-100/90 group-hover:text-slate-900 font-normal leading-relaxed transition-colors duration-300">
              <p>
                For many years, I guided companies through agile transformation and organizational development. Today, my mission is more direct: empowering people to understand, test, and apply artificial intelligence in their own contexts.
              </p>
              <p>
                I believe that AI should not be an abstract concept. My goal is to break down how these models truly function, highlight the genuine challenges and dangers, and share practical methods for collaborating with machines—methods I have rigorously tested and developed myself.
              </p>
              <p>
                What drives me is creation and empowerment. I build and experiment because I want to shape what comes next. I work with real commitment to uncover how we can use AI as a true work-companion, sharing my insights with anyone ready to learn.
              </p>
            </div>
          </motion.div>
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
              <motion.div 
                onMouseEnter={playDeepContemplatingSound}
                whileHover={{
                  scale: [1, 1.01, 1, 1.015, 1.005],
                  boxShadow: [
                    "0 0 30px -10px rgba(212,175,55,0.2)",
                    "0 0 35px 0px rgba(212,175,55,0.4)",
                    "0 0 20px -5px rgba(212,175,55,0.2)",
                    "0 0 35px 0px rgba(212,175,55,0.4)",
                    "0 0 30px -5px rgba(212,175,55,0.3)"
                  ],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/90 border border-[#D4AF37]/30 backdrop-blur-lg shadow-[0_0_30px_-10px_rgba(212,175,55,0.2)] hover:bg-[#0A101D] transition-colors"
              >
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-[#D4AF37] font-mono text-sm tracking-wide">Feb 2025 - Present</span>
                  <h4 className="text-xl font-serif font-light text-blue-50">Senior Agile Coach | AI building/research Pionier | Vibe Coding developer</h4>
                  <span className="text-blue-200/60 font-light">DYAI - Design your augmented intelligence</span>
                </div>
                <ul className="space-y-2 text-sm text-blue-100/80 font-light list-disc list-inside marker:text-[#D4AF37]">
                  <li>Shifting from Agile to AI Leadership</li>
                  <li>Agentic network as work-companions from tomorrow</li>
                  <li>Prototyping AI tool/software</li>
                </ul>
              </motion.div>
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
              <motion.div 
                onMouseEnter={playDeepContemplatingSound}
                whileHover={{
                  scale: [1, 1.01, 1, 1.015, 1.005],
                  boxShadow: [
                    "0 0 0px 0px rgba(59,130,246,0)",
                    "0 0 35px 0px rgba(59,130,246,0.3)",
                    "0 0 20px -5px rgba(59,130,246,0.15)",
                    "0 0 35px 0px rgba(59,130,246,0.3)",
                    "0 0 30px -5px rgba(59,130,246,0.2)"
                  ],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/60 border border-blue-500/20 backdrop-blur-lg hover:border-blue-500/40 transition-colors"
              >
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-400 font-mono text-sm">Feb 2020 - Jan 2025</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Senior Agile Coach | Agile Coach Qualification Facilitator | Founder</h4>
                  <span className="text-blue-200/60 font-light">DIYrigent GmbH / Poersch Holding GmbH</span>
                </div>
                <ul className="space-y-2 text-sm text-blue-100/80 font-light list-disc list-inside marker:text-blue-500/50">
                  <li>Founded and led an independent business focused originally on agile transformation, coaching and organizational change</li>
                  <li>Trained project managers to agile coaches</li>
                  <li>Agile Transformation management</li>
                  <li>CEO and shareholder consultation for agile</li>
                </ul>
              </motion.div>
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
              <motion.div 
                onMouseEnter={playDeepContemplatingSound}
                whileHover={{
                  scale: [1, 1.01, 1, 1.015, 1.005],
                  boxShadow: [
                    "0 0 0px 0px rgba(59,130,246,0)",
                    "0 0 35px 0px rgba(59,130,246,0.3)",
                    "0 0 20px -5px rgba(59,130,246,0.15)",
                    "0 0 35px 0px rgba(59,130,246,0.3)",
                    "0 0 30px -5px rgba(59,130,246,0.2)"
                  ],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/60 border border-blue-500/20 backdrop-blur-lg hover:border-blue-500/40 transition-colors"
              >
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-400 font-mono text-sm">2016 - 2020</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Agile Coach and Scrum Master</h4>
                  <span className="text-blue-200/60 font-light">Freelance | Berlin</span>
                </div>
                <ul className="space-y-2 text-sm text-blue-100/80 font-light list-disc list-inside marker:text-blue-500/50">
                  <li>Supported multiple organizations in introducing agile ways of working across teams and leadership environments</li>
                  <li>Guided organizational change, team development and practical adoption of Scrum and related methods</li>
                </ul>
              </motion.div>
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
              <motion.div 
                onMouseEnter={playDeepContemplatingSound}
                whileHover={{
                  scale: [1, 1.01, 1, 1.015, 1.005],
                  boxShadow: [
                    "0 0 0px 0px rgba(255,255,255,0)",
                    "0 0 35px 0px rgba(255,255,255,0.15)",
                    "0 0 20px -5px rgba(255,255,255,0.08)",
                    "0 0 35px 0px rgba(255,255,255,0.15)",
                    "0 0 30px -5px rgba(255,255,255,0.1)"
                  ],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/50 border border-white/10 backdrop-blur-lg hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-200/40 font-mono text-sm">2016</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Agile Consultant and Scrum Master</h4>
                  <span className="text-blue-200/60 font-light">it-agile GmbH | Hamburg</span>
                </div>
                <p className="text-sm text-blue-100/90 font-normal">Advised mid-sized companies on agile implementation, facilitation and change processes.</p>
              </motion.div>
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
              <motion.div 
                onMouseEnter={playDeepContemplatingSound}
                whileHover={{
                  scale: [1, 1.01, 1, 1.015, 1.005],
                  boxShadow: [
                    "0 0 0px 0px rgba(255,255,255,0)",
                    "0 0 35px 0px rgba(255,255,255,0.15)",
                    "0 0 20px -5px rgba(255,255,255,0.08)",
                    "0 0 35px 0px rgba(255,255,255,0.15)",
                    "0 0 30px -5px rgba(255,255,255,0.1)"
                  ],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/50 border border-white/10 backdrop-blur-lg hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-200/40 font-mono text-sm">2013 - 2015</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">Agile Coach / Scrum Master / QA Engineer</h4>
                  <span className="text-blue-200/60 font-light">eSailors IT Solutions GmbH | Hamburg</span>
                </div>
                <p className="text-sm text-blue-100/90 font-normal">Supported software teams in delivery, coaching and agile process execution.</p>
              </motion.div>
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
              <motion.div 
                onMouseEnter={playDeepContemplatingSound}
                whileHover={{
                  scale: [1, 1.01, 1, 1.015, 1.005],
                  boxShadow: [
                    "0 0 0px 0px rgba(255,255,255,0)",
                    "0 0 35px 0px rgba(255,255,255,0.15)",
                    "0 0 20px -5px rgba(255,255,255,0.08)",
                    "0 0 35px 0px rgba(255,255,255,0.15)",
                    "0 0 30px -5px rgba(255,255,255,0.1)"
                  ],
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/50 border border-white/10 backdrop-blur-lg hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col space-y-1 mb-4">
                  <span className="text-blue-200/40 font-mono text-sm">2011 - 2013</span>
                  <h4 className="text-lg font-serif font-light text-blue-50">QA Engineer</h4>
                  <span className="text-blue-200/60 font-light">BigPoint GmbH | Hamburg</span>
                </div>
                <p className="text-sm text-blue-100/90 font-normal">Supported software teams in delivery live production online browser games.</p>
              </motion.div>
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
                    if (!isExpanded) playHoverSound(index);
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => !isExpanded && setExpandedProject(project.name)}
                  whileHover={!isExpanded ? { scale: 1.02, y: -4 } : {}}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`group text-left block w-full p-6 rounded-2xl bg-[#0A101D]/80 backdrop-blur-xl transition-all duration-500 overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]
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
                  {/* Inner top highlight for 3D glass effect */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Bottom warm glow inside the card */}
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
                          onClick={(e) => { e.stopPropagation(); setExpandedProject(null); }}
                          className="p-2 text-blue-200/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
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
                          <div className="p-2 -m-2">
                            <ExternalLink className="w-4 h-4 text-blue-200/30 group-hover:text-[#D4AF37] transition-colors" />
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {isEditing ? (
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-blue-200/50" />
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full bg-[#050B14]/50 border border-white/10 rounded px-2 py-1 text-xl font-serif font-light text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    ) : (
                      <motion.h4 layout className="flex items-center gap-2 text-xl font-serif font-light text-blue-50 group-hover:text-white transition-colors mb-2">
                        <Icon 
                          className="w-5 h-5 transition-colors" 
                          style={{ color: isHovered || isExpanded ? `rgb(${project.color || '212, 175, 55'})` : 'rgba(191, 219, 254, 0.5)' }} 
                        />
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
                        <motion.p layout className="text-sm font-normal text-blue-100/80 inline">
                          {project.desc}
                        </motion.p>
                        {!isExpanded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedProject(project.name);
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
                                <p className="text-blue-100/90 font-normal leading-relaxed">
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

                            <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-end gap-3 sm:gap-4">
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
                            </div>
                          </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <motion.div layout className="mt-4 text-xs font-mono text-[#D4AF37]/70 truncate">
                        {project.url.replace('https://', '')}
                      </motion.div>
                    )}
                    
                    {/* Render subLinks for Zodiac if they exist */}
                    {project.subLinks && (
                      <motion.div layout className="mt-4 space-y-2">
                        {project.subLinks.map((link: any, i: number) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="block text-sm font-light text-blue-200/60 hover:text-[#D4AF37] transition-colors border-l-2 border-white/10 hover:border-[#D4AF37] pl-3 py-1"
                          >
                            <span className="text-white/80 font-normal">{link.label}:</span> {link.url.replace('https://', '')}
                          </a>
                        ))}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  name: 'BeCoin_EcoSim_LLM', 
                  url: 'https://github.com/DYAI2025/BeCoin_EcoSim_LLM.git',
                  desc: 'An experiment exploring agentic motivation behavior patterns. It focuses on the core motivation of survival and how AI agents organize themselves within groups to ensure collective survival.'
                },
                { 
                  name: 'Whatsorga', 
                  url: 'https://github.com/DYAI2025/Whatsorga.git',
                  desc: 'A browser extension that captures specific chats into a vector database. It uses an LLM to interpret context, learn personal communication patterns, and automatically sync appointments or reminders to your calendar.'
                },
                { 
                  name: '3DSolarSystem_animation', 
                  url: 'https://github.com/DYAI2025/3DSolarSystem_animation.git',
                  desc: 'An interactive 3D animation of the solar system demonstrating advanced web-based rendering capabilities.'
                },
              ].map((repo) => (
                <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="flex flex-col p-5 rounded-xl bg-[#0A101D]/80 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.1)]">
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
              {['LLM-Pipelines', 'Semantic Marker Framework', 'AI-Workflows', 'Prompt Engineering', 'Product Building', 'API Integration', 'Rapid Prototyping', 'Next.js', 'React', 'Agent Networks', 'Agent Architecture', 'Markdown', 'LLM Training', 'Fine-Tuning'].map(skill => (
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
            Ready to translate emerging AI capabilities into real products and workflows? Let&apos;s connect.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <a href="mailto:ben.poersch@dyai.app" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#050B14] font-medium hover:bg-[#F3E5AB] transition-colors">
                <Mail className="w-5 h-5 mr-3" />
                ben.poersch@dyai.app
              </a>
              <button 
                onClick={handleCopyEmail}
                className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-blue-200 flex items-center justify-center relative group"
                title="Copy email address"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#050B14] border border-white/10 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {copied ? 'Copied!' : 'Copy email'}
                </span>
              </button>
            </div>
            <a href="https://linkedin.com/in/benjamin-poersch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-blue-50 font-light hover:bg-white/5 border border-white/20 transition-colors">
              <Linkedin className="w-5 h-5 mr-3" />
              Connect on LinkedIn
            </a>
            <a 
              href="/resume.pdf" 
              download 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#050B14] border border-white/20 hover:border-[#D4AF37] font-medium transition-all duration-300"
            >
              <FileDown className="w-5 h-5 mr-3" />
              Download CV
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
