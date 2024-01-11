import { db } from '$lib/server/db';
import { productImage, productTag, productToProductTag } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { desc, eq, like, or } from 'drizzle-orm';
import { zfd } from 'zod-form-data';

export const load = async ({ url }) => {
	const params = url.searchParams;
	const tags = params.getAll('tag');

	const tagEqs = tags.map((tag) => eq(productToProductTag.tagId, tag));

	const pTTag = await db.query.productToProductTag.findMany({
		where: tags.length > 0 ? or(...tagEqs) : undefined,
		with: {
			product: {
				with: {
					images: {
						orderBy: desc(productImage.isPrimary),
						limit: 1
					},
					tags: {
						with: {
							tag: true
						}
					}
				}
			}
		}
	});

	const products: {
		id: string;
		name: string;
		desc: string;
		tags: {
			productId: string;
			tagId: string;
			tag: {
				name: string;
				desc: string;
			};
		}[];
		images: {
			productId: string;
			width: number;
			height: number;
			cloudinaryId: string;
			isPrimary: boolean;
		}[];
	}[] = [];
	const usedIds: string[] = [];

	// TODO: change for pagination
	const max = 6;

	pTTag.forEach((p) => {
		if (!usedIds.includes(p.productId) && usedIds.length < max) {
			products.push(p.product);
			usedIds.push(p.product.id);
		}
	});

	return { products };
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
