import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

/**
 * Combination of parse and format.
 * 
 * @param value String representation of a date.
 */
export function parseAndFormat(value: string): string {
  return pipe(
    value,
    parse,
    O.match(
      () => 'Ongeldige datum',
      format,
    ),
  );
}

/**
 * Parse the string into a Date object.
 * 
 * @param value String representation of a date.
 */
export function parse(value: string): O.Option<Date> {
  return pipe(
    new Date(value),
    O.fromNullable,
  );
}

/**
 * Format the date into the user's locale.
 * 
 * @param date Date object.
 */
export function format(date: Date): string {
  return date.toLocaleDateString(
    'nl-NL',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );
}