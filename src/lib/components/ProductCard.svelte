<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { addToCart, type TCartEntry } from '../client/cart';
	import Button from './ui/button/button.svelte';

	export let itemData: TCartEntry & {
		cloudinaryId: string;
		productId: string;
		width: number;
		height: number;
	};
</script>

<div class="relative group overflow-hidden rounded-lg">
	<div class="flex flex-row gap-x-3">
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
	</div>
	<div class="bg-white py-2">
		<h3 class="font-semibold text-lg md:text-xl pb-2">{itemData.name} - ${itemData.price / 100}</h3>
		<Button
			on:click={() => {
				addToCart(itemData);
			}}
		>
			Add to Cart
		</Button>
		<Button class="font-bold" href={`/products/${itemData.productId}`} variant="outline"
			>View Product</Button
		>
	</div>
</div>
