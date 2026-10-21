import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Lock, Unlock, Pencil } from "lucide-react";
import {
  verifyAdminToken,
  fetchAllItemsAdmin,
  createItemAdmin,
  updateItemAdmin,
  deleteItemAdmin,
} from "../api/client.js";
import ImageUploadField from "../components/ImageUploadField.jsx";
import BulkGalleryUpload from "../components/BulkGalleryUpload.jsx";

/**
 * One config per content type: which fields its form shows (and therefore saves).
 * Only the listed fields are ever sent on save, so editing never blanks a field the form doesn't show.
 */
const TYPE_CONFIG = {
  person: {
    label: "People",
    categories: ["Principal Investigator", "Project Member", "India Team", "Postdoctoral Researcher", "Graduate Student", "Support Staff", "Advisor"],
    fields: ["title", "subtitle", "category", "description", "quote", "image", "link", "linkLabel", "order"],
    jaFields: ["title_ja", "subtitle_ja", "description_ja", "quote_ja"],
  },
  publication: {
    label: "Publications",
    categories: ["Journal Article", "Book", "Book Chapter", "Conference Paper", "Policy Brief", "Technical Report"],
    fields: ["title", "subtitle", "category", "date", "link", "order"],
    jaFields: ["title_ja", "subtitle_ja"],
  },
  event: {
    label: "Events",
    categories: ["Workshop", "Seminar", "Conference", "Training Programme"],
    fields: ["title", "subtitle", "category", "date", "order"],
    jaFields: ["title_ja", "subtitle_ja"],
  },
  news: {
    label: "News & Media",
    categories: ["News", "Press Release", "Media Coverage"],
    fields: ["title", "description", "category", "date", "link", "order"],
    jaFields: ["title_ja", "description_ja"],
  },
  resource: {
    label: "Resources",
    categories: ["Datasets", "Reports", "Educational Materials", "Presentations"],
    fields: ["title", "category", "link", "order"],
    jaFields: ["title_ja"],
  },
  galleryPhoto: {
    label: "Gallery Photos",
    categories: ["Nature & Seasons", "Campus", "City & Heritage", "Festivals", "Coast & Waterways", "Field Research", "Living Labs", "Events", "Partnerships"],
    fields: ["title", "subtitle", "category", "image", "order"],
    jaFields: ["title_ja"],
  },
  livingLab: { label: "Living Labs", categories: [], fields: ["title", "description", "order"], jaFields: ["title_ja", "description_ja"] },
  educationComponent: { label: "Education programs", categories: [], fields: ["title", "description", "order"], jaFields: ["title_ja", "description_ja"] },
  researchTheme: { label: "Research themes", categories: [], fields: ["title", "order"], jaFields: ["title_ja"] },
  partnerCategory: { label: "Partner categories", categories: [], fields: ["title", "order"], jaFields: ["title_ja"] },
  blogPost: {
    label: "Student Blog",
    categories: ["Field Report", "Research Insight", "Student Life", "Reflection"],
    fields: ["title", "subtitle", "category", "description", "date", "image", "order"],
    jaFields: ["title_ja", "subtitle_ja", "description_ja"],
  },
};

const SESSION_KEY = "ut-inspire-admin-token";
const emptyForm = { title: "", subtitle: "", category: "", description: "", quote: "", date: "", link: "", linkLabel: "", order: 0, image: "", title_ja: "", subtitle_ja: "", description_ja: "", quote_ja: "", category_ja: "" };
const toForm = (it) => ({
  title: it.title || "",
  subtitle: it.subtitle || "",
  category: it.category || "",
  description: it.description || "",
  quote: it.quote || "",
  date: it.date ? String(it.date).slice(0, 10) : "",
  link: it.link || "",
  linkLabel: it.linkLabel || "",
  order: it.order ?? 0,
  image: it.image || "",
  title_ja: it.title_ja || "",
  subtitle_ja: it.subtitle_ja || "",
  description_ja: it.description_ja || "",
  quote_ja: it.quote_ja || "",
  category_ja: it.category_ja || "",
});

const inputCls = "w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none";
const labelCls = "block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5";
const Field = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className={labelCls}>{label}</label>
    {children}
  </div>
);

