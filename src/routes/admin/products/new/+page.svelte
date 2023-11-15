<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { CldImage, CldUploadButton } from 'svelte-cloudinary';

	let images: {
		publicId: string;
		width: number;
		height: number;
	}[] = [];

	const addImage = (info: Record<string, unknown>) => {
		// the type on res.info for success is Record<string, unknown>
		// the key items we want to get off of it are: public_id, width, height,

		const publicId = info.public_id as string;
		const width = parseInt(info.width as string);
		const height = parseInt(info.height as string);

		images = [
			...images,
			{
				publicId,
				width,
				height
			}
		];
	};
</script>

<form
	class="w-full h-full p-4 flex flex-col gap-y-3"
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
	<h2 class="text-slate-900 text-3xl font-bold">Create New Product</h2>
	<div>
		<label for="name" class="block text-slate-800 font-light">Name</label>
		<input
			name="name"
			required
			id="name"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			type="text"
			placeholder="My Product"
		/>
	</div>

	<div>
		<label for="stripeProductId" class="block text-slate-800 font-light">Stripe Product Id</label>
		<input
			name="stripeProductId"
			required
			type="text"
			id="stripeProductId"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			placeholder="prod_10AF..."
		/>
	</div>

	<div>
		<label for="stripePriceId" class="block text-slate-800 font-light">Stripe Price Id</label>
		<input
			name="stripePriceId"
			required
			id="stripePriceId"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			type="text"
			placeholder="price_10AF..."
		/>
	</div>

	<div>
		<label for="price" class="block text-slate-800 font-light">Price (number of cents)</label>
		<input
			name="price"
			required
			type="number"
			id="price"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			placeholder="1000"
		/>
	</div>

	<div>
		<label for="desc" class="block text-slate-800 font-light">Description</label>
		<textarea
			name="desc"
			id="desc"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			required
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</div>

	<!-- cloudinary section -->
	<div class="flex flex-row items-center">
		{#each images as image}
			<div>
				<CldImage src={image.publicId} width={356} height={200} />
				<!-- being a little fancy here creating form elements so that our form can submit without progressive enhancement... -->
				<input value={JSON.stringify(image)} class="hidden" name="images" />
			</div>
		{/each}
		<CldUploadButton
			uploadPreset="admin-upload"
			class="bg-blue-600 text-white px-4 py-1 rounded-xl"
			onUpload={(res) => {
				if (res.event === 'success') {
					addImage(res.info);
				}
			}}
		/>
	</div>

	<div class="w-full flex justify-start">
		<button
			type="submit"
			class="text-white bg-blue-600 font-bold py-1 px-4 rounded-xl hover:bg-blue-500 hover:underline"
			>Create</button
		>
	</div>
</form>

<!-- would really love svelte 5 snippets here for the inputs... -->
