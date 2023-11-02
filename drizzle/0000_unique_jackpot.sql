CREATE TABLE `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stripe_order_id` text NOT NULL,
	`stripe_customer_id` text NOT NULL,
	`total_price` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `order_product` (
	`id` text,
	`quantity` integer,
	`status` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `product`(`stripe_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`stripe_id` text PRIMARY KEY NOT NULL,
	`price` integer NOT NULL,
	`name` text NOT NULL,
	`desc` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_image` (
	`id` text,
	`cloudinary_id` text,
	FOREIGN KEY (`id`) REFERENCES `product`(`stripe_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_review` (
	`id` text,
	`rating` integer NOT NULL,
	`review_text` text,
	FOREIGN KEY (`id`) REFERENCES `product`(`stripe_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`is_admin` integer,
	`email` text
);
