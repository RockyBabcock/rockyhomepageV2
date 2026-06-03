import React, { useState } from "react";
import { chessQuotes } from "./chessData";

export function QuoteTemple() {
  const [activeId, setActiveId] = useState(chessQuotes[0].id);
  const active = chessQuotes.find((q) => q.id === activeId) ?? chessQuotes[0];

  return (
    <div className="grid gap-8 p-6 lg:p-12 lg:grid-cols-[360px_minmax(0,1fr)] h-full items-center">
      <aside className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#d4af37]">
          Quote Temple
        </div>

        <div className="mt-5 space-y-2">
          {chessQuotes.map((quote) => (
            <button
              key={quote.id}
              onClick={() => setActiveId(quote.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                activeId === quote.id
                  ? "border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]"
                  : "border-white/10 text-white/55 hover:bg-white/10"
              }`}
            >
              <div className="font-medium text-white line-clamp-1">{quote.author}</div>
            </button>
          ))}
        </div>
      </aside>

      <section className="relative overflow-hidden rounded-[32px] border border-[#d4af37]/20 bg-black/40 p-8 lg:p-12 h-full flex flex-col justify-center min-h-[400px]">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="text-sm font-mono uppercase tracking-[0.18em] text-[#d4af37]">
            {active.category}
          </div>

          <blockquote className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
            “{active.text}”
          </blockquote>

          <div className="mt-6 text-xl text-white/70">
            — {active.author}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-8 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-white/40">
              System Mapping
            </div>
            <p className="mt-3 text-base leading-8 text-white/70">
              {active.reflection}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
