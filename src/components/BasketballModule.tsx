import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Trophy, X, Activity, Dices, CalendarDays, Sword, Bell, Star, Shield, Target, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

const SOUNDS = {
  swish: 'https://actions.google.com/sounds/v1/cartoon/cartoon_swoosh.ogg',
  cheer: 'https://actions.google.com/sounds/v1/crowds/crowd_cheer.ogg',
  dice: 'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'
};

const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.volume = 0.5;
  audio.play().catch(() => {});
};

const CAROUSEL_ITEMS = [
  "Current Mode: ALIEN INVASION 👽",
  "Weekly Highlight: 41 Pts + 18 Reb",
  "Defensive Monster: 3.1 BPG",
  "Rookie of the Year Lock 🔒"
];

const FIXTURES = [
  { opponent: "Nuggets", date: "Tomorrow", time: "8:00 PM EST", location: "Home" },
  { opponent: "Knicks", date: "Friday", time: "7:30 PM EST", location: "Away" },
  { opponent: "Warriors", date: "Sunday", time: "3:30 PM EST", location: "Home" }
];

const PREDICTIONS = [
  "Tonight you’re a lock-down defender. Estimated contribution: 8 hustle plays.",
  "Hot shooting night incoming. Contribution forecast: 21 points and one dramatic celebration.",
  "Bench energy legend mode activated. You carried the vibes. Team morale +25.",
  "You're hitting the game-winner from half court. Simulation confirmed.",
  "Foul trouble early, but you rally in the 4th with 4 clutch blocks."
];

const TEAM_STATS = { record: "58-18", standing: "2nd in the West", streak: "10W" };
const WEMBY_STATS = { ppg: 24.7, rpg: 11.5, apg: 3.0, bpg: 3.1, highlights: "Back-to-back 40+ point double-doubles, March Defensive Player of the Month honors." };

