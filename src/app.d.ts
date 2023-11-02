// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('$lib/server/auth').Auth;
	type DatabaseUserAttributes = {
		first_name: string;
		last_name: string;
		is_admin: boolean;
		email: string;
	};
	type DatabaseSessionAttributes = Record<string, never>;
}

export {};
