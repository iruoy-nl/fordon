import Pocketbase from "pocketbase";
import type { User } from "$lib/types";
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
      /**
       * The pocketbase instance.
       */
      pocketbase: Pocketbase;
    }

    // interface PageData {}
    // interface Platform {}
  }
}
