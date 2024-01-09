<script>
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data;

	const testResults = ['Aerospace', 'Planets', 'Nature', 'Real Life', 'Grass'];
</script>

<main class="grow w-full p-8 container grid grid-cols-4 gap-4">
	<div class="h-full col-span-1">
		<div class="gap-1.5 grid relative">
			<Label for="name">Filter by Tag</Label>
			<Input
				name="name"
				required
				id="name"
				type="text"
				placeholder="Aerospace"
				value={''}
				class="border-t-0 border-r-0 border-l-0 border-b rounded-none"
			/>
			<div class="w-full absolute top-20 flex flex-col bg-neutral-200 rounded-md p-3">
				{#each testResults as result}
					<Button variant="ghost" class="w-full">{result}</Button>
				{/each}
			</div>
		</div>
	</div>
	<div class="flex flex-col items-left col-span-3">
		{#each data.products as product}
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tag.name)
				}}
			/>
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
