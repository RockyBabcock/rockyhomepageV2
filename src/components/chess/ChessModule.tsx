import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThoughtStarMap } from './ThoughtStarMap';
import { CharacterTheater } from './CharacterTheater';
import { InfiniteChessboard } from './InfiniteChessboard';

export function ChessModule() {
  // 0: Thought Star Map, 1: Character Theater, 2: Stream of Consciousness
  const [layer, setLayer] = useState<0 | 1 | 2>(0);

  return (
    <motion.section 
      id="chess"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 premium-card p-0 flex flex-col min-h-[70vh] md:min-h-[800px] border border-ink/10 dark:border-base/10 bg-[#050505] text-white overflow-hidden relative"
    >
      {/* Top Header */}
      <div className="relative z-50 p-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
           <h2 className="font-headline font-black text-xl md:text-2xl uppercase tracking-widest text-white/90">
             Strategic Foundations
           </h2>
           
           <div className="hidden lg:flex gap-2 ml-8 bg-white/5 p-1 rounded-full border border-white/5 shadow-inner">
             {[
               { id: 0, label: '01. Philosophy Map' },
               { id: 1, label: '02. Archetypes' },
               { id: 2, label: '03. Meditation' }
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setLayer(tab.id as 0 | 1 | 2)}
                 className={cn(
                   "px-4 py-1.5 rounded-full font-mono text-[9px] uppercase font-bold tracking-widest transition-all", 
                   layer === tab.id ? "bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]" : "text-white/40 hover:bg-white/10 hover:text-white"
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
          className="flex items-center gap-2 px-4 py-2 bg-white/5 text-[10px] font-mono uppercase font-bold tracking-widest rounded-full hover:bg-white/10 transition-colors border border-white/10 text-[#d4af37]"
        >
          DestinyRocky <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="relative flex-1 bg-[#0a0a0a]">
        <AnimatePresence mode="wait">
          {layer === 0 && (
            <motion.div key="layer0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
               <ThoughtStarMap />
            </motion.div>
          )}
          {layer === 1 && (
            <motion.div key="layer1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
               <CharacterTheater onComplete={() => setLayer(2)} />
            </motion.div>
          )}
          {layer === 2 && (
            <motion.div key="layer2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
               <InfiniteChessboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Override */}
      <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10">
        {[0, 1, 2].map(id => (
            <button 
              key={id}
              onClick={() => setLayer(id as 0 | 1 | 2)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
               layer === id ? "bg-[#d4af37]" : "bg-white/20"
              )}
            />
        ))}
      </div>
    </motion.section>
  );
}
