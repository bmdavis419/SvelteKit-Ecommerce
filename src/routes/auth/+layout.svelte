<script>
	import { CldImage } from 'svelte-cloudinary';
</script>

<div class="grow flex md:flex-row px-8 flex-col">
	<div class="p-12 grow flex items-center justify-center">
		<div
			class="lg:w-[800px] lg:h-[800px] rounded-xl overflow-hidden shadow-lg md:w-[300px] md:h-[300px] w-full h-auto"
		>
			<CldImage
				src="txvp48xxnytjd024vnye"
				width={1600}
				height={1600}
				alt="decoration image"
				class="rounded-xl"
			/>
		</div>
	</div>
	<div class="lg:w-2/5 flex items-center justify-center">
		<slot />
	</div>
</div>
