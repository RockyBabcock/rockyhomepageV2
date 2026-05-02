import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { batmanStories } from "./data/batmanStories";

export function StoryArcsTimeline({ eraId }: { eraId: string }) {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col justify-center py-12 relative">
      <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4af37]">
        Major Case Files
      </span>

      <div className="relative w-full flex items-center h-24 my-8">
        <div className="absolute left-0 right-0 h-[2px] bg-[#333] top-1/2 -translate-y-1/2" />

        <div className="flex justify-between w-full px-8 relative z-10">
          {batmanStories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <button
                onClick={() => setActiveStory(story.id)}
                className={`w-6 h-6 rounded-full border-4 border-[#0a0a0a] transition-all
                    ${activeStory === story.id ? "bg-[#d4af37] scale-125 shadow-[0_0_15px_#d4af37]" : "bg-[#555] hover:bg-[#888]"}`}
              />
              <span
                className={`mt-4 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transform -rotate-45 origin-top-left transition-colors
                  ${activeStory === story.id ? "text-[#d4af37]" : "text-white/50"}`}
              >
                {story.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeStory && (
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-16 max-w-2xl mx-auto bg-[#1a1a1a] border border-[#d4af37]/30 p-8 shadow-2xl relative"
          >
            {/* Red classified stamp mock */}
            <div className="absolute -top-4 -right-4 border-2 border-red-500/50 text-red-500/50 font-bold uppercase tracking-widest px-2 py-1 transform rotate-12 text-[10px]">
              DECLASSIFIED
            </div>

            <h3 className="font-headline font-black text-2xl uppercase text-white mb-2">
              {batmanStories.find((s) => s.id === activeStory)?.title}
            </h3>
            <span className="font-mono text-xs text-[#d4af37] block mb-6">
              {batmanStories.find((s) => s.id === activeStory)?.year}
            </span>

            <div className="space-y-4 font-mono text-sm text-white/80 leading-relaxed border-l-2 border-[#333] pl-4">
              <p>{batmanStories.find((s) => s.id === activeStory)?.summary}</p>
              <div className="mt-4 pt-4 border-t border-[#333]">
                <span className="text-[10px] uppercase text-white/40 block mb-1">
                  Impact Assessment
                </span>
                <p className="text-[#d4af37]/80">
                  {batmanStories.find((s) => s.id === activeStory)?.impact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
