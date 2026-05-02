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

const DecorativeElements = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] mix-blend-multiply dark:bg-primary/10 dark:mix-blend-screen transition-opacity duration-1000"></div>
    <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px] mix-blend-multiply dark:bg-tertiary/10 dark:mix-blend-screen transition-opacity duration-1000 delay-500"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[150px] mix-blend-multiply dark:bg-emerald-500/10 dark:mix-blend-screen transition-opacity duration-1000 delay-1000"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative selection:bg-primary/20 selection:text-primary">
        <DecorativeElements />
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
          </Routes>
          <BackToTop />
        </main>

        <footer className="w-full max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center border-t border-ink/5 dark:border-base/5 lg:ml-64 relative z-10 transition-colors">
          <p className="font-mono text-[10px] uppercase text-ink/50 dark:text-base/50 mb-6 md:mb-0 font-bold tracking-[0.1em]">
            © 2024 The Curated Archive. Engineered with Neo-Brutalist Intent & Tonal Layering.
          </p>
          <div className="flex gap-10">
            <a href="#" className="font-mono text-[10px] uppercase text-ink/70 dark:text-base/70 hover:text-primary transition-colors font-black tracking-widest">Privacy</a>
            <a href="#" className="font-mono text-[10px] uppercase text-ink/70 dark:text-base/70 hover:text-primary transition-colors font-black tracking-widest">Changelog</a>
            <a href="#" className="font-mono text-[10px] uppercase text-ink/70 dark:text-base/70 hover:text-primary transition-colors font-black tracking-widest">RSS</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
