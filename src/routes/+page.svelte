<script>
	import Moon from '$lib/client/images/moon.jpg';
	import { CldImage } from 'svelte-cloudinary';
</script>

<main class="grow">
	<div class="h-screen w-full overflow-hidden relative">
		<div
			class="z-10 absolute top-0 left-0 text-white w-full h-full flex justify-center items-center flex-col gap-y-2"
		>
			<h2 class="text-4xl font-semibold">Sediment Collection</h2>
			<h4 class="font-light text-xl">Beauty. Crystallized.</h4>
		</div>
		<div class="w-full h-full bg-black absolute top-0 z-0 opacity-40" />
		<CldImage
			src="g0ofgea8kro1fkhy23my"
			width={1500 * 2}
			height={1500 * 2}
			objectFit="cover"
			gravity="east"
		/>
	</div>
</main>
