import { browser } from '$app/environment';

export type TCartEntry = {
	priceId: string;
	quantity: number;
	price: number;
	name: string;
	desc: string;
	cloudinaryId: string;
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

export const clearCart = () => {
	if (!browser) return;

	localStorage.setItem('cart', JSON.stringify([]));
};

export const removeFromCart = (idx: number) => {
	if (!browser) return;

	const cur = localStorage.getItem('cart');
	if (cur) {
		const items = JSON.parse(cur) as TCartEntry[];
		items.splice(idx, 1);
		localStorage.setItem('cart', JSON.stringify(items));
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
