<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	export let name: string;
	export let cloudinaryId: string;
	export let price: number;
	export let productId: string;
</script>

<div class="relative group overflow-hidden rounded-lg">
	<a class="absolute inset-0 z-10" href={`/products/${productId}`}>
		<span class="sr-only">View</span>
	</a>
	<CldImage
		width={200}
		height={200}
		objectFit="fill"
		src={cloudinaryId}
		alt="Description of my image"
		sizes="100vw"
	/>
	<div class="bg-white p-4">
		<h3 class="font-semibold text-lg md:text-xl">{name}</h3>
		<h4 class="font-semibold text-base md:text-lg">${price / 100}</h4>
		<a
			class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
			href={`/products/${productId}`}
		>
			{' '}
			Add to Cart{' '}
		</a>
	</div>
</div>
