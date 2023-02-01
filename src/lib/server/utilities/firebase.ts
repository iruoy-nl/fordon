import type {AuthError} from "firebase/auth";
import type {FirestoreError} from "firebase/firestore";

const unknown = 'De communicatie met onze backend is mislukt.';

export function handleAuthError(
  error?: unknown,
  message = unknown,
): App.Error {
  try {
    const {code} = error as AuthError;

    switch (code) {
      case 'auth/email-already-in-use':
        return {
          message: 'Het opgegeven e-mailadres is al in gebruik.',
        };

      case 'auth/invalid-email':
        return {
          message: 'Het opgegeven e-mailaders is niet geldig.',
        };

      case 'auth/missing-email':
        return {
          message: 'Het opgegeven van een e-mailadres is verplicht.',
        };

      default:
        return {message};
    }
  }
  catch (error) {
    return {message};
  }
};

export function handleFirestoreError(
  error?: unknown,
  message = unknown,
): App.Error {
  try {
    const {code} = error as FirestoreError;

    switch (code) {
      case 'not-found':
        return {
          message: 'Het opgevraagde document kon niet worden gevonden.',
        };

      case 'permission-denied':
        return {
          message: 'Je hebt geen toegang tot deze documenten.',
        };

      default:
        return {message};
    }
  }
  catch (error) {
    return {message};
  }
};