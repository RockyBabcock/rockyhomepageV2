import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const allBlogs = [
    {
      slug: "death-of-1px-border",
      date: "May 12, 2024",
      readTime: "8 min read",
      title: "The Death of the 1px Border and the Rise of Tonal Layering.",
      excerpt:
        "Exploring why our eyes are becoming fatigued by the standard UI boxes and how natural depth through color shifts is the next frontier of digital tactility. We're moving towards a world where shadows and light do the heavy lifting of interface hierarchy.",
      category: "Design",
    },
    {
      slug: "typography-physical-object",
      date: "Apr 28, 2024",
      readTime: "12 min read",
      title: "Why Typography should feel like a Printed Physical Object.",
      excerpt:
        "The tactile quality of newsprint and high-end editorial magazines can be translated to the screen through careful attention to ink-traps and bold weights. Digital text doesn't have to feel weightless.",
      category: "Typography",
    },
    {
      slug: "ai-systems-architecture",
      date: "Mar 15, 2024",
      readTime: "15 min read",
      title: "Modular Prompts: Architecting AI Systems.",
      excerpt:
        "How to structure prompts like software components. Moving away from massive single-shot prompts to composable, reusable contextual blocks for more robust AI integrations.",
      category: "Engineering",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 premium-card min-h-[60vh]"
    >
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest font-bold mb-6 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-3 h-3" /> Back Home
        </Link>
        <h1 className="text-5xl md:text-6xl font-headline font-black mb-4">
          Digital Garden <br />
          <span className="text-primary italic">& Blog.</span>
        </h1>
        <p className="text-ink/60 dark:text-base/60 max-w-2xl text-lg font-body">
          Long-form thoughts on design engineering, artificial intelligence, and
          the evolving nature of digital product creation.
        </p>
      </div>

      <div className="space-y-16">
        {allBlogs.map((blog, idx) => (
          <motion.article
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer border-b border-ink/10 dark:border-base/10 pb-12 last:border-0"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[10px] uppercase text-primary font-black tracking-widest bg-primary/5 px-3 py-1 rounded">
                {blog.category}
              </span>
              <span className="font-mono text-[10px] uppercase text-ink/40 font-bold tracking-widest">
                {blog.date} • {blog.readTime}
              </span>
            </div>

            <Link to={`/blog/${blog.slug}`} className="block">
              <h3 className="text-3xl md:text-4xl font-headline font-black mt-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                {blog.title}
              </h3>
              <p className="font-body text-ink/70 text-lg mt-4 max-w-3xl leading-relaxed">
                {blog.excerpt}
              </p>
            </Link>

            <div className="mt-8 flex items-center gap-2 font-label text-xs uppercase tracking-widest font-bold text-ink hover:text-primary transition-colors">
              <Link
                to={`/blog/${blog.slug}`}
                className="flex items-center gap-2"
              >
                Read Abstract{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
