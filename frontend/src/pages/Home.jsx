import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchItems } from "../api/client.js";
import PillarsWheel from "../components/PillarsWheel.jsx";
import MarqueeBanner from "../components/MarqueeBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ContourRule from "../components/ContourRule.jsx";
import SakuraPetals from "../components/SakuraPetals.jsx";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader } from "../components/Loader.jsx";

export default function Home() {
  const { t, i18n } = useTranslation();
  const isJa = i18n.language === "ja";
  const [pillars, setPillars] = useState(null);
  const [labs, setLabs] = useState(null);
  const [news, setNews] = useState(null);
  const [events, setEvents] = useState(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const translatedPillars = t("pillars.items", { returnObjects: true });

  useEffect(() => {
    fetchItems("pillar").then((r) => setPillars(r.items));
    fetchItems("livingLab").then((r) => setLabs(r.items));
    fetchItems("news", { limit: 3 }).then((r) => setNews(r.items));
    fetchItems("event", { limit: 3 }).then((r) => setEvents(r.items));
  }, []);

  // Merge live/local API data with the translated pillar copy so the wheel
  // stays bilingual even though pillar text is only stored in the i18n dictionary.
  const wheelPillars = (pillars || []).map((p, i) => ({
    ...p,
    title: translatedPillars[i]?.title || p.title,
    description: translatedPillars[i]?.description || p.description,
  }));

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-bay text-paper">
        <motion.div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            y: bgY,
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #C98A2B 0, transparent 45%), radial-gradient(circle at 85% 75%, #5C7A5E 0, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-contours opacity-40" aria-hidden="true" />
        <SakuraPetals />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto max-w-7xl px-5 md:px-8 pt-24 pb-20 sm:pt-28 sm:pb-24 md:pt-36 md:pb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ochre mb-5">
              {t("hero.eyebrow")}
            </div>
            <h1 className={`font-display text-[2.1rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl ${isJa ? "font-displayJp" : ""}`}>
              {t("hero.titleLine1")} {t("hero.titleLine2")}{" "}
              <span className="text-ochre">{t("hero.titleAccent")}</span> {t("hero.titleEnd")}
            </h1>
            <p className="mt-6 sm:mt-7 max-w-xl text-paper/75 text-base sm:text-lg leading-relaxed">
              {t("hero.body")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 bg-vermillion text-paper px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors"
                >
                  {t("hero.ctaPrimary")} <ArrowUpRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/living-labs"
                  className="inline-flex items-center gap-2 border border-paper/30 px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-sm uppercase tracking-wide hover:border-paper hover:bg-paper/5 transition-colors"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <ContourRule />

      {/* Welcome / Context */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeading eyebrow={t("welcome.eyebrow")} title={t("welcome.title")} />
          </div>
          <div className="md:col-span-7 space-y-6 text-ink/75 leading-relaxed">
            <Reveal><p>{t("welcome.p1")}</p></Reveal>
            <Reveal delay={0.08}><p>{t("welcome.p2")}</p></Reveal>
            <StaggerGroup className="pt-2 grid sm:grid-cols-2 gap-4">
              <StaggerItem className="border border-bay/15 p-5">
                <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-2">
                  {t("welcome.leadership")}
                </div>
                <div className="font-display text-lg text-bay">{t("welcome.presidentMsg")}</div>
              </StaggerItem>
              <StaggerItem className="border border-bay/15 p-5">
                <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-2">
                  {t("welcome.leadership")}
                </div>
                <div className="font-display text-lg text-bay">{t("welcome.directorMsg")}</div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      <ContourRule />

      {/* Interactive Feature: 5 Strategic Pillars */}
      <section className="bg-paperDim" id="pillars-wheel">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-28">
          <SectionHeading eyebrow={t("pillars.eyebrow")} title={t("pillars.title")} description={t("pillars.hint")} />
          <div className="mt-10 sm:mt-14">
            {pillars ? (
              <PillarsWheel
                pillars={wheelPillars}
                centerLine1={t("pillars.centerLine1")}
                centerLine2={t("pillars.centerLine2")}
              />
            ) : (
              <Loader label={t("common.loading")} />
            )}
          </div>
        </div>
      </section>

      <ContourRule />

      {/* Flagship Research - a summary here; the full four-area breakdown lives on /research so it isn't duplicated */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-5">
            <SectionHeading eyebrow={t("flagship.eyebrow")} title={t("flagship.title")} />
          </div>
          <Reveal className="md:col-span-7">
            <p className="text-ink/75 leading-relaxed text-base sm:text-lg max-w-xl">{t("flagship.description")}</p>
            <Link
              to="/research"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-bay hover:text-vermillion transition-colors"
            >
              {t("flagship.cta")} <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <ContourRule />

      {/* Living Lab Showcase - a 3-of-5 teaser; the full set lives on /living-labs */}
      <section className="bg-bay text-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-28">
          <SectionHeading
            eyebrow={t("livingLabShowcase.eyebrow")}
            title={t("livingLabShowcase.title")}
            description={t("livingLabShowcase.description")}
            variant="dark"
          />
          <StaggerGroup className="mt-10 sm:mt-12 grid sm:grid-cols-2 gap-4 sm:gap-5">
            {(labs ? labs.slice(0, 3) : Array.from({ length: 3 })).map((lab, i) => (
              <StaggerItem key={lab?.title || i} className="border border-paper/15 p-6 flex gap-4">
                <MapPin className="shrink-0 text-ochre mt-1" size={20} />
                <div>
                  <div className="font-display text-xl mb-1.5">
                    {lab ? lab.title : <span className="opacity-0">placeholder</span>}
                  </div>
                  <p className="text-paper/65 text-sm leading-relaxed">{lab?.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Link
            to="/living-labs"
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-paper/80 hover:text-ochre transition-colors"
          >
            {t("home.livingLabCta")} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <ContourRule />

      {/* Global Partners & Impact */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-28">
        <SectionHeading eyebrow={t("impact.eyebrow")} title={t("impact.title")} />
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { stat: 6, label: t("impact.stat1") },
            { stat: 20, label: t("impact.stat2"), suffix: "+" },
            { stat: 5, label: t("impact.stat3") },
          ].map((m) => (
            <div key={m.label} className="text-center border border-bay/10 py-8 sm:py-10 px-4">
              <div className="font-display text-4xl sm:text-5xl text-vermillion">
                <AnimatedCounter to={m.stat} suffix={m.suffix || ""} />
              </div>
              <div className="mt-2 text-sm text-ink/60 font-mono uppercase tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4 border border-ochre/30 bg-ochre/5 px-6 py-5">
          <div className="font-mono text-xs uppercase tracking-wider text-ochre">{t("impact.featuredPartner")}</div>
          <div className="font-display text-lg text-bay">Indian Institute of Technology Kharagpur (IIT Kharagpur), India</div>
        </Reveal>
      </section>

      <ContourRule />

      {/* Latest News, Events & Blogs */}
      <section className="bg-paperDim">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 md:py-28">
          <SectionHeading eyebrow={t("stayCurrent.eyebrow")} title={t("stayCurrent.title")} />
          <div className="mt-10 sm:mt-12 grid lg:grid-cols-2 gap-8 sm:gap-10">
            <Reveal>
              <div className="font-mono text-xs uppercase tracking-wider text-bay/50 mb-4">
                {t("stayCurrent.newsLabel")}
              </div>
              <div className="space-y-4">
                {(news || Array.from({ length: 3 })).map((n, i) => (
                  <div key={n?.title || i} className="border-b border-bay/10 pb-4">
                    <div className="font-display text-lg text-bay">{n?.title}</div>
                    <div className="text-sm text-ink/60 mt-1">{n?.description}</div>
                  </div>
                ))}
              </div>
              <Link to="/news-media" className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-bay hover:text-vermillion">
                {t("stayCurrent.allNews")} <ArrowUpRight size={15} />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="font-mono text-xs uppercase tracking-wider text-bay/50 mb-4">
                {t("stayCurrent.eventsLabel")}
              </div>
              <div className="space-y-4">
                {(events || Array.from({ length: 3 })).map((e, i) => (
                  <div key={e?.title || i} className="border-b border-bay/10 pb-4 flex justify-between gap-4">
                    <div>
                      <div className="font-display text-lg text-bay">{e?.title}</div>
                      <div className="text-sm text-ink/60 mt-1">{e?.subtitle}</div>
                    </div>
                    {e?.date && (
                      <div className="font-mono text-xs text-vermillion whitespace-nowrap shrink-0">
                        {new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link to="/events" className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-bay hover:text-vermillion">
                {t("stayCurrent.fullCalendar")} <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeBanner />
    </div>
  );
}
