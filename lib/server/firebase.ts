import { initializeApp } from 'firebase/app';

const config = {
	apiKey: 'AIzaSyAGNUOuv7TgL72yBri1bGEXOu4RLyPLIl8',
	authDomain: 'fordon.firebaseapp.com',
	projectId: 'fordon',
	storageBucket: 'fordon.appspot.com',
	messagingSenderId: '263046679755',
	appId: '1:263046679755:web:312ad60b9266f2c6645f4e',
	measurementId: 'G-WKLJEL00EV'
};

const app = initializeApp(config);

export { app };
