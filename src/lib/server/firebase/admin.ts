import { env } from '$env/dynamic/private';
import { cert, getApp, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const name = 'fordon-admin';

export const adminApp = (() => {
    try {
        const config = {
            credential: cert({
                privateKey: env.FIREBASE_PRIVATE_KEY,
                clientEmail: env.FIREABSE_CLIENT_EMAIL,
                projectId: env.FIREBASE_PROJECT_ID,
            }),
        };

        return initializeApp(config, name);
    }
    catch (_) {
        return getApp(name);
    }
})();

export const adminAuth = (() => {
    return getAuth(adminApp);
})();