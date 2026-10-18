import MediaStrip from "../components/MediaStrip.jsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import PageIllustration from "../components/PageIllustration.jsx";
import continuousLearningSvg from "../assets/illustrations/continuous-learning.svg";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

export default function Education() {
  const { t } = useTranslation();
  const [components, setComponents] = useState(null);

  useEffect(() => {
    fetchItems("educationComponent").then((r) => setComponents(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.education.eyebrow")}
        title={t("pages.education.title")}
        description={t("pages.education.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-12 gap-8 items-center mb-6">
          <SectionHeading
            eyebrow={t("nav.education")}
            title={t("pages.education.title")}
            className="md:col-span-8"
          />
          <PageIllustration
            src={continuousLearningSvg}
            alt="Illustration of continuous learning"
            className="md:col-span-4 max-w-[220px] mx-auto hidden md:block"
          />
        </div>
        <div className="mt-10 sm:mt-12">
          {components === null && <Loader label={t("common.loading")} />}
          {components?.length === 0 && <EmptyState label={t("common.empty")} />}
          {components && components.length > 0 && (
            <StaggerGroup className="space-y-0 border-t border-bay/15">
              {components.map((c, i) => (
                <StaggerItem key={c.title} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 py-6 border-b border-bay/15">
                  <div className="sm:col-span-1 font-mono text-xs text-vermillion">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="sm:col-span-4 font-display text-xl text-bay">{c.title}</div>
                  <div className="sm:col-span-7 text-ink/70 leading-relaxed">{c.description}</div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
      <MediaStrip stripKey="education" />
    </div>
  );
}
