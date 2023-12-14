import { db } from '$lib/server/db';
import { product } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const firstProduct = await db.query.product.findFirst({
		where: eq(product.id, params.productId),
		columns: {
			name: true,
			desc: true
		}
	});

	if (!firstProduct) {
		throw error(404);
	}

	return { productId: params.productId, productBasics: firstProduct };
};
