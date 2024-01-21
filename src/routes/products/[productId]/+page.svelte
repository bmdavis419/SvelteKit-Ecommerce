<script lang="ts">
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

	// for top section spinny thing
	let curIdx = 0;
	let scrollSection: any;

	function handleScrollTop(e: any) {
		curIdx = Math.round(e.target.scrollLeft / window.screen.width);
	}

	function handleSetTopScroll(idx: number) {
		scrollSection.scrollLeft = idx * window.screen.width;
	}
</script>

<div class="grow flex flex-col pt-10 bg-black">
	<!-- DESKTOP -->
	<div class="w-full h-full lg:flex relative hidden">
		<div class="w-1/2">
			<CldImage src="txvp48xxnytjd024vnye" width={2000} height={2000} objectFit="cover" />
		</div>
		<div class="w-1/2">
			<CldImage src="gfgvqtml3oujz2biaf9a" width={2000} height={2000} objectFit="cover" />
		</div>

		<Card.Root
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-center flex-col"
		>
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
				<p class="text-xs italic font-light text-neutral-700">
					NOTE: not all images are available in all sizes, to ensure maximum quality we limit the
					sizes for each image
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<!-- MOBILE -->
	<div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden lg:hidden">
		<!-- images section mobile -->
		<div class="w-screen overflow-hidden">
			<div
				class="overflow-x-auto snap-x snap-mandatory scroll-smooth flex slides w-full"
				on:scroll={(e) => handleScrollTop(e)}
				bind:this={scrollSection}
			>
				{#each data.product.images as image}
					<div class="snap-start w-full transform origin-center shrink-0">
						<CldImage src={image.cloudinaryId} width={1000} height={1000} objectFit="cover" />
					</div>
				{/each}
			</div>
		</div>

		<div class="flex gap-x-2">
			{#each data.product.images as _, i}
				<button
					on:click={() => handleSetTopScroll(i)}
					class={`w-[10px] h-[10px] ${i === curIdx && 'bg-white'} rounded-full border border-white`}
				/>
			{/each}
		</div>

		<Card.Root class=" border-0">
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
				<p class="text-xs italic font-light text-neutral-700">
					NOTE: not all images are available in all sizes, to ensure maximum quality we limit the
					sizes for each image
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="p-4">
		<p class="font-light text-sm leading-5">
			“Five groupings of fabrial have been discovered so far. The methods of their creation are
			carefully guarded by the artifabrian community, but they appear to be the work of dedicated
			scientists, as opposed to the more mystical Surgebindings once performed by the Knights
			Radiant. I am more and more convinced that the creation of these devices requires forced
			enslavement of transformative cognitive entities, known as “spren” to the local communities.”
			Excerpt From Rhythm of War Brandon Sanderson.
		</p>
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

<style>
	.slides::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	.slides::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}
	.slides::-webkit-scrollbar-track {
		background: transparent;
	}
</style>
