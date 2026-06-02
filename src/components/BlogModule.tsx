import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MuseumCard } from "./common/MuseumCard";

export function BlogModule() {
  const blogs = [
    {
      slug: "death-of-1px-border",
      date: "May 12, 2024",
      readTime: "8 min read",
      title: "The Death of the 1px Border and the Rise of Tonal Layering.",
      excerpt:
        "Exploring why our eyes are becoming fatigued by the standard UI boxes and how natural depth through color shifts is the next frontier of digital tactility...",
    },
    {
      slug: "typography-physical-object",
      date: "Apr 28, 2024",
      readTime: "12 min read",
      title: "Why Typography should feel like a Printed Physical Object.",
      excerpt:
        "The tactile quality of newsprint and high-end editorial magazines can be translated to the screen through careful attention to ink-traps and bold weights...",
    },
  ];

  return (
    <div
      id="BlogModule"
      className="col-span-12 md:col-span-7 h-full flex flex-col"
    >
      <MuseumCard className="p-8 md:p-10 h-full flex flex-col rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <h2 className="text-4xl md:text-5xl font-headline font-black leading-none text-[var(--museum-text)]">
          Dispatches <br /> from the{" "}
          <span className="italic text-[var(--museum-accent)]">Grid.</span>
        </h2>
        <Link
          to="/blog"
          className="font-label text-xs uppercase tracking-widest border-b-2 border-[var(--museum-accent)] text-[var(--museum-accent)] pb-1 font-black hover:tracking-[0.2em] transition-all"
        >
          View Archive
        </Link>
      </div>

      <div className="space-y-12 md:space-y-16 flex-1">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.slug}
            className="block group cursor-pointer border border-transparent hover:border-[var(--museum-border)] hover:bg-[var(--museum-panel-elevated)] p-4 -m-4 rounded-2xl transition-all"
          >
            <span className="font-mono text-[10px] uppercase text-[var(--museum-accent)] font-black tracking-widest bg-[var(--museum-accent)]/10 px-3 py-1 rounded border border-[var(--museum-accent)]/20">
              {blog.date} • {blog.readTime}
            </span>
            <h3 className="text-2xl md:text-3xl font-headline font-black mt-4 text-[var(--museum-text)] group-hover:text-[var(--museum-accent)] transition-colors duration-300 leading-tight">
              {blog.title}
            </h3>
            <p className="font-body text-[var(--museum-text-muted)] text-lg mt-4 line-clamp-2 leading-relaxed">
              {blog.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-2 font-label text-[10px] uppercase tracking-widest font-bold text-[var(--museum-text-faint)] group-hover:text-[var(--museum-accent)] transition-colors">
              Read Article{" "}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
      </MuseumCard>
    </div>
  );
}
