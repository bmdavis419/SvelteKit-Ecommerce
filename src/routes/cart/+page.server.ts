import type { TCartEntry } from '$lib/client/cart.js';
import { stripe } from '$lib/server/stripe';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const body = (await event.request.json()) as TCartEntry[];

		// calculate the shipping price
		const shippingPrice = body.length * 2500;

		const session = await stripe.checkout.sessions.create({
			line_items: [
				...body.map((item) => {
					return {
						price: item.size.stripePriceId,
						quantity: item.quantity
					};
				}),
				{
					price_data: {
						currency: 'USD',
						unit_amount: shippingPrice,
						product_data: {
							name: 'shipping'
						}
					},
					quantity: 1
				}
			],
			customer_creation: 'always',
			metadata: {
				codes: JSON.stringify(
					body.map((item) => ({
						quantity: item.quantity,
						code: item.size.code
					}))
				)
			},
			mode: 'payment',
			success_url: `${event.url.origin}/success`,
			cancel_url: `${event.url.origin}/cancel`,
			automatic_tax: { enabled: true }
		});

		if (session.url) {
			redirect(307, session.url);
		}

		// TODO: make these errors not suck
		error(500);
	}
};
