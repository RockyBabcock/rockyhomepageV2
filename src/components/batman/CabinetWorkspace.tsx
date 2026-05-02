import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Images, Users, Cpu, GitMerge, Skull, PenTool } from "lucide-react";
import { SystemStatusBar } from "./SystemStatusBar";
import { batmanEras } from "./data/batmanEras";

import { CoverGallery } from "./CoverGallery";
import { CreatorProfiles } from "./CreatorProfiles";
import { GadgetSchematics } from "./GadgetSchematics";
import { StoryArcsTimeline } from "./StoryArcsTimeline";
import { RogueGallery } from "./RogueGallery";
import { InvestigationNotes } from "./InvestigationNotes";

export function CabinetWorkspace({
  eraId,
  onClose,
}: {
  eraId: string;
  onClose: () => void;
}) {
  const era = batmanEras.find((e) => e.id === eraId);
  const [activeTab, setActiveTab] = useState<
    "covers" | "creators" | "gadgets" | "stories" | "rogues" | "notes"
  >("covers");

  const tabs = [
    { id: "covers", label: "Cover Gallery", icon: Images },
    { id: "creators", label: "Profiles", icon: Users },
    { id: "stories", label: "Story Arcs", icon: GitMerge },
    { id: "gadgets", label: "Schematics", icon: Cpu },
    { id: "rogues", label: "Rogue Gallery", icon: Skull },
    { id: "notes", label: "Field Notes", icon: PenTool },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0c0c0c] flex flex-col font-mono text-white/80">
      <SystemStatusBar />

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none" />

      {/* Header */}
      <div className="z-50 mt-16 px-8 py-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-sm">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#d4af37] rounded-sm" />
            {era?.timeRange} ARCHIVE
          </span>
          <h2 className="font-headline text-2xl font-black tracking-widest uppercase mt-1 text-white">
            {era?.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 border border-white/10 hover:bg-white/10 hover:text-white transition-colors text-white/50 flex items-center gap-2"
        >
          <X className="w-4 h-4" />{" "}
          <span className="text-[10px] tracking-widest">CLOSE</span>
        </button>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden z-40">
        {/* Left Side Navigation (File Folders) */}
        <div className="w-48 border-r border-white/10 bg-black/50 p-4 flex flex-col gap-2 overflow-y-auto hidden md:flex">
          <span className="text-[9px] uppercase tracking-widest text-[#d4af37] mb-4 opacity-70">
            Case Directories
          </span>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-3 py-3 text-[10px] tracking-widest uppercase transition-all text-left ${activeTab === tab.id ? "bg-white/10 text-white border-l-2 border-[#d4af37]" : "text-white/50 hover:bg-white/5 border-l-2 border-transparent"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-gradient-to-br from-[#111] to-[#050505]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 overflow-y-auto p-8"
            >
              {activeTab === "covers" && <CoverGallery eraId={eraId} />}
              {activeTab === "creators" && <CreatorProfiles eraId={eraId} />}
              {activeTab === "gadgets" && <GadgetSchematics eraId={eraId} />}
              {activeTab === "stories" && <StoryArcsTimeline eraId={eraId} />}
              {activeTab === "rogues" && <RogueGallery eraId={eraId} />}
              {activeTab === "notes" && <InvestigationNotes eraId={eraId} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto border-t border-white/10 bg-black z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 flex items-center justify-center p-4 text-[10px] tracking-widest uppercase transition-all ${activeTab === tab.id ? "bg-white/10 text-[#d4af37] border-t-2 border-[#d4af37]" : "text-white/50 hover:bg-white/5 border-t-2 border-transparent"}`}
          >
            <tab.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
