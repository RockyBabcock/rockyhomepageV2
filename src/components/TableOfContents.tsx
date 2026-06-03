import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { museumSections } from "@/data/museumSections";

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState(
    museumSections[0]?.id || "entrance",
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let currentActiveId = "";

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentActiveId = entry.target.id;
        }
      });

      if (currentActiveId) {
        setActiveSection(currentActiveId);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    museumSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav aria-label="Mobile Route Navigation" className="sticky top-0 z-40 overflow-x-auto border-b border-stone-800 bg-stone-950/90 px-3 py-2 backdrop-blur lg:hidden flex gap-2">
        {museumSections.map(({ id, title }) => (
          <a 
            key={id}
            href={`#${id}`} 
            className={cn(
              "whitespace-nowrap px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded transition-colors",
              activeSection === id ? "bg-orange-500/20 text-orange-400" : "text-stone-400 hover:text-stone-200"
            )}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
            }}
          >
            {title}
          </a>
        ))}
      </nav>

      {/* Desktop Navigation Menu */}
      <AnimatePresence>
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="museum-map z-40 hidden xl:flex flex-col gap-4 pointer-events-auto items-start"
          aria-label="Desktop Route Navigation"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4 pl-5">
            Exhibition Map
          </div>
          {museumSections.map(({ id, code, title }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group flex items-center gap-3 transition-all outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 w-full text-left"
            >
              <span
                className={cn(
                  "block w-[2px] transition-all duration-300 rounded-full shrink-0",
                  activeSection === id
                    ? "h-8 bg-orange-500"
                    : "h-3 bg-slate-700 group-hover:bg-orange-500/50 group-hover:h-5"
                )}
              />
              <span
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 leading-tight",
                  activeSection === id
                    ? "text-orange-500 opacity-100"
                    : "text-slate-500 opacity-60 group-hover:opacity-100 group-hover:text-slate-300"
                )}
              >
                <span className="block text-[9px] opacity-70 mb-0.5">{code}</span>
                {title}
              </span>
            </button>
          ))}
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
