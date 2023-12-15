import { lucia } from '$lib/server/auth';
import { getUserForSignIn } from '$lib/server/data/users.js';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { zfd } from 'zod-form-data';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			// matched to the name field in the form
			email: zfd.text(),
			password: zfd.text()
		});

		const res = await schema.safeParseAsync(data);

		if (!res.success) {
			return fail(400, { message: 'missing 1 or more required fields...' });
		}

		// validate the password
		const userInfo = await getUserForSignIn(res.data.email);

		if (!userInfo) {
			return fail(404, { message: 'email not found...' });
		}

		const validPassword = await new Argon2id().verify(userInfo.hashedPassword, res.data.password);

		if (!validPassword) {
			return fail(404, { message: 'invalid password...' });
		}

		const session = await lucia.createSession(userInfo.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		redirect(302, '/profile');
	}
};
