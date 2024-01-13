import { db } from '$lib/server/db';
import { order } from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { desc } from 'drizzle-orm';
import type Stripe from 'stripe';

type OrderDetails = {
	timestamp: Date;
	stripeCustomerId: string | null;
	stripeOrderId: string;
	totalPrice: number;
	customerInfo: Stripe.Checkout.Session.CustomerDetails;
};

export const load = async () => {
	// grab the orders
	const orders = await db.query.order.findMany({
		orderBy: desc(order.timestamp)
	});

	const sendOrders: OrderDetails[] = [];

	// get more detailed information for each order
	for (let i = 0; i < orders.length; i++) {
		const order = orders[i];

		const session = await stripe.checkout.sessions.retrieve(order.stripeOrderId);

		if (session.customer_details) {
			sendOrders.push({
				stripeCustomerId: order.stripeCustomerId,
				stripeOrderId: order.stripeOrderId,
				timestamp: order.timestamp,
				totalPrice: order.totalPrice,
				customerInfo: session.customer_details
			});
		}
	}

	return { orders: sendOrders };
};
