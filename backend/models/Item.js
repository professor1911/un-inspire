import mongoose from "mongoose";

/**
 * Generic content item.
 *
 * UT-INSPIRE's site is content-heavy but structurally simple: people,
 * publications, events, news, partners, pillars, living-lab entries and
 * resources all share the same shape (title/name, category, description,
 * a few optional fields, a display order). Rather than maintaining nine
 * near-identical collections, everything lives in one `items` collection
 * distinguished by `type`. This keeps the schema easy to extend from the
 * admin side (Compass, Mongo shell, or a future CMS UI) without a migration.
 */

const HTTP_URL = /^https?:\/\/[^\s]+$/i;
const MAILTO = /^mailto:[^\s]+$/i;
const IMAGE_DATA_URL = /^data:image\/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/]+=*)$/;
const isSitePath = (v) => v.startsWith("/") && !v.startsWith("//") && !/\s/.test(v);

// Leading bytes of each allowed image format, so a renamed HTML/script file is refused.
function matchesImageSignature(mime, base64) {
  const head = Buffer.from(base64.slice(0, 24), "base64");
  switch (mime) {
    case "png":
      return head.length >= 4 && head[0] === 0x89 && head.toString("latin1", 1, 4) === "PNG";
    case "jpg":
    case "jpeg":
      return head.length >= 3 && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
    case "gif":
      return head.toString("latin1", 0, 4) === "GIF8";
    case "webp":
      return head.toString("latin1", 0, 4) === "RIFF" && head.toString("latin1", 8, 12) === "WEBP";
    default:
      return false;
  }
}

function isSafeLink(v) {
  return !v || HTTP_URL.test(v) || MAILTO.test(v) || isSitePath(v);
}

function isSafeImage(v) {
  if (!v || HTTP_URL.test(v) || isSitePath(v)) return true;
  const m = IMAGE_DATA_URL.exec(v);
  return !!m && matchesImageSignature(m[1], m[2]);
}

const safeLink = { validator: isSafeLink, message: "must be an http(s) or mailto link, or a site path", type: "safeUrl" };
const safeImage = { validator: isSafeImage, message: "must be an http(s) URL, a site path, or a real PNG/JPEG/WebP/GIF image", type: "safeImage" };

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "pillar",
        "researchTheme",
        "flagshipFocus",
        "educationComponent",
        "livingLab",
        "partnerCategory",
        "person",
        "publication",
        "event",
        "news",
        "resource",
        "galleryPhoto",
        "blogPost",
      ],
    },
    category: { type: String, default: "", trim: true, maxlength: 100 }, // e.g. "Graduate Student", "Journal Article"
    title: { type: String, required: true, trim: true, maxlength: 300 }, // name (people) or headline
    subtitle: { type: String, default: "", maxlength: 500 }, // role, affiliation, authors, venue
    description: { type: String, default: "", maxlength: 20000 },
    quote: { type: String, default: "", maxlength: 600 }, // e.g. "what sustainability means to me" on a person profile
    tags: {
      type: [{ type: String, maxlength: 60 }],
      validate: { validator: (a) => a.length <= 30, message: "has too many entries (max 30)", type: "maxItems" },
    },
    date: { type: Date },
    link: { type: String, default: "", maxlength: 2048, validate: safeLink },
    linkLabel: { type: String, default: "", maxlength: 60 }, // optional text for the link, e.g. "Faculty Profile"
    // URL, site path, or a base64 data URL from the admin upload. Kept under the 1 MB JSON body limit.
    image: { type: String, default: "", maxlength: 1_000_000, validate: safeImage },
    title_ja: { type: String, default: "", trim: true, maxlength: 300 },
    subtitle_ja: { type: String, default: "", maxlength: 500 },
    description_ja: { type: String, default: "", maxlength: 20000 },
    quote_ja: { type: String, default: "", maxlength: 600 },
    category_ja: { type: String, default: "", trim: true, maxlength: 100 },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Serves the public list query (filter by type, sorted by order/date/createdAt) straight from the index.
itemSchema.index({ type: 1, order: 1, date: -1, createdAt: -1 });

export default mongoose.model("Item", itemSchema);
