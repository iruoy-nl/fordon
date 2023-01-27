import { auth } from '$lib/server/firebase';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

export const createSessionCookie = (token: string, expiresIn: number): TE.TaskEither<App.Error, string> => {
    return pipe(
        TE.tryCatch(
            () => auth.createSessionCookie(token, { expiresIn }),
            () => {
                return { message: 'oef' };
            },
        ),
        TE.map((session) => {
            return `session=${session}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${expiresIn / 1000}`;
        }),
    );
};

export const verifyToken = (token: string): TE.TaskEither<App.Error, DecodedIdToken> => {
    return pipe(
        TE.tryCatch(
            () => auth.verifyIdToken(token),
            () => {
                return {
                    message: 'De opgegeven token is niet valide.',
                };
            },
        ),
    );
};

export const verifySessionCookie = (cookie: string): TE.TaskEither<App.Error, DecodedIdToken> => {
    return pipe(
        TE.tryCatch(
            () => auth.verifySessionCookie(cookie),
            () => {
                return {
                    message: 'De opgegeven cookie is niet valide.',
                };
            },
        ),
    );
};