import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import {
  Play,
  Disc3,
  Info,
  ExternalLink,
  X,
  Gamepad2,
  Music,
  ShieldAlert,
  AlertCircle,
} from "lucide-react";
import { StatusPill } from "./StatusPill";
import { MuseumCard } from "./common/MuseumCard";

// --- Data ---
const musicData = [
  {
    id: "eminem",
    artist: "Eminem",
    bio: "The GOAT of rap. Slim Shady never fades.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
    quotes: [
      "Look, if you had one shot...",
      "Success is my only option, failure's not.",
      "I am whatever you say I am.",
    ],
    track: "Lose Yourself - Eminem",
    spotifyUrl: "https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR",
  },
  {
    id: "crowdlu",
    artist: "Crowd Lu",
    bio: "Taiwan's greatest storyteller; every song feels like a conversation.",
    image:
      "https://images.unsplash.com/photo-1516280440502-65f536c97646?q=80&w=500&auto=format&fit=crop",
    quotes: [
      "In your life, perhaps I am merely a fleeting spark...",
      "OH YEAH!",
      "A hundred ways to live.",
    ],
    track: "100 Ways of Living - Crowd Lu",
    spotifyUrl: "https://open.spotify.com/artist/1r4hJ1h58CWwXzzKmQ0vnA",
  },
  {
    id: "leehom",
    artist: "Leehom Wang",
    bio: "The King of Mandopop; his vocals and songwriting are always top-notch.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=500&auto=format&fit=crop",
    quotes: [
      "Loving you is loving myself.",
      "You are the one and only.",
      "Forever love.",
    ],
    track: "Forever Love - Leehom Wang",
    spotifyUrl: "https://open.spotify.com/artist/2FocnKUzXz2bWzB1X8nB1i",
  },
];

const gameData = [
  {
    id: "acunity",
    rank: "No. 1",
    title: "Assassin’s Creed Unity",
    subtitle: "The World’s Best Game · Personal Favorite #1",
    recommendation:
      "Transforming the French Revolution and Notre Dame into an epic open world.",
    details:
      "Despite its rocky launch, AC Unity remains the pinnacle of parkour and dense urban stealth in the franchise. The recreation of Paris is breathtaking.",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop",
    hoverEffect: "animus",
    trailerUrl: "https://www.youtube.com/watch?v=xzCEdSKMkdU",
  },
  {
    id: "cyberpunk",
    rank: "No. 2",
    title: "Cyberpunk 2077",
    subtitle: "Runner-Up · An Immersive Cyberpunk Masterpiece",
    recommendation:
      "The story, music, and freedom of choice are off the charts.",
    details:
      "Night City is a character of its own. With the Phantom Liberty expansion, this game solidified its place as one of the greatest RPGs of the decade.",
    image:
      "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop",
    hoverEffect: "cyberpunk",
    trailerUrl: "https://www.youtube.com/watch?v=8X2kIfS6fb8",
  },
  {
    id: "balatro",
    rank: "No. 3",
    title: "Balatro",
    subtitle: "Third Place · An Addictive Poker Roguelike",
    recommendation:
      "Looks simple, but you won't stop playing—strategic depth is off the charts.",
    details:
      "A deck-building roguelike that turns poker into a mesmerizing, combo-driven addiction. The joker synergies are endless.",
    image:
      "https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=800&auto=format&fit=crop",
    hoverEffect: "balatro",
    trailerUrl: "https://www.youtube.com/watch?v=11111111111",
  },
];

// --- Subcomponents ---

const AnimusGlitch = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
    <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay" />
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-green-400/60 w-full"
        style={{ top: `${Math.random() * 100}%` }}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 0.5 + 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
    <div className="absolute top-4 right-4 text-[10px] font-mono text-green-400 animate-pulse font-bold tracking-widest">
      SYNC: 98%
    </div>
  </div>
);

const NeonDataStreams = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,255,255,0.2)] border border-cyan-500/30 rounded-3xl" />
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px]"
        style={{ left: `${Math.random() * 100}%`, height: "60%" }}
        animate={{
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: Math.random() * 1 + 0.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

const PokerParticles = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-6 h-8 border border-red-500/50 bg-white/5 rounded-sm flex items-center justify-center text-[10px] text-red-500 font-bold backdrop-blur-sm"
        initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.5 }}
        animate={{
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          rotate: Math.random() * 360,
          opacity: 0,
          scale: 1.5,
        }}
        transition={{
          duration: Math.random() * 0.5 + 0.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        {["♠", "♥", "♦", "♣"][Math.floor(Math.random() * 4)]}
      </motion.div>
    ))}
  </div>
);

