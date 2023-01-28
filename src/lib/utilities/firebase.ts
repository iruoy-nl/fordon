import { AuthErrorCodes, type AuthError } from "firebase/auth";
import * as C from 'fp-ts/lib/Console';

export const handleError = (
    error?: unknown,
    message = 'De communicatie met onze backend is mislukt.',
): App.Error => {
    try {
        const { code } = error as AuthError;

        switch (code) {
            case AuthErrorCodes.EMAIL_EXISTS:
                return {
                    message: 'Het opgegeven e-mailadres is al in gebruik.',
                };

            case AuthErrorCodes.INVALID_EMAIL:
                return {
                    message: 'Het opgegeven e-mailaders is niet geldig.',
                };

            default:
                C.error(error);

                return { message };
        }
    }
    catch (error) {
        C.error(error);

        return { message };
    }
};