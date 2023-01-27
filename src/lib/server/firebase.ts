import { env } from '$env/dynamic/private';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const config = {
	credential: cert({
		privateKey: env.FIREBASE_PRIVATE_KEY,
		clientEmail: env.FIREABSE_CLIENT_EMAIL,
		projectId: env.FIREBASE_PROJECT_ID,
	}),
};

const app = initializeApp(config);
const auth = getAuth(app);

export { app, auth };
