<script>
	import '../app.css';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SpecialOffer from '$lib/components/SpecialOffer.svelte';

	export let data;
</script>

<head>
	<title>sediment</title>
</head>

<body class="flex justify-between w-full flex-col min-h-screen">
	<SpecialOffer offerData={{
		text: "Inaugural Valentine's Day drop! Only 10 pieces left!",
		isLink: true,
		link: '/products?tag=Natural'
	}} />
	<NavBar user={data.user} />
	<slot />
	<Footer />
</body>
