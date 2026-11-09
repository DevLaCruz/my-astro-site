import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * "projects" — one .md per OSS project.
 * id = filename without extension, e.g. "hashlib"
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    status: z.enum(['active', 'stable', 'experimental', 'archived']),
    tech: z.array(z.string()),
    github: z.string().url().optional(),
    pypi: z.string().url().optional(),
    npm: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    hasDocs: z.boolean().default(false),
  }),
});

/**
 * "docs" — markdown files nested by project.
 * id = "projectSlug/page-slug", e.g. "hashlib/getting-started"
 */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
    section: z.string().optional(),
  }),
});

export const collections = { projects, docs };
