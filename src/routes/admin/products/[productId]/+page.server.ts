import { fetchOneProduct } from '$lib/server/data/products';
import { db } from '$lib/server/db';
import { product, productImage } from '$lib/server/db/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const load = async ({ params }) => {
	const product = await fetchOneProduct(params.productId);

	if (!product) {
		throw error(404);
	}

	return { product };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		console.log(data);

		const imageSchema = z.object({
			publicId: z.string(),
			width: z.number(),
			height: z.number()
		});

		const schema = zfd.formData({
			name: zfd.text(),
			stripePriceId: zfd.text(),
			stripeProductId: zfd.text(),
			price: zfd.numeric(),
			desc: zfd.text(),
			images: zfd.repeatableOfType(zfd.json(imageSchema))
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			throw error(400, res.error);
		}

		// update the core product
		await db
			.update(product)
			.set({
				name: res.data.name,
				stripePriceId: res.data.stripePriceId,
				price: res.data.price,
				desc: res.data.desc
			})
			.where(eq(product.stripeProductId, res.data.stripeProductId));

		// clear the images, then re-create, probably inefficient, but works
		await db.delete(productImage).where(eq(productImage.productId, res.data.stripeProductId));

		await db.insert(productImage).values(
			res.data.images.map((image) => {
				return {
					cloudinaryId: image.publicId,
					productId: res.data.stripeProductId,
					width: image.width,
					height: image.height
				};
			})
		);

		throw redirect(300, '/admin/products');
	}
};
