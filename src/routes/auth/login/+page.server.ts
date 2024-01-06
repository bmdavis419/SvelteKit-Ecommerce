import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (event.locals.session) {
		redirect(307, '/profile');
	}
};
