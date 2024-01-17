import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
	// ensure the user is actually allowed to even be here
	if (!locals.user || !locals.session) {
		redirect(307, '/auth/login');
	}

	if (!locals.user.isAdmin) {
		redirect(307, '/');
	}

	return {
		url: url.pathname
	};
};
