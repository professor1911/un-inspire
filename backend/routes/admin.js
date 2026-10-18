import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

/** GET /api/admin/verify - returns 200 iff the x-admin-token header is valid */
router.get("/verify", requireAdmin, (req, res) => {
  res.json({ ok: true });
});

export default router;
