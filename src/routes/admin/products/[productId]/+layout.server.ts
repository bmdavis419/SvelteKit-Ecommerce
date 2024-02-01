import { ensureAdmin } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { product } from '$lib/server/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals, params }) => {
	ensureAdmin(locals);

	const firstProduct = await db.query.product.findFirst({
		where: eq(product.id, params.productId),
		columns: {
			name: true,
			desc: true
		}
	});

	if (!firstProduct) {
		error(404);
	}

	return { productId: params.productId, productBasics: firstProduct };
};
