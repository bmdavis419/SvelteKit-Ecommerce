<script lang="ts">
	import OrdersSection from '$lib/client/components/admin/OrdersSection.svelte';
	import ProductsSection from '$lib/client/components/admin/ProductsSection.svelte';

	let tab: 'products' | 'orders' = 'orders';
</script>

<div class="w-full h-full grow flex p-5">
	<!-- switcher -->
	<div class="w-full grow flex flex-row gap-x-4">
		<div class="bg-slate-900 text-white w-1/6 rounded-md p-4 flex flex-col gap-y-3 items-start">
			<button
				class={`text-lg font-bold w-full text-start p-1 rounded-md ${
					tab === 'products' && 'bg-slate-700'
				}`}
				on:click={() => (tab = 'products')}
				>Products
			</button>
			<button
				class={`text-lg font-bold w-full text-start p-1 rounded-md ${
					tab === 'orders' && 'bg-slate-700'
				}`}
				on:click={() => (tab = 'orders')}
				>Orders
			</button>
		</div>
		<!-- main content -->
		<div class="bg-gray-400 grow h-full rounded-md">
			{#if tab === 'products'}
				<ProductsSection />
			{/if}
			{#if tab === 'orders'}
				<OrdersSection />
			{/if}
		</div>
	</div>
</div>
