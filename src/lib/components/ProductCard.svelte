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
	};
</script>

<div class="flex flex-row items-center gap-x-8 p-4 border-b">
	<div class="w-[355px] h-[200px] flex justify-center items-center">
		<CldImage
			width={355 * 2}
			height={200 * 2}
			crop="fill"
			src={itemData.cloudinaryId || 'https://via.placeholder.com/355x200'}
			alt="Description of my image"
			sizes="100vw"
			class="rounded-lg shadow-md"
		/>
	</div>
	<div class="grow">
		<h2 class=" text-2xl text-neutral-900 pb-2">{itemData.name}</h2>
		<div class="flex flex-row items-center gap-x-2">
			{#each itemData.tags as tag}
				<Button
					on:click={() => itemData.selectTag(tag)}
					class="rounded-full text-sm font-light py-1 px-2  h-auto"
				>
					{tag}
				</Button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-y-2 items-center justify-center w-[175px]">
		<Button class="w-full">
			<ShoppingCart class="w-4 h-4 mr-2" />
			Add To Cart</Button
		>
		<Button href={`/products/${itemData.productId}`} variant="outline" class="w-full">
			<Link class="w-4 h-4 mr-2" />
			More Information</Button
		>
	</div>
</div>
