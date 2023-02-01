import {constVoid, pipe} from 'fp-ts/lib/function';
import type * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

export function getData(
  request: Request,
): T.Task<Record<string, unknown>> {
  return pipe(
    TE.tryCatch(
      () => request.formData(),
      constVoid,
    ),
    TE.match(
      () => {
        // An error occured, return an empty object.
        return {};
      },
      (formData) => {
        // Unwrap the form data into a simple object.
        const entries = formData.entries();

        return Object.fromEntries<unknown>(entries);
      },
    ),
  );
};