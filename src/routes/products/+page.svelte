<script lang="ts">
	import { deserialize } from '$app/forms';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { page } from '$app/stores';
	import { goto, pushState } from '$app/navigation';
	import { X } from 'lucide-svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../lib/components/ui/tabs';
	import ProductPage from './[productId]/+page.svelte';
	import {
		Drawer,
		DrawerClose,
		DrawerContent,
		DrawerDescription,
		DrawerFooter,
		DrawerHeader,
		DrawerTitle,
		DrawerTrigger
	} from '../../lib/components/ui/drawer';
	import { fade, fly } from 'svelte/transition';

	export let data;

	let searchResults: { tagName: string; tagDesc: string }[] = [];

	let debounceTimer: NodeJS.Timeout | undefined;

	let searchQuery = '';

	let displayMode = 'sm';

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

	$: selected = ($page.state as any).selected;
</script>

<!-- MODAL -->
{#if selected}
	<button
		class="w-screen h-screen flex justify-center absolute top-0 left-0 z-40 bg-black bg-opacity-30"
		in:fly
		out:fade
		on:click={() => pushState('/products', { selected: undefined })}
	>
		<div class="w-3/5 mt-24 rounded-t-lg overflow-hidden z-50">
			<ProductPage data={selected} />
		</div>
	</button>
{/if}

<main class="w-full sm:p-6 flex flex-col sm:gap-4">
	<div class="flex flex-row w-full sm:hidden gap-2 pt-6 px-2 justify-center">
		<Tabs class="w-full pb-0">
			<TabsList class="flex flex-row rounded-full  bg-neutral-200">
				<TabsTrigger
					class="rounded-full w-1/2"
					value="account"
					on:click={() => (displayMode = 'sm')}
				>
					<svg
						width="18"
						height="23"
						viewBox="0 0 18 23"
						fill={displayMode == 'sm' ? 'black' : 'none'}
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect x="0.5" y="0.5" width="7" height="10" rx="0.5" stroke="black" />
						<rect x="10.5" y="0.5" width="7" height="10" rx="0.5" stroke="black" />
						<rect x="10.5" y="12.5" width="7" height="10" rx="0.5" stroke="black" />
						<rect x="0.5" y="12.5" width="7" height="10" rx="0.5" stroke="black" />
					</svg>
				</TabsTrigger>
				<TabsTrigger
					value="password"
					class="rounded-full w-1/2"
					on:click={() => (displayMode = 'lg')}
				>
					<svg
						width="18"
						height="23"
						viewBox="0 0 18 23"
						fill={displayMode == 'sm' ? 'none' : 'black'}
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect x="0.5" y="0.5" width="17" height="22" rx="0.5" stroke="black" />
					</svg>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account" />
			<TabsContent value="password" />
		</Tabs>
	</div>

	<div class="font-jura p-2">
		<span class="sm:text-3xl text-2xl text-black">{data.collectionInfo.name}.</span>
		<span class="sm:text-2xl text-xl text-gray-800">{data.collectionInfo.tagline}</span>
	</div>
	<div class="flex flex-row items-left sm:col-span-4 flex-wrap sm:place-content-start px-1">
		{#each data.products as product}
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tagId),
					selectTag: addParam,
					displayMode: displayMode,
					sizes: product.sizes,
					desc: product.desc
				}}
			/>
		{/each}
	</div>
</main>
