import {pipe} from "fp-ts/function";
import * as O from "fp-ts/Option";
import Pocketbase from "pocketbase";
import {getEnv} from "~/services/env";

/**
 * The pocketbase url.
 */
export const pbUrl = pipe(
  getEnv("VITE_POCKETBASE_URL"),
  O.getOrElse(() => "http://localhost:8090")
);

/**
 * The redirect url.
 */
export const redirectUrl = pipe(
  getEnv("VITE_REDIRECT_URL"),
  O.getOrElse(() => "http://localhost:5173/oauth")
);

/**
 * The pocketbase instance.
 */
export const pb = new Pocketbase(pbUrl);
