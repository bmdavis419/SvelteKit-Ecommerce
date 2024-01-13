import { db } from '$lib/server/db';
import { productImage, productTag, productToProductTag } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { desc, inArray, like } from 'drizzle-orm';
import { zfd } from 'zod-form-data';

export const load = async ({ url }) => {
	const params = url.searchParams;
	const allTags = params.getAll('tag');

	const sq = db
		.select({ id: productToProductTag.productId })
		.from(productToProductTag)
		.where(allTags.length > 0 ? inArray(productToProductTag.tagId, allTags) : undefined);

	const newProductsQuery = await db.query.product.findMany({
		where: (product, { inArray }) => inArray(product.id, sq),
		with: {
			tags: {
				where: (tags, { inArray }) =>
					allTags.length > 0 ? inArray(tags.tagId, allTags) : undefined
			},
			images: {
				orderBy: desc(productImage.isPrimary),
				limit: 1
			}
		},
		// TODO: Change to params
		limit: 6,
		offset: 0
	});

	return { products: newProductsQuery };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			query: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		// find all tags which are not currently applied to the product, but also fit the query
		const searchedTags = await db
			.select({
				tagName: productTag.name,
				tagDesc: productTag.desc
			})
			.from(productTag)
			.where(like(productTag.name, `%${res.data.query}%`));

		return { searchedTags };
	}
};
