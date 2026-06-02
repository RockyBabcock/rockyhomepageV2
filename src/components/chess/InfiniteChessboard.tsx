import React, { useEffect, useRef, useState } from "react";

export function InfiniteChessboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"flow" | "focus">("flow");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    // Piece definitions
    const types = ["pawn", "knight", "bishop", "rook", "queen", "king"];
    const typeSymbols: Record<string, string> = {
      pawn: "♙",
      knight: "♘",
      bishop: "♗",
      rook: "♖",
      queen: "♕",
      king: "♔",
    };

    interface Piece {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: string;
      size: number;
      color: string;
      alpha: number;
      targetX?: number;
      targetY?: number;
    }

    let pieces: Piece[] = [];

    const initPieces = () => {
      pieces = [];
      const numPieces = 40;
      for (let i = 0; i < numPieces; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        pieces.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          type,
          size:
            type === "king" || type === "queen" ? 30 : Math.random() * 10 + 15,
          color: type === "king" ? "212, 175, 55" : "255, 255, 255",
          alpha: type === "king" ? 0.8 : 0.3,
        });
      }
    };

    const resize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initPieces();
    };

    window.addEventListener("resize", resize);
    resize();

    let time = 0;
    let timeScale = 1;
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") timeScale = 4;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") timeScale = 1;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offsetX = (time * 0.2) % gridSize;
      const offsetY = (time * 0.2) % gridSize;

      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, height);
        ctx.stroke();
      }
      for (let y = -gridSize; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y + offsetY);
        ctx.stroke();
      }
    };

    const draw = () => {
      time += timeScale;
      // Fade effect for trails
      ctx.fillStyle =
        mode === "flow"
          ? `rgba(5, 5, 5, ${timeScale === 1 ? 0.3 : 0.05})`
          : "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, width, height);

      drawGrid();

      // Update and draw pieces
      pieces.forEach((p) => {
        if (mode === "flow") {
          // Time warp multiplier
          const tm = timeScale;

          if (p.type === "pawn") {
            p.y -= 0.5 * tm;
            p.x += (Math.random() - 0.5) * 0.5 * tm;
            if (p.y < 0) p.y = height;
          } else if (p.type === "knight") {
            if (Math.random() < 0.02 * tm) {
              p.targetX = p.x + (Math.random() > 0.5 ? 40 : -40);
              p.targetY = p.y + (Math.random() > 0.5 ? 80 : -80);
            }
            if (p.targetX && p.targetY) {
              p.x += (p.targetX - p.x) * 0.1 * tm;
              p.y += (p.targetY - p.y) * 0.1 * tm;
            } else {
              p.x += (Math.random() - 0.5) * 0.5 * tm;
              p.y += (Math.random() - 0.5) * 0.5 * tm;
            }
          } else if (p.type === "bishop") {
            p.x += p.vx * tm;
            p.y += p.vy * tm;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            if (Math.abs(p.vx) !== Math.abs(p.vy)) {
              p.vy = Math.sign(p.vy) * Math.abs(p.vx);
            }
          } else if (p.type === "rook") {
            if (Math.random() < 0.01 * tm) {
              if (Math.random() > 0.5) {
                p.vx = Math.random() > 0.5 ? 2 : -2;
                p.vy = 0;
              } else {
                p.vx = 0;
                p.vy = Math.random() > 0.5 ? 2 : -2;
              }
            }
            p.x += p.vx * tm;
            p.y += p.vy * tm;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
          } else if (p.type === "king" || p.type === "queen") {
            const centerX = width / 2;
            const centerY = height / 2;
            p.x +=
              (centerX - p.x) * 0.001 * tm + (Math.random() - 0.5) * 0.5 * tm;
            p.y +=
              (centerY - p.y) * 0.001 * tm + (Math.random() - 0.5) * 0.5 * tm;
          }

          // Mouse gravity
          if (mouseX !== null && mouseY !== null) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 40000) {
              p.x += dx * 0.002 * tm;
              p.y += dy * 0.002 * tm;
            }
          }
        } else if (mode === "focus") {
          // Move slowly to center and fade out unless king
          const centerX = width / 2;
          const centerY = height / 2;
          p.x += (centerX - p.x) * 0.05;
          p.y += (centerY - p.y) * 0.05;
          if (p.type !== "king") p.alpha = Math.max(0, p.alpha - 0.01);
        }

        // Keep bounds
        if (p.type !== "pawn" && p.type !== "bishop" && p.type !== "rook") {
          if (p.x < 0) p.x += width;
          if (p.x > width) p.x -= width;
          if (p.y < 0) p.y += height;
          if (p.y > height) p.y -= height;
        }

        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(typeSymbols[p.type], p.x, p.y);
      });

      // Connections between nearby pieces
      if (mode === "flow") {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < pieces.length; i++) {
          for (let j = i + 1; j < pieces.length; j++) {
            const dx = pieces[i].x - pieces[j].x;
            const dy = pieces[i].y - pieces[j].y;
            const dist = dx * dx + dy * dy;
            if (dist < 10000) {
              const opacity = (1 - dist / 10000) * 0.15;
              ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(pieces[i].x, pieces[i].y);
              ctx.lineTo(pieces[j].x, pieces[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-[#050505] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
      />

      <div className="absolute inset-x-0 bottom-12 flex justify-center z-10">
        <div className="flex bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 gap-2">
          <button
            onClick={() => setMode("flow")}
            className={`px-6 py-2 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all ${mode === "flow" ? "bg-[#d4af37] text-black" : "text-white/50 hover:bg-white/10"}`}
          >
            Stream of Consciousness
          </button>
          <button
            onClick={() => setMode("focus")}
            className={`px-6 py-2 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all ${mode === "focus" ? "bg-white text-black" : "text-white/50 hover:bg-white/10"}`}
          >
            Focus Paradigm
          </button>
        </div>
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full">
        <h2 className="font-headline font-black text-xl uppercase tracking-[0.2em] text-white opacity-80 mix-blend-overlay">
          The Infinite Board
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] opacity-60 mt-2">
          Emergent architecture through systemic movement
        </p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mt-4 animate-pulse">
          Hold [Space] to warp time
        </p>
      </div>
    </div>
  );
}
