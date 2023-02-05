import * as E from "fp-ts/lib/Either";
import {constVoid, pipe} from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import {pb, redirectUrl} from "~/di";
import {getItem, putItem} from "~/services/storage";
import {Failure, Provider} from "~/types";

/**
 * Get all providers.
 */
export const getAll = (): Promise<E.Either<Failure, Provider[]>> => {
  return pipe(
    TE.tryCatch(
      () => pb.collection("users").listAuthMethods(),
      () => ({message: "Er is een onbekende fout opgetreden."})
    ),
    TE.map((r) => r.authProviders)
  )();
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
export const verify = async (
  code: string,
  state: string
): Promise<E.Either<Failure, void>> => {
  //
  const provider = getItem<Provider>("provider");

  return pipe(
    provider,
    TE.fromOption<Failure>(() => {
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
  )();
};

/**
 * Clears the local authentication store.
 */
export const clear = (): void => {
  pb.authStore.clear();
};
