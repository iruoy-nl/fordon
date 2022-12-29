import type { User } from "$lib/types/models";
import type { Option } from "fp-ts/Option";

declare global {
  //
  namespace App {
    // interface Error {}

    interface Locals {
      /**
       * The current user.
       */
      user: Option<User>;
    }

    // interface PageData {}
    // interface Platform {}
  }
}
