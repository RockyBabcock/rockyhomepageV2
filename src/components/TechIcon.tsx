import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TechItem, categoryColors } from "../data/techStack";

interface TechIconProps {
  item: TechItem;
  temperature: number;
  onClick?: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
  mode?: "physics" | "orbital" | "grid";
}

export const TechIcon: React.FC<TechIconProps> = ({
  item,
  temperature,
  onClick,
  onHoverStart,
  onHoverEnd,
  className = "",
  style = {},
  mode = "grid",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  // Hierarchy Styles
  let scale = 1;
  let borderColor = "border-gray-400";
  let opacity = 1;

  if (item.level === "core") {
    scale = 1.5;
    borderColor = "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]"; // Gold
  } else if (item.level === "proficient") {
    scale = 1;
    borderColor = "border-slate-300"; // Silver
  } else if (item.level === "exploration") {
    scale = 0.8;
    borderColor = "border-gray-500"; // Gray
    opacity = 0.7;
  }

  // Temperature Effects
  // 0 -> 50: Grayscale to Color
  const grayscale = temperature < 50 ? 100 - temperature * 2 : 0;

  // 50 -> 100: Pulsating Glow
  const glowIntensity = temperature > 50 ? (temperature - 50) / 50 : 0;
  const glowShadow =
    glowIntensity > 0
      ? `0 0 ${10 + glowIntensity * 20}px ${5 + glowIntensity * 10}px rgba(255, 68, 68, ${glowIntensity * 0.6})`
      : "none";

  // Base 3D Tilt
  const tiltTransform = "perspective(500px) rotateX(5deg) rotateY(-5deg)";

  // Mode Specific Hover Effects
  let hoverTransform = tiltTransform;
  if (isHovered) {
    if (mode === "physics") {
      hoverTransform = `${tiltTransform} translateY(-10px)`;
    } else if (mode === "orbital") {
      // Cursor-facing rotation
      hoverTransform = `perspective(500px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) scale(1.1)`;
    } else if (mode === "grid") {
      // 3D flip
      hoverTransform = `perspective(500px) rotateY(180deg)`;
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode !== "orbital" || !iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x / 2, y: -y / 2 }); // Adjust sensitivity
  };

  return (
    <motion.div
      ref={iconRef}
      className={`relative rounded-3xl flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border-2 ${borderColor} cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: 80 * scale,
        height: 80 * scale,
        opacity: isHovered ? 1 : opacity,
        filter: `grayscale(${grayscale}%)`,
        boxShadow:
          isHovered && mode === "physics"
            ? `0 20px 25px -5px rgba(0, 0, 0, 0.5), ${glowShadow}`
            : glowShadow,
        transform: hoverTransform,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
        onHoverEnd?.();
      }}
      onMouseMove={handleMouseMove}
      whileHover={{ zIndex: 50 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-ink text-white text-xs p-3 rounded-2xl shadow-xl z-[100] pointer-events-none"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="font-bold mb-1 flex items-center gap-2">
              {item.name}
              <span className="px-1.5 py-0.5 rounded-full text-[8px] uppercase tracking-wider bg-white/20">
                {item.level}
              </span>
            </div>
            <p className="text-white/70 leading-tight mb-2">
              {item.description}
            </p>
            {item.projects.length > 0 && (
              <div className="text-[9px] text-primary font-bold">
                Project: {item.projects[0].name}
              </div>
            )}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Front Side */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center backface-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div
          className="mb-1 transition-colors duration-300"
          style={{ color: isHovered ? (categoryColors[item.category]?.pri || "white") : "white" }}
        >
          {item.icon ? React.cloneElement(item.icon as React.ReactElement<any>, {
            size: 24 * scale,
          }) : null}
        </div>
        <span className="text-white font-mono text-[10px] font-bold text-center px-1 truncate w-full">
          {item.name}
        </span>
      </div>

      {/* Back Side (Grid Mode Flip) */}
      {mode === "grid" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-ink text-white rounded-3xl backface-hidden p-2"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-[8px] font-mono text-white/70 mb-1">
            Proficiency
          </span>

          {/* Simple Radar Chart SVG */}
          <div className="w-full flex-1 relative flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
            >
              {/* Background Grid */}
              <polygon
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="50,30 70,40 70,60 50,70 30,60 30,40"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />

              {/* Axes */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="10"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="50"
                x2="90"
                y2="30"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="50"
                x2="90"
                y2="70"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="90"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="50"
                x2="10"
                y2="70"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="50"
                x2="10"
                y2="30"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />

              {/* Data Polygon */}
              <polygon
                points={`
                  50,${50 - (item.proficiency / 10) * 40} 
                  ${50 + (Math.min(10, item.proficiency + 1) / 10) * 40 * 0.866},${50 - (Math.min(10, item.proficiency + 1) / 10) * 40 * 0.5} 
                  ${50 + (Math.max(1, item.proficiency - 1) / 10) * 40 * 0.866},${50 + (Math.max(1, item.proficiency - 1) / 10) * 40 * 0.5} 
                  50,${50 + (item.proficiency / 10) * 40} 
                  ${50 - (Math.min(10, item.proficiency + 2) / 10) * 40 * 0.866},${50 + (Math.min(10, item.proficiency + 2) / 10) * 40 * 0.5} 
                  ${50 - (Math.max(1, item.proficiency - 2) / 10) * 40 * 0.866},${50 - (Math.max(1, item.proficiency - 2) / 10) * 40 * 0.5}
                `}
                fill="rgba(0, 178, 169, 0.4)"
                stroke="#00B2A9"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <span className="text-[10px] font-bold mt-1">
            {item.proficiency}/10
          </span>
        </div>
      )}
    </motion.div>
  );
};
