import { stripe } from '../stripe';

export const getProductById = async (productId: string) => {
	const product = await stripe.products.retrieve(productId);

	return product;
};

export const getCheckoutSession = async (sessionId: string) => {
	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'customer']
	});

	return session;
};

export const getCustomer = async (customerId: string) => {
	const customer = await stripe.customers.retrieve(customerId);

	return customer;
};
