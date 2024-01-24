import type { Config } from 'drizzle-kit';
import process from 'process';
const dbPath = process.env.DATABASE_PATH;

if (!dbPath) {
	throw new Error('DATABASE_PATH environment variable is not set');
}

export default {
	schema: './src/lib/db/schema.ts',
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: dbPath
	}
} satisfies Config;
