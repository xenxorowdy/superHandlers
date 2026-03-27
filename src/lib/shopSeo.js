const SITE_URL = "https://www.superhandlerslift.com";

export function slugify(value = "") {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function buildInventorySlug(item = {}) {
  const title = item?.metadata?.title || "forklift";
  const filename = item?.filename || "";
  const baseSlug = slugify(title) || "forklift";

  return filename ? `${baseSlug}--${filename}` : baseSlug;
}

export function extractFilenameFromSlug(slug = "") {
  const parts = slug.split("--");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

export function buildInventoryUrl(item = {}) {
  return `/shop/${buildInventorySlug(item)}`;
}

export function buildAbsoluteInventoryUrl(item = {}) {
  return `${SITE_URL}${buildInventoryUrl(item)}`;
}

export function buildProductDescription(item = {}) {
  const title = item?.metadata?.title || "Forklift";
  const category = item?.metadata?.selected || "Forklift";
  const description = item?.metadata?.description?.trim();

  if (description) {
    return description;
  }

  return `${title} available from Super Handlers in Bolton, Ontario. ${category} inventory for businesses across Brampton and the GTA.`;
}

export { SITE_URL };
