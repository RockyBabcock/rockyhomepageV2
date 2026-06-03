import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Sidebar } from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import AboutPage from "./pages/AboutPage";
import FunPage from "./pages/FunPage";
import GardenPage from "./pages/GardenPage";
import ContactPage from "./pages/ContactPage";
import { BackToTop } from "./components/BackToTop";
import { lazy, Suspense } from "react";
import { ModuleSkeleton } from "@/components/common/ModuleSkeleton";

import { motion, useScroll, useTransform } from "motion/react";

const ChessModule = lazy(() => import("./components/chess/ChessModule").then((m) => ({ default: m.ChessModule })));
const BasketballModule = lazy(() => import("./components/BasketballModule").then((m) => ({ default: m.BasketballModule })));
const GameMediaModule = lazy(() => import("./components/GameMediaModule").then((m) => ({ default: m.GameMediaModule })));
const WateringSystemModule = lazy(() => import("./components/WateringSystemModule").then((m) => ({ default: m.WateringSystemModule })));

const SpectrumSpine = () => {
  const { scrollYProgress } = useScroll();
  
  // Use scroll progress to shift colors
  const color1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["#FF006E", "#FF9F1C", "#06D6A0", "#00C2FF", "#8338EC"]);
  const color2 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["#FF9F1C", "#06D6A0", "#00C2FF", "#8338EC", "#FF006E"]);
  
  // Scale the inner progress bar
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  return (
    <div className="fixed inset-y-0 left-0 w-1.5 sm:w-2 md:left-6 md:my-32 md:rounded-full bg-white/50 border border-[rgba(15,23,42,0.05)] overflow-hidden pointer-events-none z-50 shadow-sm backdrop-blur-md">
       {/* Background structural tube */}
       <div className="absolute inset-0 opacity-40 bg-gradient-to-b from-transparent via-white to-transparent" />
       
       {/* The filling liquid spectrum */}
       <motion.div 
         className="absolute top-0 left-0 right-0 origin-top blur-[1px]"
         style={{
           height: "100%",
           scaleY,
           background: `linear-gradient(to bottom, var(--color-rainbow-red), var(--color-rainbow-pink))`
         }}
       >
          <motion.div 
             className="absolute inset-0 mix-blend-overlay"
             style={{
               backgroundImage: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.8))"
             }}
          />
       </motion.div>

       {/* Current active glow indicator moving down */}
       <motion.div
         className="absolute w-full h-12 rounded-full blur-[8px] opacity-60"
         style={{
           top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
           translateY: "-50%",
           backgroundColor: color1,
         }}
       />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative selection:bg-[var(--museum-accent-soft)] selection:text-[var(--museum-accent)]">
        <SpectrumSpine />
        <Navigation />
        <Sidebar />

        <main className="lg:ml-64 pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/fun" element={<FunPage />} />
            <Route path="/garden" element={<GardenPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chess" element={
              <Suspense fallback={<ModuleSkeleton label="Loading Chess Archive..." />}>
                <ChessModule />
              </Suspense>
            } />
            <Route path="/basketball" element={
              <Suspense fallback={<ModuleSkeleton label="Loading Basketball Archive..." />}>
                <BasketballModule />
              </Suspense>
            } />
            <Route path="/media" element={
              <Suspense fallback={<ModuleSkeleton label="Loading Media Universe..." />}>
                <GameMediaModule />
              </Suspense>
            } />
            <Route path="/watering" element={
              <Suspense fallback={<ModuleSkeleton label="Loading Watering System..." />}>
                <WateringSystemModule />
              </Suspense>
            } />
          </Routes>
          <BackToTop />
        </main>

        <footer className="w-full max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center border-t border-[rgba(15,23,42,0.05)] lg:ml-64 relative z-10 transition-colors">
          <p className="font-body text-xs text-[var(--museum-text-muted)] mb-6 md:mb-0 font-medium">
            © 2024 Rocky Babcock. Built with React, Tailwind & Framer Motion.
          </p>
          <div className="flex gap-10">
            <a
              href="/"
              className="font-mono text-[10px] uppercase text-ink/70 dark:text-base/70 hover:text-primary transition-colors font-black tracking-widest"
            >
              Privacy
            </a>
            <a
              href="/"
              className="font-mono text-[10px] uppercase text-ink/70 dark:text-base/70 hover:text-primary transition-colors font-black tracking-widest"
            >
              Changelog
            </a>
            <a
              href="/"
              className="font-mono text-[10px] uppercase text-ink/70 dark:text-base/70 hover:text-primary transition-colors font-black tracking-widest"
            >
              RSS
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
