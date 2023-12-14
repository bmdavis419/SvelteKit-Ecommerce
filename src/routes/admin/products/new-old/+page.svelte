<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { CldImage, CldUploadButton } from 'svelte-cloudinary';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';

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

	const removeImage = (idx: number) => {
		const copy = images;
		copy.splice(idx, 1);
		images = copy;
	};
</script>

<form
	class="w-full h-full p-4 flex flex-col gap-y-6"
	method="post"
	use:enhance={({ formData, cancel }) => {
		// ensure there is at least one image
		const images = formData.getAll('images');

		if (images.length === 0) {
			alert('must include at least one image');
			cancel();
		}

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
		<Input name="name" required id="name" class="w-1/3" type="text" placeholder="My Product" />
	</div>

	<div class="gap-1.5 grid">
		<Label for="stripeProductId">Stripe Product Id</Label>
		<Input
			name="stripeProductId"
			required
			type="text"
			id="stripeProductId"
			placeholder="prod_10AF..."
			class="w-1/3"
		/>
		<p class="text-sm text-muted-foreground w-1/3">
			The id of the product you created in Stripe, make sure you get this from the dashboard!
		</p>
	</div>

	<div class="gap-1.5 grid">
		<Label for="stripePriceId">Stripe Price Id</Label>
		<Input
			name="stripePriceId"
			required
			id="stripePriceId"
			class="w-1/3"
			type="text"
			placeholder="price_10AF..."
		/>
		<p class="text-sm text-muted-foreground w-1/3">
			The price id, not product id of your product in Stripe. This is found lower on the page.
		</p>
	</div>

	<div class="gap-1.5 grid">
		<Label for="price">Price</Label>
		<Input name="price" required type="number" id="price" class="w-1/3" placeholder="1000" />
		<p class="text-sm text-muted-foreground w-1/3">
			Enter the number of cents your product costs. This is done to stay in line with Stripe.
		</p>
	</div>

	<div class="gap-1.5 grid">
		<Label for="desc">Description</Label>
		<Textarea
			name="desc"
			id="desc"
			class="w-1/3"
			required
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</div>

	<!-- cloudinary section -->
	<div class="flex flex-row items-center">
		{#each images as image, i}
			<div class="relative w-[168px] h-[100px] rounded-lg overflow-hidden">
				<CldImage src={image.publicId} width={168 * 2} height={100 * 2} objectFit="cover" />
				<button
					class="absolute w-full h-full items-center flex justify-center inset-0 bg-opacity-0 hover:bg-opacity-70 bg-gray-900 z-30 text-white text-opacity-0 hover:text-opacity-100 hover:cursor-pointer"
					type="button"
					on:click={() => {
						removeImage(i);
					}}
				>
					Delete
				</button>
				<!-- being a little fancy here creating form elements so that our form can submit without progressive enhancement... -->
				<input value={JSON.stringify(image)} class="hidden" name="images" />
			</div>
		{/each}
	</div>

	<div class="w-full flex justify-start items-center gap-x-4">
		<CldUploadButton
			uploadPreset="admin-upload"
			class="px-4 py-2 rounded-lg border-gray-900 bg-white text-gray-900 border font-semibold hover:bg-gray-200"
			onUpload={(res) => {
				if (res.event === 'success') {
					addImage(res.info);
				}
			}}
		/>
		<Button type="submit">Create</Button>
	</div>
</form>

<!-- would really love svelte 5 snippets here for the inputs... -->
