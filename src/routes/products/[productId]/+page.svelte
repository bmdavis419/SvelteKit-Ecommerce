<script>
	import { CldImage } from 'svelte-cloudinary';

	export let data;
</script>

<div>{data.product?.name}</div>

{#each data.product.images as image}
	<CldImage src={image.cloudinaryId} width={300} height={300} alt="Product Image" quality={100} />
{/each}
