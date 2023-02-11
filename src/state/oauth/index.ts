import {constVoid, pipe} from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import {ClientResponseError} from "pocketbase";
import {ref} from "vue";
import {pb, redirectUrl} from "~/di";
import {getItem, putItem} from "~/services/storage";
import {Error, Provider} from "~/types";

/**
 * The state
 */
export const providers = ref<Provider[]>([]);

/**
 * List providers
 */
export const listProviders = (): TE.TaskEither<Error, void> => {
  return pipe(
    TE.tryCatch(
      () => pb.collection("users").listAuthMethods(),
      (a) => {
        const error = a as ClientResponseError;

        return {message: error.message};
      }
    ),
    TE.map((b) => {
      // Set the state
      providers.value = b.authProviders;
    })
  );
};

/**
 * Initiate the authentication process with a provider.
 *
 * @param provider The provider to use.
 */
export const challenge = (provider: Provider): void => {
  // We need this when we verify.
  putItem("provider", provider);

  window.location.href = `${provider.authUrl}${redirectUrl}`;
};

/**
 * Verify the request incoming from the selected provider.
 *
 * @param code The code received by the provider.
 * @param state The current state.
 */
export const verify = (
  code: string,
  state: string
): TE.TaskEither<Error, void> => {
  const provider = getItem<Provider>("provider");

  return pipe(
    provider,
    TE.fromOption<Error>(() => {
      return {message: "Het authenticatieproces is nog niet gestart."};
    }),
    TE.chain((provider) => {
      // We have a valid provider.
      return pipe(
        provider.state,
        TE.fromPredicate(
          (v) => v === state,
          () => {
            return {
              message: `De communicatie met ${provider.name} is mislukt.`,
            };
          }
        ),
        TE.chain(() => {
          // We have a valid state.
          const {name, codeVerifier} = provider;

          return pipe(
            TE.tryCatch(
              () =>
                pb //
                  .collection("users")
                  .authWithOAuth2(name, code, codeVerifier, redirectUrl),
              () => {
                return {message: "Er is een onbekende fout opgetreden."};
              }
            ),
            TE.chain((u) => {
              // The authentication was successfull, update user data.
              const name = u.meta?.name;
              const avatarUrl = u.meta?.avatarUrl;

              return pipe(
                TE.tryCatch(
                  () =>
                    pb //
                      .collection("users")
                      .update(u.record.id, {name, avatarUrl}),
                  () => {
                    return {
                      message: `
                        Er is iets misgegaan tijdens het wijzigen van de
                        profielgegevens.
                      `,
                    };
                  }
                ),
                TE.map(constVoid),
              );
            })
          );
        })
      );
    })
  );
};

/**
 * Clears the local authentication store.
 */
export const clear = (): void => {
  pb.authStore.clear();
};
