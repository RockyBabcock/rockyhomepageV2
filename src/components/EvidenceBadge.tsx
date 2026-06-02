import React from "react";
import { cn } from "../lib/utils";
import { ExternalLink, Github } from "lucide-react";

type EvidenceBadgeProps = {
  type: "Live Demo" | "GitHub" | "Case Study" | "Prototype" | "Learning Log";
  href?: string;
  className?: string;
};

export function EvidenceBadge({ type, href, className }: EvidenceBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case "GitHub":
        return <Github className="w-3 h-3 mr-1.5" />;
      case "Live Demo":
        return <ExternalLink className="w-3 h-3 mr-1.5" />;
      default:
        return null;
    }
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-center border border-ink/10 dark:border-base/20 px-2.5 py-1 text-[10px] uppercase font-mono tracking-[0.18em] text-ink/70 dark:text-base/70 bg-white/50 dark:bg-zinc-900/50 hover:bg-ink/5 dark:hover:bg-base/5 transition-colors",
        href && "cursor-pointer",
        className,
      )}
    >
      {getIcon()}
      {type}
    </span>
  );

  if (!href || href === "#" || href === "") {
    return content;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="no-underline">
      {content}
    </a>
  );
}
