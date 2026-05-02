import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { projectLabData, ProjectEntry } from '../data/projectLabData';
import { Hammer, ArrowUpRight, Activity } from 'lucide-react';

const getStatusColor = (status: ProjectEntry['status']) => {
  switch (status) {
    case 'Building': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'Exploring': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    case 'Prototype': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    case 'Learning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
};

export const ProjectLabModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-12 lg:col-span-8 premium-card p-8 md:p-10 relative overflow-hidden group border-x-indigo-500/10 border-b-indigo-500/10 border-t-[3px] border-t-indigo-500"
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f46e5 1px, transparent 1px),
            linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Hammer size={20} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
                System Status: Active
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-black mb-2">Project Lab</h2>
            <p className="font-body text-ink/70 dark:text-base/70">Tracking the systems, prototypes, and creative tools I'm building.</p>
          </div>
          <Link to="/projects" className="flex items-center gap-2 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-xl transition-colors border border-indigo-500/20 font-bold text-sm tracking-wide">
            Open Lab <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectLabData.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to="/projects" className="h-full p-5 flex flex-col rounded-2xl bg-white/50 dark:bg-[#111]/50 border border-ink/5 dark:border-base/5 hover:border-indigo-500/30 hover:bg-white/80 dark:hover:bg-[#111]/80 transition-all cursor-pointer shadow-sm hover:shadow-md group/card">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="font-headline font-bold text-lg group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <span className={`text-[9px] font-mono whitespace-nowrap uppercase px-2 py-1 rounded-md border font-bold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techChips.map(chip => (
                    <span key={chip} className="text-[10px] font-mono px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-ink/5 dark:border-base/5 text-ink/60 dark:text-base/60">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-ink/50 dark:text-base/50 font-bold">
                    <span className="flex items-center gap-1.5"><Activity size={10} /> Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
