<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		console.log(data);
	});
</script>

<div class="grow">hey</div>
