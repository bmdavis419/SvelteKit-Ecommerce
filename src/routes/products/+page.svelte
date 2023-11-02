<script>
	import ProductCard from '$lib/client/components/ProductCard.svelte';

	export let data;
</script>

<div class="flex flex-col h-screen">
	<header class="p-4 bg-white border-b border-gray-200">
		<nav class="flex items-center justify-between">
			<h1 class="font-bold text-xl">Logo</h1>
			<a href="/">
				<a class="font-medium text-gray-600 hover:text-gray-800" href="/"> Products </a>
			</a>
		</nav>
	</header>
	<main class="flex-grow p-4 flex items-center justify-center">
		{#each data.products as product}
			<ProductCard
				name={product.name}
				price={product.price}
				productId={product.stripeId}
				cloudinaryId={product.images[0].cloudinaryId}
			/>
		{/each}
	</main>
</div>
