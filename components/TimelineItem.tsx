'use client';

import { motion } from 'motion/react';
import { Zap, GitBranch, Layers, Terminal } from 'lucide-react';
import { playDeepContemplatingSound } from '@/lib/audio';

const iconMap: Record<string, any> = {
  Zap, GitBranch, Layers, Terminal
};

interface TimelineItemProps {
  item: any;
}

export function TimelineItem({ item }: TimelineItemProps) {
  const Icon = iconMap[item.icon] || Terminal;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050B14] ${item.current ? 'bg-gradient-to-br from-[#D4AF37] to-blue-400 text-[#050B14] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-blue-900/80 text-blue-50 shadow-[0_0_15px_rgba(59,130,246,0.3)]'} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
        <Icon className="w-4 h-4" />
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
        className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-[#0A101D]/90 border ${item.current ? 'border-[#D4AF37]/30 shadow-[0_0_30px_-10px_rgba(212,175,55,0.2)]' : 'border-blue-500/20'} backdrop-blur-lg hover:bg-[#0A101D] transition-colors`}
      >
        <div className="flex flex-col space-y-1 mb-4">
          <span className={`${item.current ? 'text-[#D4AF37]' : 'text-blue-400'} font-mono text-sm tracking-wide`}>{item.date}</span>
          <h4 className="text-lg font-serif font-light text-blue-50">{item.title}</h4>
          <span className="text-blue-200/60 font-light">{item.company}</span>
        </div>
        {item.description && (
          <ul className="space-y-2 text-sm text-blue-100/80 font-light list-disc list-inside marker:text-[#D4AF37]">
            {item.description.map((desc: string, i: number) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}
