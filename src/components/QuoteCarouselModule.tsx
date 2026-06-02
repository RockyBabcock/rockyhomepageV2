import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "../lib/utils";
import { quotesData } from "../data/quotesData";

export function QuoteCarouselModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotesData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotesData.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotesData.length - 1 : prev - 1));
  };

  const currentQuote = quotesData[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 md:col-span-12 premium-card relative overflow-hidden bg-ink text-base group min-h-[400px] flex flex-col justify-center border-2 border-transparent hover:border-primary/20 transition-all"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] bg-gradient-to-bl from-primary via-transparent to-transparent opacity-30 transform rotate-12 blur-3xl"></div>
        <svg
          className="absolute w-full h-full stroke-base opacity-10"
          width="100%"
          height="100%"
        >
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-8">
          <Quote className="w-12 h-12 text-primary opacity-80" />
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black text-white leading-tight mb-8">
              "{currentQuote.text}"
            </h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
              <p className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-primary font-bold whitespace-nowrap">
                — {currentQuote.author}
              </p>
              <div className="w-8 h-px bg-white/20 hidden md:block"></div>
              <p className="font-body text-base/70 text-sm md:text-base leading-relaxed italic border-l-2 border-primary/40 pl-4">
                <span className="block font-bold not-italic text-white mb-1 uppercase tracking-widest text-[10px] opacity-60">
                  Why this matters:
                </span>
                "{currentQuote.explanation}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end items-center gap-6 mt-12">
          <div className="flex gap-2">
            {quotesData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "bg-primary w-8"
                    : "bg-white/20 w-1.5 hover:bg-white/40",
                )}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2 border-l border-white/10 pl-6">
            <button
              onClick={prevQuote}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white hover:text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextQuote}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white hover:text-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
