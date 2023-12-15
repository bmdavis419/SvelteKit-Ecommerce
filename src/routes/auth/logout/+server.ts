import { lucia } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	redirect(307, '/auth/login');
};
