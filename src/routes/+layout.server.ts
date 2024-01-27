import { db } from '$lib/server/db/index';
import {  product, productTag, productToProductTag } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
	// figure out how many orders have been added, and send down a valid boolean
	// const orders = await db
	// 	.select({
	// 		id: order.stripeOrderId
	// 	})
	// 	.from(order);

	const collections = await db
		.select({collection: productTag.name, name: product.name, id: product.id})
		.from(productTag)
		.innerJoin(productToProductTag, eq(productTag.name, productToProductTag.tagId))
		.innerJoin(product, eq(product.id, productToProductTag.productId))

	const reducedCollections: {
		collection: string;
		products: {
			name: string;
			id: string;
		}[];
	}[] = []

	collections.forEach(el => {
		let found = false
		reducedCollections.forEach(col => {
			if (col.collection == el.collection) {
				col.products.push({name: el.name, id: el.id})
				found = true
			}
		})
		if (!found) {
			reducedCollections.push({
				collection: el.collection,
				products: [{name: el.name, id: el.id}]
			})
		}
		found = false
	})


	return {
		user: locals.user,
		isSoldOut: true,
		collections: reducedCollections
	};
};
