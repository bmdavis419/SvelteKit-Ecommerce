<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Check } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	export let data;

	let disableUpdate = true;

	let showSuccess = false;
</script>

<form
	class="h-full p-4 flex flex-col gap-y-6 w-full items-center justify-center"
	method="post"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'success') {
				showSuccess = true;
				disableUpdate = true;
				invalidateAll();
				setTimeout(() => {
					showSuccess = false;
				}, 3000);
			}

			if (result.type === 'error') {
				console.error(result.error);
			}
		};
	}}
>
	<h2 class="text-gray-200 text-3xl font-bold">Update Product</h2>
	<div class="gap-1.5 grid">
		<Label for="name">Name</Label>
		<Input
			name="name"
			required
			id="name"
			class="w-[600px]"
			type="text"
			placeholder="My Product"
			value={data.productBasics.name}
			on:change={() => (disableUpdate = false)}
		/>
	</div>

	<div class="gap-1.5 grid">
		<Label for="desc">Description</Label>
		<Textarea
			name="desc"
			on:change={() => (disableUpdate = false)}
			id="desc"
			class="w-[600px]"
			required
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			value={data.productBasics.desc}
		/>
	</div>

	<div class="w-full flex justify-center items-center gap-x-4">
		<Button type="submit" disabled={disableUpdate}>Update</Button>
	</div>
</form>

{#if showSuccess}
	<div class="absolute bottom-12 right-12 w-[500px]" transition:fade>
		<Alert.Root>
			<Check class="h-4 w-4" />
			<Alert.Title>Success!</Alert.Title>
			<Alert.Description>Your product's basic info has been updated.</Alert.Description>
		</Alert.Root>
	</div>
{/if}
