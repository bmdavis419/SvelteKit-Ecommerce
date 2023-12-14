<script>
	import ProductCard from '$lib/components/ProductCard.svelte';

	export let data;
</script>

<main class="grow w-full p-8 container">
	<div class="flex flex-row flex-wrap gap-8">
		{#each data.products as product}
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tag.name)
				}}
			/>
		{/each}
	</div>
</main>
