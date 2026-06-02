"use client";

import {
  User,
  Swords,
  Trophy,
  Github,
  Cpu,
  History,
  Music4,
  Sprout,
  Contact,
  Home,
  BookOpen,
  Tent,
  Briefcase,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routes = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: User },
  { path: "/projects", label: "Projects", icon: Briefcase },
  { path: "/blog", label: "Blog", icon: BookOpen },
  { path: "/garden", label: "Digital Garden", icon: Sprout },
  { path: "/fun", label: "Personal Worlds", icon: Tent },
  { path: "/contact", label: "Contact", icon: Contact },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-base border-r border-ink/10 pt-24 pb-8 z-40">
      <div className="px-8 mb-10">
        <h2 className="font-headline text-xl text-primary italic font-bold">
          Curated Archive
        </h2>
        <p className="font-mono text-[10px] opacity-50 uppercase tracking-tighter">
          v2.0.0 — LIVE
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar Navigation">
        {routes.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-4 rounded-r-2xl py-3 px-4 transition-all duration-200 group ${
                isActive
                  ? "text-primary font-bold border-l-4 border-primary bg-primary/5"
                  : "text-ink/50 border-l-4 border-transparent hover:bg-primary/5 hover:text-ink"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-label text-xs uppercase tracking-widest">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-8 mt-8">
        <a
          href="/portfolio.pdf"
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center bg-primary text-white py-4 px-3 rounded-3xl font-label text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
        >
          Download Resume
        </a>
      </div>
    </aside>
  );
}
