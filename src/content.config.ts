import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const artigos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/artigos" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    series: z.string().optional(),
    translationKey: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { artigos };
