<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { addToCart, type TCartEntry } from '../client/cart';
	import Button from './ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { fade } from 'svelte/transition';

	export let itemData: TCartEntry & {
		productId: string;
		width: number;
		height: number;
	};

	let addedProduct: string | null = null;
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<h2 class="text-xl font-bold tracking-wide">{itemData.name}</h2>
	</Card.Header>

	<Card.Content>
		<div class="w-[355px] h-[200px]">
			<CldImage
				width={355 * 2}
				height={200 * 2}
				crop="fill"
				src={itemData.cloudinaryId}
				alt="Description of my image"
				sizes="100vw"
				class="rounded-lg shadow-md"
			/>
		</div>

		<h3 class="font-semibold p-2">${itemData.price / 100}</h3>
	</Card.Content>

	<Card.Footer class="flex flex-row gap-x-4">
		<Button
			on:click={() => {
				addToCart(itemData);
				addedProduct = itemData.name;
				setTimeout(() => {
					addedProduct = null;
				}, 4000);
			}}
		>
			Add to Cart
		</Button>
		<Button class="font-bold" href={`/products/${itemData.productId}`} variant="outline"
			>View Product</Button
		>
	</Card.Footer>
</Card.Root>

{#if addedProduct}
	<div transition:fade class="absolute bottom-12 right-12">
		<Alert.Root class="w-[500px]">
			<Alert.Title>{addedProduct} Added to Your Cart!</Alert.Title>
			<Alert.Description>Please proceed to the cart to checkout.</Alert.Description>
		</Alert.Root>
	</div>
{/if}
