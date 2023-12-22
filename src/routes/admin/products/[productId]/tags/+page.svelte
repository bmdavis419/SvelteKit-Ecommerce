<script lang="ts">
	import { deserialize } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Table from '$lib/components/ui/table';
	import { Plus, Trash, Pencil, MinusCircle } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

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

	async function handleRemoveTagFromProduct(tagName: string) {
		const formData = new FormData();

		formData.append('tagName', tagName);

		const response = await fetch(`/admin/products/${data.productId}/tags?/removeTagFromProduct`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			invalidateAll();
		}
	}

	async function handleDeleteTag(tagName: string) {
		const formData = new FormData();

		formData.append('tagName', tagName);

		const response = await fetch(`/admin/products/${data.productId}/tags?/deleteTag`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			invalidateAll();
		}
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
						<Tooltip.Root>
							<Tooltip.Trigger asChild let:builder>
								<Button builders={[builder]} class="bg-blue-600 text-white hover:bg-blue-500">
									<Pencil class="w-4 h-4" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>Edit Tag</p>
							</Tooltip.Content>
						</Tooltip.Root>

						<Tooltip.Root>
							<Tooltip.Trigger asChild let:builder>
								<Button
									builders={[builder]}
									class="bg-yellow-600 text-white hover:bg-yellow-500"
									on:click={() => handleRemoveTagFromProduct(tagSelected.name)}
								>
									<MinusCircle class="w-4 h-4" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>Remove Tag From Product</p>
							</Tooltip.Content>
						</Tooltip.Root>
						<Tooltip.Root>
							<AlertDialog.Root>
								<Tooltip.Trigger asChild let:builder>
									<AlertDialog.Trigger>
										<Button builders={[builder]} class="bg-red-600 text-white hover:bg-red-500">
											<Trash class="w-4 h-4" />
										</Button>
									</AlertDialog.Trigger>
								</Tooltip.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Description>
											This action cannot be undone. This will permanently delete your tag and remove
											this tag from our servers.
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
										<AlertDialog.Action on:click={() => handleDeleteTag(tagSelected.name)}
											>Delete</AlertDialog.Action
										>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
							<Tooltip.Content>
								<p>Delete Tag</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
