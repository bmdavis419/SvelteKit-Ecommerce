import { db } from '$lib/server/db/index';
import { order } from '$lib/server/db/schema';

export const load = async ({ locals }) => {
	// figure out how many orders have been added, and send down a valid boolean
	const orders = await db
		.select({
			id: order.stripeOrderId
		})
		.from(order);

	return {
		user: locals.user,
		isSoldOut: orders.length >= 10,
		numberLeft: 9 - orders.length
	};
};
