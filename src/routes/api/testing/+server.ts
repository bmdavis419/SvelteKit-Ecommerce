import { fetchAllProducts } from '$lib/server/data/products';

export const GET = async () => {
	const products = await fetchAllProducts(10, 0);

	console.log(products);

	return new Response(String('TESTING'));
};
