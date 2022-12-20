import { pocketbase } from "$lib/server/pocketbase";

declare global {
  namespace App {
    interface Locals {
      pocketbase: typeof pocketbase;
      user?: typeof pocketbase.authStore.model;
    }
  }
}
