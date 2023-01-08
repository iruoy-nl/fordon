import { fromNullable, Option } from "fp-ts/lib/Option";

/**
 * Gets the value of an environment variable.
 *
 * @param key The key of the environment variable.
 */
export function getEnv(key: string): Option<string> {
  const value: string | null = import.meta.env[key];

  return fromNullable(value);
}
