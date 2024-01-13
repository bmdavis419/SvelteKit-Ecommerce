<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/client/images/logo.png';
	import MobileLogo from '$lib/client/images/mobile_logo.png'
	import { page } from '$app/stores';
	export let user: {
		first_name: string;
		last_name: string;
		email: string;
		is_admin: boolean;
	} | null;

	
</script>

<nav
	class={`flex flex-row items-center justify-between sm:px-12 p-4 sm:py-4  w-full  z-20 ${
		$page.url.pathname === '/' && 'fixed dark'
	} bg-black/80`}
>
	<a class="text-4xl font-light" href="/">
		<img src={Logo} alt="Sediment" class=" h-[70px] hidden sm:flex" />
		<img src={MobileLogo} alt="Sediment" class="h-[30px] sm:hidden flex" />

	</a>

	<div class="flex-row items-center hidden sm:flex">
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
	<svg class="sm:hidden flex" width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1H21" stroke="white" stroke-width="2" stroke-linecap="round"/>
		<path d="M1 10H21" stroke="white" stroke-width="2" stroke-linecap="round"/>
	</svg>
		
</nav>
