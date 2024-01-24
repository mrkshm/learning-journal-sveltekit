import type { Actions } from '@sveltejs/kit';
import * as z from 'zod';
import { db } from '$lib/db/db-config';
import { entries } from '$lib/db/schema';

const entryZodSchema = z.object({
	category: z.string().default('work'),
	description: z.string().optional(),
	date: z.string().default(() => new Date().toISOString())
});

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const entryData = {
			date: form.get('date'),
			category: form.get('category'),
			description: form.get('description')
		};

		const result = entryZodSchema.safeParse(entryData);
		if (!result.success) {
			return {
				status: 400,
				errors: { message: 'Validation failed' }
			};
		}

		try {
			const newEntry = await db.insert(entries).values(result.data).returning();
			console.log('this worked, bro: ', newEntry);
			return {
				status: 201,
				body: newEntry
			};
		} catch (error) {
			return {
				status: 500,
				errors: { message: 'Something went wrong' }
			};
		}

		return {
			status: 200,
			body: { message: 'Entry submitted successfully' }
		};
	}
};
