<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let user: {
		first_name: string;
		last_name: string;
		email: string;
	} | null;
</script>

<nav class="flex flex-row items-center justify-between px-12 py-4">
	<a class="text-2xl font-extrabold" href="/">LOGO HERE</a>
	<div class="flex flex-row items-center">
		<Button href="/products" class="" variant="link">Products</Button>
		<Button href="/about" variant="link">About</Button>
		<Button variant="link" href="https://github.com/bmdavis419/SvelteKit-Ecommerce" target="_blank"
			>Repo</Button
		>
		<Button href="/cart" variant="link">Cart</Button>
		{#if user}
			<Button href="/profile">My Stuff</Button>
		{:else}
			<Button href="/auth/signup">Login/Signup</Button>
		{/if}
	</div>
</nav>
