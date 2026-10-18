import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const SIZE = 440;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 200;
const R_INNER = 92;
const GAP_DEG = 2.4;

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function segmentPath(startDeg, endDeg) {
  const [x1, y1] = polar(CX, CY, R_OUTER, startDeg);
  const [x2, y2] = polar(CX, CY, R_OUTER, endDeg);
  const [x3, y3] = polar(CX, CY, R_INNER, endDeg);
  const [x4, y4] = polar(CX, CY, R_INNER, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${R_INNER} ${R_INNER} 0 ${large} 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
}

const PALETTE = ["#17394D", "#5C7A5E", "#C98A2B", "#BF4E3A", "#3F5942"];

export default function PillarsWheel({ pillars, centerLine1 = "5 Strategic", centerLine2 = "Pillars" }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const n = pillars.length || 5;
  const step = 360 / n;

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="relative mx-auto" style={{ width: SIZE, maxWidth: "100%" }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-auto"
          role="img"
          aria-label={t("common.pillarsAriaLabel")}
        >
          {/* faint contour rings behind the wheel, echoing the site's topographic motif */}
          {[R_OUTER + 26, R_OUTER + 52].map((r) => (
            <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="#17394D" strokeOpacity="0.08" />
          ))}

          {pillars.map((p, i) => {
            const start = i * step + GAP_DEG / 2;
            const end = (i + 1) * step - GAP_DEG / 2;
            const isActive = active === i;
            const [lx, ly] = polar(CX, CY, (R_OUTER + R_INNER) / 2, start + (end - start) / 2);
            return (
              <g key={p.title}>
                <motion.path
                  d={segmentPath(start, end)}
                  fill={PALETTE[i % PALETTE.length]}
                  animate={{
                    opacity: isActive ? 1 : 0.32,
                    scale: isActive ? 1.035 : 1,
                  }}
                  style={{ transformOrigin: `${CX}px ${CY}px`, cursor: "pointer" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={p.title}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none"
                  style={{
                    fill: "#F0EDE3",
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          <circle cx={CX} cy={CY} r={R_INNER - 6} fill="#F0EDE3" stroke="#17394D" strokeOpacity="0.15" />
          <text
            x={CX}
            y={CY - 8}
            textAnchor="middle"
            style={{ fill: "#17394D", fontFamily: "Fraunces, serif", fontSize: 15, fontWeight: 600 }}
          >
            {centerLine1}
          </text>
          <text
            x={CX}
            y={CY + 14}
            textAnchor="middle"
            style={{ fill: "#17394D", fontFamily: "Fraunces, serif", fontSize: 15, fontWeight: 600 }}
          >
            {centerLine2}
          </text>
        </svg>
      </div>

      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-2">
              {t("common.pillarLabel", { current: String(active + 1).padStart(2, "0"), total: String(n).padStart(2, "0") })}
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-bay mb-4">
              {pillars[active]?.title}
            </h3>
            <p className="text-ink/75 leading-relaxed max-w-md">
              {pillars[active]?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mt-8">
          {pillars.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                active === i
                  ? "border-vermillion text-vermillion bg-vermillion/5"
                  : "border-bay/20 text-bay/60 hover:border-bay/50"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
