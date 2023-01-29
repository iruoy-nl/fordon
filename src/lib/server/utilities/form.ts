import { pipe } from 'fp-ts/lib/function';
import type * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

export const getData = (request: Request): T.Task<{ [key: string]: unknown }> => {
    return pipe(
        TE.tryCatch(
            () => request.formData(),
            () => {
                return {
                    message: 'De gegevens konden niet worden geladen.'
                };
            },
        ),
        TE.map((formData) => {
            // Unwrap the form data into a simple object.
            const entries = formData.entries();

            return Object.fromEntries<unknown>(entries);
        }),
        TE.match(
            () => {
                // Simply return an empty object.
                return {};
            },
            (a) => a,
        ),
    );
};