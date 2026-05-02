import React, { useState } from "react";
import { motion } from "motion/react";
import { batmanCreators } from "./data/batmanCreators";

export function CreatorProfiles({ eraId }: { eraId: string }) {
  const [selectedCreator, setSelectedCreator] = useState(batmanCreators[0]);

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* Network Board */}
      <div className="md:w-2/3 border border-white/5 bg-black/20 relative overflow-hidden flex items-center justify-center p-8">
        <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4af37] border-b border-[#d4af37]/30 pb-1">
          Subject Network
        </span>

        <div className="flex flex-wrap items-center justify-center gap-12 relative w-full max-w-2xl">
          {/* Mock connections / strings */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-white min-h-[300px]"
            style={{ strokeDasharray: "4 4" }}
          >
            <path d="M 200 100 Q 300 150 400 100" fill="none" />
            <path
              d="M 300 250 Q 250 150 200 100"
              fill="none"
              className="stroke-[#d4af37]"
            />
          </svg>

          {batmanCreators.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => setSelectedCreator(c)}
              className={`w-24 h-24 rounded-full border-2 bg-cover bg-center overflow-hidden grayscale hover:grayscale-0 transition-all ${selectedCreator.id === c.id ? "border-[#d4af37] scale-110 shadow-[0_0_20px_rgba(212,175,55,0.3)] grayscale-0" : "border-[#333]"}`}
              style={{ backgroundImage: `url(${c.photo})` }}
            />
          ))}
        </div>
      </div>

      {/* Profile Card */}
      <div className="md:w-1/3 flex flex-col items-center">
        <motion.div
          key={selectedCreator.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full bg-[#111] border border-white/10 p-6 flex flex-col gap-6 relative shadow-2xl"
        >
          {/* Paper Clip mock */}
          <div className="absolute -top-3 left-8 w-4 h-10 border-2 border-[#fff] rounded-full opacity-30 transform -rotate-12" />

          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-headline text-2xl font-black uppercase text-white">
                {selectedCreator.name}
              </h3>
              <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest">
                {selectedCreator.role}
              </span>
            </div>
            <div className="w-12 h-16 border border-[#333] flex items-center justify-center opacity-50 bg-[url('https://www.transparenttextures.com/patterns/fingerprint.png')] bg-cover">
              <span className="text-[6px] text-center w-full bg-black/80">
                {selectedCreator.fingerprint}
              </span>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <span className="text-white/40 block mb-1">Subject Note:</span>
              <p className="text-white/80 leading-relaxed italic border-l-2 border-[#d4af37]/30 pl-3">
                "{selectedCreator.note}"
              </p>
            </div>
            <div>
              <span className="text-white/40 block mb-1">Associated With:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCreator.connections.map((con) => (
                  <span
                    key={con}
                    className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest"
                  >
                    {con.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
