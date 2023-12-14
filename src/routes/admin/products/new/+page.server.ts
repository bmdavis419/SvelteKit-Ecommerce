import { error, redirect } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { generateId } from 'lucia';
import { db } from '$lib/server/db/index.js';
import { product } from '$lib/server/db/schema.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			name: zfd.text(),
			desc: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			throw error(400, res.error.name);
		}

		const productId = generateId(15);

		await db.insert(product).values({
			id: productId,
			name: res.data.name,
			desc: res.data.desc
		});

		throw redirect(300, `/admin/products/${productId}/sizes`);
	}
};
