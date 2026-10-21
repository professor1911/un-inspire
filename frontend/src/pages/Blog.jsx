import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";
import { useLocalized, useDateLocale } from "../hooks/useLocalized.js";

export default function Blog() {
  const { t } = useTranslation();
  const loc = useLocalized();
  const dateLoc = useDateLocale();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchItems("blogPost").then((r) => setPosts(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.blog.eyebrow")}
        title={t("pages.blog.title")}
        description={t("pages.blog.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("nav.blog")} title={t("pages.blog.title")} />

        <div className="mt-10 sm:mt-12">
          {posts === null && <Loader label={t("common.loading")} />}
          {posts?.length === 0 && <EmptyState label={t("pages.blog.empty")} />}
          {posts && posts.length > 0 && (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <StaggerItem key={post._id || post.title}>
                  <article className="border border-bay/15 bg-white/40 flex flex-col h-full overflow-hidden">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={loc(post, "title")}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="font-mono text-xs uppercase tracking-wide text-ochre mb-2">
                        {loc(post, "category") || post.category}
                        {post.date && ` · ${new Date(post.date).toLocaleDateString(dateLoc, { year: "numeric", month: "short", day: "numeric" })}`}
                      </div>
                      <h3 className="font-display text-xl text-bay leading-snug mb-2">
                        {loc(post, "title")}
                      </h3>
                      {(post.subtitle || post.subtitle_ja) && (
                        <div className="text-sm text-vermillion font-mono mb-2">{loc(post, "subtitle")}</div>
                      )}
                      <p className="text-sm text-ink/65 leading-relaxed flex-1">
                        {loc(post, "description")}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
