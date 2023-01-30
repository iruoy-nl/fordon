import {verifySessionCookie} from '$lib/server/repositories/user';
import {redirect, type Handle} from '@sveltejs/kit';
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

export const handle = (async ({event, resolve}) => {
  const {locals, cookies, url} = event;

  // Set the user within the locals based on the session.
  const cookie = cookies.get('session');

  locals.user = await pipe(
    verifySessionCookie(cookie),
    TE.map((token) => {
      return {
        id: token.uid,
        email: O.fromNullable(token.email),
      };
    }),
    T.map(O.fromEither),
  )();

  // When the user is not set, deny access to `/app`.
  if (O.isNone(locals.user) && url.pathname.startsWith('/app')) {
    throw redirect(302, '/oauth')
  }

  return resolve(event);
}) satisfies Handle;