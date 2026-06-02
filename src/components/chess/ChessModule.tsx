import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { ThoughtStarMap } from "./ThoughtStarMap";
import { CharacterTheater } from "./CharacterTheater";
import { InfiniteChessboard } from "./InfiniteChessboard";
import { StatusPill } from "../StatusPill";
import { MuseumCard } from "../common/MuseumCard";

export function ChessModule() {
  // 0: Thought Star Map, 1: Character Theater, 2: Stream of Consciousness
  const [layer, setLayer] = useState<0 | 1 | 2>(0);

  return (
    <div
      id="chess"
      className="col-span-12 h-full flex flex-col"
    >
      <MuseumCard className="p-0 flex flex-col border border-ink/10 dark:border-base/10 bg-[#050505] text-white overflow-hidden relative h-full rounded-3xl">
      {/* Top Header */}
      <div className="relative z-50 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="font-headline font-black text-xl md:text-2xl uppercase tracking-widest text-[#d4af37]">
              Strategic Foundations
            </h2>
            <StatusPill status="Personal Archive" />
          </div>

          <div className="hidden lg:flex gap-2 ml-4 bg-white/5 p-1 rounded-full border border-white/5 shadow-inner">
            {[
              { id: 0, label: "01. Philosophy Map" },
              { id: 1, label: "02. Archetypes" },
              { id: 2, label: "03. Meditation" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLayer(tab.id as 0 | 1 | 2)}
                className={cn(
                  "px-4 py-1.5 rounded-full font-mono text-[9px] uppercase font-bold tracking-widest transition-all",
                  layer === tab.id
                    ? "bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                    : "text-white/40 hover:bg-white/10 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <a
          href="https://www.chess.com/member/destinyrocky"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/5 text-[10px] font-mono uppercase font-bold tracking-widest rounded-full hover:bg-white/10 transition-colors border border-white/10 text-[#d4af37] self-start md:self-auto"
        >
          DestinyRocky <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Evidence Block */}
      <div className="relative z-50 p-6 flex flex-col lg:flex-row gap-6 bg-black/60 border-b border-white/5">
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
            What I built
          </h4>
          <p className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            A personal thinking hall centering around chess, strategy,
            constraints, and long-term planning.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
            What I learned
          </h4>
          <p className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            Chess is a useful metaphor for interface design because every move
            fundamentally changes the system state.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
            What's next
          </h4>
          <div className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5 flex items-start gap-2">
            <AlertCircle
              size={14}
              className="mt-0.5 text-[#d4af37]/70 shrink-0"
            />
            <span>
              Add an interactive board, famous positions, and strategy notes.
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 bg-[#0a0a0a] min-h-[500px]">
        <AnimatePresence mode="wait">
          {layer === 0 && (
            <motion.div
              key="layer0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <ThoughtStarMap />
            </motion.div>
          )}
          {layer === 1 && (
            <motion.div
              key="layer1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <CharacterTheater onComplete={() => setLayer(2)} />
            </motion.div>
          )}
          {layer === 2 && (
            <motion.div
              key="layer2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <InfiniteChessboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Override */}
      <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10">
        {[0, 1, 2].map((id) => (
          <button
            key={id}
            onClick={() => setLayer(id as 0 | 1 | 2)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              layer === id ? "bg-[#d4af37]" : "bg-white/20",
            )}
          />
        ))}
      </div>
      </MuseumCard>
    </div>
  );
}
