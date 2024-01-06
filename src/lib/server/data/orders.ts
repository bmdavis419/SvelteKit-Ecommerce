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
	const nOrder = await db.insert(order).values({
		stripeOrderId: data.orderId,
		stripeCustomerId: data.customerId,
		totalPrice: data.totalPrice
	});

	return nOrder.lastInsertRowid;
};

export const createNewOrderProduct = async (data: {
	orderId: string;
	productSizeCode: string;
	quantity: number;
	status: 'placed' | 'fulfilled';
}) => {
	const nProduct = await db.insert(orderProduct).values(data);

	return nProduct.lastInsertRowid;
};
