<script>
	import { CldUploadButton } from 'svelte-cloudinary';
</script>

<form class="w-full h-full p-4 flex flex-col gap-y-3">
	<h2 class="text-slate-900 text-3xl font-bold">Create New Product</h2>
	<div>
		<label for="name" class="block text-slate-800 font-light">Name</label>
		<input
			name="name"
			id="name"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			type="text"
			placeholder="My Product"
		/>
	</div>

	<div>
		<label for="stripePriceId" class="block text-slate-800 font-light">Stripe Price Id</label>
		<input
			name="stripePriceId"
			id="stripePriceId"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			type="text"
			placeholder="price_10AF..."
		/>
	</div>

	<div>
		<label for="stripeProductId" class="block text-slate-800 font-light">Stripe Product Id</label>
		<input
			name="stripeProductId"
			type="text"
			id="stripeProductId"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			placeholder="prod_10AF..."
		/>
	</div>

	<div>
		<label for="price" class="block text-slate-800 font-light">Stripe Price Id</label>
		<input
			name="price"
			type="number"
			id="price"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			placeholder="1000"
		/>
	</div>

	<div>
		<label for="desc" class="block text-slate-800 font-light">Description</label>
		<textarea
			name="desc"
			id="desc"
			class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
			placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</div>

	<!-- cloudinary section -->
	<div>
		<CldUploadButton
			uploadPreset="admin-upload"
			class="bg-blue-600 text-white px-4 py-1 rounded-xl"
			onUpload={(res, widget) => {
				// NOTE: need to get the url or ideally the public_id of the image to then save into the database...
				console.log(res.event);
				console.log(widget);
			}}
		/>
	</div>

	<div class="w-full flex justify-start">
		<button
			type="submit"
			class="text-white bg-blue-600 font-bold py-1 px-4 rounded-xl hover:bg-blue-500 hover:underline"
			>Create</button
		>
	</div>
</form>

<!-- would really love svelte 5 snippets here for the inputs... -->
