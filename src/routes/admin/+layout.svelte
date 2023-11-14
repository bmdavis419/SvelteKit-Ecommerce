<script>
	export let data;
</script>

<div class="w-full h-full grow flex p-5">
	<!-- switcher -->
	<div class="w-full grow flex flex-row gap-x-4">
		<div
			class="text-slate-900 bg-white shadow-xl w-1/6 rounded-md p-4 flex flex-col gap-y-3 items-start"
		>
			<a
				class={`text-lg font-bold w-full text-start p-1 rounded-md ${
					data.url.includes('/admin/products') && 'bg-slate-100'
				}`}
				href="/admin/products"
				>Products
			</a>
			<a
				class={`text-lg font-bold w-full text-start p-1 rounded-md ${
					data.url.includes('/admin/orders') && 'bg-slate-100'
				}`}
				href="/admin/orders"
				>Orders
			</a>
		</div>
		<!-- main content -->
		<div class="bg-white shadow-xl grow h-full rounded-md">
			<slot />
		</div>
	</div>
</div>
