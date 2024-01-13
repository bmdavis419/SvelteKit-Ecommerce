<script>
	import Moon from '$lib/client/images/moon.jpg';
	import { CldImage } from 'svelte-cloudinary';
	import MobileLogo from '$lib/client/images/mobile_logo.png'
	import ImageCollection from '$lib/components/ImageCollection.svelte'
</script>

<main class="grow">
	<div class=" w-full relative">
		<div
			class="z-10 absolute sm:top-1/2 top-[40%] left-0 text-white w-full flex justify-center items-center flex-col gap-y-2"
		>
			<div class="flex flex-row gap-4 items-center">
				<img src={MobileLogo} alt="Sediment" class="h-[40px] sm:hidden flex" />

				<h2 class="sm:text-4xl text-3xl font-jura">Sediment Collection</h2>

			</div>
			<h4 class="font-light sm:text-2xl text-xl font-jura">Beauty. Crystallized.</h4>
		</div>
		<!-- <div class="w-full h-full bg-black z-0 sm:opacity-40" /> -->
		<!-- <CldImage
			class="hidden sm:flex"
			src="g0ofgea8kro1fkhy23my"
			width={1500 * 2}
			height={1500 * 2}
			objectFit="cover"
			gravity="east"
		/> -->
		<CldImage
			class=" flex z-10"
			src="g2tjxnmuqtgbkxhezgfm"
			width={430}
			height={660}
			gravity="east"
			objectFit="fill"
			sizes="100vw"
		/>
		
	</div>
	<ImageCollection 
			collectionData={{
				name: "Rocks",
				tagLine: "With a personality",
				cloudinaryIds: ["gfgvqtml3oujz2biaf9a", "txvp48xxnytjd024vnye"],
				dark: true,
				collectionTag: "Natural"
			}}
		/>
		<ImageCollection 
			collectionData={{
				name: "Planes",
				tagLine: "Honor our history",
				cloudinaryIds: ["gfgvqtml3oujz2biaf9a", "txvp48xxnytjd024vnye"],
				dark: false,
				collectionTag: "Aerospace"
			}}
		/>
</main>
