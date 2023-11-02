import { fetchAllProducts } from '$lib/server/data/products';

export const load = async () => {
	const products = fetchAllProducts(9, 0);
	return { products };
};
