<script lang="ts">
	import { clearCart, getCart, removeFromCart } from '$lib/client/cart';
	import { applyAction, deserialize, enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import * as Table from '$lib/components/ui/table';
	import { CldImage } from 'svelte-cloudinary';
	import { Button } from '$lib/components/ui/button';

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

<div class="w-full flex flex-col justify-center items-center">
	<div class="w-1/2">
		<Table.Root class="shadow-lg">
			<Table.Caption>Your Cart</Table.Caption>
			<Table.Body>
				{#each cart as item, i}
					<Table.Row>
						<Table.Cell class={`w-[150px] h-[75px]`}>
							<CldImage
								src={item.productImage}
								width={200}
								height={100}
								objectFit="cover"
								class="rounded-lg shadow-md"
							/>
						</Table.Cell>
						<Table.Cell class="text-lg  font-bold">
							{item.productName}
						</Table.Cell>
						<Table.Cell class="font-light">
							{`$${item.size.price / 100}`}
							x
							{item.quantity}
						</Table.Cell>
						<Table.Cell class="text-right">
							<Button
								class="bg-red-600 text-white"
								on:click={() => {
									removeFromCart(i);
									cart = getCart();
								}}>Remove</Button
							>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>

		<form
			class="flex flex-row justify-end gap-x-5"
			method="post"
			on:submit|preventDefault={handleSubmit}
		>
			<Button
				class="bg-red-600 text-white"
				type="button"
				on:click={() => {
					clearCart();
					cart = getCart();
				}}>Clear Cart</Button
			>
			<Button type="submit" class="bg-green-600 text-white">Checkout</Button>
		</form>
	</div>
</div>
