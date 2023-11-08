import { db } from '../db';
import { order, orderProduct } from '../db/schema';

export const createNewOrder = async (data: {
	orderId: string;
	customerId: string;
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
	productId: string;
	quantity: number;
	status: 'placed' | 'fulfilled';
}) => {
	const nProduct = await db.insert(orderProduct).values(data);

	return nProduct.lastInsertRowid;
};
