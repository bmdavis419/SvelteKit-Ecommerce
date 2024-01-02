<script lang="ts">
	import { CldImage, CldUploadButton } from 'svelte-cloudinary';
	import { FolderKanban, Trash, Crown } from 'lucide-svelte';
	import { invalidateAll } from '$app/navigation';
	import { deserialize } from '$app/forms';
	import { enhance } from '$app/forms';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	export let data;

	async function handleSubmit(info: Record<string, unknown>) {
		const publicId = info.public_id as string;
		const width = parseInt(info.width as string);
		const height = parseInt(info.height as string);

		const formData = new FormData();

		formData.append('cloudinaryId', publicId);
		formData.append('width', width.toString());
		formData.append('height', height.toString());

		const response = await fetch(`/admin/products/${data.productId}/images?/create`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}
	}
</script>

<div class="w-full h-full p-8 flex flex-col">
	<div class="flex flex-row flex-wrap grow gap-4">
		{#each data.images as image}
			<div
				class={`w-[300px] h-[200px] rounded-md overflow-hidden relative border-white ${
					image.isPrimary && 'border-4'
				}`}
			>
				<CldImage alt={image.cloudinaryId} src={image.cloudinaryId} width={600} height={400} objectFit="cover" />
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="w-full h-full absolute top-0 left-0 bg-neutral-800 z-40 hover:opacity-100 opacity-0 bg-opacity-60 flex flex-row items-center justify-center"
					>
						<FolderKanban class="w-4 h-4 mr-2" />
						Manage</DropdownMenu.Trigger
					>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Manage Image</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item asChild>
								<form method="POST" use:enhance action="?/markPrimary">
									<input type="hidden" name="cloudinaryId" value={image.cloudinaryId} />
									<Button variant="secondary" type="submit" class="flex w-full justify-start" disabled={image.isPrimary}>
										<Crown class="w-4 h-4 mr-2" />
										Set Primary
									</Button>
								</form>
							</DropdownMenu.Item>
							<DropdownMenu.Item asChild>
								<form method="POST" use:enhance action="?/delete">
									<input type="hidden" name="cloudinaryId" value={image.cloudinaryId} />
									<Button variant="destructive" type="submit" class="flex w-full justify-start">
										<Trash class="w-4 h-4 mr-2" />
										Delete
									</Button>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/each}
	</div>
	<div class="w-full flex flex-row justify-end">
		<CldUploadButton
			uploadPreset="admin-upload"
			class="px-4 py-2 rounded-lg border-gray-900 bg-white text-gray-900 border font-semibold hover:bg-gray-200"
			onUpload={(res) => {
				if (res.event === 'success') {
					handleSubmit(res.info);
				}
			}}
		/>
	</div>
</div>
