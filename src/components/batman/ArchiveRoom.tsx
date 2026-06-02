import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { batmanEras } from "./data/batmanEras";
import { SystemStatusBar } from "./SystemStatusBar";
import { DynamicDecryption } from "./DynamicDecryption";
import { Lock } from "lucide-react";

export function ArchiveRoom({
  onOpenCabinet,
}: {
  onOpenCabinet: (id: string) => void;
}) {
  const roomRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track dynamically unlocked eras so they persist while component mounts
  const [unlockedEras, setUnlockedEras] = useState<Record<string, boolean>>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!roomRef.current) return;
    const { left, top, width, height } =
      roomRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const isUnlocked = (era: (typeof batmanEras)[0]) => {
    if (era.status === "PUBLIC") return true;
    if (era.status === "CLASSIFIED") return false;
    return !!unlockedEras[era.id];
  };

  const handleCabinetClick = (era: (typeof batmanEras)[0]) => {
    if (isUnlocked(era)) {
      onOpenCabinet(era.id);
    }
  };

  return (
    <div
      ref={roomRef}
      className="w-full h-full relative overflow-hidden bg-[#050505] perspective-1000"
      onMouseMove={handleMouseMove}
    >
      <SystemStatusBar />

      {/* Cinematic Lighting & Room Textures */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,1)_80%)] pointer-events-none z-10" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay" />

      {/* 3D Archive Room Scene */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center transform-style-3d z-20"
        animate={{
          rotateX: mousePos.y * -5,
          rotateY: mousePos.x * 5,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-8 px-4 md:px-0 justify-center items-center w-full max-w-6xl mx-auto h-full overflow-y-auto md:overflow-visible py-20 md:py-0">
          {batmanEras.map((era, index) => {
            // Arrange in a curve
            const isCenter = index === 2 || index === 3;
            const yOffset = isCenter ? 0 : Math.abs(2.5 - index) * 20;
            const zOffset = isCenter ? 50 : -Math.abs(2.5 - index) * 40;
            const rotateY = (index - 2.5) * 5;

            const unlocked = isUnlocked(era);

            return (
              <motion.div
                key={era.id}
                onClick={() => handleCabinetClick(era)}
                whileHover={{ scale: 1.05 }}
                className={`relative w-32 md:w-48 h-64 md:h-96 flex flex-col items-center justify-between p-4 bg-[#1a1a1a] border ${unlocked ? "border-[#333]" : "border-red-900/50"} shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group transition-all duration-500 md:[transform:translateY(var(--tw-y))_translateZ(var(--tw-z))_rotateY(var(--tw-ry))] transform-none`}
                style={
                  {
                    "--tw-y": `${yOffset}px`,
                    "--tw-z": `${zOffset}px`,
                    "--tw-ry": `${rotateY}deg`,
                  } as React.CSSProperties
                }
              >
                {/* Cabinet Texture Overlay */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black to-[#222] pointer-events-none" />
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />

                {/* Drawer handle lines */}
                <div className="absolute inset-x-0 top-1/3 h-px bg-black/50" />
                <div className="absolute inset-x-0 bottom-1/3 h-px bg-black/50" />

                {/* Status indicator */}
                <div className="w-full flex justify-end absolute top-2 right-2">
                  <div
                    className={`w-2 h-2 rounded-full ${unlocked ? "bg-[#00ff41] shadow-[0_0_8px_#00ff41]" : "bg-red-500 shadow-[0_0_8px_red]"}`}
                  />
                </div>

                <div className="flex flex-col items-center justify-center h-full z-10 w-full relative">
                  {/* Metal Label Plate */}
                  <div className="w-[80%] bg-[#0a0a0a] border border-[#d4af37]/30 p-2 text-center shadow-inner group-hover:border-[#d4af37]/80 transition-colors">
                    <div className="font-headline font-bold text-[10px] md:text-xs tracking-widest text-[#d4af37] uppercase block mb-1">
                      <DynamicDecryption
                        text={era.name}
                        level={era.status as any}
                        puzzleContext={era.puzzle}
                        onUnlock={() =>
                          setUnlockedEras((prev) => ({
                            ...prev,
                            [era.id]: true,
                          }))
                        }
                      />
                    </div>
                    <span className="font-mono text-[8px] text-white/50 tracking-widest">
                      {era.timeRange}
                    </span>
                  </div>

                  {/* Embossed Seal (Mock) */}
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#555] mt-8 flex flex-col items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity">
                    {!unlocked ? (
                      <Lock className="w-4 h-4 text-red-500" />
                    ) : (
                      <span className="text-[6px] tracking-widest">
                        VERIFIED
                      </span>
                    )}
                  </div>
                </div>

                {/* Handle */}
                <div className="w-16 h-3 bg-gradient-to-b from-[#333] to-[#111] border border-black rounded-sm bottom-8 absolute z-20 shadow-md flex justify-center items-center">
                  <div className="w-12 h-1 bg-black/50 rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Floating Dust Particles (CSS based) */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden mix-blend-screen opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * 800,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              x: [null, (Math.random() - 0.5) * 100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}
