import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { web3VaultData, Web3Section } from '../data/web3VaultData';
import { Lock, Fingerprint, Box, ArrowRight } from 'lucide-react';

const getStatusColor = (status: Web3Section['status']) => {
  switch (status) {
    case 'Learning': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'Practicing': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'Designing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'Exploring': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

export const Web3VaultModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-full premium-card !bg-[#0b0c10] !text-[#e5e7eb] p-8 md:p-10 relative overflow-hidden group border-t-4 border-t-[3px] border-t-yellow-500"
    >
      {/* Vault Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, #eab308 1px, transparent 1px),
            linear-gradient(to bottom, #eab308 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-500">
                <Lock size={20} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-yellow-500">
                Decentralized Archive
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-black mb-2 text-white">Web3 Vault</h2>
            <p className="font-body text-white/60 text-sm max-w-[280px]">
              A secure archive for blockchain learning, Solidity experiments, and Web3 product ideas.
            </p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full border border-yellow-500/20 text-yellow-500 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <Fingerprint size={28} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 mb-6">
          {web3VaultData.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-[#111111]/80 backdrop-blur-sm border border-white/5 hover:border-yellow-500/30 transition-colors group/card flex flex-col"
            >
              <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className="font-headline font-bold text-white group-hover/card:text-yellow-400 transition-colors flex items-center gap-2 leading-tight">
                  <Box size={14} className="text-white/30" />
                  {section.title}
                </h3>
                <span className={`text-[9px] font-mono uppercase px-2 py-1 rounded-md border font-bold ${getStatusColor(section.status)} whitespace-nowrap`}>
                  {section.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {section.chips.map(chip => (
                  <span key={chip} className="text-[10px] font-mono px-2 py-1 rounded bg-black/50 border border-white/10 text-white/50">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Link to="/projects" className="mt-auto w-full py-4 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl transition-all border border-yellow-500/20 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] active:scale-95">
          Access Vault <ArrowRight size={16} />
        </Link>
      </div>
    </motion.section>
  );
};
