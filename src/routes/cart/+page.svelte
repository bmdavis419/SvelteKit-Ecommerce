<script lang="ts">
	import {
		clearCart,
		getCart,
		removeFromCart,
		addToCart,
		decrementQuantity
	} from '$lib/client/cart';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import * as Table from '$lib/components/ui/table';
	import { Trash, XSquare, ShoppingBasket } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { CldImage } from 'svelte-cloudinary';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: cart = getCart();

	$: subtotal =
		cart.length > 0
			? cart.reduce((prev, curr) => {
					return {
						...prev,
						size: {
							...prev.size,
							price: prev.size.price + curr.size.price * curr.quantity
						}
					};
			  }).size.price / 100
			: 0;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: JSON.stringify(cart)
		});

		const result: ActionResult<{ url: string }> = deserialize(await response.text());

		applyAction(result);
	}
</script>

<div class="w-full flex md:flex-row md:p-20 md:gap-x-16 bg-neutral-100 flex-col-reverse gap-4">
	<div class="bg-white md:bg-transparent p-2 md:rounded-lg">
		<div class="hidden md:flex text-3xl text-neutral-600">Shopping Cart</div>
		<div class="flex flex-col md:flex-row flex-wrap">
			{#each cart as cartItem, i}
				<div class="w-full md:w-1/2 py-2 flex flex-row gap-2 p-2">
					<div class="w-1/2 md:w-2/3 rounded-lg overflow-hidden">
						<CldImage src={cartItem.productImage} width={1000} height={1000} objectFit="cover" />
					</div>
					<div class="flex flex-col gap-1 w-1/2">
						<div class="text-2xl md:text-4xl font-jura">{cartItem.productName}</div>
						<div class="text-md text-neutral-600">
							{cartItem.size.width}" x {cartItem.size.height}"
						</div>
						<div class="text-lg font-bold">${(cartItem.size.price / 100).toFixed(2)}</div>
						<div class="flex flex-row items-center gap-3">
							<Button
								variant="outline"
								disabled={cartItem.quantity == 0}
								on:click={() => {
									decrementQuantity(i);
									if (cartItem.quantity == 0) {
										removeFromCart(i);
									}
									cart = getCart();
								}}>-</Button
							>
							{cartItem.quantity}
							<Button
								variant="outline"
								on:click={() => {
									addToCart(cartItem);
									cart = getCart();
								}}>+</Button
							>
						</div>
						<Button
							variant="outline"
							class="p-0"
							on:click={() => {
								removeFromCart(i);
								cart = getCart();
							}}>Delete</Button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="w-full md:w-1/4 flex flex-col gap-3 md:bg-white md:rounded-lg h-fit p-4">
		<div class="text-xl font-light">
			Subtotal <span class="font-bold text-2xl">
				${subtotal.toFixed(2)}
			</span>
		</div>
		{#if subtotal >= 100}
			<div class="flex flex-row gap-1 text-neutral-500">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
						fill="green"
					/>
				</svg>
				<div><span class="text-green-600">FREE shipping </span>for your order!</div>
			</div>
		{:else}
			<div class="flex flex-row gap-1 text-neutral-500">
				<div>
					Shipping will be calculated at checkout, all orders over $100.00 will receive free
					shipping in the US!
				</div>
			</div>
		{/if}
		{#if cart.find((el) => el.size.width >= 11) != undefined}
			<div class="flex flex-row gap-1 text-neutral-500">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
						fill="green"
					/>
				</svg>
				<div>
					<span class="text-green-600">Your order qualifies</span> for an exclusive FREE print
				</div>
			</div>
		{:else}
			<div class="text-neutral-500 italic w-full text-center">
				All orders which include a Medium print (11x14 or 11x11) will include an exclusive free
				print, add one now!
			</div>
		{/if}

		<form
			class="flex flex-row justify-center gap-x-5 w-full"
			method="post"
			on:submit|preventDefault={handleSubmit}
		>
			{#if data.isSoldOut}
				<Button type="submit" disabled={true}>Sold out</Button>
			{:else if data.user}
				<Button
					disabled={cart.length == 0}
					type="submit"
					class="bg-white md:bg-black drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
				>
					<div
						class="text-transparent bg-clip-text bg-gradient-to-br from-[#dc2626] via-[#a855f7] to-[#818cf8] text-lg"
					>
						{cart.length > 0
							? `Proceed to checkout (${cart.length} item${cart.length == 1 ? '' : 's'})`
							: 'Please pick an item first'}
					</div>
				</Button>
			{:else if cart.length == 0}
				<Button
					disabled={cart.length == 0}
					type="button"
					class="bg-white md:bg-black drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
				>
					<div
						class="text-transparent bg-clip-text bg-gradient-to-br from-[#dc2626] via-[#a855f7] to-[#818cf8] text-lg"
					>
						{cart.length > 0
							? `Proceed to checkout (${cart.length} items)`
							: 'Please pick an item first'}
					</div>
				</Button>
			{:else}
				<Dialog.Root>
					<Dialog.Trigger>
						<Button
							class="bg-white md:bg-black drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
							type="button"
						>
							<div
								class="text-transparent bg-clip-text bg-gradient-to-br from-[#dc2626] via-[#a855f7] to-[#818cf8] text-lg"
							>
								{cart.length > 0
									? `Proceed to checkout (${cart.length} item${cart.length == 1 ? '' : 's'})`
									: 'Please pick an item first'}
							</div>
						</Button></Dialog.Trigger
					>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>Account</Dialog.Title>
							<Dialog.Description>
								Would you like to create an account to save your information, manage your orders,
								and get special offers?
							</Dialog.Description>
						</Dialog.Header>
						<form
							class="flex flex-row justify-center gap-x-5 w-full"
							method="post"
							on:submit|preventDefault={handleSubmit}
						>
							<Button type="submit" class="w-full">Continue as guest</Button>
						</form>
						<Button
							type="button"
							on:click={() => goto('/auth/login')}
							class="w-full"
							variant="outline">Create account</Button
						>
					</Dialog.Content>
				</Dialog.Root>
			{/if}
		</form>
	</div>
</div>
