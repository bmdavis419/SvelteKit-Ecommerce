import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, int } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	first_name: text('first_name').notNull(),
	last_name: text('last_name').notNull(),
	is_admin: integer('is_admin', { mode: 'boolean' }).notNull(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expires_at: int('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export const product = sqliteTable('product', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	desc: text('desc').notNull()
});

export const productSize = sqliteTable('product_size', {
	code: text('code').primaryKey(),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	price: integer('price', { mode: 'number' }).notNull(),
	stripePriceId: text('stripe_price_id').notNull(),
	stripeProductId: text('stripe_product_id').primaryKey()
});

export const productImage = sqliteTable('product_image', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	cloudinaryId: text('cloudinary_id'),
	productId: text('product_id').references(() => product.stripeProductId),
	width: integer('width').notNull(),
	height: integer('height').notNull()
});

export const productReview = sqliteTable('product_review', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	rating: integer('rating').notNull(),
	reviewText: text('review_text'),
	productId: text('product_id').references(() => product.stripeProductId)
});

export const order = sqliteTable('order', {
	// this is really the checkout session id
	stripeOrderId: text('stripe_order_id').primaryKey(),
	stripeCustomerId: text('stripe_customer_id').notNull(),
	totalPrice: integer('total_price').notNull(),
	timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`)
});

export const orderProduct = sqliteTable('order_product', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	productId: text('product_id').references(() => product.stripeProductId),
	quantity: integer('quantity'),
	status: text('status', { enum: ['placed', 'fulfilled'] }).notNull(),
	orderId: text('order_id').references(() => order.stripeOrderId)
});
