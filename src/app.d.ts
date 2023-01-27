import * as O from 'fp-ts/lib/Option';
import type { User } from '/types';

declare global {
	namespace App {
		interface Error {
			message: string;
		}

		interface Locals {
			user: O.Option<User>;
		}

		// interface PageData {}

		// interface Platform {}
	}
}
