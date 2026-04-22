'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Copy, Check } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ben.poersch@dyai.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 border-t border-white/10 text-center space-y-8"
    >
      <h2 className="text-4xl md:text-5xl font-serif font-light text-blue-50">Let&apos;s build the future together.</h2>
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
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#050B14] border border-white/10 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {copied ? 'Copied!' : 'Copy email'}
            </span>
          </button>
        </div>
        <a href="https://linkedin.com/in/benjamin-poersch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-blue-50 font-light hover:bg-white/5 border border-white/20 transition-colors">
          <Linkedin className="w-5 h-5 mr-3" />
          Connect on LinkedIn
        </a>
      </div>

      <div className="pt-20 flex flex-col items-center justify-center space-y-4">
        <span className="text-xs font-mono text-[#D4AF37]/70 uppercase tracking-widest">© {new Date().getFullYear()} Benjamin Poersch</span>
      </div>
    </motion.section>
  );
}
