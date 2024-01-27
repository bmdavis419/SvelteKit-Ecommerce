<script>
	import '../app.css';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SpecialOffer from '$lib/components/SpecialOffer.svelte';
	import { navigating } from '$app/stores';

	export let data;
	const handleRemoveMenu = () => {
		document.getElementById('drop-menu')?.classList.add('hidden');
	};

	const handleRemoveMobile = () => {
		const menu = document.getElementById('mobile-nav');
		menu?.classList.add('opacity-0');
		menu?.classList.add('pointer-events-none');
		menu?.classList.remove('opacity-100');
	};

	$: if ($navigating) {
		handleRemoveMenu();
		handleRemoveMobile();
	}
</script>

<head>
	<title>sediment</title>
</head>

<body class="flex justify-between w-full flex-col min-h-screen">
	<div
		class="opacity-0 h-[100vh] w-[100vw] fixed top-0 left-0 bg-black z-[100] text-white p-6 transition-all duration-500 pointer-events-none flex flex-col gap-6 font-jura text-2xl"
		id="mobile-nav"
	>
		<button on:click={() => handleRemoveMobile()}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
					fill="white"
				/>
			</svg>
		</button>
		<a href="/products">All Pieces</a>
		{#each data.collections as collection}
			<div>
				<a href={'/products?tag=' + collection.collection}>{collection.collection}</a>
				<div class="text-lg flex flex-col">
					{#each collection.products as prod}
						<a href={'/products/' + prod.id} class="px-6 pt-2">{prod.name}</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<SpecialOffer isSoldOut={data.isSoldOut} />
	<NavBar user={data.user} pieces={data.pieces} />
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span on:mouseenter={handleRemoveMenu} class="min-h-[100vh] bg-neutral-100">
		<slot />
	</span>

	<Footer />
</body>
