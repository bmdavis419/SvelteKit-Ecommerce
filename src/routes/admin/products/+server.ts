import { deleteOneProduct } from '$lib/server/data/products.js';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ url }) => {
	const productId = url.searchParams.get('productId');

	if (!productId) {
		return json(
			{ message: 'missing product id...' },
			{
				status: 400
			}
		);
	}

	await deleteOneProduct(productId);

	return new Response('success');
};
