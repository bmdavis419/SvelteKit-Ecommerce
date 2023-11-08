import type { TCartEntry } from '$lib/client/cart.js';
import { stripe } from '$lib/server/stripe';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const body = (await event.request.json()) as TCartEntry[];

		const session = await stripe.checkout.sessions.create({
			line_items: body.map((item) => {
				return {
					price: item.priceId,
					quantity: item.quantity
				};
			}),
			customer_creation: 'always',

			mode: 'payment',
			success_url: `${event.url.origin}/success`,
			cancel_url: `${event.url.origin}/cancel`,
			automatic_tax: { enabled: true }
		});

		if (session.url) {
			throw redirect(307, session.url);
		}

		// TODO: make these errors not suck
		throw error(500);
	}
};
