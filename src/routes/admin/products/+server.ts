import { ensureAdmin } from '$lib/server/auth';
import { deleteOneProduct } from '$lib/server/data/products.js';
import { json } from '@sveltejs/kit';

export const DELETE = async ({ locals, url }) => {
	ensureAdmin(locals);

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
