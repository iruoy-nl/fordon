import { none, Option, some } from "fp-ts/lib/Option";

/**
 * Get a value by its key.
 *
 * @param key The key to retrieve the item for.
 */
export function getByKey<T>(key: string): Option<T> {
  const value = localStorage.getItem(key);

  if (value === null) {
    return none;
  }

  // Attempt to parse the object, otherwise return the value.
  try {
    return some(JSON.parse(value));
  } catch (_) {
    return some(value as T);
  }
}

/**
 * Put a value by its key.
 *
 * @param key The key to store the value under.
 * @param value The value to store.
 */
export function putByKey<T>(key: string, value: T): void {
  localStorage.setItem(
    key,
    // When the value isn't a string, ensure it is stringified.
    typeof value === "string" //
      ? value
      : JSON.stringify(value)
  );
}

/**
 * Remove a value by it's key.
 *
 * @param key The key to remove the value for.
 */
export function removeByKey(key: string): void {
  localStorage.removeItem(key);
}
