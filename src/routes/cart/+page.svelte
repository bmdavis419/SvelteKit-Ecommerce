<script lang="ts">
	import { clearCart, getCart, removeFromCart } from '$lib/client/cart';
	import { applyAction, deserialize, enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	$: cart = getCart();

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: JSON.stringify(cart)
		});

		const result: ActionResult<{ url: string }> = deserialize(await response.text());

		applyAction(result);
	}
</script>

<div class="w-full flex items-center justify-center">
	<div class="flex flex-col w-1/2 px-16 gap-y-4">
		{#each cart as item, i}
			<div class="flex flex-row justify-between items-center">
				<h2 class="font-bold text-lg text-slate-800">{item.name}</h2>
				<div class="flex flex-row items-center gap-x-4">
					<div class="text-md text-slate-600">{`$${item.price / 100}`}</div>
					<div>x</div>
					<div class="text-md text-slate-600">{item.quantity}</div>
					<button
						class="bg-red-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-500 hover:cursor-pointer"
						on:click={() => {
							removeFromCart(i);
							cart = getCart();
						}}>Remove</button
					>
				</div>
			</div>
			<div class="w-full border-t border-slate-900 border-opacity-50" />
		{/each}
		<form
			class="w-full flex justify-end gap-x-4"
			method="post"
			on:submit|preventDefault={handleSubmit}
		>
			<button
				class="bg-red-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-500 hover:cursor-pointer"
				type="button"
				on:click={() => clearCart()}>Clear Cart</button
			>
			<button
				type="submit"
				class="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-500 hover:cursor-pointer"
				>Checkout</button
			>
		</form>
	</div>
</div>
