import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { batmanVillains } from "./data/batmanVillains";

export function RogueGallery({ eraId }: { eraId: string }) {
  const [activeVillainId, setActiveVillainId] = useState<string | null>(null);

  return (
    <div className="h-full relative">
      <span className="absolute top-0 left-0 font-mono text-[9px] uppercase tracking-[0.3em] text-red-500 border-b border-red-500/30 pb-1 z-10 bg-[#0c0c0c] px-2 py-1">
        GCPD Most Wanted
      </span>

      {!activeVillainId ? (
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {batmanVillains.map((v) => (
            <motion.div
              key={v.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveVillainId(v.id)}
              className="w-40 bg-[#1a1a1a] border border-[#333] cursor-pointer group flex flex-col items-center hover:border-red-500/50 transition-colors"
            >
              {/* Image Placeholder */}
              <div
                className="w-full h-32 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all border-b border-[#333] group-hover:border-red-500/50"
                style={{ backgroundImage: `url(${v.image})` }}
              />
              <div className="p-3 w-full text-center">
                <span className="font-headline font-bold text-xs uppercase text-white group-hover:text-red-400">
                  {v.name}
                </span>
                <div className="mt-2 w-full h-1 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500/50"
                    style={{ width: `${v.threatLevel * 10}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-[#111] border border-red-500/30 w-full max-w-4xl mx-auto flex flex-col md:flex-row relative shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setActiveVillainId(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white z-10 text-[10px] uppercase font-mono tracking-widest border border-white/20 px-2 py-1"
            >
              RETURN
            </button>

            {/* Booking photo */}
            <div
              className="md:w-1/3 min-h-[300px] bg-cover bg-center grayscale border-r border-[#333]"
              style={{
                backgroundImage: `url(${batmanVillains.find((v) => v.id === activeVillainId)?.image})`,
              }}
            >
              {/* Overlay height lines mock */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_40px] pointer-events-none mix-blend-overlay" />
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-8 font-mono text-sm leading-relaxed">
              <span className="text-[10px] text-red-500 tracking-widest uppercase mb-1 block">
                Subject File: GCPD-
                {activeVillainId?.toUpperCase().substring(0, 4)}
              </span>
              <h3 className="font-headline font-black text-3xl uppercase text-white mb-6">
                {batmanVillains.find((v) => v.id === activeVillainId)?.name}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6 border-y border-[#333] py-4">
                <div>
                  <span className="text-[9px] uppercase text-white/40 block mb-1">
                    First Appearance
                  </span>
                  <span className="text-white/80">
                    {
                      batmanVillains.find((v) => v.id === activeVillainId)
                        ?.firstAppearance
                    }
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-white/40 block mb-1">
                    Known Offenses
                  </span>
                  <span className="text-white/80">
                    {
                      batmanVillains.find((v) => v.id === activeVillainId)
                        ?.crimeType
                    }
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[9px] uppercase text-white/40 block mb-2">
                  Psychological Assessment
                </span>
                <p className="border-l-2 border-red-500/50 pl-3 text-white/70 bg-black/30 py-2">
                  {
                    batmanVillains.find((v) => v.id === activeVillainId)
                      ?.assessment
                  }
                </p>
              </div>

              <div className="flex justify-between items-center bg-black/50 p-4 border border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase text-white/40">
                    Encounters
                  </span>
                  <span className="text-xl font-bold text-white">
                    {
                      batmanVillains.find((v) => v.id === activeVillainId)
                        ?.encounters
                    }
                  </span>
                </div>
                <div className="flex flex-col items-end w-1/2">
                  <span className="text-[9px] uppercase text-white/40 mb-1">
                    Threat Level
                  </span>
                  <div className="w-full flex gap-1 h-3">
                    {[...Array(10)].map((_, i) => {
                      const threk =
                        batmanVillains.find((v) => v.id === activeVillainId)
                          ?.threatLevel || 0;
                      return (
                        <div
                          key={i}
                          className={`flex-1 ${i < threk ? "bg-red-500" : "bg-[#333]"}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
