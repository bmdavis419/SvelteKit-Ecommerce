<script>
	import '../app.css';
</script>

<head>
	<title>SvelteKit E-Commerce</title>
</head>

<body class="flex justify-between w-full flex-col min-h-screen">
	<header class="flex flex-row items-center justify-between px-12 py-4">
		<a class="text-xl text-slate-800 font-extrabold" href="/">LOGO HERE</a>
		<div class="flex flex-row gap-x-4 items-center">
			<a href="/products" class="font-light text-slate-600 hover:underline">Products</a>
			<a href="/about" class="font-light text-slate-600 hover:underline">About</a>
			<a
				class="font-light text-slate-600 hover:underline"
				href="https://github.com/bmdavis419/SvelteKit-Ecommerce"
				target="_blank">Repo</a
			>
			<a href="/cart" class="font-light text-slate-600 hover:underline">Cart</a>
		</div>
	</header>
	<slot />
	<footer class="flex items-center justify-center py-4">
		<a
			class="text-slate-400 font-light hover:underline"
			href="https://twitter.com/benjamin41902"
			target="_blank">Template/Project by Ben Davis</a
		>
	</footer>
</body>
