import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techStackData, categoryColors, levelColors } from "../data/techStack";
import { cn } from "../lib/utils";
import { Code, Box, Server, Sparkles, MonitorSmartphone, Settings } from "lucide-react";

export function CoreCapabilitiesModule() {
  const categories = Array.from(new Set(techStackData.map((t) => t.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0] || "frontend");
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  useEffect(() => {
    const tools = techStackData.filter((t) => t.category === activeCategory);
    if (tools.length > 0) {
      setActiveToolId(tools[0].id);
    } else {
      setActiveToolId(null);
    }
  }, [activeCategory]);

  const categoryColor = categoryColors[activeCategory]?.pri || "#ffffff";
  const activeTool = techStackData.find((t) => t.id === activeToolId);

  return (
    <section className="relative w-full min-h-screen py-24 overflow-hidden bg-[var(--museum-bg)] z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <motion.div 
            animate={{ backgroundColor: `${categoryColor}15` }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[150px] mix-blend-screen" 
         />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 flex flex-col h-full gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--museum-border-strong)] pb-8 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-[var(--museum-text)] uppercase tracking-tighter mb-2 flex items-center gap-4">
              <span className="w-4 h-4 bg-[var(--museum-text)] animate-pulse" style={{ backgroundColor: categoryColor }} />
              SKILL OBSERVATORY
            </h2>
            <div className="text-xs md:text-sm font-mono text-[var(--museum-text-muted)] uppercase tracking-widest">
               [OBSERVATORY ACTIVE. SCANNING TECHNOLOGICAL DOMAINS.]
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const color = categoryColors[cat]?.pri || "#fff";
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all duration-300",
                    isActive 
                      ? "bg-[var(--museum-panel)] text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
                      : "border-[var(--museum-border)] text-[var(--museum-text-muted)] hover:border-white/50 bg-transparent"
                  )}
                  style={{ 
                    borderColor: isActive ? color : undefined,
                    boxShadow: isActive ? `inset 0 0 10px ${color}30` : undefined
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row h-[700px] gap-4">
           {/* Left: Technology List */}
           <div className="w-full lg:w-1/3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {techStackData.filter(t => t.category === activeCategory).map((tool) => {
                const isActive = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className={cn(
                      "w-full text-left p-4 border transition-all duration-300 group flex items-center justify-between",
                      isActive 
                        ? "bg-[var(--museum-panel-elevated)] border-transparent" 
                        : "bg-[var(--museum-panel)] border-[var(--museum-border)] hover:border-white/30"
                    )}
                    style={{
                      borderLeft: isActive ? `4px solid ${categoryColor}` : undefined
                    }}
                  >
                     <div className="flex flex-col">
                        <span className={cn(
                          "font-headline text-2xl font-bold uppercase tracking-tight",
                          isActive ? "text-white" : "text-[var(--museum-text)]"
                        )}>
                          {tool.name}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--museum-text-muted)] uppercase tracking-widest mt-1">
                           {tool.level}
                        </span>
                     </div>
                     {isActive && (
                        <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: categoryColor }} />
                     )}
                  </button>
                )
              })}
           </div>

           {/* Right: Technology Detail (Signal Panel + Data) */}
           <div className="w-full lg:w-2/3 bg-[var(--museum-panel)] border border-[var(--museum-border-strong)] p-6 md:p-10 flex flex-col relative overflow-hidden">
               {/* Decorative border glow */}
               <motion.div 
                 className="absolute top-0 right-0 w-64 h-64 blur-[80px] pointer-events-none opacity-20"
                 animate={{ backgroundColor: categoryColor }}
                 transition={{ duration: 1 }}
               />
               
               <AnimatePresence mode="wait">
                 {activeTool ? (
                    <motion.div 
                      key={activeTool.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full z-10"
                    >
                       <div className="flex items-center gap-4 mb-8">
                         <div className="p-4 border-2" style={{ borderColor: categoryColor, backgroundColor: `${categoryColor}10` }}>
                            <Code className="w-8 h-8" style={{ color: categoryColor }} />
                         </div>
                         <div>
                            <h3 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                               {activeTool.name}
                            </h3>
                            <div className="font-mono text-xs uppercase tracking-widest text-[var(--museum-text-muted)] mt-2 flex items-center gap-3">
                               <span className="px-2 py-1 border" style={{ borderColor: `${categoryColor}50` }}>{activeTool.category}</span>
                               <span style={{ color: levelColors[activeTool.level] }}>[{activeTool.level}]</span>
                            </div>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                             <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-faint)] mb-4 border-b border-[var(--museum-border)] pb-2 flex items-center gap-2">
                                <Sparkles size={12} /> System Description
                             </h4>
                             <p className="font-body text-base text-[var(--museum-text)] leading-relaxed">
                                {activeTool.description}
                             </p>
                          </div>
                          <div>
                             <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-faint)] mb-4 border-b border-[var(--museum-border)] pb-2 flex items-center gap-2">
                                <Box size={12} /> Field Evidence
                             </h4>
                             <ul className="space-y-3 font-body text-sm text-[var(--museum-text)]">
                                {activeTool.evidence?.map((ev, i) => (
                                  <li key={i} className="flex flex-start gap-2">
                                     <span className="mt-1" style={{ color: categoryColor }}>›</span>
                                     {ev}
                                  </li>
                                ))}
                             </ul>
                          </div>
                       </div>

                       <div className="mt-auto">
                          <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-faint)] mb-4 border-b border-[var(--museum-border)] pb-2 flex items-center gap-2">
                             <Server size={12} /> Live telemetry stream
                          </h4>
                          <div className="bg-[var(--museum-bg)] border border-[var(--museum-border)] p-4 font-mono text-[10px] text-white/70 h-32 overflow-y-auto flex flex-col-reverse group">
                             {/* Fake telemetry logs */}
                             <div className="flex items-center gap-2 mb-1 group-hover:text-white transition-colors">
                                <span style={{ color: categoryColor }}>{`>`}</span> CONNECTION_ESTABLISHED
                             </div>
                             <div className="flex items-center gap-2 mb-1">
                                <span style={{ color: categoryColor }}>{`>`}</span> SYNCING_NODE_DATA...
                             </div>
                             <div className="flex items-center gap-2 mb-1">
                                <span style={{ color: categoryColor }}>{`>`}</span> AUTHENTICATING_ASSET [{activeTool.id.toUpperCase()}]
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-sm uppercase tracking-widest text-[var(--museum-text-muted)]">
                       Awaiting Selection
                    </div>
                 )}
               </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
