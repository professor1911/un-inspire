import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ContourRule from "../components/ContourRule.jsx";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal.jsx";

export default function About() {
  const { t } = useTranslation();
  const pillarItems = t("pillars.items", { returnObjects: true });

  return (
    <div>
      <PageHero
        eyebrow={t("pages.about.eyebrow")}
        title={t("pages.about.title")}
        description={t("pages.about.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10 sm:gap-12">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{t("pages.about.vision")}</div>
          <p className="font-display text-xl sm:text-2xl text-bay leading-snug">{t("welcome.p2")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{t("pages.about.mission")}</div>
          <p className="text-ink/75 leading-relaxed text-base sm:text-lg">{t("welcome.p1")}</p>
        </Reveal>
      </section>

      <ContourRule />

      {/* The interactive wheel lives on Home; here the five pillars get a distinct,
          reference-style treatment so this page isn't just a repeat of the homepage. */}
      <section className="bg-paperDim">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
          <SectionHeading eyebrow={t("pillars.eyebrow")} title={t("pillars.title")} />
          <StaggerGroup className="mt-10 sm:mt-14 border-t border-bay/15">
            {pillarItems.map((p, i) => (
              <StaggerItem
                key={p.title}
                className="grid sm:grid-cols-12 gap-3 sm:gap-6 py-6 sm:py-7 border-b border-bay/15 items-baseline"
              >
                <div className="sm:col-span-1 font-mono text-sm text-vermillion">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="sm:col-span-4 font-display text-xl sm:text-2xl text-bay leading-snug">
                  {p.title}
                </div>
                <div className="sm:col-span-7 text-ink/70 leading-relaxed">{p.description}</div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Link
            to="/#pillars-wheel"
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-bay hover:text-vermillion transition-colors"
          >
            {t("home.pillarsCta")} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <ContourRule />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("welcome.leadership")} title={t("pages.about.leadership")} />
        <StaggerGroup className="mt-10 grid sm:grid-cols-2 gap-5 sm:gap-6">
          {[t("welcome.presidentMsg"), t("welcome.directorMsg")].map((m) => (
            <StaggerItem key={m} className="border border-bay/15 p-6 sm:p-8">
              <div className="font-display text-lg sm:text-xl text-bay">{m}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}
