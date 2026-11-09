import type { CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

export interface DocSection {
  name: string;
  docs: DocEntry[];
}

/**
 * Groups docs by their `section` frontmatter field.
 * Docs without a section go into "General".
 * Each section's docs are sorted by `order`.
 */
export function groupDocsBySection(docs: DocEntry[]): DocSection[] {
  const map = new Map<string, DocEntry[]>();

  for (const doc of docs) {
    const section = doc.data.section ?? 'General';
    if (!map.has(section)) map.set(section, []);
    map.get(section)!.push(doc);
  }

  return Array.from(map.entries()).map(([name, items]) => ({
    name,
    docs: items.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
  }));
}

/**
 * Strips the project prefix from a doc id.
 * e.g. "hashlib/getting-started" → "getting-started"
 */
export function getDocPageSlug(docId: string, projectId: string): string {
  return docId.startsWith(`${projectId}/`)
    ? docId.slice(projectId.length + 1)
    : docId;
}

/**
 * Returns the canonical URL for a documentation page.
 * e.g. ("hashlib/getting-started", "hashlib") → "/projects/hashlib/docs/getting-started/"
 */
export function getDocUrl(docId: string, projectId: string): string {
  const pageSlug = getDocPageSlug(docId, projectId);
  return `/projects/${projectId}/docs/${pageSlug}/`;
}

/**
 * Returns the previous and next docs relative to currentId,
 * using the globally sorted (by order) flat list.
 */
export function getAdjacentDocs(
  docs: DocEntry[],
  currentId: string,
): { prev: DocEntry | null; next: DocEntry | null } {
  const sorted = [...docs].sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
  const idx = sorted.findIndex((d) => d.id === currentId);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
