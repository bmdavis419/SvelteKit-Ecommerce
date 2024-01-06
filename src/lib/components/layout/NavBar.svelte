<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let user: {
		first_name: string;
		last_name: string;
		email: string;
		is_admin: boolean;
	} | null;
</script>

<nav class="flex flex-row items-center justify-between px-12 py-4">
	<a class="text-4xl font-light" href="/">rock art glass</a>
	<div class="flex flex-row items-center">
		<Button href="/products" class="" variant="link">products</Button>
		<Button href="/about" variant="link">about</Button>
		<Button variant="link" href="https://github.com/bmdavis419/SvelteKit-Ecommerce" target="_blank"
			>repo</Button
		>
		<Button href="/cart" variant="link">cart</Button>
		{#if user?.is_admin}
			<Button variant="link" href="/admin/products">admin</Button>
		{/if}
		{#if user}
			<Button href="/profile">my stuff</Button>
		{:else}
			<Button href="/auth/login">login/signup</Button>
		{/if}
	</div>
</nav>
