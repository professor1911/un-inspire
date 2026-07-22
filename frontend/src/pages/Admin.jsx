import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Lock, Unlock } from "lucide-react";
import { verifyAdminToken, fetchAllItemsAdmin, createItemAdmin, deleteItemAdmin } from "../api/client.js";

const TYPE_CONFIG = {
  person: {
    label: "People",
    categories: ["Principal Investigator", "Project Member", "India Team", "Postdoctoral Researcher", "Graduate Student", "Support Staff", "Advisor"],
    fields: ["title", "category", "order"],
  },
  publication: {
    label: "Publications",
    categories: ["Journal Article", "Book", "Book Chapter", "Conference Paper", "Policy Brief", "Technical Report"],
    fields: ["title", "subtitle", "category", "date", "link", "order"],
  },
  event: {
    label: "Events",
    categories: ["Workshop", "Seminar", "Conference", "Training Programme"],
    fields: ["title", "subtitle", "category", "date", "order"],
  },
  news: {
    label: "News & Media",
    categories: ["News", "Press Release", "Media Coverage"],
    fields: ["title", "description", "category", "date", "link", "order"],
  },
  resource: {
    label: "Resources",
    categories: ["Datasets", "Reports", "Educational Materials", "Presentations"],
    fields: ["title", "category", "link", "order"],
  },
};

const SESSION_KEY = "ut-inspire-admin-token";
const emptyForm = { title: "", subtitle: "", category: "", description: "", date: "", link: "", order: 0 };

export default function Admin() {
  const { t } = useTranslation();
  const [token, setToken] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [checking, setChecking] = useState(false);

  const [type, setType] = useState("person");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [items, setItems] = useState([]);
  const [listError, setListError] = useState("");

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
      const data = await fetchAllItemsAdmin(type, token);
      setItems(data);
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

  function updateField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    try {
      const payload = { type, ...form, order: Number(form.order) || 0 };
      await createItemAdmin(payload, token);
      setForm(emptyForm);
      setSaveMsg(t("admin.added"));
      refreshList();
    } catch (err) {
      setSaveMsg(err?.response?.data?.error || t("admin.loadError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(t("admin.confirmDelete"))) return;
    try {
      await deleteItemAdmin(id, token);
      refreshList();
    } catch {
      setListError(t("admin.loadError"));
    }
  }

  const cfg = TYPE_CONFIG[type];

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md px-5 py-24">
        <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">{t("admin.title")}</div>
        <h1 className="font-display text-3xl text-bay mb-2">{t("admin.title")}</h1>
        <p className="text-ink/60 text-sm mb-8">{t("admin.subtitle")}</p>
        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
              {t("admin.tokenLabel")}
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t("admin.tokenPlaceholder")}
              required
              className="w-full border border-bay/25 bg-white/50 px-4 py-3 focus:border-vermillion outline-none"
            />
          </div>
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
            onClick={() => {
              setType(key);
              setForm(emptyForm);
              setSaveMsg("");
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-colors ${
              type === key ? "bg-bay text-paper border-bay" : "border-bay/25 text-bay/70 hover:border-bay"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleAdd} className="border border-bay/15 p-6 space-y-4 mb-12 bg-white/40">
        {cfg.fields.includes("title") && (
          <div>
            <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
              {t("admin.titleLabel")}
            </label>
            <input
              required
              value={form.title}
              onChange={updateField("title")}
              className="w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none"
            />
          </div>
        )}
        {cfg.fields.includes("subtitle") && (
          <div>
            <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
              {t("admin.subtitleLabel")}
            </label>
            <input
              value={form.subtitle}
              onChange={updateField("subtitle")}
              className="w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none"
            />
          </div>
        )}
        {cfg.fields.includes("description") && (
          <div>
            <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
              {t("admin.descriptionLabel")}
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={updateField("description")}
              className="w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none resize-none"
            />
          </div>
        )}
        <div className="grid sm:grid-cols-3 gap-4">
          {cfg.fields.includes("category") && (
            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("admin.categoryLabel")}
              </label>
              <select
                required
                value={form.category}
                onChange={updateField("category")}
                className="w-full border border-bay/25 bg-white px-3 py-2.5 focus:border-vermillion outline-none"
              >
                <option value="" disabled>
                  -
                </option>
                {cfg.categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
          {cfg.fields.includes("date") && (
            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("admin.dateLabel")}
              </label>
              <input
                type="date"
                value={form.date}
                onChange={updateField("date")}
                className="w-full border border-bay/25 bg-white px-3 py-2.5 focus:border-vermillion outline-none"
              />
            </div>
          )}
          {cfg.fields.includes("order") && (
            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("admin.orderLabel")}
              </label>
              <input
                type="number"
                value={form.order}
                onChange={updateField("order")}
                className="w-full border border-bay/25 bg-white px-3 py-2.5 focus:border-vermillion outline-none"
              />
            </div>
          )}
        </div>
        {cfg.fields.includes("link") && (
          <div>
            <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
              {t("admin.linkLabel")}
            </label>
            <input
              value={form.link}
              onChange={updateField("link")}
              placeholder="https://…"
              className="w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-vermillion text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors disabled:opacity-60"
        >
          {saving ? t("admin.adding") : t("admin.addButton")}
        </button>
        {saveMsg && <p className="text-sm font-mono text-terrace">{saveMsg}</p>}
      </form>

      <div>
        <div className="font-mono text-xs uppercase tracking-wider text-bay/50 mb-4">
          {t("admin.existingItems")} - {cfg.label}
        </div>
        {listError && <p className="text-sm text-vermillion font-mono mb-4">{listError}</p>}
        <div className="divide-y divide-bay/10 border-t border-b border-bay/10">
          {items.map((it) => (
            <div key={it._id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <div className="font-display text-base text-bay">{it.title}</div>
                <div className="text-xs text-ink/50 font-mono">{it.category}</div>
              </div>
              <button
                onClick={() => handleDelete(it._id)}
                aria-label={t("admin.delete")}
                className="shrink-0 w-9 h-9 flex items-center justify-center text-bay/40 hover:text-vermillion transition-colors"
              >
                <Trash2 size={16} />
              </button>
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
