import React from "react";

type MuseumButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  as?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
};

export function MuseumButton({
  children,
  className = "",
  variant = "primary",
  as: Component = "button",
  ...props
}: MuseumButtonProps) {
  const baseStyles = "inline-flex items-center justify-center transition-colors duration-300 rounded";
  
  let variantStyles = "";
  if (variant === "primary") {
    variantStyles = "border border-orange-500 bg-orange-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--museum-text)] shadow-[0_0_15px_rgba(217,119,6,0.1)] hover:bg-orange-500/20";
  } else if (variant === "secondary") {
    variantStyles = "border border-stone-700 bg-stone-950/60 px-4 py-3 text-sm text-[var(--museum-text-muted)] hover:bg-stone-800";
  } else if (variant === "ghost") {
    variantStyles = "px-3 py-2 text-sm text-[var(--museum-text-faint)] hover:text-[var(--museum-text-muted)] hover:bg-stone-800/50 rounded-md";
  }

  return (
    <Component className={`${baseStyles} ${variantStyles} ${className}`} {...(props as any)}>
      {children}
    </Component>
  );
}
