import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TechItem, categoryColors } from "../data/techStack";
import { TechIcon } from "./TechIcon";

interface OrbitalStackProps {
  temperature: number;
  onIconClick: (item: TechItem) => void;
  techData: TechItem[];
}

export const OrbitalStack: React.FC<OrbitalStackProps> = ({
  temperature,
  onIconClick,
  techData,
}) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const coreItems = techData.filter((item) => item.level === "core");
  const outerItems = techData.filter((item) => item.level !== "core");

  // Base rotation speed
  const baseSpeed = temperature === 0 ? 0 : temperature / 50;

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (hoveredItem === null && temperature > 0) {
        // Random jitter if temperature is high
        const jitter = temperature > 80 ? (Math.random() - 0.5) * 2 : 0;
        setRotation(
          (prev) => prev + (0.05 * baseSpeed * deltaTime) / 16 + jitter,
        );
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hoveredItem, baseSpeed, temperature]);

  const renderRing = (items: TechItem[], radius: number, isInner: boolean) => {
    return items.map((item, index) => {
      const angle = (index / items.length) * 360;
      // Inner ring rotates opposite to outer ring
      const currentAngle = isInner ? angle + rotation : angle - rotation * 0.7;

      const rad = (currentAngle * Math.PI) / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;

      const isHovered = hoveredItem === item.id;
      const zIndex = isHovered ? 50 : 10;

      // Vibration effect for high temperature
      const vibrationX =
        temperature > 80 && !isHovered ? (Math.random() - 0.5) * 10 : 0;
      const vibrationY =
        temperature > 80 && !isHovered ? (Math.random() - 0.5) * 10 : 0;

      // When hovered, rotate to face cursor (we'll just reset rotation to 0 for simplicity, or keep it upright)
      const itemRotation = isHovered ? 0 : 0; // The icon itself is kept upright

      return (
        <motion.div
          key={item.id}
          className="absolute flex items-center justify-center rounded-full cursor-pointer"
          style={{
            x: `calc(50% + ${x + vibrationX}px - 40px)`, // 40px is half of base TechIcon width
            y: `calc(50% + ${y + vibrationY}px - 40px)`,
            zIndex,
          }}
          animate={{ rotate: itemRotation }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <TechIcon
            item={item}
            temperature={temperature}
            onClick={() => onIconClick(item)}
            mode="orbital"
          />
        </motion.div>
      );
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-3xl flex items-center justify-center">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Star Trails (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: 0.3 }}
      >
        <circle
          cx="50%"
          cy="50%"
          r="120"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle
          cx="50%"
          cy="50%"
          r="220"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Center Core */}
      <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-ink to-ink/80 shadow-2xl flex items-center justify-center z-20 border-2 border-white/10">
        <span className="text-white font-mono font-bold text-center leading-tight">
          Tech
          <br />
          Core
        </span>
      </div>

      {/* Rings */}
      <div className="absolute w-full h-full z-10">
        {renderRing(coreItems, 120, true)}
        {renderRing(outerItems, 220, false)}
      </div>
    </div>
  );
};
