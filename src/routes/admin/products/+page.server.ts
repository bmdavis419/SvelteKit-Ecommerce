import { fetchAllProducts } from '$lib/server/data/products';

export const load = async () => {
	const products = await fetchAllProducts(10, 0);

	return { products };
};
