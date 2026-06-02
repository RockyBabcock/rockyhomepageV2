import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Volume2,
  VolumeX,
  ArrowDown,
  ShieldAlert,
  Cpu,
  Maximize,
  Activity,
  AlertCircle,
} from "lucide-react";
import { StatusPill } from "./StatusPill";
import { MuseumCard } from "./common/MuseumCard";

/* --- UTILS & AUDIO --- */
const playAudio = (type: string, enabled: boolean) => {
  if (!enabled) return;
  const audioCtx = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();

  if (type === "door") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(50, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1.2);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  } else if (type === "beep") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === "swoosh") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  }
};

export function BasketballModule() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="col-span-12 md:col-span-12 my-10">
      <MuseumCard className="!p-0 font-sans relative overflow-hidden rounded-3xl border border-[var(--museum-border-strong)] bg-black text-[var(--museum-text)] tracking-wide">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="absolute top-6 left-6 z-50 flex gap-4 items-center">
        <StatusPill status="Personal Archive" />
      </div>

      <button
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          if (!soundEnabled) playAudio("door", true);
        }}
        className="absolute top-6 right-6 z-50 p-3 border-[2px] border-[var(--museum-border-strong)] bg-black/50 hover:bg-[var(--museum-accent)] hover:text-white transition-colors"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {/* Evidence Block */}
      <div className="relative z-40 mt-24 mx-6 p-6 flex flex-col lg:flex-row gap-6 bg-black/80 border border-[var(--museum-border-strong)] backdrop-blur-md rounded-2xl">
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-[#C0C0C0] uppercase tracking-widest font-bold mb-1">
            What I built
          </h4>
          <p className="text-sm text-[#C0C0C0]/80 leading-relaxed bg-[#111111]/80 backdrop-blur-sm p-3 rounded-none border border-[#4C392D]/50">
            An immersive narrative scroll exploring the geometry, history, and
            physics of San Antonio Spurs basketball.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-[#C0C0C0] uppercase tracking-widest font-bold mb-1">
            What I learned
          </h4>
          <p className="text-sm text-[#C0C0C0]/80 leading-relaxed bg-[#111111]/80 backdrop-blur-sm p-3 rounded-none border border-[#4C392D]/50">
            Web design can be cinematic; using scroll-linked animations and
            spatial storytelling creates a powerful mood.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-[#C0C0C0] uppercase tracking-widest font-bold mb-1">
            What's next
          </h4>
          <div className="text-sm text-[#C0C0C0]/80 leading-relaxed bg-[#111111]/80 backdrop-blur-sm p-3 rounded-none border border-[#4C392D]/50 flex items-start gap-2">
            <AlertCircle
              size={14}
              className="mt-0.5 text-[#C0C0C0]/70 shrink-0"
            />
            <span>Add live game score tickers and player stat telemetry.</span>
          </div>
        </div>
      </div>

      {/* Narrative Scenes */}
      <div className="flex flex-col relative z-30 w-full mt-8">
        <Narthex soundEnabled={soundEnabled} />
        <TheBodyAsStructure soundEnabled={soundEnabled} />
        <TheFiveAndTheOne soundEnabled={soundEnabled} />
        <ThePhysicsOfMotion soundEnabled={soundEnabled} />
        <TheSpursTime soundEnabled={soundEnabled} />
        <SilenceAndNoise soundEnabled={soundEnabled} />
        <ThePureShape soundEnabled={soundEnabled} />
      </div>
      </MuseumCard>
    </div>
  );
}

/* --- SCENE 1: THE NARTHEX --- */
function Narthex({ soundEnabled }: { soundEnabled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the door automatically after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      if (soundEnabled) playAudio("door", true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [soundEnabled]);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center bg-gradient-to-b from-[#020202] to-[#1E152A] overflow-hidden border-b-4 border-[#C0C0C0]">
      {/* Stone Doors */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#0a0a0a] z-30 border-r border-[#C0C0C0]/50"
        initial={{ width: "50%" }}
        animate={{ width: isOpen ? "0%" : "49.8%" }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      />
      <motion.div
        className="absolute top-0 right-0 h-full bg-[#0a0a0a] z-30 border-l border-[#C0C0C0]/50"
        initial={{ width: "50%" }}
        animate={{ width: isOpen ? "0%" : "49.8%" }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
      />

      {/* Central Seam */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#d4af37] via-[#C0C0C0] to-[#8A1538] z-40 mix-blend-screen shadow-[0_0_20px_#8A1538]"
        animate={{ opacity: isOpen ? 0 : [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center p-8 z-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Background Dome Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-[60%] max-w-2xl stroke-[#C0C0C0] fill-none stroke-[0.2]"
          >
            <motion.path
              d="M 10 90 Q 50 10 90 90"
              animate={{
                d: [
                  "M 10 90 Q 50 10 90 90",
                  "M 20 90 Q 50 20 80 90",
                  "M 10 90 Q 50 10 90 90",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.path
              d="M 30 90 Q 50 40 70 90"
              animate={{
                d: [
                  "M 30 90 Q 50 40 70 90",
                  "M 40 90 Q 50 50 60 90",
                  "M 30 90 Q 50 40 70 90",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <path d="M 0 90 L 100 90" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Wemby Geometric Abstract */}
        <div className="relative w-48 h-64 border-2 border-[#C0C0C0] flex items-center justify-center mb-8 bg-[#0a0a0a] shadow-[0_0_30px_rgba(0,119,255,0.2),8px_8px_0_#8A1538] group overflow-hidden">
          {/* Particles */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0077FF]/20 to-[#8A1538]/20 mix-blend-overlay z-0" />
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-8 bg-[#C0C0C0]/50"
                style={{ left: `${10 * i}%` }}
                animate={{ y: [-50, 300], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random(),
                }}
              />
            ))}
          </div>
          {/* Structure */}
          <div className="w-1 h-full bg-gradient-to-t from-[#8A1538] via-[#C0C0C0] to-[#0077FF] z-10 transition-transform duration-500 group-hover:scale-y-110" />
          <motion.div
            className="absolute top-[20%] w-[120%] h-1 bg-[#C0C0C0] z-10"
            animate={{ width: ["100%", "130%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-[20%] w-full h-[60%] border-t-2 border-b-2 rounded-full border-[#C0C0C0]/30 z-0 transition-transform duration-700 group-hover:rotate-12" />
        </div>

        <div className="text-center bg-black/80 px-4 py-8 md:p-8 border-4 border-[#C0C0C0] shadow-[12px_12px_0_rgba(0,0,0,1)] relative max-w-2xl w-full">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
            Some are born to build.
            <br />
            Some are born to become
            <br />
            the foundation.
          </h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#d4af37] border-t-2 border-[#C0C0C0] pt-4 mt-4 inline-block bg-[#4C392D] px-4">
            In design and on the court — structure is sacred.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 md:bottom-8 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 bg-[#4C392D] px-2 border border-white/20">
            Step Forward
          </span>
          <ArrowDown className="w-6 h-6 text-white stroke-[3]" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* --- SCENE 2: THE BODY AS STRUCTURE --- */
function TheBodyAsStructure({ soundEnabled }: { soundEnabled: boolean }) {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [freezeFrame, setFreezeFrame] = useState(false);
  const handleFreezeToggle = () => {
    setFreezeFrame(!freezeFrame);
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const lineOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const copyData = {
    height: {
      label: "7'4\"",
      title: "HEIGHT",
      copy: "Height is talent, but the way you stand is choice.",
      principle: "Overshoot and Settle / Vertical Hierarchy",
    },
    wingspan: {
      label: "8'0\"",
      title: "WINGSPAN",
      copy: "Coverage is not control, but protection.",
      principle: "Spanning Geometry / Spatial Margins",
    },
    weight: {
      label: "220 lbs",
      title: "WEIGHT",
      copy: "Lightness is not fragility, it is the power of movement.",
      principle: "Controlled Easing / Stroke Resilience",
    },
    origin: {
      label: "FRANCE",
      title: "ORIGIN",
      copy: "From the city of light, but belonging to all cities that need structure.",
      principle: "Roots of Form / Grounded Origins",
    },
  };

  const currentCopy = activeElement
    ? copyData[activeElement as keyof typeof copyData]
    : null;

  return (
    <div
      ref={ref}
      className="min-h-screen w-full relative flex flex-col items-center justify-center bg-[#050505] overflow-hidden border-b-4 border-[#C0C0C0] p-8"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-10 pointer-events-none mix-blend-overlay" />

      {/* Title */}
      <div className="absolute top-12 left-8 md:top-24 md:left-24 z-20 pointer-events-none">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#C0C0C0]/50 mb-2">
          Hall 1
        </h2>
        <h3 className="text-2xl md:text-4xl font-headline font-black text-white tracking-widest uppercase">
          The Body As Structure
        </h3>
      </div>

      {/* Main Composition Area */}
      <motion.div
        className="relative w-full max-w-4xl h-[50vh] md:h-[60vh] flex items-center justify-center mt-20"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{ rotateX: mousePos.y * -4, rotateY: mousePos.x * 4 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ transformStyle: "preserve-3d", opacity: lineOpacity }}
        >
          {/* Main Spine (Height) */}
          <motion.div
            className="absolute h-[90%] md:h-full bg-gradient-to-t from-[#C0C0C0] via-[#8A1538] to-[#d4af37] origin-bottom cursor-pointer group"
            style={{
              width:
                activeElement === "weight"
                  ? 6
                  : activeElement === "height"
                    ? freezeFrame
                      ? 4
                      : 2
                    : 1,
            }}
            animate={
              activeElement === "height"
                ? freezeFrame
                  ? { scaleY: 1, y: 0 }
                  : { scaleY: [1, 1.2, 0.8, 1], y: [0, -50, 10, 0] }
                : activeElement === "weight"
                  ? freezeFrame
                    ? { scaleY: 0.9 }
                    : { scaleX: [1, 3, 1], scaleY: [1, 0.9, 1] }
                  : { scaleY: 1, y: 0 }
            }
            transition={
              activeElement === "height" && !freezeFrame
                ? { duration: 0.8, times: [0, 0.3, 0.7, 1] }
                : activeElement === "weight" && !freezeFrame
                  ? { duration: 0.5, repeat: 1, repeatType: "reverse" }
                  : {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }
            }
            onClick={() => {
              setActiveElement("height");
              setFreezeFrame(false);
              if (soundEnabled) playAudio("swoosh", true);
            }}
          >
            <div className="absolute top-1/2 -right-12 md:-right-24 w-12 md:w-24 border-t border-[#C0C0C0]/30 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/4 -left-12 md:-left-24 w-12 md:w-24 border-t border-[#C0C0C0]/30 -translate-y-1/2 pointer-events-none" />
          </motion.div>

          {/* Wingspan Arcs */}
          {(!activeElement ||
            activeElement === "wingspan" ||
            activeElement === "weight" ||
            activeElement === "origin") && (
            <motion.div
              className="absolute top-1/4 border-t border-[#C0C0C0] rounded-t-full cursor-pointer transition-all mix-blend-screen"
              style={{
                originY: 1,
                borderTopWidth: activeElement === "weight" ? 3 : 1,
              }}
              initial={{ width: "30%", height: "15%", opacity: 0.5 }}
              animate={
                activeElement === "wingspan"
                  ? freezeFrame
                    ? { width: "80%", height: "25%", opacity: 1 }
                    : {
                        width: ["30%", "90%", "80%"],
                        height: ["15%", "30%", "25%"],
                        opacity: [0.5, 1, 1],
                      }
                  : { width: "30%", height: "15%", opacity: 0.5 }
              }
              transition={
                activeElement === "wingspan" && !freezeFrame
                  ? { duration: 1, ease: "easeOut" }
                  : { duration: 0.5 }
              }
              onClick={() => {
                setActiveElement("wingspan");
                setFreezeFrame(false);
                if (soundEnabled) playAudio("swoosh", true);
              }}
            />
          )}

          {/* Origin Shimmer */}
          <motion.div
            className="absolute bottom-4 md:bottom-0 w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer mix-blend-screen"
            style={{
              backgroundColor:
                activeElement === "origin" ? "#ffffff" : "#404040",
            }}
            animate={
              activeElement === "origin"
                ? freezeFrame
                  ? { scale: 3, opacity: 0.8, boxShadow: "0 0 40px #fff" }
                  : {
                      scale: [1, 5, 3],
                      opacity: [0.5, 1, 0.8],
                      boxShadow: [
                        "0 0 0 #fff",
                        "0 0 60px #fff",
                        "0 0 40px #fff",
                      ],
                    }
                : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    boxShadow: "0 0 10px rgba(192,192,192,0.2)",
                  }
            }
            transition={
              activeElement === "origin" && !freezeFrame
                ? { duration: 1, ease: "easeOut" }
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
            onClick={() => {
              setActiveElement("origin");
              setFreezeFrame(false);
              if (soundEnabled) playAudio("beep", true);
            }}
          >
            {activeElement === "origin" && !freezeFrame && (
              <motion.div
                className="absolute inset-0 bg-transparent border border-[#E4DCCF]"
                animate={{ scale: [1, 10], opacity: [1, 0] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            )}
          </motion.div>

          {/* Default breathing lines */}
          <motion.div
            className="absolute w-px h-[20%] bg-[#C0C0C0]/20 bottom-4 md:bottom-0 left-[45%] md:left-[48%]"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-px h-[20%] bg-[#C0C0C0]/20 bottom-4 md:bottom-0 right-[45%] md:right-[48%]"
            animate={{ scaleY: [1, 1.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Nav Triggers Layer */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-around items-center pointer-events-none">
            <div
              className="w-1/2 h-1/4 pointer-events-auto cursor-pointer"
              onClick={() => {
                setActiveElement("wingspan");
                setFreezeFrame(false);
              }}
            />
            <div
              className="w-1/4 h-1/2 pointer-events-auto cursor-pointer"
              onClick={() => {
                setActiveElement("height");
                setFreezeFrame(false);
              }}
            />
            <div
              className="w-1/2 h-1/4 pointer-events-auto cursor-pointer"
              onClick={() => {
                setActiveElement("origin");
                setFreezeFrame(false);
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Side Tags (Data Points) */}
      <div className="absolute right-4 md:right-8 top-1/4 md:top-1/3 flex flex-col gap-6 md:gap-8 z-30 opacity-70 hover:opacity-100 transition-opacity mt-20 md:mt-0">
        {Object.entries(copyData).map(([key, data]) => (
          <div
            key={key}
            className={`cursor-pointer transition-all duration-300 font-mono text-[9px] md:text-[10px] tracking-widest uppercase flex items-center gap-2 md:gap-4 ${activeElement === key ? "text-[#E4DCCF] scale-110 -translate-x-2" : "text-[#C0C0C0]/50 hover:text-[#C0C0C0] hover:-translate-x-1"}`}
            onClick={() => {
              setActiveElement(key);
              setFreezeFrame(false);
              if (soundEnabled) playAudio("beep", true);
            }}
          >
            <div
              className={`w-[6px] h-[6px] rounded-full transition-colors ${activeElement === key ? "bg-[#FF7B00] shadow-[0_0_10px_#FF7B00]" : "bg-transparent border border-[#C0C0C0]/50"}`}
            />
            {data.label} — {data.title}
          </div>
        ))}
      </div>

      {/* Core Declaration / Philosophy Text */}
      <div className="relative z-40 w-full max-w-2xl text-center mt-12 md:mt-24 bg-black/80 backdrop-blur-sm border border-[#C0C0C0]/20 p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)] min-h-[220px] flex flex-col justify-center">
        {!activeElement ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-serif italic text-lg md:text-2xl text-[#E4DCCF] mb-4 leading-relaxed mix-blend-screen drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              His body is a draft,
              <br />
              Every jump is a revision,
              <br />
              Every landing is a final draft.
            </h3>
            <p className="font-mono text-[10px] md:text-xs text-[#C0C0C0]/60 leading-relaxed max-w-xl mx-auto border-t border-[#C0C0C0]/20 pt-4 mt-2">
              Wembanyama’s body is not a moving machine but a living structural
              system. He made me rethink interfaces: How do we design digital
              architecture that is both extremely tall and yet elegant, broad
              yet not oppressive, light yet able to withstand impact? In this
              hall, height is just the starting point, and posture is the
              design.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeElement}
          >
            <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#d4af37] mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              {currentCopy?.label} — {currentCopy?.title}
            </h4>
            <p className="font-headline font-medium text-base md:text-xl text-[#E4DCCF] mb-6">
              {currentCopy?.copy}
            </p>

            {/* Freeze Frame Button & Principle */}
            <div className="border-t border-[#C0C0C0]/20 pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                className={`font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-4 py-2 border transition-all ${freezeFrame ? "bg-[#E4DCCF] text-[#4C392D] border-[#E4DCCF]" : "bg-transparent text-[#C0C0C0] border-[#C0C0C0] hover:bg-[#C0C0C0]/20 hover:text-white"}`}
                onClick={handleFreezeToggle}
              >
                {freezeFrame ? "[ ACTION FROZEN ]" : "FREEZE FRAME"}
              </button>
              <AnimatePresence mode="popLayout">
                {freezeFrame && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#00ff41]"
                  >
                    → Principle: {currentCopy?.principle}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Supporting Module: From Court to Canvas */}
      <motion.div
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-[200px] md:max-w-xs p-4 border-l border-[#C0C0C0]/30 hidden md:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#C0C0C0]/50 mb-2">
          From Court to Canvas
        </span>
        <p className="font-mono text-[9px] md:text-[10px] uppercase leading-relaxed text-[#C0C0C0]/70">
          The vertical hierarchy, structural tension, and breathing space that I
          pursue in the design system can all be found here.
        </p>
      </motion.div>

      {/* Scroll Down Hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-50"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <ArrowDown className="w-5 h-5 text-[#C0C0C0] opacity-30 hover:opacity-100" />
      </motion.div>
    </div>
  );
}

/* --- SCENE 3: THE FIVE AND THE ONE --- */
function TheFiveAndTheOne({ soundEnabled }: { soundEnabled: boolean }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const players = [
    {
      id: "pg",
      role: "Point Guard",
      keyword: "Rhythm.",
      desc: "Not directing, but listening to the breathing of the entire stadium.",
      sysDesc: "A system’s heartbeat requires observation before execution.",
      photo:
        "https://images.unsplash.com/photo-1546519638-68e109498bdc?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "sg",
      role: "Shooting Guard",
      keyword: "Space.",
      desc: "It is not about possessing, but about creating possibilities for others.",
      sysDesc:
        "Negative space is an active design element, not just emptiness.",
      photo:
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "c",
      role: "Center — Victor Wembanyama",
      keyword: "Presence.",
      desc: "Not to rule, but to make all structures possible.",
      sysDesc:
        "A strong core framework does not dominate the system. It allows every supporting element to perform with more clarity.",
      isCenter: true,
      photo:
        "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "sf",
      role: "Small Forward",
      keyword: "Tear.",
      desc: "It is not about destroying, but opening up new channels.",
      sysDesc:
        "Disruption is required to prevent a system from becoming stagnant.",
      photo:
        "https://images.unsplash.com/photo-1548083884-6338bf3e7bce?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "pf",
      role: "Power Forward",
      keyword: "Confrontation.",
      desc: "Not to block, but to withstand and transform the impact.",
      sysDesc:
        "Error states and edge cases are moments of transformation, not failure.",
      photo:
        "https://images.unsplash.com/photo-1580087433295-ab2600c1030e?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center p-8 lg:p-24 border-b-4 border-[#C0C0C0] bg-[#020202] overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-[0.15] pointer-events-none mix-blend-overlay" />

      {/* Stadium Watermark */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=1200')] bg-cover bg-center mix-blend-screen pointer-events-none transition-opacity duration-1000"
        style={{ opacity: hoveredNode ? 0.12 : 0.08 }}
      />

      <div className="absolute top-12 left-8 md:top-24 md:left-24 z-20 pointer-events-none">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#C0C0C0]/50 mb-2">
          Hall 2
        </h2>
        <h3 className="text-2xl md:text-4xl font-headline font-black text-white tracking-widest uppercase">
          The Five and the One
        </h3>
      </div>

      <div className="w-full max-w-6xl flex-grow flex flex-col items-center justify-center relative mt-24 z-10 min-h-[500px]">
        {/* Columns Container */}
        <div className="relative w-full h-full min-h-[60vh] flex flex-col md:flex-row items-center justify-center md:items-stretch md:justify-around gap-4 md:gap-0 mt-8 mb-8">
          {/* The bottom structural beam */}
          <motion.div
            className="hidden md:block absolute bottom-0 left-[5%] right-[5%] h-1 z-0 bg-gradient-to-r from-[#d4af37] via-[#8A1538] to-[#d4af37]"
            animate={{
              boxShadow:
                hoveredNode === "c"
                  ? "0 -15px 40px rgba(212,175,55,0.3)"
                  : "none",
              opacity: hoveredNode === "c" ? 1 : 0.4,
            }}
            transition={{ duration: 0.5 }}
          />

          {players.map((p, idx) => {
            const posOffset = idx - 2; // -2, -1, 0, 1, 2
            const isHovered = hoveredNode === p.id;
            const centerHovered = hoveredNode === "c";
            const isActive = activeNode === p.id;

            return (
              <motion.div
                key={p.id}
                className={`relative flex flex-col items-center cursor-pointer group ${p.isCenter ? "z-20 w-full md:w-48" : "z-10 w-full md:w-32"} ${activeNode && !isActive ? "opacity-20 md:opacity-30" : "opacity-100"}`}
                animate={{
                  x: centerHovered && !p.isCenter ? -posOffset * 20 : 0,
                  scale: isHovered && !p.isCenter ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onHoverStart={() => {
                  setHoveredNode(p.id);
                  if (soundEnabled) playAudio("beep", true);
                }}
                onHoverEnd={() => setHoveredNode(null)}
                onClick={() => {
                  setActiveNode(isActive ? null : p.id);
                  if (soundEnabled) playAudio("door", true);
                }}
              >
                {/* The structural Line on Desktop */}
                <motion.div
                  className={`relative flex-grow ${
                    p.isCenter
                      ? "w-6 md:w-8 bg-gradient-to-b from-[#8A1538] to-[#C0C0C0]"
                      : idx === 0
                        ? "w-3 md:w-4 bg-[#0077FF]/50"
                        : idx === 1
                          ? "w-3 md:w-4 bg-[#3F2B56]/60"
                          : idx === 3
                            ? "w-3 md:w-4 bg-[#F3ECE1]/80"
                            : "w-3 md:w-4 bg-[#D15600]/60"
                  } hidden md:flex flex-col items-center justify-start border-x border-[#C0C0C0]/10`}
                  style={{
                    height: p.isCenter ? "100%" : "80%",
                    marginTop: p.isCenter ? "0" : "auto",
                  }}
                  animate={{
                    filter:
                      isHovered || p.isCenter
                        ? "brightness(1.2)"
                        : "brightness(0.5)",
                  }}
                >
                  {/* Light Arc / Connection to center */}
                  {!p.isCenter &&
                    (hoveredNode === p.id || hoveredNode === "c") && (
                      <motion.svg
                        className="absolute top-[30%] pointer-events-none z-0"
                        style={{
                          width: `${Math.abs(posOffset) * 150}px`,
                          height: "100px",
                          left: posOffset < 0 ? "50%" : "auto",
                          right: posOffset > 0 ? "50%" : "auto",
                          transform: posOffset < 0 ? "none" : "scaleX(-1)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path
                          d={`M 0,50 Q ${Math.abs(posOffset) * 75},-20 ${Math.abs(posOffset) * 150},20`}
                          fill="none"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      </motion.svg>
                    )}

                  {/* The Photo */}
                  <motion.div
                    className={`absolute overflow-hidden z-20 transition-all duration-700 bg-[#4C392D]`}
                    style={{
                      top: p.isCenter ? "5%" : "10%",
                      width: p.isCenter ? "160px" : "90px",
                      height: p.isCenter ? "240px" : "110px",
                      opacity: p.isCenter
                        ? hoveredNode === "c"
                          ? 1
                          : 0.9
                        : isHovered
                          ? 1
                          : 0.4,
                      filter:
                        isHovered || (p.isCenter && centerHovered)
                          ? "grayscale(100%) contrast(1.5) brightness(1.2)"
                          : "grayscale(100%) blur(1px) contrast(1.2)",
                      boxShadow:
                        isHovered || (p.isCenter && centerHovered)
                          ? "0 0 30px rgba(0,0,0,0.8)"
                          : "none",
                    }}
                  >
                    {/* Burned edge effect wrapper */}
                    <div className="w-full h-full p-1 relative border border-[#C0C0C0]/20 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] bg-blend-overlay">
                      <span className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#4C392D] to-transparent z-10" />
                      <span className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#4C392D] to-transparent z-10" />
                      <span className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-[#4C392D] to-transparent z-10" />
                      <span className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-[#4C392D] to-transparent z-10" />
                      <img
                        src={p.photo}
                        alt={p.role}
                        className="w-full h-full object-cover mix-blend-screen opacity-80"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Mobile simplified view */}
                <div className="md:hidden w-full border border-[#C0C0C0]/30 mb-2 relative flex items-center p-3 bg-[#4C392D]">
                  <img
                    src={p.photo}
                    alt=""
                    className="w-16 h-16 object-cover grayscale opacity-50 mr-4 border border-[#C0C0C0]/20"
                  />
                  <div className="flex-grow">
                    <div className="text-[9px] uppercase font-mono text-[#d4af37] mb-1">
                      {p.role}
                    </div>
                    <div className="text-sm font-bold text-white uppercase tracking-widest">
                      {p.keyword}
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-4 font-mono text-[9px] uppercase tracking-widest bg-[#4C392D] p-2 border border-[#C0C0C0]/20 ${isHovered ? "text-white border-white/50" : "text-[#C0C0C0]/50"} hidden md:block transition-colors shrink-0`}
                >
                  {p.isCenter ? "WEMBY" : p.id}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Detail Panel Overlay */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-0 pointer-events-none"
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveNode(null)}
              />

              <div className="w-full max-w-3xl bg-[#0a0a0a] border border-[#C0C0C0] shadow-[12px_12px_0_rgba(192,192,192,0.2)] pointer-events-auto flex flex-col md:flex-row relative z-10 overflow-hidden">
                <button
                  onClick={() => setActiveNode(null)}
                  className="absolute top-4 right-4 text-[#C0C0C0] hover:text-white z-20 bg-black/50 p-2 border border-[#C0C0C0]/30"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-30 mix-blend-overlay z-10 pointer-events-none" />
                  <img
                    src={players.find((p) => p.id === activeNode)?.photo}
                    className="w-full h-full object-cover grayscale contrast-[1.5] brightness-90 relative z-0"
                    alt=""
                  />
                </div>

                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative bg-[#020202]">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5 pointer-events-none" />

                  <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#d4af37] mb-2">
                    {players.find((p) => p.id === activeNode)?.role}
                  </h4>
                  <h3 className="text-3xl md:text-5xl font-black text-[#E4DCCF] uppercase mb-6 tracking-tighter">
                    {players.find((p) => p.id === activeNode)?.keyword}
                  </h3>
                  <p className="font-serif italic text-white leading-relaxed text-lg md:text-xl mb-8 border-l-4 border-[#d4af37] pl-4 py-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                    "{players.find((p) => p.id === activeNode)?.desc}"
                  </p>
                  <div className="pt-6 border-t border-[#C0C0C0]/20 mt-auto">
                    <span className="block text-[9px] font-mono text-white/50 uppercase mb-2 tracking-widest">
                      System Interpretation
                    </span>
                    <p className="text-xs md:text-sm font-mono text-[#C0C0C0]/90 leading-relaxed bg-white/5 p-4 border border-white/10">
                      {players.find((p) => p.id === activeNode)?.sysDesc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reflection Area At Bottom */}
      <div className="w-full max-w-5xl mt-24 md:mt-32 flex flex-col md:flex-row items-center border-t border-[#C0C0C0]/20 pt-16 mb-16 gap-12 relative z-10 bg-black/50 p-8">
        <div className="w-full md:w-1/2">
          <div className="aspect-[4/3] bg-[#050505] border-[6px] border-[#111] overflow-hidden grayscale contrast-[1.2] relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-20 mix-blend-overlay z-10" />
            <img
              src="https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800"
              alt="Reflection"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-6 border-l-2 border-[#d4af37] pl-4">
            Reflection
          </h4>
          <p className="font-serif italic text-2xl md:text-3xl text-[#E4DCCF] leading-relaxed mb-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            What I admire most about Wemby is not his size, but how he makes the
            people around him better.
          </p>
          <div className="font-mono text-xs text-[#C0C0C0]/80 leading-relaxed uppercase bg-[#111] p-6 border border-[#C0C0C0]/20 shadow-[6px_6px_0_rgba(192,192,192,0.1)]">
            This is the essence of a good design system:
            <br />
            <br />
            The core framework is strong enough, but always provides room for
            other elements to grow.
          </div>
        </div>
      </div>

      {/* Bridge Statement */}
      <div className="text-center bg-[#050505] border border-[#d4af37]/30 p-8 md:p-12 max-w-4xl w-full relative z-10 mb-8 mt-8">
        <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#d4af37] mb-6">
          From Team Structure to Design Systems
        </h4>
        <p className="font-headline text-lg md:text-xl text-[#E4DCCF] leading-relaxed uppercase max-w-2xl mx-auto font-medium">
          What basketball teaches me about design is that strong systems are not
          rigid. They are clear, supportive, and spacious enough to let each
          element perform at its highest level.
        </p>
      </div>
    </div>
  );
}

/* --- SCENE 4: THE PHYSICS OF MOTION --- */
function ThePhysicsOfMotion({ soundEnabled }: { soundEnabled: boolean }) {
  const [activeMove, setActiveMove] = useState(0);

  const moves = [
    {
      title: "Shot Block",
      metaphor: "Interruption is another continuation.",
      desc: "Interruption is a continuation. Like stopping a wave before it hits, but still allowing it to flow around.",
      date: "2025.03.12 vs Lakers · Section 3 8:47",
    },
    {
      title: "Three-Pointer",
      metaphor: "Trust in the trajectory. Every shot has a rhythm.",
      desc: "The path of the ball creates a clean, elegant arc as the tension builds before the release.",
      date: "2024.11.08 vs Knicks · Section 1 4:12",
    },
    {
      title: "Dribble",
      metaphor: "Direction is more important than speed.",
      desc: "This represents direction change under pressure, more important than speed.",
      date: "2025.01.22 vs Nuggets · Section 4 2:05",
    },
    {
      title: "Alley-Oop",
      metaphor: "The tacit understanding is a preset accident.",
      desc: "Tacit understanding is a preset accident — you don't control it; you allow it to happen.",
      date: "2025.02.14 vs Mavericks · Section 2 6:30",
    },
  ];

  return (
    <div className="min-h-screen w-full relative flex flex-col border-b-4 border-[#C0C0C0] bg-[#020202] font-sans">
      {/* Entrance — Core Declaration */}
      <div className="absolute inset-0 flex items-center justify-center p-8 z-0 opacity-[0.05] pointer-events-none text-center">
        <h2 className="text-4xl md:text-8xl font-black uppercase leading-tight tracking-tighter">
          The body is architecture
          <br />
          and movement is mechanics.
          <br />
          Every move is a<br />
          Brutalist poem.
        </h2>
      </div>

      <div className="absolute top-12 left-8 md:top-24 md:left-24 z-20 pointer-events-none">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#C0C0C0]/50 mb-2">
          Hall 3
        </h2>
        <h3 className="text-2xl md:text-4xl font-headline font-black text-white tracking-widest uppercase">
          The Physics of Motion
        </h3>
      </div>

      <div className="flex-1 relative flex flex-col md:flex-row items-center justify-center p-8 lg:p-24 overflow-hidden mt-32 mb-24 md:mb-16 z-10 w-full max-w-7xl mx-auto">
        {/* Left: Move Copy */}
        <div className="w-full md:w-1/3 flex flex-col mb-12 md:mb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMove}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                {moves[activeMove].title}
              </h3>
              <p className="font-serif italic text-xl md:text-2xl text-[#d4af37] mb-6 border-l-4 border-[#C0C0C0]/30 pl-4">
                "{moves[activeMove].metaphor}"
              </p>
              <p className="font-mono text-xs md:text-sm text-[#C0C0C0]/70 leading-relaxed max-w-sm">
                {moves[activeMove].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Animated Geometries */}
        <div className="w-full md:w-2/3 h-[300px] md:h-[500px] flex items-center justify-center relative border border-[#C0C0C0]/20 bg-[#050505] shadow-[8px_8px_0_rgba(192,192,192,0.1)] overflow-hidden">
          <div className="absolute top-4 right-4 font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-[#C0C0C0]/30 px-2 border border-[#C0C0C0]/20">
            STRUCTURAL ENGINE // {moves[activeMove].title}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMove}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center p-8 m-auto"
            >
              {activeMove === 0 && (
                <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
                  <motion.div
                    className="absolute w-4 bg-gradient-to-t from-[#C0C0C0] to-[#8A1538] shadow-[0_0_20px_rgba(138,21,56,0.5)] origin-bottom bottom-[10%]"
                    initial={{ height: "0%" }}
                    animate={{ height: ["0%", "100%", "100%", "0%"] }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.15, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "easeOut",
                    }}
                  />
                  <motion.div
                    className="absolute w-full h-1 bg-[#C0C0C0] origin-left top-[30%]"
                    initial={{ scaleX: 1, opacity: 1 }}
                    animate={{ scaleX: [1, 1, 0, 0], opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.15, 0.4, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
              {activeMove === 1 && (
                <svg
                  viewBox="0 0 300 150"
                  className="w-full max-w-xl h-64 overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="three-gradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#D15600" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 10 140 Q 150 -50 290 140"
                    fill="none"
                    stroke="url(#three-gradient)"
                    strokeLinecap="square"
                    initial={{ pathLength: 0, strokeWidth: 8 }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      strokeWidth: [8, 1, 1, 8],
                    }}
                    transition={{
                      duration: 3,
                      times: [0, 0.4, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "easeOut",
                    }}
                    style={{ filter: "drop-shadow(0px 0px 10px #D15600)" }}
                  />
                  <motion.path
                    d="M 280 140 L 300 140 M 275 145 L 295 160 M 305 145 L 285 160"
                    stroke="#D15600"
                    strokeWidth="2"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 0] }}
                    transition={{
                      duration: 3,
                      times: [0, 0.4, 0.5, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                  />
                </svg>
              )}
              {activeMove === 2 && (
                <svg
                  viewBox="0 0 300 150"
                  className="w-full max-w-lg h-64 overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="dribble-gradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#0077FF" />
                      <stop offset="100%" stopColor="#3F2B56" />
                    </linearGradient>
                  </defs>
                  <motion.polyline
                    points="10,140 100,20 200,120 290,40"
                    fill="none"
                    stroke="url(#dribble-gradient)"
                    strokeWidth="4"
                    strokeLinejoin="bevel"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.3, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "anticipate",
                    }}
                    style={{
                      filter: "drop-shadow(0px 0px 8px rgba(0,119,255,0.4))",
                    }}
                  />
                  <motion.circle
                    cx="100"
                    cy="20"
                    r="6"
                    fill="#0077FF"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      times: [0, 0.2, 1],
                    }}
                  />
                  <motion.circle
                    cx="200"
                    cy="120"
                    r="6"
                    fill="#3F2B56"
                    animate={{ scale: [1, 2, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      times: [0, 0.4, 1],
                    }}
                  />
                </svg>
              )}
              {activeMove === 3 && (
                <svg
                  viewBox="0 0 300 200"
                  className="w-full max-w-md h-64 overflow-visible"
                >
                  <motion.path
                    d="M 20 180 Q 80 80 150 50"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.3, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "circOut",
                    }}
                    style={{
                      filter: "drop-shadow(0px 0px 8px rgba(212,175,55,0.4))",
                    }}
                  />
                  <motion.path
                    d="M 280 180 Q 220 20 150 50"
                    fill="none"
                    stroke="#8A1538"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.3, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "circOut",
                    }}
                    style={{
                      filter: "drop-shadow(0px 0px 8px rgba(138,21,56,0.4))",
                    }}
                  />
                  <motion.circle
                    cx="150"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#FF7B00"
                    strokeWidth="6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 0, 1, 1.2, 0],
                      opacity: [0, 0, 1, 0, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.28, 0.35, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: "easeOut",
                    }}
                    style={{ filter: "drop-shadow(0px 0px 15px #FF7B00)" }}
                  />
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar: Action Thumbnails & Context */}
      <div className="w-full bg-[#020202] border-t border-[#C0C0C0]/20 z-20">
        <div
          className="flex w-full overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {moves.map((move, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveMove(i);
                if (soundEnabled) playAudio("beep", true);
              }}
              className={`flex-1 min-w-[120px] py-4 md:py-6 flex flex-col items-center justify-center border-r border-[#C0C0C0]/20 transition-colors ${activeMove === i ? "bg-[#E4DCCF] text-[#4C392D]" : "hover:bg-[#111] text-[#C0C0C0]"}`}
            >
              {/* Icons */}
              <div className="w-8 h-8 mb-2 flex items-center justify-center">
                {i === 0 && (
                  <div className="w-1 h-6 bg-current rotate-90 relative">
                    <div className="absolute w-1 h-6 bg-current -rotate-90" />
                  </div>
                )}
                {i === 1 && (
                  <svg className="w-6 h-6 stroke-current fill-none overflow-visible">
                    <path d="M 0 20 Q 12 0 24 20" strokeWidth={2} />
                  </svg>
                )}
                {i === 2 && (
                  <svg className="w-6 h-6 stroke-current fill-none overflow-visible">
                    <polyline points="0,20 12,0 24,20" strokeWidth={2} />
                  </svg>
                )}
                {i === 3 && (
                  <div className="w-5 h-5 border-2 border-current rounded-full" />
                )}
              </div>
              <span className="font-mono text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2 text-center">
                {move.title}
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center px-4 md:px-8 py-3 bg-[#4C392D] border-t border-[#C0C0C0]/20 font-mono text-[8px] md:text-[10px] uppercase text-[#C0C0C0]/60 tracking-widest">
          <span>{moves[activeMove].date}</span>
          <span className="text-[#d4af37] border border-[#d4af37]/30 px-2 py-0.5">
            Real Game Moments
          </span>
        </div>
      </div>

      {/* Core Philosophical Reflection (End of Hall) */}
      <div className="w-full relative bg-[#020202] border-t-4 border-[#E4DCCF] mt-12 md:mt-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="max-w-5xl mx-auto px-8 py-24 md:py-40 text-center relative z-10 flex flex-col items-center justify-center">
          <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#C0C0C0]/50 mb-12 border-b border-[#C0C0C0]/20 pb-4 inline-block">
            Movement As Structure
          </h4>

          <p className="font-headline text-2xl md:text-4xl font-black uppercase text-white leading-snug tracking-tight">
            In Wembanyama's actions, I saw the ultimate reference for interface
            animation:
            <br />
            <span className="text-[#C0C0C0] mt-4 block">
              Not fancy curves, but intentional mechanics.
            </span>
            <br />
            <span className="text-[#d4af37] block mt-8 text-xl md:text-3xl leading-relaxed">
              Every burst, every pause, every connection is a profound exercise
              <br /> in how structure is perceived.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- SCENE 5: THE SPURS TIME --- */
function TheSpursTime({ soundEnabled }: { soundEnabled: boolean }) {
  const [activeEra, setActiveEra] = useState<string | null>(null);
  const [ringRotation, setRingRotation] = useState(0);
  const [isWembyPanelOpen, setIsWembyPanelOpen] = useState(false);

  const eras = [
    {
      id: "1997",
      angle: 0,
      year: "1997",
      title: "Duncan Arrives",
      img: "https://images.unsplash.com/photo-1546519638-68e109498bdc?auto=format&fit=crop&q=80&w=400",
      desc: "The foundation is laid.",
    },
    {
      id: "1999",
      angle: 90,
      year: "1999",
      title: "First Championship",
      img: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=400",
      desc: "The first proof.",
    },
    {
      id: "2007",
      angle: 180,
      year: "2007",
      title: "Peak Team System",
      img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400",
      desc: "The beauty of the system.",
    },
    {
      id: "2014",
      angle: 270,
      year: "2014",
      title: "The Most Beautiful Basketball",
      img: "https://images.unsplash.com/photo-1548083884-6338bf3e7bce?auto=format&fit=crop&q=80&w=400",
      desc: "The balance of elegance and cruelty.",
    },
  ];

  const handleDrag = (event: any, info: any) => {
    setRingRotation((prev) => prev + info.delta.x * 0.5);
  };

  const currentEraData = eras.find((e) => e.id === activeEra);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center bg-gradient-to-b from-[#020202] to-[#1E152A] overflow-hidden font-sans border-b-4 border-[#C0C0C0]">
      {/* Background depth */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/80 to-[#1E152A] z-0 pointer-events-none" />

      {/* Hall Identity */}
      <div className="absolute top-12 left-8 md:top-24 md:left-24 z-20 pointer-events-none">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#C0C0C0]/50 mb-2">
          Hall 4
        </h2>
        <h3 className="text-2xl md:text-4xl font-headline font-black text-[#E4DCCF] tracking-widest uppercase">
          The Spurs Time
        </h3>
        <p className="font-serif italic text-sm text-[#d4af37] mt-2 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
          Champions are moments, culture is time itself.
        </p>
      </div>

      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center relative mt-32 md:mt-0 z-10 min-h-[60vh] max-w-7xl mx-auto px-4">
        {/* The Time Ring */}
        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] relative flex items-center justify-center shrink-0">
          {/* Monumental Inner Text */}
          <div className="absolute inset-0 m-auto w-3/4 h-3/4 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
            <h4 className="font-serif italic text-xl md:text-3xl text-[#C0C0C0] mb-2 leading-relaxed mix-blend-screen">
              He is not the heir;
              <br />
              <span className="text-white font-black uppercase text-2xl md:text-4xl not-italic mt-2 block tracking-tighter">
                He is the starting point
                <br />
                for the next scale.
              </span>
            </h4>
            <div className="w-12 h-px bg-[#d4af37]/50 mt-4" />
          </div>

          {/* Draggable Ring Surface */}
          <motion.div
            drag="x"
            onDrag={handleDrag}
            style={{ rotate: ringRotation }}
            className="w-full h-full absolute flex items-center justify-center cursor-grab active:cursor-grabbing z-20 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr flex items-center justify-center from-[#C0C0C0] via-[#d4af37] to-[#8A1538] p-[8px] md:p-[16px] shadow-[inset_0_0_100px_rgba(0,0,0,0.8),0_0_50px_rgba(138,21,56,0.5)] pointer-events-none">
              <div className="w-full h-full rounded-full bg-[#020202] shadow-[inset_0_0_50px_rgba(0,0,0,1)]" />
            </div>
            {eras.map((era) => {
              const isActive = activeEra === era.id;
              return (
                <div
                  key={era.id}
                  className="absolute w-4 h-full pointer-events-none flex flex-col justify-start items-center"
                  style={{ transform: `rotate(${era.angle}deg)` }}
                >
                  {/* Scale Line */}
                  <motion.div
                    className={`w-1 origin-top transition-colors duration-500 pointer-events-auto ${isActive ? "bg-[#d4af37]" : "bg-[#C0C0C0]/40"}`}
                    animate={{ height: isActive ? 60 : 30 }}
                    onHoverStart={() => {
                      setActiveEra(era.id);
                      if (soundEnabled) playAudio("beep", true);
                    }}
                    onHoverEnd={() => setActiveEra(null)}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-16 w-32 md:w-48 bg-[#020202] border border-[#d4af37]/30 p-2 shadow-[0_10px_30px_rgba(138,21,56,0.4)] pointer-events-none"
                        style={{
                          transform: `rotate(${-ringRotation - era.angle}deg)`,
                        }} // keep upright
                      >
                        <div className="relative aspect-square overflow-hidden mb-2">
                          <img
                            src={era.img}
                            alt={era.title}
                            className="w-full h-full object-cover grayscale contrast-[1.2] opacity-80 mix-blend-luminosity"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent" />
                          <div className="absolute inset-0 border-[2px] border-[#d4af37]/20 mix-blend-color" />
                        </div>
                        <div className="font-mono text-[9px] md:text-[10px] text-[#d4af37] tracking-widest uppercase mb-1">
                          {era.year}
                        </div>
                        <div className="font-bold text-[#E4DCCF] text-xs uppercase mb-1 leading-tight">
                          {era.title}
                        </div>
                        <div className="text-[10px] text-[#C0C0C0]/70 font-mono">
                          {era.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Special Wemby Era Expansion */}
          <div className="absolute w-[120%] h-[120%] rounded-full border-t border-r border-transparent z-0 pointer-events-none flex items-start justify-end pr-[10%] pt-[10%]">
            <motion.div
              className="w-48 h-48 md:w-80 md:h-80 relative flex items-center justify-center pointer-events-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            >
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient
                    id="wemby-era-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0077FF" />
                    <stop offset="50%" stopColor="#8A1538" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 50 50 Q 80 20 100 0 Q 120 -20 150 -50"
                  fill="none"
                  stroke="url(#wemby-era-gradient)"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ filter: "drop-shadow(0 0 10px #FF7B00)" }}
                />
              </svg>
              {/* Particles */}
              <motion.div
                className="w-1.5 h-1.5 bg-[#FF7B00] absolute top-0 right-0 shadow-[0_0_15px_#FF7B00]"
                animate={{ y: [-20, -50], opacity: [1, 0], scale: [1, 2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div
              className="absolute top-0 right-0 md:-right-12 translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-auto"
              onMouseEnter={() => {
                if (soundEnabled) playAudio("swoosh", true);
              }}
              onClick={() => setIsWembyPanelOpen(!isWembyPanelOpen)}
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#0077FF] bg-[#020202] flex items-center justify-center shadow-[0_0_25px_rgba(0,119,255,0.4)] p-1 transition-transform group-hover:scale-110 group-hover:border-[#8A1538] group-hover:shadow-[0_0_30px_rgba(138,21,56,0.6)]">
                <img
                  src="https://images.unsplash.com/photo-1546519638-68e109498bdc?auto=format&fit=crop&q=80&w=200"
                  alt="Wemby Era"
                  className="w-full h-full rounded-full object-cover grayscale contrast-[1.5] mix-blend-luminosity"
                />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center pointer-events-none">
                <span className="font-mono text-[9px] md:text-[10px] text-[#0077FF] font-bold tracking-widest uppercase bg-[#020202] px-2 py-1 border border-[#0077FF]/50 shadow-[0_0_10px_rgba(0,119,255,0.2)] whitespace-nowrap">
                  NOW
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expanding Wemby Panel */}
        <AnimatePresence>
          {isWembyPanelOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-72 md:w-96 bg-[#020202] border border-[#0077FF]/50 p-6 shadow-[0_0_50px_rgba(0,119,255,0.2)] z-40 pointer-events-auto"
            >
              <button
                onClick={() => setIsWembyPanelOpen(false)}
                className="absolute top-4 right-4 text-[#C0C0C0] hover:text-white"
              >
                <VolumeX className="w-4 h-4 opacity-0" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#0077FF] mb-2 drop-shadow-[0_0_5px_rgba(0,119,255,0.5)]">
                Future Structure
              </h4>
              <h3 className="text-xl font-black text-[#E4DCCF] uppercase mb-4 tracking-tight">
                The Next Scale
              </h3>
              <p className="font-mono text-xs text-[#C0C0C0]/80 leading-relaxed mb-6">
                Wembanyama is a new architectural principle. The historical
                structure of the Spurs provides the foundation, but the future
                spiral must remain unclosed.
                <br />
                <br />
                This brings us back to design: a perfect system is never
                finished. It only provides a better starting point for the next
                impossibility.
              </p>
              <button className="w-full font-mono text-[10px] uppercase tracking-widest border border-[#0077FF] p-3 text-[#0077FF] hover:bg-[#0077FF] hover:text-[#020202] transition-colors shadow-[0_0_15px_rgba(0,119,255,0.2)]">
                Enter Personal Lab
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Closing Reflection Area */}
      <div className="w-full bg-[#050505] border-t border-[#C0C0C0]/10 mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 md:gap-16 relative">
          <div className="w-full md:w-1/2 h-64 md:h-[400px] relative border-4 border-[#3F2B56]/50 bg-[#1E152A] shadow-[0_0_30px_rgba(63,43,86,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#8A1538]/20 to-[#0077FF]/10 pointer-events-none mix-blend-color z-10" />
            <img
              src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800"
              alt="Contemplation"
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="font-headline text-2xl md:text-3xl font-black uppercase text-[#E4DCCF] leading-snug tracking-tighter mb-8">
              A championship is a moment,
              <br />
              <span className="text-[#a8a195]">Culture is time itself.</span>
            </h3>

            <div className="space-y-6 font-mono text-xs md:text-sm text-[#C0C0C0]/70 leading-relaxed pl-4 border-l-2 border-[#d4af37]">
              <p>
                The Spurs have never been a team, but a structural system that
                has lasted for thirty years.
              </p>
              <p>
                Wembanyama is not here to copy the past;
                <br />
                He is here to extend this timeline further upwards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- SCENE 6: SILENCE AND NOISE --- */
function SilenceAndNoise({ soundEnabled }: { soundEnabled: boolean }) {
  const [balance, setBalance] = useState(false);
  const [fadeComplete, setFadeComplete] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (balance) {
      timer = setTimeout(() => {
        setFadeComplete(true);
      }, 3000);
    } else {
      setFadeComplete(false);
    }
    return () => clearTimeout(timer);
  }, [balance]);

  return (
    <div className="h-screen w-full relative flex flex-col md:flex-row overflow-hidden border-b-4 border-[#C0C0C0] bg-[#020202] font-sans">
      <div className="absolute top-12 left-8 md:top-24 md:left-24 z-20 pointer-events-none mix-blend-difference text-white">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] opacity-50 mb-2">
          Hall 5
        </h2>
        <h3 className="text-2xl md:text-4xl font-headline font-black tracking-widest uppercase">
          Silence & Noise
        </h3>
      </div>

      {/* Left: Silence */}
      <motion.div
        className="flex-1 h-1/2 md:h-full bg-gradient-to-t from-[#3F2B56] to-[#020202] relative flex items-center justify-center cursor-default overflow-hidden border-b md:border-b-0 md:border-r border-transparent"
        onMouseEnter={() => {
          if (soundEnabled) playAudio("swoosh", true);
        }}
        animate={{ filter: balance ? "brightness(1.5)" : "brightness(1)" }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[#0077FF]/5 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        <motion.div
          className="text-[#C0C0C0] font-serif italic text-2xl md:text-4xl text-center leading-relaxed px-4 drop-shadow-[0_0_10px_rgba(0,119,255,0.3)]"
          animate={{ opacity: balance ? 0 : [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Before the jump ball,
          <br />
          there is only breath.
        </motion.div>
      </motion.div>

      {/* Right: Noise */}
      <motion.div
        className="flex-1 h-1/2 md:h-full bg-[#E4DCCF] relative flex items-center justify-center cursor-default overflow-hidden"
        onMouseEnter={() => {
          if (soundEnabled) playAudio("swoosh", true);
        }}
        animate={{ filter: balance ? "brightness(0.5)" : "brightness(1)" }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0 mix-blend-multiply">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${i % 3 === 0 ? "bg-[#8A1538]" : i % 3 === 1 ? "bg-[#D15600]" : "bg-[#4C392D]"}`}
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
              }}
              animate={
                balance
                  ? {
                      left: "50%",
                      top: "50%",
                      rotate: 0,
                      opacity: 0.1,
                    }
                  : {
                      left: [
                        `${Math.random() * 100}%`,
                        `${Math.random() * 100}%`,
                      ],
                      top: [
                        `${Math.random() * 100}%`,
                        `${Math.random() * 100}%`,
                      ],
                    }
              }
              transition={{
                duration: balance ? 2 : Math.random() * 0.5 + 0.1,
                repeat: balance ? 0 : Infinity,
              }}
            />
          ))}
        </div>
        <motion.div
          className="text-[#4C392D] font-black uppercase text-3xl md:text-5xl text-center leading-tight tracking-tighter z-10 px-4"
          animate={{ opacity: balance ? 0 : 1 }}
        >
          After the whistle,
          <br />
          there is only now.
        </motion.div>
      </motion.div>

      {/* Central Dividing Line (Threshold) */}
      <div
        className="absolute top-1/2 left-0 right-0 h-8 md:top-0 md:bottom-0 md:left-1/2 md:right-auto md:-translate-x-1/2 md:h-full md:w-8 -translate-y-1/2 md:translate-y-0 z-30 cursor-crosshair flex items-center justify-center md:items-stretch group"
        onMouseEnter={() => {
          setBalance(true);
          if (soundEnabled) playAudio("door", true);
        }}
        onMouseLeave={() => setBalance(false)}
      >
        <motion.div
          className="w-full h-[2px] md:h-full md:w-[2px] bg-gradient-to-b from-[#d4af37] via-[#D15600] to-[#d4af37]"
          animate={{
            opacity: balance ? 1 : [0.5, 1, 0.5],
            boxShadow: balance
              ? "0 0 30px rgba(255,123,0,0.8)"
              : "0 0 0 rgba(255,123,0,0)",
          }}
          transition={{
            duration: balance ? 0.5 : 2,
            repeat: balance ? 0 : Infinity,
          }}
        />

        {/* Balance Effect Overlay */}
        <AnimatePresence>
          {balance && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
            >
              {/* Abstract Wemby Silhouette */}
              <svg
                viewBox="0 0 100 200"
                className="w-32 h-64 md:w-48 md:h-96 mix-blend-screen overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="silhouette-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8A1538" />
                    <stop offset="100%" stopColor="#0077FF" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 50 20 L 50 180 M 10 60 L 90 60 M 30 180 L 50 100 L 70 180"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  stroke="url(#silhouette-gradient)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(138,21,56,0.6))",
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="20"
                  r="10"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="4"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: 0.5, duration: 0.8, repeat: Infinity }}
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(212,175,55,0.8))",
                  }}
                />
              </svg>

              <AnimatePresence>
                {fadeComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 font-mono text-[10px] md:text-xs text-[#0077FF] uppercase tracking-[0.2em] bg-[#020202] px-4 py-2 border border-[#0077FF]/50 text-center whitespace-nowrap shadow-[0_0_15px_rgba(0,119,255,0.2)]"
                  >
                    This is where architecture happens.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* End Hall Transition Text */}
      <div className="absolute bottom-12 left-0 right-0 pointer-events-none text-center">
        <motion.div
          className="font-mono text-[10px] text-[#C0C0C0]/50 tracking-[0.2em] uppercase"
          animate={{ opacity: balance ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          Conceive in silence,
          <br />
          build in hustle and bustle.
        </motion.div>
      </div>
    </div>
  );
}

/* --- FINAL CHAPTER: THE PURE SHAPE --- */
function ThePureShape({ soundEnabled }: { soundEnabled: boolean }) {
  const [shapeIndex, setShapeIndex] = useState(0);

  const shapes = [
    // Pentagon (Team Structure)
    "M 50 5 L 95 35 L 75 95 L 25 95 L 5 35 Z",
    // Star (Individual Outburst)
    "M 50 0 L 60 35 L 95 35 L 65 55 L 75 95 L 50 70 L 25 95 L 35 55 L 5 35 L 40 35 Z",
    // Infinity (Time)
    "M 20 50 C 0 10, 50 10, 50 50 C 50 90, 100 90, 80 50 C 100 10, 50 10, 50 50 C 50 90, 0 90, 20 50 Z",
  ];

  const colors = [
    { main: "#C0C0C0", acc: "#d4af37", shadow: "rgba(212,175,55,0.3)" }, // Pentagon
    { main: "#8A1538", acc: "#FF7B00", shadow: "rgba(255,123,0,0.4)" }, // Star
    { main: "#0077FF", acc: "#3F2B56", shadow: "rgba(0,119,255,0.4)" }, // Infinity
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % shapes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#020202] via-[#3F2B56]/40 to-[#8A1538]/30 flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans">
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

      {/* Hall Identity */}
      <div className="absolute top-12 left-8 md:top-24 md:left-24 z-20 pointer-events-none">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#C0C0C0]/50 mb-2">
          Final Chapter
        </h2>
        <h3 className="text-2xl md:text-4xl font-headline font-black text-white tracking-widest uppercase">
          The Pure Shape
        </h3>
        <p className="font-serif italic text-sm text-[#d4af37] mt-2">
          Not an end, but a new beginning.
        </p>
      </div>

      <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center z-10 mt-32 md:mt-24">
        {/* Morphing Shape */}
        <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center mb-16 md:mb-24">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible"
            animate={{
              filter: `drop-shadow(0 0 30px ${colors[shapeIndex].shadow})`,
            }}
            transition={{ duration: 2 }}
          >
            <motion.path
              d={shapes[shapeIndex]}
              fill="none"
              stroke={colors[shapeIndex].main}
              strokeWidth="1.5"
              strokeLinejoin="miter"
              animate={{
                d: shapes[shapeIndex],
                stroke: colors[shapeIndex].main,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d={shapes[shapeIndex]}
              fill="rgba(255,255,255,0.02)"
              stroke={colors[shapeIndex].acc}
              strokeWidth="0.5"
              strokeDasharray="2 2"
              animate={{
                d: shapes[shapeIndex],
                stroke: colors[shapeIndex].acc,
                rotate: 180,
                scale: 0.9,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              style={{ originX: "50px", originY: "50px" }}
            />
          </motion.svg>
        </div>

        {/* Final Core Copy */}
        <div className="text-center max-w-2xl mb-16 md:mb-24">
          <motion.h4
            className="text-xl md:text-3xl font-serif italic text-white mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Greatness is not to be seen,
            <br />
            it is perceived.
          </motion.h4>

          <motion.p
            className="font-mono text-sm md:text-base uppercase tracking-widest leading-loose text-white text-opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <span className="text-[#d4af37]">When you leave here,</span>
            <br />
            <span className="text-[#E4DCCF]">watch any game again,</span>
            <br />
            <span className="text-[#8A1538]">you will see these lines</span>
            <br />
            <span className="text-[#0077FF] font-bold">
              run on a real pitch.
            </span>
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 w-full justify-center max-w-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2 }}
        >
          <button
            onClick={() => {
              if (soundEnabled) playAudio("swoosh", true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-8 py-4 border border-[#C0C0C0]/50 text-[#C0C0C0] font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#E4DCCF] hover:text-[#4C392D] transition-colors"
          >
            Return to the gate of the temple
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playAudio("beep", true);
              alert("Navigating to Data Layer...");
            }}
            className="px-8 py-4 border border-[#d4af37]/50 text-[#d4af37] font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#4C392D] transition-colors"
          >
            Enter the data layer
          </button>
        </motion.div>

        {/* Final Fade Text */}
        <motion.div
          className="font-black uppercase text-xs md:text-sm text-[#C0C0C0]/30 tracking-[0.4em] text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 3 }}
        >
          This is not fandom.
          <br />
          <span className="text-white/40 mt-2 block">
            This is architecture.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
