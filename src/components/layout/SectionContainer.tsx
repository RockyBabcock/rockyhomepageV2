import React from "react";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}
