import { motion } from "framer-motion";

const LOOP = {
  float: { y: [0, -7, 0] },
  pulse: { scale: [1, 1.09, 1] },
  spin: { rotate: 360 },
  sway: { rotate: [-4, 4, -4] },
};

/**
 * A small, on-brand animated icon badge used as a decorative accent near
 * section headings - the site's own take on the "labeled icon" motif,
 * built from lucide-react + framer-motion rather than any external
 * illustration asset. Continuous but subtle; respects reduced-motion via
 * the global CSS rule in index.css.
 *
 * NOTE (demo/licensing): these icons were designed as an original,
 * royalty-free stand-in inspired by a stock illustration pack shared for
 * reference during development - nothing from that pack is reproduced
 * here. If the team later decides to license that pack (or a similar one)
 * for production use, swap the `icon` prop for the licensed artwork and
 * budget for the licensing cost at that time; the `color`/`size`/`label`
 * API here is intentionally simple so that swap is a one-line change per
 * usage, not a redesign.
 */
export default function AnimatedIcon({
  icon: Icon,
  color = "#17394D",
  animation = "float",
  size = 60,
  duration = 3.2,
  label,
  className = "",
}) {
  const loop = LOOP[animation] || LOOP.float;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`inline-flex flex-col items-center gap-2 ${className}`}
    >
      <motion.div
        animate={loop}
        transition={{ duration, repeat: Infinity, ease: animation === "spin" ? "linear" : "easeInOut" }}
        className="rounded-full flex items-center justify-center"
        style={{ width: size, height: size, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={Math.round(size * 0.42)} color={color} strokeWidth={1.6} />
      </motion.div>
      {label && (
        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-bay/50 text-center max-w-[7rem] leading-tight">
          {label}
        </span>
      )}
    </motion.div>
  );
}
