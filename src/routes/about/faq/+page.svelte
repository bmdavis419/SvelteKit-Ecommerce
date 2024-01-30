<script>
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<div class="flex flex-col md:flex-row md:p-16 bg-white grow min-h-screen">
	<div class="md:w-1/3 md:flex flex-col gap-2 hidden">
		<h2 class="text-4xl font-jura">FAQ</h2>
		<h4>Answers to common questions.</h4>
	</div>

	<div class="grow px-4">
		<div class="w-full flex flex-col pt-4 px-2">
			<h3 class="text-center font-jura text-5xl pb-8">What is Sediment Art?</h3>
			<p class="text-center text-lg font-light pb-4">
				We take photos of the natural beauty in nature and the world, and print them onto glass for
				you to display in your home or office.
			</p>

			<p class="text-center text-lg font-light pb-8">
				We sell made to order prints, and have them delivered right to your door.
			</p>
		</div>

		<Accordion.Root class="w-full">
			<Accordion.Item value="q-1">
				<Accordion.Trigger class="md:text-2xl font-jura text-xl"
					>What are you selling?</Accordion.Trigger
				>
				<Accordion.Content class=" font-light"
					>Sediment Art is an online store, selling world class glass prints of in house custom made
					art. We take, produce, and edit all of our own images.</Accordion.Content
				>
			</Accordion.Item>
			<Accordion.Item value="q-2">
				<Accordion.Trigger class="md:text-2xl font-jura text-xl"
					>Where do your images come from?</Accordion.Trigger
				>
				<Accordion.Content
					>All of our images are our own. We take, process, light, and develop all of our images in
					house.</Accordion.Content
				>
			</Accordion.Item>
			<Accordion.Item value="q-3">
				<Accordion.Trigger class="md:text-2xl font-jura text-xl">
					What are these pictures of?</Accordion.Trigger
				>
				<Accordion.Content
					>These are all (currently) rocks. Each millions of years old, often the size of a coin.</Accordion.Content
				>
			</Accordion.Item>
			<Accordion.Item value="q-5">
				<Accordion.Trigger class="md:text-2xl font-jura text-xl">
					How do you make your pieces?</Accordion.Trigger
				>
				<Accordion.Content
					>We use <a href="https://fractureme.com/" target="_blank" class="underline">Fracture</a> for
					our pieces. They create world class glass pieces, and were perfect for fulfilling our art.</Accordion.Content
				>
			</Accordion.Item>
			<Accordion.Item value="q-6">
				<Accordion.Trigger class="md:text-2xl font-jura text-xl">
					Do you offer returns?</Accordion.Trigger
				>
				<Accordion.Content
					>Yes, contact our support email and we will make it right!</Accordion.Content
				>
			</Accordion.Item>
			<Accordion.Item value="q-7">
				<Accordion.Trigger class="md:text-2xl font-jura text-xl">
					Can I use the images on this site?</Accordion.Trigger
				>
				<Accordion.Content
					>No. All images and art pieces on Sediment Art are copywritten.</Accordion.Content
				>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>
