import { ensureAdmin } from '$lib/server/auth';

export const load = async ({ url, locals }) => {
	// ensure the user is actually allowed to even be here
	ensureAdmin(locals);

	return {
		url: url.pathname
	};
};
