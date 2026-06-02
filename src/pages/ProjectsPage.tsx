import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 premium-card min-h-[60vh] flex flex-col items-center justify-center text-center relative"
    >
      <Link
        to="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest font-bold hover:-translate-x-1 transition-transform"
      >
        <ArrowLeft className="w-3 h-3" /> Back Home
      </Link>
      <h1 className="text-4xl font-headline font-black mb-4">Projects</h1>
      <p className="text-ink/60 dark:text-base/60 max-w-xl">
        Full project case studies, GitHub links, demos, and build details.
        Coming soon.
      </p>
    </motion.div>
  );
}
