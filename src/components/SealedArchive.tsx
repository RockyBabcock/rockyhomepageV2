import React from 'react';
import { motion } from 'motion/react';
import { BoxSelect } from 'lucide-react';
import { StatusPill } from './StatusPill';

export function SealedArchive({
  title = "Exhibit Under Construction",
  description = "This chamber is reserved for a future experiment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="col-span-12 border border-dashed border-stone-300 dark:border-stone-700 bg-stone-100/50 dark:bg-stone-900/50 p-6 md:p-10 rounded-2xl flex flex-col items-center justify-center text-center opacity-80"
    >
      <div className="mb-4">
        <StatusPill status="Sealed" />
      </div>
      
      <BoxSelect className="w-8 h-8 text-stone-400 dark:text-stone-500 mb-3 opacity-50" />
      
      <div className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500 mb-2">
        Sealed Archive
      </div>

      <h3 className="text-xl md:text-2xl font-headline font-black uppercase text-stone-800 dark:text-stone-200">
        {title}
      </h3>

      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
        {description}
      </p>
    </motion.section>
  );
}
