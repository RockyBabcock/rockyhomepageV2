import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function BlogArticlePage() {
  const { slug } = useParams();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 md:p-12 premium-card min-h-[60vh] max-w-4xl mx-auto"
    >
      <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest font-bold mb-12 hover:-translate-x-1 transition-transform">
        <ArrowLeft className="w-3 h-3" /> Back to Blog
      </Link>
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] uppercase text-primary font-black tracking-widest bg-primary/5 px-3 py-1 rounded">
            Engineering
          </span>
          <span className="font-mono text-[10px] uppercase text-ink/40 font-bold tracking-widest">
            May 12, 2024 • 8 min read
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black mb-8 leading-tight">
          Details for: {slug?.replace(/-/g, ' ')}
        </h1>
        
        <div className="prose prose-lg dark:prose-invert font-body text-ink/80 leading-relaxed max-w-none">
          <p className="text-xl font-medium text-ink mb-8">
            This is a drafted article preview page. The actual content of the article would be rendered here, likely via a CMS or MDX integration in the future.
          </p>
          
          <h2>Introduction</h2>
          <p>
            When we look at the trajectory of digital design over the past decade, we see a clear pendulum swing between skeuomorphism and flat design. Right now, we're entering a fascinating middle ground where flat interfaces are beginning to reclaim depth, not through drop shadows, but through subtle, physical-feeling layer interactions.
          </p>
          
          <blockquote>
            "Good design is obvious. Great design is transparent. But exceptional design feels like it has mass."
          </blockquote>
          
          <h2>The Tonal Shift</h2>
          <p>
            Instead of drawing 1px borders to separate content, we can use 3% opacity shifts in the background color to establish visual hierarchy. This reduces cognitive load because the brain processes light and shadow much faster than it processes lines.
          </p>
        </div>
      </div>
      
      <div className="border-t border-ink/10 dark:border-base/10 pt-8 mt-16 flex justify-between items-center">
        <p className="font-mono text-xs text-ink/40 font-bold uppercase tracking-widest">Thanks for reading.</p>
      </div>
    </motion.div>
  );
}
