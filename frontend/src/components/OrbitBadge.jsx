import { motion } from "framer-motion";

const SIZE = 168;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 66;

function polar(angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
}

/**
 * centerIcon: {icon, color}
 * satellites: [{icon, color}] - placed evenly around the center and slowly
 * orbiting as a group, echoing the "central concept + orbiting facets"
 * composition without reusing any external illustration.
 *
 * NOTE (demo/licensing): same as AnimatedIcon.jsx - this is an original
 * placeholder for demo purposes, not a reproduction of any licensed stock
 * illustration pack. Swap the icon/color props for licensed artwork later
 * if the team decides to purchase a pack for production.
 */
export default function OrbitBadge({ centerIcon, satellites = [], size = 168, label, className = "" }) {
  const CenterIcon = centerIcon.icon;
  const scale = size / SIZE;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className={`inline-flex flex-col items-center gap-2 ${className}`}
    >
      <div style={{ width: size, height: size, position: "relative" }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={size} height={size}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={centerIcon.color} strokeOpacity="0.15" />
      </svg>

      {/* center */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: 52 * scale,
          height: 52 * scale,
          left: CX * scale,
          top: CY * scale,
          transform: "translate(-50%, -50%)",
          backgroundColor: `${centerIcon.color}1A`,
          border: `1px solid ${centerIcon.color}35`,
        }}
      >
        <CenterIcon size={22 * scale} color={centerIcon.color} strokeWidth={1.6} />
      </div>

      {/* orbiting satellites - the whole ring rotates slowly */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size }}
      >
        {satellites.map((s, i) => {
          const [x, y] = polar((360 / satellites.length) * i);
          const SatIcon = s.icon;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full flex items-center justify-center"
              // counter-rotate so each icon stays upright while the ring orbits
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{
                width: 34 * scale,
                height: 34 * scale,
                left: x * scale,
                top: y * scale,
                transform: "translate(-50%, -50%)",
                backgroundColor: `${s.color}1A`,
                border: `1px solid ${s.color}35`,
              }}
            >
              <SatIcon size={15 * scale} color={s.color} strokeWidth={1.6} />
            </motion.div>
          );
        })}
      </motion.div>
      </div>
      {label && (
        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-bay/50 text-center max-w-[9rem] leading-tight">
          {label}
        </span>
      )}
    </motion.div>
  );
}
