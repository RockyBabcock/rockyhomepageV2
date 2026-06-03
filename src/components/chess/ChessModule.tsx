import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { ThoughtStarMap } from "./ThoughtStarMap";
import { CharacterTheater } from "./CharacterTheater";
import { InfiniteChessboard } from "./InfiniteChessboard";
import { QuoteTemple } from "./QuoteTemple";
import { InteractiveChessboard } from "./InteractiveChessboard";
import { StatusPill } from "../StatusPill";

type ChessLayer = "quote-temple" | "star-map" | "board" | "archetypes" | "infinite";

const chessLayers = [
  { id: "quote-temple", label: "01. Quote Temple" },
  { id: "star-map", label: "02. Thought Star Map" },
  { id: "board", label: "03. Interactive Board" },
  { id: "archetypes", label: "04. Archetypes" },
  { id: "infinite", label: "05. Infinite Board" },
] as const;

export function ChessModule() {
  const [layer, setLayer] = useState<ChessLayer>("quote-temple");

  return (
    <section className="chess-exhibit-page">
      <div className="chess-exhibit-inner">
        {/* Top Header */}
        <div className="relative z-50 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-black/40 backdrop-blur-md border-b border-white/5 rounded-t-3xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="font-headline font-black text-xl md:text-2xl uppercase tracking-widest text-[#d4af37]">
                Strategic Foundations
              </h2>
              <StatusPill status="Personal Archive" />
            </div>

            <div className="hidden lg:flex flex-wrap gap-2 ml-4 bg-white/5 p-1 rounded-full border border-white/5 shadow-inner">
              {chessLayers.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setLayer(tab.id)}
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
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-[10px] font-mono uppercase font-bold tracking-widest rounded-full hover:bg-white/10 transition-colors border border-white/10 text-[#d4af37] self-start md:self-auto shrink-0"
          >
            DestinyRocky <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="chess-layer-shell">
          <div className="chess-layer-scroll">
            <AnimatePresence mode="wait">
              {layer === "quote-temple" && (
                <motion.div
                  key="quote-temple"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <QuoteTemple />
                </motion.div>
              )}
              {layer === "star-map" && (
                <motion.div
                  key="star-map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ThoughtStarMap />
                </motion.div>
              )}
              {layer === "board" && (
                <motion.div
                  key="board"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <InteractiveChessboard />
                </motion.div>
              )}
              {layer === "archetypes" && (
                <motion.div
                  key="archetypes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CharacterTheater onComplete={() => setLayer("infinite")} />
                </motion.div>
              )}
              {layer === "infinite" && (
                <motion.div
                  key="infinite"
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
        </div>

        {/* Evidence Block */}
        <div className="relative z-50 p-6 flex flex-col xl:flex-row gap-6 bg-black/60 border-t border-[rgba(212,175,55,0.22)] rounded-b-3xl">
          <div className="flex-1">
            <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
              What I built
            </h4>
            <p className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5 h-full">
              A personal thinking hall centering around chess, strategy,
              constraints, and long-term planning.
            </p>
          </div>
          <div className="flex-1">
            <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
              What I learned
            </h4>
            <p className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5 h-full">
              Chess is a useful metaphor for interface design because every move
              fundamentally changes the system state.
            </p>
          </div>
          <div className="flex-1">
            <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-bold mb-1">
              What's next
            </h4>
            <div className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5 flex items-start gap-2 h-full">
              <AlertCircle
                size={14}
                className="mt-0.5 text-[#d4af37]/70 shrink-0"
              />
              <span>
                Document famous positions, add saved studies, and connect chess patterns to design decisions.
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Override */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[60] bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10">
          {chessLayers.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setLayer(tab.id)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                layer === tab.id ? "bg-[#d4af37]" : "bg-white/20",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
