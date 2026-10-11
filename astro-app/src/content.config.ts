import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),
    description: z.string().optional(),
    order: z.number(),
  }),
})

export const collections = { pages }
