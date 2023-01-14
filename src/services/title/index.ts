/**
 * Puts the title.
 *
 * @param value The value to append to 'Fordon - {title}'
 */
export const putTitle = (value: string): void => {
  document.title = `Fordon - ${value}`;
};
