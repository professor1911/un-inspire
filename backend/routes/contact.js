import crypto from "node:crypto";
import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 254, subject: 200, message: 5000 };
const INBOX_PAGE_SIZE = 100;

/** POST /api/contact - public, called from the Contact page form */
router.post("/", async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};

    // Hidden "website" field: humans never fill it, bots usually do. Pretend it worked.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.status(201).json({ success: true });
    }

    const fields = {};
    for (const key of ["name", "email", "subject", "message"]) {
      const value = body[key];
      if (value === undefined || value === null || value === "") continue;
      if (typeof value !== "string") {
        return res.status(400).json({ error: `${key} must be text.` });
      }
      fields[key] = value.trim();
      if (fields[key].length > LIMITS[key]) {
        return res.status(400).json({ error: `${key} is too long (max ${LIMITS[key]} characters).` });
      }
    }

    if (!fields.name || !fields.email || !fields.message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    if (!EMAIL_PATTERN.test(fields.email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    const minuteBucket = Math.floor(Date.now() / 60000);
    const dedupeKey = crypto
      .createHash("sha256")
      .update(`${fields.email.toLowerCase()}\n${fields.message}\n${minuteBucket}`)
      .digest("hex");

    try {
      const saved = await ContactMessage.create({ ...fields, dedupeKey });
      return res.status(201).json({ success: true, id: saved._id });
    } catch (err) {
      if (err.code === 11000) {
        // Same message just arrived (retry/double click): report success, store once.
        return res.status(201).json({ success: true });
      }
      throw err;
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Please check your name, email and message and try again." });
    }
    console.error("[contact] save failed:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

/** GET /api/contact?page=1 - admin: submitted messages, newest first, 100 per page */
router.get("/", requireAdmin, async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const [messages, total] = await Promise.all([
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * INBOX_PAGE_SIZE)
        .limit(INBOX_PAGE_SIZE)
        .lean(),
      ContactMessage.estimatedDocumentCount(),
    ]);
    res.json({ count: messages.length, total, page, pageSize: INBOX_PAGE_SIZE, messages });
  } catch (err) {
    console.error("[contact] list failed:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
