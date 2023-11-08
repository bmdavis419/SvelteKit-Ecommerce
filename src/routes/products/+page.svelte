<script>
	import { getCart } from '$lib/client/cart';
	import ProductCard from '$lib/client/components/ProductCard.svelte';

	export let data;
</script>

<main class="grow w-full p-8">
	<div>
		{#each data.products as product}
			<ProductCard
				itemData={{
					...product,
					quantity: 1,
					priceId: product.stripePriceId,
					productId: product.stripeProductId,
					cloudinaryId: product.images[0].cloudinaryId
				}}
			/>
		{/each}
	</div>
	<button
		on:click={() => {
			const cart = getCart();
			console.log(cart);
		}}>TEST CART</button
	>
</main>
