import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BatmanIntroTerminal } from "./BatmanIntroTerminal";
import { ArchiveRoom } from "./ArchiveRoom";
import { CabinetWorkspace } from "./CabinetWorkspace";
import { GothamCityMap } from "./GothamCityMap";
import { ParallelUniverseAnalysis } from "./ParallelUniverseAnalysis";
import { MuseumCard } from "../common/MuseumCard";

export function BatmanModule() {
  const [stage, setStage] = useState<"auth" | "room" | "cabinet">("auth");
  const [roomView, setRoomView] = useState<"cabinets" | "map" | "comparator">(
    "cabinets",
  );
  const [selectedCabinetId, setSelectedCabinetId] = useState<string | null>(
    null,
  );

  const handleAuthComplete = () => {
    setStage("room");
  };

  const handleOpenCabinet = (id: string) => {
    setSelectedCabinetId(id);
    setStage("cabinet");
  };

  const handleCloseCabinet = () => {
    setSelectedCabinetId(null);
    setStage("room");
  };

  return (
    <div
      id="batman"
      className="col-span-12 h-full flex flex-col"
    >
      <MuseumCard className="p-0 flex flex-col min-h-[800px] border border-ink/10 dark:border-base/10 bg-[#0a0a0a] text-white overflow-hidden relative font-mono h-full rounded-3xl">
      <AnimatePresence mode="wait">
        {stage === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50"
          >
            <BatmanIntroTerminal onComplete={handleAuthComplete} />
          </motion.div>
        )}

        {stage === "room" && (
          <motion.div
            key="room"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-40 bg-[#0a0a0a] flex flex-col"
          >
            <div className="absolute top-16 left-0 right-0 z-50 flex justify-center gap-4 p-4 pointer-events-auto">
              <button
                onClick={() => setRoomView("cabinets")}
                className={`px-4 py-2 border text-[10px] uppercase tracking-widest transition-colors ${roomView === "cabinets" ? "bg-[var(--museum-accent)] text-black border-[var(--museum-accent)]" : "bg-black/50 text-[var(--museum-accent)]/50 border-[var(--museum-accent)]/30 hover:border-[var(--museum-accent)]"}`}
              >
                Archives
              </button>
              <button
                onClick={() => setRoomView("map")}
                className={`px-4 py-2 border text-[10px] uppercase tracking-widest transition-colors ${roomView === "map" ? "bg-[var(--museum-accent)] text-black border-[var(--museum-accent)]" : "bg-black/50 text-[var(--museum-accent)]/50 border-[var(--museum-accent)]/30 hover:border-[var(--museum-accent)]"}`}
              >
                City Map
              </button>
              <button
                onClick={() => setRoomView("comparator")}
                className={`px-4 py-2 border text-[10px] uppercase tracking-widest transition-colors ${roomView === "comparator" ? "bg-[#00ff41] text-black border-[#00ff41]" : "bg-black/50 text-[#00ff41]/50 border-[#00ff41]/30 hover:border-[#00ff41]"}`}
              >
                Analysis
              </button>
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {roomView === "cabinets" && (
                  <motion.div
                    key="cabinets"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <ArchiveRoom onOpenCabinet={handleOpenCabinet} />
                  </motion.div>
                )}
                {roomView === "map" && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <GothamCityMap onOpenEra={handleOpenCabinet} />
                  </motion.div>
                )}
                {roomView === "comparator" && (
                  <motion.div
                    key="comparator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <ParallelUniverseAnalysis />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {stage === "cabinet" && selectedCabinetId && (
          <motion.div
            key="cabinet"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40 bg-[#111]"
          >
            <CabinetWorkspace
              eraId={selectedCabinetId}
              onClose={handleCloseCabinet}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </MuseumCard>
    </div>
  );
}
