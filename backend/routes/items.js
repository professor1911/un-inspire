import { gzipSync } from "node:zlib";
import { Router } from "express";
import Item from "../models/Item.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

const MAX_LIMIT = 500;
const ITEM_TYPES = Item.schema.path("type").enumValues;
const OBJECT_ID = /^[a-f\d]{24}$/i;
const DATA_IMAGE = /^data:(image\/(?:png|jpe?g|webp|gif));base64,(.+)$/s;
const SELF_IMAGE_URL = /\/api\/items\/[a-f\d]{24}\/image(?:\?|$)/i;

const FAILURE_REASONS = {
  required: "is required",
  enum: "is not an allowed value",
  maxlength: "is too long",
  maxItems: "has too many entries",
  safeUrl: "must be an http(s) or mailto link, or a site path",
  safeImage: "must be an http(s) URL, a site path, or a real PNG/JPEG/WebP/GIF image",
};

/**
 * Field-level message for schema validation failures (e.g. "title: is required"),
 * so the admin form can show what to fix without exposing raw database errors.
 */
function validationMessage(err) {
  if (err.name !== "ValidationError") return null;
  return Object.values(err.errors)
    .map((e) => `${e.path}: ${FAILURE_REASONS[e.kind] || FAILURE_REASONS[e.properties?.type] || "is invalid"}`)
    .join("; ");
}

const isAdminRequest = (req) => Boolean(req.header("x-admin-token"));

// Short-lived in-memory cache of serialized public list responses. Content only changes when an
// admin saves, and every write clears it, so visitors never see stale data for long; a repeat
// read costs almost nothing instead of a database query plus JSON serialization.
// Per process: with several instances, another instance's cache may lag a write by up to the TTL.
const LIST_CACHE_TTL_MS = 30_000;
const LIST_CACHE_MAX_ENTRIES = 200;
const listCache = new Map(); // "<origin><url>" -> { body, expires }
const clearListCache = () => listCache.clear();

const LIST_CACHE_CONTROL = "public, max-age=30, stale-while-revalidate=60";

// Decoded image files, kept in memory up to a byte budget (oldest evicted first) so a repeat
// request does not re-read a several-hundred-KB document from MongoDB. Keyed by id + ?v=.
const IMAGE_CACHE_MAX_BYTES = 64 * 1024 * 1024;
const imageCache = new Map(); // "<id>:<v>" -> { mime, buf }
let imageCacheBytes = 0;

function rememberImage(key, entry) {
  if (entry.buf.length > IMAGE_CACHE_MAX_BYTES / 4) return;
  while (imageCacheBytes + entry.buf.length > IMAGE_CACHE_MAX_BYTES && imageCache.size) {
    const [oldKey, old] = imageCache.entries().next().value;
    imageCache.delete(oldKey);
    imageCacheBytes -= old.buf.length;
  }
  imageCache.set(key, entry);
  imageCacheBytes += entry.buf.length;
}

function forgetImages(id) {
  for (const [key, entry] of imageCache) {
    if (key.startsWith(`${id}:`)) {
      imageCache.delete(key);
      imageCacheBytes -= entry.buf.length;
    }
  }
}

/**
 * GET /api/items?type=person&category=Advisor&featured=true&limit=3&page=2
 * Public read endpoint used by every content page on the site.
 *
 * Images uploaded through the admin are stored inline as base64 (hundreds of KB each).
 * List responses never carry that data: those images are replaced by a small, cacheable
 * URL (/api/items/:id/image) that the browser loads separately and caches.
 */
