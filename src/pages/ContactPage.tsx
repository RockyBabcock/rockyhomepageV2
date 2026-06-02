import React from "react";
import { motion } from "motion/react";
import { ConnectModule } from "../components/ConnectModule";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-10 relative"
    >
      <div className="col-span-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest font-bold mb-6 hover:-translate-x-1 transition-transform pl-4"
        >
          <ArrowLeft className="w-3 h-3" /> Back Home
        </Link>
        <h1 className="text-4xl font-headline font-black mb-8 px-4">
          Contact & Socials
        </h1>
        <ConnectModule />
      </div>
    </motion.div>
  );
}
