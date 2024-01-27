import { db } from '$lib/server/db';
import { product, productImage } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const firstProduct = await db.query.product.findFirst({
		where: eq(product.id, params.productId),
		with: {
			images: {
				orderBy: desc(productImage.isPrimary),
				where: eq(productImage.isVertical, false)
			},
			tags: {
				with: {
					tag: true
				}
			},
			sizes: true
		}
	});

	if (!firstProduct) {
		error(404, {
			message: 'Not found'
		});
	}

	return { product: firstProduct };
};
