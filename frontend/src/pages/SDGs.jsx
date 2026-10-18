import VideoBand from "../components/VideoBand.jsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import SdgRing from "../components/SdgRing.jsx";
import PageIllustration from "../components/PageIllustration.jsx";
import aBetterWorldSvg from "../assets/illustrations/a-better-world.svg";
import { SDG_META } from "../data/sdgMeta.js";

const FILTERS = [
  { key: "all", labelKey: "filterAll" },
  { key: "people", labelKey: "peopleP" },
  { key: "planet", labelKey: "planetP" },
  { key: "prosperity", labelKey: "prosperityP" },
  { key: "peace", labelKey: "peaceP" },
  { key: "partnership", labelKey: "partnershipP" },
];

export default function SDGs() {
  const { t } = useTranslation();
  const goals = t("sdgGoals", { returnObjects: true });
  const [filter, setFilter] = useState("all");

  const visible = SDG_META.filter((g) => filter === "all" || g.category === filter);

  return (
    <div>
      {/* Hero, with the animated 17-dot ring as the page's signature visual */}
      <section className="relative overflow-hidden bg-bay text-paper bg-contours">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 sm:pt-20 pb-14 sm:pb-16 grid md:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{t("pages.sdgs.eyebrow")}</div>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.08] max-w-xl">{t("pages.sdgs.title")}</h1>
            <p className="mt-5 text-paper/70 max-w-lg leading-relaxed">{t("pages.sdgs.description")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5 flex justify-center"
          >
            <SdgRing className="w-56 sm:w-64 md:w-72" />
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
                  filter === f.key ? "bg-bay text-paper border-bay" : "border-bay/25 text-bay/70 hover:border-bay"
                }`}
              >
                {t(`pages.sdgs.${f.labelKey}`)}
              </button>
            ))}
          </div>
          <PageIllustration
            src={aBetterWorldSvg}
            alt="Illustration representing a better, more sustainable world"
            className="w-32 sm:w-36 shrink-0 hidden sm:block"
            float={false}
          />
        </div>

        {/* Goal grid */}
        <AnimatePresence mode="wait">
          <StaggerGroup
            key={filter}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5"
          >
            {visible.map((g) => {
              const goal = goals[g.number - 1];
              const Icon = g.icon;
              return (
                <StaggerItem key={g.number}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="border border-bay/15 bg-white/50 p-5 h-full flex flex-col"
                    style={{ borderTopWidth: 3, borderTopColor: g.color }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-bay/40">{String(g.number).padStart(2, "0")}</span>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: g.color }}
                      >
                        <Icon size={16} />
                      </div>
                    </div>
                    <div className="font-display text-base text-bay leading-snug mb-2">{goal?.title}</div>
                    <p className="text-xs text-ink/60 leading-relaxed">{goal?.description}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </AnimatePresence>
      </div>
      <VideoBand bandKey="sdgs" videoId="video-02" dim />
    </div>
  );
}
