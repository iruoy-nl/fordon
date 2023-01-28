import { env } from '$env/dynamic/private';
import { sendMagicLink } from '$lib/client/repositories/user';
import { getData } from '$lib/utilities/form';
import { fail, type Actions } from '@sveltejs/kit';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

export const actions = ({
    /**
     * Initiate the authentication proces.
     */
    default: async ({ request }) => {
        return pipe(
            getData(request),
            T.chain((data) => {
                const email = String(data.email);
                const redirectUrl = env.OAUTH_REDIRECT_URL;

                return sendMagicLink(email, redirectUrl);
            }),
            TE.matchW(
                (error) => {
                    return fail(400, { ok: false, error });
                },
                () => {
                    // The e-mail was sent sucessfully.
                    return { ok: true, error: null };
                },
            ),
        )();
    },
}) satisfies Actions;