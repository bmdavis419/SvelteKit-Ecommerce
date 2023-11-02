<script>
	import { getCart } from '$lib/client/cart';

	const cart = getCart();
</script>

{#each cart as item}
	<div>{item.name}</div>
{/each}
