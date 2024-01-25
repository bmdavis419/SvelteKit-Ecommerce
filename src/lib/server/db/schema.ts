import { relations } from 'drizzle-orm';
import {
	mysqlTable,
	text,
	int,
	primaryKey,
	boolean,
	timestamp,
	varchar,
	mysqlEnum,
	datetime
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	// the id is in the following format: {PROVIDER}|{USER_ID}
	// PROVIDER can be one of the following: "github", "google", "apple"
	id: varchar('id', { length: 100 }).primaryKey(),
	firstName: varchar('first_name', { length: 100 }).notNull(),
	lastName: varchar('last_name', { length: 100 }).notNull(),
	isAdmin: boolean('is_admin').notNull(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	stripeCustomerId: varchar('stripe_customer_id', { length: 100 }).unique()
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session)
}));

export const session = mysqlTable('session', {
	id: varchar('id', { length: 100 }).primaryKey(),
	userId: varchar('user_id', { length: 100 }).notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const emailList = mysqlTable('email_list', {
	email: varchar('email', { length: 255 }).primaryKey(),
	subscribedAt: datetime('subscribed_at').notNull(),
	unsubscribedAt: datetime('unsubscribed_at'),
	// used to unsub
	key: varchar('key', { length: 20 }).notNull()
});

export const product = mysqlTable('product', {
	id: varchar('id', { length: 100 }).primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	desc: text('desc').notNull(),
	gradientColorStart: varchar('gradient_color_start', { length: 20 })
		.notNull()
		.default('from-red-600'),
	gradientColorVia: varchar('gradient_color_via', { length: 20 })
		.notNull()
		.default('via-purple-500'),
	gradientColorStop: varchar('gradient_color_end', { length: 20 })
		.notNull()
		.default('to-indigo-400')
});

export const productRelations = relations(product, ({ many }) => ({
	tags: many(productToProductTag),
	sizes: many(productSize),
	images: many(productImage),
	reviews: many(productReview)
}));

export const productToProductTag = mysqlTable(
	'product_to_product_tag',
	{
		productId: varchar('product_id', { length: 100 }).notNull(),
		tagId: varchar('tag_id', { length: 100 }).notNull()
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

export const productTag = mysqlTable('product_tag', {
	name: varchar('name', { length: 100 }).primaryKey(),
	desc: text('desc').notNull()
});

export const productTagRelations = relations(productTag, ({ many }) => ({
	products: many(productToProductTag)
}));

export const productSize = mysqlTable('product_size', {
	code: varchar('code', { length: 100 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull().default('my product'),
	isAvailable: boolean('is_available').notNull().default(true),
	width: int('width').notNull(),
	height: int('height').notNull(),
	price: int('price').notNull(),
	stripePriceId: varchar('stripe_price_id', { length: 100 }).notNull(),
	stripeProductId: varchar('stripe_product_id', { length: 100 }).notNull(),
	productId: varchar('product_id', { length: 100 }).notNull()
});

export const productSizeRelations = relations(productSize, ({ one }) => ({
	product: one(product, {
		fields: [productSize.productId],
		references: [product.id]
	})
}));

export const productImage = mysqlTable('product_image', {
	cloudinaryId: varchar('cloudinary_id', { length: 255 }).primaryKey(),
	productId: varchar('product_id', { length: 100 }).notNull(),
	width: int('width').notNull(),
	height: int('height').notNull(),
	isVertical: boolean('is_vertical').notNull().default(false),
	order: int('order').notNull().default(0),
	isPrimary: boolean('is_primary').default(false).notNull()
});

export const productImageRelations = relations(productImage, ({ one }) => ({
	product: one(product, {
		fields: [productImage.productId],
		references: [product.id]
	})
}));

export const productReview = mysqlTable('product_review', {
	id: varchar('id', { length: 100 }).primaryKey(),
	rating: int('rating').notNull(),
	reviewText: text('review_text'),
	productId: varchar('product_id', { length: 100 }),
	timestamp: timestamp('timestamp').$defaultFn(() => new Date())
});

export const productReviewRelations = relations(productReview, ({ one }) => ({
	product: one(product, {
		fields: [productReview.productId],
		references: [product.id]
	})
}));

export const order = mysqlTable('order', {
	// this is really the checkout session id
	stripeOrderId: varchar('stripe_order_id', { length: 100 }).primaryKey(),
	stripeCustomerId: varchar('stripe_customer_id', { length: 100 }),
	totalPrice: int('total_price').notNull(),
	timestamp: timestamp('timestamp').notNull(),
	status: mysqlEnum('status', ['new', 'placed', 'packaged', 'sent']).notNull().default('new')
});

export const orderRelations = relations(order, ({ many }) => ({
	products: many(orderProduct)
}));

export const orderProduct = mysqlTable('order_product', {
	id: varchar('id', { length: 20 }).primaryKey(),
	productSizeCode: varchar('product_size_code', { length: 100 }).notNull(),
	quantity: int('quantity').notNull(),
	orderId: varchar('order_id', { length: 100 }).notNull()
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
	order: one(order, {
		fields: [orderProduct.orderId],
		references: [order.stripeOrderId]
	})
}));
