import { db } from '$lib/db/db-config';
import { entries } from '$lib/db/schema';
const data = db.select().from(entries).run();
console.log('Here comes the data', data);
