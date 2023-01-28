import { auth } from '$lib/client/firebase';
import { handleError } from '$lib/utilities/firebase';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, type ActionCodeSettings } from 'firebase/auth';
import * as E from 'fp-ts/lib/Either';
import { constVoid, pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

export const sendMagicLink = (email: string, url: string): TE.TaskEither<App.Error, void> => {
    const settings: ActionCodeSettings = { url, handleCodeInApp: true };

    return pipe(
        TE.tryCatch(
            () => sendSignInLinkToEmail(auth, email, settings),
            handleError,
        )
    );
};

export const isMagicLink = (link: string): E.Either<App.Error, void> => {
    return pipe(
        link,
        E.fromPredicate(
            (v) => isSignInWithEmailLink(auth, v),
            () => handleError(),
        ),
        E.map(() => constVoid()),
    );
};

export const signInWithMagicLink = (email: string, link: string): TE.TaskEither<App.Error, string> => {
    return pipe(
        TE.tryCatch(
            () => signInWithEmailLink(auth, email, link),
            handleError,
        ),
        TE.chain((credential) => {
            return pipe(
                TE.tryCatch(
                    () => credential.user.getIdToken(),
                    handleError,
                ),
            );
        }),
    );
};