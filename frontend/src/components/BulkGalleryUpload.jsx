import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";
import { createItemAdmin } from "../api/client.js";

const MAX_BYTES = 700 * 1024;

const inputCls = "w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none";

// The file's declared type and its first bytes must both say "image": a renamed HTML/script file is refused.
async function looksLikeImage(file) {
  const type = file.type;
  if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(type)) return false;
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const ascii = (from, to) => String.fromCharCode(...b.slice(from, to));
  if (type === "image/png") return b[0] === 0x89 && ascii(1, 4) === "PNG";
  if (type === "image/jpeg") return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (type === "image/gif") return ascii(0, 4) === "GIF8";
  return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
}

export default function BulkGalleryUpload({ token, categories, onDone }) {
  const { t } = useTranslation();
  const fileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [errors, setErrors] = useState([]);

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;

    const tooLarge = [];
    const notImages = [];
    const valid = [];

    for (const file of files) {
      if (file.size > MAX_BYTES) tooLarge.push(file.name);
      else if (!(await looksLikeImage(file))) notImages.push(file.name);
      else valid.push(file);
    }

    const problems = [
      ...tooLarge.map((n) => `${n}: exceeds 700 KB`),
      ...notImages.map((n) => `${n}: not a PNG, JPEG, WebP or GIF image`),
    ];
    if (problems.length) setErrors((prev) => [...prev, ...problems]);

    valid.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, { name: file.name, data: reader.result, caption: "" }]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(idx) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateCaption(idx, val) {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, caption: val } : img)));
  }

  async function handleUpload() {
    if (!category) {
      setErrors(["Please select a category"]);
      return;
    }
    if (!images.length) return;

    setUploading(true);
    setErrors([]);
    setProgress({ done: 0, total: images.length });

    const failed = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        await createItemAdmin(
          {
            type: "galleryPhoto",
            title: img.caption || img.name.replace(/\.[^.]+$/, ""),
            category,
            image: img.data,
            order: 0,
          },
          token
        );
      } catch {
        failed.push(img.name);
      }
      setProgress({ done: i + 1, total: images.length });
    }

    setUploading(false);
    if (failed.length) {
      setErrors(failed.map((n) => `Failed to upload: ${n}`));
      setImages((prev) => prev.filter((img) => failed.includes(img.name)));
    } else {
      setImages([]);
      setCategory("");
    }
    onDone();
  }

  return (
    <div className="border border-dashed border-bay/25 p-6 mb-12 bg-white/40">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ochreText mb-4">
        <ImagePlus size={16} />
        Bulk Upload — Gallery Photos
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="bulk-category" className="block font-mono text-xs uppercase tracking-wide text-bay/75 mb-1.5">
            {t("admin.categoryLabel")}
          </label>
          <select id="bulk-category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            <option value="" disabled>Select category for all photos</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bulk-files" className="block font-mono text-xs uppercase tracking-wide text-bay/75 mb-1.5">
            Select Images
          </label>
          <label className="flex items-center gap-3 border border-bay/25 bg-white px-4 py-3 cursor-pointer hover:border-vermillion transition-colors">
            <Upload size={18} className="text-bay/70" />
            <span className="font-mono text-sm text-bay/75">
              {images.length ? `${images.length} image(s) selected — click to add more` : "Click to select images…"}
            </span>
            <input
              ref={fileRef}
              id="bulk-files"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
          </label>
          <p className="text-xs text-bay/65 font-mono mt-1">Max 700 KB per image · JPG, PNG, WebP</p>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group border border-bay/10 bg-paperDim">
                <img src={img.data} alt="" className="w-full aspect-square object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  aria-label={`${t("common.removeImage")}: ${img.name}`}
                  className="absolute top-1 right-1 w-8 h-8 rounded-full bg-vermillion text-paper flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                <input
                  type="text"
                  value={img.caption}
                  onChange={(e) => updateCaption(idx, e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full border-t border-bay/10 bg-white px-2 py-1.5 text-xs focus:border-vermillion outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((err, i) => (
              <p key={i} className="text-xs text-vermillion font-mono">{err}</p>
            ))}
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-mono text-bay/70">
              <Loader2 size={14} className="animate-spin" />
              Uploading {progress.done} / {progress.total}…
            </div>
            <div className="w-full h-2 bg-bay/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-vermillion transition-all duration-300"
                style={{ width: `${(progress.done / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !images.length}
          className="inline-flex items-center gap-2 bg-vermillion text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors disabled:opacity-60"
        >
          {uploading ? `Uploading…` : `Upload ${images.length} Photo${images.length !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
