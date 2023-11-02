import { lucia } from 'lucia';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { libSQLClient } from './db';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: libsql(libSQLClient, {
		user: 'user',
		session: 'user_session',
		key: 'user_key'
	}),
	middleware: sveltekit(),
	env: 'DEV',
	getUserAttributes: (data) => {
		return {
			first_name: data.first_name,
			last_name: data.last_name,
			is_admin: data.is_admin,
			email: data.email
		};
	}
});

export type Auth = typeof auth;
