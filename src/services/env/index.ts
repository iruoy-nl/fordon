import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

/**
 * Gets an environment variable.
 *
 * @param key The key to retrieve the value for.
 */
export function getEnv(key: string): O.Option<string> {
  return pipe(import.meta.env[key], O.fromNullable);
}
