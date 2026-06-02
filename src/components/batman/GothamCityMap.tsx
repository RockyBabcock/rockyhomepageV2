import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { batmanEras } from "./data/batmanEras";
import { SystemStatusBar } from "./SystemStatusBar";

export function GothamCityMap({
  onOpenEra,
}: {
  onOpenEra: (id: string) => void;
}) {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const currentEra = batmanEras[activeEraIndex];

  // Derive dominant theme color for the era
  const themeColor = currentEra.colors?.[0] || "#333";
  const accentColor = currentEra.colors?.[1] || "#d4af37";

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#020202] text-white font-mono flex items-center justify-center">
      <SystemStatusBar />

      {/* Grid and Base Map Elements */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Map Parallax Layers */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        animate={{
          scale: 1 + activeEraIndex * 0.05,
          filter: `hue-rotate(${activeEraIndex * 20}deg) saturate(${1 + activeEraIndex * 0.2}) brightness(${1 - activeEraIndex * 0.05})`,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Mock Map Shapes representing buildings */}
        <div className="absolute -top-1/4 left-1/4 w-[800px] h-[600px] opacity-20 blur-[2px]">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-white/20 fill-none"
            preserveAspectRatio="none"
          >
            {/* Building outlines that change stylistically */}
            <path
              d="M 20 50 L 20 20 L 30 20 L 30 50 Z"
              stroke={themeColor}
              strokeWidth="0.5"
              fill={themeColor}
              fillOpacity="0.1"
            />
            <path
              d="M 40 50 L 40 10 L 50 15 L 50 50 Z"
              stroke={themeColor}
              strokeWidth="0.5"
              fill={themeColor}
              fillOpacity="0.1"
            />
            <path
              d="M 60 50 L 60 25 L 75 25 L 75 50 Z"
              stroke={themeColor}
              strokeWidth="0.5"
              fill={themeColor}
              fillOpacity="0.1"
            />
            {/* River */}
            <path
              d="M 0 60 Q 50 70 100 60"
              stroke={accentColor}
              strokeWidth="0.5"
              strokeOpacity="0.3"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>

      <div className="absolute top-8 left-8 z-50">
        <span
          className="text-[10px] uppercase tracking-[0.3em] border-b pb-1"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          Gotham City Historical Map
        </span>
        <h2
          className="text-2xl md:text-4xl font-black font-headline uppercase mt-2 tracking-widest"
          style={{ color: themeColor }}
        >
          {currentEra.name}
        </h2>
        <span className="text-xs text-white/50 block mt-1">
          {currentEra.timeRange}
        </span>
      </div>

      {/* Map Nodes Overview */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Draw connecting lines between discovered locations? 
             Just show nodes and highlight active */}
        {batmanEras.map((era, i) => {
          if (!era.location) return null;
          const isActive = i === activeEraIndex;
          return (
            <motion.div
              key={era.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-opacity duration-1000`}
              style={{
                left: `${era.location.x}%`,
                top: `${era.location.y}%`,
                opacity: isActive || i < activeEraIndex ? 1 : 0.2, // show past and present
              }}
              animate={{
                scale: isActive ? 1 : 0.8,
                zIndex: isActive ? 50 : 20,
              }}
            >
              {/* Node Marker */}
              <div
                onClick={() => setActiveEraIndex(i)}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer relative group"
                style={{
                  border: `1px solid ${isActive ? accentColor : "rgba(255,255,255,0.2)"}`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isActive ? accentColor : "white" }}
                />
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-50"
                    style={{ border: `1px solid ${accentColor}` }}
                  />
                )}

                {/* Hover label for non-active */}
                {!isActive && (
                  <div className="absolute top-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[8px] uppercase tracking-widest bg-black px-2 py-1 border border-white/20">
                    {era.location.name}
                  </div>
                )}
              </div>

              {/* Case Card Pop-up for Active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border p-4 min-w-[240px] shadow-2xl pointer-events-auto"
                    style={{ borderColor: `${accentColor}50` }}
                  >
                    <span
                      className="text-[8px] uppercase tracking-widest block mb-1"
                      style={{ color: accentColor }}
                    >
                      Detected Anomaly
                    </span>
                    <h3
                      className="font-headline uppercase font-bold"
                      style={{ color: "white" }}
                    >
                      {era.location.name}
                    </h3>
                    <p
                      className="text-xs text-white/50 mt-2 leading-relaxed border-l-2 pl-2"
                      style={{ borderColor: themeColor }}
                    >
                      {era.location.description}
                    </p>
                    <button
                      onClick={() => onOpenEra(era.id)}
                      className="mt-4 px-4 py-2 w-full transition-all text-[10px] uppercase tracking-widest font-bold group"
                      style={{
                        backgroundColor: `${themeColor}20`,
                        border: `1px solid ${themeColor}`,
                        color: themeColor,
                      }}
                    >
                      <span className="group-hover:text-white transition-colors">
                        Access Archives
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline Slider / Progress */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
        <div className="relative h-px bg-white/20 flex items-center">
          {/* Active segment line */}
          <motion.div
            className="absolute left-0 h-px"
            style={{ backgroundColor: accentColor }}
            animate={{
              width: `${(activeEraIndex / (batmanEras.length - 1)) * 100}%`,
            }}
          />

          {batmanEras.map((era, i) => {
            const leftPos = `${(i / (batmanEras.length - 1)) * 100}%`;
            const isActive = i === activeEraIndex;
            const isPast = i <= activeEraIndex;
            return (
              <div
                key={era.id}
                className="absolute transform -translate-x-1/2 cursor-pointer group"
                style={{ left: leftPos }}
              >
                <div
                  onClick={() => setActiveEraIndex(i)}
                  className="w-3 h-3 rounded-full transition-all flex items-center justify-center bg-black"
                  style={{
                    border: `1px solid ${isPast ? accentColor : "rgba(255,255,255,0.2)"}`,
                  }}
                >
                  {(isActive || isPast) && (
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  )}
                </div>
                <div
                  className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-widest transition-colors
                    ${isActive ? "font-bold" : "text-white/30 hidden md:block group-hover:text-white/80"}`}
                  style={{ color: isActive ? accentColor : undefined }}
                >
                  {era.timeRange.split("-")[0].trim()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
