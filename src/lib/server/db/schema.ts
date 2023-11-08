import { sql } from 'drizzle-orm';
import { sqliteTable, text, blob, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	first_name: text('first_name'),
	last_name: text('last_name'),
	is_admin: integer('is_admin', { mode: 'boolean' }),
	email: text('email')
});

export const session = sqliteTable('user_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	activeExpires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idleExpires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull()
});

export const key = sqliteTable('user_key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	hashedPassword: text('hashed_password')
});

export const product = sqliteTable('product', {
	stripePriceId: text('stripe_price_id').notNull(),
	stripeProductId: text('stripe_product_id').primaryKey(),
	price: integer('price', { mode: 'number' }).notNull(),
	name: text('name').notNull(),
	desc: text('desc').notNull()
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
