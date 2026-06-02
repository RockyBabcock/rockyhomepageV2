import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Terminal,
  Cpu,
  Brain,
  Code2,
  ExternalLink,
  TreePine,
} from "lucide-react";
import { cn } from "../lib/utils";
import { MuseumCard } from "./common/MuseumCard";
import { MuseumButton } from "./common/MuseumButton";

const PREDICTOR_MODES = [
  "First 🟩 expected in 30 days",
  "Bugs not yet fixed; green dots indefinitely postponed",
  "Wemby-level evolution: Screen will be solid green by tomorrow 🛸",
];

const AI_PROJECTS = [
  { title: "LLM Fine-tuning", icon: Brain },
  { title: "Neural Chess Engine", icon: Cpu },
  { title: "AI Agent Framework", icon: Code2 },
];

export function GitHubModule() {
  const [octoClicks, setOctoClicks] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [clickedCards, setClickedCards] = useState<Set<number>>(new Set());
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [predictorMode, setPredictorMode] = useState(0);
  const [cheatState, setCheatState] = useState<
    "rainbow" | "spurs" | "chess" | null
  >(null);
  const [showCodeRain, setShowCodeRain] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Load from localStorage
  useEffect(() => {
    const storedClicks = localStorage.getItem("octoClickCount");
    if (storedClicks) setOctoClicks(parseInt(storedClicks, 10));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("octoClickCount", octoClicks.toString());
  }, [octoClicks]);

  // Mouse tracking for trailing Octocat
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX + 15, y: e.clientY + 15 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard Cheat Codes
  useEffect(() => {
    let keyBuffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer += e.key.toUpperCase();
      if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);

      if (keyBuffer.endsWith("GITHUB")) {
        setCheatState("rainbow");
        setTimeout(() => setCheatState(null), 3000);
      } else if (keyBuffer.endsWith("WEMBY")) {
        setCheatState("spurs");
        setTimeout(() => setCheatState(null), 3000);
      } else if (keyBuffer.endsWith("CHESS")) {
        setCheatState("chess");
        setTimeout(() => setCheatState(null), 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOctoClick = () => {
    const newClicks = octoClicks + 1;
    setOctoClicks(newClicks);

    if (newClicks === 5) {
      setShowCodeRain(true);
      setTimeout(() => setShowCodeRain(false), 3000);
    }
  };

  const handleCardClick = (index: number) => {
    setClickedCards((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      if (newSet.size === 3) {
        setShowSpeechBubble(true);
        setTimeout(() => {
          setShowSpeechBubble(false);
          setClickedCards(new Set());
        }, 3000);
      }
      return newSet;
    });
  };

  const getGraphColor = (col: number, row: number) => {
    if (cheatState === "rainbow") {
      const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
      ];
      return colors[(col + row) % colors.length];
    }
    if (cheatState === "spurs") {
      return (col + row) % 2 === 0 ? "bg-zinc-900" : "bg-zinc-300";
    }
    // Default grayscale pattern
    const val = (col * 7 + row) % 10;
    if (val > 8) return "bg-[var(--museum-border-strong)]";
    if (val > 6) return "bg-stone-500";
    if (val > 3) return "bg-stone-700";
    return "bg-[var(--museum-bg)]";
  };

  const getOctoVisual = () => {
    if (cheatState === "chess") return "♟️🐱";
    if (cheatState === "spurs") return "🧢🐱";
    if (octoClicks >= 50) return "👑🐱";
    if (octoClicks >= 20) return "🧢🐱";
    if (octoClicks >= 10) return "👋🐱";
    if (octoClicks >= 5) return "😳🐱";
    return "😴🐱";
  };

  return (
    <>
      {/* Trailing Octocat */}
      <motion.div
        className="fixed z-[100] pointer-events-none text-2xl drop-shadow-md"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
      >
        🐱
      </motion.div>

      {/* Code Rain Overlay */}
      <AnimatePresence>
        {showCodeRain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] pointer-events-none overflow-hidden flex justify-around bg-[var(--museum-bg)] backdrop-blur-sm"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -1000 }}
                animate={{ y: "100vh" }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2,
                }}
                className="text-[var(--museum-success)] font-mono text-xl opacity-80"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                }}
              >
                {Array.from({ length: 25 })
                  .map(() => (Math.random() > 0.5 ? "1" : "0"))
                  .join("")}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-black text-[var(--museum-success)] tracking-widest"
              style={{ textShadow: "0 0 30px var(--museum-success)" }}
            >
              LEVEL UP!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        id="GitHub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-12 md:col-span-6 relative overflow-hidden h-full flex flex-col"
      >
        <MuseumCard className="h-full flex flex-col p-8 md:p-10 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--museum-panel-elevated)] rounded-lg border border-[var(--museum-border)]">
              <Github className="w-6 h-6 text-[var(--museum-text)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--museum-text)] tracking-tight">
                Digital Wilderness
              </h2>
              <p className="text-sm text-[var(--museum-text-muted)]">Journey from zero to one</p>
            </div>
          </div>
          <MuseumButton
            as="a"
            variant="primary"
            href="https://github.com/RockyBabcock"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit github.com/RockyBabcock <ExternalLink className="w-4 h-4 ml-2" />
          </MuseumButton>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 flex-1">
          {/* Empty State (Wilderness Survival) */}
          <div className="2xl:col-span-2 flex flex-col gap-6">
            <div
              className="border-2 border-dashed border-[var(--museum-border-strong)] hover:border-[var(--museum-accent)] bg-[var(--museum-panel-elevated)] rounded-3xl p-12 flex flex-col items-center justify-center relative cursor-pointer group transition-colors min-h-[200px]"
              onClick={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <TreePine className="w-12 h-12 text-[var(--museum-text-muted)] mb-4 group-hover:text-[var(--museum-accent)] transition-colors" />
              <p className="animate-pulse font-mono text-sm text-[var(--museum-text-muted)]">
                Surviving in the Wilderness... Coming Soon.
              </p>

              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-4 bg-[var(--museum-accent)] text-white text-xs px-4 py-2 rounded shadow-xl font-bold tracking-wide"
                  >
                    Star me to witness the journey from zero to one.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI Showcase Area */}
            <div className="relative">
              <AnimatePresence>
                {showSpeechBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[var(--museum-accent)] text-white text-sm font-bold px-6 py-3 rounded-3xl whitespace-nowrap z-10 shadow-2xl"
                  >
                    I'm working on it, I'm working on it! (Really!)
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--museum-accent)]" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {AI_PROJECTS.map((proj, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
                    onClick={() => handleCardClick(i)}
                    className={cn(
                      "bg-[var(--museum-panel-elevated)] p-5 rounded-3xl border cursor-pointer relative overflow-hidden transition-colors",
                      clickedCards.has(i)
                        ? "border-[var(--museum-accent)]"
                        : "border-[var(--museum-border-strong)] hover:border-[var(--museum-text-muted)]",
                    )}
                  >
                    <div className="absolute top-3 right-3 bg-[var(--museum-bg)] text-[var(--museum-text-muted)] text-[9px] font-mono px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                      WIP
                    </div>
                    <proj.icon className="w-8 h-8 mb-4 text-[var(--museum-accent)]" />
                    <h4 className="font-bold text-sm text-[var(--museum-text)]">
                      {proj.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Octocat & Graph */}
          <div className="flex flex-col gap-6">
            {/* Octocat Evolution */}
            <div className="bg-[var(--museum-panel-elevated)] p-6 rounded-3xl border border-[var(--museum-border)] flex flex-col items-center justify-center relative overflow-hidden min-h-[200px]">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--museum-text-muted)] mb-6 font-bold">
                Octocat Evolution
              </h3>

              <motion.div
                className={cn(
                  "text-7xl cursor-pointer select-none transition-all duration-500 relative z-10",
                  octoClicks >= 50
                    ? "drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                    : "",
                )}
                style={{
                  filter:
                    octoClicks >= 50
                      ? "sepia(1) saturate(5) hue-rotate(10deg)"
                      : "none",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOctoClick}
              >
                {getOctoVisual()}
              </motion.div>

              <div className="mt-6 font-mono text-xs font-bold text-[var(--museum-accent)] bg-[var(--museum-accent)]/10 px-3 py-1 rounded-full border border-[var(--museum-accent)]/20">
                Level: {octoClicks}
              </div>

              <AnimatePresence>
                {octoClicks >= 10 && octoClicks < 20 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 font-bold text-white text-sm"
                  >
                    Hi Rocky! 👋
                  </motion.div>
                )}
                {cheatState === "chess" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 font-bold text-white text-sm"
                  >
                    Checkmate incoming. ♟️
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contribution Graph & Predictor */}
            <div className="bg-[var(--museum-panel-elevated)] p-6 rounded-3xl border border-[var(--museum-border)]">
              <div className="flex gap-1 mb-6 overflow-hidden justify-center">
                {Array.from({ length: 14 }).map((_, col) => (
                  <div key={col} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, row) => (
                      <div
                        key={row}
                        className={cn(
                          "w-3 h-3 rounded-sm transition-colors duration-500",
                          getGraphColor(col, row),
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div
                className="p-4 bg-[var(--museum-bg)] rounded-lg cursor-pointer border border-[var(--museum-border)] hover:border-[var(--museum-accent)]/50 transition-colors group"
                onClick={() => setPredictorMode((p) => (p + 1) % 3)}
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--museum-text-muted)] mb-2 flex justify-between items-center">
                  <span>Contribution Predictor</span>
                  <span className="text-[var(--museum-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to cycle
                  </span>
                </div>
                <div className="font-body text-sm font-bold text-[var(--museum-text)] min-h-[40px] flex items-center">
                  {PREDICTOR_MODES[predictorMode]}
                </div>
              </div>
            </div>
          </div>
        </div>
        </MuseumCard>
      </motion.div>
    </>
  );
}
