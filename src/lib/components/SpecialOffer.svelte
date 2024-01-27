<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let showModal = false;

	export let isSoldOut: boolean;

	export let remaining: number;
</script>

<button
	type="button"
	class="bg-gray-950 text-center text-white font-jura uppercase p-1 sm:text-lg text-sm sticky w-full top-[-100px]"
	on:click={() => (showModal = true)}
>
	{#if isSoldOut}
		Sold Out, Sign up to receive updates on when we will be back in stock!
	{:else}
		Launch event, only {remaining} pieces available, order now!
	{/if}
</button>

{#if showModal}
	<div class="absolute w-screen h-screen z-40 bg-neutral-950 bg-opacity-90">
		<button on:click={() => (showModal = false)} class="w-full h-full absolute" />
		<div
			class="flex shadow-md rounded-lg overflow-hidden w-3/5 bg-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto"
		>
			<div class="w-1/2">
				<CldImage src="u79mr3xuxnalywollget" width={1200} height={1200} objectFit="cover" />
			</div>

			<div class="w-1/2 p-4 flex flex-col">
				<div class="w-full flex justify-end">
					<button
						class="hover:bg-neutral-200 rounded-full p-1"
						on:click={() => (showModal = false)}
					>
						<X class="w-4 h-4" />
					</button>
				</div>

				{#if isSoldOut}
					<div class="grow flex flex-col gap-4 justify-center px-6">
						<h3 class="text-lg font-bold">Sold Out!</h3>

						<p>Cohort 1 of sediment art has sold out, but there will be more!</p>
						<p>Sign up to get updated on when we are back in stock!</p>
						<div>
							<Button
								on:click={() => {
									showModal = false;
									goto('/auth/list');
								}}
								variant="outline">get notified</Button
							>
						</div>
					</div>
				{:else}
					<div class="grow flex flex-col gap-4 justify-center px-6">
						<h3 class="text-lg font-bold">Launch Event!</h3>

						<p>
							Sediment Art is live, our first run of cohort 1 will only have 10 orders available, so
							make sure to order soon!
						</p>
						<p>Every order will in cohort 1 will get a free exclusive print!</p>
						<div>
							<Button
								on:click={() => {
									showModal = false;
									goto('/products');
								}}
								variant="outline">view pieces</Button
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
