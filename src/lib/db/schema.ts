import { type InferInsertModel, type InferSelectModel, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const entries = sqliteTable('entries', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	category: text('category').notNull().default('work'),
	description: text('description').notNull(),
	date: text('date')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

export type Entry = InferSelectModel<typeof entries>;
export type InsertEntry = InferInsertModel<typeof entries>;
