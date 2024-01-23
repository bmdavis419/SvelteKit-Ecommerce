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
		DrawerTrigger,
	} from "../../lib/components/ui/drawer" 
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

<main class="grow w-full sm:p-8 py-6 sm:container sm:grid sm:grid-cols-4 gap-4 flex flex-col">
	<div class="flex flex-row w-full sm:hidden gap-2 px-2 justify-center">
		<Tabs class="w-1/2">
			<TabsList class="flex flex-row rounded-full py-3 bg-gray-800/80">
				<TabsTrigger
					class="rounded-full w-1/2"
					value="account"
					on:click={() => (displayMode = 'sm')}
				>
					<svg
						width="18"
						height="23"
						viewBox="0 0 18 23"
						fill={displayMode == 'sm' ? 'white' : 'none'}
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect x="0.5" y="0.5" width="7" height="10" rx="0.5" stroke="white" />
						<rect x="10.5" y="0.5" width="7" height="10" rx="0.5" stroke="white" />
						<rect x="10.5" y="12.5" width="7" height="10" rx="0.5" stroke="white" />
						<rect x="0.5" y="12.5" width="7" height="10" rx="0.5" stroke="white" />
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
						fill={displayMode == 'sm' ? 'none' : 'white'}
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect x="0.5" y="0.5" width="17" height="22" rx="0.5" stroke="white" />
					</svg>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account" />
			<TabsContent value="password" />
		</Tabs>
		
		<Drawer>
			<DrawerTrigger class="w-1/2 p-0 h-[40px]">
				<div
					class="rounded-full w-full h-[40px] bg-gray-800/80 flex flex-row justify-center items-center gap-3 text-md font-semibold uppercase"
				>
				
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-sliders-horizontal"
						><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line
							x1="21"
							x2="12"
							y1="12"
							y2="12"
						/><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line
							x1="12"
							x2="3"
							y1="20"
							y2="20"
						/><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line
							x1="16"
							x2="16"
							y1="18"
							y2="22"
						/></svg
					>
					Filter
				</div>
			</DrawerTrigger>
			<DrawerContent>
			  <DrawerHeader>
				<DrawerTitle>Are you absolutely sure?</DrawerTitle>
				<DrawerDescription>This action cannot be undone.</DrawerDescription>
			  </DrawerHeader>
			  <DrawerFooter>
				<Button>Submit</Button>
				<DrawerClose>
				  <Button variant="outline">Cancel</Button>
				</DrawerClose>
			  </DrawerFooter>
			</DrawerContent>
		  </Drawer>
		
	</div>
	<div class="h-full col-span-1 sm:flex hidden">
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
	<div class="flex sm:flex-col flex-row items-left sm:col-span-3 flex-wrap place-content-evenly">
		{#each data.products as product}
			<ProductCard
				itemData={{
					name: product.name,
					productId: product.id,
					cloudinaryId: product.images.length > 0 ? product.images[0].cloudinaryId : null,
					tags: product.tags.map((tag) => tag.tagId),
					selectTag: addParam,
					displayMode: displayMode
				}}
			/>
		{/each}
	</div>
</main>
