import { stripe } from '$lib/server/stripe';

export const GET = async () => {
	const session = await stripe.checkout.sessions.retrieve(
		'cs_test_b13JMNbKbNWEvT2C6yS9d2Lbdat12O3LyV1wBtQu9hFvF0yp5B1PfYVU7b',
		{
			expand: ['line_items']
		}
	);

	console.log(session.line_items?.data);

	return new Response(String('TESTING'));
};
