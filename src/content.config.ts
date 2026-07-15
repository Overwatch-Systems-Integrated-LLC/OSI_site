import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().default('Industrial Security'),
    author: z.string().default('Barry Fuller'),
    image: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
