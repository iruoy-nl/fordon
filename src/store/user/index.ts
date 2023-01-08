import { Either, left } from "fp-ts/Either";
import { isNone, none, Option, some } from "fp-ts/Option";
import { tryCatch } from "fp-ts/TaskEither";
import { AuthProviderInfo, ClientResponseError } from "pocketbase";
import { ref } from "vue";
import { pb, redirectUrl } from "~/di";
import { getByKey, putByKey, removeByKey } from "~/services/storage";
import { Failure, User } from "~/types";

/**
 * The currently authenticated user.
 */
export const user$ = ref<Option<User>>(none);

/**
 * Watch for updates on the authentication status.
 */
pb.authStore.onChange((_, model) => {
  if (model === null) {
    return (user$.value = none);
  }

  const user = model.export() as User;
  user$.value = some(user);
}, true);

/**
 * List all available providers.
 */
export function listProviders(): Promise<Either<Failure, AuthProviderInfo[]>> {
  return tryCatch(
    async () => {
      const data = await pb //
        .collection("users")
        .listAuthMethods();

      return data.authProviders;
    },
    () => {
      return { message: "Er is een onbekende fout opgetreden." };
    }
  )();
}

/**
 * Initiate the authentication process.
 *
 * @param provider The provider to use for authentication.
 */
export function challenge(provider: AuthProviderInfo): void {
  // Store the provider for later access.
  putByKey("provider", provider);

  window.location.href = `${provider.authUrl}${redirectUrl}`;
}

/**
 * Verify the response from the authentication provider.
 *
 * @param state The state as returned by the provider.
 * @param code The code used to sign in.
 */
export async function verify(
  state: string,
  code: string
): Promise<Either<Failure, void>> {
  // Retrieve the provider.
  const provider: Option<AuthProviderInfo> = getByKey("provider");

  if (isNone(provider)) {
    return left({ message: "Er is geen huidige provider ingesteld." });
  }

  if (provider.value.state !== state) {
    return left({ message: "De state van de providers komen niet overeen." });
  }

  return tryCatch(
    async () => {
      const one = await pb //
        .collection("users")
        .authWithOAuth2(
          provider.value.name,
          code,
          provider.value.codeVerifier,
          redirectUrl
        );

      await pb //
        .collection("users")
        .update(one.record.id, {
          name: one.meta?.name || "",
          avatarUrl: one.meta?.avatarUrl || "",
        });

      removeByKey("provider");
    },
    (e) => {
      const error = e as ClientResponseError;
      removeByKey("provider");

      return { message: error.message };
    }
  )();
}
