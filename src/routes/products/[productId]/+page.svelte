<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { CldImage } from 'svelte-cloudinary';
	import { addToCart } from '$lib/client/cart';
	import { CldOgImage } from 'svelte-cloudinary';

	export let data;

	let selectedSizeIdx = 0;
	while (
		selectedSizeIdx < data.product.sizes.length &&
		!data.product.sizes[selectedSizeIdx].isAvailable
	)
		selectedSizeIdx++;

	const handleAddedToCart = () => {
		const el = document.getElementById('added-to-cart');
		el?.classList.remove('hidden');
		setTimeout(() => {
			el?.classList.add('hidden');
		}, 4000);
	};

	// for top section spinny thing
	let curIdx = 0;
	let scrollSection: any;

	function handleScrollTop(e: any) {
		curIdx = Math.round(e.target.scrollLeft / window.screen.width);
	}

	function handleSetTopScroll(idx: number) {
		scrollSection.scrollLeft = idx * window.screen.width;
	}
</script>

<CldOgImage src={data.primaryImage?.cloudinaryId} alt={data.product.desc} />

<svelte:head>
	<title>{data.product.name} | Sediment Art</title>
	<meta name="description" content={data.product.desc} />
</svelte:head>

<div class="grow flex flex-col sm:pt-10 w-full">
	<!-- MOBILE -->
	<div class="w-full flex flex-col justify-center items-center gap-y-2 overflow-hidden sm:hidden">
		<!-- images section mobile -->
		<div class="w-screen overflow-hidden relative">
			<div
				class="overflow-x-auto snap-x snap-mandatory scroll-smooth flex slides w-full"
				on:scroll={(e) => handleScrollTop(e)}
				bind:this={scrollSection}
			>
				{#each data.product.images as image}
					<div class="snap-start w-full transform origin-center shrink-0">
						<CldImage src={image.cloudinaryId} width={1000} height={1000} objectFit="cover" />
					</div>
				{/each}
			</div>
			<div class="absolute bottom-3 left-1/2 translate-x-[-50%] flex gap-x-2">
				{#each data.product.images as _, i}
					<button
						on:click={() => handleSetTopScroll(i)}
						class={`w-[10px] h-[10px] ${
							i === curIdx && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
		</div>
	</div>
	<!-- DESKTOP -->
	<div class="h-full sm:mx-10 mx-4 sm:grid sm:grid-cols-4 flex flex-col">
		<div class="col-span-3 p-4 relative h-[85vh] hidden sm:flex">
			{#each data.product.images as im, i}
				<CldImage
					src={im.cloudinaryId}
					width={1500}
					height={1200}
					objectFit="cover"
					class={`rounded-lg h-full ${curIdx == i ? 'flex' : 'hidden'}`}
				/>
			{/each}
			<div class="absolute bottom-8 left-1/2 translate-x-[-50%] flex gap-x-2">
				{#each data.product.images as _, i}
					<button
						on:click={() => (curIdx = i)}
						class={`w-[10px] h-[10px] ${
							i === curIdx && 'bg-white'
						} rounded-full border border-white`}
					/>
				{/each}
			</div>
			<button
				on:click={() => {
					curIdx++;
					if (curIdx == data.product.images.length) curIdx = 0;
				}}
				class="absolute cursor-pointer right-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center"
			>
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.29492 16.59L12.8749 12L8.29492 7.41L9.70492 6L15.7049 12L9.70492 18L8.29492 16.59Z"
						fill="black"
					/>
				</svg>
			</button>
			<button
				on:click={() => {
					curIdx--;
					if (curIdx == -1) curIdx = data.product.images.length - 1;
				}}
				class="absolute cursor-pointer left-10 top-1/2 translate-y-[-50%] bg-gray-300/50 rounded-full flex flex-row justify-center items-center"
			>
				<svg
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.7049 16.59L11.1249 12L15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59Z"
						fill="black"
					/>
				</svg>
			</button>
		</div>

		<div class="sm:p-4 py-6 flex flex-col gap-4 sm:h-[85vh] sm:overflow-scroll no-scroll">
			<div
				class={`text-4xl font-jura text-transparent bg-clip-text`}
				style={`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}
			>
				{data.product.name}
			</div>
			<div class="text-lg text-gray-500 font-light">{data.product.desc}</div>
			<div>
				<span
					class={`text-3xl font-jura   text-transparent bg-clip-text`}
					style={`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}
					>Sizes.</span
				>
				<span class=" text-2xl text-gray-500 font-jura">Which one fits you best?</span>
			</div>

			{#each data.product.sizes as size, i}
				<div
					class={`${
						size.isAvailable ? '' : 'opacity-50 pointer-events-none'
					} w-full rounded-lg p-[2px]`}
					style={`${
						selectedSizeIdx === i &&
						`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`
					}`}
				>
					<button
						on:click={() => (selectedSizeIdx = i)}
						class={`${
							selectedSizeIdx != i && size.isAvailable ? 'border-neutral-600/50 border-[1px]' : ''
						} w-full cursor-pointer p-6 bg-white rounded-md flex flex-row justify-between items-center hover:bg-neutral-50  border-solid`}
					>
						<div class="flex flex-col items-start">
							<div class="text-lg font-semibold">{size.name}</div>
							<div class="text-sm font-light">{size.width} x {size.height}</div>
						</div>
						<div>${size.price / 100}</div>
					</button>
				</div>
			{/each}
			<Button
				class={`bg-white drop-shadow-md hover:bg-black text-lg p-7 font-light`}
				disabled={data.isSoldOut}
				on:click={() => {
					addToCart({
						productId: data.product.id,
						productName: data.product.name,
						productImage: data.product.images[0].cloudinaryId,
						size: {
							width: data.product.sizes[selectedSizeIdx].width,
							height: data.product.sizes[selectedSizeIdx].height,
							code: data.product.sizes[selectedSizeIdx].code,
							stripePriceId: data.product.sizes[selectedSizeIdx].stripePriceId,
							price: data.product.sizes[selectedSizeIdx].price
						},
						quantity: 1
					});
					handleAddedToCart();
				}}
			>
				<div
					class={` text-transparent bg-clip-text `}
					style={`background-image: linear-gradient(to right bottom, ${data.product.gradientColorStart}, ${data.product.gradientColorVia}, ${data.product.gradientColorStop} );`}
				>
					{#if data.isSoldOut}
						Sold Out
					{:else}
						Add to Cart ${(data.product.sizes[selectedSizeIdx].price / 100).toFixed(2)}
					{/if}
				</div>
			</Button>
			<div class="text-lg text-gray-500 font-light">
				Order now and get an exclusive print for free as part of our launch event!
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center gap-y-4 md:w-1/2 m-auto text-center px-3">
		<h2 class="font-jura text-5xl py-6 text-neutral-800">Enhance Your Space</h2>
		<p class="text-xl font-light text-neutral-700">
			Sediment Art pieces are the perfect accent to your office, living room, or any other space.
		</p>
		<p class="text-xl font-bold text-neutral-700">
			Our prints are thin, exceptionally high quality, edge to edge glass, and manufactured/shipped
			in the US.
		</p>
		<p class="text-xl font-light text-neutral-700 pb-8">
			Each piece is made to order. We are just starting out and hope to have you on this journey
			with us.
		</p>
	</div>

	<!-- IG EMBED -->
	<blockquote
		class="instagram-media"
		data-instgrm-permalink="https://www.instagram.com/sediment.art/?utm_source=ig_embed&amp;utm_campaign=loading"
		data-instgrm-version="14"
		style=" background:#fff; border:0; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); min-width:326px; padding:0; width:100%;"
	>
		<div style="padding:16px;">
			<a
				href="https://www.instagram.com/sediment.art/?utm_source=ig_embed&amp;utm_campaign=loading"
				style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
				target="_blank"
			>
				<div style=" display: flex; flex-direction: row; align-items: center;">
					<div
						style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"
					/>
					<div
						style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"
					>
						<div
							style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"
						/>
						<div
							style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"
						/>
					</div>
				</div>
				<div style="padding: 19% 0;" />
				<div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
					<svg
						width="50px"
						height="50px"
						viewBox="0 0 60 60"
						version="1.1"
						xmlns="https://www.w3.org/2000/svg"
						xmlns:xlink="https://www.w3.org/1999/xlink"
						><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
							><g transform="translate(-511.000000, -20.000000)" fill="#000000"
								><g
									><path
										d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"
									/></g
								></g
							></g
						></svg
					>
				</div>
				<div style="padding-top: 8px;">
					<div
						style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"
					>
						View this profile on Instagram
					</div>
				</div>
				<div style="padding: 12.5% 0;" />
				<div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
					<div>
						<div
							style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"
						/>
						<div
							style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"
						/>
						<div
							style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"
						/>
					</div>
					<div style="margin-left: 8px;">
						<div
							style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"
						/>
						<div
							style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"
						/>
					</div>
					<div style="margin-left: auto;">
						<div
							style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"
						/>
						<div
							style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"
						/>
						<div
							style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"
						/>
					</div>
				</div>
				<div
					style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"
				>
					<div
						style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"
					/>
					<div
						style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"
					/>
				</div></a
			>
			<p
				style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"
			>
				<a
					href="https://www.instagram.com/sediment.art/?utm_source=ig_embed&amp;utm_campaign=loading"
					style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;"
					target="_blank">Sediment Art</a
				>
				(@<a
					href="https://www.instagram.com/sediment.art/?utm_source=ig_embed&amp;utm_campaign=loading"
					style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;"
					target="_blank">sediment.art</a
				>) • Instagram photos and videos
			</p>
		</div>
	</blockquote>
	<script async src="//www.instagram.com/embed.js"></script>
</div>

<style>
	.slides::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}
	.slides::-webkit-scrollbar-track,
	.no-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	.slides::-webkit-scrollbar,
	.no-scroll::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.slides,
	.no-scroll {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
