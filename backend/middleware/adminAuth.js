import crypto from "node:crypto";

/**
 * Minimal admin gate for the content-management endpoints. Checks the
 * request against ADMIN_TOKEN in backend/.env via an `x-admin-token`
 * header. This is intentionally simple (no user accounts, no sessions) -
 * it's meant to keep the write API from being wide open on a public
 * deployment, not to be a full auth system. Swap in real auth (JWT +
 * roles, an SSO provider, etc.) before handling sensitive data.
 */

// Brute-force protection: only WRONG tokens are counted, per client IP. Once an IP
// has MAX_FAILURES misses inside the window it is locked out (even a correct token
// is refused), so a guess cannot succeed after the lockout. In-memory, per process.
const MAX_FAILURES = 10;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map(); // ip -> { count, resetAt }

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of failures) if (now > entry.resetAt) failures.delete(ip);
}, 60 * 1000).unref();

function lockoutSecondsLeft(ip) {
  const entry = failures.get(ip);
  if (!entry || Date.now() > entry.resetAt || entry.count < MAX_FAILURES) return 0;
  return Math.ceil((entry.resetAt - Date.now()) / 1000);
}

function recordFailure(ip) {
  const now = Date.now();
  const entry = failures.get(ip);
  if (!entry || now > entry.resetAt) failures.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else entry.count += 1;
}

function tokensMatch(provided, configured) {
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(configured).digest();
  return crypto.timingSafeEqual(a, b);
}

export function requireAdmin(req, res, next) {
  const ip = req.ip;

  const wait = lockoutSecondsLeft(ip);
  if (wait > 0) {
    res.set("Retry-After", String(wait));
    return res.status(429).json({ error: "Too many failed attempts. Try again later." });
  }

  const configured = process.env.ADMIN_TOKEN;
  if (!configured) {
    console.error("[admin] ADMIN_TOKEN is not set in backend/.env - refusing all admin requests.");
    return res.status(401).json({ error: "Missing or invalid admin token." });
  }

  const provided = req.header("x-admin-token");
  if (provided && tokensMatch(provided, configured)) {
    failures.delete(ip);
    return next();
  }

  recordFailure(ip);
  return res.status(401).json({ error: "Missing or invalid admin token." });
}
