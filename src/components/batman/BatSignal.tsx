import React from "react";
import { motion } from "motion/react";

interface BatSignalProps {
  active: boolean;
  onClick: () => void;
}

export const BatSignal: React.FC<BatSignalProps> = ({ active, onClick }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={onClick}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
          active
            ? "bg-[#C4A35A] shadow-[0_0_30px_rgba(196,163,90,0.8)]"
            : "bg-white/10 hover:bg-white/20 border border-white/20"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-8 h-8 ${active ? "fill-[#1A1A1B]" : "fill-white"}`}
        >
          {/* Simple Bat Logo SVG */}
          <path d="M 50 80 Q 40 60 10 50 Q 20 40 30 40 Q 25 30 40 35 Q 45 25 48 30 L 50 35 L 52 30 Q 55 25 60 35 Q 75 30 70 40 Q 80 40 90 50 Q 60 60 50 80 Z" />
        </svg>
      </motion.button>

      {/* Light Beam */}
      {active && (
        <div className="absolute bottom-full right-8 w-32 h-[800px] bg-gradient-to-t from-[#C4A35A]/40 to-transparent -rotate-45 origin-bottom pointer-events-none blur-xl" />
      )}
    </div>
  );
};
