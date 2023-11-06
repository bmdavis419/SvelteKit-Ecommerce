<script>
	export let data;
</script>

<main class="grow w-full p-8">
	<h2 class="text-3xl text-slate-900 font-bold">Welcome Admin</h2>
	<div>
		{#each data.products as product}
			<div>{product.name}</div>
		{/each}
	</div>
</main>
