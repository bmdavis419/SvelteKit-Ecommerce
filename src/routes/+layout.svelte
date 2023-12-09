<script>
	import '../app.css';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	export let data;
</script>

<head>
	<title>SvelteKit E-Commerce</title>
</head>

<body class="flex justify-between w-full flex-col min-h-screen">
	<NavBar user={data.user} />
	<slot />
	<Footer />
</body>
