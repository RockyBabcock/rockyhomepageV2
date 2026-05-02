import React, { useEffect, useRef } from "react";

interface RainOverlayProps {
  active: boolean;
  intensity?: "light" | "medium" | "heavy";
}

export const RainOverlay: React.FC<RainOverlayProps> = ({
  active,
  intensity = "medium",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let dropCount = 100;
    if (intensity === "light") dropCount = 30;
    if (intensity === "heavy") dropCount = 300;

    const drops: {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }[] = [];
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 15,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.2, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= drop.speed * 0.2;

        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, intensity]);

  if (!active) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
      />
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/80 backdrop-blur-[2px]" />
    </>
  );
};
