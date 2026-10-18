import { Router } from "express";
import Item from "../models/Item.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

/**
 * GET /api/items?type=person&category=Advisor&featured=true
 * Public read endpoint used by every content page on the site.
 */
router.get("/", async (req, res) => {
  try {
    const { type, category, featured, limit } = req.query;
    const query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (featured) query.featured = featured === "true";

    let cursor = Item.find(query).sort({ order: 1, date: -1, createdAt: -1 });
    if (limit) cursor = cursor.limit(Number(limit));

    const items = await cursor.exec();
    res.json({ count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items", detail: err.message });
  }
});

/** GET /api/items/:id */
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid id", detail: err.message });
  }
});

/**
 * POST /api/items - create a content item (admin use, e.g. adding a new
 * publication or news post). No auth layer is wired up yet; see README
 * for notes on adding one (JWT + an admin role) before exposing this
 * publicly.
 */
router.post("/", requireAdmin, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: "Failed to create item", detail: err.message });
  }
});

/** PUT /api/items/:id */
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Failed to update item", detail: err.message });
  }
});

/** DELETE /api/items/:id */
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete item", detail: err.message });
  }
});

export default router;
