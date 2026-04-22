'use client';

import { motion } from 'motion/react';
import { Cpu, Layers } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  label?: string;
}

interface SkillPanelProps {
  title: string;
  skills: Skill[];
  type: 'tags' | 'bars';
}

export function SkillPanel({ title, skills, type }: SkillPanelProps) {
  const Icon = type === 'tags' ? Cpu : Layers;

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0A101D]/80 to-[#050B14]/40 border border-white/5 backdrop-blur-md">
      <div className="flex items-center mb-6">
        <Icon className={`w-6 h-6 mr-3 ${type === 'tags' ? 'text-[#D4AF37]' : 'text-blue-200'}`} />
        <h3 className="text-2xl font-serif font-light text-blue-50">{title}</h3>
      </div>
      
      {type === 'tags' ? (
        <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <motion.span 
              key={skill.name}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                borderColor: 'rgba(212, 175, 55, 0.4)'
              }}
              className="px-4 py-2 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 text-[#D4AF37] text-sm font-light tracking-wide cursor-default transition-all duration-300"
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map(skill => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-blue-200/50 uppercase tracking-wider">
                <span>{skill.name}</span>
                <span className="text-blue-200/30">{skill.label || ''}</span>
              </div>
              <div className="h-1.5 w-full bg-blue-500/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-blue-500/40 to-blue-400/60 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-blue-400/20 blur-sm" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
