import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: 'file:./local.db'
	}
} satisfies Config;
