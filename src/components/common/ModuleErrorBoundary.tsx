import React from "react";

type ModuleErrorBoundaryProps = {
  children: React.ReactNode;
  fallbackTitle?: string;
};

type ModuleErrorBoundaryState = {
  hasError: boolean;
};

export class ModuleErrorBoundary extends React.Component<
  ModuleErrorBoundaryProps,
  ModuleErrorBoundaryState
> {
  state: ModuleErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Museum module crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="border border-red-900/60 bg-stone-950/70 p-6 rounded-md">
          <div className="text-xs uppercase tracking-[0.25em] text-red-400 font-mono">
            Module Offline
          </div>
          <h3 className="mt-3 text-xl font-headline font-black uppercase text-stone-100 dark:text-stone-100">
            {this.props.fallbackTitle ?? "Exhibit temporarily unavailable"}
          </h3>
          <p className="mt-2 text-sm text-stone-500 font-mono">
            This module failed to load, but the rest of the museum remains online.
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}
