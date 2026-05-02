import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert } from "lucide-react";

const script = [
  "BATCOMPUTER OPTICAL OS v7.3.2",
  "ESTABLISHING SECURE CONNECTION...",
  "WARNING: UNAUTHORIZED ACCESS IS A CLASS A FELONY",
  "INITIATING BIOMETRIC SCAN...",
  "[||||||||||] 100%",
  "BIOMETRICS MATCHED.",
  "CLEARANCE LEVEL: ARCHIVIST",
  "WELCOME, DETECTIVE.",
];

export function BatmanIntroTerminal({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < script.length) {
        setLines((prev) => [...prev, script[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsReady(true), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Allow clicking anywhere or pressing any key to skip once ready
  useEffect(() => {
    const handleAction = () => {
      if (isReady) onComplete();
    };
    window.addEventListener("keydown", handleAction);
    return () => window.removeEventListener("keydown", handleAction);
  }, [isReady, onComplete]);

  return (
    <div
      className="w-full h-full bg-black text-[#00ff41] p-12 flex flex-col justify-center cursor-pointer relative"
      onClick={() => {
        if (isReady) onComplete();
      }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />

      <div className="max-w-2xl mx-auto w-full z-20 space-y-2 text-sm sm:text-base md:text-lg">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2"
          >
            <span className="opacity-50">&gt;</span>
            <span
              dangerouslySetInnerHTML={{
                __html: (line || "")
                  .replace(
                    "WARNING:",
                    '<span class="text-red-500">WARNING:</span>',
                  )
                  .replace(
                    "WELCOME, DETECTIVE.",
                    '<span class="text-white font-bold text-xl uppercase tracking-widest mt-4 block">WELCOME, DETECTIVE.</span>',
                  ),
              }}
            />
          </motion.div>
        ))}
        {!isReady && (
          <div className="flex items-start gap-2 h-6">
            <span className="opacity-50">&gt;</span>
            <span
              className={`w-3 h-5 bg-[#00ff41] ${showCursor ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50"
          >
            <ShieldAlert className="w-8 h-8 text-[#00ff41] animate-pulse" />
            <span className="text-xs tracking-[0.3em] uppercase animate-pulse cursor-pointer hover:text-white transition-colors border border-white/20 px-6 py-2 rounded">
              [ PRESS ANY KEY OR CLICK TO ACCESS ARCHIVE ]
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
