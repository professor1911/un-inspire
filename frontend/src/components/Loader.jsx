export function Loader({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-3 py-16 justify-center font-mono text-sm text-bay/60">
      <span className="w-2 h-2 rounded-full bg-vermillion animate-pulse" />
      {label}…
    </div>
  );
}

export function EmptyState({ label = "Nothing here yet." }) {
  return (
    <div className="py-16 text-center font-mono text-sm text-bay/50 border border-dashed border-bay/20 rounded-sm">
      {label}
    </div>
  );
}
