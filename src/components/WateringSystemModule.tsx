import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Droplets,
  Sparkles,
  Sun,
  Scissors,
  RotateCcw,
  Github,
  Music,
  Gamepad2,
  Trophy,
  Skull,
  AlertCircle,
} from "lucide-react";
import gsap from "gsap";
import { StatusPill } from "./StatusPill";
import { MuseumCard } from "./common/MuseumCard";

// --- Constants & Data ---
const STAGES = [
  { level: 0, name: "Seed", threshold: 0, scale: 0.1 },
  { level: 1, name: "Sprout", threshold: 10, scale: 0.25 },
  { level: 2, name: "Seedling", threshold: 25, scale: 0.4 },
  { level: 3, name: "Young Tree", threshold: 45, scale: 0.65 },
  { level: 4, name: "Bushy Tree", threshold: 70, scale: 1.0 },
  { level: 5, name: "Mature Tree", threshold: 100, scale: 1.6 },
  { level: 6, name: "Towering Tree", threshold: 140, scale: 2.4 },
  { level: 7, name: "Wise Ancient Tree", threshold: 190, scale: 3.2 },
  { level: 8, name: "Legendary Tree", threshold: 250, scale: 4.0 },
];

const REMARKS = {
  water: [
    "Gulp, gulp... I’ve grown taller again! Just like your Chess.com streak!",
    "Refreshing! My roots are expanding like your codebase.",
    "Ah, hydration! I feel a growth spurt coming on.",
  ],
  fertilize: [
    "This fertilizer smells amazing! Just like Wemby’s stats this season!",
    "POWER OVERWHELMING! I'm growing at 10x speed!",
    "Nutrients acquired. Commencing rapid cellular division.",
  ],
  sunbathe: [
    "Ahh, the sun feels so good. I’m ready to take on the world—just like my favorite games!",
    "Photosynthesis at maximum capacity. Praise the sun!",
    "Soaking up those rays. I feel energized!",
  ],
  prune: [
    "Snip, snip—looking great! Now I look as lush as your GitHub contribution graph.",
    "A little off the top. Very stylish.",
    "Ouch! Just kidding, that actually feels much better.",
  ],
};

const FRUITS = [
  {
    id: "chess",
    icon: "♟️",
    label: "Chess",
    color: "bg-gray-800",
    link: "#Chess",
  },
  {
    id: "basketball",
    icon: "🏀",
    label: "Hoops",
    color: "bg-orange-500",
    link: "#Basketball",
  },
  {
    id: "vinyl",
    icon: "💿",
    label: "Media",
    color: "bg-purple-500",
    link: "#GameMedia",
  },
  {
    id: "ac",
    icon: "🦅",
    label: "AC Unity",
    color: "bg-red-600",
    link: "#Timeline",
  },
  {
    id: "github",
    icon: <Github size={16} />,
    label: "GitHub",
    color: "bg-black",
    link: "#GitHub",
  },
];

// --- Subcomponents ---

