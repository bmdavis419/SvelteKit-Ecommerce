import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type TCartEntry = {
	productId: string;
	productImage: string;
	productName: string;
	size: {
		width: number;
		height: number;
		code: string;
		stripePriceId: string;
		price: number;
	};
	quantity: number;
};

// methods for handling the cart
export const addToCart = (data: TCartEntry) => {
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		// check if the item is already in the cart
		const curIdx = items.findIndex((c) => c.productId === data.productId);
		if (curIdx >= 0) {
			items[curIdx].quantity += 1;
		} else {
			items.push(data);
		}
		localStorage.setItem('cart', JSON.stringify(items));
		let cartSize = 0;
		items.forEach((item) => {
			cartSize += item.quantity;
		});
		cartLengthStore.set(cartSize);
	} else {
		const items = [data];
		localStorage.setItem('cart', JSON.stringify(items));
		let cartSize = 0;
		items.forEach((item) => {
			cartSize += item.quantity;
		});
		cartLengthStore.set(cartSize);
	}
};

export const decrementQuantity = (idx: number) => {
	if (!browser) return;
	
	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		items[idx].quantity -= 1
		localStorage.setItem('cart', JSON.stringify(items));
		let cartSize = 0;
		items.forEach((item) => {
			cartSize += item.quantity;
		});
		cartLengthStore.set(cartSize);
	}
}

export const clearCart = () => {
	if (!browser) return;

	localStorage.setItem('cart', JSON.stringify([]));
	cartLengthStore.set(0);
};

export const removeFromCart = (idx: number) => {
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		items.splice(idx, 1);
		localStorage.setItem('cart', JSON.stringify(items));
		let cartSize = 0;
		items.forEach((item) => {
			cartSize += item.quantity;
		});
		cartLengthStore.set(cartSize);
	}
};

export const getCart = () => {
	if (!browser) return [];

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		return items;
	}

	return [];
};

export const cartLengthStore = writable(getCart().length);
