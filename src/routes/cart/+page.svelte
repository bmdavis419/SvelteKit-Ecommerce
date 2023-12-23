<script lang="ts">
	import { clearCart, getCart, removeFromCart } from '$lib/client/cart';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Trash, XSquare, ShoppingBasket } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { CldImage } from 'svelte-cloudinary';

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

<div class="w-full flex flex-row items-center p-20 gap-x-16">
	<Table.Root class="grow">
		<Table.Caption>your cart</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[300px]">name</Table.Head>
				<Table.Head>size</Table.Head>
				<Table.Head>quantity</Table.Head>
				<Table.Head>price</Table.Head>
				<Table.Head class="text-right">remove</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each cart as cartItem, i}
				<Table.Row>
					<Table.Cell class="font-medium flex flex-row items-center gap-x-2 w-[300px]">
						<div class="w-[60px] h-[40px] rounded-lg overflow-hidden">
							<CldImage src={cartItem.productImage} width={120} height={80} objectFit="cover" />
						</div>
						{cartItem.productName}</Table.Cell
					>
					<Table.Cell>{cartItem.size.width} x {cartItem.size.height}</Table.Cell>
					<Table.Cell>{cartItem.quantity}</Table.Cell>
					<Table.Cell>${(cartItem.size.price / 100).toFixed(2)}</Table.Cell>
					<Table.Cell class="text-right"
						><Button on:click={() => removeFromCart(i)}>
							<Trash class="w-4 h-4" />
						</Button></Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<Card.Root class="w-1/3">
		<Card.Header>
			<Card.Title>your cart</Card.Title>
			<Card.Description>all items currently in your cart</Card.Description>
		</Card.Header>
		<Card.Content>
			<h3 class="py-3">
				total: ${cart.length > 0
					? (
							cart.reduce((prev, curr) => {
								return {
									...prev,
									size: {
										...prev.size,
										price: prev.size.price + curr.size.price
									}
								};
							}).size.price / 100
					  ).toFixed(2)
					: '$0.00'}
			</h3>
			<Separator />
			<h3 class="py-3">shipping: ${(cart.length * 25).toFixed(2)}</h3>
			<Separator />
			<h5 class="italic text-sm font-light text-neutral-400 py-3">
				taxes are calculated at checkout
			</h5>
		</Card.Content>
		<Card.Footer>
			<form
				class="flex flex-row justify-center gap-x-5 w-full"
				method="post"
				on:submit|preventDefault={handleSubmit}
			>
				<Button
					class=""
					type="button"
					on:click={() => {
						clearCart();
						cart = getCart();
					}}
				>
					<XSquare class="w-4 h-4 mr-2" />
					clear cart</Button
				>
				<Button type="submit" class="">
					<ShoppingBasket class="w-4 h-4 mr-2" />
					checkout</Button
				>
			</form>
		</Card.Footer>
	</Card.Root>
</div>
