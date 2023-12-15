import { db } from '$lib/server/db/index.js';
import { product } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zfd } from 'zod-form-data';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			name: zfd.text(),
			desc: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			throw error(400, res.error.name);
		}

		await db
			.update(product)
			.set({
				name: res.data.name,
				desc: res.data.desc
			})
			.where(eq(product.id, params.productId));

		return { success: true };
	}
};
