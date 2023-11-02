import { env } from '$env/dynamic/private';
import { stripe } from '$lib/server/stripe';
import { error, json } from '@sveltejs/kit';

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

		switch (eventType) {
			case 'checkout.session.completed':
				// TODO: create order entry in DB
				break;

			default:
			// Unhandled event type
		}
	} catch (err) {
		console.log(`⚠️  Webhook signature verification failed.`, err);
		throw error(500);
	}

	return json({ success: true });
};
