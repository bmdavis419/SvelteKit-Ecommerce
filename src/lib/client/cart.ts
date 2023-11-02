import { browser } from '$app/environment';

export type TCartEntry = {
	productId: string;
	quantity: number;
	price: number;
	name: string;
	desc: string;
};

// methods for handling the cart
export const addToCart = (data: TCartEntry) => {
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		items.push(data);
		localStorage.setItem('cart', JSON.stringify(items));
	} else {
		const items = [data];
		localStorage.setItem('cart', JSON.stringify(items));
	}
};

export const removeRemoveFromCart = (idx: number) => {
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		const nItems = items.splice(idx, 1);
		localStorage.setItem('cart', JSON.stringify(nItems));
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
