import { db } from '$lib/server/db';
import { productTag, productToProductTag } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq, like } from 'drizzle-orm';
import { except } from 'drizzle-orm/sqlite-core';
import { zfd } from 'zod-form-data';

export const load = async ({ params }) => {
	const tagsRel = await db.query.productToProductTag.findMany({
		where: eq(productToProductTag.productId, params.productId),
		with: {
			tag: true
		}
	});

	return {
		tagsSelected: tagsRel.map((item) => {
			return {
				name: item.tag.name,
				desc: item.tag.desc
			};
		})
	};
};

export const actions = {
	createNewTag: async ({ request, params }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			tagName: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db.insert(productTag).values({
			name: res.data.tagName,
			desc: ''
		});

		await db.insert(productToProductTag).values({
			tagId: res.data.tagName,
			productId: params.productId
		});

		return { success: true };
	},
	addTagToProduct: async ({ request, params }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			tagName: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db.insert(productToProductTag).values({
			tagId: res.data.tagName,
			productId: params.productId
		});

		return { success: true };
	},
	search: async ({ request, params }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			query: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		// find all tags which are not currently applied to the product, but also fit the query
		const searchedTags = db
			.select({
				tagName: productTag.name
			})
			.from(productTag)
			.where(like(productTag.name, `%${res.data.query}%`));
		const currentlySelected = db
			.select({
				tagName: productToProductTag.tagId
			})
			.from(productToProductTag)
			.where(eq(productToProductTag.productId, params.productId));

		const tags = await except(searchedTags, currentlySelected).limit(6);

		return { tags };
	}
};