export function BasketballModule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [blockCount, setBlockCount] = useState(0);
  const [showBlockMessage, setShowBlockMessage] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [championshipMode, setChampionshipMode] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  
  // Predictor
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  
  // Cat State
  const [catState, setCatState] = useState<'calm' | 'excited' | 'shocked' | 'cheering'>('calm');

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks === 3 && !championshipMode) {
      setChampionshipMode(true);
      playSound(SOUNDS.cheer);
      setCatState('cheering');
      setTimeout(() => setCatState('calm'), 4000);
    }
  };

  const handleBallHover = () => {
    if (showBlockMessage) return;
    setBallPosition({ x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 60 });
    const newCount = blockCount + 1;
    setBlockCount(newCount);
    
    if (newCount === 3) setCatState('excited');
    
    if (newCount === 5) {
      setShowBlockMessage(true);
      setCatState('shocked');
      setTimeout(() => { setShowBlockMessage(false); setCatState('calm'); }, 4000);
      setBlockCount(0);
    }
  };

  const runPredictor = () => {
    setIsPredicting(true);
    setCatState('excited');
    playSound(SOUNDS.dice);
    setTimeout(() => {
      setPrediction(PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)]);
      setIsPredicting(false);
      setCatState('cheering');
      setTimeout(() => setCatState('calm'), 3000);
    }, 1500);
  };

  const openModal = () => {
    playSound(SOUNDS.swish);
    setIsModalOpen(true);
  };

  return (
    <motion.section 
      id="Basketball"
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "col-span-12 md:col-span-12 p-8 md:p-10 premium-card !bg-[#0b0c10] !text-[#c5c6c7] group flex flex-col min-h-[500px] transition-colors duration-1000",
        championshipMode 
          ? "!bg-gradient-to-br !from-[#000000] !via-[#1a1a1a] !to-[#d4af37] !border-[#d4af37]/50" 
          : "!bg-[#0b0c10] !border-[#C4CED4]/20"
      )}
      style={{ color: '#C4CED4' }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-[-20%] bg-cover bg-center opacity-10"
          style={{ y: backgroundY, backgroundImage: 'url(https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#C4CED4]/10" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#C4CED4]/10">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg border border-white/20 bg-gradient-to-br from-gray-200 to-gray-400 p-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg" alt="Spurs Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.1em] text-white" style={{ fontFamily: 'Impact, sans-serif' }}>
              SPURS LEGACY ZONE
            </h2>
            {championshipMode && <p className="text-[#d4af37] font-bold text-xs tracking-widest uppercase mt-1">Go Spurs Go! 🏆</p>}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-[#C4CED4]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#C4CED4]">{TEAM_STATS.record} · {TEAM_STATS.streak}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
        {/* Left Col: Interactive Visuals */}
        <div className="md:col-span-4 flex flex-col items-center justify-center gap-8 bg-black/40 border border-white/5 p-6 rounded-3xl relative">
          
          {/* Animated Cat expression */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-white/10">
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Status</span>
            <motion.div 
              className="text-xl"
              animate={
                catState === 'excited' ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } :
                catState === 'shocked' ? { scale: [1, 1.5, 1], y: [0, -10, 0] } :
                catState === 'cheering' ? { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.3 } } : 
                { scale: 1 }
              }
            >
              {catState === 'calm' ? '😼' : catState === 'excited' ? '🙀' : catState === 'shocked' ? '👀' : '😻'}
            </motion.div>
          </div>

          <div className="relative w-full max-w-[200px] aspect-[3/4] flex items-center justify-center mt-4">
            <motion.div className="absolute inset-0 bg-[#C4CED4]/10 blur-3xl rounded-full" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
            <motion.div
              className="relative z-20 w-full h-full cursor-pointer"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
            >
              <svg viewBox="0 0 100 150" className="w-full h-full fill-black stroke-[#C4CED4] stroke-[2]">
                <path d="M45 15 C45 10, 55 10, 55 15 C55 20, 45 20, 45 15 Z" /> 
                <path d="M40 25 L60 25 L75 60 L65 65 L55 40 L55 90 L65 140 L55 145 L45 95 L35 145 L25 140 L35 90 L35 40 L25 65 L15 60 Z" />
                <path d="M75 60 L90 20" strokeWidth="2.5" />
              </svg>

              <motion.div
                className="absolute top-[5%] right-[5%] w-8 h-8 bg-orange-500 rounded-full border-2 border-black flex items-center justify-center overflow-hidden z-30 cursor-crosshair"
                animate={{ x: ballPosition.x, y: ballPosition.y, rotate: 360 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onMouseEnter={handleBallHover}
                onClick={(e) => { e.stopPropagation(); openModal(); }}
              >
                <div className="absolute w-full h-px bg-black/60 rotate-45"></div>
                <div className="absolute w-full h-px bg-black/60 -rotate-45"></div>
                <div className="absolute w-full h-full border-2 border-black/60 rounded-full scale-150 -translate-x-1/2"></div>
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {showBlockMessage && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute z-50 bg-white text-black px-4 py-2 font-bold text-xs rounded shadow-2xl top-0">
                  Nice try! But Wemby is too tall.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button onClick={openModal} className="w-full py-3 border border-[#C4CED4]/20 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors">
            View Player Data
          </button>
        </div>

        {/* Right Col: Widgets */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Predictor Game */}
          <div className="md:col-span-2 bg-[#1a1a1a] border border-[#d4af37]/20 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline font-black text-xl text-white mb-1 flex items-center gap-2">
                  <Dices className="w-5 h-5 text-[#d4af37]" /> Contribution Predictor
                </h3>
                <p className="font-body text-xs text-white/50">Simulate your role in tonight's game</p>
              </div>
              <button 
                onClick={runPredictor}
                disabled={isPredicting}
                className="px-6 py-3 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white transition-colors disabled:opacity-50"
              >
                {isPredicting ? 'Simulating...' : 'Run Predictor'}
              </button>
            </div>
            
            <div className={cn("bg-black p-6 rounded-2xl border border-white/5 min-h-[100px] flex items-center justify-center transition-all", prediction && !isPredicting ? "border-[#d4af37]/50 bg-[#d4af37]/5" : "")}>
              <AnimatePresence mode="wait">
                {isPredicting ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-xs uppercase tracking-widest text-white/40 animate-pulse">
                    Crunching advanced analytics...
                  </motion.div>
                ) : prediction ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-headline font-bold text-lg md:text-xl text-white text-center italic">
                    "{prediction}"
                  </motion.div>
                ) : (
                  <motion.div key="idle" className="font-mono text-xs uppercase tracking-widest text-white/20">
                    Awaiting simulation...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Fixture Calendar */}
          <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="w-4 h-4 text-primary" />
              <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-white">Upcoming Fixtures</h3>
            </div>
            <div className="space-y-3">
              {FIXTURES.map((game, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <div className="font-bold text-white text-sm mb-0.5">vs {game.opponent}</div>
                    <div className="font-mono text-[9px] uppercase text-white/40">{game.date} · {game.time}</div>
                  </div>
                  <div className={cn("text-[10px] font-bold uppercase px-2 py-1 rounded", game.location === 'Home' ? "bg-white/10 text-white" : "bg-white/5 text-white/50")}>
                    {game.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Survival Game Teaser */}
          <div className="bg-[#111] border border-red-500/20 p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/10 blur-3xl"></div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sword className="w-4 h-4 text-red-500" />
                <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-white">Survival Game Mode</h3>
              </div>
              <p className="font-body text-xs text-white/60 mb-6">A brutalist Web3 mini-game currently in development. Will you survive the court?</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase text-red-400 font-bold">Status: Coming Soon</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                <Bell className="w-3 h-3" /> Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#111] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#C4CED4]/20 flex flex-col max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#C4CED4]/10 flex justify-between items-center bg-[#0a0a0a] rounded-t-3xl">
                <h3 className="font-headline font-black text-2xl text-white tracking-widest uppercase">Spurs Central</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-8 text-[#C4CED4]">
                <div className="bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-transparent border-l-4 border-[#d4af37] p-6 rounded-r-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="w-6 h-6 text-[#d4af37]" />
                    <h4 className="font-black text-xl text-[#d4af37] tracking-widest uppercase">MVP CANDIDATE #1</h4>
                  </div>
                  <div className="w-full h-2 bg-black/50 rounded-full mt-4 mb-2 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#d4af37]" />
                  </div>
                  <p className="font-body text-sm text-white/80 italic mt-4">“Wemby is making a full-throttle sprint toward becoming the youngest MVP in history—the Alien Era has arrived!”</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-label text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-white"><Target className="w-4 h-4" /> Wemby Stats</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'PPG', value: WEMBY_STATS.ppg },
                        { label: 'RPG', value: WEMBY_STATS.rpg },
                        { label: 'APG', value: WEMBY_STATS.apg },
                        { label: 'BPG', value: WEMBY_STATS.bpg }
                      ].map(stat => (
                        <div key={stat.label} className="bg-[#1a1a1a] p-4 rounded-3xl border border-white/5 text-center">
                          <span className="font-mono text-[10px] uppercase opacity-60 block mb-1">{stat.label}</span>
                          <span className="font-headline font-black text-2xl text-white">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] p-6 rounded-3xl border border-white/5 space-y-4">
                    <h4 className="font-label text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-white"><Activity className="w-4 h-4" /> Real-time Dashboard</h4>
                    <div className="h-[120px] flex items-end gap-2">
                      {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.1 }} className="flex-1 bg-white/10 hover:bg-white/20 rounded-t-sm" />
                      ))}
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 text-center">Recent performance index</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
