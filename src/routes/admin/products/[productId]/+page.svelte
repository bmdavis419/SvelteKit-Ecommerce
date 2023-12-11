<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { CldImage, CldUploadButton } from 'svelte-cloudinary';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	export let data;

	let images: {
		publicId: string;
		width: number;
		height: number;
	}[] = [];

	onMount(() => {
		// I know the map is extremely silly, should probably have the naming standardized but whatever
		images = data.product.images.map((image) => {
			return {
				publicId: image.cloudinaryId,
				...image
			};
		});
	});

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

		console.log(images);

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
		<Input
			name="name"
			required
			id="name"
			class="w-1/3"
			type="text"
			placeholder="My Product"
			value={data.product.name}
		/>
	</div>

	<div class="gap-1.5 grid">
		<Label for="stripeProductIdNO">Stripe Product Id</Label>
		<Input
			name="stripeProductIdNO"
			required
			type="text"
			value={data.product.stripeId}
			id="stripeProductIdNO"
			disabled={true}
			placeholder="prod_10AF..."
			class="w-1/3"
		/>
		<!-- this is in the top 5 most unhinged things I have ever written but idk it seems to work -->
		<input
			class="hidden"
			required
			type="text"
			value={data.product.stripeId}
			id="stripeProductId"
			name="stripeProductId"
		/>
		<p class="text-sm text-muted-foreground w-1/3 italic">This cannot be changed...</p>
	</div>

	<div class="gap-1.5 grid">
		<Label for="stripePriceId">Stripe Price Id</Label>
		<Input
			name="stripePriceId"
			value={data.product.stripePriceId}
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
		<Input
			name="price"
			required
			type="number"
			id="price"
			class="w-1/3"
			placeholder="1000"
			value={data.product.price}
		/>
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
			value={data.product.desc}
			required
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</div>

	<!-- cloudinary section -->
	<div class="flex flex-row items-center flex-wrap gap-4">
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
		<Button type="submit">Update</Button>
	</div>
</form>

<!-- would really love svelte 5 snippets here for the inputs... -->
