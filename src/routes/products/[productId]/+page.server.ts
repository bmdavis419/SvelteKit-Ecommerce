import { fetchOneProduct } from '$lib/server/data/products.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const product = await fetchOneProduct(params.productId);

	if (!product) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { product };
};
