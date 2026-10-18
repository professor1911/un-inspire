import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading.jsx";
import ContourRule from "./ContourRule.jsx";
import { StaggerGroup, StaggerItem } from "./Reveal.jsx";
import { STRIPS, photoById } from "../data/media.js";

/** A four-photo strip with captions and a link to the full gallery. Photo ids come from STRIPS in data/media.js. */
export default function MediaStrip({ stripKey, dim = true }) {
  const { t, i18n } = useTranslation();
  const ja = i18n.language === "ja";
  const items = (STRIPS[stripKey] || []).map(photoById).filter(Boolean);
  return (
    <>
      <ContourRule />
      <section className={dim ? "bg-paperDim" : ""}>
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow={t(`strips.${stripKey}.eyebrow`)} title={t(`strips.${stripKey}.title`)} />
          <StaggerGroup className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((p) => (
              <StaggerItem key={p.image}>
                <figure>
                  <div className="overflow-hidden border border-bay/10 bg-paper aspect-square">
                    <motion.img
                      src={p.image}
                      alt={ja ? p.subtitle : p.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-ink/60 leading-snug">{ja ? p.subtitle : p.title}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Link
            to="/gallery"
            className="mt-10 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-bay hover:text-vermillion transition-colors"
          >
            {t("strips.cta")} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
