import { error, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { db } from '$lib/server/db/index.js';
import { product, productImage } from '$lib/server/db/schema.js';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

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
			throw error(400, error.name);
		}

		// create the product
		await await db.insert(product).values(res.data);

		// create the images
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
