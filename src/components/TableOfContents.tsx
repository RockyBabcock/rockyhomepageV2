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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto items-end"
          aria-label="Desktop Route Navigation"
        >
          {museumSections.map(({ id, code, title }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group flex items-center gap-3 transition-all outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <span
                className={cn(
                  "font-label text-xs uppercase tracking-widest font-bold transition-all duration-300",
                  activeSection === id
                    ? "text-primary opacity-100 translate-x-0"
                    : "text-ink/40 w-0 opacity-0 lg:-translate-x-4 lg:group-hover:opacity-100 lg:group-hover:-translate-x-0 overflow-hidden lg:overflow-visible text-right whitespace-nowrap"
                )}
              >
                {code.replace("HALL ", "")} // {title}
              </span>
              <span
                className={cn(
                  "block w-2 transition-all duration-300 rounded-full shrink-0",
                  activeSection === id
                    ? "h-6 bg-primary"
                    : "h-2 bg-ink/20 group-hover:bg-primary/50 group-hover:h-4"
                )}
              />
            </button>
          ))}
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
