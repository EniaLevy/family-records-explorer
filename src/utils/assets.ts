/**
 * Returns the correct URL for an asset, accounting for the base path in production.
 * In development (where base is "/"), it returns the path as-is.
 */
export function getAssetUrl(path: string): string {
  // In production, we need to add the base prefix.
  // In development, import.meta.env.BASE_URL is "/" (as set in vite.config),
  // so we can just return the path.
  // But if path starts with "/", we remove it to avoid double slash when prepending.
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  // In development, base is "/", so base + clean = "/" + clean = "/clean" – same as original absolute path.
  // In production, base is "/family-records-explorer/", so we get "/family-records-explorer/clean".
  return base + clean;
}