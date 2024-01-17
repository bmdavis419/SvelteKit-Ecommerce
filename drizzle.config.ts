import type { Config } from 'drizzle-kit';
import 'dotenv/config';

// export default {
// 	schema: './src/lib/server/db/schema.ts',
// 	out: './drizzle',
// 	driver: 'turso',
// 	dbCredentials: {
// 		url: process.env.DATABASE_URL ?? '',
// 		authToken: process.env.DATABASE_AUTH_TOKEN ?? ''
// 	}
// } satisfies Config;

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		host: 'localhost',
		port: 3306,
		database: 'sedimentart',
		password: 'password',
		user: 'root'
	}
} satisfies Config;
