<script>
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { CldImage } from 'svelte-cloudinary';
	import { fade } from 'svelte/transition';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { addToCart } from '$lib/client/cart';

	export let data;

	let selectedSizeIdx = 0;

	let addedProduct = false;

	let focusedImage = data.product.images[0].cloudinaryId || '';
</script>

<div class="grow p-24 flex flex-col">
	<div class="w-full flex flex-row justify-center gap-x-8 items-start">
		<!-- images section -->
		<div>
			<div class="w-[600px] h-[400px] rounded-lg border-2 border-gray-800 overflow-hidden">
				<CldImage src={focusedImage} width={1200} height={800} objectFit="cover" />
			</div>
			<div class="flex flex-row items-center gap-x-4 py-4">
				{#each data.product.images as image}
					<button
						class="w-[150px] h-[100px] rounded-lg overflow-hidden hover:cursor-pointer hover:border border-gray-800"
						on:click={() => (focusedImage = image.cloudinaryId || '')}
					>
						<CldImage src={image.cloudinaryId || ''} width={300} height={200} objectFit="cover" />
					</button>
				{/each}
			</div>
		</div>

		<Card.Root class="w-[400px]">
			<Card.Header class="text-xl font-bold tracking-wide">
				{data.product.name}
			</Card.Header>

			<Card.Content class="font-light">
				<p>{data.product.desc}</p>
			</Card.Content>

			<Card.Footer class="flex flex-col gap-y-4">
				<div class="w-full flex flex-row justify-start gap-x-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="outline">
								{data.product.sizes[selectedSizeIdx].width} x {data.product.sizes[selectedSizeIdx]
									.height}
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Select a Size</DropdownMenu.Label>
								<DropdownMenu.Separator />
								{#each data.product.sizes as size, i}
									<DropdownMenu.Item on:click={() => (selectedSizeIdx = i)}
										>{size.width} x {size.height}</DropdownMenu.Item
									>
								{/each}
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Button
						on:click={() => {
							addToCart({
								productId: data.product.id,
								productName: data.product.name,
								productImage: data.product.images[0].cloudinaryId,
								size: {
									width: data.product.sizes[selectedSizeIdx].width,
									height: data.product.sizes[selectedSizeIdx].height,
									code: data.product.sizes[selectedSizeIdx].code,
									stripePriceId: data.product.sizes[selectedSizeIdx].stripePriceId,
									price: data.product.sizes[selectedSizeIdx].price
								},
								quantity: 1
							});
							addedProduct = true;
							setTimeout(() => {
								addedProduct = false;
							}, 4000);
						}}>Add to Cart ${(data.product.sizes[selectedSizeIdx].price / 100).toFixed()}</Button
					>
				</div>
				<p class="text-xs italic font-light text-neutral-300">
					NOTE: not all images are available in all sizes, to ensure maximum quality we limit the
					sizes for each image
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

{#if addedProduct}
	<div transition:fade class="absolute bottom-12 right-12">
		<Alert.Root class="w-[500px]">
			<Alert.Title>Added to Your Cart!</Alert.Title>
			<Alert.Description>Please proceed to the cart to checkout.</Alert.Description>
		</Alert.Root>
	</div>
{/if}
