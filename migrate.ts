import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

async function main() {
	const db = drizzle(createClient({ url: '', authToken: '' }));

	console.log('Running migrations');

	await migrate(db, { migrationsFolder: 'drizzle' });

	console.log('Migrated successfully');

	process.exit(0);
}

main().catch((e) => {
	console.error('Migration failed');
	console.error(e);
	process.exit(1);
});