const TreeSVG = ({
  stageIndex,
  isJoker,
  isKnight,
  isGotham,
  isWemby,
  theme,
}: any) => {
  const trunkRef = useRef<SVGGElement>(null);
  const branchesRef = useRef<SVGGElement>(null);
  const leavesRef = useRef<SVGGElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = STAGES[stageIndex];
    const scale = stage.scale;

    // Zoom out effect for larger stages
    const containerScale = stageIndex >= 5 ? 1 / (scale * 0.5) : 1;

    gsap.to(containerRef.current, {
      scale: containerScale,
      transformOrigin: "bottom center",
      duration: 2,
      ease: "power2.inOut",
    });

    // Trunk thickens and scales
    gsap.to(trunkRef.current, {
      scaleY: scale,
      scaleX: Math.min(scale * 0.8, 2.5),
      transformOrigin: "bottom center",
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(shadowRef.current, {
      scale: scale,
      transformOrigin: "center",
      duration: 1.2,
    });

    // Branches
    if (stageIndex >= 3) {
      gsap.to(branchesRef.current, {
        scale: scale * 0.9,
        opacity: 1,
        transformOrigin: "bottom center",
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
      });
    } else {
      gsap.to(branchesRef.current, { opacity: 0, duration: 0.5 });
    }

    // Leaves burst
    if (stageIndex > 0) {
      gsap.to(leavesRef.current, {
        scale: scale,
        opacity: 1,
        transformOrigin: "bottom center",
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.4,
      });
    } else {
      gsap.to(leavesRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [stageIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-end justify-center pb-10 transition-transform duration-1000 ${isGotham ? "rotate-180" : ""}`}
    >
      <svg
        width="400"
        height="500"
        viewBox="0 0 400 500"
        className="overflow-visible"
      >
        {/* Shadow */}
        <ellipse
          ref={shadowRef}
          cx="200"
          cy="480"
          rx="50"
          ry="15"
          fill="rgba(0,0,0,0.3)"
        />

        {/* Trunk */}
        <g ref={trunkRef}>
          <path
            d="M180,480 Q200,250 200,200 Q200,250 220,480 Z"
            fill="#5D4037"
          />
          {/* Face */}
          {stageIndex >= 2 && (
            <g transform="translate(190, 400) scale(0.5)">
              <circle cx="5" cy="0" r="3" fill="#3E2723" />
              <circle cx="25" cy="0" r="3" fill="#3E2723" />
              <path
                d="M10,10 Q15,15 20,10"
                stroke="#3E2723"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>

        {/* Branches */}
        <g ref={branchesRef} opacity="0">
          <path
            d="M200,350 Q120,280 90,250"
            stroke="#5D4037"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M200,300 Q280,230 310,200"
            stroke="#5D4037"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M200,250 Q140,180 110,140"
            stroke="#5D4037"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M200,220 Q260,150 290,110"
            stroke="#5D4037"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {isWemby && (
            <path
              d="M200,180 Q300,100 350,50"
              stroke="#4CAF50"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
            />
          )}
        </g>

        {/* Leaves */}
        <g ref={leavesRef} opacity="0">
          {/* Base leaves */}
          <circle
            cx="200"
            cy="180"
            r="80"
            fill={theme === "silver" ? "#9CA3AF" : "#2E7D32"}
            opacity="0.9"
          />
          <circle
            cx="130"
            cy="230"
            r="60"
            fill={theme === "silver" ? "#6B7280" : "#388E3C"}
            opacity="0.9"
          />
          <circle
            cx="270"
            cy="210"
            r="70"
            fill={theme === "silver" ? "#4B5563" : "#1B5E20"}
            opacity="0.9"
          />

          {/* Mid leaves */}
          <circle
            cx="150"
            cy="130"
            r="65"
            fill={theme === "silver" ? "#D1D5DB" : "#4CAF50"}
            opacity="0.9"
          />
          <circle
            cx="250"
            cy="140"
            r="75"
            fill={theme === "silver" ? "#9CA3AF" : "#2E7D32"}
            opacity="0.9"
          />

          {/* High leaves (Stage 4+) */}
          {stageIndex >= 4 && (
            <>
              <circle
                cx="100"
                cy="180"
                r="70"
                fill={theme === "silver" ? "#6B7280" : "#388E3C"}
                opacity="0.9"
              />
              <circle
                cx="300"
                cy="160"
                r="70"
                fill={theme === "silver" ? "#4B5563" : "#1B5E20"}
                opacity="0.9"
              />
              <circle
                cx="200"
                cy="80"
                r="90"
                fill={theme === "silver" ? "#D1D5DB" : "#4CAF50"}
                opacity="0.9"
              />
            </>
          )}

          {/* Legendary leaves (Stage 8) */}
          {stageIndex >= 8 && (
            <>
              <circle
                cx="60"
                cy="140"
                r="80"
                fill={theme === "silver" ? "#E5E7EB" : "#81C784"}
                opacity="0.8"
              />
              <circle
                cx="340"
                cy="120"
                r="80"
                fill={theme === "silver" ? "#D1D5DB" : "#66BB6A"}
                opacity="0.8"
              />
              <circle
                cx="200"
                cy="20"
                r="110"
                fill={theme === "silver" ? "#F3F4F6" : "#A5D6A7"}
                opacity="0.8"
              />
              <circle
                cx="120"
                cy="60"
                r="85"
                fill={theme === "silver" ? "#D1D5DB" : "#4CAF50"}
                opacity="0.9"
              />
              <circle
                cx="280"
                cy="50"
                r="95"
                fill={theme === "silver" ? "#6B7280" : "#388E3C"}
                opacity="0.9"
              />
            </>
          )}

          {isWemby && (
            <circle cx="350" cy="50" r="40" fill="#FF9800" opacity="0.9" />
          )}
        </g>
      </svg>

      {/* Joker Graffiti */}
      <AnimatePresence>
        {isJoker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "brightness(2) blur(10px)" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <div
              className="text-green-500 font-black text-6xl md:text-8xl transform -rotate-12 opacity-90 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
              style={{ fontFamily: "Impact, sans-serif" }}
            >
              HA HA HA
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Knight Pulse */}
      {isKnight && (
        <div className="absolute inset-0 rounded-full border-8 border-yellow-500 animate-ping opacity-50 pointer-events-none" />
      )}
    </div>
  );
};

const Background = ({
  stageIndex,
  isSunbathing,
  isWhySoSerious,
  theme,
}: any) => {
  let bgClass = "bg-gradient-to-b from-blue-900 to-slate-900";

  if (isWhySoSerious) {
    bgClass = "bg-gradient-to-b from-purple-900 via-green-900 to-black";
  } else if (theme === "golden") {
    bgClass = "bg-gradient-to-b from-yellow-600 via-yellow-800 to-black";
  } else if (theme === "cyber") {
    bgClass = "bg-gradient-to-b from-cyan-900 via-blue-900 to-black";
  } else if (theme === "pvz") {
    bgClass = "bg-gradient-to-b from-blue-400 via-blue-600 to-green-800";
  } else if (theme === "silver") {
    bgClass = "bg-gradient-to-b from-gray-700 via-gray-900 to-black";
  } else if (stageIndex >= 8) {
    bgClass = "bg-gradient-to-b from-indigo-900 via-purple-900 to-black";
  } else if (stageIndex >= 5) {
    bgClass = "bg-gradient-to-b from-blue-800 to-slate-900";
  }

  return (
    <div
      className={`absolute inset-0 transition-colors duration-1000 ${bgClass}`}
    >
      {/* Sunbathing effect */}
      <AnimatePresence>
        {isSunbathing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-transparent mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      {/* Stars/Dust */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  );
};

const Particles = ({ particles }: { particles: any[] }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: "100%", x: `${p.x}%`, scale: 0.5 }}
            animate={{
              opacity: 0,
              y: "0%",
              x: `${p.x + (Math.random() * 20 - 10)}%`,
              scale: 1.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute bottom-0 w-3 h-3 rounded-full ${p.type === "water" ? "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" : "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]"}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export function WateringSystemModule() {
  // State
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    water: 0,
    fertilize: 0,
    sunbathe: 0,
    prune: 0,
  });
  const [fertilizeUsesToday, setFertilizeUsesToday] = useState(0);
  const [speech, setSpeech] = useState<string | null>(null);
  const [mood, setMood] = useState("Happy");
  const [particles, setParticles] = useState<any[]>([]);
  const [isSunbathing, setIsSunbathing] = useState(false);

  // Easter Eggs
  const [isJoker, setIsJoker] = useState(false);
  const [isKnight, setIsKnight] = useState(false);
  const [isGotham, setIsGotham] = useState(false);
  const [isWhySoSerious, setIsWhySoSerious] = useState(false);

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);

  const [waterCombo, setWaterCombo] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationText, setCelebrationText] = useState("");
  const [isWemby, setIsWemby] = useState(false);
  const [theme, setTheme] = useState("classic");

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wateringSystemState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let loadedProgress = parsed.progress || 0;

        // Daily Bonus Logic
        const lastVisit = parsed.lastVisitDate;
        const today = new Date().toDateString();

        if (lastVisit && lastVisit !== today) {
          loadedProgress = Math.min(loadedProgress + 15, 250); // ~6% of 250
          showSpeech("I grew a bit while you were away! ☀️");
        }

        setProgress(loadedProgress);
        setStats(
          parsed.stats || { water: 0, fertilize: 0, sunbathe: 0, prune: 0 },
        );
        if (parsed.lastFertilizeDate === today) {
          setFertilizeUsesToday(parsed.fertilizeUsesToday || 0);
        } else {
          setFertilizeUsesToday(0);
        }
      } catch (e) {
        console.error("Failed to parse watering system state", e);
      }
    }

    // Keyboard Easter Eggs
    let typed = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toUpperCase();
      if (typed.length > 20) typed = typed.slice(-20);

      if (typed.includes("JOKER")) {
        setIsJoker(true);
        setTimeout(() => setIsJoker(false), 5000);
        typed = "";
      }
      if (typed.includes("KNIGHT")) {
        setIsKnight(true);
        setTimeout(() => setIsKnight(false), 5000);
        typed = "";
      }
      if (typed.includes("GOTHAM")) {
        setIsGotham((prev) => !prev);
        typed = "";
      }
      if (typed.includes("YEARONE")) {
        setProgress(250);
        showSpeech("Year One protocol activated. Instant growth achieved.");
        typed = "";
      }
      if (typed.includes("WEMBY")) {
        setIsWemby(true);
        showSpeech("Alien DNA detected. 👽🏀");
        typed = "";
      }
      if (typed.includes("UPUPDOWNDOWNLEFTRIGHTLEFTRIGHTBA")) {
        if (progress >= 250) {
          setTheme("golden");
          playAudio(2022); // Re-use noise for now, or add Eminem logic
          showSpeech("Secret Golden Mode Activated! 🏆");
        }
        typed = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem(
      "wateringSystemState",
      JSON.stringify({
        progress,
        stats,
        fertilizeUsesToday,
        lastFertilizeDate: new Date().toDateString(),
        lastVisitDate: new Date().toDateString(),
      }),
    );
  }, [progress, stats, fertilizeUsesToday]);

  // Determine current stage
  const currentStageIndex = STAGES.reduce((acc, stage, idx) => {
    return progress >= stage.threshold ? idx : acc;
  }, 0);
  const currentStage = STAGES[currentStageIndex];
  const nextStage = STAGES[currentStageIndex + 1];
  const progressToNext = nextStage
    ? ((progress - currentStage.threshold) /
        (nextStage.threshold - currentStage.threshold)) *
      100
    : 100;

  // Height calculation (5cm to 1000cm)
  const currentHeight = Math.floor(5 + (progress / 250) * 995);

  // Stage up celebration
  useEffect(() => {
    if (currentStageIndex === 4 && progress === STAGES[4].threshold) {
      triggerCelebration("You grew a Bushy Tree!");
    } else if (currentStageIndex === 6 && progress === STAGES[6].threshold) {
      triggerCelebration("You grew a Towering Tree!");
    } else if (currentStageIndex === 8 && progress === STAGES[8].threshold) {
      triggerCelebration("Legendary Tree Unlocked!");
    }
  }, [currentStageIndex, progress]);

  const triggerCelebration = (text: string) => {
    setCelebrationText(text);
    setShowCelebration(true);
    playAudio(1989); // Fanfare
    setTimeout(() => setShowCelebration(false), 4000);
  };

  // Screen Shake for stages 7 and 8
  useEffect(() => {
    if (
      (currentStageIndex === 7 || currentStageIndex === 8) &&
      containerRef.current
    ) {
      gsap.fromTo(
        containerRef.current,
        { x: -5 },
        { x: 5, duration: 0.1, yoyo: true, repeat: 5, ease: "linear" },
      );
      // Simulate snap sound
      playAudio(1966); // Reusing audio function for a quick blip
    }
  }, [currentStageIndex]);

  // Mood logic
  useEffect(() => {
    if (stats.water === 0 && progress > 0) setMood("Thirsty 🥺");
    else if (waterCombo > 8) setMood("Supercharged ⚡");
    else setMood("Happy 😊");
  }, [stats.water, progress, waterCombo]);

  const showSpeech = (text: string) => {
    setSpeech(text);
    setTimeout(() => setSpeech(null), 5000);
  };

  const spawnParticles = (type: "water" | "fertilize" | "prune") => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      type,
      x: 30 + Math.random() * 40, // Center around 50%
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  const playAudio = (year: number) => {
    const ctx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (year === 1966) {
      // Snip / Quick blip
      osc.type = "square";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (year === 1989) {
      // Fanfare / Power up
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.2);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else if (year === 2008) {
      // Water drop
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (year === 2022) {
      // Noise / Golden Mode
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }
  };

  const handleAction = (
    action: "water" | "fertilize" | "sunbathe" | "prune",
  ) => {
    let progressGain = 0;

    if (action === "water") {
      setWaterCombo((prev) => prev + 1);
      if (waterCombo > 8) {
        progressGain = 0.5; // Diminishing returns
        showSpeech("I’m full! Come back tomorrow for max growth 🌱");
      } else {
        progressGain = 2;
        playAudio(2008);
      }
      spawnParticles("water");
    } else {
      setWaterCombo(0);
    }

    if (action === "fertilize") {
      if (fertilizeUsesToday >= 5) {
        showSpeech("I'm too full! No more fertilizer today.");
        return;
      }
      progressGain = 10;
      setFertilizeUsesToday((prev) => prev + 1);
      spawnParticles("fertilize");
      playAudio(1989);
    }

    if (action === "sunbathe") {
      progressGain = 5;
      setIsSunbathing(true);
      setTimeout(() => setIsSunbathing(false), 2000);
      showSpeech(
        REMARKS.sunbathe[Math.floor(Math.random() * REMARKS.sunbathe.length)],
      );
    }

    if (action === "prune") {
      progressGain = 1;
      spawnParticles("prune");
      playAudio(1966);
      showSpeech(
        REMARKS.prune[Math.floor(Math.random() * REMARKS.prune.length)],
      );
    }

    setProgress((prev) => {
      const newProgress = Math.min(prev + progressGain, 250);
      // Check if we crossed a threshold to trigger celebration exactly once
      return newProgress;
    });

    setStats((prev) => ({ ...prev, [action]: prev[action] + 1 }));

    if (action === "water" || action === "fertilize") {
      const remarks = REMARKS[action];
      if (waterCombo <= 8) {
        showSpeech(remarks[Math.floor(Math.random() * remarks.length)]);
      }
    }
  };

  const resetTree = () => {
    setProgress(0);
    setStats({ water: 0, fertilize: 0, sunbathe: 0, prune: 0 });
    setFertilizeUsesToday(0);
    setIsJoker(false);
    setIsKnight(false);
    setIsGotham(false);
    setIsWhySoSerious(false);
    showSpeech("A new beginning! Let's grow together.");
  };

  return (
    <div
      id="Watering"
      ref={containerRef}
      className="col-span-12 h-full flex flex-col"
    >
      <MuseumCard className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8 h-full rounded-3xl !bg-black/95 text-white overflow-hidden shadow-2xl relative">
      <Background
        stageIndex={currentStageIndex}
        isSunbathing={isSunbathing}
        isWhySoSerious={isWhySoSerious}
        theme={theme}
      />
      <Particles particles={particles} />

      {/* Left/Center: Tree & Actions */}
      <div className="lg:col-span-2 flex flex-col items-center justify-between min-h-[500px] relative z-10">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-label text-xs uppercase tracking-[0.2em] font-black text-white drop-shadow-md">
                Digital Garden
              </h3>
              <StatusPill status="Experimental Prototype" />
            </div>
            <p className="font-mono text-[10px] text-white/80 uppercase drop-shadow-md">
              Mood: {mood} | Height: {currentHeight} cm
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsWhySoSerious(!isWhySoSerious)}
              className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold rounded uppercase shadow-lg"
            >
              Why So Serious?
            </button>
            <button
              onClick={resetTree}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              title="Reset Day"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Evidence Block */}
        <div className="w-full relative z-20 flex flex-col lg:flex-row gap-4 bg-black/40 border border-white/10 rounded-xl p-4 backdrop-blur-md mb-4 text-left">
          <div className="flex-1">
            <h4 className="font-mono text-[10px] text-green-400 uppercase tracking-widest font-bold mb-1">
              What I built
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              A playful gamified habit tracker built with React and GSAP, using
              local storage for progression.
            </p>
          </div>
          <div className="flex-1">
            <h4 className="font-mono text-[10px] text-green-400 uppercase tracking-widest font-bold mb-1">
              What I learned
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Complex state management, particle animation performance
              optimizations, and SVG transformations.
            </p>
          </div>
          <div className="flex-1">
            <h4 className="font-mono text-[10px] text-green-400 uppercase tracking-widest font-bold mb-1">
              What's next
            </h4>
            <div className="text-xs text-white/80 leading-relaxed flex items-start gap-1.5">
              <AlertCircle
                size={12}
                className="mt-0.5 text-green-400/70 shrink-0"
              />
              <span>
                Connect to a backend to make gardens multiplayer so users can
                water each other's trees.
              </span>
            </div>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="h-16 w-full max-w-md flex items-end justify-center z-20">
          <AnimatePresence>
            {speech && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="bg-white border-2 border-ink text-ink font-bold text-sm px-4 py-2 rounded-3xl rounded-br-none shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center"
              >
                {speech}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tree Container */}
        <div className="flex-1 w-full relative flex items-end justify-center perspective-1000 my-4">
          <TreeSVG
            stageIndex={currentStageIndex}
            isJoker={isJoker}
            isKnight={isKnight}
            isGotham={isGotham}
            isWemby={isWemby}
            theme={theme}
          />

          {/* Fruits */}
          <AnimatePresence>
            {currentStageIndex >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none z-30"
              >
                {FRUITS.map((fruit, i) => {
                  // Only show fruits based on stage
                  if (i > currentStageIndex - 3) return null;

                  const positions = [
                    { top: "30%", left: "30%" },
                    { top: "40%", left: "70%" },
                    { top: "20%", left: "50%" },
                    { top: "50%", left: "20%" },
                    { top: "60%", left: "80%" },
                  ];
                  const pos = positions[i % positions.length];

                  return (
                    <motion.a
                      key={fruit.id}
                      href={fruit.link}
                      initial={{ scale: 0, y: 20 }}
                      animate={{
                        scale: 1,
                        y: [0, -10, 0],
                      }}
                      transition={{
                        scale: { type: "spring", bounce: 0.5 },
                        y: {
                          repeat: Infinity,
                          duration: 3 + i,
                          ease: "easeInOut",
                        },
                      }}
                      className={`absolute w-10 h-10 ${fruit.color} rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto cursor-pointer hover:scale-110 transition-transform group border-2 border-white`}
                      style={pos}
                      title={fruit.label}
                    >
                      {fruit.icon}
                      <span className="absolute -top-8 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {fruit.label}
                      </span>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Celebration Overlay */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
              >
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-3xl border-4 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.5)] text-center">
                  <h2 className="text-3xl font-black text-green-600 uppercase tracking-widest mb-2">
                    Level Up!
                  </h2>
                  <p className="text-xl font-bold text-gray-800">
                    {celebrationText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 z-20 w-full bg-black/20 p-4 rounded-3xl backdrop-blur-sm border border-white/10">
          <button
            onClick={() => handleAction("water")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full font-bold text-sm shadow-[0_4px_0_rgb(29,78,216)] hover:shadow-[0_2px_0_rgb(29,78,216)] hover:translate-y-[2px] transition-all"
          >
            <Droplets size={16} /> Water
          </button>
          <button
            onClick={() => handleAction("fertilize")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${fertilizeUsesToday >= 5 ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_4px_0_rgb(126,34,206)] hover:shadow-[0_2px_0_rgb(126,34,206)] hover:translate-y-[2px]"}`}
          >
            <Sparkles size={16} /> Fertilize ({5 - fertilizeUsesToday})
          </button>
          <button
            onClick={() => handleAction("sunbathe")}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-full font-bold text-sm shadow-[0_4px_0_rgb(194,65,12)] hover:shadow-[0_2px_0_rgb(194,65,12)] hover:translate-y-[2px] transition-all"
          >
            <Sun size={16} /> Sunbathe
          </button>
          <button
            onClick={() => handleAction("prune")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-sm shadow-[0_4px_0_rgb(21,128,61)] hover:shadow-[0_2px_0_rgb(21,128,61)] hover:translate-y-[2px] transition-all"
          >
            <Scissors size={16} /> Prune
          </button>
        </div>
      </div>

      {/* Right: Stats & Log */}
      <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-6 flex flex-col z-10">
        <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-white mb-4 drop-shadow-md">
          Growth Stats
        </h4>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-white">
            <span className="text-sm font-bold flex items-center gap-2">
              <Droplets size={14} className="text-blue-300" /> Watered
            </span>
            <span className="font-mono font-black">{stats.water}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-white">
            <span className="text-sm font-bold flex items-center gap-2">
              <Sparkles size={14} className="text-purple-300" /> Fertilized
            </span>
            <span className="font-mono font-black">{stats.fertilize}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-white">
            <span className="text-sm font-bold flex items-center gap-2">
              <Sun size={14} className="text-orange-300" /> Sunbathed
            </span>
            <span className="font-mono font-black">{stats.sunbathe}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-white">
            <span className="text-sm font-bold flex items-center gap-2">
              <Scissors size={14} className="text-green-300" /> Pruned
            </span>
            <span className="font-mono font-black">{stats.prune}</span>
          </div>
        </div>

        <div className="flex-1 bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/20 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
          {/* Theme Switcher (Unlocked at Stage 6) */}
          {currentStageIndex >= 6 && (
            <div className="absolute top-2 right-2 flex gap-1 z-20">
              {["classic", "pvz", "cyber", "silver"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-4 h-4 rounded-full border border-white/50 ${theme === t ? "ring-2 ring-white scale-110" : "opacity-50"} ${
                    t === "classic"
                      ? "bg-green-500"
                      : t === "pvz"
                        ? "bg-lime-400"
                        : t === "cyber"
                          ? "bg-cyan-400"
                          : "bg-gray-300"
                  }`}
                  title={`Theme: ${t}`}
                />
              ))}
            </div>
          )}

          <div className="font-black uppercase tracking-tight text-2xl leading-none mb-2">
            {currentStage.name}
          </div>
          <div className="text-xs font-mono text-white/60 uppercase mb-4">
            Stage {currentStageIndex + 1} of 9
          </div>

          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-[10px] font-mono text-white/40 uppercase w-full text-right">
            {Math.floor(progressToNext)}% to next stage
          </div>

          {currentStageIndex === 8 && (
            <div className="mt-4 text-xs font-bold text-yellow-900 bg-yellow-400 px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              Legendary Status Achieved!
            </div>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={() => {
            showSpeech("Screenshot saved! (Simulated)");
            playAudio(1966);
          }}
          className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors backdrop-blur-sm"
        >
          Share Your Tree
        </button>

        {/* Batman Audio Archives */}
        <div className="mt-4 flex justify-between gap-2">
          {[1966, 1989, 2008, 2022].map((year) => (
            <button
              key={year}
              onClick={() => playAudio(year)}
              className="flex-1 py-1 bg-white/5 hover:bg-white/20 border border-white/10 rounded text-[9px] font-mono text-white/50 hover:text-white transition-colors"
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      </MuseumCard>
    </div>
  );
}
