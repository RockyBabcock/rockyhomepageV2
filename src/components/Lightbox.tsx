import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Lightbox = ({
  isOpen,
  onClose,
  image,
  title,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description?: string;
}) => {
  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          className="absolute top-6 right-6 text-white/50 hover:text-white font-mono text-xs uppercase"
          onClick={onClose}
        >
          [Close ✕]
        </button>
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full relative group">
            <img
              src={image}
              alt={title}
              className="w-full object-contain max-h-[70vh] shadow-2xl border-[4px] border-[#292524] bg-[#1a1714]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-white font-sans text-2xl font-bold tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-[#a8a29e] font-mono mt-2 text-sm">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
