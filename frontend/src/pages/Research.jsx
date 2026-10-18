import MediaStrip from "../components/MediaStrip.jsx";
import VideoBand from "../components/VideoBand.jsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ContourRule from "../components/ContourRule.jsx";
import TiltCard from "../components/TiltCard.jsx";
import PageIllustration from "../components/PageIllustration.jsx";
import researchingSvg from "../assets/illustrations/researching.svg";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

const FOCUS_AREAS = [
  "Farmland abandonment and land-use transitions",
  "Fisheries and coastal livelihood transitions",
  "Climate-resilient agriculture",
  "Sustainable coastal systems and communities",
];
const FOCUS_AREAS_JA = [
  "耕作放棄地と土地利用の転換",
  "漁業と沿岸地域の生業の転換",
  "気候変動に強い農業",
  "持続可能な沿岸システムと地域社会",
];

export default function Research() {
  const { t, i18n } = useTranslation();
  const isJa = i18n.language === "ja";
  const [themes, setThemes] = useState(null);

  useEffect(() => {
    fetchItems("researchTheme").then((r) => setThemes(r.items));
  }, []);

  const focus = isJa ? FOCUS_AREAS_JA : FOCUS_AREAS;

  return (
    <div>
      <PageHero
        eyebrow={t("pages.research.eyebrow")}
        title={t("pages.research.title")}
        description={t("pages.research.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-12 gap-8 items-center mb-4">
          <SectionHeading
            eyebrow={t("flagship.eyebrow")}
            title="ReACT"
            description={t("flagship.description")}
            className="md:col-span-8"
          />
          <PageIllustration
            src={researchingSvg}
            alt="Illustration of a researcher analyzing data"
            className="md:col-span-4 max-w-[220px] mx-auto hidden md:block"
          />
        </div>
        <StaggerGroup className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {focus.map((f, i) => (
            <StaggerItem key={f}>
              <TiltCard className="border border-bay/15 p-6 h-full">
                <div className="font-mono text-xs text-vermillion mb-3">{String(i + 1).padStart(2, "0")}</div>
                <div className="font-display text-lg text-bay leading-snug">{f}</div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <ContourRule />

      <section className="bg-paperDim">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow={t("nav.research")} title={isJa ? "8つの横断的テーマ" : "Eight themes, one research agenda"} />
          <div className="mt-10 sm:mt-12">
            {themes === null && <Loader label={t("common.loading")} />}
            {themes?.length === 0 && <EmptyState label={t("common.empty")} />}
            {themes && themes.length > 0 && (
              <StaggerGroup className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {themes.map((th, i) => (
                  <StaggerItem key={th.title} className="bg-white/50 border border-bay/10 p-5">
                    <div className="font-mono text-xs text-bay/40 mb-2">{String(i + 1).padStart(2, "0")}</div>
                    <div className="font-display text-base text-bay leading-snug">{th.title}</div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </div>
      </section>

      <ContourRule />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={isJa ? "研究施設" : "Facilities"} title={isJa ? "研究が行われる場所" : "Where the research happens"} />
        <StaggerGroup className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-ink/75">
          {(isJa
            ? [
                { t: "フィールド・リビングラボ拠点", d: "実地試験に用いる、富山県内の沿岸部・農村部の拠点。" },
                { t: "環境制御型農業施設", d: "応用研究のための、水耕栽培・環境制御インフラ。" },
                { t: "GRASS研究センター", d: "五福キャンパス内の、先端サステナビリティ科学研究センター。" },
              ]
            : [
                { t: "Field Living Lab Sites", d: "Coastal and rural sites across Toyama Prefecture used for on-the-ground trials." },
                { t: "Controlled Environment Facilities", d: "Hydroponics and climate-controlled growing infrastructure for applied research." },
                { t: "GRASS Research Centre", d: "The Global Research Centre for Advanced Sustainability Science on Gofuku Campus." },
              ]
          ).map((f) => (
            <StaggerItem key={f.t} className="border border-bay/15 p-6">
              <div className="font-display text-lg text-bay mb-2">{f.t}</div>
              <p className="text-sm leading-relaxed">{f.d}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
      <VideoBand bandKey="research" videoId="video-05" dim />
      <MediaStrip stripKey="research" dim={false} />
    </div>
  );
}
