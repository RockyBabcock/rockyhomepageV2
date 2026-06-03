import React, { useState } from "react";
import { cn } from "@/lib/utils";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const startingPieces: Record<string, string> = {
  a1: "♖", b1: "♘", c1: "♗", d1: "♕", e1: "♔", f1: "♗", g1: "♘", h1: "♖",
  a2: "♙", b2: "♙", c2: "♙", d2: "♙", e2: "♙", f2: "♙", g2: "♙", h2: "♙",
  a7: "♟", b7: "♟", c7: "♟", d7: "♟", e7: "♟", f7: "♟", g7: "♟", h7: "♟",
  a8: "♜", b8: "♞", c8: "♝", d8: "♛", e8: "♚", f8: "♝", g8: "♞", h8: "♜",
};

const famousPositions = [
  {
    name: "Opening Discipline",
    note: "The beginning of a system: every small move defines future constraints.",
    highlights: ["e2", "e4", "d2", "d4", "g1", "f3"],
  },
  {
    name: "Center Control",
    note: "Good interfaces, like good chess, begin by controlling the center of attention.",
    highlights: ["d4", "e4", "d5", "e5"],
  },
  {
    name: "Endgame Patience",
    note: "The final 10% of a project rewards precision more than speed.",
    highlights: ["e1", "e8", "a1", "h8"],
  },
];

export function InteractiveChessboard() {
  const [activePosition, setActivePosition] = useState(famousPositions[0]);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  return (
    <div className="grid gap-8 p-6 lg:p-12 lg:grid-cols-[minmax(0,1fr)_320px] h-full items-center">
      <div className="rounded-[28px] border border-white/10 bg-black/40 p-4 w-full max-w-2xl mx-auto">
        <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-2xl border border-[#d4af37]/30">
          {[...files].flatMap((file) =>
            [8, 7, 6, 5, 4, 3, 2, 1].map((rank) => {
              const square = `${file}${rank}`;
              const fileIndex = files.indexOf(file);
              const isDark = (fileIndex + rank) % 2 === 0;
              const isHighlighted = activePosition.highlights.includes(square);
              const isSelected = selectedSquare === square;

              return (
                <button
                  key={square}
                  onClick={() => setSelectedSquare(square)}
                  className={cn(
                    "relative flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl transition-all",
                    isDark ? "bg-[#3b2f20]" : "bg-[#d9c49a]",
                    isHighlighted && "ring-2 ring-[#d4af37] ring-inset",
                    isSelected && "scale-95 brightness-125"
                  )}
                >
                  <span className="drop-shadow-md">
                    {startingPieces[square]}
                  </span>
                  <span className="absolute bottom-1 left-1 text-[9px] font-mono opacity-50">
                    {square}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#d4af37]">
          Position Study
        </div>

        <h3 className="mt-4 text-3xl font-bold text-white">
          {activePosition.name}
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/60">
          {activePosition.note}
        </p>

        <div className="mt-6 space-y-2">
          {famousPositions.map((position) => (
            <button
              key={position.name}
              onClick={() => setActivePosition(position)}
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
                activePosition.name === position.name
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                  : "border-white/10 text-white/55 hover:bg-white/10"
              )}
            >
              {position.name}
            </button>
          ))}
        </div>

        {selectedSquare && (
          <div className="mt-6 rounded-xl bg-black/30 p-4 text-sm text-white/60">
            Selected square:{" "}
            <span className="font-mono text-[#d4af37]">{selectedSquare}</span>
          </div>
        )}
      </aside>
    </div>
  );
}
