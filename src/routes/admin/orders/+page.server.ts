import { db } from '$lib/server/db';
import { order } from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { desc } from 'drizzle-orm';

export const load = async () => {
	// grab the orders
	const orders = await db.query.order.findMany({
		orderBy: desc(order.timestamp)
	});

	console.log(orders);

	const orderTest = await stripe.checkout.sessions.retrieve(
		'cs_test_b1vnHDbS9BqYb0OXWbhtaaDyTbrtTdkfzTbmCf80wQ1FxqVOvbsCuvQuOZ'
	);

	return { orders };
};
