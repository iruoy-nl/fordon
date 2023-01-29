import { isMagicLink, signInWithMagicLink } from "$lib/server/repositories/user";
import { createSessionCookie } from "$lib/server/repositories/user";
import { getData } from "$lib/server/utilities/form";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { pipe } from "fp-ts/lib/function";
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

const oneWeekInSeconds = 24 * 60 * 60 * 7;

export const actions = ({
    /**
     * Finalize the authentication process.
     */
    default: async ({ request, cookies }) => {
        return pipe(
            getData(request),
            T.chain((data) => {
                const email = String(data.email);
                const link = String(data.link);

                return pipe(
                    link,
                    (l) => isMagicLink(l),
                    T.of,
                    TE.chain(() => {
                        // The link is a magic link, attempt to authenticate.
                        return signInWithMagicLink(email, link);
                    }),
                );
            }),
            TE.chain((token) => {
                // Create the cookie
                return createSessionCookie(token, oneWeekInSeconds);
            }),
            TE.matchW(
                (error) => {
                    return fail(400, { ok: false, error });
                },
                (cookie) => {
                    // Set the cookie on the response and redirect to /app.
                    cookies.set('session', cookie, {
                        path: '/',
                        maxAge: oneWeekInSeconds,
                    });

                    // The authentication was sucessfull.
                    throw redirect(302, '/app');
                },
            ),
        )();
    },
}) satisfies Actions;