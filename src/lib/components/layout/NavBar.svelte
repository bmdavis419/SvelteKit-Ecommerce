<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/client/images/logo_light.png';
	import MobileLogo from '$lib/client/images/mobile_logo_light.png';
	import { CldImage } from 'svelte-cloudinary';
	import { page } from '$app/stores';
	import { getCart, cartLengthStore } from '$lib/client/cart';
	import { writable } from 'svelte/store';
	export let user: {
		firstName: string;
		lastName: string;
		email: string;
		isAdmin: boolean;
	} | null;

	const handleCollectionsHover = () => {
		document.getElementById('drop-menu')?.classList.remove('hidden');
	};

	const collections = [{}];
</script>

<nav
	class={`sm:flex sm:flex-row items-center justify-between grid grid-cols-3 sm:px-12 p-4 sm:py-1 w-full text-black z-20 sticky top-0 bg-white`}
>
	<svg
		class="sm:hidden flex"
		width="22"
		height="11"
		viewBox="0 0 22 11"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M1 1H21" stroke="#444444" stroke-width="1" stroke-linecap="round" />
		<path d="M1 10H21" stroke="#444444" stroke-width="1" stroke-linecap="round" />
	</svg>
	<div
		class="h-[400px] bg-white hidden absolute drop-shadow-md border-t-[1px] border-solid border-neutral-300 w-full -mx-12 top-[78px] text-center z-50 grid grid-cols-3"
		id="drop-menu"
	>
		<div class="col-span-1 w-full overflow-hidden">
			<CldImage
				width={350 * 2}
				height={500 * 2}
				src={'txvp48xxnytjd024vnye' || 'https://via.placeholder.com/355x200'}
				alt="Description of my image"
				class="shadow-md"
				sizes="100vw"
			/>
		</div>
		<div class="flex flex-col p-6 overflow-y-scroll">
			<div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm">Pieces</div>
			<a
				href="/products/my_first_product"
				class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura">Molten Moon</a
			>
			<a
				href="/products/my_second_product"
				class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura"
				>Europan Frontier</a
			>
		</div>
		<div class="flex flex-col p-6 overflow-y-scroll">
			<div class="px-4 py-0 rounded-md text-gray-500 font-extralight text-sm">Collections</div>
			<a
				href="/products?tag=Natural"
				class="px-4 py-3 rounded-md hover:text-gray-600 cursor-pointer font-jura"
				>Sediment Collection</a
			>
		</div>
	</div>

	<a class="text-4xl font-light mx-auto sm:mx-0" href="/">
		<img src={Logo} alt="Sediment" class=" h-[70px] hidden sm:flex" />
		<img src={MobileLogo} alt="Sediment" class="h-[30px] sm:hidden flex" />
	</a>

	<div class="flex-row items-center hidden sm:flex gap-6">
		<a
			href="/products"
			class="text-black uppercase font-jura flex flex-row items-center"
			on:mouseenter={handleCollectionsHover}
		>
			Collections
			<svg
				width="24"
				height="45"
				viewBox="0 0 24 55"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M7 21.7705L12 33.2288L17 21.7705H7Z" fill="black" />
			</svg>
		</a>
		{#if user}
			<a href="/profile">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{:else}
			<a href="/auth/login">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{/if}
		<a href="/cart" class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-shopping-bag"
				><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path
					d="M16 10a4 4 0 0 1-8 0"
				/></svg
			>

			<div
				class="bg-black text-white font-light text-xs rounded-full absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center"
			>
				{$cartLengthStore}
			</div>
		</a>
		{#if user?.isAdmin}
			<Button variant="link" href="/admin/products">admin</Button>
		{/if}
	</div>
	<div class="sm:hidden flex flex-row justify-end gap-3">
		{#if user}
			<a href="/profile">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#444444"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{:else}
			<a href="/auth/login">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#444444"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-user-round"
					><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg
				>
			</a>
		{/if}
		<a href="/cart" class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#444444"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-shopping-bag"
				><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path
					d="M16 10a4 4 0 0 1-8 0"
				/></svg
			>
		</a>
		{#if user?.isAdmin}
			<Button variant="link" href="/admin/products">admin</Button>
		{/if}
	</div>
</nav>
