import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/db/db-config';
import { entries } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { entryZodSchema } from '$lib/schemas';
interface LoadParams extends PageServerLoad {
	slug: string;
}

export async function load({ params }: { params: LoadParams }) {
	const data = await db.select().from(entries).where(eq(entries.id, +params.slug));
	return { entry: data[0] };
}

export const actions: Actions = {
	update: async ({ request, params, locals }) => {
		if (!locals.user.isAdmin) throw new Error('You are not authorized to do that');
		if (typeof params.slug !== 'string') return null;
		const form = await request.formData();
		await new Promise((resolve) => setTimeout(resolve, 2000));
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
			await db.update(entries).set(result.data).where(eq(entries.id, +params.slug)).returning();
			console.log('redirecting, bro');
			throw redirect(308, '/');
		} catch (error) {
			return {
				status: 500,
				errors: { message: 'Something went wrong' }
			};
		}
	},
	delete: async ({ params }) => {
		console.log('deleting, bro');
		if (typeof params.slug !== 'string') throw new Error('id does not exist or is in bad shape');
		await db.delete(entries).where(eq(entries.id, +params.slug));
		throw redirect(303, '/');
	}
};
