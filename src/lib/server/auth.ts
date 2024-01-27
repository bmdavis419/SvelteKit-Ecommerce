import { Lucia } from 'lucia';
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import { GitHub, Google } from 'arctic';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { db } from './db';
import { session, user } from './db/schema';

const adapter = new DrizzleMySQLAdapter(db, session, user);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:5173';

const redirectUrl = `${baseUrl}/auth/callback/google`;

export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectUrl);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (data) => {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			isAdmin: data.isAdmin,
			stripeCustomerId: data.stripeCustomerId
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			firstName: string;
			lastName: string;
			isAdmin: boolean;
			email: string;
			stripeCustomerId: string | null;
		};
	}
}
