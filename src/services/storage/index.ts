import {pipe} from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";

/**
 * Get a value from local storage.
 *
 * @param key The key to retrieve the item for.
 */
export function getItem<A>(key: string): O.Option<A> {
  return pipe(
    localStorage.getItem(key),
    O.fromNullable,
    O.map((v) => {
      // When the value exists, attempt to parse it.
      return pipe(
        O.tryCatch(() => JSON.parse(v) as A),
        O.getOrElse(() => v as A)
      );
    })
  );
};

/**
 * Put a value by its key.
 *
 * @param key The key to store the value under.
 * @param value The value to store.
 */
export function putItem<A>(key: string, value: A): void {
  return pipe(
    value,
    (v) => {
      // When the value is not a string, stringify it.
      return typeof v !== "string" //
        ? JSON.stringify(v)
        : v;
    },
    (v) => localStorage.setItem(key, v)
  );
};

/**
 * Remove a value by it's key.
 *
 * @param key The key to remove the value for.
 */
export function removeItem(key: string): void {
  return pipe(key, localStorage.removeItem);
};
