import { getApp, initializeApp } from 'firebase/app';
import { getAuth, inMemoryPersistence } from 'firebase/auth';

const name = 'fordon-app';

export const app = (() => {
    try {
        const config = {
            apiKey: 'AIzaSyAGNUOuv7TgL72yBri1bGEXOu4RLyPLIl8',
            authDomain: 'fordon.firebaseapp.com',
            projectId: 'fordon',
            storageBucket: 'fordon.appspot.com',
            messagingSenderId: '263046679755',
            appId: '1:263046679755:web:312ad60b9266f2c6645f4e',
            measurementId: 'G-WKLJEL00EV'
        };

        return initializeApp(config, name);
    }
    catch (_) {
        return getApp(name);
    }
})();

export const auth = (() => {
    const auth = getAuth(app);

    auth.setPersistence(inMemoryPersistence);

    return auth;
})();