import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

export default function LivingLabs() {
  const { t } = useTranslation();
  const [labs, setLabs] = useState(null);

  useEffect(() => {
    fetchItems("livingLab").then((r) => setLabs(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.livingLabs.eyebrow")}
        title={t("pages.livingLabs.title")}
        description={t("pages.livingLabs.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("livingLabShowcase.eyebrow")} title={t("livingLabShowcase.title")} />
        <div className="mt-10 sm:mt-12">
          {labs === null && <Loader label={t("common.loading")} />}
          {labs?.length === 0 && <EmptyState label={t("common.empty")} />}
          {labs && labs.length > 0 && (
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {labs.map((lab) => (
                <StaggerItem key={lab.title}>
                  <TiltCard className="border border-bay/15 p-6 sm:p-7 flex gap-4 bg-white/40 h-full">
                    <MapPin className="shrink-0 text-vermillion mt-1" size={22} />
                    <div>
                      <div className="font-display text-xl text-bay mb-2">{lab.title}</div>
                      <p className="text-ink/70 text-sm leading-relaxed">{lab.description}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
