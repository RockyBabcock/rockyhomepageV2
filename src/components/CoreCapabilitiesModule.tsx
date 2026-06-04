import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techStackData, categoryColors } from "../data/techStack";
import { cn } from "../lib/utils";
import { Layers, MonitorSmartphone, Server, Sparkles, Settings, Cpu, Box, Disc, TerminalSquare, Search, Code, CheckCircle2 } from "lucide-react";

function getCategoryIcon(cat: string) {
  switch (cat) {
    case "frontend": return <MonitorSmartphone size={16} />;
    case "backend": return <Server size={16} />;
    case "design": return <Sparkles size={16} />;
    case "devops": return <Settings size={16} />;
    case "ai": return <Cpu size={16} />;
    case "web3": return <Box size={16} />;
    case "creative": return <Disc size={16} />;
    case "tooling": return <TerminalSquare size={16} />;
    default: return <Layers size={16} />;
  }
}

const CATEGORY_ORDER = [
  "frontend",
  "backend",
  "ai",
  "web3",
  "design",
  "creative",
  "devops",
  "tooling",
];

export function CoreCapabilitiesModule() {
  const existingCategories = Array.from(new Set(techStackData.map((t) => t.category)));
  const categories = CATEGORY_ORDER.filter(cat => existingCategories.includes(cat));
  
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

  const activeTool = techStackData.find((t) => t.id === activeToolId);

  return (
    <div className="relative w-full z-10">
      <div className="mb-8 max-w-2xl text-[var(--ink-soft)] leading-relaxed">
        A living map of the tools, systems, and workflows I use to build interfaces, experiments, and digital spaces.
      </div>
      
      <div className="flex flex-col lg:grid lg:grid-cols-[220px_minmax(0,1fr)_360px] gap-6 lg:gap-8 items-start">
        {/* Left Column: Domain Rail */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2 flex items-center gap-2">
            <Search size={12} />
            Domains
          </h3>
          <div className="flex overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar gap-2 lg:flex-col lg:gap-1.5 -mx-4 px-4 lg:mx-0 lg:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "shrink-0 flex items-center gap-2 px-3 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-300 text-left w-full",
                    isActive 
                      ? "bg-[var(--hall-soft)] text-[var(--hall-primary)] shadow-sm border border-[var(--hall-primary)]/20" 
                      : "text-[var(--ink-soft)] hover:bg-[var(--canvas-soft)] border border-transparent"
                  )}
                >
                  <div className={cn("transition-colors", isActive ? "text-[var(--hall-primary)]" : "text-[var(--ink-muted)]")}>
                    {getCategoryIcon(cat)}
                  </div>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: Tool Constellation */}
        <div className="flex flex-col gap-4 w-full h-full min-h-[300px]">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-0 lg:hidden">
            Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4">
            {techStackData.filter(t => t.category === activeCategory).map((tool) => {
              const isActive = activeToolId === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveToolId(tool.id)}
                  className={cn(
                    "museum-card group text-left flex flex-col p-4 transition-all duration-300 relative overflow-hidden",
                    isActive 
                      ? "ring-2 ring-[var(--hall-primary)] shadow-md"
                      : "hover:-translate-y-1 hover:shadow-lg border-[var(--border)]"
                  )}
                  style={isActive ? { borderColor: 'transparent' } : {}}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--hall-soft)] to-transparent opacity-50" />
                  )}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-space font-bold text-[var(--ink)] tracking-tight text-lg">
                         {tool.name}
                       </span>
                    </div>
                    <div className="mb-3">
                      <span className={cn(
                        "inline-flex font-mono text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm",
                        isActive ? "bg-[var(--hall-surface)] text-[var(--hall-secondary)]" : "bg-[var(--canvas-soft)] text-[var(--ink-muted)] border border-[var(--border)]"
                      )}>
                        {tool.level}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--ink-soft)] line-clamp-2 leading-relaxed h-8 mb-2">
                      {tool.description}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[var(--ink-muted)]">
                      <CheckCircle2 size={12} className={isActive ? "text-[var(--hall-primary)]" : ""} />
                      {tool.evidence?.length || 1} Proof{(tool.evidence?.length || 1) !== 1 ? 's' : ''}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tool Dossier */}
        <div className="flex flex-col w-full h-full lg:sticky lg:top-24 mt-6 lg:mt-0">
          <AnimatePresence mode="wait">
            {activeTool && (
              <motion.div 
                key={activeTool.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="museum-card spectrum-edge flex flex-col p-6 lg:p-7 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 text-[var(--hall-primary)] pointer-events-none">
                  <Code size={120} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 border-b border-[var(--border)] pb-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-space font-bold tracking-tight text-[var(--ink)]">
                        {activeTool.name}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--hall-secondary)] bg-[var(--hall-surface)] px-2 py-1 rounded">
                        {activeTool.category}
                      </span>
                    </div>
                    <div className="inline-block mt-1">
                      <span className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--hall-primary)] px-2 py-0.5 rounded-sm border border-[var(--hall-primary)]/20 shadow-sm bg-white">
                        {activeTool.level}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                         Description
                      </h4>
                      <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                         {activeTool.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                         How I use it
                      </h4>
                      <ul className="space-y-2">
                         {activeTool.evidence?.map((item, i) => (
                           <li key={i} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
                              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--hall-secondary)]" />
                              <span className="leading-relaxed">{item}</span>
                           </li>
                         )) || (
                           <li className="text-sm text-[var(--ink-soft)]">Applied in core feature workflows and isolated architecture experiments.</li>
                         )}
                      </ul>
                    </div>

                    {activeTool.usedIn && activeTool.usedIn.length > 0 && (
                      <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                           Used in
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-[var(--ink-soft)]">
                           {activeTool.usedIn.map((item, i) => (
                              <span key={i} className="px-2.5 py-1 bg-[var(--canvas-soft)] border border-[var(--border)] rounded text-xs font-medium shadow-sm">
                                {item}
                              </span>
                           ))}
                        </div>
                      </div>
                    )}

                    {activeTool.learningFocus && (
                      <div className="mt-auto">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                           Current Learning Focus
                        </h4>
                        <p className="text-sm text-[var(--ink-soft)] italic bg-[var(--hall-surface)]/50 p-3 rounded-lg border border-[var(--hall-primary)]/10">
                           {activeTool.learningFocus}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
