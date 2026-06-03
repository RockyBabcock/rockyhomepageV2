import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type PersonalWorldPreviewProps = {
  title: string;
  eyebrow: string;
  description: string;
  color: string;
  href: string;
  className?: string;
};

export function PersonalWorldPreview({
  title,
  eyebrow,
  description,
  color,
  href,
  className,
}: PersonalWorldPreviewProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group lab-card lab-card-hover relative min-h-[320px] overflow-hidden p-6",
        "flex flex-col justify-between",
        className,
      )}
      style={{
        boxShadow: `0 24px 70px ${color}20`,
      }}
    >
      <div
        className="absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-45 transition-transform duration-500 group-hover:scale-150"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10">
        <div
          className="inline-flex rounded-full border bg-white/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]"
          style={{
            color,
            borderColor: `${color}55`,
          }}
        >
          {eyebrow}
        </div>

        <h3 className="mt-6 font-space text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-6 text-[var(--lab-text-soft)] font-body">
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between relative z-10">
        <span className="text-sm font-semibold text-slate-800">
          Open exhibit
        </span>

        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ backgroundColor: color }}
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
