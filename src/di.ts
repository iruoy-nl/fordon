import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import Pocketbase from "pocketbase";
import { getEnv } from "services/env";

/**
 * The pocketbase url.
 */
export const pbUrl = pipe(
  getEnv("VITE_POCKETBASE_URL"),
  O.getOrElse(() => "http://127.0.0.1:8090")
);

/**
 * The pocketbase instance.
 */
export const pb = new Pocketbase(pbUrl);
