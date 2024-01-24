<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
    import { ChevronRight } from 'lucide-svelte';

	export let collectionData: {
		name: string;
		tagLine: string;
		productInfo: {
            cloudinaryId: string;
            name: string;
            availableSizes: string[];
            soldOutSizes: string[];
        }[],
        dark: boolean;
        collectionTag: string;
	};
</script>

<div class="flex flex-col {collectionData.dark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'} px-2 sm:px-4 pt-6 pb-4 sm:py-10 sm:items-center">
    <div>
        <span class="font-jura sm:text-4xl text-3xl">{collectionData.name}.</span>
        <span class="font-jura sm:text-3xl text-2xl">{collectionData.tagLine}.</span>
    </div>
    <a href="/products?tag={collectionData.collectionTag}" class="pb-4 sm:pb-8 flex flex-row items-center">
        <span class="font-jura sm:text-xl text-lg opacity-60">Shop collection</span>
        <ChevronRight class='opacity-60' />
    </a>

	

		<div class="flex flex-row w-full sm:overflow-x-hidden flex-wrap gap-4 sm:gap-6 sm:justify-center">
			{#each collectionData.productInfo as product}
                <div class="flex flex-col lg:w-[22%] md:w-[30%] sm:w-[40%] w-full">
                    <CldImage
                        width={350*2}
                        height={500*2}
                        src={product.cloudinaryId || 'https://via.placeholder.com/355x200'}
                        alt="Description of my image"
                        class=" shadow-md"
                        sizes="100vw"
                    />
                    <div class="py-4">

                        <div class={`font-jura ${collectionData.dark ? 'text-gray-100' : 'text-gray-950'} text-xl text-center`}>{product.name}</div>
                        <div class={`flex flex-row gap-2 justify-center font-light ${collectionData.dark ? 'text-gray-500' : 'text-gray-700'}`}>
                            {#each product.availableSizes as size}
                                <span>{size}</span>
                            {/each}
                            {#each product.soldOutSizes as size}
                                <span class="line-through">{size}</span>
                            {/each}
                        </div>
                    </div>
                </div>
                
			{/each}
		</div>
	
</div>
