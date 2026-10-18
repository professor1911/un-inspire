import axios from "axios";
import { localItems } from "../data/content.js";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const http = axios.create({ baseURL: API_BASE, timeout: 4000 });

/**
 * Fetch content items by type, e.g. fetchItems("person", { category: "Advisor" }).
 * If the Express/MongoDB backend isn't running (common while the frontend is
 * previewed on its own), this silently falls back to the bundled local
 * dataset in src/data/content.js so the site still renders fully.
 */
export async function fetchItems(type, params = {}) {
  try {
    const { data } = await http.get("/items", { params: { type, ...params } });
    return { items: data.items, source: "api" };
  } catch (err) {
    const items = localItems.filter((i) => {
      if (i.type !== type) return false;
      if (params.category && i.category !== params.category) return false;
      if (params.featured !== undefined && Boolean(i.featured) !== (params.featured === "true" || params.featured === true)) {
        return false;
      }
      return true;
    });
    const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const limited = params.limit ? sorted.slice(0, Number(params.limit)) : sorted;
    return { items: limited, source: "local" };
  }
}

/** Submit the contact form. Throws on failure so the form can show an error state. */
export async function submitContact(payload) {
  const { data } = await http.post("/contact", payload);
  return data;
}

export async function checkApiHealth() {
  try {
    await http.get("/health", { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

/* ---------------- Admin (content-management) helpers ----------------
 * These always hit the live API - there's no offline fallback, since
 * writing to a database inherently requires the backend to be running. */

export async function verifyAdminToken(token) {
  await http.get("/admin/verify", { headers: { "x-admin-token": token } });
}

export async function fetchAllItemsAdmin(type, token) {
  const { data } = await http.get("/items", { params: { type }, headers: { "x-admin-token": token } });
  return data.items;
}

export async function createItemAdmin(payload, token) {
  const { data } = await http.post("/items", payload, { headers: { "x-admin-token": token } });
  return data;
}

export async function deleteItemAdmin(id, token) {
  await http.delete(`/items/${id}`, { headers: { "x-admin-token": token } });
}

export async function updateItemAdmin(id, payload, token) {
  const { data } = await http.put(`/items/${id}`, payload, { headers: { "x-admin-token": token } });
  return data;
}
