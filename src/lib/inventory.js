import { connectToDb } from "./db";
import {
  buildAbsoluteInventoryUrl,
  buildInventorySlug,
  buildInventoryUrl,
  buildProductDescription,
  extractFilenameFromSlug,
} from "./shopSeo";

function normalizeInventoryItem(item = {}) {
  return {
    ...item,
    metadata: item.metadata || {},
    slug: buildInventorySlug(item),
    href: buildInventoryUrl(item),
    absoluteUrl: buildAbsoluteInventoryUrl(item),
    seoDescription: buildProductDescription(item),
  };
}

export async function getInventory() {
  const { client } = await connectToDb();
  const result = await client
    .db()
    .collection("images.files")
    .find({ "metadata.isPrimary": { $ne: false } })
    .sort({ uploadDate: -1 })
    .project({ filename: 1, metadata: 1, uploadDate: 1 })
    .toArray();

  return result.map(normalizeInventoryItem);
}

export async function getInventoryItemBySlug(slug) {
  const filename = extractFilenameFromSlug(slug);

  if (!filename) {
    return null;
  }

  const { client } = await connectToDb();
  const item = await client
    .db()
    .collection("images.files")
    .findOne({ filename }, { projection: { filename: 1, metadata: 1, uploadDate: 1 } });

  return item ? normalizeInventoryItem(item) : null;
}
