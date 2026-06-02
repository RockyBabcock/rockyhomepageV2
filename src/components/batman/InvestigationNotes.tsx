import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Save } from "lucide-react";

interface Note {
  id: string;
  text: string;
  date: string;
  color: string;
}

const STICKY_COLORS = [
  "bg-yellow-200 text-yellow-900 border-yellow-300",
  "bg-blue-200 text-blue-900 border-blue-300",
  "bg-green-200 text-green-900 border-green-300",
  "bg-pink-200 text-pink-900 border-pink-300",
];

export function InvestigationNotes({ eraId }: { eraId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState("");

  const storageKey = `batman_archive_notes_${eraId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notes");
      }
    }
  }, [eraId]);

  const saveNote = () => {
    if (!inputText.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText,
      date:
        new Date().toLocaleDateString("en-US") +
        " " +
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      color: STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)],
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full font-mono">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4af37] border-b border-[#d4af37]/30 pb-1 mb-8 block max-w-max">
        Detective's Addendum
      </span>

      <div className="bg-[#1a1a1a] border border-[#333] p-4 flex flex-col gap-4 mb-12 shadow-2xl relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Pin a new lead or observation here..."
          className="w-full h-32 bg-transparent resize-none outline-none text-white/90 placeholder-white/20 text-sm leading-relaxed p-2"
        />

        <div className="flex justify-between items-center border-t border-[#333] pt-4">
          <span className="text-[9px] text-white/30 uppercase tracking-widest">
            Stored in Secure Cache
          </span>
          <button
            onClick={saveNote}
            className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-white text-black text-[10px] uppercase font-bold tracking-widest transition-colors"
          >
            Pin Note <Save className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-wrap gap-6 items-start justify-center">
        <AnimatePresence>
          {notes.map((note, index) => (
            <motion.div
              layout
              key={note.id}
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: Math.random() * 20 - 10,
              }}
              animate={{ opacity: 1, scale: 1, rotate: Math.random() * 10 - 5 }}
              className={`w-64 min-h-[200px] p-6 shadow-xl relative border ${note.color} transform transition-transform hover:scale-105 z-10 hover:z-20`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/20 mix-blend-overlay rotate-2" />
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-600/80 shadow-md border-2 border-red-800"
                style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.5)" }}
              />

              <span className="absolute bottom-4 right-4 text-[9px] opacity-50 font-bold overflow-hidden">
                {note.date}
              </span>
              <p className="text-sm font-sans font-medium leading-relaxed mt-4 whitespace-pre-wrap">
                {note.text}
              </p>
            </motion.div>
          ))}
          {notes.length === 0 && (
            <div className="text-center p-8 border border-dashed border-[#333] text-white/20 text-xs italic w-full">
              No active leads or notes.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
