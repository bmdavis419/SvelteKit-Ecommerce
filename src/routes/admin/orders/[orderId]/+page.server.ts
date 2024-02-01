import { ensureAdmin } from '$lib/server/auth';
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

export const load = async ({ locals, params }) => {
	ensureAdmin(locals);

	// grab the orders
	const orderDB = await db.query.order.findFirst({
		where: eq(order.stripeOrderId, params.orderId),
		orderBy: desc(order.timestamp),
		with: {
			products: true
		}
	});

	if (!orderDB) {
		error(404, 'Order not found...');
	}

	const session = await stripe.checkout.sessions.retrieve(orderDB.stripeOrderId);

	if (!session.customer_details) {
		error(404, 'Customer not found...');
	}

	const sendOrder: OrderDetails = {
		stripeCustomerId: orderDB.stripeCustomerId,
		stripeOrderId: orderDB.stripeOrderId,
		timestamp: orderDB.timestamp,
		totalPrice: orderDB.totalPrice,
		customerInfo: session.customer_details,
		status: orderDB.status,
		email: session.customer_details.email ?? '',
		products: orderDB.products
	};

	return { order: sendOrder };
};

// yea GPT gave me this one lol, never seen "status is" before
function isOrderStatus(status: string): status is 'new' | 'placed' | 'packaged' | 'sent' {
	return ['new', 'placed', 'packaged', 'sent'].includes(status);
}

export const actions = {
	setStatus: async ({ locals, request }) => {
		ensureAdmin(locals);

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
