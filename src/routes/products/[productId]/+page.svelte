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
	while (selectedSizeIdx < data.product.sizes.length && !data.product.sizes[selectedSizeIdx].isAvailable) selectedSizeIdx++

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

<div class="grow flex flex-col sm:pt-10 w-full">
	<!-- MOBILE -->
	<div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden sm:hidden">
		<!-- images section mobile -->
		<div class="w-screen overflow-hidden relative">
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
			<div class="absolute bottom-3 left-1/2 translate-x-[-50%] flex gap-x-2">
				{#each data.product.images as _, i}
					<button
						on:click={() => handleSetTopScroll(i)}
						class={`w-[10px] h-[10px] ${
							i === curIdx && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
		</div>
	</div>
	<!-- DESKTOP -->
	<div class="h-full sm:mx-10 mx-4 sm:grid sm:grid-cols-4 flex flex-col">
		<div class="col-span-3 p-4 relative h-[85vh] hidden sm:flex">
			{#each data.product.images as im, i}
				<CldImage
					src={im.cloudinaryId}
					width={2000}
					height={1300}
					objectFit="cover"
					class={`rounded-lg h-full ${curIdx == i ? 'flex' : 'hidden'}`}
				/>
			{/each}
			<div class="absolute bottom-8 left-1/2 translate-x-[-50%] flex gap-x-2">
				{#each data.product.images as _, i}
					<button
						on:click={() => handleSetTopScroll(i)}
						class={`w-[10px] h-[10px] ${
							i === curIdx && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
			<button
				on:click={() => {
					curIdx++;
					if (curIdx == data.product.images.length) curIdx = 0;
				}}
				class="absolute cursor-pointer right-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center"
			>
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.29492 16.59L12.8749 12L8.29492 7.41L9.70492 6L15.7049 12L9.70492 18L8.29492 16.59Z"
						fill="black"
					/>
				</svg>
			</button>
			<button
				on:click={() => {
					curIdx--;
					if (curIdx == -1) curIdx = data.product.images.length - 1;
				}}
				class="absolute cursor-pointer left-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center"
			>
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z"
						fill="black"
					/>
				</svg>
			</button>
		</div>

		<div class="sm:p-4 py-6 flex flex-col gap-6 sm:h-[85vh] sm:overflow-scroll no-scroll">
			<div
				class={`text-4xl font-jura bg-gradient-to-r ${data.product.gradientColorStart} ${data.product.gradientColorVia} ${data.product.gradientColorStop} text-transparent bg-clip-text`}
			>
				{data.product.name}
			</div>
			<div class="text-lg text-gray-500 font-light">{data.product.desc}</div>
			<div>
				<span
					class={`text-3xl font-jura bg-gradient-to-r ${data.product.gradientColorStart} ${data.product.gradientColorVia} ${data.product.gradientColorStop} text-transparent bg-clip-text`}
					>Sizes.</span
				>
				<span class=" text-2xl text-gray-500 font-jura">Which one fits you best?</span>
			</div>

			{#each data.product.sizes as size, i}
			
				<div class={`${size.isAvailable ? '' : 'opacity-50 pointer-events-none'} w-full rounded-lg ${selectedSizeIdx == i ? 'bg-gradient-to-r ' + data.product.gradientColorStart + ' ' + data.product.gradientColorVia + ' ' + data.product.gradientColorStop : ''} p-[2px]`}>
					<button
					on:click={() => (selectedSizeIdx = i)}
					class={`${selectedSizeIdx != i && size.isAvailable ? 'border-neutral-600/50 border-[1px]' : ''} w-full cursor-pointer p-6 bg-white rounded-md flex flex-row justify-between items-center hover:bg-neutral-50  border-solid`}
				>
					<div class="flex flex-col items-start">
						<div class="text-lg font-semibold">{size.name}</div>
						<div class="text-sm font-light">{size.width} x {size.height}</div>
					</div>
					<div>${size.price / 100}</div>
				</button>
				</div>
				
			{/each}
			<Button
				class={`bg-white drop-shadow-md hover:bg-black text-lg p-7 font-light`}
				disabled={data.isSoldOut}
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
				}}
			>
			<div class={`bg-gradient-to-r ${data.product.gradientColorStart} ${data.product.gradientColorVia} ${data.product.gradientColorStop} text-transparent bg-clip-text `}>
				{#if data.isSoldOut}
				Sold Out
				{:else}
					Add to Cart ${(data.product.sizes[selectedSizeIdx].price / 100).toFixed()}
				{/if}
			</div>
				
			</Button>
			<div class="text-lg text-gray-500 font-light">
				Order now and get an exclusive print for free as part of our launch event!
			</div>
		</div>
	</div>
	
	
</div>

{#if addedProduct}
	<div transition:fade class="absolute bottom-12 right-12">
		<Alert.Root class="w-[500px] bg-black text-white">
			<Alert.Title>Added to Your Cart!</Alert.Title>
			<Alert.Description>Please proceed to the cart to checkout.</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<style>
	.slides::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}
	.slides::-webkit-scrollbar-track,
	.no-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	.slides::-webkit-scrollbar,
	.no-scroll::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.slides,
	.no-scroll {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
