import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TimelineEntry } from "../../data/batmanTimeline";
import {
  X,
  PlayCircle,
  FileText,
  ShieldAlert,
  Image as ImageIcon,
  Music,
  Edit3,
} from "lucide-react";

interface BatcomputerModalProps {
  entry: TimelineEntry;
  onClose: () => void;
}

export const BatcomputerModal: React.FC<BatcomputerModalProps> = ({
  entry,
  onClose,
}) => {
  const [text, setText] = useState("");
  const [review, setReview] = useState("");

  const isNolan = entry.era === "Nolan Trilogy";

  const fullText = `ACCESSING ARCHIVES...
YEAR: ${entry.year}
DIRECTOR: ${entry.director}
ACTOR: ${entry.actor}
GENRE: ${entry.genre || "Unknown"}
GOTHAM CRIME RATING: ${entry.crimeRating}/10

QUOTE: "${entry.quote}"

UNIFORM ANALYSIS:
${entry.suitAnalysis}

KNOWN ASSOCIATES/VILLAINS:
${entry.villain}

TRIVIA:
${entry.trivia || "No data available."}

COMIC COMPARISON:
${entry.comicComparison || "No data available."}
`;

  useEffect(() => {
    let i = 0;
    setText("");
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 10); // Faster typing

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`relative w-full max-w-4xl my-8 bg-[#0A1F0C] border ${isNolan ? "border-[#C4A35A] shadow-[0_0_30px_rgba(196,163,90,0.2)]" : "border-[#4CAF50] shadow-[0_0_30px_rgba(76,175,80,0.2)]"} rounded-lg overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scanlines */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-50 z-0" />

        {/* Header */}
        <div
          className={`flex justify-between items-center p-4 border-b ${isNolan ? "border-[#C4A35A]/30 bg-[#1A1A1B]/90" : "border-[#4CAF50]/30 bg-[#0A1F0C]/90"} backdrop-blur-md relative z-20`}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert
              className={`${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} w-5 h-5`}
            />
            <span
              className={`font-mono ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} text-sm tracking-widest`}
            >
              {isNolan ? "WAYNE ENTERPRISES ARCHIVE" : "BATCOMPUTER OS v9.0"}
            </span>
          </div>
          <button
            onClick={onClose}
            className={`${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} hover:text-white transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 relative z-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Poster Placeholder */}
            <div
              className={`w-full md:w-1/3 aspect-[2/3] bg-black/50 border ${isNolan ? "border-[#C4A35A]/30" : "border-[#4CAF50]/30"} rounded-lg flex flex-col items-center justify-center`}
            >
              <ImageIcon
                className={`w-12 h-12 ${isNolan ? "text-[#C4A35A]/30" : "text-[#4CAF50]/30"} mb-2`}
              />
              <span
                className={`font-mono text-xs ${isNolan ? "text-[#C4A35A]/50" : "text-[#4CAF50]/50"}`}
              >
                IMAGE_DATA_MISSING
              </span>
            </div>

            <div className="w-full md:w-2/3">
              <h2
                className={`font-bebas text-4xl md:text-5xl ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} mb-6 tracking-wider`}
              >
                {entry.title}
              </h2>

              <div
                className={`font-mono ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} text-sm whitespace-pre-wrap leading-relaxed`}
              >
                {text}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* Nolan Trilogy Special Section */}
          {isNolan && (
            <div className="mt-8 pt-8 border-t border-[#C4A35A]/30">
              <h3 className="font-bebas text-3xl text-[#C4A35A] mb-6 tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-6 h-6" />
                TRILOGY ANALYSIS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-mono text-[#C4A35A] text-lg mb-2">
                    Thematic Evolution
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-sm text-[#C4A35A]/80 mb-4">
                    <span
                      className={
                        entry.year === 2005 ? "text-white font-bold" : ""
                      }
                    >
                      FEAR
                    </span>
                    <span>→</span>
                    <span
                      className={
                        entry.year === 2008 ? "text-white font-bold" : ""
                      }
                    >
                      CHAOS
                    </span>
                    <span>→</span>
                    <span
                      className={
                        entry.year === 2012 ? "text-white font-bold" : ""
                      }
                    >
                      PAIN/RISE
                    </span>
                  </div>

                  <h4 className="font-mono text-[#C4A35A] text-lg mb-2 flex items-center gap-2 mt-6">
                    <Music className="w-4 h-4" />
                    Soundtrack Analysis
                  </h4>
                  <p className="font-mono text-sm text-[#C4A35A]/80">
                    Hans Zimmer's score defines this era. The iconic two-note
                    Batman theme represents his arrested development and
                    constant state of becoming. "Why Do We Fall?" serves as the
                    emotional anchor of the trilogy.
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[#C4A35A] text-lg mb-2 flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Personal Review
                  </h4>
                  <textarea
                    className="w-full h-32 bg-black/50 border border-[#C4A35A]/30 rounded p-2 font-mono text-sm text-white focus:outline-none focus:border-[#C4A35A] resize-none"
                    placeholder="Enter your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 bg-transparent border ${isNolan ? "border-[#C4A35A] text-[#C4A35A] hover:bg-[#C4A35A] hover:text-black" : "border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#0A1F0C]"} transition-colors font-mono text-sm uppercase tracking-wider`}
              >
                <PlayCircle className="w-4 h-4" />
                Watch Trailer
              </button>
              {!isNolan && (
                <button
                  className={`flex items-center gap-2 px-4 py-2 bg-transparent border border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#0A1F0C] transition-colors font-mono text-sm uppercase tracking-wider`}
                >
                  <FileText className="w-4 h-4" />
                  My Review →
                </button>
              )}
            </div>

            <div className="flex gap-2 mt-2 flex-wrap">
              <span
                className={`font-mono ${isNolan ? "text-[#C4A35A]/50" : "text-[#4CAF50]/50"} text-xs uppercase`}
              >
                Related Files:
              </span>
              {entry.era === "Nolan Trilogy" ? (
                <>
                  <button
                    className={`font-mono ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} text-xs hover:underline uppercase`}
                  >
                    Batman Begins
                  </button>
                  <span
                    className={`${isNolan ? "text-[#C4A35A]/50" : "text-[#4CAF50]/50"} text-xs`}
                  >
                    |
                  </span>
                  <button
                    className={`font-mono ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} text-xs hover:underline uppercase`}
                  >
                    The Dark Knight
                  </button>
                  <span
                    className={`${isNolan ? "text-[#C4A35A]/50" : "text-[#4CAF50]/50"} text-xs`}
                  >
                    |
                  </span>
                  <button
                    className={`font-mono ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} text-xs hover:underline uppercase`}
                  >
                    The Dark Knight Rises
                  </button>
                </>
              ) : (
                <button
                  className={`font-mono ${isNolan ? "text-[#C4A35A]" : "text-[#4CAF50]"} text-xs hover:underline uppercase`}
                >
                  Search Database...
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blinking decrypting text */}
        <div
          className={`absolute bottom-2 right-4 font-mono ${isNolan ? "text-[#C4A35A]/50" : "text-[#4CAF50]/50"} text-xs animate-pulse z-20`}
        >
          decrypting...
        </div>
      </motion.div>
    </motion.div>
  );
};
