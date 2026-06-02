import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Lock, Fingerprint, ArrowRight, AlertCircle } from "lucide-react";
import { StatusPill } from "./StatusPill";

export const Web3VaultModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-full premium-card !bg-[#0b0c10] !text-[#e5e7eb] p-8 md:p-10 relative overflow-hidden group border-t-[3px] border-t-yellow-500"
    >
      {/* Vault Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, #eab308 1px, transparent 1px),
            linear-gradient(to bottom, #eab308 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-500">
                  <Lock size={20} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-yellow-500">
                  Decentralized Archive
                </span>
              </div>
              <StatusPill status="Learning Archive" />
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-black mb-2 text-white">
              Web3 Archive Vault
            </h2>
            <p className="font-body text-white/70 text-sm max-w-[280px]">
              A learning archive for wallet UX, ownership models, decentralized interfaces, and on-chain identity patterns. This vault records exploration rather than mastery. The goal is to understand how Web3 interfaces can become clearer, safer, and more human.
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full border border-yellow-500/20 text-yellow-500 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <Fingerprint size={28} />
          </div>
        </div>

        <div className="space-y-5 flex-1 mb-8 pt-4 border-t border-white/10">
          <div>
            <h4 className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest font-bold mb-1">
              What I built
            </h4>
            <p className="text-sm text-white/80 leading-relaxed bg-[#111111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5">
              A visual archive for Web3 concepts, wallet interaction patterns,
              and ownership models.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest font-bold mb-1">
              What I learned
            </h4>
            <p className="text-sm text-white/80 leading-relaxed bg-[#111111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5">
              Web3 interfaces often fail because they hide too much complexity
              or expose too much too early.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest font-bold mb-1">
              What's next
            </h4>
            <div className="text-sm text-white/80 leading-relaxed bg-[#111111]/80 backdrop-blur-sm p-3 rounded-lg border border-white/5 flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 text-yellow-500/70" />
              <span>
                Build a small wallet-connected prototype and document the
                interaction flow.
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/projects"
          className="mt-auto w-full py-4 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl transition-all border border-yellow-500/20 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] active:scale-95"
        >
          Access Vault <ArrowRight size={16} />
        </Link>
      </div>
    </motion.section>
  );
};
