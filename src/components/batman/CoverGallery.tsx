import React from "react";
import { motion } from "motion/react";

export function CoverGallery({ eraId }: { eraId: string }) {
  // Placeholder images
  const covers = [
    { title: "Detective Comics 27", year: "1939", rarity: "Legendary" },
    { title: "Batman #1", year: "1940", rarity: "Legendary" },
    { title: "Detective Comics 38", year: "1940", rarity: "Rare" },
  ];

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <span className="font-mono text-xs text-[#d4af37] tracking-widest uppercase block mb-8 text-center border-b border-[#d4af37]/30 pb-2">
        Physical Evidence Display
      </span>
      <div className="flex flex-wrap gap-8 justify-center perspective-[1000px]">
        {covers.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotateY: 0, rotateX: 0, zIndex: 10 }}
            className="relative w-48 h-72 bg-[#1e1e1e] border-4 border-white/5 shadow-2xl cursor-pointer group flex flex-col items-center justify-center text-center p-4"
            style={{
              transform: `rotateY(${i % 2 === 0 ? 10 : -10}deg) rotateX(10deg)`,
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute top-2 right-2 text-[8px] font-mono px-2 py-1 bg-black/80 border border-[#d4af37]/50 text-[#d4af37]">
              {c.rarity}
            </div>
            <p className="font-headline font-bold text-lg text-white group-hover:text-[#d4af37] transition-colors">
              {c.title}
            </p>
            <p className="font-mono text-xs text-white/50">{c.year}</p>

            {/* Metadata overlay on hover */}
            <div className="absolute inset-0 bg-black/90 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
              <span className="text-[10px] text-[#00ff41] border border-[#00ff41] px-2 p-1 mb-2">
                INSPECT
              </span>
              <span className="text-[8px] text-white/70 max-w-[90%]">
                Significant milestone in publication history. Analysis
                recommended.
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
