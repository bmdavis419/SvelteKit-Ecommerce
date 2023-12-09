// SEED THE DB

import { product, productImage } from './src/lib/server/db/schema';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import 'dotenv/config';

const seed = async () => {
	// crete db client
	const libSQLClient = createClient({
		url: process.env.DATABASE_URL ?? '',
		authToken: process.env.DATABASE_AUTH_TOKEN ?? ''
	});

	const db = drizzle(libSQLClient);

	// create some products
	// NOTE: update the price id and product id to be YOUR ids
	const products = [
		{
			price: 3000,
			name: 'Demo Stripe Product',
			desc: 'A test product, the first test product made testing testing testing testing',
			stripeProductId: 'prod_OveW2G7ruN2Fcl',
			stripePriceId: 'price_1O7nDPDVy0rtNA6WSGkE6j5T'
		},
		{
			price: 4000,
			name: 'My Second Product',
			desc: 'A second test product...',
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d'
		}
	];

	const insertedProducts = await db.insert(product).values(products).returning().all();

	console.log(`INSERTED: ${insertedProducts.length} products`);

	// create some product images
	// NOTE: update these ids to be YOUR ids, the ideal aspect ratio is 1920x1280
	const images = [
		{
			cloudinaryId: 'products/hs4vq2t9pclhkuxhxqh1',
			width: 1920,
			height: 1280,
			productId: 'prod_OveW2G7ruN2Fcl'
		},
		{
			cloudinaryId: 'products/e2qenhvzhh6opitacqm6',
			width: 1920,
			height: 1280,
			productId: 'prod_OyCy8ckhrmV0IM'
		}
	];

	const insertedImages = await db.insert(productImage).values(images).returning().all();

	console.log(`INSERTED: ${insertedImages.length} product images`);
};

seed();
