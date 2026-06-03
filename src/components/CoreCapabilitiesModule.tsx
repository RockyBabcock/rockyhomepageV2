import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techStackData, categoryColors, levelColors } from "../data/techStack";
import { cn } from "../lib/utils";
import { Code, Box, Server, Sparkles, MonitorSmartphone, Settings } from "lucide-react";

function InfoBlock({ title, text, items, color }: { title: string; text?: string; items?: string[]; color: string }) {
  return (
    <div className="border-t border-[var(--lab-border)] pt-5">
      <h4 className="font-mono text-xs uppercase tracking-widest font-bold mb-3" style={{ color }}>
        {title}
      </h4>
      {text && <p className="font-body text-sm text-[var(--lab-text-soft)] leading-relaxed">{text}</p>}
      {items && (
        <ul className="space-y-2">
          {items.map((item, i) => (
             <li key={i} className="flex items-start gap-2 font-body text-sm text-[var(--lab-text-soft)]">
                <span className="mt-0.5" style={{ color }}>•</span>
                <span>{item}</span>
             </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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

  const categoryColor = categoryColors[activeCategory]?.pri || "var(--rainbow-purple)";
  const activeTool = techStackData.find((t) => t.id === activeToolId);

  return (
    <div className="relative w-full z-10 text-[var(--lab-text)]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <motion.div 
            animate={{ backgroundColor: `${categoryColor}15` }}
            transition={{ duration: 1 }}
            className="absolute -top-10 -right-10 w-[40vw] h-[40vw] rounded-full blur-[100px] mix-blend-multiply opacity-50" 
         />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 gap-6 border-b border-[var(--lab-border)]">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const color = categoryColors[cat]?.pri || "var(--lab-text)";
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 font-body text-sm font-semibold rounded-full transition-all duration-300",
                    isActive 
                      ? "text-white shadow-md" 
                      : "bg-white/50 border border-[var(--lab-border)] text-[var(--lab-text-muted)] hover:bg-white hover:text-[var(--lab-text)]"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           
           {/* Left: Tool Constellation */}
           <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                 {techStackData.filter(t => t.category === activeCategory).map((tool) => {
                   const isActive = activeToolId === tool.id;

                   return (
                     <button
                       key={tool.id}
                       onClick={() => setActiveToolId(tool.id)}
                       className={cn(
                         "lab-card p-5 text-left transition-all hover:-translate-y-1 relative group overflow-hidden",
                         isActive ? "ring-2" : "hover:shadow-md"
                       )}
                       style={{
                         "--tw-ring-color": categoryColor,
                         boxShadow: isActive ? `0 24px 70px ${categoryColor}24` : undefined,
                       } as React.CSSProperties}
                     >
                       {/* Subtle hover gradient background */}
                       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                            style={{ background: `radial-gradient(circle at center, ${categoryColor}10, transparent 70%)` }} />
                       
                       <div className="relative z-10">
                         <div
                           className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center shadow-sm"
                           style={{
                             background: `linear-gradient(135deg, ${categoryColor}22, white)`,
                             color: categoryColor,
                           }}
                         >
                           <Code size={22} />
                         </div>

                         <div className="font-semibold text-lg text-[var(--lab-text)]">
                           {tool.name}
                         </div>

                         <div className="mt-2 text-xs font-mono font-medium text-[var(--lab-text-muted)] uppercase tracking-wider">
                           {tool.level}
                         </div>
                       </div>
                     </button>
                   );
                 })}
              </div>
           </div>

           {/* Right: Selected Tool Details */}
           <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
               <AnimatePresence mode="wait">
                 {activeTool ? (
                    <motion.div 
                      key={activeTool.id}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="lab-card p-8 flex flex-col shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                    >
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div>
                            <div className="text-xs font-mono uppercase tracking-[0.16em]" style={{ color: categoryColor }}>
                              Selected Tool
                            </div>
                            <h3 className="mt-2 text-4xl font-headline font-bold tracking-tight text-[var(--lab-text)]">
                              {activeTool.name}
                            </h3>
                          </div>
                          
                          <div
                            className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${categoryColor}, white)`,
                              color: "white"
                            }}
                          >
                             <Code size={24} />
                          </div>
                        </div>

                        <p className="text-[var(--lab-text-soft)] leading-relaxed font-body text-sm mb-6">
                          {activeTool.description}
                        </p>

                        <div className="space-y-6 flex-1 flex flex-col">
                           <InfoBlock 
                              color={categoryColor}
                              title="What I use it for" 
                              text="Architecting robust interface systems, prototyping interactive components, and maintaining scalable component logic." 
                           />
                           
                           {activeTool.evidence && activeTool.evidence.length > 0 && (
                             <InfoBlock 
                                color={categoryColor}
                                title="Where it appears" 
                                items={activeTool.evidence} 
                             />
                           )}

                           <InfoBlock 
                              color={categoryColor}
                              title="Best paired with" 
                              text="Tailwind CSS, standard browser APIs, and intelligent orchestration." 
                           />
                           
                           <InfoBlock 
                              color={categoryColor}
                              title="What I'm improving next" 
                              text="Exploring deeper integration of this tool within broader autonomous workflows and dynamic interface generation." 
                           />
                        </div>
                    </motion.div>
                 ) : (
                    <div className="lab-card p-12 w-full h-[400px] flex items-center justify-center font-body text-base font-medium text-[var(--lab-text-muted)] text-center border-dashed">
                       Select a tool to view its context and learning map.
                    </div>
                 )}
               </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
