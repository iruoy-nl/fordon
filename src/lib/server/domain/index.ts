import { baseUrl } from "$env/static/private";
import Pocketbase from "pocketbase";

/**
 * The pocketbase instance.
 */
export const pb = new Pocketbase(baseUrl);
