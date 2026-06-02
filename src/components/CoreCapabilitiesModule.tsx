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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-[var(--museum-text)] tracking-tighter mb-2 flex items-center gap-4">
              <span className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: categoryColor }} />
              My Skill Spectrum
            </h2>
            <div className="text-base md:text-lg font-body text-[var(--museum-text-muted)] mt-4">
               A living map of the tools I use to design, build, automate, and experiment.
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
                    "px-4 py-2 font-body text-sm font-semibold rounded-full transition-all duration-300",
                    isActive 
                      ? "text-white shadow-md" 
                      : "bg-white/50 border border-[var(--museum-border-strong)] text-[var(--museum-text-muted)] hover:bg-white hover:text-[var(--museum-text)]"
                  )}
                  style={{ 
                    backgroundColor: isActive ? color : undefined,
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
           <div className="w-full lg:w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {techStackData.filter(t => t.category === activeCategory).map((tool) => {
                const isActive = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl border transition-all duration-300 group flex items-center justify-between",
                      isActive 
                        ? "bg-white shadow-md border-transparent" 
                        : "bg-white/40 border-[var(--museum-border-strong)] hover:bg-white/80 hover:shadow-sm"
                    )}
                    style={{
                      borderLeft: isActive ? `6px solid ${categoryColor}` : undefined
                    }}
                  >
                     <div className="flex flex-col">
                        <span className={cn(
                          "font-headline text-xl md:text-2xl font-bold tracking-tight",
                          isActive ? "text-[var(--museum-text)]" : "text-[var(--museum-text)]"
                        )}>
                          {tool.name}
                        </span>
                        <span className="font-body text-xs text-[var(--museum-text-muted)] font-medium mt-1">
                           {tool.level}
                        </span>
                     </div>
                     {isActive && (
                        <div className="w-3 h-3 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: categoryColor }} />
                     )}
                  </button>
                )
              })}
           </div>

           {/* Right: Technology Detail (Signal Panel + Data) */}
           <div className="w-full lg:w-2/3 bg-[rgba(255,255,255,0.76)] backdrop-blur-[20px] rounded-[32px] border border-[rgba(15,23,42,0.1)] p-6 md:p-10 flex flex-col relative overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
               {/* Decorative border glow */}
               <motion.div 
                 className="absolute top-0 right-0 w-64 h-64 blur-[80px] pointer-events-none opacity-20 mix-blend-multiply"
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
                       <div className="flex items-center gap-6 mb-10">
                         <div className="p-5 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: categoryColor, color: "white" }}>
                            <Code className="w-10 h-10" />
                         </div>
                         <div>
                            <h3 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-[var(--museum-text)]">
                               {activeTool.name}
                            </h3>
                            <div className="font-body text-sm font-semibold text-[var(--museum-text-muted)] mt-2 flex items-center gap-3">
                               <span className="px-3 py-1 rounded-full text-white shadow-sm" style={{ backgroundColor: categoryColor }}>{activeTool.category}</span>
                               <span style={{ color: levelColors[activeTool.level] }}>{activeTool.level}</span>
                            </div>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                             <h4 className="font-body text-xs uppercase tracking-widest text-[var(--museum-text-muted)] font-bold mb-4 pb-2 flex items-center gap-2">
                                <Sparkles size={16} style={{ color: categoryColor }}/> System Description
                             </h4>
                             <p className="font-body text-base text-[var(--museum-text)] leading-relaxed bg-white/50 p-6 rounded-2xl border border-[var(--museum-border-strong)]">
                                {activeTool.description}
                             </p>
                          </div>
                          <div>
                             <h4 className="font-body text-xs uppercase tracking-widest text-[var(--museum-text-muted)] font-bold mb-4 pb-2 flex items-center gap-2">
                                <Box size={16} style={{ color: categoryColor }}/> Field Evidence
                             </h4>
                             <ul className="space-y-3 font-body text-sm text-[var(--museum-text)] bg-white/50 p-6 rounded-2xl border border-[var(--museum-border-strong)]">
                                {activeTool.evidence?.map((ev, i) => (
                                  <li key={i} className="flex flex-start gap-2">
                                     <span className="mt-0.5 text-lg" style={{ color: categoryColor }}>•</span>
                                     {ev}
                                  </li>
                                ))}
                             </ul>
                          </div>
                       </div>

                       <div className="mt-auto">
                          <h4 className="font-body text-xs uppercase tracking-widest text-[var(--museum-text-muted)] font-bold mb-4 pb-2 flex items-center gap-2">
                             <Server size={16} style={{ color: categoryColor }}/> Usage Context
                          </h4>
                          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-[var(--museum-border-strong)] p-6 font-body text-sm text-[var(--museum-text)] flex flex-col gap-3">
                             <div className="flex items-center gap-3 group">
                                <span className="p-1.5 rounded-full bg-white shadow-sm" style={{ color: categoryColor }}><Code size={12}/></span> 
                                <span className="font-medium">Used for interface systems and application state.</span>
                             </div>
                             <div className="flex items-center gap-3 group">
                                <span className="p-1.5 rounded-full bg-white shadow-sm" style={{ color: categoryColor }}><Sparkles size={12}/></span> 
                                <span className="font-medium">Currently learning deeper patterns and advanced integrations.</span>
                             </div>
                             <div className="flex items-center gap-3 group">
                                <span className="p-1.5 rounded-full bg-white shadow-sm" style={{ color: categoryColor }}><Box size={12}/></span> 
                                <span className="font-medium">Best paired with TypeScript, Motion, and Tailwind CSS.</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 ) : (
                    <div className="w-full h-full flex items-center justify-center font-body text-lg font-medium text-[var(--museum-text-muted)]">
                       Select an item to view details
                    </div>
                 )}
               </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
