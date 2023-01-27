import { auth } from '$lib/client/firebase';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, type ActionCodeSettings } from 'firebase/auth';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

export const sendMagicLink = (email: string, url: string): TE.TaskEither<App.Error, void> => {
    const settings: ActionCodeSettings = { url, handleCodeInApp: true };

    return pipe(
        TE.tryCatch(
            () => sendSignInLinkToEmail(auth, email, settings),
            () => {
                return {
                    message: `Er kon geen e-mail worden verzonden naar ${email}.`
                };
            }
        )
    );
};

export const isMagicLink = (link: string): boolean => {
    return pipe(
        isSignInWithEmailLink(auth, link)
    );
};

export const signInWithMagicLink = (email: string, link: string): TE.TaskEither<App.Error, string> => {
    return pipe(
        TE.tryCatch(
            () => signInWithEmailLink(auth, email, link),
            () => {
                return {
                    message: 'Het inloggen is mislukt. Probeer het later opnieuw.',
                };
            }
        ),
        TE.chain((credential) => {
            return pipe(
                TE.tryCatch(
                    () => credential.user.getIdToken(),
                    () => {
                        return {
                            message: 'Het inloggen is mislukt. Probeer het later opnieuw.',
                        };
                    },
                ),
            );
        }),
    );
};