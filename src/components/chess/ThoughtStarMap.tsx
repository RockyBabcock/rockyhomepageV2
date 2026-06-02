import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { chessQuotes } from "./chessData";
import { cn } from "../../lib/utils";
import { ChevronRight } from "lucide-react";

export function ThoughtStarMap() {
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(null);
  const [rotationH, setRotationH] = useState(0);
  const [rotationV, setRotationV] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [timePeriod, setTimePeriod] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, rotH: 0, rotV: 0 });

  // Map quotes to a spherical distribution
  const points = chessQuotes.map((q, i) => {
    // Distribute evenly around a sphere using golden spiral or simple manual distribution
    const phi = Math.acos(-1 + (2 * i) / chessQuotes.length);
    const theta = Math.sqrt(chessQuotes.length * Math.PI) * phi;
    return { ...q, phi, theta };
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotH: rotationH,
      rotV: rotationV,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotationH(dragStartRef.current.rotH + dx * 0.01);
    setRotationV(dragStartRef.current.rotV - dy * 0.01);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Auto-rotation when not interacted
  useEffect(() => {
    if (isDragging || activeQuoteId) return;
    const interval = setInterval(() => {
      setRotationH((r) => r + 0.002);
    }, 16);
    return () => clearInterval(interval);
  }, [isDragging, activeQuoteId]);

  const activeQuote = chessQuotes.find((q) => q.id === activeQuoteId);

  return (
    <div className="w-full h-full relative overflow-hidden flex bg-[#050505]">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: `translate(${rotationH * 20}px, ${rotationV * 20}px)`,
        }}
      />

      {/* Star Map Sphere */}
      <div
        ref={containerRef}
        className="flex-1 relative cursor-grab active:cursor-grabbing perspective-[1000px] flex items-center justify-center transform-style-3d"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {points.map((p) => {
          // Apply sphere rotations
          // z-axis rotation (theta) and y-axis rotation (phi)
          const x = Math.sin(p.phi) * Math.cos(p.theta);
          const y = Math.sin(p.phi) * Math.sin(p.theta);
          const z = Math.cos(p.phi);

          // Apply mouse rotations
          const cosH = Math.cos(rotationH);
          const sinH = Math.sin(rotationH);
          const cosV = Math.cos(rotationV);
          const sinV = Math.sin(rotationV);

          // Rotate around Y axis (Horizontal)
          const x1 = x * cosH - z * sinH;
          const z1 = x * sinH + z * cosH;

          // Rotate around X axis (Vertical)
          const y2 = y * cosV - z1 * sinV;
          const z2 = y * sinV + z1 * cosV;

          const radius = 300;
          const px = x1 * radius;
          const py = y2 * radius;
          const pz = z2 * radius;

          const scale = (pz + radius + 100) / (radius * 2 + 100);
          const opacity = activeQuoteId
            ? p.id === activeQuoteId
              ? 1
              : 0.1
            : Math.max(0.1, scale * 1.5 - 0.5);
          const isVisible = p.period <= timePeriod;

          if (!isVisible) return null;

          return (
            <motion.div
              key={p.id}
              className={cn(
                "absolute flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                activeQuoteId === p.id
                  ? "pointer-events-none"
                  : "cursor-pointer",
              )}
              style={{
                x: px,
                y: py,
                scale: activeQuoteId === p.id ? 1.5 : scale * 0.8,
                opacity: isVisible ? opacity : 0,
                zIndex: Math.round(pz + 1000),
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveQuoteId(p.id);
              }}
              onMouseEnter={() => !activeQuoteId && setActiveQuoteId(p.id)}
              onMouseLeave={() =>
                activeQuoteId === p.id && setActiveQuoteId(null)
              }
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  activeQuoteId === p.id
                    ? "bg-[#d4af37] shadow-[0_0_15px_#d4af37]"
                    : "bg-white/50",
                )}
              />
              <span
                className={cn(
                  "whitespace-nowrap font-mono text-[9px] uppercase tracking-widest transition-colors duration-500 max-w-[200px] truncate",
                  activeQuoteId === p.id ? "text-[#d4af37]" : "text-white/50",
                )}
              >
                {p.category}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Right Side Info Panel */}
      <AnimatePresence>
        {activeQuote && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-full max-w-sm absolute right-0 top-0 bottom-0 bg-black/80 backdrop-blur-xl border-l border-white/10 p-8 flex flex-col justify-center pointer-events-none z-50"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37] mb-4">
              Constellation: {activeQuote.category}
            </span>
            <h3 className="font-headline font-black text-2xl text-white mb-6">
              "{activeQuote.text}"
            </h3>
            <p className="font-mono text-xs text-white/50 mb-12">
              — {activeQuote.author}
            </p>

            <div className="border-l-2 border-[#d4af37]/50 pl-6 mb-8 relative pointer-events-auto">
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#d4af37] rounded-full" />
              <span className="block text-[9px] uppercase font-bold tracking-widest opacity-40 mb-3 text-white">
                System Mapping
              </span>
              <p className="text-sm font-body leading-relaxed text-white/90">
                {activeQuote.reflection}
              </p>
            </div>

            <button className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-[#d4af37] hover:text-white transition-colors mt-auto pointer-events-auto group w-max">
              View Design Case{" "}
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Slider */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37]">
          Time Distortion Field
        </span>
        <div className="flex items-center gap-4 bg-black/80 px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl">
          {[
            { id: 1, label: "Classical" },
            { id: 2, label: "Modern" },
            { id: 3, label: "Information Era" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimePeriod(t.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  timePeriod >= t.id
                    ? "bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
                    : "bg-white/20 group-hover:bg-white/40",
                )}
              />
              <span
                className={cn(
                  "text-[8px] font-mono uppercase tracking-widest transition-colors",
                  timePeriod >= t.id ? "text-[#d4af37]" : "text-white/40",
                )}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
