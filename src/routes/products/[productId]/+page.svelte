<script>
	import { addToCart } from '$lib/client/cart';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { CldImage } from 'svelte-cloudinary';
	import { fade } from 'svelte/transition';

	export let data;

	let addedProduct = false;

	let focusedImage = data.product.images[0].cloudinaryId;
</script>

<div class="grow p-24 flex flex-col">
	<div class="w-full flex flex-row justify-center gap-x-8 items-start">
		<!-- images section -->
		<div>
			<div class="w-[600px] h-[400px] rounded-lg border-2 border-gray-800 overflow-hidden">
				<CldImage src={focusedImage} width={1200} height={800} objectFit="cover" />
			</div>
			<div class="flex flex-row items-center gap-x-4 py-4">
				{#each data.product.images as image}
					<button
						class="w-[150px] h-[100px] rounded-lg overflow-hidden hover:cursor-pointer hover:border border-gray-800"
						on:click={() => (focusedImage = image.cloudinaryId)}
					>
						<CldImage src={image.cloudinaryId} width={300} height={200} objectFit="cover" />
					</button>
				{/each}
			</div>
		</div>

		<Card.Root class="w-[400px]">
			<Card.Header class="text-xl font-bold tracking-wide">
				{data.product.name}
			</Card.Header>

			<Card.Content class="font-light text-lg">
				${(data.product.price / 100).toFixed(2)}
			</Card.Content>

			<Card.Footer>
				<Button
					on:click={() => {
						const itemData = {
							...data.product,
							quantity: 1,
							priceId: data.product.stripePriceId,
							productId: data.product.stripeId,
							cloudinaryId: data.product.images[0].cloudinaryId,
							width: data.product.images[0].width,
							height: data.product.images[0].height
						};
						addToCart(itemData);
						addedProduct = true;
						setTimeout(() => {
							addedProduct = false;
						}, 4000);
					}}>Add to Cart</Button
				>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

{#if addedProduct}
	<div transition:fade class="absolute bottom-12 right-12">
		<Alert.Root class="w-[500px]">
			<Alert.Title>Added to Your Cart!</Alert.Title>
			<Alert.Description>Please proceed to the cart to checkout.</Alert.Description>
		</Alert.Root>
	</div>
{/if}
