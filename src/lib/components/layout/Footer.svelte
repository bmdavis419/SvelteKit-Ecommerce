<script>
	import { Instagram } from 'lucide-svelte';
</script>

<footer class="bg-white text-neutral-800 py-6">
	<div class="container mx-auto flex flex-wrap justify-center">
		<!-- Navigation -->
		<div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-0">
			<h3 class=" font-semibold mb-2">Navigation</h3>
			<ul>
				<li><a href="/" class="hover:text-neutral-300 text-sm">Home</a></li>
				<li><a href="/products" class="hover:text-neutral-300 text-sm">Products</a></li>
				<li><a href="/auth/list" class="hover:text-neutral-300 text-sm">Email List</a></li>
			</ul>
		</div>

		<!-- Contact Information -->
		<div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 sm:mb-0">
			<h3 class=" font-semibold mb-2">Contact Us</h3>
			<p>Email: bmd.yt.channel@gmail.com</p>
		</div>

		<!-- Social Media Links -->
		<div class="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4">
			<h3 class=" font-semibold mb-2">Connect With Us</h3>
			<div class="flex space-x-4">
				<!-- <a href="#" class="text-neutral-800 hover:text-neutral-300"><i class="fab fa-facebook"></i></a>
		  <a href="#" class="text-neutral-800 hover:text-neutral-300"><i class="fab fa-twitter"></i></a> -->
				<a
					href="https://www.instagram.com/sediment.art"
					class="text-neutral-800 hover:text-neutral-300"
				>
					<Instagram class="w-4 h-4" />
				</a>
			</div>
		</div>
	</div>
</footer>
