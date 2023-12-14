<script>
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';
	export let data;
	import { GanttChart, Image, Tag, Grid2X2 } from 'lucide-svelte';

	$: value = data.url.split('/').pop();
</script>

<div class="w-full p-8 flex flex-col items-center h-full">
	<h2 class="pb-2 italic font-light text-lg">{data.productBasics.name}</h2>
	<Tabs.Root {value} class="pb-4">
		<Tabs.List>
			<Tabs.Trigger on:click={() => goto(`/admin/products/${data.productId}/basics`)} value="basics"
				><GanttChart class="w-4 h-4 mr-2" /> basics</Tabs.Trigger
			>
			<Tabs.Trigger on:click={() => goto(`/admin/products/${data.productId}/images`)} value="images"
				><Image class="w-4 h-4 mr-2" />images</Tabs.Trigger
			>

			<Tabs.Trigger on:click={() => goto(`/admin/products/${data.productId}/tags`)} value="tags"
				><Tag class="w-4 h-4 mr-2" /> tags</Tabs.Trigger
			>
			<Tabs.Trigger on:click={() => goto(`/admin/products/${data.productId}/sizes`)} value="sizes"
				><Grid2X2 class="w-4 h-4 mr-2" /> sizes</Tabs.Trigger
			>
		</Tabs.List>
	</Tabs.Root>

	<slot />
</div>
