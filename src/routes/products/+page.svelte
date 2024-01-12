<script lang="ts">
	import { deserialize } from '$app/forms';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { X } from 'lucide-svelte';

	export let data;

	let searchResults: { tagName: string; tagDesc: string }[] = [];

	let debounceTimer: NodeJS.Timeout | undefined;

	let searchQuery = '';

	// this feels really stupid...
	$: searchQuery !== '' && handleInputChange(searchQuery);

	function handleInputChange(query: string) {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			handleSearch(query);
		}, 400);
	}

	function addParam(param: string) {
		const curParams = $page.url.searchParams.getAll('tag');

		searchResults = [];

		searchQuery = '';

		if (!curParams.includes(param)) {
			$page.url.searchParams.append('tag', param);
			goto(`?${$page.url.searchParams.toString()}`, {
				invalidateAll: true
			});
		}
	}

	function removeParam(param: string) {
		const tags = $page.url.searchParams.getAll('tag');

		const idx = tags.findIndex((v) => v === param);

		if (idx >= 0) {
			tags.splice(idx, 1);

			$page.url.searchParams.delete('tag');

			tags.forEach((t) => {
				$page.url.searchParams.append('tag', t);
			});

			goto(`?${$page.url.searchParams.toString()}`, {
				invalidateAll: true
			});
		}
	}

	async function handleSearch(query: string) {
		const formData = new FormData();

		formData.append('query', query);

		const response = await fetch(`/products`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// grab the search results
			const { searchedTags } = result.data as {
				searchedTags: { tagName: string; tagDesc: string }[];
			};

			searchResults = searchedTags;
		}
	}
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
				class="border-t-0 border-r-0 border-l-0 border-b rounded-none"
				bind:value={searchQuery}
			/>
			<div
				class={`w-full absolute top-20 flex flex-col bg-neutral-200 rounded-md p-3 ${
					searchResults.length === 0 && 'hidden'
				}`}
			>
				{#each searchResults as result}
					<Button variant="ghost" class="w-full" on:click={() => addParam(result.tagName)}
						>{result.tagName}</Button
					>
				{/each}
			</div>
		</div>
		<div class="pt-8 flex flex-wrap gap-2">
			{#each $page.url.searchParams.getAll('tag') as tag}
				<Button
					class="text-lg font-light hover:cursor-pointer rounded-full"
					on:click={() => removeParam(tag)}
				>
					<X class="w-4 h-4 mr-2" />
					{tag}
				</Button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col items-left col-span-3">
		{#each data.products as product}
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tag.name),
					selectTag: addParam
				}}
			/>
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tag.name),
					selectTag: addParam
				}}
			/>
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tag.name),
					selectTag: addParam
				}}
			/>
		{/each}
	</div>
</main>
