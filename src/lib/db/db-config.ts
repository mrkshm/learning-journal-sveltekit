import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { DATABASE_PATH } from '$env/static/private';

export const db = drizzle(new Database(DATABASE_PATH));
