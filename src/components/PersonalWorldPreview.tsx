import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
        "group lab-card lab-card-hover relative p-6 personal-world-card",
        "flex flex-col justify-between",
        className,
      )}
      style={{
        boxShadow: `0 24px 70px ${color}20`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl opacity-45"
        style={{ backgroundColor: color }}
      />

      <div>
        <div
          className="inline-flex rounded-full border bg-white/75 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em]"
          style={{
            color,
            borderColor: `${color}55`,
          }}
        >
          {eyebrow}
        </div>

        <h3 className="mt-6 font-space text-3xl font-bold tracking-[-0.04em] text-slate-950">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-800">
          Open exhibit
        </span>

        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ backgroundColor: color }}
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
