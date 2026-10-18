import { useTranslation } from "react-i18next";

/**
 * Returns a helper that picks the Japanese field when the UI is in Japanese
 * and falls back to the English field otherwise.
 *
 *   const loc = useLocalized();
 *   loc(item, "title")      // item.title_ja when ja, else item.title
 *   loc(item, "description") // item.description_ja when ja, else item.description
 */
export function useLocalized() {
  const { i18n } = useTranslation();
  const isJa = i18n.language === "ja";

  return (item, field) => {
    if (!item) return "";
    if (isJa) {
      const jaVal = item[`${field}_ja`];
      if (jaVal) return jaVal;
    }
    return item[field] || "";
  };
}

export function useDateLocale() {
  const { i18n } = useTranslation();
  return i18n.language === "ja" ? "ja-JP" : "en-US";
}
