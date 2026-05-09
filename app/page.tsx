'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { MapPin, Mail, Github, Linkedin, ExternalLink, Terminal, Code2, Workflow, GitBranch, Cpu, LineChart, Layers, Zap, Server, Database, X, Edit2, Check, Copy, Mic, FileDown, ChevronDown, ChevronUp, Hammer, Anchor, ArrowRight } from 'lucide-react';
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
    desc: 'Design your augmented intelligence - KI-Integration der nächsten Generation.',
    fullDesc: "DYAI repräsentiert die Verschmelzung von menschlicher Kreativität und maschineller Präzision. Es ist ein Framework für 'Augmented Intelligence', das zeigt, wie KI nahtlos in moderne Workflows integriert werden kann, um echte Mehrwerte zu schaffen.",
    tech: ['LLMs', 'Python', 'FastAPI', 'React'],
    highlight: true,
    icon: Hammer,
    color: '59, 130, 246', // blue-500
    media: {
      type: 'image',
      url: '/dyai.jpg'
    },
    subLinks: []
  },
  {
    name: 'Bazodiac',
    url: 'https://bazodiac.space',
    desc: 'Astrologie trifft NASA-Präzision - ein interaktives KI-Erlebnis.',
    fullDesc: 'Eine Plattform, die astrologische Daten mit modernsten KI-Modellen kombiniert, um personalisierte Trajektorien und Einsichten zu liefern. Hier wird Technik zur Magie.',
    tech: ['React', 'API Integration', 'Framer Motion', 'D3.js'],
    highlight: false,
    icon: Hammer,
    color: '168, 85, 247', // purple-500
    media: {
      type: 'image',
      url: '/bazodiac.jpeg'
    },
    subLinks: []
  },
  {
    name: 'Sky',
    url: 'https://sky.bazodiac.space',
    desc: 'Der interaktive Einstiegstrichter für die Bazodiac-Plattform.',
    fullDesc: 'Ein hochdynamischer Funnel, der Nutzer durch eine visuell beeindruckende Reise führt, um ihre astrologischen Parameter zu erfassen und für die KI vorzubereiten.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind'],
    highlight: false,
    icon: Hammer,
    color: '59, 130, 246',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000'
    },
    subLinks: []
  },
  {
    name: 'Insight',
    url: 'https://insight.bazodiac.space',
    desc: 'Deep-Dive Analysen und semantische Auswertungen für Bazodiac-Nutzer.',
    fullDesc: 'Dieses Modul nutzt LLMs, um komplexe astrologische Konstellationen in verständliche, wertvolle Texte zu übersetzen. Semantische Präzision trifft auf Nutzerzentrierung.',
    tech: ['LLMs', 'Prompt Engineering', 'React'],
    highlight: false,
    icon: Hammer,
    color: '16, 185, 129',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1000'
    },
    subLinks: []
  },
  {
    name: 'Lumina',
    url: '#',
    desc: 'Visuelle Intelligenz und atmosphärisches KI-Design.',
    fullDesc: 'Ein experimentelles Projekt zur Erforschung von KI-generierten visuellen Atmospären, die sich dynamisch an Nutzerzustände anpassen.',
    tech: ['Generative AI', 'React', 'Three.js'],
    highlight: false,
    icon: Hammer,
    color: '251, 191, 36',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000'
    },
    subLinks: []
  },
  {
    name: 'CoupleTimer',
    url: 'https://coupletimer.site/',
    desc: 'Ein digitales Framework für Beziehungsarbeit und bessere Partnerschaft.',
    fullDesc: 'Ein leichtgewichtige, fokussierte Anwendung, die Paaren hilft, Pläne zu synchronisieren und gemeinsame Zeit bewusst zu managen.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    highlight: false,
    icon: Hammer,
    color: '244, 63, 94', // rose-500
    media: {
      type: 'video',
      url: 'https://media.dyai.cloud/uploads/2026/03/7a6d07a3-98f1-41b9-b5c2-68168467368f.mp4'
    },
    subLinks: []
  },
  {
    name: 'OpenClawMD',
    url: '#',
    desc: 'Open Source Markdown-Editor mit KI-gestützter Strukturierung.',
    fullDesc: 'Ein Tool für Entwickler und Autoren, um Markdown-Dokumente effizienter zu schreiben und durch KI-Vorschläge automatisch zu strukturieren.',
    tech: ['Monaco Editor', 'React', 'Open Source'],
    highlight: false,
    icon: Hammer,
    color: '107, 114, 128',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000'
    },
    subLinks: []
  },
  {
    name: 'Prompt',
    url: 'https://prompt.machinetool.site/',
    desc: 'Erweiterte Prompt-Schmiede für präzise KI-Ergebnisse.',
    fullDesc: 'Eine spezialisierte Arbeitsumgebung zur Verfeinerung und zum Testen komplexer Prompts für verschiedene Sprachmodelle.',
    tech: ['Prompt Engineering', 'Next.js', 'OpenAI API'],
    highlight: false,
    icon: Hammer,
    color: '245, 158, 11', // amber-500
    media: {
      type: 'video',
      url: '/prompt.mp4'
    },
    subLinks: []
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
    <motion.div layout className={`relative w-full mb-6 rounded-xl overflow-hidden border border-border-theme bg-bg-alt shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-500 ${isExpanded ? 'h-64 md:h-96' : 'h-48'}`}>
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
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-gold)] via-transparent to-transparent animate-pulse" />
          <div className="z-10 flex flex-col items-center">
            <Mic className="w-12 h-12 text-gold mb-4 opacity-80" />
            <p className="text-sm font-light text-text-muted text-center px-4">
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
        <Image
          src={project.media.url}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
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
  const [showEcosystem, setShowEcosystem] = useState(false);
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

  // Sticky Timeline Progress
  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);
  const activeStepValue = useTransform(scrollYProgress, [0.1, 0.35, 0.6, 0.85], [0, 1, 2, 3]);

  useMotionValueEvent(activeStepValue, "change", (latest) => {
    const rounded = Math.round(latest);
    if (rounded !== activeStep) {
      setActiveStep(rounded);
    }
  });

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
        setShowEcosystem(false);
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
    <div className="min-h-screen bg-transparent text-text font-sans selection:bg-gold/30">
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
          <motion.div variants={fadeIn} className="flex items-center space-x-3 text-sm font-mono text-text-muted">
            <div className="flex items-center px-4 py-1.5 rounded-full bg-bg/50 border border-gold/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="tracking-widest uppercase text-[10px] text-gold">Berlin | Building the future of work</span>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-6 bg-bg/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl border border-border-theme max-w-4xl shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-text">
              Benjamin Poersch
            </h1>
            <h2 className="text-lg md:text-xl text-gold font-normal tracking-widest uppercase">
              LLM Integration Consultant | Hybrid Leadership in Agentic Framework | Vibe Coding | Digital Product Creator
            </h2>
            <p className="text-2xl md:text-3xl font-normal text-text-muted max-w-3xl leading-relaxed pt-4">
              Ich entdecke und designe heute, was Unternehmen morgen als Standard verwenden.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-6">
            <Link href="mailto:ben.poersch@dyai.app" className="flex items-center space-x-2 text-text-muted hover:text-gold transition-colors font-light tracking-wide">
              <Mail className="w-4 h-4" />
              <span className="text-sm">ben.poersch@dyai.app</span>
            </Link>
            <Link href="https://linkedin.com/in/benjamin-poersch" target="_blank" className="flex items-center space-x-2 text-text-muted hover:text-gold transition-colors font-light tracking-wide">
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </Link>
            <Link href="https://github.com/DYAI2025" target="_blank" className="flex items-center space-x-2 text-text-muted hover:text-gold transition-colors font-light tracking-wide">
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
            className="group p-8 rounded-2xl bg-bg-alt/80 border border-border-theme backdrop-blur-lg shadow-2xl shadow-black/50 hover:bg-yellow-50 transition-colors duration-300"
          >
            <h3 className="text-sm font-mono text-gold group-hover:text-yellow-800 mb-4 uppercase tracking-wider transition-colors duration-300">Summary</h3>
            <div className="space-y-4 text-text-muted group-hover:text-slate-900 font-normal leading-relaxed transition-colors duration-300">
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
            className="group p-8 rounded-2xl bg-bg-alt/80 border border-border-theme backdrop-blur-lg shadow-2xl shadow-black/50 hover:bg-bg-base transition-colors duration-300"
          >
            <h3 className="text-sm font-mono text-text-muted group-hover:text-text mb-4 uppercase tracking-wider transition-colors duration-300">Mission</h3>
            <div className="space-y-4 text-text-muted group-hover:text-slate-900 font-normal leading-relaxed transition-colors duration-300">
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

        {/* BERUFSERFAHRUNG STICKY SCROLL SECTION */}
        <section 
          ref={timelineRef}
          className="relative h-[400vh] mt-24 hidden md:block"
        >
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
            {/* Background Narrative Lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-bg-base overflow-hidden">
              <motion.div 
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30" 
              />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-12 gap-12 items-center">
              {/* Left Side: Meta & Progress */}
              <div className="col-span-4 space-y-12">
                <div className="relative">
                  <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
                    className="mb-12"
                  >
                    <h3 className="text-4xl font-serif font-light text-text flex items-center">
                      <Workflow className="w-8 h-8 mr-4 text-gold" />
                      Berufserfahrung
                    </h3>
                    <p className="text-text-muted font-light mt-4 text-sm max-w-xs">
                      Ein dynamischer Pfad von IT-Qualität und Agilität hin zu KI-gestützter Produktvision.
                    </p>
                  </motion.div>
                  
                  {/* Progress Indicator */}
                  <div className="flex flex-col gap-10 border-l border-border-theme pl-8 relative">
                    {[
                      { y: "2020-2025", era: "AI Builder Era", range: [0, 0.25] },
                      { y: "2016-2020", era: "Freelance Transformation", range: [0.25, 0.5] },
                      { y: "2016", era: "Strategic Consulting", range: [0.5, 0.75] },
                      { y: "2011-2015", era: "Technical Foundation", range: [0.75, 1] }
                    ].map((step, i) => (
                      <motion.div 
                        key={i}
                        style={{ 
                          opacity: useTransform(scrollYProgress, 
                            [Math.max(0, step.range[0] - 0.1), Math.max(0.001, step.range[0]), Math.min(0.999, step.range[1]), Math.min(1, step.range[1] + 0.1)], 
                            [0.15, 1, 1, 0.15]
                          ),
                          x: useTransform(scrollYProgress,
                            [Math.max(0, step.range[0] - 0.1), Math.max(0.001, step.range[0]), Math.min(0.999, step.range[1]), Math.min(1, step.range[1] + 0.1)],
                            [0, 8, 8, 0]
                          )
                        }}
                        className="group relative"
                      >
                        <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-gold mb-1">{step.y}</span>
                        <span className="block text-2xl font-serif text-text">{step.era}</span>
                      </motion.div>
                    ))}
                    
                    {/* Active Indicator Bar */}
                    <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-bg-base" />
                    <motion.div 
                      style={{ 
                        height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                        top: 0
                      }}
                      className="absolute left-[-1px] w-[2px] bg-gold shadow-[0_0_15px_var(--color-gold)]" 
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Content Cards */}
              <div className="col-span-8 relative h-[600px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {/* AI BUILDER ERA */}
                  {activeStep === 0 && (
                    <motion.div
                      key="era-ai"
                      initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="grid grid-cols-2 gap-12 w-full">
                        <div className="space-y-8">
                          <div className="inline-block px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-mono text-gold uppercase tracking-[0.3em]">
                            Active Era
                          </div>
                          <h4 className="text-6xl font-serif font-light text-text leading-[0.9]">
                            Independent <span className="text-gold">AI Builder</span> | Advisor
                          </h4>
                          <p className="text-text-muted font-light text-xl leading-relaxed">
                            Integration von LLMs in reale Workflows. Bau von Agenten, die nicht nur reden, sondern handeln.
                          </p>
                          <div className="flex flex-wrap gap-4">
                             <div className="flex items-center gap-2 p-4 rounded-xl bg-bg-base border border-border-theme hover:border-gold/30 transition-all">
                                <Zap className="w-5 h-5 text-gold" />
                                <span className="text-sm font-light text-text">Vibe Coding</span>
                             </div>
                             <div className="flex items-center gap-2 p-4 rounded-xl bg-bg-base border border-border-theme hover:border-gold/30 transition-all">
                                <Code2 className="w-5 h-5 text-gold" />
                                <span className="text-sm font-light text-text">Custom GenAI Apps</span>
                             </div>
                          </div>
                        </div>
                        <div className="relative aspect-square">
                          <motion.div 
                            style={{ 
                              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                            }}
                            className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/10 to-transparent rounded-3xl overflow-hidden border border-border-theme"
                          >
                             <motion.div 
                               animate={{ rotate: 360 }}
                               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                               className="absolute inset-0 flex items-center justify-center opacity-10"
                             >
                               <motion.div
                                 initial={{ scale: 1 }}
                                 animate={{ scale: 1.2 }}
                                 transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                               >
                                  <Zap className="w-[80%] h-[80%] text-gold" strokeWidth={0.2} />
                               </motion.div>
                             </motion.div>
                          </motion.div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-3/4 p-8 rounded-2xl bg-bg-alt/80 border border-border-theme backdrop-blur-3xl shadow-2xl">
                               <Anchor className="w-10 h-10 text-gold mb-6" />
                               <h5 className="text-lg font-medium text-text mb-2">DIYrigent / Poersch Holding</h5>
                               <p className="text-sm text-text-muted leading-relaxed font-light">
                                 Strategische KI-Beratung und Produkt-Building. Fokus auf Agentic Frameworks (LangChain, AutoGen).
                               </p>
                             </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FREELANCE ERA */}
                  {activeStep === 1 && (
                    <motion.div
                      key="era-freelance"
                      initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="grid grid-cols-2 gap-12 w-full">
                        <div className="space-y-8">
                          <div className="inline-block px-4 py-1 rounded-full bg-bg-base border border-border-theme text-[10px] font-mono text-text-muted uppercase tracking-[0.3em]">
                            Transformation Era
                          </div>
                          <h4 className="text-6xl font-serif font-light text-text leading-[0.9]">
                            Agile Coach | <span className="text-text-muted">Scrum Master</span>
                          </h4>
                          <p className="text-text-muted font-light text-xl leading-relaxed">
                            Moderation komplexer Prozesse und Befähigung von Teams in radikalen Change-Situationen.
                          </p>
                          <div className="space-y-2">
                             <p className="text-sm text-text-muted border-l border-border-theme pl-4">Begleitung von Transformationen bei DAX-Konzernen.</p>
                             <p className="text-sm text-text-muted border-l border-border-theme pl-4">Coaching für Führungskräfte in flachen Hierarchien.</p>
                          </div>
                        </div>
                        <div className="relative aspect-square">
                           <div className="absolute inset-0 rounded-3xl bg-bg-alt border border-border-theme flex items-center justify-center">
                              <GitBranch className="w-32 h-32 text-text-muted/10" />
                              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4 opacity-10">
                                 {[...Array(64)].map((_, i) => (
                                    <motion.div 
                                      key={i}
                                      initial={{ opacity: 0.1 }}
                                      animate={{ opacity: 0.5 }}
                                      transition={{ duration: 1, delay: i * 0.05, repeat: Infinity, repeatType: "reverse" }}
                                      className="bg-text-muted h-1 w-1 rounded-full" 
                                    />
                                 ))}
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* CONSULTING */}
                  {activeStep === 2 && (
                    <motion.div
                      key="era-consulting"
                      initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="grid grid-cols-2 gap-12 w-full">
                        <div className="space-y-8">
                          <div className="inline-block px-4 py-1 rounded-full bg-bg-base border border-border-theme text-[10px] font-mono text-text-muted uppercase tracking-[0.3em]">
                            Strategic Roots
                          </div>
                          <h4 className="text-6xl font-serif font-light text-text leading-[0.9]">
                            Agile <span className="text-text-muted">Consultant</span>
                          </h4>
                          <span className="block text-xl font-light text-text-muted italic">it-agile GmbH</span>
                          <p className="text-text-muted font-light text-lg leading-relaxed">
                            Systemische Beratung für den hanseatischen Mittelstand. Entwicklung von Methodensets für nachhaltiges Wachstum.
                          </p>
                        </div>
                        <div className="bg-bg-base border border-border-theme rounded-3xl flex items-center justify-center p-12">
                           <Layers className="w-24 h-24 text-text-muted" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FOUNDATION */}
                  {activeStep === 3 && (
                    <motion.div
                      key="era-foundation"
                      initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="grid grid-cols-2 gap-12 w-full">
                        <div className="space-y-8">
                          <div className="inline-block px-4 py-1 rounded-full bg-bg-base border border-border-theme text-[10px] font-mono text-text-muted uppercase tracking-[0.3em]">
                            Quality Origins
                          </div>
                          <h4 className="text-6xl font-serif font-light text-text leading-[0.9]">
                            QA <span className="text-text-muted">Engineer</span>
                          </h4>
                          <span className="block text-xl font-light text-text-muted italic">eSailors | BigPoint</span>
                          <p className="text-text-muted font-light text-lg leading-relaxed">
                            Wurzeln in der technischen Qualitätssicherung. Verständnis für komplexe Systeme und Fehlertoleranz in hochskalierten Apps.
                          </p>
                        </div>
                        <div className="bg-bg-base border border-border-theme rounded-3xl flex items-center justify-center p-12">
                           <Terminal className="w-24 h-24 text-text-muted" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE TIMELINE (Simplified) */}
        <motion.section
          id="timeline-mobile"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden mt-24 mb-32 px-6"
        >
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-light text-text flex items-center">
              <Workflow className="w-6 h-6 mr-3 text-gold" />
              Berufserfahrung
            </h3>
          </div>
          
          <div className="space-y-10 relative before:absolute before:left-5 before:top-0 before:bottom-0 before:w-px before:bg-gold/20">
            {[
              { 
                date: "2020 - Heute", 
                role: "Independent AI Builder", 
                company: "DIYrigent / Poersch Holding",
                desc: "KI-Integration & Agentic Frameworks.",
                icon: Zap 
              },
              { 
                date: "2016 - 2020", 
                role: "Agile Coach & Scrum Master", 
                company: "Freelance",
                desc: "Agile Transformation im Konzernumfeld.",
                icon: GitBranch 
              },
              { 
                date: "2011 - 2015", 
                role: "Consulting & QA", 
                company: "it-agile | eSailors | BigPoint",
                desc: "Qualitätssicherung & Agile Beratung.",
                icon: Terminal 
              }
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-bg-alt border border-gold/40 flex items-center justify-center z-10">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gold uppercase tracking-widest">{step.date}</span>
                    <h4 className="text-xl font-serif text-text mt-1">{step.role}</h4>
                    <span className="text-xs text-text-muted block mt-0.5">{step.company}</span>
                    <p className="text-sm text-text-muted mt-4 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>


        {/* SELECTED AI & DIGITAL PROJECTS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-serif font-light text-text flex items-center">
                <Hammer className="w-6 h-6 mr-3 text-gold" />
                Selected AI & Digital Projects
              </h3>
              <p className="text-text-muted mt-3 max-w-2xl font-light">
                Portfolio unabhängiger digitaler und KI-gesteuerter Produkte. Benjamin schafft Werkzeuge, die die Grenze zwischen Inspiration und Realisation verwischen.
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-light transition-all duration-300 ${isEditing ? 'bg-gold border-gold text-[#050B14] hover:bg-[#F3E5AB]' : 'bg-transparent border-gold/30 text-gold hover:bg-gold/10'}`}
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              <span>{isEditing ? 'Done Editing' : 'Edit Content'}</span>
            </button>
          </div>

          <motion.div layout className="flex flex-col border-t border-border-theme">
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
                  onClick={() => {
                    if (!isExpanded) {
                      setExpandedProject(project.name);
                      setShowEcosystem(false);
                    }
                  }}
                  className={`group relative transition-all duration-500
                    ${isExpanded 
                      ? 'bg-bg-alt z-20 py-12 px-6 md:px-12 rounded-3xl my-8 border border-gold/30 shadow-2xl overflow-hidden' 
                      : 'border-b border-border-theme hover:bg-bg-base cursor-pointer z-10'}
                  `}
                >
                  {/* Animated Border Line for Hover */}
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isHovered && !isExpanded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent origin-center z-20"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative z-10">
                    {!isExpanded ? (
                      <div className="flex items-center justify-between py-10 md:py-14 pr-4">
                        <div className="flex items-center gap-6 md:gap-16 flex-1 min-w-0">
                          {/* Project Index */}
                          <div className="hidden sm:block">
                            <span className={`font-mono text-sm transition-all duration-500 ${isHovered ? 'text-text-muted' : 'text-text-muted'}`}>
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                          </div>

                          {/* Title & Description Container */}
                          <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-12 transition-transform duration-500 ease-[0.22, 1, 0.36, 1] ${isHovered ? 'translate-x-4 md:translate-x-8' : 'translate-x-0'}`}>
                            {isEditing ? (
                              <div className="flex flex-col gap-2">
                                <input
                                  type="text"
                                  value={project.name}
                                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-transparent border-b border-border-theme text-3xl font-serif text-text focus:border-gold outline-none"
                                />
                                <input
                                  type="text"
                                  value={project.desc}
                                  onChange={(e) => handleProjectChange(index, 'desc', e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-transparent border-b border-border-theme text-sm text-text-muted focus:border-gold outline-none"
                                />
                              </div>
                            ) : (
                              <>
                                <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-text tracking-tight whitespace-nowrap">
                                  {project.name}
                                </h4>
                                <p className={`text-sm md:text-lg text-text-muted font-light max-w-md truncate md:whitespace-normal transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-40'}`}>
                                  {project.desc}
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Slide-in Arrow/Label */}
                        <div className="flex items-center gap-4 overflow-hidden h-12 px-2">
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={isHovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="hidden lg:flex items-center gap-2"
                          >
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-mono whitespace-nowrap">Explore</span>
                          </motion.div>
                          <motion.div
                            animate={isHovered ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex items-center gap-4">
                             <div className="p-3 rounded-xl bg-gold/10 border border-gold/20">
                               <Icon className="w-6 h-6 text-gold" />
                             </div>
                             <div>
                               <h4 className="text-3xl md:text-5xl font-serif font-light text-text">{project.name}</h4>
                               <p className="text-text-muted font-light mt-1">{project.desc}</p>
                             </div>
                          </div>
                          <button
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setExpandedProject(null);
                              setShowEcosystem(false);
                            }}
                            className="p-3 text-text-muted hover:text-text hover:bg-bg-base rounded-full transition-colors border border-border-theme"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        <ProjectMedia project={project} isHovered={true} isExpanded={true} />
                        
                        <div className="grid lg:grid-cols-2 gap-12 mt-12">
                          <div className="space-y-8">
                            <div>
                               <h4 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-4">The Context</h4>
                               {isEditing ? (
                                 <textarea
                                   value={project.fullDesc}
                                   onChange={(e) => handleProjectChange(index, 'fullDesc', e.target.value)}
                                   onClick={(e) => e.stopPropagation()}
                                   rows={6}
                                   className="w-full bg-bg-base border border-border-theme rounded-xl px-4 py-3 text-text-muted font-normal leading-relaxed focus:border-gold outline-none resize-none"
                                 />
                               ) : (
                                 <p className="text-text-muted font-normal leading-relaxed text-lg">
                                   {project.fullDesc}
                                 </p>
                               )}
                            </div>
                            
                            <div>
                               <h4 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-4">Core Stack</h4>
                               {isEditing ? (
                                 <input
                                   type="text"
                                   value={project.tech.join(', ')}
                                   onChange={(e) => handleProjectChange(index, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                                   onClick={(e) => e.stopPropagation()}
                                   className="w-full bg-bg-base border border-border-theme rounded-xl px-4 py-3 text-text-muted focus:border-gold outline-none"
                                   placeholder="Comma-separated tags"
                                 />
                               ) : (
                                 <div className="flex flex-wrap gap-2">
                                   {project.tech.map((t, i) => (
                                     <span key={`${t}-${i}`} className="px-4 py-1.5 rounded-full bg-bg-base border border-border-theme text-text-muted text-sm tracking-wide font-light">
                                       {t}
                                     </span>
                                   ))}
                                 </div>
                               )}
                            </div>
                          </div>

                          <div className="space-y-8">
                            {project.subLinks && project.subLinks.length > 0 && (
                              <div className="p-6 rounded-2xl bg-bg-base border border-border-theme">
                                <h4 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-6 flex items-center gap-2">
                                  <Anchor className="w-4 h-4" />
                                  Ecosystem
                                </h4>
                                <div className="space-y-3">
                                  {project.subLinks.map((link: any, i: number) => (
                                    <a 
                                      key={i} 
                                      href={link.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center group/link p-4 rounded-xl bg-bg-base border border-border-theme hover:border-gold/40 hover:bg-bg-base transition-all"
                                    >
                                      <div className="flex-1">
                                        <div className="text-text group-hover/link:text-gold transition-colors">{link.label}</div>
                                        <div className="text-xs text-text-muted font-mono mt-1">{link.url.replace('https://', '')}</div>
                                      </div>
                                      <ExternalLink className="w-4 h-4 text-text-muted group-hover/link:text-gold transition-colors" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex flex-col gap-4">
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-[#050B14] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] border border-gold bg-gold"
                              >
                                View Demo
                                <ExternalLink className="w-5 h-5" />
                              </a>
                              <a 
                                href="#"
                                onClick={(e) => { e.stopPropagation(); /* TODO: Implement Learn More modal */ }}
                                className="w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-border-theme text-text font-medium hover:bg-bg-base transition-all"
                              >
                                Learn More
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-12">
            <h4 className="text-xl font-serif font-light text-text mb-6 flex items-center">
              <Database className="w-5 h-5 mr-3 text-gold" />
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
                <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="flex flex-col p-5 rounded-xl bg-bg-alt/80 backdrop-blur-md border border-border-theme hover:border-gold/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.1)]">
                  <div className="flex items-center mb-3">
                    <Github className="w-5 h-5 mr-3 text-text-muted group-hover:text-gold transition-colors" />
                    <span className="text-base text-text font-mono font-normal truncate">{repo.name}</span>
                  </div>
                  <p className="text-sm text-text-muted font-normal leading-relaxed pl-8">
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
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0A101D]/80 to-[#050B14]/40 border border-border-theme backdrop-blur-md">
            <div className="flex items-center mb-6">
              <Cpu className="w-6 h-6 mr-3 text-gold" />
              <h3 className="text-2xl font-serif font-light text-text">AI & Integration</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'LLM-Pipelines', level: 95 },
                { name: 'Semantic Marker Framework', level: 90 },
                { name: 'AI-Workflows', level: 95 },
                { name: 'Prompt Engineering', level: 100 },
                { name: 'Product Building', level: 85 },
                { name: 'API Integration', level: 90 },
                { name: 'Rapid Prototyping', level: 95 },
                { name: 'Next.js', level: 80 },
                { name: 'React', level: 85 },
                { name: 'Agent Networks', level: 90 },
                { name: 'Agent Architecture', level: 90 },
                { name: 'Markdown', level: 100 },
                { name: 'LLM Training', level: 75 },
                { name: 'Fine-Tuning', level: 70 }
              ].map(skill => (
                <motion.span 
                  key={skill.name}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                    borderColor: 'rgba(212, 175, 55, 0.4)'
                  }}
                  className="px-4 py-2 rounded-xl bg-gold/5 border border-gold/10 text-gold text-sm font-light tracking-wide cursor-default transition-all duration-300"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0A101D]/80 to-[#050B14]/40 border border-border-theme backdrop-blur-md">
            <div className="flex items-center mb-6">
              <Layers className="w-6 h-6 mr-3 text-text-muted" />
              <h3 className="text-2xl font-serif font-light text-text">Agile Foundation</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Agile Transformation', level: 95 },
                { name: 'Scrum & Kanban', level: 100 },
                { name: 'Leadership Advisory', level: 90 },
                { name: 'Organizational Change', level: 85 },
                { name: 'Team Development', level: 95 },
                { name: 'Process Execution', level: 90 },
                { name: 'Facilitation', level: 95 },
                { name: 'Strategic Guidance', level: 85 }
              ].map(skill => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-text-muted uppercase tracking-wider">
                    <span>{skill.name}</span>
                    <span className="text-text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-blue-500/5 rounded-full overflow-hidden border border-border-theme">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500/40 to-blue-400/60 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-text-muted/20 blur-sm" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* BENJAMIN'S INSIGHTS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 space-y-12"
        >
          <div className="space-y-4">
            <h3 className="text-4xl font-serif font-light text-text">Benjamin's Insights</h3>
            <p className="text-text-muted max-w-2xl font-light text-lg">
              Perspektiven auf die Zukunft der Arbeit, KI-Integration und menschliche Zusammenarbeit in einer technologisch geprägten Welt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-bg-alt border border-border-theme hover:border-gold/40 transition-all duration-300 group">
                <h4 className="text-xl font-serif text-text mb-3">Insight Title {i}</h4>
                <p className="text-text-muted text-sm mb-6 font-light leading-relaxed">
                  Ein kurzer Ausblick auf die sich wandelnde Landschaft der Arbeit, beeinflusst durch KI-Agenten und neue Formen der Kollaboration.
                </p>
                <button className="text-sm text-gold font-mono tracking-wider hover:text-text transition-colors">Read More →</button>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT / FOOTER */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-t border-border-theme text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-text">Lass uns die Zukunft bauen.</h2>
          <p className="text-text-muted max-w-xl mx-auto font-light text-lg">
            Ready to translate emerging AI capabilities into real products and workflows? Let&apos;s connect.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <a href="mailto:ben.poersch@dyai.app" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold text-[#050B14] font-medium hover:bg-[#F3E5AB] transition-colors">
                <Mail className="w-5 h-5 mr-3" />
                ben.poersch@dyai.app
              </a>
              <button 
                onClick={handleCopyEmail}
                className="p-3.5 rounded-full bg-bg-base border border-border-theme hover:bg-bg-base transition-colors text-text-muted flex items-center justify-center relative group"
                title="Copy email address"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg border border-border-theme text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {copied ? 'Copied!' : 'Copy email'}
                </span>
              </button>
            </div>
            <a href="https://linkedin.com/in/benjamin-poersch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-text font-light hover:bg-bg-base border border-border-theme transition-colors">
              <Linkedin className="w-5 h-5 mr-3" />
              Connect on LinkedIn
            </a>
            <a 
              href="/resume.pdf" 
              download 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-bg-base hover:bg-gold text-text hover:text-[#050B14] border border-border-theme hover:border-gold font-medium transition-all duration-300"
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
            <span className="text-xs font-mono text-gold/70 uppercase tracking-widest">Scan for Lumina Dashboard</span>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
