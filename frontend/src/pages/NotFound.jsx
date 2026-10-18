import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-4">{t("notFound.code")}</div>
      <h1 className="font-display text-4xl text-bay mb-4">{t("notFound.title")}</h1>
      <p className="text-ink/60 mb-8">{t("notFound.body")}</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-bay text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-vermillion transition-colors"
      >
        {t("notFound.backHome")}
      </Link>
    </div>
  );
}
