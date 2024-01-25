<script>
	import '../app.css';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SpecialOffer from '$lib/components/SpecialOffer.svelte';
	import { navigating } from '$app/stores';

	export let data;

	const handleRemoveMenu = () => {
		document.getElementById('drop-menu')?.classList.add('hidden')
	}

	$: if ($navigating) handleRemoveMenu()
</script>

<head>
	<title>sediment</title>
</head>

<body class="flex justify-between w-full flex-col min-h-screen">
	<SpecialOffer offerData={{
		text: "Inaugural Valentine's Day drop! Only 9 pieces left!",
		isLink: true,
		link: '/products?tag=Natural'
	}} />
	<NavBar user={data.user} />
<span on:mouseenter={handleRemoveMenu} class="min-h-[100vh] bg-neutral-100">
		<slot />
	</span>
	
	<Footer />
</body>
