<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
    import { ChevronRight } from 'lucide-svelte';

	export let collectionData: {
		name: string;
		tagLine: string;
		cloudinaryIds: string[];
        dark: boolean;
        collectionTag: string;
	};
</script>

<div class="flex flex-col {collectionData.dark ? 'bg-black text-white' : 'bg-white/95 text-black'} px-4 pt-6 pb-4">
    <div>
        <span class="font-jura sm:text-4xl text-3xl">{collectionData.name}.</span>
        <span class="font-jura sm:text-3xl text-2xl">{collectionData.tagLine}.</span>
    </div>
    <a href="/products?tag={collectionData.collectionTag}" class="pb-4 flex flex-row items-center">
        <span class="font-jura sm:text-xl text-lg opacity-60">Shop collection</span>
        <ChevronRight class='opacity-60' />
    </a>

	

		<div class="flex flex-row overflow-x-scroll gap-4">
			{#each collectionData.cloudinaryIds as id}
                <CldImage
                    width={350}
                    height={400}
                    src={id || 'https://via.placeholder.com/355x200'}
                    alt="Description of my image"
                    class="rounded-lg shadow-md"
                    sizes="100vw"
                />
			{/each}
		</div>
	
</div>
