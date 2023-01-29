
declare global {
	namespace App {
		interface Error {
			message: string;
		}

		interface Locals {
			user: import('fp-ts/lib/Option').Option<import('$lib/types').User>;
		}

		// interface PageData {}

		// interface Platform {}
	}
}

export { }