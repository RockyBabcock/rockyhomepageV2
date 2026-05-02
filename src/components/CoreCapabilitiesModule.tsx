import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Medal, Zap, Terminal, Globe, Hexagon, Component, Briefcase } from 'lucide-react';
import { techStackData, TechItem, categoryColors } from '../data/techStack';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const CATEGORY_MAP = {
  frontend: { label: 'Frontend', icon: <Component className="w-4 h-4" /> },
  backend: { label: 'Backend / Data', icon: <Terminal className="w-4 h-4" /> },
  ai: { label: 'AI / ML', icon: <Zap className="w-4 h-4" /> },
  web3: { label: 'Web3 / Blockchain', icon: <Hexagon className="w-4 h-4" /> },
  devops: { label: 'DevOps / Infra', icon: <Globe className="w-4 h-4" /> },
  tools: { label: 'Tools', icon: <Briefcase className="w-4 h-4" /> }
};

interface TechProp {
  item: TechItem;
}

const TechCard: React.FC<TechProp> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = categoryColors[item.category] || '#CCC';
  
  const getProficiencyLabel = (score: number) => {
    if (score >= 9) return 'Expert';
    if (score >= 7) return 'Advanced';
    if (score >= 5) return 'Proficient';
    return 'Exploring';
  };

  return (
    <div 
      className="relative flex flex-col justify-between p-4 border border-ink/10 dark:border-base/10 bg-white/50 dark:bg-[#111]/50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-md bg-ink/5 dark:bg-base/5 flex items-center justify-center text-ink dark:text-base group-hover:text-white transition-colors duration-300" style={isHovered ? { backgroundColor: color } : {}}>
            {item.icon}
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm tracking-tight">{item.name}</h4>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink/40 dark:text-base/40">{item.level}</p>
          </div>
        </div>

        {item.level === 'core' && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Medal size={14} style={{ color }} />
          </div>
        )}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center text-[10px] font-mono mb-1 uppercase font-bold text-ink/40 dark:text-base/40">
          <span className="px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: isHovered ? color + '20' : 'transparent', color: isHovered ? color : 'inherit' }}>
            {getProficiencyLabel(item.proficiency)}
          </span>
          <span>{item.proficiency}/10</span>
        </div>
        <div className="flex gap-0.5 h-1.5 w-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 transition-all duration-300",
                i < item.proficiency 
                  ? "opacity-100" 
                  : "bg-ink/5 dark:bg-base/5"
              )}
              style={i < item.proficiency ? { backgroundColor: color } : {}}
            />
          ))}
        </div>
      </div>

      {/* Hover Information / Project popover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 w-[120%] mb-2 bg-[#111] dark:bg-white text-base dark:text-ink shadow-2xl p-4 border-[3px] border-ink z-50 pointer-events-none"
          >
            <p className="text-xs font-mono font-medium leading-relaxed mb-4 opacity-90">{item.description}</p>
            {item.projects.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest bg-ink text-base px-2 py-1 inline-block mb-1 border border-base/30">Applied In</span>
                {item.projects.slice(0, 2).map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-base/10 dark:bg-ink/10 border border-base/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {/* Fake Thumbnail */}
                      <span className="text-[8px] font-black opacity-30 text-center uppercase leading-none break-all">{p.name.slice(0,4)}</span>
                    </div>
                    <div className="font-headline font-bold text-sm tracking-tight text-primary">
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function CoreCapabilitiesModule() {
  // Group tech items by category
  const groupedTechs = Object.keys(CATEGORY_MAP).reduce((acc, cat) => {
    acc[cat] = techStackData.filter(t => t.category === cat).sort((a, b) => b.proficiency - a.proficiency);
    return acc;
  }, {} as Record<string, TechItem[]>);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 premium-card p-0 flex flex-col overflow-hidden border border-ink/10 dark:border-base/10"
    >
      <div className="p-8 md:p-10 border-b border-ink/10 dark:border-base/10 bg-ink text-base">
        <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight mb-4">Core Capabilities</h2>
        <p className="font-body text-base/60 max-w-2xl text-sm md:text-base">
          My technology stack is structured into core competencies, proficient tools, and active explorations.
          I maintain a brutalist approach to architecture: build dense, ship fast, and simplify where possible.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-base/40">
            <Medal className="w-4 h-4 text-primary" /> Core Focus
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-base/40">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Proficient
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-base/40">
            <ArrowRight className="w-4 h-4 text-primary" /> Exploring
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1px] bg-ink/10 dark:bg-base/10 p-[1px]">
        {Object.entries(CATEGORY_MAP).map(([catKey, catInfo]) => {
          const items = groupedTechs[catKey];
          if (!items || items.length === 0) return null;

          return (
            <div key={catKey} className="flex flex-col bg-base dark:bg-ink min-h-[300px]">
              <div className="p-4 border-b border-ink/10 dark:border-base/10 flex items-center gap-3">
                <div className="p-2 bg-ink dark:bg-base text-base dark:text-ink">
                  {catInfo.icon}
                </div>
                <h3 className="font-headline font-black uppercase tracking-widest text-sm">{catInfo.label}</h3>
              </div>
              <div className="grid grid-cols-2 gap-[1px] bg-ink/5 dark:bg-base/5 flex-1">
                {items.slice(0, 4).map(item => (
                  <TechCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
