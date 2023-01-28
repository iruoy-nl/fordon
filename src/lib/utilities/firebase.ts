import type { AuthError } from "firebase/auth";

export const handleError = (
    error?: unknown,
    message = 'De communicatie met onze backend is mislukt.',
): App.Error => {
    try {
        const { code } = error as AuthError;

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
                console.error(error);

                return { message };
        }
    }
    catch (error) {
        console.error(error);

        return { message };
    }
};