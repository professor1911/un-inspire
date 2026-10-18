import { motion } from "framer-motion";
import { SDG_META } from "../data/sdgMeta.js";

const SIZE = 260;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 104;

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export default function SdgRing({ className = "" }) {
  const n = SDG_META.length;
  return (
    <div className={className}>
      <motion.svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F0EDE3" strokeOpacity="0.15" />
        {SDG_META.map((g, i) => {
          const [x, y] = polar(CX, CY, R, (i / n) * 360);
          return <circle key={g.number} cx={x} cy={y} r={9} fill={g.color} />;
        })}
      </motion.svg>
    </div>
  );
}
