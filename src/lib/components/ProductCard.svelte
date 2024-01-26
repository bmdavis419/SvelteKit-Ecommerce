<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import Button from './ui/button/button.svelte';
	import { ShoppingCart, Link } from 'lucide-svelte';
	import { goto, preloadData, pushState } from '$app/navigation';
	import { addToCart } from '$lib/client/cart';
	import * as Alert from './ui/alert';
	import { fade } from 'svelte/transition';

	export let itemData: {
		name: string;
		productId: string;
		cloudinaryId: string | null;
		tags: string[];
		selectTag: (tagName: string) => void;
		displayMode: string;
		desc: string;
		sizes: {
			code: string;
			height: number;
			name: string;
			width: number;
			productId: string;
			isAvailable: boolean;
			price: number;
			stripePriceId: string;
			stripeProductId: string;
		}[];
	};

	let addedProduct = false;

	// ripped straight from the docs lol: https://kit.svelte.dev/docs/shallow-routing
	async function navigate(e: any) {
		// bail if opening a new tab, or we're on too small a screen
		if (e.metaKey || innerWidth < 640) return;

		// prevent navigation
		e.preventDefault();

		const { href } = e.currentTarget;

		// run `load` functions (or rather, get the result of the `load` functions
		// that are already running because of `data-sveltekit-preload-data`)
		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { selected: result.data });
		} else {
			// something bad happened! try navigating
			goto(href);
		}
	}
</script>

<div class="rounded-lg w-1/2 hidden sm:flex p-2 relative hover:scale-[102%] transition-all duration-[400ms] cursor-pointer">
	<a href={'/products/' + itemData.productId}>
		<div class="absolute w-full h-full top-2 left-2 bg-gradient-to-br from-0% to-40% from-black/80 rounded-lg "></div>
		<CldImage
			width={355 * 4}
			height={200 * 4}
			crop="fill"
			src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
			alt="Description of my image"
			sizes="100vw"
			class="sm:rounded-lg shadow-md hidden sm:flex w-full"
		/>
	</a>
	
	<div class="absolute top-5 left-5 font-jura w-full">
		<div class=" text-gray-300 text-md">{itemData.tags[0]}</div>
		<div class=" text-white text-4xl">{itemData.name}</div>
		<!-- <div class=" text-gray-400 text-md w-[45%] text-ellipsis overflow-hidden leading-5 max-h-[5rem] line-clamp-4">{itemData.desc}{itemData.desc}{itemData.desc}{itemData.desc}{itemData.desc}</div> -->
	</div>
	<div class="absolute bottom-5 left-5 flex flex-row items-end">
		{#each itemData.sizes as size}

			<button disabled={!size.isAvailable} on:click={() => {
				addToCart({
					productId: itemData.productId,
					productName: itemData.name,
					productImage: itemData.cloudinaryId,
					size: {
						width: size.width,
						height: size.height,
						code: size.code,
						stripePriceId: size.stripePriceId,
						price: size.price
					},
					quantity: 1
				});
				addedProduct = true;
				setTimeout(() => {
					addedProduct = false;
				}, 4000);
			}} class={`${size.isAvailable ? 'bg-neutral-100/60 hover:bg-neutral-100/90 hover:drop-shadow-lg hover:scale-110 transition-all duration-[200ms] size-selection hover:px-10 hover:py-3' : 'bg-neutral-300/40 line-through text-gray-800'}  px-3 py-2 mx-1 rounded-full text-sm `}>
				<div class="pre-text transition-all duration-300">{size.name}</div>
				<div class="post-text hidden transition-all duration-300">
					<div>Buy <span class="font-bold font-lg">{size.name}</span></div>
					<div class="font-light text-xs">{size.width} x {size.height}"</div>
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- this thing doesnt really work -->
{#if addedProduct}
	<div transition:fade class="absolute bottom-12 right-12">
		<Alert.Root class="w-[500px] bg-black text-white">
			<Alert.Title>Added to Your Cart!</Alert.Title>
			<Alert.Description>Please proceed to the cart to checkout.</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<div
	class={`flex sm:hidden flex-col sm:items-center sm:gap-x-8 sm:gap-y-0 gap-y-2 sm:p-4 ${
		itemData.displayMode == 'sm' ? 'w-[47%]' : 'w-[94%]'
	} sm:w-full`}
>
	<div class="sm:w-[355px] w-full sm:h-[200px] flex justify-center items-center relative">
		<div
			class="absolute top-1 left-1 rounded-full w-[40px] h-[40px] bg-gray-600/70 flex flex-col items-center justify-center sm:hidden"
		>
			<svg
				class="-translate-y-[1px]"
				width="17"
				height="20"
				viewBox="0 0 17 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_100_15)">
					<path
						d="M0 20V4.995L1 5.001V5.016L5 5.014V4C5 1.516 6.274 0 8.5 0C10.518 0 12 1.48 12 4V5.012L17 5.009V5.994H1V19H16V6.005H17V20H0ZM11 4.49C11 2.267 10.507 1 8.5 1C6.5 1 6 2.27 6 4.49V5L11 4.998V4.49Z"
						fill="white"
					/>
					<line x1="8.5" y1="8" x2="8.5" y2="17" stroke="white" />
					<line x1="4" y1="12.5" x2="13" y2="12.5" stroke="white" />
				</g>
				<defs>
					<clipPath id="clip0_100_15">
						<rect width="17" height="20" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</div>
		<a href={`/products/${itemData.productId}`}>
			
			<CldImage
				width={355 * 4}
				height={200 * 8}
				crop="fill"
				src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				sizes="100vw"
				class={`sm:rounded-lg shadow-md sm:hidden ${itemData.displayMode == 'sm' && 'hidden'}`}
			/>
			<CldImage
				width={355 * 2}
				height={200 * 4}
				crop="fill"
				src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				sizes="100vw"
				class={`sm:rounded-lg shadow-md sm:hidden ${itemData.displayMode == 'lg' && 'hidden'}`}
			/>
		</a>
	</div>
	<div class="grow flex flex-col">
		<h2 class=" sm:text-2xl text-md font-light text-neutral-200 sm:pb-2">{itemData.name}</h2>
		<div class="flex flex-row items-center gap-x-2">
			{#each itemData.tags as tag}
				<Button
					on:click={() => itemData.selectTag(tag)}
					class="rounded-full text-sm font-light py-1 px-2 hidden sm:flex h-auto"
				>
					{tag}
				</Button>
				<div class="text-sm text-gray-400 font-light py-0.5">
					{tag} Collection
				</div>
			{/each}
		</div>
		<div>Sm Md Lg Xl</div>
	</div>
	<div class="sm:flex flex-col hidden gap-y-2 items-center justify-center sm:w-[175px] w-full">
		<Button
			href={`/products/${itemData.productId}`}
			variant="outline"
			class="w-full"
			on:click={navigate}
		>
			<Link class="w-4 h-4 mr-2" />
			More Information</Button
		>
	</div>
</div>

<style>
	.size-selection:hover .pre-text {
		display: none;
	}
	.size-selection:hover .post-text {
		display: flex;
		flex-direction: column;
	}
</style>