<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<nav class="flex flex-row items-center justify-between px-12 py-4">
	<a class="text-2xl text-slate-800 font-extrabold" href="/">LOGO HERE</a>
	<div class="flex flex-row items-center">
		<Button href="/products" class="" variant="link">Products</Button>
		<Button href="/about" variant="link">About</Button>
		<Button variant="link" href="https://github.com/bmdavis419/SvelteKit-Ecommerce" target="_blank"
			>Repo</Button
		>
		<Button href="/cart" variant="link">Cart</Button>
	</div>
</nav>
