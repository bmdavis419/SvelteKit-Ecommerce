import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/server/db/schema.ts',
	driver: 'mysql2',
	dbCredentials: {
		uri: process.env.DATABASE_CONNECTION_STRING ?? ''
	}
} satisfies Config;
