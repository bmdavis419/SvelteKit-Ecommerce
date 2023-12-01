import { db } from '$lib/server/db';
import { product, productImage } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const deleteOneProduct = async (id: string) => {
	// clear out the images
	await db.delete(productImage).where(eq(productImage.productId, id));
	await db.delete(product).where(eq(product.stripeProductId, id));
};

export const fetchOneProduct = async (id: string) => {
	const result = await db
		.select()
		.from(product)
		.where(eq(product.stripeProductId, id))
		.leftJoin(productImage, eq(product.stripeProductId, productImage.productId));

	if (result.length === 0) return null;

	const item = {
		stripeId: result[0].product.stripeProductId,
		stripePriceId: result[0].product.stripePriceId,
		price: result[0].product.price,
		name: result[0].product.name,
		desc: result[0].product.desc,
		images: result.map((res) => {
			return {
				cloudinaryId: res.product_image?.cloudinaryId ?? ''
			};
		})
	};

	return item;
};

export const fetchAllProducts = async (take?: number, skip?: number) => {
	const result = await db
		.select()
		.from(product)
		.leftJoin(productImage, eq(product.stripeProductId, productImage.productId))
		.offset(skip ?? 0)
		.limit(take ?? 10);

	// collapse the results into the form of products
	const updatedResults: {
		stripeProductId: string;
		stripePriceId: string;
		price: number;
		name: string;
		desc: string;
		images: {
			cloudinaryId: string;
			width: number;
			height: number;
		}[];
	}[] = [];
	if (result.length > 0) {
		let curId = result[0].product.stripeProductId;
		updatedResults.push({
			stripeProductId: result[0].product.stripeProductId,
			stripePriceId: result[0].product.stripePriceId,

			price: result[0].product.price,
			name: result[0].product.name,
			desc: result[0].product.desc,
			images: [
				{
					cloudinaryId: result[0].product_image?.cloudinaryId ?? '',
					width: result[0].product_image?.width ?? 1920,
					height: result[0].product_image?.height ?? 1280
				}
			]
		});
		let curIdx = 0;
		for (let i = 1; i < result.length; i++) {
			const curResult = result[i];
			if (curId === curResult.product.stripeProductId) {
				updatedResults[curIdx].images.push({
					cloudinaryId: curResult.product_image?.cloudinaryId ?? '',
					width: curResult.product_image?.width ?? 1920,
					height: curResult.product_image?.height ?? 1280
				});
			} else {
				updatedResults.push({
					stripePriceId: curResult.product.stripePriceId,
					stripeProductId: curResult.product.stripeProductId,
					price: curResult.product.price,
					name: curResult.product.name,
					desc: curResult.product.desc,
					images: [
						{
							cloudinaryId: curResult.product_image?.cloudinaryId ?? '',
							width: curResult.product_image?.width ?? 1920,
							height: curResult.product_image?.height ?? 1280
						}
					]
				});
				curIdx += 1;
				curId = curResult.product.stripeProductId;
			}
		}
	}

	return updatedResults;
};
