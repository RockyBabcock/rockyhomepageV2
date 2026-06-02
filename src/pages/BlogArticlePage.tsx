import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";

const articlesData: Record<string, any> = {
  "death-of-1px-border": {
    date: "May 12, 2024",
    readTime: "8 min read",
    title: "The Death of the 1px Border and the Rise of Tonal Layering.",
    content: `
      <h2>The Problem with Lines</h2>
      <p>When we look at the trajectory of digital design over the past decade, we see a clear pendulum swing between skeuomorphism and flat design. Right now, we're entering a fascinating middle ground where flat interfaces are beginning to reclaim depth, not through drop shadows, but through subtle, physical-feeling layer interactions.</p>
      
      <blockquote>
        "Good design is obvious. Great design is transparent. But exceptional design feels like it has mass."
      </blockquote>
      
      <h2>The Tonal Shift</h2>
      <p>Instead of drawing 1px borders to separate content, we can use 3% opacity shifts in the background color to establish visual hierarchy. This reduces cognitive load because the brain processes light and shadow much faster than it processes lines.</p>
      <p>By blending Neo-Brutalist elements with tonal backgrounds, we can create interfaces that feel structured, legible, and distinctly human.</p>
    `,
  },
  "typography-physical-object": {
    date: "Apr 28, 2024",
    readTime: "12 min read",
    title: "Why Typography should feel like a Printed Physical Object.",
    content: `
      <h2>Beyond Pixels</h2>
      <p>Typographic forms exist primarily as vectors on our screens. But they were born from metal, wood, and ink. The tactile quality of newsprint and high-end editorial magazines can be translated to the screen through careful attention to ink-traps and bold weights.</p>
      
      <h2>Implementing the Physical Feel</h2>
      <p>Using tight tracking, intentional leading and purposeful contrast in weight, designers can trick the user's brain into perceiving the type as having physical mass.</p>
      <p>Web typography is maturing, and our capability to render variable fonts with specific optical sizing allows us to recreate the precision of a printed book right in the browser.</p>
    `,
  },
};

export default function BlogArticlePage() {
  const { slug } = useParams();

  if (!slug || !articlesData[slug]) {
    return <Navigate to="/" replace />;
  }

  const article = articlesData[slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 md:p-12 premium-card min-h-[60vh] max-w-4xl mx-auto border-[3px] border-ink shadow-[8px_8px_0px_0px_currentColor] bg-white text-ink"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest font-black mb-12 hover:-translate-x-1 transition-transform border-b-2 border-primary pb-1"
      >
        <ArrowLeft className="w-3 h-3" /> Back to Home
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] uppercase text-ink bg-primary font-black tracking-widest px-3 py-1 border-[2px] border-ink">
            Design Engineering
          </span>
          <span className="font-mono text-[10px] uppercase text-ink/60 font-bold tracking-widest">
            {article.date} • {article.readTime}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-headline font-black mb-8 leading-tight tracking-tight uppercase border-b-4 border-ink pb-8">
          {article.title}
        </h1>

        <div
          className="prose prose-lg prose-headings:font-headline prose-headings:font-black prose-headings:uppercase prose-p:font-mono prose-p:font-medium prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-black/5 prose-blockquote:p-4 prose-blockquote:font-headline dark:prose-invert text-ink leading-relaxed max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      <div className="border-t-[3px] border-ink pt-8 mt-16 flex justify-between items-center">
        <p className="font-mono text-xs text-ink font-black uppercase tracking-widest bg-yellow-300 border-[2px] border-ink px-4 py-2">
          End of Article
        </p>
      </div>
    </motion.div>
  );
}
