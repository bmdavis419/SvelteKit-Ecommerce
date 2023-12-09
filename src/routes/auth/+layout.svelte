<script>
	import { CldImage } from 'svelte-cloudinary';
</script>

<div class="grow flex flex-row px-8">
	<div class="p-12 grow flex items-center justify-center">
		<div class="w-[800px] h-[800px]">
			<CldImage
				src="zav59raocmm7xmxrzgc4"
				width={1600}
				height={1600}
				alt="decoration image"
				class="rounded-xl"
			/>
		</div>
	</div>
	<div class="w-2/5 flex items-center justify-center">
		<slot />
	</div>
</div>
