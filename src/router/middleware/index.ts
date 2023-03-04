import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import type {NavigationGuard} from 'vue-router';
import {user} from '~/state/user';

export const isAuthenticated = ((to, _from, next) => {
  const protect = /^\/app.*/;

  if (protect.test(to.path)) {
    return pipe(
      user.value,
      O.matchW(
        () => {
          next({name: 'oauth'});
        },
        () => {
          next();
        }
      )
    );
  }

  return next();
}) satisfies NavigationGuard;
