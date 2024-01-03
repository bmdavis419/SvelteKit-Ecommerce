<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Mail, Github } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let form;
</script>

<Card.Root class="w-[400px]">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Sign in to view your orders and make more!</Card.Description>
	</Card.Header>
	<Card.Content>
		<form class="flex flex-col gap-y-4" method="POST">
			<div class="flex flex-col w-full gap-1.5">
				<Label for="email">email</Label>
				<Input type="email" id="email" placeholder="email" name="email" required />
			</div>

			<div class="flex flex-col w-full gap-1.5">
				<Label for="password">password</Label>
				<Input type="password" id="password" placeholder="password" name="password" required />
			</div>

			{#if form?.message}
				<span class="text-sm font-light text-red-600">{form?.message}</span>
			{/if}

			<div class="flex flex-row justify-center items-center w-full gap-1.5">
				<Button type="submit">
					<Mail class="mr-2 h-4 w-4" />
					Sign In with Email
				</Button>
			</div>
			<div class="flex flex-row justify-center items-center w-full gap-1.5">
				<Button href="/auth/login/github">
					<Github class="mr-2 h-4 w-4" />
					Sign In Github
				</Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="w-full flex items-center justify-center">
		<Button variant="link" href="/auth/signup">sign up</Button>
	</Card.Footer>
</Card.Root>
