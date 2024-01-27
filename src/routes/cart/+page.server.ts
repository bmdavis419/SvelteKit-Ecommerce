import type { TCartEntry } from '$lib/client/cart.js';
import { stripe } from '$lib/server/stripe';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const body = (await event.request.json()) as TCartEntry[];

		const user = event.locals.user;

		const customerId = user ? user.stripeCustomerId ?? undefined : undefined;

		const session = await stripe.checkout.sessions.create({
			shipping_address_collection: {
				allowed_countries: ['US']
			},
			line_items: [
				...body.map((item) => {
					return {
						price: item.size.stripePriceId,
						quantity: item.quantity
					};
				})
			],
			customer: customerId,
			customer_creation: user && !customerId ? 'always' : undefined,
			customer_update: customerId
				? {
						shipping: 'auto'
				  }
				: undefined,
			metadata: {
				codes: JSON.stringify(
					body.map((item) => ({
						quantity: item.quantity,
						code: item.size.code
					}))
				),
				userId: user ? user.id : ''
			},
			mode: 'payment',
			success_url: `${event.url.origin}/status/checkout/success`,
			cancel_url: `${event.url.origin}/status/checkout/fail`,
			automatic_tax: { enabled: true },
			billing_address_collection: 'required'
		});

		if (session.url) {
			redirect(307, session.url);
		}

		// TODO: make these errors not suck
		error(500);
	}
};
