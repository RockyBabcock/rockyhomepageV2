import React from 'react';
import { motion } from 'motion/react';
import { Eye, Users, MousePointerClick, Clock, TrendingUp } from 'lucide-react';

export const VisitorAnalyticsModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-12 md:col-span-4 premium-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6 text-primary">
        <TrendingUp className="w-5 h-5" />
        <h2 className="font-headline font-bold text-lg">Live Analytics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Eye className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">12,408</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">Total Views</div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Users className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">4,192</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">Unique Visitors</div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <Clock className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">2m 14s</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">Avg Session</div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <MousePointerClick className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">842</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">Resume Clicks</div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full" />
    </motion.section>
  );
};
