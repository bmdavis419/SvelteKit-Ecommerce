import { ensureAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { productSize } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zfd } from 'zod-form-data';

export const load = async ({ locals, params }) => {
	ensureAdmin(locals);

	const sizes = await db
		.select()
		.from(productSize)
		.where(eq(productSize.productId, params.productId));

	return { sizes };
};

export const actions = {
	delete: async ({ locals, request }) => {
		ensureAdmin(locals);

		const data = await request.formData();

		const schema = zfd.formData({
			code: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db.delete(productSize).where(eq(productSize.code, res.data.code));

		return { success: true };
	},

	edit: async ({ locals, request }) => {
		ensureAdmin(locals);

		const data = await request.formData();

		const schema = zfd.formData({
			code: zfd.text(),
			width: zfd.numeric(),
			height: zfd.numeric(),
			price: zfd.numeric(),
			stripePriceId: zfd.text(),
			stripeProductId: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db
			.update(productSize)
			.set({
				width: res.data.width,
				height: res.data.height,
				price: res.data.price,
				stripePriceId: res.data.stripePriceId,
				stripeProductId: res.data.stripeProductId
			})
			.where(eq(productSize.code, res.data.code));

		return { success: true };
	},
	create: async ({ locals, request, params }) => {
		ensureAdmin(locals);

		const data = await request.formData();

		const schema = zfd.formData({
			code: zfd.text(),
			width: zfd.numeric(),
			height: zfd.numeric(),
			price: zfd.numeric(),
			stripePriceId: zfd.text(),
			stripeProductId: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db.insert(productSize).values({
			...res.data,
			productId: params.productId
		});

		return { success: true };
	}
};
