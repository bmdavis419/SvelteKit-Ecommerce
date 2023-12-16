import { db } from '$lib/server/db';
import {
	product,
	productImage,
	productReview,
	productSize,
	productToProductTag
} from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const deleteOneProduct = async (id: string) => {
	// clear out the images
	await db.delete(productImage).where(eq(productImage.productId, id));

	// clear out the sizes
	await db.delete(productSize).where(eq(productSize.productId, id));

	// clear out the reviews
	await db.delete(productReview).where(eq(productReview.productId, id));

	// clear out tag references
	await db.delete(productToProductTag).where(eq(productToProductTag.productId, id));

	await db.delete(product).where(eq(product.id, id));
};

export const fetchOneProduct = async (id: string) => {
	const firstProduct = await db.query.product.findFirst({
		where: eq(product.id, id),
		with: {
			images: {
				orderBy: desc(productImage.isPrimary)
			},
			tags: {
				with: {
					tag: true
				}
			},
			sizes: true
		}
	});

	return firstProduct;
};

export const fetchAllProducts = async (take?: number, skip?: number) => {
	const products = await db.query.product.findMany({
		limit: take,
		offset: skip,
		with: {
			sizes: true,
			images: {
				orderBy: desc(productImage.isPrimary)
			},
			tags: {
				with: {
					tag: true
				}
			}
		}
	});

	return products;
};
