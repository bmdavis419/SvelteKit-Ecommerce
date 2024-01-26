import { db } from '$lib/server/db/index.js';
import { emailList } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const GET = async ({ url }) => {
	const key = url.searchParams.get('key');
	const email = url.searchParams.get('email');

	if (!key || !email) {
		error(400, 'missing key and/or email...');
	}

	await db
		.update(emailList)
		.set({
			unsubscribedAt: new Date()
		})
		.where(and(eq(emailList.email, email), eq(emailList.key, key)));

	return redirect(303, '/status/list/removed');
};
