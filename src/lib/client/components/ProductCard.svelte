<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { addToCart, type TCartEntry } from '../cart';

	export let itemData: TCartEntry & {
		cloudinaryId: string;
		productId: string;
	};
</script>

<div class="relative group overflow-hidden rounded-lg">
	<CldImage
		width={200}
		height={200}
		objectFit="fill"
		src={itemData.cloudinaryId}
		alt="Description of my image"
		sizes="100vw"
	/>
	<div class="bg-white p-4">
		<h3 class="font-semibold text-lg md:text-xl">{itemData.name}</h3>
		<h4 class="font-semibold text-base md:text-lg">${itemData.price / 100}</h4>
		<button
			class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
			on:click={() => {
				addToCart(itemData);
			}}
		>
			Add to Cart
		</button>
		<a class="font-bold" href={`/products/${itemData.productId}`}>View Product</a>
	</div>
</div>
