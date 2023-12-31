import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, int, primaryKey } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	isAdmin: integer('is_admin', { mode: 'boolean' }).notNull(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	stripeCustomerId: text('stripe_customer_id').notNull()
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session)
}));

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: int('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const product = sqliteTable('product', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	desc: text('desc').notNull()
});

export const productRelations = relations(product, ({ many }) => ({
	tags: many(productToProductTag),
	sizes: many(productSize),
	images: many(productImage),
	reviews: many(productReview)
}));

export const productToProductTag = sqliteTable(
	'product_to_product_tag',
	{
		productId: text('product_id')
			.notNull()
			.references(() => product.id),
		tagId: text('tag_id')
			.notNull()
			.references(() => productTag.name)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.productId, table.tagId] })
		};
	}
);

export const productToProductTagRelations = relations(productToProductTag, ({ one }) => ({
	product: one(product, {
		fields: [productToProductTag.productId],
		references: [product.id]
	}),
	tag: one(productTag, {
		fields: [productToProductTag.tagId],
		references: [productTag.name]
	})
}));

export const productTag = sqliteTable('product_tag', {
	name: text('name').primaryKey(),
	desc: text('desc').notNull()
});

export const productTagRelations = relations(productTag, ({ many }) => ({
	products: many(productToProductTag)
}));

export const productSize = sqliteTable('product_size', {
	code: text('code').primaryKey(),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	price: integer('price', { mode: 'number' }).notNull(),
	stripePriceId: text('stripe_price_id').notNull(),
	stripeProductId: text('stripe_product_id').notNull(),
	productId: text('product_id')
		.notNull()
		.references(() => product.id)
});

export const productSizeRelations = relations(productSize, ({ one }) => ({
	product: one(product, {
		fields: [productSize.productId],
		references: [product.id]
	})
}));

export const productImage = sqliteTable('product_image', {
	cloudinaryId: text('cloudinary_id').primaryKey(),
	productId: text('product_id')
		.notNull()
		.references(() => product.id),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	isPrimary: integer('is_primary', { mode: 'boolean' }).default(false).notNull()
});

export const productImageRelations = relations(productImage, ({ one }) => ({
	product: one(product, {
		fields: [productImage.productId],
		references: [product.id]
	})
}));

export const productReview = sqliteTable('product_review', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	rating: integer('rating').notNull(),
	reviewText: text('review_text'),
	productId: text('product_id').references(() => product.id),
	timestamp: int('timestamp', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const productReviewRelations = relations(productReview, ({ one }) => ({
	product: one(product, {
		fields: [productReview.productId],
		references: [product.id]
	})
}));

export const order = sqliteTable('order', {
	// this is really the checkout session id
	stripeOrderId: text('stripe_order_id').primaryKey(),
	stripeCustomerId: text('stripe_customer_id').notNull(),
	totalPrice: integer('total_price').notNull(),
	timestamp: int('timestamp', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`)
});

export const orderRelations = relations(order, ({ many }) => ({
	products: many(orderProduct)
}));

export const orderProduct = sqliteTable('order_product', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	productSizeCode: text('product_size_code')
		.notNull()
		.references(() => productSize.code),
	quantity: integer('quantity'),
	status: text('status', { enum: ['placed', 'fulfilled'] }).notNull(),
	trackingNumber: text('tracking_number'),
	orderId: text('order_id').references(() => order.stripeOrderId)
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
	order: one(order, {
		fields: [orderProduct.orderId],
		references: [order.stripeOrderId]
	})
}));
