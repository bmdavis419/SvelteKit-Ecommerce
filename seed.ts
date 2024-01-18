// SEED THE DB
import {
	product,
	productImage,
	productSize,
	productTag,
	productToProductTag
} from './src/lib/server/db/schema';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import 'dotenv/config';

const seed = async () => {
	// crete db client
	const connection = connect({
		host: process.env.DATABASE_HOST ?? '',
		username: process.env.DATABASE_USERNAME ?? '',
		password: process.env.DATABASE_PASSWORD ?? ''
	});

	const db = drizzle(connection);

	// create some products
	// NOTE: update the price id and product id to be YOUR ids
	const products = [
		{
			name: 'Demo Stripe Product',
			desc: 'A test product, the first test product made testing testing testing testing',
			// can be whatever
			id: 'my_first_product'
		},
		{
			name: 'My Second Product',
			desc: 'A second test product...',
			id: 'my_second_product'
		}
	];

	const insertedProducts = (await db.insert(product).values(products)).rows;

	console.log(`INSERTED: ${insertedProducts.length} products`);

	// create some product sizes
	// TODO STRIPE:
	// replace the stripeProductId and stripePriceId which you get from the dashboard
	const productSizes = [
		{
			code: 'first_12_12',
			width: 12,
			height: 12,
			price: 5000,
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d',
			productId: 'my_first_product'
		},
		{
			code: 'first_16_16',
			width: 16,
			height: 16,
			price: 7000,
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d',
			productId: 'my_first_product'
		},
		{
			code: 'first_24_24',
			width: 24,
			height: 24,
			price: 10000,
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d',
			productId: 'my_first_product'
		},
		{
			code: 'second_12_12',
			width: 12,
			height: 12,
			price: 5000,
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d',
			productId: 'my_second_product'
		},
		{
			code: 'second_16_16',
			width: 16,
			height: 16,
			price: 7000,
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d',
			productId: 'my_second_product'
		},
		{
			code: 'second_24_24',
			width: 24,
			height: 24,
			price: 10000,
			stripeProductId: 'prod_OyCy8ckhrmV0IM',
			stripePriceId: 'price_1OAGYBDVy0rtNA6WZ7fSwK2d',
			productId: 'my_second_product'
		}
	];

	const insertedProductSizes = (await db.insert(productSize).values(productSizes)).rows;

	console.log(`INSERTED: ${insertedProductSizes.length} product sizes`);

	// create some product images
	// TODO CLOUDINARY: update the cloudinaryIds with your own cloudinary ids
	const images = [
		{
			cloudinaryId: 'txvp48xxnytjd024vnye',
			width: 1920,
			height: 1280,
			productId: 'my_first_product'
		},
		{
			cloudinaryId: 'gfgvqtml3oujz2biaf9a',
			width: 1920,
			height: 1280,
			productId: 'my_second_product'
		},
		{
			cloudinaryId: 'zav59raocmm7xmxrzgc4',
			width: 1920,
			height: 1280,
			productId: 'my_first_product'
		},
		{
			cloudinaryId: 'iquk9myxvuqrtc3xbwqc',
			width: 1920,
			height: 1280,
			productId: 'my_second_product'
		}
	];

	const insertedImages = (await db.insert(productImage).values(images)).rows;

	console.log(`INSERTED: ${insertedImages.length} product images`);

	// create some product tags
	const productTags = [
		{
			name: 'Natural',
			desc: 'Anything formed in nature...'
		},
		{
			name: 'Aerospace',
			desc: 'Planes, spaceships, & more...'
		}
	];

	const insertedTags = (await db.insert(productTag).values(productTags)).rows;

	console.log(`INSERTED ${insertedTags.length} product tags`);

	// attach tags to products
	const productsToTags = [
		{
			productId: 'my_first_product',
			tagId: 'Natural'
		},
		{
			productId: 'my_second_product',
			tagId: 'Aerospace'
		}
	];

	const insertedTagsToProducts = (await db.insert(productToProductTag).values(productsToTags)).rows;

	console.log(`INSERTED ${insertedTagsToProducts.length} product tag relations`);
};

seed();
