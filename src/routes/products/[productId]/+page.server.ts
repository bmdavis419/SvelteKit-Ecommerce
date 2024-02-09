import { db } from '$lib/server/db';
import { product, productImage, productSize } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { and, asc, desc, eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const firstProduct = await db.query.product.findFirst({
		where: eq(product.id, params.productId),
		with: {
			images: {
				orderBy: desc(productImage.isPrimary),
				where: and(eq(productImage.isVertical, false), eq(productImage.isPrimary, false))
			},
			tags: {
				with: {
					tag: true
				}
			},
			sizes: {
				orderBy: asc(productSize.price)
			}
		}
	});

	// get the primary image for the product
	const primaryImage = await db.query.productImage.findFirst({
		where: and(eq(productImage.isPrimary, true), eq(productImage.productId, params.productId))
	});

	if (!firstProduct) {
		error(404, {
			message: 'Not found'
		});
	}

	return { product: firstProduct, primaryImage };
};
