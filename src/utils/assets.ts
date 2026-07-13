/**
 * Returns the correct URL for an asset, accounting for the base path in production.
 * In development (where base is "/"), it returns the path as-is.
 *
 * @param path - The asset path (can be null/undefined)
 * @returns The full asset URL, or an empty string if path is falsy
 */
export function getAssetUrl(path: string | null | undefined): string {
  if (!path) return ''; // handle null/undefined/empty string gracefully

  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return base + clean;
}