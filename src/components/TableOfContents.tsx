import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';

const homeSections = [
  { id: 'hero', label: 'Overview' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'active-systems', label: 'Active Systems' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'personal', label: 'Personal Worlds' },
  { id: 'blog', label: 'Digital Garden' },
  { id: 'connect', label: 'Connect' }
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let currentActiveId = '';
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentActiveId = entry.target.id;
        }
      });
      
      if (currentActiveId) {
        setActiveSection(currentActiveId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    homeSections.forEach(({ id }) => {
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
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-24 right-4 z-50 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-ink/10 rounded-full shadow-lg text-ink"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Page Navigation"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={cn(
              "fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto items-end",
              isOpen && "!flex right-4 top-40 translate-y-0 bg-white/95 dark:bg-black/95 p-6 rounded-2xl border border-ink/10 shadow-2xl backdrop-blur-md"
            )}
          >
            {homeSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="group flex items-center gap-3 transition-all outline-none"
              >
                <span className={cn(
                  "font-label text-xs uppercase tracking-widest font-bold transition-all duration-300",
                  activeSection === id ? "text-primary opacity-100 translate-x-0" : "text-ink/40 w-0 opacity-0 lg:-translate-x-4 lg:group-hover:opacity-100 lg:group-hover:-translate-x-0 overflow-hidden lg:overflow-visible text-right whitespace-nowrap",
                  isOpen && "w-auto opacity-100 translate-x-0 text-right"
                )}>
                  {label}
                </span>
                <span className={cn(
                  "block w-2 transition-all duration-300 rounded-full shrink-0",
                  activeSection === id ? "h-6 bg-primary" : "h-2 bg-ink/20 group-hover:bg-primary/50 group-hover:h-4"
                )} />
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
