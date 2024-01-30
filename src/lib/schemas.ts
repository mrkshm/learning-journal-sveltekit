import { z } from 'zod';
export const entryZodSchema = z.object({
	category: z.string().default('work'),
	description: z.string(),
	date: z.string().default(() => new Date().toISOString())
});
