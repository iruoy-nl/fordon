import { pipe } from "fp-ts/function";
import { getOrElse } from "fp-ts/Option";
import Pocketbase from "pocketbase";
import { getEnv } from "~/services/env";

/**
 * The pocketbase url.
 */
export const pbUrl = pipe(
  getEnv("VITE_POCKETBASE_URL"),
  getOrElse(() => "http://localhost:8090")
);

/**
 * The redirect url.
 */
export const redirectUrl = pipe(
  getEnv("VITE_REDIRECT_URL"),
  getOrElse(() => "http://localhost:5173/inloggen")
);

/**
 * The pocketbase instance.
 */
export const pb = new Pocketbase(pbUrl);
