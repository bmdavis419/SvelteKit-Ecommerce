import { lucia } from '$lib/server/auth';
import { createUser } from '$lib/server/data/users.js';
import { fail, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			// matched to the name field in the form
			first_name: zfd.text(),
			last_name: zfd.text(),
			email: zfd.text(),
			password: zfd.text(),
			confirm_password: zfd.text()
		});

		const res = await schema.safeParseAsync(data);

		if (!res.success) {
			return fail(400, { message: 'missing 1 or more required fields...' });
		}

		if (res.data.password !== res.data.confirm_password) {
			return fail(400, { message: 'passwords do not match...' });
		}

		const nUserId = await createUser(res.data);

		// create the user's session
		const session = await lucia.createSession(nUserId, {});

		// save the session
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		redirect(302, '/profile');
	}
};
