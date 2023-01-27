import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/firebase';

/**
 * Manage cookies with Firebase
 * 
 * https://firebase.google.com/docs/auth/admin/manage-cookies
 * https://colinhacks.com/essays/nextjs-firebase-authentication
 */
 
export const handle: Handle = async ({ event, resolve }) => {

  const cookie = event.request.headers.get('cookie');

  const response = await resolve(event);

  return response;
};