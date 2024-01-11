<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/client/images/logo.png';
	import { page } from '$app/stores';

	export let user: {
		first_name: string;
		last_name: string;
		email: string;
		is_admin: boolean;
	} | null;
</script>

<nav
	class={`flex flex-row items-center justify-between px-12 py-4  w-full  z-20 ${
		$page.url.pathname === '/' && 'fixed dark'
	}`}
>
	<a class="text-4xl font-light" href="/">
		<img src={Logo} alt="Sediment" class="w-[203px] h-[70px]" />
	</a>

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
