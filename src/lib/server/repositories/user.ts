import { auth } from '$lib/server/firebase';
import { handleError } from '$lib/utilities/firebase';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

export const createSessionCookie = (token: string, expiresIn: number): TE.TaskEither<App.Error, string> => {
    return pipe(
        TE.tryCatch(
            () => auth.createSessionCookie(token, { expiresIn: expiresIn * 1000 }),
            handleError,
        ),
    );
};

export const verifySessionCookie = (cookie?: string): TE.TaskEither<App.Error, DecodedIdToken> => {
    return pipe(
        TE.tryCatch(
            () => auth.verifySessionCookie(cookie || ''),
            handleError,
        ),
    );
};