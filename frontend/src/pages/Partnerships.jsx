import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

export default function Partnerships() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchItems("partnerCategory").then((r) => setCategories(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.partnerships.eyebrow")}
        title={t("pages.partnerships.title")}
        description={t("pages.partnerships.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <Reveal className="border border-ochre/30 bg-ochre/5 px-6 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-14 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-wider text-ochre shrink-0">{t("impact.featuredPartner")}</div>
          <div className="font-display text-xl sm:text-2xl text-bay">
            Indian Institute of Technology Kharagpur (IIT Kharagpur), India
          </div>
        </Reveal>

        <SectionHeading eyebrow={t("nav.partnerships")} title={t("pages.partnerships.title")} />
        <div className="mt-10 sm:mt-12">
          {categories === null && <Loader label={t("common.loading")} />}
          {categories?.length === 0 && <EmptyState label={t("common.empty")} />}
          {categories && categories.length > 0 && (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {categories.map((c, i) => (
                <StaggerItem key={c.title} className="border border-bay/15 p-6">
                  <div className="font-mono text-xs text-bay/40 mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <div className="font-display text-lg text-bay">{c.title}</div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
