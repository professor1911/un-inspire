const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: Math.round((i / 14) * 100 + (i % 3) * 2),
  delay: (i * 1.7) % 12,
  duration: 10 + ((i * 3) % 8),
  scale: 0.6 + ((i % 4) / 4) * 0.7,
}));

/** Purely decorative - aria-hidden, and disabled site-wide under prefers-reduced-motion. */
export default function SakuraPetals({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
}