export default function Admin() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [token, setToken] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [checking, setChecking] = useState(false);

  const [type, setType] = useState("person");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [items, setItems] = useState([]);
  const [listError, setListError] = useState("");

  const cfg = TYPE_CONFIG[type];
  const has = (f) => cfg.fields.includes(f);
  const set = (f) => (e) => setForm((s) => ({ ...s, [f]: e.target.value }));

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setToken(stored);
      verifyAdminToken(stored)
        .then(() => setUnlocked(true))
        .catch(() => sessionStorage.removeItem(SESSION_KEY));
    }
  }, []);

  useEffect(() => {
    if (unlocked) refreshList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, type]);

  async function refreshList() {
    setListError("");
    try {
      setItems(await fetchAllItemsAdmin(type, token));
    } catch {
      setListError(t("admin.loadError"));
    }
  }

  async function handleUnlock(e) {
    e.preventDefault();
    setChecking(true);
    setAuthError("");
    try {
      await verifyAdminToken(token);
      sessionStorage.setItem(SESSION_KEY, token);
      setUnlocked(true);
    } catch {
      setAuthError(t("admin.invalidToken"));
    } finally {
      setChecking(false);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setToken("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function switchType(key) {
    setType(key);
    resetForm();
    setSaveMsg("");
  }

  function startEdit(item) {
    setEditingId(item._id);
    setForm(toForm(item));
    setSaveMsg("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    const payload = {};
    cfg.fields.forEach((f) => {
      if (f === "order") payload.order = Number(form.order) || 0;
      else if (f === "date") payload.date = form.date || null;
      else payload[f] = form[f];
    });
    (cfg.jaFields || []).forEach((f) => {
      payload[f] = form[f] || "";
    });
    try {
      if (editingId) {
        await updateItemAdmin(editingId, payload, token);
        setSaveMsg(t("admin.saved"));
      } else {
        await createItemAdmin({ type, ...payload }, token);
        setSaveMsg(t("admin.added"));
      }
      resetForm();
      refreshList();
    } catch (err) {
      setSaveMsg(err?.response?.data?.detail || err?.response?.data?.error || t("admin.loadError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(t("admin.confirmDelete"))) return;
    try {
      await deleteItemAdmin(id, token);
      if (id === editingId) resetForm();
      refreshList();
    } catch {
      setListError(t("admin.loadError"));
    }
  }

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md px-5 py-24">
        <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{t("admin.title")}</div>
        <h1 className="font-display text-3xl text-bay mb-2">{t("admin.title")}</h1>
        <p className="text-ink/60 text-sm mb-8">{t("admin.subtitle")}</p>
        <form onSubmit={handleUnlock} className="space-y-4">
          <Field id="admin-token" label={t("admin.tokenLabel")}>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t("admin.tokenPlaceholder")}
              required
              className={inputCls}
            />
          </Field>
          <button
            type="submit"
            disabled={checking}
            className="inline-flex items-center gap-2 bg-vermillion text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors disabled:opacity-60"
          >
            <Lock size={15} /> {t("admin.unlock")}
          </button>
          {authError && <p className="text-sm text-vermillion font-mono">{authError}</p>}
        </form>
      </div>
    );
  }

  const catOptions =
    form.category && !cfg.categories.includes(form.category) ? [form.category, ...cfg.categories] : cfg.categories;

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{t("admin.title")}</div>
          <h1 className="font-display text-3xl text-bay">{t("admin.title")}</h1>
          <p className="text-ink/60 text-sm mt-1">{t("admin.subtitle")}</p>
        </div>
        <button
          onClick={lock}
          className="shrink-0 inline-flex items-center gap-2 border border-bay/25 px-4 py-2 font-mono text-xs uppercase tracking-wide text-bay hover:border-vermillion hover:text-vermillion transition-colors"
        >
          <Unlock size={14} /> {t("admin.lockAgain")}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(TYPE_CONFIG).map(([key, c]) => (
          <button
            key={key}
            onClick={() => switchType(key)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-colors ${
              type === key ? "bg-bay text-paper border-bay" : "border-bay/25 text-bay/70 hover:border-bay"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`border p-6 space-y-4 mb-12 scroll-mt-28 ${editingId ? "border-ochre bg-ochre/5" : "border-bay/15 bg-white/40"}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-xs uppercase tracking-wider text-ochre">
            {editingId ? `${t("admin.editing")}: ${form.title || "…"}` : t("admin.addNew")} · {cfg.label}
          </div>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="font-mono text-xs uppercase tracking-wide text-bay/60 hover:text-vermillion"
            >
              {t("admin.cancelEdit")}
            </button>
          )}
        </div>

        {has("title") && (
          <Field id="f-title" label={type === "galleryPhoto" ? t("admin.captionLabel") : t("admin.titleLabel")}>
            <input id="f-title" required value={form.title} onChange={set("title")} className={inputCls} />
          </Field>
        )}
        {has("image") && <ImageUploadField value={form.image} onChange={(v) => setForm((s) => ({ ...s, image: v }))} />}
        {has("subtitle") && (
          <Field id="f-subtitle" label={type === "galleryPhoto" ? t("admin.captionJaLabel") : t("admin.subtitleLabel")}>
            <input id="f-subtitle" value={form.subtitle} onChange={set("subtitle")} className={inputCls} />
          </Field>
        )}
        {has("description") && (
          <Field id="f-description" label={type === "person" ? t("admin.bioLabel") : t("admin.descriptionLabel")}>
            <textarea id="f-description" rows={type === "person" ? 5 : 3} value={form.description} onChange={set("description")} className={`${inputCls} resize-y`} />
          </Field>
        )}
        {has("quote") && (
          <Field id="f-quote" label={t("admin.quoteLabel")}>
            <textarea id="f-quote" rows={2} maxLength={600} value={form.quote} onChange={set("quote")} className={`${inputCls} resize-none`} />
          </Field>
        )}

        {(has("category") || has("date") || has("order")) && (
          <div className="grid sm:grid-cols-3 gap-4">
            {has("category") && (
              <Field id="f-category" label={t("admin.categoryLabel")}>
                <select id="f-category" required value={form.category} onChange={set("category")} className={inputCls}>
                  <option value="" disabled>-</option>
                  {catOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            )}
            {has("date") && (
              <Field id="f-date" label={t("admin.dateLabel")}>
                <input id="f-date" type="date" value={form.date} onChange={set("date")} className={inputCls} />
              </Field>
            )}
            {has("order") && (
              <Field id="f-order" label={t("admin.orderLabel")}>
                <input id="f-order" type="number" value={form.order} onChange={set("order")} className={inputCls} />
              </Field>
            )}
          </div>
        )}

        {(cfg.jaFields || []).length > 0 && (
          <div className="border-t border-bay/15 pt-4 mt-2">
            <div className="font-mono text-xs uppercase tracking-wider text-vermillion mb-3">🇯🇵 Japanese translations (optional)</div>
            <div className="space-y-4">
              {cfg.jaFields.includes("title_ja") && (
                <Field id="f-title-ja" label="タイトル (Japanese title)">
                  <input id="f-title-ja" value={form.title_ja} onChange={set("title_ja")} placeholder="日本語のタイトル" className={inputCls} />
                </Field>
              )}
              {cfg.jaFields.includes("subtitle_ja") && (
                <Field id="f-subtitle-ja" label="サブタイトル (Japanese subtitle)">
                  <input id="f-subtitle-ja" value={form.subtitle_ja} onChange={set("subtitle_ja")} placeholder="日本語のサブタイトル" className={inputCls} />
                </Field>
              )}
              {cfg.jaFields.includes("description_ja") && (
                <Field id="f-description-ja" label="説明 (Japanese description)">
                  <textarea id="f-description-ja" rows={3} value={form.description_ja} onChange={set("description_ja")} placeholder="日本語の説明" className={`${inputCls} resize-y`} />
                </Field>
              )}
              {cfg.jaFields.includes("quote_ja") && (
                <Field id="f-quote-ja" label="ひとこと (Japanese quote)">
                  <textarea id="f-quote-ja" rows={2} maxLength={600} value={form.quote_ja} onChange={set("quote_ja")} placeholder="日本語のひとこと" className={`${inputCls} resize-none`} />
                </Field>
              )}
            </div>
          </div>
        )}

        {has("link") && (
          <Field id="f-link" label={type === "person" ? t("admin.profileLinkLabel") : t("admin.linkLabel")}>
            <input id="f-link" value={form.link} onChange={set("link")} placeholder="https://…" className={inputCls} />
          </Field>
        )}
        {has("linkLabel") && (
          <Field id="f-linkLabel" label={t("admin.linkTextLabel")}>
            <input id="f-linkLabel" maxLength={60} value={form.linkLabel} onChange={set("linkLabel")} placeholder="Faculty Profile" className={inputCls} />
          </Field>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-vermillion text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors disabled:opacity-60"
        >
          {saving ? t("admin.adding") : editingId ? t("admin.saveChanges") : t("admin.addButton")}
        </button>
        {saveMsg && <p className="text-sm font-mono text-terrace" role="status">{saveMsg}</p>}
      </form>

      {type === "galleryPhoto" && (
        <BulkGalleryUpload token={token} categories={cfg.categories} onDone={refreshList} />
      )}

      <div>
        <div className="font-mono text-xs uppercase tracking-wider text-bay/50 mb-4">
          {t("admin.existingItems")} - {cfg.label} ({items.length})
        </div>
        {listError && <p className="text-sm text-vermillion font-mono mb-4">{listError}</p>}
        <div className="divide-y divide-bay/10 border-t border-b border-bay/10">
          {items.map((it) => (
            <div
              key={it._id}
              className={`py-3 px-2 flex items-center justify-between gap-4 ${it._id === editingId ? "bg-ochre/10" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {it.image && <img src={it.image} alt="" className="w-9 h-9 rounded object-cover border border-bay/10 shrink-0" />}
                <div className="min-w-0">
                  <div className="font-display text-base text-bay truncate">{it.title}</div>
                  <div className="text-xs text-ink/50 font-mono truncate">{it.category || it.subtitle}</div>
                </div>
              </div>
              <div className="flex shrink-0">
                <button
                  onClick={() => startEdit(it)}
                  aria-label={`${t("admin.edit")} ${it.title}`}
                  className="w-9 h-9 flex items-center justify-center text-bay/40 hover:text-ochre transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(it._id)}
                  aria-label={`${t("admin.delete")} ${it.title}`}
                  className="w-9 h-9 flex items-center justify-center text-bay/40 hover:text-vermillion transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && !listError && (
            <div className="py-6 text-sm text-ink/40 font-mono">{t("common.empty")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
