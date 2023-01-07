import * as O from "fp-ts/Option";

/**
 * Gets the value of an environment variable.
 *
 * @param key The key of the environment variable.
 */
export function getEnv(key: string): O.Option<string> {
  const value: string | null = import.meta.env[key];

  return O.fromNullable(value);
}
