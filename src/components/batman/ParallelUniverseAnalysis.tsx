import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { batmanEras } from "./data/batmanEras";
import { SystemStatusBar } from "./SystemStatusBar";
import { Download, Crosshair, Map } from "lucide-react";

export function ParallelUniverseAnalysis() {
  const [era1, setEra1] = useState(batmanEras[0]);
  const [era2, setEra2] = useState(batmanEras[batmanEras.length - 2]); // Nolan Era default

  const handleDownload = () => {
    alert("Analysis Report exported to Secure Drives. (PDF mock)");
  };

  return (
    <div className="w-full h-full relative bg-[#050505] text-white font-mono flex flex-col overflow-y-auto">
      <SystemStatusBar />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center mt-12 md:mt-16 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#00ff41] border-b border-[#00ff41]/30 pb-1">
            Parallel Universe Analysis
          </span>
          <h2 className="text-xl font-headline uppercase mt-2 tracking-widest text-white">
            Cross-Era Comparison
          </h2>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 border border-[#00ff41]/30 text-[#00ff41]/70 hover:bg-[#00ff41]/10 hover:text-[#00ff41] transition-colors text-[10px] uppercase tracking-widest"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row bg-[#0a0a0a] border-b border-white/10">
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-white/10">
          <span className="text-[9px] uppercase text-white/40 block mb-2 tracking-widest">
            Subject Alpha
          </span>
          <select
            className="bg-transparent border border-white/20 text-white text-xs w-full p-2 outline-none uppercase tracking-widest"
            value={era1.id}
            onChange={(e) =>
              setEra1(
                batmanEras.find((er) => er.id === e.target.value) ||
                  batmanEras[0],
              )
            }
          >
            {batmanEras.map((e) => (
              <option key={e.id} value={e.id} className="bg-black text-white">
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 p-4">
          <span className="text-[9px] uppercase text-white/40 block mb-2 tracking-widest">
            Subject Beta
          </span>
          <select
            className="bg-transparent border border-white/20 text-white text-xs w-full p-2 outline-none uppercase tracking-widest"
            value={era2.id}
            onChange={(e) =>
              setEra2(
                batmanEras.find((er) => er.id === e.target.value) ||
                  batmanEras[0],
              )
            }
          >
            {batmanEras.map((e) => (
              <option key={e.id} value={e.id} className="bg-black text-white">
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison View */}
      <div className="flex flex-col md:flex-row flex-1 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Alpha */}
        <div className="flex-1 p-4 md:p-8 space-y-12 bg-gradient-to-br from-black/0 to-[#00ff41]/5">
          <EraDetails era={era1} />
        </div>

        {/* Center Separator Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-48 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent z-10" />

        {/* Beta */}
        <div className="flex-1 p-4 md:p-8 space-y-12 bg-gradient-to-bl from-black/0 to-red-500/5">
          <EraDetails era={era2} />
        </div>
      </div>
    </div>
  );
}

function EraDetails({ era }: { era: (typeof batmanEras)[0] }) {
  if (!era) return null;
  return (
    <div className="space-y-10 font-mono">
      {/* Visual Identity / Colors */}
      <section>
        <h4 className="text-[10px] uppercase text-white/40 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
          <Map className="w-3 h-3" /> Visual Identity
        </h4>
        <div className="flex flex-wrap gap-2 text-xs mb-4">
          {era.colors?.map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 bg-black border border-white/10 px-2 py-1 shadow-md"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: c }}
              />
              <span className="text-white/60">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Psychology */}
      <section>
        <h4 className="text-[10px] uppercase text-white/40 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
          <Crosshair className="w-3 h-3" /> Psychological Profile
        </h4>
        <p className="text-sm text-white/80 leading-relaxed border-l-2 border-[#d4af37]/50 pl-4 bg-gradient-to-r from-black/50 to-transparent py-4 shadow-inner">
          {era.psychology}
        </p>
      </section>

      {/* Equipment Evolution - with 3D rotating mock component */}
      <section>
        <h4 className="text-[10px] uppercase text-white/40 tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
          Equipment Manifest
        </h4>

        {/* Battlesuit 3D representation */}
        <div className="bg-[#111] border border-white/5 p-6 mb-4 relative overflow-hidden group min-h-[150px] flex items-center shadow-lg">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 w-2/3 pr-4">
            <span className="text-[9px] uppercase tracking-widest text-[#00ff41]/50 block mb-2">
              Tactical Suit
            </span>
            <p className="text-white/80 text-xs leading-relaxed">
              {era.battlesuitDesc}
            </p>
          </div>

          {/* Mock 3D rotating model */}
          <div className="absolute right-[-20%] md:right-4 top-1/2 -translate-y-1/2 w-48 h-48 perspective-[1000px] pointer-events-none opacity-50 md:opacity-100">
            <motion.div
              className="w-full h-full transform-style-3d border-2 border-dashed border-white/20 rounded-full flex items-center justify-center"
              animate={{ rotateY: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-24 h-32 bg-gradient-to-b from-white/10 to-transparent border border-white/30 transform-style-3d">
                <div
                  className="absolute inset-0 border border-t-[var(--theme-color)] border-t-2"
                  style={
                    {
                      "--theme-color": era.colors?.[0] || "grey",
                    } as React.CSSProperties
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Batmobile 3D representation */}
        <div className="bg-[#111] border border-white/5 p-6 relative overflow-hidden group min-h-[150px] flex items-center shadow-lg">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10 w-2/3 pr-4">
            <span className="text-[9px] uppercase tracking-widest text-[#00ff41]/50 block mb-2">
              Primary Vehicle
            </span>
            <p className="text-white/80 text-xs leading-relaxed">
              {era.batmobileDesc}
            </p>
          </div>

          {/* Mock 3D rotating model */}
          <div className="absolute right-[-20%] md:right-4 top-1/2 -translate-y-1/2 w-48 h-48 perspective-[1000px] pointer-events-none opacity-50 md:opacity-100">
            <motion.div
              className="w-full h-full transform-style-3d border-2 border-dashed border-white/10 rounded-full flex items-center justify-center"
              animate={{ rotateY: -360, rotateX: 20 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-32 h-12 bg-gradient-to-b from-black to-white/10 border-b border-[#00ff41]/30 transform-style-3d" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
