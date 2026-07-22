/**
 * Minimal admin gate for the content-management endpoints. Checks the
 * request against ADMIN_TOKEN in backend/.env via an `x-admin-token`
 * header. This is intentionally simple (no user accounts, no sessions) -
 * it's meant to keep the write API from being wide open on a public
 * deployment, not to be a full auth system. Swap in real auth (JWT +
 * roles, an SSO provider, etc.) before handling sensitive data.
 */
export function requireAdmin(req, res, next) {
  const configured = process.env.ADMIN_TOKEN;

  if (!configured) {
    console.warn("[admin] ADMIN_TOKEN is not set in backend/.env - admin routes are unprotected.");
    return next();
  }

  const provided = req.header("x-admin-token");
  if (provided && provided === configured) {
    return next();
  }

  return res.status(401).json({ error: "Missing or invalid admin token." });
}
