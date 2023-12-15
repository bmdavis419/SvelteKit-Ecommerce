import { env } from '$env/dynamic/private';
import { createNewOrder, createNewOrderProduct } from '$lib/server/data/orders.js';
import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';
import type Stripe from 'stripe';

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

export const POST = async ({ request }) => {
	const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

	const _rawBody = await request.arrayBuffer();
	const payload = toBuffer(_rawBody);

	// Get the signature sent by Stripe
	const signature = request.headers.get('stripe-signature') ?? '';
	try {
		const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
		const eventType = event.type;

		if (eventType === 'checkout.session.completed') {
			const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
				expand: ['line_items', 'customer']
			});

			if (sessionWithLineItems.line_items && sessionWithLineItems.customer) {
				// SAVE INTO DB
				const customer = sessionWithLineItems.customer as Stripe.Customer;
				await createNewOrder({
					orderId: sessionWithLineItems.id,
					customerId: customer.id,
					totalPrice: sessionWithLineItems.amount_total ?? 0
				});

				// SAVE THE PRODUCTS
				for (let i = 0; i < sessionWithLineItems.line_items.data.length; i++) {
					const item = sessionWithLineItems.line_items.data[i];

					await createNewOrderProduct({
						productId: item.price?.product.toString() ?? '',
						quantity: item.quantity ?? 1,
						orderId: sessionWithLineItems.id,
						status: 'placed'
					});
				}
			}
		}
	} catch (err) {
		console.log(`⚠️  Webhook signature verification failed.`, err);
		error(500);
	}

	return json({ success: true });
};
