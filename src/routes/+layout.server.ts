export const load = ({ locals }) => {
	console.log(locals.user);
	return {
		user: locals.user
	};
};
