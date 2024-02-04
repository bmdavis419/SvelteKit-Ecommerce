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

	export let data;

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

<div class="w-full  sm:min-h-[100vh] flex md:px-20 md:py-4 md:gap-x-16 bg-white flex-col gap-3 px-2">
	<div class="md:text-4xl text-3xl font-semibold text-black ">Review Shopping Cart</div>
		
		<div class="flex flex-row items-center gap-1 text-neutral-500 md:text-2xl sm:text-xl sm:font-light">
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
			<div><span class="text-green-600">FREE shipping </span>on all launch collection orders</div>
		</div>

		{#if cart.find((el) => el.size.width >= 11) != undefined}
			<div class="flex flex-row gap-1 items-center text-neutral-500 md:text-2xl sm:text-xl sm:font-light">
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
		
		<div class="flex flex-row justify-center items-center sm:justify-end sm:top-[77px] w-full sticky top-[62px] bg-white p-3">
			<div class="text-xl font-light text-neutral-600 px-3">
				Subtotal <span class="text-xl font-semibold text-black">
					${cart.length > 0
						? (
								cart.reduce((sum, el) => sum + el.size.price * el.quantity, 0) / 100
						  ).toFixed(2)
						: '0.00'}
				</span>
			</div>
			<form
			method="post"
			on:submit|preventDefault={handleSubmit}
		>
			{#if data.isSoldOut}
				<Button type="submit" disabled={true}>Sold out</Button>
			{:else if data.user}
				<Button
					disabled={cart.length == 0}
					class="bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
				>
					{cart.length > 0
						? `Check Out (${cart.length} item${cart.length == 1 ? '' : 's'})`
						: 'Please pick an item first'}
				</Button>
			{:else if cart.length == 0}
				<Button
					disabled={cart.length == 0}
					class="bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
				>
					{cart.length > 0
						? `Check Out (${cart.length} items)`
						: 'Please pick an item first'}
				</Button>
			{:else}
				<Dialog.Root>
					<Dialog.Trigger>
						<Button
							class="bg-[#0071e3] drop-shadow-sm hover:bg-neutral-900 text-lg p-6 font-light rounded-lg"
						>
							{cart.length > 0
								? `Check Out (${cart.length} item${cart.length == 1 ? '' : 's'})`
								: 'Please pick an item first'}
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
		<div class="bg-neutral-300 h-[1px] w-full"></div>
		
	<div class=" md:rounded-lg">
		
		<div class="flex flex-col md:flex-row flex-wrap">
			{#each cart as cartItem, i}
				<div class="w-full md:mx-auto py-2 justify-center flex flex-row gap-2 md:gap-10 p-2">
					<div class="w-1/2 md:w-[200px] rounded-lg overflow-hidden h-full">
						<CldImage src={cartItem.productImage} width={400} height={400} objectFit="cover" />
					</div>
					<div class="flex flex-col gap-1 sm:gap-3 w-1/2">
						<div class="flex flex-col sm:flex-row sm:items-center justify-between">
							<div class="text-2xl md:text-4xl font-jura">{cartItem.productName}</div>
							<div class="text-xl font-bold">${(cartItem.size.price * cartItem.quantity / 100).toFixed(2)}</div>

						</div>
						<div class="text-xl text-neutral-600">
							{cartItem.size.width}" x {cartItem.size.height}"
						</div>
						<div class="flex flex-row items-center gap-3">
							<Button
								variant="outline"
								disabled={cartItem.quantity == 1}
								on:click={() => {
									decrementQuantity(i);
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
						<button class="text-blue-600 text-left" on:click={() => {
							removeFromCart(i);
							cart = getCart();
						}}>Remove</button>
						<!-- <Button
							variant="ghost"
							class="p-0"
							on:click={() => {
								removeFromCart(i);
								cart = getCart();
							}}>Delete</Button
						> -->
					</div>
				</div>
				<div class="bg-neutral-300 h-[1px] w-2/3 mx-auto"></div>

			{/each}
		</div>
	</div>
</div>
