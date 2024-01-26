import type { Actions } from '@sveltejs/kit';
import * as z from 'zod';
import { db } from '$lib/db/db-config';
import { entries } from '$lib/db/schema';
import type { Entry } from '$lib/db/schema';
import { format, parseISO, startOfWeek } from 'date-fns';

const entryZodSchema = z.object({
	category: z.string().default('work'),
	description: z.string(),
	date: z.string().default(() => new Date().toISOString())
});

export type Week = {
	dateString: string;
	work: Entry[];
	learnings: Entry[];
	interestingThings: Entry[];
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		await new Promise((resolve) => setTimeout(resolve, 3000));
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
	}
};

export async function load() {
	const items = await db.select().from(entries);
	if (!items.length) {
		return null;
	}
	const entriesByWeek = new Map<
		string,
		{ work: Entry[]; learnings: Entry[]; interestingThings: Entry[] }
	>();

	items.forEach((entry: Entry) => {
		const weekStart = startOfWeek(parseISO(entry.date));
		const weekStartString = format(weekStart, 'yyyy-MM-dd');

		if (!entriesByWeek.has(weekStartString)) {
			entriesByWeek.set(weekStartString, { work: [], learnings: [], interestingThings: [] });
		}

		let categoryGroup = entriesByWeek.get(weekStartString);
		if (!categoryGroup) {
			categoryGroup = { work: [], learnings: [], interestingThings: [] };
		}

		// Now you can safely use categoryGroup
		switch (entry.category) {
			case 'work':
				categoryGroup.work.push(entry);
				break;
			case 'learning':
				categoryGroup.learnings.push(entry);
				break;
			case 'interesting-thing':
				categoryGroup.interestingThings.push(entry);
				break;
		}
	});

	// Convert the Map to an array of week entries
	const weeks = Array.from(entriesByWeek).map(([dateString, categories]) => ({
		dateString,
		...categories
	}));

	return { weeks };
}
