import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { timelineData, TimelineEntry } from "../../data/batmanTimeline";
import {
  Film,
  ShieldAlert,
  Crosshair,
  Activity,
  Zap,
  Lock,
  Eye,
} from "lucide-react";

// --- Helper Functions ---
const getEraStyles = (era: string) => {
  switch (era) {
    case "Golden Age":
      return {
        bg: "bg-[#2c241b]/90",
        text: "text-[#d4b886]",
        border: "border-[#8b7355]",
        accent: "bg-[#8b7355]",
        gradient: "from-[#2c241b] to-[#1a1510]",
        node: "bg-[#d4b886] border-[#8b7355]",
      };
    case "Dark Renaissance":
      return {
        bg: "bg-[#111111]/90",
        text: "text-[#ffd700]",
        border: "border-[#ffd700]/50",
        accent: "bg-[#ffd700]",
        gradient: "from-[#111111] to-[#000000]",
        node: "bg-[#ffd700] border-[#b8860b]",
      };
    case "Animated":
      return {
        bg: "bg-[#1a1a2e]/90",
        text: "text-[#e94560]",
        border: "border-4 border-black",
        accent: "bg-[#e94560]",
        gradient: "from-[#1a1a2e] to-[#0f0f1a]",
        node: "bg-[#e94560] border-black",
      };
    case "Nolan Trilogy":
      return {
        bg: "bg-[#220000]/90",
        text: "text-[#d4af37]",
        border: "border-[#d4af37]/50",
        accent: "bg-[#8b0000]",
        gradient: "from-[#220000] to-[#0a0000]",
        node: "bg-[#d4af37] border-[#8b0000]",
      };
    case "DCEU":
      return {
        bg: "bg-[#1a1c20]/90",
        text: "text-[#a8b2c1]",
        border: "border-[#4a5568]",
        accent: "bg-[#718096]",
        gradient: "from-[#1a1c20] to-[#0d0e10]",
        node: "bg-[#a8b2c1] border-[#4a5568]",
      };
    case "Reeves Era":
      return {
        bg: "bg-[#1a0505]/90",
        text: "text-[#ff3333]",
        border: "border-[#ff0000]/50",
        accent: "bg-[#ff0000]",
        gradient: "from-[#1a0505] to-[#000000]",
        node: "bg-[#ff3333] border-[#8b0000]",
      };
    default:
      return {
        bg: "bg-gray-900/90",
        text: "text-white",
        border: "border-gray-500",
        accent: "bg-gray-500",
        gradient: "from-gray-900 to-black",
        node: "bg-gray-400 border-gray-600",
      };
  }
};

const getDerivedData = (entry: TimelineEntry) => {
  let synopsis = entry.trivia || "A cinematic milestone in the Batman mythos.";
  let impact =
    entry.comicComparison || "Redefined the character for a new generation.";
  let batmanType = "Vigilante";
  let tone = "Dark";
  let suitType = "Standard";

  if (entry.era === "Golden Age") {
    batmanType = "Campy Crusader";
    tone = "Camp / Lighthearted";
    suitType = "Spandex / Fabric";
    synopsis =
      "A lighter, more colorful take on the Caped Crusader, focusing on gadgets and campy humor.";
  } else if (entry.era === "Dark Renaissance") {
    batmanType = "Gothic Knight";
    tone = "Gothic / Neon";
    suitType = "Molded Rubber";
    synopsis =
      "Brought Batman back to his dark roots with gothic architecture and expressionist styling.";
  } else if (entry.era === "Animated") {
    batmanType = "Animated Detective";
    tone = "Noir / Action";
    suitType = "Stylized Fabric";
    synopsis =
      "The definitive animated interpretation, blending dark deco visuals with mature storytelling.";
  } else if (entry.era === "Nolan Trilogy") {
    batmanType = "Tactical Vigilante";
    tone = "Realistic / Thriller";
    suitType = "Military Armor";
    synopsis =
      "Grounded the mythos in stark reality, exploring themes of fear, chaos, and pain.";
  } else if (entry.era === "DCEU") {
    batmanType = "Brutal Brawler";
    tone = "Epic / Mythic";
    suitType = "Heavy Armor / Mech";
    synopsis =
      "An older, world-weary Batman pushed to his absolute limits in a world of gods and monsters.";
  } else if (entry.era === "Reeves Era") {
    batmanType = "Noir Detective";
    tone = "Gritty / Noir";
    suitType = "Hand-crafted Tactical";
    synopsis =
      "A raw, year-two Batman navigating a deeply corrupt Gotham as the World's Greatest Detective.";
  }

  return { synopsis, impact, batmanType, tone, suitType };
};

