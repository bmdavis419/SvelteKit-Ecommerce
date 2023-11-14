<script>
	export let data;
</script>

<div class="p-4 flex flex-col justify-between h-full">
	<div class="max-h-9/10">
		{#each data.products as product}
			<div class="flex flex-row justify-between items-center gap-y-2 border-b border-slate-200 p-4">
				<div>
					<span class="font-bold text-lg text-slate-900">{product.name}</span> -
					<span class="font-light text-lg text-slate-700">{product.stripePriceId}</span>
				</div>
				<div>
					<button class="bg-red-500 text-white font-bold text-lg px-3 py-2 rounded-full"
						>Delete</button
					>
				</div>
			</div>
		{/each}
	</div>
	<div class="h-1/10 w-full flex items-center flex-row justify-end">
		<a
			href="/admin/products/new"
			class="bg-green-300 px-3 py-1 rounded-full hover:bg-green-400 hover:cursor text-white"
			>New Product</a
		>
	</div>
</div>
