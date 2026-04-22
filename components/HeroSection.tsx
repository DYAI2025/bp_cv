'use client';

import { motion } from 'motion/react';
import { Mail, Linkedin, Github } from 'lucide-react';
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

export function HeroSection() {
  return (
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
          LLM Integration Consultant | Hybrid Leadership | Digital Product Creator
        </h2>
        <p className="text-2xl md:text-3xl font-normal text-blue-100/90 max-w-3xl leading-relaxed pt-4">
          I discover and design today what companies will use as standard tomorrow.
        </p>
      </motion.div>

      <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-6">
        <Link href="mailto:ben.poersch@dyai.app" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
          <Mail className="w-4 h-4" />
          <span className="text-sm">ben.poersch@dyai.app</span>
        </Link>
        <Link href="https://linkedin.com/in/benjamin-poersch" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
          <Linkedin className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
        </Link>
        <Link href="https://github.com/DYAI2025" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-200/60 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
          <Github className="w-4 h-4" />
          <span className="text-sm">GitHub</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}
