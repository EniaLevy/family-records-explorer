/**
 * Returns the correct asset URL with the base path prepended.
 * In development, base is '/'. In production, it's '/family-records-explorer/'.
 * Handles null/undefined and strips leading slashes to avoid double slashes.
 */
export function getAssetUrl(path: string | null | undefined): string {
    if (!path) return '';
    const base = import.meta.env.PROD ? '/family-records-explorer/' : '/';
    const clean = path.startsWith('/') ? path.slice(1) : path;
    return base + clean;
}