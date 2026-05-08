import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TIMELINE = [
  { name: 'Philidor', year: '1749' },
  { name: 'Morphy', year: '1857' },
  { name: 'Lasker', year: '1894' },
  { name: 'Capablanca', year: '1921' },
  { name: 'Alekhine', year: '1927' },
  { name: 'Botvinnik', year: '1948' },
  { name: 'Tal', year: '1960' },
  { name: 'Petrosian', year: '1963' },
  { name: 'Spassky', year: '1969' },
  { name: 'Fischer', year: '1972' },
  { name: 'Karpov', year: '1975' },
  { name: 'Kasparov', year: '1985' },
  { name: 'Kramnik', year: '2000' },
  { name: 'Anand', year: '2007' },
  { name: 'Carlsen', year: '2013' },
  { name: 'Ding', year: '2023' },
];

export function TemporalQuotesModule() {
  const [pascalHovered, setPascalHovered] = useState(false);
  const [rockyHovered, setRockyHovered] = useState(false);
  const [lineExpanded, setLineExpanded] = useState(false);

  return (
    <section 
      className="col-span-12 relative w-full overflow-hidden border-2 border-white/5"
      style={{ backgroundColor: '#3E2723' }}
    >
      {/* Background Grid (Chessboard Watermark) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      {/* Ambient warm brown haze */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(228,220,207,0.03)_0%,_transparent_70%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto p-8 md:p-16 lg:p-24 flex flex-col">
        
        {/* Pascal Quote (Mind) */}
        <div 
          className="relative flex flex-col md:flex-row items-center w-full min-h-[300px] mb-12 group"
          onMouseEnter={() => setPascalHovered(true)}
          onMouseLeave={() => setPascalHovered(false)}
        >
          <div className="flex-1 w-full flex flex-col items-start justify-center pr-8 z-20">
            <motion.div animate={{ x: pascalHovered ? 2 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <h3 className="font-headline font-black text-3xl md:text-5xl lg:text-6xl text-[#E4DCCF] group-hover:text-white transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(45,27,24,0.8)]">
                "Chess is the gymnasium of the mind."
              </h3>
              <p className="font-mono text-sm md:text-base text-white/50 mt-6 tracking-widest uppercase">
                — Blaise Pascal, 1688
              </p>
              <AnimatePresence>
                {pascalHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <p className="font-mono text-xs text-[#E4DCCF]/60 uppercase tracking-widest border-l-2 border-[#E4DCCF]/20 pl-4 py-1">
                      Pattern recognition. Long-term thinking. Discipline.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center pointer-events-none z-10">
            <span className="text-[12rem] md:text-[20rem] text-[#A89F91] opacity-10 drop-shadow-[0_10px_30px_rgba(45,27,24,0.5)] select-none">
              ♟
            </span>
          </div>
        </div>

        {/* Temporal Quote Line & Interactive Separator */}
        <div className="w-full relative flex flex-col items-center py-12 z-20">
          
          <div 
            className="w-full max-w-5xl cursor-pointer py-4 group"
            onClick={() => setLineExpanded(!lineExpanded)}
          >
            <motion.div 
              className="w-full h-px bg-white/10 group-hover:bg-[#E4DCCF]/40 transition-all duration-[800ms] shadow-[0_0_0_rgba(228,220,207,0)]"
              animate={{
                boxShadow: lineExpanded ? '0 0 20px rgba(228,220,207,0.3)' : '0 0 0 rgba(228,220,207,0)',
                backgroundColor: lineExpanded ? 'rgba(228,220,207,0.5)' : 'rgba(255,255,255,0.1)'
              }}
            />
          </div>

          <AnimatePresence>
            {lineExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
                className="overflow-hidden w-full max-w-3xl"
              >
                <div className="pt-8 pb-12 font-serif italic text-xl md:text-2xl text-[#E4DCCF]/90 text-center leading-relaxed drop-shadow-[0_2px_10px_rgba(45,27,24,0.8)]">
                  The opening is the architecture.<br/>
                  The middlegame is the trade-offs.<br/>
                  The endgame is when simplicity wins.<br/>
                  <span className="block mt-8 not-italic font-mono text-xs uppercase tracking-[0.2em] text-[#E4DCCF]/60">
                    Every move is a commit. Every capture is a deprecation.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline Wrapper */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-6 text-white/30 font-mono text-[9px] uppercase tracking-widest mt-8 px-4 w-full cursor-default select-none">
            {TIMELINE.map((t, i) => (
              <React.Fragment key={t.name}>
                <div className="relative flex items-center justify-center group/time">
                  <span className="group-hover/time:text-[#E4DCCF] transition-colors duration-300 pointer-events-auto">
                    {t.name}
                  </span>
                  <span className="opacity-0 group-hover/time:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 text-[#E4DCCF]/80 transition-opacity duration-300 text-[8px] whitespace-nowrap bg-[#3E2723] px-2 rounded-sm shadow-md">
                    {t.year}
                  </span>
                </div>
                {i < TIMELINE.length - 1 && (
                  <span className="mx-1 md:mx-2 opacity-30 text-[8px]">•</span>
                )}
              </React.Fragment>
            ))}
            <span className="ml-2 mt-1 md:mt-0 font-bold opacity-30 hover:opacity-100 transition-opacity whitespace-nowrap">
              World Chess Champion Timeline
            </span>
          </div>

        </div>

        {/* Rocky Quote (System) */}
        <div 
          className="relative flex flex-col md:flex-row-reverse items-center w-full min-h-[300px] mt-12 group"
          onMouseEnter={() => setRockyHovered(true)}
          onMouseLeave={() => setRockyHovered(false)}
        >
          <div className="flex-1 w-full flex flex-col items-start md:items-end justify-center pl-0 md:pl-8 z-20 md:text-right">
            <motion.div animate={{ x: rockyHovered ? -2 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <h3 className="font-headline font-black text-3xl md:text-5xl lg:text-6xl text-[#E4DCCF] group-hover:text-white transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(45,27,24,0.8)]">
                "The system is the gymnasium of the product."
              </h3>
              <p className="font-mono text-sm md:text-base text-white/50 mt-6 tracking-widest uppercase text-left md:text-right">
                — Rocky Babcock, 2024
              </p>
              <AnimatePresence>
                {rockyHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 flex justify-start md:justify-end"
                  >
                    <p className="font-mono text-xs text-[#E4DCCF]/60 uppercase tracking-widest border-l-2 md:border-l-0 md:border-r-2 border-[#E4DCCF]/20 pl-4 md:pl-0 md:pr-4 py-1 text-left md:text-right">
                      Design systems. Component architecture. Scalable decisions.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 flex items-center justify-center pointer-events-none z-10">
            <span className="font-mono text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white/10 opacity-10 font-black tracking-tighter drop-shadow-[0_10px_30px_rgba(45,27,24,0.5)] select-none leading-none">
              &lt;div class="system"&gt;
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