router.get("/", async (req, res) => {
  try {
    const admin = isAdminRequest(req);
    const cacheKey = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    if (!admin) {
      const hit = listCache.get(cacheKey);
      if (hit && hit.expires > Date.now()) {
        res.set("Cache-Control", LIST_CACHE_CONTROL);
        res.vary("Accept-Encoding");
        // Serve the pre-compressed copy so a cache hit does no per-request compression work.
        if (req.acceptsEncodings("gzip", "identity") === "gzip") {
          res.set("Content-Encoding", "gzip");
          return res.type("json").send(hit.gzip);
        }
        return res.type("json").send(hit.body);
      }
    }

    const { type, category, featured, limit, page } = req.query;
    const query = {};

    // Query-string objects (?category[$ne]=x) must never reach the Mongo filter.
    if (type !== undefined && type !== "") {
      if (typeof type !== "string" || !ITEM_TYPES.includes(type)) {
        return res.status(400).json({ error: "Unknown item type." });
      }
      query.type = type;
    }
    if (category !== undefined && category !== "") {
      if (typeof category !== "string") {
        return res.status(400).json({ error: "category must be a string." });
      }
      query.category = category;
    }
    if (featured) query.featured = featured === "true";

    let pageSize = MAX_LIMIT;
    if (limit !== undefined && limit !== "") {
      const n = typeof limit === "string" ? Number(limit) : NaN;
      if (!Number.isInteger(n) || n < 1 || n > MAX_LIMIT) {
        return res.status(400).json({ error: `limit must be a whole number between 1 and ${MAX_LIMIT}.` });
      }
      pageSize = n;
    }

    let pageNumber = 1;
    if (page !== undefined && page !== "") {
      const p = typeof page === "string" ? Number(page) : NaN;
      if (!Number.isInteger(p) || p < 1 || p > 100000) {
        return res.status(400).json({ error: "page must be a whole number of 1 or more." });
      }
      pageNumber = p;
    }

    const [items, total] = await Promise.all([
      Item.aggregate([
        { $match: query },
        { $sort: { order: 1, date: -1, createdAt: -1 } },
        { $skip: (pageNumber - 1) * pageSize },
        { $limit: pageSize },
        {
          $addFields: {
            image: { $cond: [{ $regexMatch: { input: "$image", regex: "^data:" } }, "__inline__", "$image"] },
          },
        },
      ]),
      Item.countDocuments(query),
    ]);

    const imageBase = `${req.protocol}://${req.get("host")}/api/items`;
    for (const doc of items) {
      if (doc.image === "__inline__") {
        doc.image = `${imageBase}/${doc._id}/image?v=${new Date(doc.updatedAt).getTime()}`;
      }
    }

    const body = JSON.stringify({ count: items.length, total, page: pageNumber, items });
    if (admin) {
      res.set("Cache-Control", "no-store");
    } else {
      if (listCache.size >= LIST_CACHE_MAX_ENTRIES) listCache.clear();
      listCache.set(cacheKey, { body, gzip: gzipSync(body), expires: Date.now() + LIST_CACHE_TTL_MS });
      res.set("Cache-Control", LIST_CACHE_CONTROL);
    }
    res.type("json").send(body);
  } catch (err) {
    console.error("[items] list failed:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

/** GET /api/items/:id/image - serves an inline (base64) image as a real, cacheable image file */
router.get("/:id/image", async (req, res) => {
  try {
    if (!OBJECT_ID.test(req.params.id)) return res.status(400).json({ error: "Invalid id" });

    // The URL carries ?v=<updatedAt>, so a changed image gets a new URL and old ones can cache for a year.
    const sendImage = ({ mime, buf }) => {
      res.set("Content-Type", mime);
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.send(buf);
    };

    const cacheKey = `${req.params.id}:${typeof req.query.v === "string" ? req.query.v : ""}`;
    const cached = imageCache.get(cacheKey);
    if (cached) return sendImage(cached);

    const doc = await Item.findById(req.params.id).select("image").lean();
    if (!doc || !doc.image) return res.status(404).json({ error: "Image not found" });

    const match = DATA_IMAGE.exec(doc.image);
    if (!match) {
      if (/^https?:\/\//i.test(doc.image)) return res.redirect(302, doc.image);
      return res.status(404).json({ error: "Image not found" });
    }

    const entry = { mime: match[1], buf: Buffer.from(match[2], "base64") };
    rememberImage(cacheKey, entry);
    sendImage(entry);
  } catch (err) {
    console.error("[items] image failed:", err);
    res.status(500).json({ error: "Failed to load image" });
  }
});

/** GET /api/items/:id - one full item (including inline image data, used by the admin editor) */
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.set("Cache-Control", isAdminRequest(req) ? "no-store" : "public, max-age=30");
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

/** POST /api/items - create a content item (admin only) */
router.post("/", requireAdmin, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    clearListCache();
    res.status(201).json(item);
  } catch (err) {
    const reason = validationMessage(err);
    if (!reason) console.error("[items] create failed:", err);
    res.status(400).json({ error: reason ? `Invalid item - ${reason}` : "Failed to create item" });
  }
});

/**
 * PUT /api/items/:id (admin only)
 * Send the item's current `__v` to get stale-write protection: if someone else saved in
 * between, the update is refused with 409 instead of silently overwriting their change.
 */
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    if (!OBJECT_ID.test(req.params.id)) return res.status(400).json({ error: "Invalid id" });

    const { _id, __v, createdAt, updatedAt, ...changes } = req.body || {};

    // Lists expose inline images as URLs; saving that URL back must not replace the stored image data.
    if (typeof changes.image === "string" && SELF_IMAGE_URL.test(changes.image)) {
      delete changes.image;
    }

    const filter = { _id: req.params.id };
    const hasVersion = __v !== undefined && __v !== null && __v !== "";
    if (hasVersion) {
      const version = Number(__v);
      if (!Number.isInteger(version)) return res.status(400).json({ error: "__v must be a whole number." });
      filter.__v = version;
    }

    const item = await Item.findOneAndUpdate(
      filter,
      { $set: changes, $inc: { __v: 1 } },
      { new: true, runValidators: true }
    );
    if (!item) {
      if (hasVersion && (await Item.exists({ _id: req.params.id }))) {
        return res.status(409).json({ error: "This item was changed by someone else. Reload it and try again." });
      }
      return res.status(404).json({ error: "Item not found" });
    }
    clearListCache();
    forgetImages(req.params.id);
    res.json(item);
  } catch (err) {
    const reason = validationMessage(err);
    if (!reason) console.error("[items] update failed:", err);
    res.status(400).json({ error: reason ? `Invalid item - ${reason}` : "Failed to update item" });
  }
});

/** DELETE /api/items/:id */
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    clearListCache();
    forgetImages(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    console.error("[items] delete failed:", err);
    res.status(400).json({ error: "Failed to delete item" });
  }
});

export default router;
