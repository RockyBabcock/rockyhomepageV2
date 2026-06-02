export function ModuleSkeleton({ label }: { label: string }) {
  return (
    <div className="border border-stone-800 bg-stone-950/60 p-6 min-h-[300px] flex flex-col justify-center">
      <div className="text-xs uppercase tracking-[0.25em] text-stone-500 font-mono">
        Loading Archive
      </div>
      <div className="mt-4 h-4 w-48 bg-stone-800/80 rounded" />
      <div className="mt-3 h-4 w-72 bg-stone-800/60 rounded" />
      <div className="mt-3 h-4 w-56 bg-stone-800/40 rounded" />
      <p className="mt-5 text-sm text-stone-500 font-mono">{label}</p>
    </div>
  );
}
