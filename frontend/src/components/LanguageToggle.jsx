import { useTranslation } from "react-i18next";

export default function LanguageToggle({ className = "" }) {
  const { i18n } = useTranslation();
  const current = i18n.language;

  function setLang(lng) {
    if (lng !== current) i18n.changeLanguage(lng);
  }

  return (
    <div
      className={`inline-flex items-center border border-bay/25 rounded-full p-0.5 font-mono text-[0.68rem] uppercase tracking-wider ${className}`}
      role="group"
      aria-label="Language"
    >
      {[
        { code: "en", label: "EN" },
        { code: "ja", label: "日本語" },
      ].map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={current === l.code}
          className={`px-3 py-1 rounded-full transition-colors ${
            current === l.code ? "bg-bay text-paper" : "text-bay/60 hover:text-bay"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
