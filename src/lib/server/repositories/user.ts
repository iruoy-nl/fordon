import {adminAuth} from '$lib/server/firebase/admin';
import {auth} from '$lib/server/firebase/app';
import {handleAuthError} from '$lib/server/utilities/firebase';
import type {DecodedIdToken} from 'firebase-admin/auth';
import {isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signOut, type ActionCodeSettings} from 'firebase/auth';
import * as E from 'fp-ts/lib/Either';
import {constVoid, pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

export function sendMagicLink(
  email: string,
  url: string,
): TE.TaskEither<App.Error, void> {
  const settings: ActionCodeSettings = {url, handleCodeInApp: true};

  return pipe(
    TE.tryCatch(
      () => sendSignInLinkToEmail(auth, email, settings),
      handleAuthError,
    )
  );
};

export function isMagicLink(
  link: string,
): E.Either<App.Error, void> {
  return pipe(
    link,
    E.fromPredicate(
      (v) => isSignInWithEmailLink(auth, v),
      () => handleAuthError(),
    ),
    E.map(() => constVoid()),
  );
};

export function signInWithMagicLink(
  email: string,
  link: string,
): TE.TaskEither<App.Error, string> {
  return pipe(
    TE.tryCatch(
      () => signInWithEmailLink(auth, email, link),
      handleAuthError,
    ),
    TE.chain((credential) => {
      return pipe(
        TE.tryCatch(
          () => credential.user.getIdToken(),
          handleAuthError,
        ),
      );
    }),
  );
};

export function logOut(): TE.TaskEither<App.Error, void> {
  return pipe(
    TE.tryCatch(
      () => signOut(auth),
      handleAuthError,
    ),
  );
};

export function createSessionCookie(
  token: string,
  expiresIn: number,
): TE.TaskEither<App.Error, string> {
  return pipe(
    TE.tryCatch(
      () => adminAuth.createSessionCookie(token, {expiresIn: expiresIn * 1000}),
      handleAuthError,
    ),
  );
};

export function verifySessionCookie(
  cookie?: string,
): TE.TaskEither<App.Error, DecodedIdToken> {
  return pipe(
    TE.tryCatch(
      () => adminAuth.verifySessionCookie(cookie || ''),
      handleAuthError,
    ),
  );
};