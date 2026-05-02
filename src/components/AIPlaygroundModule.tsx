import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { aiPlaygroundData } from '../data/aiPlaygroundData';
import { BrainCircuit, Sparkles } from 'lucide-react';

export const AIPlaygroundModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-12 lg:col-span-4 premium-card p-8 md:p-10 relative overflow-hidden group border-t-4 border-t-[3px] border-t-purple-500"
    >
      {/* Neural Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-screen">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/50 rounded-full blur-[40px]" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/50 rounded-full blur-[50px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-600 dark:text-purple-400">
              <BrainCircuit size={20} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400">
              Intelligence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-black mb-2">AI Playground</h2>
          <p className="font-body text-ink/70 dark:text-base/70 text-sm">
            A sandbox for learning how intelligent systems think, respond, and help build.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: 'Experiments', val: '12' },
            { label: 'Notes', val: '24' },
            { label: 'Models', val: '5' }
          ].map(m => (
            <div key={m.label} className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-center">
              <div className="text-xl font-black font-mono text-purple-600 dark:text-purple-400">{m.val}</div>
              <div className="text-[9px] uppercase tracking-wider opacity-60 font-bold text-ink dark:text-base mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3 flex-1 mb-8">
          {aiPlaygroundData.map((exp, i) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/40 dark:bg-[#111]/40 border border-ink/5 dark:border-base/5 hover:border-purple-500/30 hover:bg-white/80 dark:hover:bg-[#111]/80 transition-all cursor-pointer group/item hover:shadow-sm"
            >
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-headline font-bold text-base flex items-center gap-2 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">
                  {exp.title}
                </h3>
                <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 whitespace-nowrap font-bold">
                  {exp.label}
                </span>
              </div>
              <p className="text-xs text-ink/60 dark:text-base/60 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Link to="/projects" className="mt-auto w-full py-4 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-xl transition-all border border-purple-500/20 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-md active:scale-95">
          <Sparkles size={16} /> Open Playground
        </Link>
      </div>
    </motion.section>
  );
};
