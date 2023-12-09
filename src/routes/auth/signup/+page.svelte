<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Mail } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let form;
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Sign Up</Card.Title>
		<Card.Description>Sign up to keep all your orders in one place!</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-y-4" method="POST">
			<div class="flex flex-col w-full gap-1.5">
				<Label for="email">email</Label>
				<Input type="email" id="email" placeholder="email@gmail.com" name="email" required />
			</div>

			<div class="flex flex-col w-full gap-1.5">
				<Label for="first_name">first name</Label>
				<Input type="text" id="first_name" placeholder="Ben" name="first_name" required />
			</div>

			<div class="flex flex-col w-full gap-1.5">
				<Label for="last_name">last name</Label>
				<Input type="text" id="last_name" placeholder="Davis" name="last_name" required />
			</div>

			<div class="flex flex-col w-full gap-1.5">
				<Label for="password">password</Label>
				<Input type="password" id="password" placeholder="password" name="password" required />
			</div>

			<div class="flex flex-col w-full gap-1.5">
				<Label for="confirm_password">confirm password</Label>
				<Input
					type="password"
					id="confirm_password"
					placeholder="password"
					name="confirm_password"
					required
				/>
			</div>

			{#if form?.message}
				<span class="text-sm font-light text-red-600">{form?.message}</span>
			{/if}

			<div class="flex flex-row justify-center items-center w-full gap-1.5">
				<Button type="submit" class="bg-blue-800 dark:text-white hover:text-black">
					<Mail class="mr-2 h-4 w-4" />
					Sign Up with Email
				</Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="w-full flex items-center justify-center">
		<Button variant="link" href="/auth/login">login</Button>
	</Card.Footer>
</Card.Root>
