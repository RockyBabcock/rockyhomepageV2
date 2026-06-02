import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, ShieldAlert } from "lucide-react";

type DecryptionLevel = "PUBLIC" | "CONFIDENTIAL" | "TOP_SECRET" | "CLASSIFIED";

export function DynamicDecryption({
  text,
  level,
  puzzleContext,
  onUnlock,
}: {
  text: string;
  level: DecryptionLevel;
  puzzleContext?: { question: string; answer: string };
  onUnlock?: () => void;
}) {
  const [unlocked, setUnlocked] = useState(level === "PUBLIC");
  const [attempt, setAttempt] = useState("");
  const [garbled, setGarbled] = useState("");
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    if (level === "TOP_SECRET" && !unlocked) {
      const interval = setInterval(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#*&%";
        let g = "";
        for (let i = 0; i < text.length; i++) {
          // preserve spaces
          if (text[i] === " ") {
            g += " ";
          } else {
            g += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        }
        setGarbled(g);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [level, unlocked, text]);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (
      puzzleContext &&
      attempt.toLowerCase() === puzzleContext.answer.toLowerCase()
    ) {
      setUnlocked(true);
      setShowPuzzle(false);
      if (onUnlock) onUnlock();
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  if (level === "PUBLIC" || unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative group"
      >
        <span className="text-white/90">{text}</span>
      </motion.div>
    );
  }

  if (level === "CLASSIFIED") {
    return (
      <span className="bg-red-900/50 text-red-500 font-mono text-xs px-2 py-1 mx-1 line-through cursor-not-allowed uppercase">
        [ DATA EXPUNGED ]
      </span>
    );
  }

  if (level === "CONFIDENTIAL") {
    return (
      <span
        onClick={() => setUnlocked(true)}
        className="relative inline-block mx-1 group cursor-pointer"
        title="Tap to declassify"
      >
        <motion.span
          className="bg-black text-black select-none pointer-events-none transition-colors"
          whileHover={{ x: [0, -2, 2, -2, 2, 0], backgroundColor: "#111" }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
        {/* Subtle hint text on hover */}
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <Unlock className="w-3 h-3 text-[#00ff41]" />
        </span>
      </span>
    );
  }

  // TOP_SECRET
  return (
    <span className="relative inline-block mx-1">
      {!showPuzzle ? (
        <span
          onClick={() => setShowPuzzle(true)}
          className="font-mono text-red-500 bg-red-900/20 px-1 cursor-pointer hover:bg-red-900/40 transition-colors"
          title="Encrypted. Tap to solve."
        >
          {garbled} <Lock className="inline w-3 h-3 ml-1 mb-1" />
        </span>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0, x: errorShake ? [-5, 5, -5, 5, 0] : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 -top-12 left-1/2 -translate-x-1/2 bg-black border border-red-500 p-3 shadow-2xl min-w-[250px]"
        >
          <div className="text-[10px] uppercase text-red-500 mb-2 flex items-center gap-2">
            <ShieldAlert className="w-3 h-3" /> SECURITY CLEARANCE REQUIRED
          </div>
          <div className="text-xs text-white/80 mb-3">
            {puzzleContext?.question || "ENTER OVERRIDE CODE"}
          </div>
          <form onSubmit={handleVerify} className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={attempt}
              onChange={(e) => setAttempt(e.target.value)}
              className="bg-transparent border-b border-red-500/50 text-white outline-none w-full text-xs placeholder:text-red-900"
              placeholder="Terminal Input..."
            />
            <button
              type="submit"
              className="text-[10px] bg-red-500 text-black px-2 hover:bg-white transition-colors"
            >
              VRY
            </button>
            <button
              type="button"
              onClick={() => setShowPuzzle(false)}
              className="text-[10px] border border-white/20 text-white/50 px-2 hover:bg-white/10 transition-colors"
            >
              X
            </button>
          </form>
        </motion.div>
      )}
    </span>
  );
}
