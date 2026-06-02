import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { chessPieces } from "./chessData";
import { cn } from "../../lib/utils";
import { X, Play, ArrowRight, ChevronRight } from "lucide-react";

export function CharacterTheater({ onComplete }: { onComplete: () => void }) {
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [completedPieces, setCompletedPieces] = useState<string[]>([]);
  const [act, setAct] = useState(0); // 0: Grid, 1: Monologue, 2: Split, 3: Interactive, 4: Finale

  const selectedPiece = chessPieces.find((p) => p.id === selectedPieceId);

  const handleSelect = (id: string) => {
    setSelectedPieceId(id);
    setAct(1);
  };

  const closeTheater = () => {
    if (
      selectedPieceId &&
      !completedPieces.includes(selectedPieceId) &&
      act > 2
    ) {
      const newCompleted = [...completedPieces, selectedPieceId];
      setCompletedPieces(newCompleted);
      if (newCompleted.length === chessPieces.length) {
        onComplete();
      }
    }
    setSelectedPieceId(null);
    setAct(0);
  };

  const nextAct = () => {
    if (act < 4) setAct(act + 1);
    else closeTheater();
  };

  return (
    <div className="w-full h-full relative bg-[#0a0a0a] overflow-hidden flex inset-0">
      <AnimatePresence>
        {!selectedPieceId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center p-8 z-10"
          >
            <div className="mb-12 text-center">
              <h2 className="font-headline font-black text-3xl uppercase tracking-[0.2em] text-white">
                Character Theater
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 mt-2">
                Select an archetype to understand the system
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
              {chessPieces.map((piece) => {
                const isCompleted = completedPieces.includes(piece.id);
                return (
                  <div
                    key={piece.id}
                    onClick={() => handleSelect(piece.id)}
                    className="relative group cursor-pointer aspect-square border border-white/5 bg-white/5 flex flex-col items-center justify-center overflow-hidden"
                  >
                    {/* Silhouette to Clear focus transition */}
                    <div
                      className={cn(
                        "text-8xl transition-all duration-700 ease-in-out group-hover:blur-none group-hover:scale-110",
                        isCompleted
                          ? "text-[#d4af37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          : "text-white/20 blur-sm brightness-50",
                      )}
                    >
                      {piece.symbol}
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      <span
                        className={cn(
                          "font-headline font-bold text-lg tracking-widest uppercase",
                          isCompleted ? "text-[#d4af37]" : "text-white",
                        )}
                      >
                        {piece.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                        {piece.archetype}
                      </span>
                    </div>

                    {isCompleted && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />
                    )}
                  </div>
                );
              })}
            </div>

            {completedPieces.length === chessPieces.length && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onComplete}
                className="mt-12 px-8 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors flex items-center gap-2"
              >
                Access The System <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPieceId && selectedPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col bg-[#050505]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="text-3xl text-[#d4af37]">
                  {selectedPiece.symbol}
                </span>
                <div>
                  <h3 className="font-headline font-black text-xl uppercase tracking-widest text-[#d4af37]">
                    {selectedPiece.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-white/50 tracking-widest">
                    {selectedPiece.archetype}
                  </p>
                </div>
              </div>
              <button
                onClick={closeTheater}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white/50" />
              </button>
            </div>

            {/* Stage */}
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
              {/* Act 1: Monologue */}
              <AnimatePresence mode="wait">
                {act === 1 && (
                  <motion.div
                    key="act1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="max-w-2xl text-center space-y-6"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] opacity-60">
                      Act 1: Identity
                    </span>
                    {selectedPiece.monologue.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 1.5 }}
                        className="font-headline font-medium text-2xl md:text-3xl lg:text-4xl leading-snug text-white/90"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </motion.div>
                )}

                {/* Act 2: Proof Split Screen */}
                {act === 2 && (
                  <motion.div
                    key="act2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="w-full max-w-6xl h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-8 outline outline-1 outline-white/10 overflow-hidden bg-white/5"
                  >
                    <div className="flex flex-col justify-center p-12 relative overflow-hidden bg-black/50">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] opacity-60 mb-6 absolute top-8 left-12">
                        Act 2: Evidence
                      </span>
                      <div className="text-9xl opacity-10 absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4">
                        {selectedPiece.symbol}
                      </div>
                      <h4 className="font-headline font-bold text-2xl mb-4 relative z-10 text-white">
                        Application in Practice
                      </h4>
                      <p className="font-mono text-sm leading-relaxed text-white/70 relative z-10 p-6 border-l border-[#d4af37]/50 bg-black/40">
                        {selectedPiece.proof.text}
                      </p>
                    </div>
                    <div className="relative group overflow-hidden">
                      <img
                        src={selectedPiece.proof.image}
                        alt="Proof"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>
                  </motion.div>
                )}

                {/* Act 3: Interactive Simulation */}
                {act === 3 && (
                  <motion.div
                    key="act3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="w-full max-w-2xl flex flex-col items-center"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] opacity-60 mb-6">
                      Act 3: The Movement
                    </span>
                    <div className="grid grid-cols-5 grid-rows-5 w-64 h-64 border border-white/20 relative bg-black/50">
                      {/* Simplified illustrative board */}
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "border border-white/5",
                            i % 2 === 0 ? "bg-white/5" : "",
                          )}
                        />
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-pulse">
                          {selectedPiece.symbol}
                        </div>
                      </div>
                    </div>
                    <p className="mt-8 font-mono text-xs uppercase tracking-widest text-white/50 text-center max-w-sm">
                      Observe the algorithmic trajectory.
                      <br />
                      (Interactive simulation simplified for theater mode)
                    </p>
                  </motion.div>
                )}

                {/* Act 4: Finale */}
                {act === 4 && (
                  <motion.div
                    key="act4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-8"
                  >
                    <div className="text-[12rem] text-[#d4af37] opacity-20 filter blur-sm">
                      {selectedPiece.symbol}
                    </div>
                    <p className="font-headline font-black text-3xl tracking-[0.1em] text-[#d4af37]">
                      {selectedPiece.archetype} Integrated
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                      Pattern recorded in the system.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "w-12 h-1",
                      act >= step ? "bg-[#d4af37]" : "bg-white/10",
                    )}
                  />
                ))}
              </div>
              <button
                onClick={nextAct}
                className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-[#d4af37] hover:text-white transition-colors"
              >
                {act < 4 ? "Next Act" : "Complete"}{" "}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
