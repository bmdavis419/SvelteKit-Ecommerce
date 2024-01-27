import { db } from '$lib/server/db';
import { order } from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { error } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type Stripe from 'stripe';
import { zfd } from 'zod-form-data';

type OrderDetails = {
	timestamp: Date;
	stripeCustomerId: string | null;
	stripeOrderId: string;
	totalPrice: number;
	status: 'new' | 'placed' | 'packaged' | 'sent';
	customerInfo: Stripe.Checkout.Session.CustomerDetails;
	email: string;
	products: {
		id: string;
		productSizeCode: string;
		quantity: number;
	}[];
};

export const load = async () => {
	// grab the orders
	const orders = await db.query.order.findMany({
		orderBy: desc(order.timestamp),
		with: {
			products: true
		}
	});

	const sendOrders: OrderDetails[] = [];

	// get more detailed information for each order
	for (let i = 0; i < orders.length; i++) {
		const order = orders[i];

		// TODO: deal with changing address case
		const session = await stripe.checkout.sessions.retrieve(order.stripeOrderId);

		if (session.customer_details) {
			sendOrders.push({
				stripeCustomerId: order.stripeCustomerId,
				stripeOrderId: order.stripeOrderId,
				timestamp: order.timestamp,
				totalPrice: order.totalPrice,
				customerInfo: session.customer_details,
				status: order.status,
				email: session.customer_details.email ?? '',
				products: order.products
			});
		}
	}

	return { orders: sendOrders };
};

// yea GPT gave me this one lol, never seen "status is" before
function isOrderStatus(status: string): status is 'new' | 'placed' | 'packaged' | 'sent' {
	return ['new', 'placed', 'packaged', 'sent'].includes(status);
}

export const actions = {
	setStatus: async ({ request }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			stripeOrderId: zfd.text(),
			status: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		if (!isOrderStatus(res.data.status)) {
			error(400, 'invalid status');
		}

		await db
			.update(order)
			.set({
				status: res.data.status
			})
			.where(eq(order.stripeOrderId, res.data.stripeOrderId));

		return { success: true };
	}
};
