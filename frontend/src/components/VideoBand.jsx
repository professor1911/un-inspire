import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading.jsx";
import ContourRule from "./ContourRule.jsx";
import VideoCard from "./VideoCard.jsx";
import { videoById } from "../data/media.js";

/**
 * A self-contained section: short copy on one side, a looping video on the other.
 * Copy comes from the `bands.<bandKey>` block in the locale files. Append it to the end of a
 * page (or drop it between two existing sections) - it never touches the sections around it.
 */
export default function VideoBand({ bandKey, videoId, reverse = false, dim = false, cta, ruleAbove = true }) {
  const { t } = useTranslation();
  const video = videoById(videoId);
  const k = `bands.${bandKey}`;
  return (
    <>
      {ruleAbove && <ContourRule />}
      <section className={dim ? "bg-paperDim" : ""}>
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-24 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
            <SectionHeading eyebrow={t(`${k}.eyebrow`)} title={t(`${k}.title`)} description={t(`${k}.body`)} />
            {cta && (
              <Link
                to={cta.to}
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-bay hover:text-vermillion transition-colors"
              >
                {t(`${k}.cta`)} <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
          <div className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
            <VideoCard video={video} />
          </div>
        </div>
      </section>
    </>
  );
}
