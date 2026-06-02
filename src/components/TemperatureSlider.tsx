import React from "react";
import { motion } from "motion/react";

interface TemperatureSliderProps {
  temperature: number;
  setTemperature: (temp: number) => void;
}

export const TemperatureSlider: React.FC<TemperatureSliderProps> = ({
  temperature,
  setTemperature,
}) => {
  const getStatusLabel = (temp: number) => {
    if (temp < 12.5) return "Deep Focus";
    if (temp < 37.5) return "Awakening";
    if (temp < 62.5) return "Normal State";
    if (temp < 87.5) return "Creative Chaos";
    return "Full Blast";
  };

  // Calculate glow based on temperature
  const glowIntensity = temperature / 100;
  const thumbGlow = `0 0 ${10 + glowIntensity * 20}px ${2 + glowIntensity * 10}px rgba(255, 68, 68, ${glowIntensity * 0.8})`;

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-xl">
      <div className="flex justify-between w-full mb-2">
        <span className="font-mono text-xs text-ink/80 font-bold uppercase tracking-wider">
          {getStatusLabel(temperature)}
        </span>
        <span className="font-mono text-xs text-ink/80 font-bold">
          {temperature}°
        </span>
      </div>

      <div className="relative w-full h-6 flex items-center">
        {/* Track */}
        <div
          className="absolute w-full h-2 rounded-full"
          style={{
            background: "linear-gradient(to right, #00B2A9, #C17A53, #FF4444)",
          }}
        />

        {/* Input Range */}
        <input
          type="range"
          min="0"
          max="100"
          value={temperature}
          onChange={(e) => setTemperature(parseInt(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Custom Thumb */}
        <div
          className="absolute h-8 w-8 bg-white rounded-full flex items-center justify-center pointer-events-none z-10 transition-shadow duration-200"
          style={{
            left: `calc(${temperature}% - 16px)`,
            boxShadow: thumbGlow,
            border: "2px solid #1b1c19",
          }}
        >
          <span className="text-[10px] font-bold text-ink font-mono">
            {temperature}
          </span>
        </div>
      </div>
    </div>
  );
};
