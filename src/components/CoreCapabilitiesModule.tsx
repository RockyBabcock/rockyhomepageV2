import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techStackData, TechItem, categoryColors } from "../data/techStack";
import { cn } from "../lib/utils";
import { ExternalLink, Github } from "lucide-react";

const DOMAIN_CONFIG: Record<string, { title: string; count: number }> = {
  frontend: { title: "FRONTEND", count: 5 },
  backend: { title: "BACKEND", count: 5 },
  devops: { title: "DEVOPS", count: 5 },
  design: { title: "DESIGN", count: 5 },
  ai: { title: "AI/ML", count: 5 },
  web3: { title: "WEB3", count: 5 },
  creative: { title: "CREATIVE", count: 5 },
  audio: { title: "AUDIO", count: 4 },
  hardware: { title: "HARDWARE", count: 4 },
  language: { title: "LANGUAGE", count: 4 },
  spatial: { title: "SPATIAL", count: 4 },
  tooling: { title: "TOOLING", count: 4 },
};

const domains = Object.keys(DOMAIN_CONFIG);

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

const LevelIndicator = ({ level }: { level: string }) => {
  if (level === "expert")
    return (
      <span className="text-[#B08A52] tracking-widest text-[10px]">●●●●●</span>
    );
  if (level === "advanced")
    return (
      <span className="text-[#D98F5A] tracking-widest text-[10px]">●●●●○</span>
    );
  return (
    <span className="text-[#7AA1C1] tracking-widest text-[10px]">●●●○○</span>
  );
};

