import React, { useState } from "react";
import { motion } from "motion/react";
import { TechItem, categoryColors } from "../data/techStack";
import { TechIcon } from "./TechIcon";

interface GridStackProps {
  temperature: number;
  onIconClick: (item: TechItem) => void;
  techData: TechItem[];
}

export const GridStack: React.FC<GridStackProps> = ({
  temperature,
  onIconClick,
  techData,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-3xl">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scanning Line Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-0 pointer-events-none"
        animate={{ y: ["0%", "60000%"] }} // 600px height * 100
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      <div className="w-full h-full overflow-y-auto p-4 sm:p-6 custom-scrollbar relative z-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 place-items-center">
          {techData.map((item) => {
            const isHovered = hoveredItem === item.id;

            // Vibration effect for high temperature
            const vibrationX =
              temperature > 80 && !isHovered ? (Math.random() - 0.5) * 10 : 0;
            const vibrationY =
              temperature > 80 && !isHovered ? (Math.random() - 0.5) * 10 : 0;

            return (
              <motion.div
                key={item.id}
                className="relative flex flex-col items-center justify-center"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                animate={{
                  x: vibrationX,
                  y: vibrationY,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <TechIcon
                  item={item}
                  temperature={temperature}
                  onClick={() => onIconClick(item)}
                  mode="grid"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
