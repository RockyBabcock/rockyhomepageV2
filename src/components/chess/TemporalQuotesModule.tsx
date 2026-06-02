import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TIMELINE = [
  { name: "Philidor", year: "1749" },
  { name: "Morphy", year: "1857" },
  { name: "Lasker", year: "1894" },
  { name: "Capablanca", year: "1921" },
  { name: "Alekhine", year: "1927" },
  { name: "Botvinnik", year: "1948" },
  { name: "Tal", year: "1960" },
  { name: "Petrosian", year: "1963" },
  { name: "Spassky", year: "1969" },
  { name: "Fischer", year: "1972" },
  { name: "Karpov", year: "1975" },
  { name: "Kasparov", year: "1985" },
  { name: "Kramnik", year: "2000" },
  { name: "Anand", year: "2007" },
  { name: "Carlsen", year: "2013" },
  { name: "Ding", year: "2023" },
];

const Star = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute w-4 h-4 text-[#D4AF37] z-10 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 0L12.5 10.5L24 12L12.5 13.5L12 24L11.5 13.5L0 12L11.5 10.5L12 0Z" />
      </motion.svg>
    </motion.div>
  );
};

export function TemporalQuotesModule() {
  const containerRef = useRef<HTMLElement>(null);
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [isPawnHovered, setIsPawnHovered] = useState(false);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  const [rockyHovered, setRockyHovered] = useState(false);
  const [lineExpanded, setLineExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouseX(x);
    setMouseY(y);
  };

  const haloX = 50 + (mouseX - 0.5) * 4;
  const haloY = 30 + (mouseY - 0.5) * 4;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="col-span-12 relative w-full overflow-hidden flex flex-col items-center justify-center border-t border-b border-black/5 py-24 md:py-32"
      style={{
        backgroundColor: "#FFF8E7",
        minHeight: "clamp(800px, 100vh, 1200px)",
      }}
    >
      {/* Background Layer 1: Checkerboard Base */}
      <motion.div
        className="absolute inset-[0] z-0 pointer-events-none"
        initial={{ scale: 1, opacity: 0, rotate: 2.5 }}
        whileInView={{ scale: 1.2, opacity: 1, rotate: 2.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={
          {
            "--size": "clamp(60px, 8vw, 120px)",
            "--doubleSize": "calc(var(--size) * 2)",
            backgroundImage: `
            linear-gradient(45deg, #D4AF37 25%, transparent 25%, transparent 75%, #D4AF37 75%, #D4AF37),
            linear-gradient(45deg, #D4AF37 25%, transparent 25%, transparent 75%, #D4AF37 75%, #D4AF37)
          `,
            backgroundSize: "var(--doubleSize) var(--doubleSize)",
            backgroundPosition: "0 0, var(--size) var(--size)",
            WebkitMaskImage:
              "radial-gradient(circle at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 100%)",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 100%)",
          } as any
        }
      />

      {/* Background Layer 2: Radial Halo */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(ellipse at ${haloX}% ${haloY}%, rgba(255, 254, 245, 0.4) 0%, transparent 50%)`,
        }}
      />

      {/* Background Layer 3: Edge Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(196, 162, 101, 0.12) 100%)",
        }}
      />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner Starbursts */}
      <Star className="top-[10%] left-[10%]" />
      <Star className="top-[10%] right-[10%]" />
      <Star className="bottom-[10%] left-[10%]" />
      <Star className="bottom-[10%] right-[10%]" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-5xl px-4 md:px-8 gap-y-24 md:gap-y-32">
        {/* === SECTION 1: PASCAL QUOTE === */}
        <div
          className="relative flex flex-col items-center w-full mt-10 md:mt-16"
          onMouseEnter={() => setIsQuoteHovered(true)}
          onMouseLeave={() => setIsQuoteHovered(false)}
        >
          {/* Year Annotation (Visual Anchor) */}
          <span
            className="absolute -top-[4em] left-1/2 -translate-x-1/2 font-serif uppercase tracking-[0.2em] pointer-events-none transition-opacity duration-300"
            style={{
              fontSize: "clamp(10px, 1vw, 14px)",
              color: "#D4AF37",
              opacity: isQuoteHovered ? 0.4 : 0.2,
            }}
          >
            1688
          </span>

          {/* Main Quote */}
          <motion.div
            className="relative text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Floating Chess Piece */}
            <div
              className="absolute z-0 hidden sm:block"
              style={{ top: "-0.3em", left: "-0.8em" }}
              onMouseEnter={() => setIsPawnHovered(true)}
              onMouseLeave={() => setIsPawnHovered(false)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.75 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <motion.div
                  className="select-none transition-all duration-300 cursor-default"
                  style={{
                    color: "#D4AF37",
                    fontSize: "clamp(20px, 3.5vw, 42px)",
                    opacity: isPawnHovered ? 0.9 : 0.75,
                    transform: `scale(${isPawnHovered ? 1.1 : 1})`,
                    textShadow: "0 3px 12px rgba(44, 24, 16, 0.04)",
                  }}
                  animate={isPawnHovered ? { y: 0 } : { y: [-4, 4, -4] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ♟
                </motion.div>
              </motion.div>
            </div>

            <h2
              className="font-serif relative z-10 transition-colors duration-300 px-4"
              style={{
                fontSize: "clamp(32px, 5vw, 72px)",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: isQuoteHovered ? "#3E2723" : "#2C1810",
                textShadow: "0 3px 12px rgba(44, 24, 16, 0.06)",
                fontWeight: 400,
              }}
            >
              "Chess is the gymnasium
              <br className="block md:hidden" /> of the mind."
            </h2>
          </motion.div>

          {/* Attribution */}
          <motion.div
            className="relative flex items-center justify-center mt-6 md:mt-12 md:translate-x-[5%]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <span className="w-[1.5em] h-[1px] bg-[#A68B5B] opacity-60 mr-4"></span>
            <span
              className="font-serif italic text-center"
              style={{
                fontSize: "clamp(14px, 1.8vw, 24px)",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0.04em",
                color: "#A68B5B",
              }}
            >
              Blaise Pascal
            </span>
          </motion.div>
        </div>

        {/* === SECTION 2: INTERACTIVE HORIZON / TIMELINE === */}
        <div className="w-full relative flex flex-col items-center">
          <div
            className="w-full max-w-3xl cursor-pointer py-6 group"
            onClick={() => setLineExpanded(!lineExpanded)}
            title="Expand to read"
          >
            <motion.div
              className="w-full h-[1px] transition-all duration-700 mx-auto"
              style={{
                background: lineExpanded
                  ? "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5) 50%, transparent)"
                  : "linear-gradient(90deg, transparent, rgba(166, 139, 91, 0.3) 50%, transparent)",
                boxShadow: lineExpanded
                  ? "0 0 15px rgba(212, 175, 55, 0.2)"
                  : "none",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6,
              }}
            />
          </div>

          <AnimatePresence>
            {lineExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden w-full max-w-2xl px-4"
              >
                <div className="pt-6 pb-10 font-serif italic text-xl md:text-2xl text-[#2C1810]/90 text-center leading-relaxed">
                  The opening is the architecture.
                  <br />
                  The middlegame is the trade-offs.
                  <br />
                  The endgame is when simplicity wins.
                  <br />
                  <span className="block mt-8 not-italic font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#A68B5B]">
                    Every move is a commit. Every capture is a deprecation.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 text-[#A68B5B]/70 font-mono text-[9px] md:text-[10px] uppercase tracking-widest mt-6 px-4 w-full cursor-default select-none">
            {TIMELINE.map((t, i) => (
              <React.Fragment key={t.name}>
                <div className="relative flex items-center justify-center group/time">
                  <span className="group-hover/time:text-[#2C1810] transition-colors duration-300 pointer-events-auto">
                    {t.name}
                  </span>
                  <span className="opacity-0 group-hover/time:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[#2C1810] transition-opacity duration-300 text-[9px] whitespace-nowrap bg-[#FFF8E7] px-2 py-1 rounded-sm shadow-md border border-[#D4AF37]/30">
                    {t.year}
                  </span>
                </div>
                {i < TIMELINE.length - 1 && (
                  <span className="mx-1 opacity-40 text-[8px]">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* === SECTION 3: ROCKY QUOTE === */}
        <div
          className="relative flex flex-col items-center w-full mb-10 md:mb-16"
          onMouseEnter={() => setRockyHovered(true)}
          onMouseLeave={() => setRockyHovered(false)}
        >
          {/* Year Annotation (Visual Anchor) */}
          <span
            className="absolute -top-[4em] left-1/2 -translate-x-1/2 font-serif uppercase tracking-[0.2em] pointer-events-none transition-opacity duration-300"
            style={{
              fontSize: "clamp(10px, 1vw, 14px)",
              color: "#D4AF37",
              opacity: rockyHovered ? 0.4 : 0.2,
            }}
          >
            2024
          </span>

          {/* Main Quote */}
          <motion.div
            className="relative text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Artifact above text */}
            <div
              className="absolute z-0 hidden sm:block"
              style={{ top: "-0.3em", left: "-1em" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="font-mono font-bold text-[#D4AF37] select-none cursor-default text-2xl"
              >
                &lt;/&gt;
              </motion.div>
            </div>

            <h2
              className="font-serif relative z-10 transition-colors duration-300 px-4"
              style={{
                fontSize: "clamp(28px, 4.5vw, 64px)",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: rockyHovered ? "#3E2723" : "#2C1810",
                textShadow: "0 3px 12px rgba(44, 24, 16, 0.06)",
                fontWeight: 400,
              }}
            >
              "The system is the gymnasium
              <br className="block md:hidden" /> of the product."
            </h2>
          </motion.div>

          {/* Attribution */}
          <motion.div
            className="relative flex items-center justify-center mt-6 md:mt-12 md:translate-x-[5%]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <span className="w-[1.5em] h-[1px] bg-[#A68B5B] opacity-60 mr-4"></span>
            <span
              className="font-serif italic text-center"
              style={{
                fontSize: "clamp(14px, 1.8vw, 24px)",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0.04em",
                color: "#A68B5B",
              }}
            >
              Rocky Babcock
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