const MusicCard: React.FC<{ data: any; onPlay: (track: string) => void }> = ({
  data,
  onPlay,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % data.quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [data.quotes.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    }
  };

  return (
    <div
      className="relative mb-4 perspective-1000 h-32"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Vinyl Record */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-8 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#111] border-4 border-[#222] shadow-2xl flex items-center justify-center overflow-hidden z-0"
        initial={{ x: 0, rotate: 0 }}
        animate={{
          x: isHovered ? 60 : 0,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          x: { duration: 0.5, ease: "easeOut" },
          rotate: { duration: 1.8, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="absolute inset-1 rounded-full border border-white/5" />
        <div className="absolute inset-3 rounded-full border border-white/5" />
        <div className="absolute inset-5 rounded-full border border-white/5" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-black flex items-center justify-center shadow-inner">
          <div className="w-2 h-2 rounded-full bg-black" />
        </div>
      </motion.div>

      {/* Card Content */}
      <div
        ref={cardRef}
        className="relative z-10 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center gap-4 shadow-2xl transform-style-3d h-full"
      >
        <img
          src={data.image}
          alt={data.artist}
          className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover grayscale contrast-125 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider truncate">
            {data.artist}
          </h4>
          <p className="text-[10px] md:text-xs text-white/60 mt-1 line-clamp-2 leading-tight">
            {data.bio}
          </p>

          {/* Quote Ticker */}
          <div className="mt-2 overflow-hidden h-4 relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[10px] text-cyan-400 font-mono absolute inset-0 truncate"
              >
                "{data.quotes[quoteIdx]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => {
            window.open(data.spotifyUrl, "_blank");
            onPlay(data.track);
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-black transition-colors shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
        >
          <Play size={18} className="ml-1" fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

const GameCard: React.FC<{
  data: any;
  onClick: () => void;
  globalGlitch: boolean;
}> = ({ data, onClick, globalGlitch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const showEffect = isHovered || globalGlitch;

  return (
    <div
      className="relative mb-4 rounded-3xl overflow-hidden cursor-pointer group border border-white/10 bg-black h-32 md:h-40 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
      </div>

      {/* Hover Effects Container */}
      {showEffect && data.hoverEffect === "animus" && <AnimusGlitch />}
      {showEffect && data.hoverEffect === "cyberpunk" && <NeonDataStreams />}
      {showEffect && data.hoverEffect === "balatro" && <PokerParticles />}

      <div className="relative z-20 p-4 md:p-6 flex flex-col h-full justify-end bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="text-[10px] font-mono text-primary mb-1 tracking-widest uppercase">
          {data.rank}
        </div>
        <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none mb-1">
          {data.title}
        </h4>
        <p className="text-xs md:text-sm text-white/80 font-medium mb-1 truncate">
          {data.subtitle}
        </p>
        <p className="text-[10px] text-white/50 line-clamp-1">
          {data.recommendation}
        </p>
      </div>
    </div>
  );
};

const NowPlayingOverlay = ({
  track,
  onClose,
}: {
  track: string | null;
  onClose: () => void;
}) => {
  if (!track) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed top-24 right-4 md:right-8 z-50 bg-black/90 border border-white/10 rounded-3xl p-4 shadow-2xl backdrop-blur-xl flex items-center gap-4 w-72 md:w-80"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
      <motion.div
        className="w-12 h-12 rounded-full bg-[#111] border-2 border-[#333] flex items-center justify-center shrink-0 shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] text-cyan-400 font-mono mb-1 uppercase tracking-wider">
          Opening Rocky's Realm... 🎧
        </p>
        <p className="text-sm font-bold text-white truncate">{track}</p>
        <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 30, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const GameModal = ({ game, onClose }: { game: any; onClose: () => void }) => {
  if (!game) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="h-48 md:h-64 relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          {game.hoverEffect === "animus" && <AnimusGlitch />}
          {game.hoverEffect === "cyberpunk" && <NeonDataStreams />}
          {game.hoverEffect === "balatro" && <PokerParticles />}
        </div>
        <div className="p-6 md:p-8 relative z-10 -mt-10">
          <div className="text-xs font-mono text-primary mb-2 tracking-widest uppercase bg-black/50 inline-block px-2 py-1 rounded backdrop-blur-sm">
            {game.rank}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2 leading-none">
            {game.title}
          </h2>
          <p className="text-base md:text-lg text-white/80 font-medium mb-6">
            {game.subtitle}
          </p>

          <div className="space-y-4 text-white/60 text-sm leading-relaxed mb-8">
            <p className="font-bold text-white/90">{game.recommendation}</p>
            <p>{game.details}</p>
          </div>

          <button
            onClick={() => window.open(game.trailerUrl, "_blank")}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors w-full md:w-auto justify-center"
          >
            <Play size={18} fill="currentColor" />
            Watch Trailer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export function GameMediaModule() {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<any | null>(null);

  // Easter Egg States
  const [eminemMode, setEminemMode] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [noteRain, setNoteRain] = useState(false);
  const [eagleClicks, setEagleClicks] = useState(0);
  const [vinylClicks, setVinylClicks] = useState(0);

  // Keyboard Easter Egg
  useEffect(() => {
    let typed = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > 6) typed = typed.slice(-6);
      if (typed === "eminem") {
        setEminemMode(true);
        setTimeout(() => setEminemMode(false), 5000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click Easter Eggs
  useEffect(() => {
    if (eagleClicks >= 3) {
      setGlobalGlitch(true);
      setTimeout(() => {
        setGlobalGlitch(false);
        setEagleClicks(0);
      }, 5000);
    }
  }, [eagleClicks]);

  useEffect(() => {
    if (vinylClicks >= 5) {
      setNoteRain(true);
      setTimeout(() => {
        setNoteRain(false);
        setVinylClicks(0);
      }, 5000);
    }
  }, [vinylClicks]);

  return (
    <div
      id="GameMedia"
      className="col-span-12 h-full flex flex-col"
    >
      <MuseumCard className={`!p-0 !bg-[#0b0c10] overflow-hidden relative h-full flex flex-col rounded-3xl ${eminemMode ? "animate-pulse bg-red-900/20" : ""}`}>
      {/* Global Easter Egg Effects */}
      {eminemMode && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent mix-blend-overlay" />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-[200%] bg-white/10 blur-2xl transform -rotate-45"
              style={{ left: `${i * 25}%`, top: "-50%" }}
              animate={{ opacity: [0, 1, 0], x: [-100, 100] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      {noteRain && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold px-4 py-2 rounded-full text-sm animate-bounce">
            MEDIA LEVEL UP! 🎵🎮
          </div>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary text-xl"
              style={{ left: `${Math.random() * 100}%`, top: -20 }}
              animate={{ y: "120vh", rotate: Math.random() * 360 }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {["♪", "♫", "♩", "♬"][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Top Hero Section */}
      <div className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            DESTINYROCKY’S MEDIA UNIVERSE
            <Disc3
              className="w-6 h-6 text-primary cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setVinylClicks((prev) => prev + 1)}
            />
          </h2>
          <p className="text-sm text-white/60 font-mono mt-1">
            Music that hits hard • Games that change everything
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <StatusPill status="Personal Archive" />
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">
              Currently Rotating: Eminem × AC Unity
            </span>
          </div>
        </div>
      </div>

      {/* Evidence Block */}
      <div className="relative z-10 p-6 flex flex-col lg:flex-row gap-6 bg-black/60 border-b border-white/10">
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
            What I built
          </h4>
          <p className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            A cultural archive capturing the creative media that influences my
            taste and design philosophy.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
            What I learned
          </h4>
          <p className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            Personal context creates stronger emotional resonance than just
            listing professional achievements.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold mb-1">
            What's next
          </h4>
          <div className="text-sm text-white/80 leading-relaxed bg-[#111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5 flex items-start gap-2">
            <AlertCircle
              size={14}
              className="mt-0.5 text-primary/70 shrink-0"
            />
            <span>
              Connect to Spotify/Steam APIs to show true live metrics and recent
              activity.
            </span>
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row relative z-10">
        {/* Section 1: Music Hall (45% width on desktop) */}
        <div className="w-full lg:w-[45%] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br from-black to-[#0a0a0a]">
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-5 h-5 text-primary" />
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white/80">
              Music Hall
            </h3>
          </div>

          <div className="flex flex-col">
            {musicData.map((data) => (
              <MusicCard key={data.id} data={data} onPlay={setPlayingTrack} />
            ))}
          </div>
        </div>

        {/* Section 2: Game Vault (55% width on desktop) */}
        <div className="w-full lg:w-[55%] p-6 md:p-8 bg-gradient-to-bl from-[#0a0a0a] to-black">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white/80">
                Game Vault
              </h3>
            </div>
            {/* Eagle Emblem Easter Egg Trigger */}
            <ShieldAlert
              className="w-5 h-5 text-white/20 hover:text-white/50 cursor-pointer transition-colors"
              onClick={() => setEagleClicks((prev) => prev + 1)}
            />
          </div>

          <div className="flex flex-col">
            {gameData.map((data) => (
              <GameCard
                key={data.id}
                data={data}
                onClick={() => setSelectedGame(data)}
                globalGlitch={globalGlitch}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlays & Modals */}
      <AnimatePresence>
        {playingTrack && (
          <NowPlayingOverlay
            track={playingTrack}
            onClose={() => setPlayingTrack(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGame && (
          <GameModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
      </MuseumCard>
    </div>
  );
}
