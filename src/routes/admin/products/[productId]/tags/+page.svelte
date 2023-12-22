<script lang="ts">
	import { deserialize } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Table from '$lib/components/ui/table';
	import { Plus, Trash } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	export let data;

	let debounceTimer: NodeJS.Timeout | undefined;

	let searchQuery = '';

	let searchedTagsResult: {
		tagName: string;
	}[] = [];

	// this feels really stupid...
	$: searchQuery !== '' && handleInputChange(searchQuery);

	function handleInputChange(query: string) {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			handleSearch(query);
		}, 400);
	}

	async function handleCreateNewTag(tagName: string) {
		const formData = new FormData();

		formData.append('tagName', tagName);

		const response = await fetch(`/admin/products/${data.productId}/tags?/createNewTag`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			searchQuery = '';
			invalidateAll();
		}
	}

	async function handleAddTagToProduct(tagName: string) {
		const formData = new FormData();

		formData.append('tagName', tagName);

		const response = await fetch(`/admin/products/${data.productId}/tags?/addTagToProduct`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			searchQuery = '';
			invalidateAll();
		}
	}

	async function handleSearch(query: string) {
		const formData = new FormData();

		formData.append('query', query);

		const response = await fetch(`/admin/products/${data.productId}/tags?/search`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// grab the search results
			const { tags } = result.data as { tags: { tagName: string }[] };

			searchedTagsResult = tags;
		}
	}
</script>

<div class="w-full h-full flex flex-col">
	<div class="gap-1.5 grid w-full relative pb-8">
		<Label for="name">Add a Tag</Label>
		<Input
			name="name"
			required
			id="name"
			type="text"
			placeholder="My Tag"
			bind:value={searchQuery}
		/>

		{#if searchQuery !== ''}
			<div
				class="absolute top-20 left-0 z-40 w-full bg-black rounded-lg border border-neutral-400 overflow-hidden"
			>
				{#each searchedTagsResult as tagRes}
					<button
						class="flex w-full flex-row items-center justify-between p-4 hover:bg-neutral-900"
						on:click={() => handleAddTagToProduct(tagRes.tagName)}
					>
						<h3 class="text-sm font-semibold text-neutral-100 flex flex-row items-center">
							{tagRes.tagName}
						</h3>
					</button>
				{/each}
				<button
					class="flex w-full flex-row items-center justify-between p-4 hover:bg-neutral-900"
					on:click={() => handleCreateNewTag(searchQuery)}
				>
					<h3 class="text-sm font-semibold text-neutral-100 flex flex-row items-center">
						<Plus class="w-4 h-4 mr-2" /> Create New Tag
					</h3>
				</button>
			</div>
		{/if}
	</div>

	<Table.Root>
		<Table.Caption>A list of your recent invoices.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[250px]">Tag Name</Table.Head>
				<Table.Head class="">Tag Desc</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.tagsSelected as tagSelected}
				<Table.Row>
					<Table.Cell class="font-medium">{tagSelected.name}</Table.Cell>
					<Table.Cell>{tagSelected.desc}</Table.Cell>
					<Table.Cell class="text-right flex flex-row gap-x-3 justify-end items-center">
						<Button class="text-white bg-red-600"><Trash class="w-4 h-4 mr-2" />Delete Tag</Button>
						<Button class="text-white bg-red-600"><Trash class="w-4 h-4 mr-2" />Remove Tag</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
