import { useEffect, useRef, useState } from "react";

/**
 * A muted, looping, inline video (the "GIF" behaviour) that is kind to the page:
 *  - plays only while on screen, pauses when scrolled away (saves CPU/battery)
 *  - shows the poster still instead of moving for visitors who prefer reduced motion or have Data Saver on
 */
export default function LoopVideo({ src, poster, width, height, label, className = "", eager = false }) {
  const ref = useRef(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reduced || saveData) {
      setStill(true);
      return undefined;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    el.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = width && height ? { aspectRatio: `${width} / ${height}` } : undefined;

  if (still) return <img src={poster} alt={label} className={className} style={style} />;
  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-label={label}
    />
  );
}
