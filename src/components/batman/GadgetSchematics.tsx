import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { batmanGadgets } from "./data/batmanGadgets";

export function GadgetSchematics({ eraId }: { eraId: string }) {
  const [activeId, setActiveId] = useState(batmanGadgets[0].id);
  const activeGadget = batmanGadgets.find((g) => g.id === activeId);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#00ff41] border-b border-[#00ff41]/30 pb-1 mb-2 hidden md:block">
          WayneTech Blueprints
        </span>
        {batmanGadgets.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveId(g.id)}
            className={`text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap md:whitespace-normal
              ${activeId === g.id ? "bg-[#00220a] border-l-2 border-[#00ff41] text-[#00ff41]" : "border-l-2 border-transparent text-white/50 hover:bg-white/5"}`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="flex-1 border border-[#00ff41]/20 bg-[#001105] relative overflow-hidden flex flex-col items-center justify-center p-8 group">
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            mixBlendMode: "screen",
          }}
        />

        <AnimatePresence mode="wait">
          {activeGadget && (
            <motion.div
              key={activeGadget.id}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              className="relative z-10 w-full max-w-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-headline font-black text-2xl uppercase tracking-widest text-[#00ff41]">
                    {activeGadget.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#00ff41]/60 tracking-widest uppercase">
                    CLASS: {activeGadget.type}
                  </span>
                </div>
                <div className="w-16 h-16 border border-[#00ff41]/30 rounded-full flex items-center justify-center flex-col animate-[spin_10s_linear_infinite]">
                  <div className="w-12 h-12 border-t-2 border-[#00ff41] rounded-full" />
                </div>
              </div>

              <div className="bg-black/50 border border-[#00ff41]/30 p-6 font-mono text-xs text-[#00ff41]/80 leading-relaxed mb-6">
                {activeGadget.description}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {activeGadget.components.map((comp, i) => (
                  <div
                    key={i}
                    className="border border-[#00ff41]/20 bg-[#00ff41]/5 p-3 flex flex-col gap-2"
                  >
                    <span className="text-[8px] uppercase tracking-widest text-[#00ff41]/60">
                      COMPONENT {i + 1}
                    </span>
                    <span className="text-[10px] uppercase text-[#00ff41]">
                      {comp}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-[#00ff41]/40 uppercase tracking-widest">
          WAYNETECH CONFIDENTIAL
        </div>
      </div>
    </div>
  );
}
