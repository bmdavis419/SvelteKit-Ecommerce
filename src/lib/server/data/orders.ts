import { generateId } from 'lucia';
import { db } from '../db';
import { order, orderProduct } from '../db/schema';

export const fetchAllOrders = async (take?: number, skip?: number) => {
	const orders = await db
		.select()
		.from(order)
		.offset(skip ?? 0)
		.limit(take ?? 10);

	return orders;
};

export const createNewOrder = async (data: {
	orderId: string;
	customerId: string | null;
	totalPrice: number;
}) => {
	await db.insert(order).values({
		stripeOrderId: data.orderId,
		stripeCustomerId: data.customerId,
		totalPrice: data.totalPrice,
		timestamp: new Date()
	});

	return data.orderId;
};

export const createNewOrderProduct = async (data: {
	orderId: string;
	productSizeCode: string;
	quantity: number;
	status: 'placed' | 'fulfilled';
}) => {
	const id = generateId(20);

	await db.insert(orderProduct).values({ ...data, id });

	return id;
};
