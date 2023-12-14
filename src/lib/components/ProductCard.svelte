<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import Button from './ui/button/button.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';

	export let itemData: {
		name: string;
		productId: string;
		cloudinaryId: string | null;
		tags: string[];
	};
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<h2 class="text-xl font-bold tracking-wide">{itemData.name}</h2>
	</Card.Header>

	<Card.Content>
		<div class="w-[355px] h-[200px]">
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
		<div class="p-4 flex flex-row flex-wrap items-center gap-3">
			{#each itemData.tags as tag}
				<Badge>{tag}</Badge>
			{/each}
		</div>
	</Card.Content>

	<Card.Footer class="flex flex-row gap-x-4 justify-end">
		<Button class="font-bold" href={`/products/${itemData.productId}`} variant="outline"
			>View Product</Button
		>
	</Card.Footer>
</Card.Root>
