import { db } from '$lib/server/db';
import { productImage, productTag } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { desc, like } from 'drizzle-orm';
import { zfd } from 'zod-form-data';

export const load = async ({ url }) => {
	const params = url.searchParams;
	const tags = params.getAll('tag');

	const newProductsQuery = await db.query.product.findMany({
		where: (productToProductTag, { inArray }) =>
			tags.length > 0 ? inArray(productToProductTag.name, tags) : undefined,
		with: {
			tags: true,

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
