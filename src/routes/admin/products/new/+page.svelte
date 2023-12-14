<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<form
	class="h-full p-4 flex flex-col gap-y-6 w-full items-center justify-center"
	method="post"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			}

			if (result.type === 'error') {
				alert(`ERROR: ${result.error.message}`);
			}
		};
	}}
>
	<h2 class="text-gray-200 text-3xl font-bold">Create New Product</h2>
	<div class="gap-1.5 grid">
		<Label for="name">Name</Label>
		<Input name="name" required id="name" class="w-[600px]" type="text" placeholder="My Product" />
	</div>

	<div class="gap-1.5 grid">
		<Label for="desc">Description</Label>
		<Textarea
			name="desc"
			id="desc"
			class="w-[600px]"
			required
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</div>

	<div class="w-full flex justify-center items-center gap-x-4">
		<Button type="submit">Create</Button>
	</div>
</form>
