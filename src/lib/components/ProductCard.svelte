<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import Button from './ui/button/button.svelte';
	import { ShoppingCart, Link } from 'lucide-svelte';

	export let itemData: {
		name: string;
		productId: string;
		cloudinaryId: string | null;
		tags: string[];
		selectTag: (tagName: string) => void;
		displayMode: string;
	};
</script>

<div class={`flex sm:flex-row flex-col sm:items-center sm:gap-x-8 sm:gap-y-0 gap-y-2 sm:p-4 ${itemData.displayMode == 'sm' ? 'w-[47%]' : 'w-[94%]'} sm:w-full`}>
	<div class="sm:w-[355px] w-full sm:h-[200px] flex justify-center items-center relative">
		<div class="absolute top-1 left-1 rounded-full w-[40px] h-[40px] bg-gray-600/70 flex flex-col items-center justify-center sm:hidden">
			<svg class="-translate-y-[1px]" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_100_15)">
				<path d="M0 20V4.995L1 5.001V5.016L5 5.014V4C5 1.516 6.274 0 8.5 0C10.518 0 12 1.48 12 4V5.012L17 5.009V5.994H1V19H16V6.005H17V20H0ZM11 4.49C11 2.267 10.507 1 8.5 1C6.5 1 6 2.27 6 4.49V5L11 4.998V4.49Z" fill="white"/>
				<line x1="8.5" y1="8" x2="8.5" y2="17" stroke="white"/>
				<line x1="4" y1="12.5" x2="13" y2="12.5" stroke="white"/>
				</g>
				<defs>
				<clipPath id="clip0_100_15">
				<rect width="17" height="20" fill="white"/>
				</clipPath>
				</defs>
				</svg>
			</div>
		<a href={`/products/${itemData.productId}`}>
			<CldImage
				width={355 * 2}
				height={200 * 2}
				crop="fill"
				src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				sizes="100vw"
				class="sm:rounded-lg shadow-md hidden sm:flex"
			/>
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
	<div class="grow flex flex-col ">
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
		<div>
			Sm Md Lg Xl
		</div>
	</div>
	<div class="sm:flex flex-col hidden gap-y-2 items-center justify-center sm:w-[175px] w-full">
		<Button class="w-full">
			<ShoppingCart class="w-4 h-4 mr-2" />
			Add To Cart</Button
		>
		<Button href={`/products/${itemData.productId}`} variant="outline" class="w-full ">
			<Link class="w-4 h-4 mr-2" />
			More Information</Button
		>
	</div>
</div>