const MaterialBar = ({
  proficiency,
  level,
}: {
  proficiency: number;
  level: string;
}) => {
  let materialClass = "";
  if (level === "expert") {
    // Gold (Brushed Metal)
    materialClass =
      "bg-gradient-to-r from-[#B08A52] via-[#E2C391] to-[#B08A52] shadow-[0_0_8px_rgba(176,138,82,0.6)]";
  } else if (level === "advanced") {
    // Copper
    materialClass =
      "bg-gradient-to-r from-[#D98F5A] via-[#EFA675] to-[#D98F5A] shadow-[0_0_8px_rgba(217,143,90,0.4)] border-b border-r border-[#6B8E6B]/40"; // slight patina edge
  } else {
    // Ice
    materialClass =
      "bg-gradient-to-r from-[#7AA1C1] via-[#A8CDE6] to-[#7AA1C1] opacity-90 shadow-[0_0_8px_rgba(122,161,193,0.5)]";
  }

  return (
    <div
      className="w-full xl:w-[80%] h-[6px] bg-[#2A2724] relative overflow-hidden mt-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
      style={{
        backgroundImage: `url("${noiseSvg}")`,
        backgroundSize: "100px 100px",
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${proficiency}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn("h-full relative", materialClass)}
      >
        <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-white opacity-90 blur-[1px] animate-pulse" />
      </motion.div>
    </div>
  );
};

const ToolRow: React.FC<{ tool: TechItem }> = ({ tool }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "relative cursor-pointer transition-all duration-300 border-b border-[#2A2724] last:border-b-0",
        isHovered &&
          !isExpanded &&
          "bg-[#4C392D] z-10 shadow-[0_4px_20px_-8px_rgba(176,138,82,0.4)] -translate-y-[2px]",
        isExpanded &&
          "bg-[#4C392D] shadow-[0_12px_30px_-10px_rgba(26,24,22,1)] z-20 border-[#B08A52]/20",
      )}
    >
      <div className="flex flex-col p-4 md:px-6 relative z-10">
        <div className="flex justify-between items-center mb-1 lg:mb-2">
          <h4 className="font-sans font-bold text-base md:text-lg text-[#EAE6E1]">
            {tool.name}
          </h4>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] md:text-[10px] text-white/50 uppercase">
              [{tool.level}]
            </span>
            <LevelIndicator level={tool.level} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <MaterialBar proficiency={tool.proficiency} level={tool.level} />
          </div>
          <span className="text-[10px] font-mono text-white/40 hidden sm:block shrink-0">
            {tool.proficiency}%
          </span>
        </div>

        {/* Hover Strip: visible only on hover desktop */}
        <AnimatePresence>
          {isHovered && !isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 hidden md:flex"
            >
              {tool.projects.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-[#2A2724] p-1 border border-[#B08A52] shadow-[4px_4px_0_0_#1A1816]"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      className="w-8 h-8 md:w-10 md:h-10 object-cover grayscale opacity-80 mix-blend-screen"
                      alt={p.name}
                    />
                  )}
                  {!p.image && <div className="w-8 h-8 bg-white/5" />}
                  <span className="text-[7px] font-mono leading-none tracking-tighter w-8 md:w-10 truncate text-center text-white/60 mt-1">
                    {p.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden bg-[#4C392D]"
          >
            {/* Ambient hot Forge glow when expanded */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#C75B3A]/5 to-transparent pointer-events-none" />

            <div className="p-4 md:px-6 md:pb-6 pt-2 flex flex-col md:flex-row gap-6">
              {/* Left: Large Thumbnail */}
              <div className="w-full md:w-[220px] h-[140px] shrink-0 border border-[#B08A52] shadow-[6px_6px_0_0_#1A1816] relative bg-[#2A2724] overflow-hidden group">
                {tool.projects[0]?.image && (
                  <img
                    src={tool.projects[0].image}
                    className="w-full h-full object-cover opacity-70 grayscale mix-blend-screen group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    alt="project"
                  />
                )}
                <div className="absolute inset-0 border-[1px] border-white/10 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Right: Details */}
              <div className="flex-1 flex flex-col gap-3 md:gap-4 relative z-10">
                <p className="text-xs md:text-sm text-white/80 font-mono leading-relaxed max-w-xl">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  {tool.projects.map((p, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 bg-[#2A2724] text-white/70 border border-white/10 flex items-center gap-1 shadow-[2px_2px_0_0_#1A1816]"
                    >
                      <span className="text-[#B08A52]">├──</span> {p.name}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-2 flex gap-6">
                  <button className="text-[10px] md:text-xs uppercase font-bold text-[#B08A52] flex items-center gap-1.5 hover:text-white transition-colors group">
                    Live Demo{" "}
                    <ExternalLink className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button className="text-[10px] md:text-xs uppercase font-bold text-white/50 flex items-center gap-1.5 hover:text-white transition-colors">
                    View Source <Github className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CategoryTab: React.FC<{
  category: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ category, isSelected, onClick }) => {
  const conf = DOMAIN_CONFIG[category];
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-3 md:p-4 border-[2px] transition-all duration-400 shrink-0 select-none relative group",
        isSelected
          ? "border-[#B08A52] bg-[#4C392D] shadow-[4px_4px_0_0_#1A1816,-4px_-4px_15px_rgba(176,138,82,0.15)] z-10 -translate-y-1 text-[#EAE6E1]"
          : "border-[#2A2724] bg-[#3E3B38] shadow-[2px_2px_0_0_#1A1816] hover:-translate-y-[1px] hover:bg-[#4C392D] text-white/50",
      )}
      style={{ minWidth: "110px" }}
    >
      {/* Metal Plate Rivets */}
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#1A1816] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#1A1816] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#1A1816] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#1A1816] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />

      {/* Scratches/Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      <span className="font-bold text-[10px] md:text-xs uppercase tracking-widest relative z-10">
        {conf.title}
      </span>
      <span className="text-[8px] md:text-[9px] font-mono mt-0.5 md:mt-1 opacity-60 relative z-10">
        [{domains.indexOf(category) + 1}/{domains.length}]
      </span>
      <div className="mt-1 md:mt-2 text-[6px] md:text-[8px] tracking-[2px] text-[#B08A52] relative z-10">
        {Array(Math.min(3, Math.ceil(conf.count / 2)))
          .fill("●")
          .join("")}
      </div>
    </button>
  );
};

const MaterialSampleBlock: React.FC<{
  tool: TechItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ tool, isActive, onClick }) => {
  let bgClass = "";
  let shimmerClass = "";
  if (tool.level === "expert") {
    bgClass = "bg-[#B08A52] border-[#ebd1a5]"; // Gold brick
    shimmerClass =
      "bg-gradient-to-tr from-transparent via-white/40 to-transparent";
  } else if (tool.level === "advanced") {
    bgClass = "bg-[#D98F5A] border-[#f2be9b]"; // Copper ingot
    shimmerClass =
      "bg-gradient-to-tr from-transparent via-white/30 to-transparent";
  } else {
    bgClass = "bg-[#7AA1C1] border-[#b0d2eb] backdrop-blur-sm opacity-90"; // Ice crystal
    shimmerClass =
      "bg-gradient-to-bl from-white/10 via-white/70 to-transparent";
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-[2px] flex items-center justify-center p-2 cursor-pointer font-bold text-[8px] md:text-[10px] text-center uppercase tracking-tighter shadow-[4px_4px_0_0_#1A1816] transition-all duration-300 relative overflow-hidden shrink-0",
        bgClass,
        isActive
          ? "shadow-[0_0_20px_5px_rgba(199,91,58,0.6),6px_6px_0_0_#1A1816] -translate-y-1 brightness-125 z-20"
          : "hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_#1A1816] z-10",
        tool.level !== "proficient" && "rounded-sm", // Hard materials are sharper
      )}
    >
      <div
        className={cn(
          "absolute inset-0 mix-blend-overlay opacity-60",
          shimmerClass,
        )}
      />
      <div className="relative text-[#1A1816] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] z-20 break-all select-none">
        {tool.name}
      </div>

      {/* Ambient pulse when hot */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 border-[3px] border-[#C75B3A] z-30"
        />
      )}
    </div>
  );
};

const ForgeView = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const activeTool = techStackData.find((t) => t.id === activeToolId);

  return (
    <div className="p-4 md:p-8 bg-[#2A2724] min-h-[500px] border-t-8 border-[#1A1816] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Background grain in Forge */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      <div className="flex flex-wrap gap-4 md:gap-6 justify-center relative z-10 max-w-4xl mx-auto mb-20">
        {techStackData.map((tool) => (
          <MaterialSampleBlock
            key={tool.id}
            tool={tool}
            isActive={activeToolId === tool.id}
            onClick={() =>
              setActiveToolId(tool.id === activeToolId ? null : tool.id)
            }
          />
        ))}
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed md:absolute bottom-4 md:bottom-8 left-[5%] md:left-1/2 md:-translate-x-1/2 w-[90%] md:w-full md:max-w-2xl bg-[#4C392D] border-2 border-[#C75B3A] shadow-[0_0_40px_rgba(199,91,58,0.3),_8px_8px_0_rgba(26,24,22,1)] p-4 md:p-6 z-50 flex flex-col md:flex-row gap-6 font-mono"
          >
            <button
              onClick={() => setActiveToolId(null)}
              className="absolute top-2 right-2 text-white/40 hover:text-white px-2 py-1 text-[10px] md:text-xs"
            >
              [X]
            </button>

            <div className="flex-1 flex flex-col gap-3">
              <h4 className="text-[#EAE6E1] text-xl font-bold uppercase flex items-center gap-3">
                {activeTool.name}
                <span className="text-[10px] bg-[#C75B3A]/20 text-[#C75B3A] px-2 py-0.5 border border-[#C75B3A]/50">
                  HOT
                </span>
              </h4>
              <p className="text-white/60 text-xs">{activeTool.description}</p>
              <div className="mt-2 text-[#B08A52] text-[10px] font-bold">
                LEVEL: {activeTool.level.toUpperCase()}
              </div>
            </div>

            <div className="shrink-0 w-full md:w-32 flex flex-col gap-2">
              <div className="text-[9px] text-white/40 uppercase mb-1 border-b border-white/10 pb-1">
                Projects
              </div>
              {activeTool.projects.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  className="text-[10px] text-white/80 hover:text-white hover:underline truncate"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelineView = () => (
  <div className="p-12 text-center text-white/40 font-mono text-sm uppercase bg-[#2A2724] border-t-8 border-[#1A1816] shadow-inner h-[400px] flex items-center justify-center">
    [TIMELINE_VIEW_MODULE: INITALIZING HISTORICAL LOGS...]
  </div>
);

const TreeView = () => (
  <div className="p-12 text-center text-white/40 font-mono text-sm uppercase bg-[#2A2724] border-t-8 border-[#1A1816] shadow-inner h-[400px] flex items-center justify-center">
    [TREE_VIEW_MODULE: BUILDING DEPENDENCY GRAPH...]
  </div>
);

export function CoreCapabilitiesModule() {
  const [viewMode, setViewMode] = useState<
    "GRID" | "TIMELINE" | "TREE" | "FORGE"
  >("GRID");
  const [activeDomain, setActiveDomain] = useState<string>("frontend");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-pulse effect for the Forge title
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full font-sans flex flex-col h-full">
      {/* Substrate Texture Overlay - Concrete Grain */}
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("${noiseSvg}")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="w-full relative z-10 flex flex-col h-full">
        {/* THE FORGE HEADER (WORKBENCH TOP) */}
        <div
          className="w-full border-[2px] border-[#2A2724] bg-[#4C392D] mb-8 md:mb-12 shadow-[8px_8px_0_0_#1A1816] relative transition-colors duration-1000"
          style={{ backgroundColor: pulse ? "#543b2b" : "#4C392D" }}
        >
          {/* Leather/Wood texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
            style={{ backgroundImage: `url("${noiseSvg}")` }}
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 py-4 border-b-2 border-[#2A2724] gap-4 md:gap-0">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-[#EAE6E1] drop-shadow-[2px_2px_0_rgba(26,24,22,1)]">
              THE FORGE
            </h2>
            <div className="flex items-center gap-3 relative z-10">
              <span className="font-mono text-[9px] md:text-[10px] text-[#C75B3A] border border-[#C75B3A]/40 px-2 py-0.5 animate-pulse bg-[#2A2724]/80">
                [HEAT: ACTIVE]
              </span>
            </div>
          </div>

          {/* View Controls Toolbar */}
          <div className="flex bg-[#2A2724] p-1.5 md:p-2 overflow-x-auto hide-scrollbar">
            <div className="flex justify-between w-full min-w-max gap-2 pr-4 md:pr-6">
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => setViewMode("GRID")}
                  className={cn(
                    "font-mono text-[9px] md:text-[10px] px-2 md:px-3 py-1 flex items-center transition-colors",
                    viewMode === "GRID"
                      ? "text-[#B08A52] bg-[#3E3B38] border border-[#B08A52]/20"
                      : "text-white/40 hover:text-white/80",
                  )}
                >
                  {" "}
                  [VIEW: GRID] {viewMode === "GRID" ? "●" : "○"}{" "}
                </button>
                <button
                  onClick={() => setViewMode("TIMELINE")}
                  className={cn(
                    "font-mono text-[9px] md:text-[10px] px-2 md:px-3 py-1 flex items-center transition-colors",
                    viewMode === "TIMELINE"
                      ? "text-[#B08A52] bg-[#3E3B38] border border-[#B08A52]/20"
                      : "text-white/40 hover:text-white/80",
                  )}
                >
                  {" "}
                  [TIMELINE] {viewMode === "TIMELINE" ? "●" : "○"}{" "}
                </button>
                <button
                  onClick={() => setViewMode("TREE")}
                  className={cn(
                    "font-mono text-[9px] md:text-[10px] px-2 md:px-3 py-1 flex items-center transition-colors",
                    viewMode === "TREE"
                      ? "text-[#B08A52] bg-[#3E3B38] border border-[#B08A52]/20"
                      : "text-white/40 hover:text-white/80",
                  )}
                >
                  {" "}
                  [TREE] {viewMode === "TREE" ? "●" : "○"}{" "}
                </button>
                <button
                  onClick={() => setViewMode("FORGE")}
                  className={cn(
                    "font-mono text-[9px] md:text-[10px] px-2 md:px-3 py-1 flex items-center transition-colors",
                    viewMode === "FORGE"
                      ? "text-[#B08A52] bg-[#3E3B38] border border-[#B08A52]/20"
                      : "text-white/40 hover:text-white/80",
                  )}
                >
                  {" "}
                  [FORGE] {viewMode === "FORGE" ? "●" : "○"}{" "}
                </button>
              </div>

              {/* Mobile dropdown trigger for categories */}
              <button
                className="md:hidden font-mono text-[10px] text-[#B08A52] border border-[#B08A52]/40 px-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                [CATEGORIES]
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT BENCH */}
        <div className="flex flex-col gap-6 md:gap-8 relative z-10 w-full max-w-full">
          {viewMode === "GRID" && (
            <>
              {/* CATEGORY TABS - Horizontal Scroll */}
              <div
                className={cn(
                  "flex w-full overflow-x-auto pb-4 md:pb-6 gap-3 md:gap-4 hide-scrollbar snap-x px-1",
                  !isMobileMenuOpen
                    ? "hidden md:flex"
                    : "flex flex-wrap md:flex-nowrap justify-center",
                )}
              >
                {domains.map((cat) => (
                  <div key={cat} className="snap-start">
                    <CategoryTab
                      category={cat}
                      onClick={() => {
                        setActiveDomain(cat);
                        setIsMobileMenuOpen(false);
                      }}
                      isSelected={cat === activeDomain}
                    />
                  </div>
                ))}
              </div>

              {/* MAIN TOOL LIST - The Workbench Surface */}
              <div className="w-full border-[2px] border-[#2A2724] bg-[#3E3B38] shadow-[8px_8px_0_0_#1A1816] min-h-[400px] relative">
                {/* Surface grain */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{ backgroundImage: `url("${noiseSvg}")` }}
                />

                <div className="flex flex-col">
                  {techStackData
                    .filter((t) => t.category === activeDomain)
                    .map((tool, idx) => (
                      <ToolRow key={tool.id} tool={tool} />
                    ))}

                  {techStackData.filter((t) => t.category === activeDomain)
                    .length === 0 && (
                    <div className="p-12 text-center text-white/30 font-mono text-sm uppercase">
                      [NO ASSETS IN THIS COMPARTMENT]
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {viewMode === "FORGE" && (
            <div className="w-full border-[2px] border-[#2A2724] shadow-[8px_8px_0_0_#1A1816]">
              <ForgeView />
            </div>
          )}

          {viewMode === "TIMELINE" && (
            <div className="w-full border-[2px] border-[#2A2724] shadow-[8px_8px_0_0_#1A1816]">
              <TimelineView />
            </div>
          )}

          {viewMode === "TREE" && (
            <div className="w-full border-[2px] border-[#2A2724] shadow-[8px_8px_0_0_#1A1816]">
              <TreeView />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
