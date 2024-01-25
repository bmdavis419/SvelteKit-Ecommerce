<script lang="ts">
	import { MoreHorizontal } from 'lucide-svelte';
	import { deserialize } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Drawer from '$lib/components/ui/drawer';

	export let data;

	async function handleSetStatus(stripeOrderId: string, status: string) {
		const formData = new FormData();

		formData.append('stripeOrderId', stripeOrderId);
		formData.append('status', status);

		const response = await fetch(`/admin/orders?/setStatus`, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}
	}

	function truncateString(str: string, maxLength: number) {
		if (str.length > maxLength) {
			return str.slice(0, maxLength) + '...';
		}
		return str;
	}

	let openCustomerViewIdx = -1;
	$: customerViewOpen = openCustomerViewIdx >= 0;
</script>

<div class="rounded-md grow p-4">
	<Table.Root class="border-0">
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">id</Table.Head>
				<Table.Head>status</Table.Head>
				<Table.Head>email</Table.Head>
				<Table.Head class="text-right">amount</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as order, i}
				<Table.Row>
					<Table.Cell class="font-medium">{truncateString(order.stripeOrderId, 10)}</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger class="hover:text-underline"
								>{order.status}</DropdownMenu.Trigger
							>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>set status</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.Item on:click={() => handleSetStatus(order.stripeOrderId, 'new')}
										>new</DropdownMenu.Item
									>
									<DropdownMenu.Item on:click={() => handleSetStatus(order.stripeOrderId, 'placed')}
										>placed</DropdownMenu.Item
									>
									<DropdownMenu.Item
										on:click={() => handleSetStatus(order.stripeOrderId, 'packaged')}
										>packaged</DropdownMenu.Item
									>
									<DropdownMenu.Item on:click={() => handleSetStatus(order.stripeOrderId, 'sent')}
										>sent</DropdownMenu.Item
									>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
					<Table.Cell>{order.email}</Table.Cell>
					<Table.Cell class="text-right">${(order.totalPrice / 100).toFixed(2)}</Table.Cell>

					<Table.Cell>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button
									variant="ghost"
									builders={[builder]}
									size="icon"
									class="relative w-8 h-8 p-0"
								>
									<span class="sr-only">Open menu</span>
									<MoreHorizontal class="w-4 h-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item
										on:click={() => navigator.clipboard.writeText(order.stripeOrderId)}
									>
										Copy Stripe ID
									</DropdownMenu.Item>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
								<!-- VIEW CUSTOMER -->
								<DropdownMenu.Item on:click={() => (openCustomerViewIdx = i)}>
									view customer
								</DropdownMenu.Item>
								<!-- VIEW PAYMENT DETAILS -->
								<DropdownMenu.Item>view payment details</DropdownMenu.Item>
								<!-- VIEW PRODUCTS -->
								<DropdownMenu.Item>view products</DropdownMenu.Item>
								<DropdownMenu.Item on:click={() => goto(`/admin/orders/${order.stripeOrderId}`)}
									>order details</DropdownMenu.Item
								>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<Drawer.Root bind:open={customerViewOpen} onClose={() => (openCustomerViewIdx = -1)}>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Customer Info</Drawer.Title>
			<Drawer.Description>
				<h2><b>Name:</b> {data.orders[openCustomerViewIdx].customerInfo.name}</h2>
				<h2><b>Email:</b> {data.orders[openCustomerViewIdx].customerInfo.email}</h2>
				<h2><b>Address:</b> {data.orders[openCustomerViewIdx].customerInfo.address?.line1}</h2>
				<h2><b>City:</b> {data.orders[openCustomerViewIdx].customerInfo.address?.city}</h2>
				<h2><b>State:</b> {data.orders[openCustomerViewIdx].customerInfo.address?.state}</h2>
				<h2><b>Zip:</b> {data.orders[openCustomerViewIdx].customerInfo.address?.postal_code}</h2>
				<h2><b>Country:</b> {data.orders[openCustomerViewIdx].customerInfo.address?.country}</h2>
			</Drawer.Description>
		</Drawer.Header>
		<Drawer.Footer>
			<Drawer.Close class="w-[300px]">Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
