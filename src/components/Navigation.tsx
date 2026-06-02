import { useState, useEffect } from "react";
import { Moon, Sun, Search, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const languages = ["EN", "中文", "ES", "日本語", "한국어"];

export function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-ink/5 bg-base/60 backdrop-blur-md flex justify-between items-center px-6 md:px-8 py-4 max-w-full">
      <Link
        to="/"
        className="text-2xl font-bold font-headline italic text-ink hover:opacity-80 transition-opacity"
      >
        The Archive
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "font-label text-xs uppercase tracking-widest transition-all duration-300",
              location.pathname === item.path
                ? "text-primary border-b-2 border-primary pb-1 font-bold"
                : "text-ink opacity-70 hover:opacity-100",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          className="text-ink hover:scale-110 transition-transform flex items-center gap-1"
          aria-label="Change Language"
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] font-bold">{currentLang}</span>
        </button>

        {langMenuOpen && (
          <div className="absolute top-10 right-16 w-24 bg-white dark:bg-[#111] border border-ink/10 rounded-lg shadow-xl overflow-hidden py-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setCurrentLang(lang);
                  setLangMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5",
                  currentLang === lang
                    ? "font-bold text-primary"
                    : "text-ink dark:text-base",
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsDark(!isDark)}
          className="text-ink hover:scale-110 transition-transform"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="text-ink hover:scale-110 transition-transform hidden sm:block">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