// --- Subcomponents ---

const BackgroundEffects: React.FC<{ era?: string; isJoker: boolean }> = ({
  era,
  isJoker,
}) => {
  const isReeves = era === "Reeves Era";
  const isGolden = era === "Golden Age";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-3xl">
      {/* Base Parallax Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Rain Effect */}
      {(isReeves || era === "Nolan Trilogy") && (
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-[1px] h-10 ${isReeves ? "bg-gradient-to-b from-transparent to-red-500" : "bg-gradient-to-b from-transparent to-white/50"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20 + 10}%`,
              }}
              animate={{ y: ["0vh", "100vh"], opacity: [0, 1, 0] }}
              transition={{
                duration: Math.random() * 0.5 + 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Golden Age Noise */}
      {isGolden && (
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Joker Glitch */}
      <AnimatePresence>
        {isJoker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-500/20 mix-blend-color-dodge z-50 pointer-events-none glitch-anim"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.2) 2px, rgba(0,255,0,0.2) 4px)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailModal: React.FC<{ entry: TimelineEntry; onClose: () => void }> = ({
  entry,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="bg-[#111] border border-white/20 rounded-2xl p-6 max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest">
              Archive File // {entry.year}
            </div>
            <h3 className="text-2xl font-black text-white uppercase">
              {entry.title}
            </h3>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <Zap size={20} />
          </button>
        </div>

        <div className="space-y-4 text-sm text-white/80">
          <div>
            <strong className="text-white block mb-1">Costume & Design:</strong>
            <p className="font-mono text-xs leading-relaxed">
              {entry.suitAnalysis}
            </p>
          </div>
          <div>
            <strong className="text-white block mb-1">
              Known Associates / Villains:
            </strong>
            <p className="font-mono text-xs leading-relaxed">{entry.villain}</p>
          </div>
          <div>
            <strong className="text-white block mb-1">
              Behind-the-Scenes Trivia:
            </strong>
            <p className="font-mono text-xs leading-relaxed">
              {entry.trivia || "No data available."}
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10 italic text-white/90">
            "{entry.quote}"
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function BatmanTimelineModule() {
  const defaultEntry =
    timelineData.find((e) => e.title === "The Dark Knight") || timelineData[0];
  const [selectedEntry, setSelectedEntry] =
    useState<TimelineEntry>(defaultEntry);
  const [hoveredEntry, setHoveredEntry] = useState<TimelineEntry | null>(null);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Easter Eggs
  const [isJoker, setIsJoker] = useState(false);
  const [isKnightPulse, setIsKnightPulse] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const styles = getEraStyles(selectedEntry.era);
  const derivedData = getDerivedData(selectedEntry);

  const filteredData =
    filter === "All"
      ? timelineData
      : timelineData.filter((e) => e.era === filter);

  // Auto-scroll timeline to selected entry
  useEffect(() => {
    if (timelineRef.current) {
      const selectedNode = timelineRef.current.querySelector(
        `[data-year="${selectedEntry.year}-${selectedEntry.title}"]`,
      );
      if (selectedNode) {
        selectedNode.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedEntry, filter]);

  // Keyboard Easter Eggs
  useEffect(() => {
    let typed = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toUpperCase();
      if (typed.length > 10) typed = typed.slice(-10);

      if (typed.includes("JOKER")) {
        setIsJoker(true);
        setTimeout(() => setIsJoker(false), 3000);
        typed = "";
      }
      if (typed.includes("KNIGHT")) {
        setIsKnightPulse(true);
        setTimeout(() => setIsKnightPulse(false), 3000);
        const begins = timelineData.find((e) => e.title === "Batman Begins");
        if (begins) setSelectedEntry(begins);
        typed = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBatSignalClick = () => {
    const begins = timelineData.find((e) => e.title === "Batman Begins");
    if (begins) setSelectedEntry(begins);
  };

  return (
    <div
      id="Timeline"
      className="relative w-full h-[480px] premium-card !p-0 !bg-[#050505] !text-white flex flex-col font-sans group col-span-12 lg:col-span-8 row-span-2 overflow-hidden"
    >
      <BackgroundEffects era={selectedEntry.era} isJoker={isJoker} />

      {/* A. Top — Cinematic Timeline Strip */}
      <div className="relative z-20 flex-shrink-0 border-b border-white/10 bg-black/80 backdrop-blur-md pt-3 pb-2 px-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBatSignalClick}
          >
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50 hover:bg-yellow-500/40 transition-colors">
              <Film size={12} className="text-yellow-500" />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
              Gotham Archive
            </h2>
          </div>
          <span
            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${styles.border} ${styles.text} bg-black/50`}
          >
            {selectedEntry.era}
          </span>
        </div>

        <div
          ref={timelineRef}
          className="relative h-[40px] flex items-center overflow-x-auto scrollbar-hide space-x-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Connector Line */}
          <div
            className={`absolute left-0 right-0 top-1/2 h-[1px] -z-10 ${filter === "Nolan Trilogy" ? "bg-yellow-500/50" : "bg-white/10"}`}
          />

          {filteredData.map((entry, idx) => {
            const isSelected = selectedEntry === entry;
            const isHovered = hoveredEntry === entry;
            const isNolan = entry.era === "Nolan Trilogy";
            const nodeStyles = getEraStyles(entry.era);

            return (
              <div
                key={idx}
                data-year={`${entry.year}-${entry.title}`}
                className="relative flex-shrink-0 group/node cursor-pointer flex flex-col items-center justify-center h-full min-w-[30px]"
                onMouseEnter={() => setHoveredEntry(entry)}
                onMouseLeave={() => setHoveredEntry(null)}
                onClick={() => setSelectedEntry(entry)}
              >
                <div className="text-[8px] font-mono text-white/40 mb-1">
                  {entry.year}
                </div>
                <motion.div
                  className={`rounded-full border transition-all duration-300 flex items-center justify-center
                    ${isNolan ? "w-4 h-4 border-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)] bg-black" : "w-2.5 h-2.5 bg-white/20 border-white/40"}
                    ${isSelected ? "ring-2 ring-white/50 scale-125" : "opacity-70 hover:opacity-100"}
                    ${isKnightPulse && isNolan ? "animate-ping bg-yellow-500" : ""}
                  `}
                  animate={{ scale: isSelected ? 1.25 : isHovered ? 1.1 : 1 }}
                >
                  {isNolan && (
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                  )}
                </motion.div>
                <div className="text-[8px] font-bold text-white/60 mt-1 uppercase">
                  {entry.actor.split(" ")[1]?.charAt(0) ||
                    entry.actor.charAt(0)}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && !isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border border-white/20 text-white text-[10px] px-2 py-1 rounded pointer-events-none z-50"
                    >
                      {entry.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* B. Center — Batcomputer Focus Panel */}
      <div
        className={`relative z-10 flex-1 overflow-hidden p-5 md:p-6 bg-gradient-to-b ${styles.gradient} flex flex-col justify-center`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEntry.title}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
            transition={{
              duration: selectedEntry.era === "Nolan Trilogy" ? 0.5 : 0.35,
              ease: "easeOut",
            }}
            className="flex flex-col h-full justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/10 ${styles.text}`}
                    >
                      {derivedData.batmanType}
                    </span>
                    {selectedEntry.era === "Nolan Trilogy" && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 flex items-center gap-1">
                        <ShieldAlert size={10} /> Personal Favorite
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-3xl md:text-4xl font-black uppercase tracking-tight leading-none mb-1 ${styles.text}`}
                    style={{
                      fontFamily:
                        selectedEntry.era === "Nolan Trilogy"
                          ? "Impact, sans-serif"
                          : "inherit",
                    }}
                  >
                    {selectedEntry.title}
                  </h3>
                  <div className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    {selectedEntry.year} // {selectedEntry.actor} // Dir.{" "}
                    {selectedEntry.director}
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden md:flex items-center gap-1 text-[10px] font-mono uppercase text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded px-2 py-1 bg-black/30"
                >
                  <Eye size={12} /> Open File
                </button>
              </div>

              <div className="mt-4 max-w-2xl">
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium mb-3">
                  {derivedData.synopsis}
                </p>
                <div className="flex items-start gap-2 text-xs text-white/60 bg-black/30 p-3 rounded-lg border border-white/5">
                  <Lock
                    size={14}
                    className="mt-0.5 flex-shrink-0 text-white/40"
                  />
                  <p>
                    <span className="font-bold text-white/80">Impact:</span>{" "}
                    {derivedData.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10">
              <div>
                <div className="text-[9px] font-mono uppercase text-white/40 mb-1 flex items-center gap-1">
                  <Activity size={10} /> Gotham Crime Index
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-full h-1.5 rounded-sm ${i < selectedEntry.crimeRating ? styles.accent : "bg-white/10"}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-mono uppercase text-white/40 mb-1 flex items-center gap-1">
                  <Crosshair size={10} /> Tone
                </div>
                <div className="text-xs font-bold text-white/80 uppercase truncate">
                  {derivedData.tone}
                </div>
              </div>
              <div>
                <div className="text-[9px] font-mono uppercase text-white/40 mb-1 flex items-center gap-1">
                  <ShieldAlert size={10} /> Suit Type
                </div>
                <div className="text-xs font-bold text-white/80 uppercase truncate">
                  {derivedData.suitType}
                </div>
              </div>
            </div>

            {/* Nolan Theme Progression */}
            {selectedEntry.era === "Nolan Trilogy" && (
              <div className="absolute right-4 bottom-24 hidden lg:flex flex-col gap-2 text-right">
                {["Fear", "Chaos", "Pain", "Rise"].map((theme, i) => {
                  const isActive =
                    (theme === "Fear" &&
                      selectedEntry.title === "Batman Begins") ||
                    (theme === "Chaos" &&
                      selectedEntry.title === "The Dark Knight") ||
                    ((theme === "Pain" || theme === "Rise") &&
                      selectedEntry.title === "The Dark Knight Rises");
                  return (
                    <div
                      key={theme}
                      className={`text-xs font-black uppercase tracking-widest transition-all ${isActive ? "text-yellow-500 scale-110 translate-x-0" : "text-white/20 translate-x-2"}`}
                    >
                      {theme}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* C. Bottom — Utility & Identity Layer */}
      <div className="relative z-20 flex-shrink-0 border-t border-white/10 bg-black/90 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["All", "Nolan Trilogy", "Animated", "Reeves Era"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-mono uppercase px-2 py-1 rounded transition-colors whitespace-nowrap ${filter === f ? "bg-white text-black font-bold" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"}`}
            >
              {f === "All" ? "Full Archive" : f}
            </button>
          ))}
        </div>

        <div className="hidden md:block text-[10px] font-mono text-white/40 italic truncate max-w-xs ml-4">
          "{selectedEntry.quote}"
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="md:hidden text-[10px] font-mono uppercase text-white/60 bg-white/10 px-2 py-1 rounded"
        >
          Details
        </button>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <DetailModal
            entry={selectedEntry}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
